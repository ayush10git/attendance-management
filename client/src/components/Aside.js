import React from "react";
import { GrUserManager } from "react-icons/gr";
import { MdDashboard } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { TiTick } from "react-icons/ti";
import { PiExamBold } from "react-icons/pi";
import { BiHelpCircle } from "react-icons/bi";
import { SlCalender } from "react-icons/sl";

const Aside = () => {
  return (
    <section>
      <aside>
        <div className="title">
          <GrUserManager />
          <h1>ERP</h1>
        </div>
        <div className="menu">
          <div className="menu-items">
            <ul>
              <li>
                <MdDashboard />
                Dashboard
              </li>
              <li>
                <TbReportSearch />
                Reports
              </li>
              <li className="attendance-menu">
                <TiTick />
                Attendance
              </li>
              <li>
                <PiExamBold />
                Marklist
              </li>
              <li>
                <SlCalender />
                Leaves
              </li>
              <li>
                <BiHelpCircle />
                Help
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </section>
  );
};

export default Aside;
