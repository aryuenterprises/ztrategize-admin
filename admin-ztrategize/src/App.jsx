import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";
import Employees from "./pages/Employees";
import CreateEmployee from "./pages/CreateEmployee";
import EmployeeDetails from "./pages/EmployeeDetails";
import EditEmployeeDetails from "./pages/EditEmployeeDetails";
import Attendance from "./pages/Attendance";
import MonthlyAttendanceDetails from "./pages/MonthlyAttendanceDetails";
import Leaves from "./pages/Leaves";
import Finance from "./pages/Finance";
import Payroll from "./pages/Payroll";
import Dashboard from "./pages/Dashboard";
import DashboardClient from "./pages/DashboardClient";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import CreateVacancy from "./pages/CreateVacancy";
import Roles from "./pages/Roles";
import Permission from "./pages/Permission";
import Sitemap from "./pages/Sitemap";
import Income_History from "./pages/Income_History";
import Expense_History from "./pages/Expense_History";
import Job_Application from "./pages/Job_Application";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "./components/Protected_Route";
import Hoildays from "./pages/Hoildays";
import WorkingDays from "./pages/WorkingDays";
import PresentedEmployees_Mainbar from "./components/presented employees components/PresentedEmployees_Mainbar";
import PresentedEmployees from "./pages/PresentedEmployees";
import AbsentEmployees from "./pages/AbsentEmployees";
import WorkFromHomeEmployees from "./pages/WorkFromHomeEmployees";
import Departments from "./pages/Departments";
import WorkFromHome from "./pages/WorkFromHome";
import Dummy from "./pages/Dummy";
import ProjectList from "./components/project list/ProjectList";
import ProjectListPage from "./pages/ProjectListPage";
import TaskListPage from "./pages/TaskListPage";
import TaskListClientPage from "./pages/TaskListClientPage";

import Tasklist_main from "./pages/Tasklist_main";

import Client_home from "./pages/Client_home";
import Invoice_details from "./pages/Invoice_details";
import Invoice_home from "./pages/Invoice_home";
import Task_home from "./components/taskList/Task_home";
import Task_homeClient from "./components/taskList/Task_homeClient";
import Reports_mainbar from "./pages/Reports_mainbar";
import Attendance_tracker from "./pages/Attendance_tarcker";
import Revision from "./pages/Revision";
import Leave_type from "./pages/Leave_type";
import Link_mainbar from "./pages/Link_mainbar";
import AddLink_mainbar from "./pages/AddLinks_mainbar";
import Addcategory_mainbar from "./pages/Addcategory_mainbar";
import Request_mainbar from "./components/work from home components/Request_mainbar";
import Leave_Report from "./components/leaves components/Leave_Report";
import Expense_icome_details from "./pages/Expense_icome_details";
import Expense_income_main from "./pages/Expense_icome_main";
import Income_main from "./pages/Income_main";
import Notes_main from "./pages/Notes_main";
import Invoice from "./pages/Invoice_download";
import Leave_option_main from "./pages/Leave_option_main";
import Close_home from "./components/taskList/Close_home";
import Close_homeClient from "./components/taskList/Close_homeClient";
import Joining_list from "./pages/Joining_list";
import Reliving_list from "./pages/Reliving_list";
import Joining_verification from "./pages/joining_verification";
import Declaration_main from "./pages/Declaration_main";

import { AdminPrivileges } from "./pages/AdminPrivileges";
import Declaration_pdf from "./pages/Declaration_pdf";
import axios from "axios";
import { API_URL } from "./config";
import Releiving from "./pages/Releiving";
import Payment_type_main from "./components/Payment Type/Payment_type_main";
import Letters_main from "./pages/Letters_main";
import Invoice_full from "./pages/Invoice_full";
import Invoice_full_main from "./pages/Invoice_full_main";
import Setting_main from "./pages/Setting_main";
import Client_view from "./pages/Client_view";
import Account_bidding_main from "./components/bidding assests components/Account_bidding_main";
import Tech_bidding_main from "./components/bidding assests components/Tech_bidding_main";
import Attendance_add_main from "./components/attendance components/Attendance_add_main";
import Bidding_main from "./components/bidding assests components/Bidding_main";
import Connect_main from "./components/bidding assests components/Connect_main";
import JobType_main from "./components/recruitment components/JobType_main";
import JobOpening_Main from "./components/recruitment components/JobOpening_Main";
import InterViewStatus_Main from "./components/recruitment components/InterViewStatus_Main";

import Source_Details from "./components/recruitment components/Source_Details";
import Source_Main from "./components/recruitment components/Source_Main";
import Candidate_Main from "./components/recruitment components/Candidate_Main";
import DashBoard_Main from "./components/recruitment components/DashBoard_Main";
import Bidding_reports_main from "./components/bidding assests components/Bidding_reports_main";
import Demo_invoice from "./pages/Demo_invoice";
import Letters_download from "./components/releiving components/Letters_download";
import Social_account_main from "./components/social media/Social_account_main";
import Social_credentials_main from "./components/social media/Social_credentials_main";
import Finance_account_main from "./pages/Finance_account_main";
import Messages from './pages/Messages'
import Bidding_all_main from "./components/bidding assests components/Bidding_all_main";
import Tasklist_main_client from "./pages/Tasklist_main_client";
import Admin_privileges_main from "./pages/Admin_privileges_main";
import PayslipContent from "./components/payroll components/PayslipContent";

