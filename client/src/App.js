import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Attendance from "./pages/Attendance";
import LoginPage from "./pages/LoginPage";
import "./styles/app.scss";
import { useSelector } from "react-redux";

function App() {
  let { data } = JSON.parse(localStorage.getItem("loggedInUser")) || {};

  return (
    <main>
      <Router>
        <div className="content">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/attendance" element={<Attendance />} />
          </Routes>
        </div>
      </Router>
    </main>
  );
}

export default App;
