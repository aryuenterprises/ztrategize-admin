import React from "react";
import { useEffect, useState } from "react";
import { BiSolidMessageAltAdd } from "react-icons/bi";
import sample from "../../assets/sample.jpg";
import { useNavigate } from "react-router-dom";
import zigzaglines_small from "../../assets/zigzaglines_small.svg";
import axios from "../../api/axiosConfig";
import { API_URL } from "../../config";
import { capitalizeFirstLetter } from "../../StringCaps";
import Footer from "../Footer";
import Mobile_Sidebar from "../Mobile_Sidebar";
import Loader from "../Loader";

const Employees_Card = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [currentTime, setCurrentTime] = useState(new Date());
  // Update the currentTime every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const formatHours = (hours) =>
    hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
  const formatNumber = (number) => (number < 10 ? `0${number}` : number);
  const day = days[currentTime.getDay()];
  const month = months[currentTime.getMonth()];
  const date = currentTime.getDate();
  const hours = formatHours(currentTime.getHours());
  const minutes = formatNumber(currentTime.getMinutes());
  const seconds = formatNumber(currentTime.getSeconds());
  const amPm = currentTime.getHours() >= 12 ? "PM" : "AM";

  const [employees, setEmployees] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);
  const [filterInput, setFilterInput] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const fetchEmployees = async () => {
    
    try {
      const response = await axios.get(
        `${API_URL}/api/employees/all-active-employees`,
        {
          limit: 20,
        }
      );

      console.log("response", response);

      const Employees = response.data.data;

      if (response.data.success) {
        // Transform the data to match the required format
        const transformedData = Employees.map((employee) => ({
          id: employee._id,
          employeeId: employee.employeeId,

          employee_Image: employee.photo
            ? `${API_URL}/api/uploads/${employee.photo}`
            : sample,
          employee_Name: employee.employeeName,
          employee_Position: employee.employeeType,
          employee_mailId: employee.email,
          employee_dutyStatus: employee.dutyStatus,
          // employee_role: employee.role?.department?.name,
          employee_role: employee.role?.name,
        }));
        console.log("transformedData", transformedData);
        //  setEmployees(transformedData);
        const filterData = transformedData.filter(
          (data) => data.employee_dutyStatus == 1
        );
        setEmployees(filterData);
        setAllEmployees(transformedData);

       setLoading(false);
      } else {
        console.log("Failed to fetch employees.");
      }
    } catch (err) {
      setLoading(false);

      console.log("Error fetching employees:", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  function onClickAddNewMember() {
    navigate("/createemployee");

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }

  // function onClickCard(employeeId) {
  //   navigate("/employeedetails", {
  //     state: { employeeId },
  //   });
  //   // console.log(employeeId)

  //   window.scrollTo({
  //     top: 0,
  //     behavior: "instant",
  //   });
  // }

  function onClickCard(employeeId) {
    navigate(`/employeedetails/${employeeId}`);

    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }

  useEffect(() => {
    if (filterInput) {
      const lowerCaseInput = filterInput.toLowerCase();
      const filtered = employees.filter((employee) => {
        return (
          (employee.employee_Name || "")
            .toLowerCase()
            .includes(lowerCaseInput) ||
          (employee.employeeId?.toString() || "").includes(lowerCaseInput) ||
          (employee.employee_mailId || "")
            .toLowerCase()
            .includes(lowerCaseInput) ||
          (employee.employee_role || "").toLowerCase().includes(lowerCaseInput)
        );
      });
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees(employees);
    }
  }, [filterInput, employees]);

  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 12; // Adjust number of employees per page

  // Calculate total pages
  const totalPages = Math.ceil(
    (filteredEmployees?.length || 0) / employeesPerPage
  );

  // Get employees for the current page
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees
    ?.slice()
    .reverse()
    .slice(indexOfFirstEmployee, indexOfLastEmployee);

  const filterEmployee = (value) => {
    if (value) {
      const filterData = allEmployees.filter(
        (data) => data.employee_dutyStatus == value
      );
      setEmployees(filterData);
    } else {
      setEmployees(allEmployees); // reset
    }
  };

  return (
    <div className="flex flex-col justify-between bg-gray-100 w-screen min-h-screen px-3 md:px-5 pt-2 md:pt-10">
      {loading ? (
        <Loader />
      ) : (
        <>
      <div>
        <Mobile_Sidebar />

        {/* header */}
        <div className="flex justify-between items-center bg-white ps-2 pe-4 py-2 mt-5  rounded-2xl">
          <input
            type="text"
            value={filterInput}
            onChange={(e) => setFilterInput(e.target.value)}
            className=" w-full md:w-full ps-2   placeholder-black border-none outline-none  py-2 "
            placeholder="Searching...."
          />

          <div className="font-medium text-sm lg:text-base text-center lg:text-left w-full flex justify-end">
            <span>{day}, </span>
            <span>{date} </span>
            <span>{month} </span>
            <span className="inline-block  text-center">
              {hours}:{minutes}:{seconds} {amPm}
            </span>
          </div>
          {/* </div> */}
        </div>

        {/* breadcrumbs */}

        <div className="flex gap-2 mt-5 items-center cursor-pointer">
          <p
            className="text-sm text-gray-500"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </p>
          <p>{">"}</p>

          <p className="text-sm text-blue-500">Employees</p>
        </div>

        <div className="flex flex-wrap flex-col md:flex-row  justify-between ">
          <p className="text-2xl md:text-3xl  font-semibold mt-5 md:mt-8">
            Employees
          </p>
          <button
            onClick={onClickAddNewMember}
            className=" w-fit text-xs md:text-base  mt-5 md:mt-8  text-white bg-blue-500 hover:bg-blue-600 font-medium font-medium px-3 py-2 rounded-full "
          >
            Add New Member{" "}
            <BiSolidMessageAltAdd className="inline-block  ms-3" />
          </button>
        </div>

        {/* {isLoading ? (
          <Loader />
        ) : (
          <>
            {filteredEmployees ? (
              <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10">
                {filteredEmployees.slice().reverse().map((item, index) => (
                  <div
                    key={index}
                    onClick={() => onClickCard(item.employeeId)}
                    className="relative w-full h-80 bg-cover cursor-pointer hover:-translate-y-1 transition-transform rounded-2xl shadow-lg"
                  >
                    <img
                      src={zigzaglines_small}
                      alt=""
                      className="absolute inset-0 rounded-2xl object-cover w-full h-full"
                    />

                    <div className="flex flex-col items-center justify-center gap-4 absolute inset-0 p-4 ">
                      <img
                        src={item.employee_Image}
                        alt=""
                        className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
                      />
                      <div className="text-center">
                        <p className="text-lg font-semibold text-gray-900">
                          {capitalizeFirstLetter(item.employee_Name)}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {capitalizeFirstLetter(item.employee_Position)}
                        </p>
                        <p className="text-gray-700 text-sm ">
                          {item.employee_mailId}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center mt-20">
                <p className=" text-lg">No Data Found</p>
              </div>
            )} */}
        {/* </> */}
        {/* )} */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10">
            {[...Array(employeesPerPage)].map((_, index) => (
              <div
                key={index}
                className="relative w-full h-80 bg-gray-200 animate-pulse rounded-2xl shadow-lg"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-4">
                  <div className="w-28 h-28 bg-gray-300 rounded-full"></div>
                  <div className="w-32 h-6 bg-gray-300 rounded-md"></div>
                  <div className="w-24 h-4 bg-gray-300 rounded-md"></div>
                  <div className="w-28 h-4 bg-gray-300 rounded-md"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {filteredEmployees?.length > 0 ? (
              <>
                <div className="flex flex-wrap justify-end mt-6 space-x-2">
                  <select
                    name=""
                    id=""
                    className="px-3 mx-3 cursor-pointer"
                    onChange={(e) => filterEmployee(e.target.value)}
                  >
                    <option value="">Status</option>
                    <option value="1" selected>
                      Active
                    </option>
                    <option value="0">Relieved</option>
                  </select>
                  <div className="mt-3 md:mt-0 space-x-2">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="px-4 py-2 mb-3 sm:mb-0 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
                    >
                      Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-4 py-2 ${
                          currentPage === index + 1
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        } rounded-md`}
                      >
                        {index + 1}
                      </button>
                    ))}

                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10">
                  {currentEmployees.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        onClickCard(item.id);
                        console.log(item);
                      }}
                      className="relative w-full h-80 bg-cover cursor-pointer hover:-translate-y-1 transition-transform rounded-2xl shadow-lg bg-white"
                    >
                      <img
                        src={zigzaglines_small}
                        alt=""
                        className="absolute inset-0 rounded-2xl object-cover w-full h-full"
                      />
                      <div className="flex flex-col items-center justify-center gap-4 absolute inset-0 p-4">
                        <div className="relative">
                          <img
                            src={item.employee_Image}
                            alt=""
                            className="w-28 h-28 rounded-full object-cover border-white shadow-lg"
                          />
                          {item.employee_dutyStatus == 1 ? (
                            <span
                              className="w-[11px] h-[11px] rounded-full absolute top-3 right-3 
                            bg-gradient-to-r from-green-400 to-green-600 
                            shadow-[0_0_8px_rgba(34,197,94,0.8)]"
                            ></span>
                          ) : (
                            <span
                              className="w-[11px] h-[11px] rounded-full absolute top-3 right-3 
                            bg-gradient-to-r from-orange-400 to-orange-600 
                             shadow-[0_0_8px_rgba(249,115,22,0.8)]"
                            ></span>
                          )}
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-gray-900 capitalize">
                            {item.employee_Name}
                          </p>
                          {/* role */}
                          <p className="text-gray-500 text-sm capitalize">
                            {item.employee_role}
                          </p>
                          <p className="text-gray-500 text-sm capitalize">
                            {item.employee_Position}
                          </p>
                          <p className="text-gray-700 text-sm">
                            {item.employee_mailId}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center mt-6 space-x-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`px-4 py-2 ${
                        currentPage === index + 1
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      } rounded-md`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center mt-20">
                <p className="text-lg">No Data Found</p>
              </div>
            )}
          </>
        )}
      </div>
         </>
      )}
      <Footer />
    </div>
  );
};

export default Employees_Card;