function App() {
  // const location = useLocation();
  // const id = location?.state?.id ||"";
  // console.log("idempok", id);

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check local storage during initial render
    const userDetails = localStorage.getItem("hrmsuser");

    return userDetails ? true : false;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const userDetails = localStorage.getItem("hrmsuser");
      setIsLoggedIn(userDetails ? true : false);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const user = JSON.parse(localStorage.getItem("hrmsuser"));

  const email = user?.email ? user?.email : "";

  const hasPermission = (title) => {
    const user = JSON.parse(localStorage.getItem("hrmsuser"));
    const module = JSON.parse(localStorage.getItem("module"));
    const hrpermissions = module || [];

    if (user?.superUser) {
      return true;
    } else {
      return hrpermissions.find(
        (p) => p.title === title && p.permission === "yes"
      );
    }
  };

  const fetchPermissionModule = async () => {
    const user = JSON.parse(localStorage.getItem("hrmsuser"));
    const response = await axios.get(
      `${API_URL}/api/hr-permission/get-employee-permission/${user.employeeId}`
    );
    console.log(response);

    localStorage.setItem(
      "module",
      JSON.stringify(response?.data?.data[0]?.module || [])
    );
  };

  useEffect(() => {
    fetchPermissionModule();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<PageNotFound />} />

          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Login setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/client-dashboard"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <DashboardClient />
              </ProtectedRoute>
            }
          />
          <Route
                path="/tasklist-details_client/:taskId"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Tasklist_main_client />
                  </ProtectedRoute>
                }
              />

          {/* <Route
            path="/permission"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Permission />
              </ProtectedRoute>
            }
          /> */}

          {hasPermission("On Boarding") && (
            <>
              <Route
                path="/employees"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Employees />
                  </ProtectedRoute>
                }
              />
              <Route
                path="createemployee"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <CreateEmployee />
                  </ProtectedRoute>
                }
              />

              <Route
                path="employeedetails/:id"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <EmployeeDetails />
                  </ProtectedRoute>
                }
              />

              <Route
                path="editemployeedetails"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <EditEmployeeDetails />
                  </ProtectedRoute>
                }
              />

              <Route
                path="revision-details/:employeeId"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Revision />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/roles"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Roles />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/departments"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Departments />
                  </ProtectedRoute>
                }
              />
            </>
          )}

          {hasPermission("Employee") && (
            <>
              <Route
                path="attendance"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Attendance />
                  </ProtectedRoute>
                }
              />
              <Route
                path="attendance-tracker"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Attendance_tracker />
                  </ProtectedRoute>
                }
              />
              <Route
                path="attendance-add"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Attendance_add_main />
                  </ProtectedRoute>
                }
              />
              <Route
                path="monthlyattendancedetails"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <MonthlyAttendanceDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="leave-type"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Leave_type />
                  </ProtectedRoute>
                }
              />
              <Route
                path="account-bidding"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Account_bidding_main />
                  </ProtectedRoute>
                }
              />
              <Route
                path="bidding-details"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Bidding_main />
                  </ProtectedRoute>
                }
              />

               <Route
                path="bidding-all-details/:row"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Bidding_all_main />
                  </ProtectedRoute>
                }
              />

              <Route
                path="connect-details"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Connect_main />
                  </ProtectedRoute>
                }
              />

              {/* recurment */}

              <Route
                path="jobtype-Recruitment"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <JobType_main />
                  </ProtectedRoute>
                }
              />

              <Route
                path="jobopening-Recruitment"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <JobOpening_Main />
                  </ProtectedRoute>
                }
              />

              <Route
                path="interview-Recruitment"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <InterViewStatus_Main />
                  </ProtectedRoute>
                }
              />
              

              <Route
                path="source-Recruitment"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Source_Main />
                  </ProtectedRoute>
                }
              />

              <Route
                path="Candidate-Recruitment"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Candidate_Main />
                  </ProtectedRoute>
                }
              />

              <Route
                path="dashboard-Recruitment"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <DashBoard_Main />
                  </ProtectedRoute>
                }
              />

              <Route
                path="tech-bidding"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Tech_bidding_main />
                  </ProtectedRoute>
                }
              />

              <Route
                path="bidding-reports"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Bidding_reports_main />
                  </ProtectedRoute>
                }
              />

              {/* recruitment */}

              <Route
                path="payment-type"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Payment_type_main />
                  </ProtectedRoute>
                }
              />
              <Route
                path="letters-form"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Letters_main />
                  </ProtectedRoute>
                }
              />
              <Route
                path="invoice-full"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Invoice_full_main />
                  </ProtectedRoute>
                }
              />
              <Route
                path="leaves"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Leaves />
                  </ProtectedRoute>
                }
              />
              <Route
                path="leave-report"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Leave_Report />
                  </ProtectedRoute>
                }
              />
              <Route
                path="leave-option"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Leave_option_main />
                  </ProtectedRoute>
                }
              />
              <Route
                path="wfh"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <WorkFromHome />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/requestdetails"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Request_mainbar />
                  </ProtectedRoute>
                }
              />
            </>
          )}
          <Route
                path="task-list-client"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <TaskListClientPage />
                  </ProtectedRoute>
                }
              />

            <Route
                path="task-details-client"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Task_homeClient />
                  </ProtectedRoute>
                }
              />

            <Route
                path="close-details-client"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Close_homeClient />
                  </ProtectedRoute>
                }
              />
          {hasPermission("Projects") && (
            <>
              <Route
                path="project-list"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <ProjectListPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="task-list"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <TaskListPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="task-details"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Task_home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="close-details"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Close_home />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/tasklist-details/:taskId"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Tasklist_main />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/Reports"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Reports_mainbar />
                  </ProtectedRoute>
                }
              />
            </>
          )}

          {hasPermission("Clients") && (
            <>
              <Route
                path="client-details"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Client_home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="invoice-sheet"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Invoice />
                  </ProtectedRoute>
                }
              />
              <Route
                path="invoice-details"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Invoice_home />
                  </ProtectedRoute>
                }
              />
            </>
          )}

          {hasPermission("Finance") && (
            <>
              <Route
                path="finance/incomehistory"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Income_History />
                  </ProtectedRoute>
                }
              />

              <Route
                path="finance/expensehistory"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Expense_History />
                  </ProtectedRoute>
                }
              />
              <Route
                path="expense/details"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Expense_income_main />
                  </ProtectedRoute>
                }
              />
              <Route
                path="income/details"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Income_main />
                  </ProtectedRoute>
                }
              />
               <Route
                path="finance-account"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Finance_account_main />
                  </ProtectedRoute>
                }
              />
            </>
          )}

          {hasPermission("Links") && (
            <>
              <Route
                path="/links"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Link_mainbar />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/addlinks"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <AddLink_mainbar />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/addcategory"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Addcategory_mainbar />
                  </ProtectedRoute>
                }
              />
            </>
          )}

          {hasPermission("Privileges") && (
            <Route
              path="privileges"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Admin_privileges_main />
                </ProtectedRoute>
              }
            />
          )}

          {hasPermission("Payroll") && (
            <Route
              path="payroll"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Payroll />
                </ProtectedRoute>
              }
            />
          )}

          <Route
                path="payslip-conent"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <PayslipContent/>
                  </ProtectedRoute>
                }
          />

          {hasPermission("Holidays") && (
            <Route
              path="holidays"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Hoildays />
                </ProtectedRoute>
              }
            />
          )}

          {/* social media */}
            {hasPermission("socialmedia") && (
            <>
              <Route
                path="social-account"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Social_account_main/>
                  </ProtectedRoute>
                }
              />
               <Route
                path="social-credentials"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Social_credentials_main/>
                  </ProtectedRoute>
                }
              />
             
            </>
          )}

          <Route
            path="note-details/:employeeId"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Notes_main />
              </ProtectedRoute>
            }
          />
          <Route
            path="Declaration-deatils"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Declaration_main />
              </ProtectedRoute>
            }
          />
          <Route
            path="Declaration-pdf"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Declaration_pdf />
              </ProtectedRoute>
            }
          />
          <Route
            path="letter-download"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Letters_download />
              </ProtectedRoute>
            }
          />

          <Route
            path="joining-list"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Joining_list />
              </ProtectedRoute>
            }
          />
          <Route
            path="reliving-list"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Reliving_list />
              </ProtectedRoute>
            }
          />
          <Route
            path="joining-verification-list"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Joining_verification />
              </ProtectedRoute>
            }
          />
          <Route
            path="releiving-letter"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Releiving />
              </ProtectedRoute>
            }
          />

          <Route
            path="invoice-demo"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Demo_invoice />
              </ProtectedRoute>
            }
          />

          <Route
            path="settings"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Setting_main />
              </ProtectedRoute>
            }
          />
          <Route
            path="client-view"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Client_view />
              </ProtectedRoute>
            }
          />

          {/* 
          <Route
            path="presentedemployees"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <PresentedEmployees />
              </ProtectedRoute>
            }
          /> */}

          {/* {email !== "hr@aryutechnologies.com" && (
           
          )} */}

          {/* <Route
            path="finance"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Finance />
              </ProtectedRoute>
            }
          /> */}

          {/* <Route
            path="workingdays"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <WorkingDays />
              </ProtectedRoute>
            }
          /> */}

          {/* <Route
            path="absentemployees"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <AbsentEmployees />
              </ProtectedRoute>
            }
          /> */}

          {/* <Route
            path="workfromhomeemployees"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <WorkFromHomeEmployees />
              </ProtectedRoute>
            }
          /> */}

          <Route path="message" element={<Messages />} />
          <Route
            path="sitemap.html"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Sitemap />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
