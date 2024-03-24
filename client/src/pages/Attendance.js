import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState, useEffect, useRef } from "react";
import Aside from "../components/Aside";
import Header from "../components/Header";
import {
  useAttendanceRecordsQuery,
  useMarkAttendanceMutation,
} from "../redux/api/attendanceApi";
import toast from "react-hot-toast";

const Attendance = () => {
  let todayDate = new Date();
  const formattedDate = todayDate.toISOString().slice(0, 10);

  const localStorageRef = useRef(formattedDate);

  const [date, setDate] = useState(localStorageRef.current);

  const { data, isError, isLoading, error } = useAttendanceRecordsQuery(date);
  // console.log(data);

  if (isError) {
    toast.error(error.message);
  }

  const records = new Object(data);
  const studentInfo = records.data;

  const [markAttendance] = useMarkAttendanceMutation();

  const markAttendanceHandler = async (studentId) => {
    try {
      await markAttendance({ studentId, date });
      // await queryClient.invalidateQueries("attendanceRecords");
      toast.success("Attendance marked successfully!");
    } catch (error) {
      toast.error("Failed to mark attendance");
    }
  };

  useEffect(() => {
    localStorageRef.current = date; // Update localStorageRef when date changes
    // Save the selected date to localStorage whenever it changes
    localStorage.setItem("selectedDate", date);
  }, [date]);

  useEffect(() => {
    const savedDate = localStorage.getItem("selectedDate");
    setDate(savedDate || formattedDate);
  }, [formattedDate]);

  return (
    <div className="container">
      <Aside />
      <div className="page">
        <Header />
        <div className="table-container">
          <div className="date">
            <h3>{date}</h3>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {isLoading ? (
            "loading"
          ) : (
            <TableContainer component={Paper} className="table">
              <Table sx={{ minWidth: 600 }} aria-label="simple table">
                <TableHead className="table-head">
                  <TableRow className="table-row">
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">USN</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {studentInfo &&
                    studentInfo.map((row, idx) => (
                      <TableRow
                        key={idx}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row" align="center">
                          {row.student.name}
                        </TableCell>
                        <TableCell align="center">{row.student.usn}</TableCell>
                        <TableCell align="center">{row.status}</TableCell>
                        <TableCell align="center">
                          <button
                            className="action-btn"
                            onClick={() =>
                              markAttendanceHandler(row.student._id)
                            }
                          >
                            {row.status === "absent" ? "Mark" : "Unmark"}
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
