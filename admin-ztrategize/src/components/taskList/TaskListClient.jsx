import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Editor } from "primereact/editor";
import { FileUpload } from "primereact/fileupload";
import { MultiSelect } from "primereact/multiselect";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
// import { capitalizeFirstLetter } from "../StringCaps";
import { API_URL } from "../../config";
import { Dropdown } from "primereact/dropdown";
import { VscTasklist } from "react-icons/vsc";
import { FaTasks } from "react-icons/fa";
import { GoProjectSymlink } from "react-icons/go";
import { PiFlagBannerFill } from "react-icons/pi";
import { GiPin } from "react-icons/gi";
import { PiFlagPennantFill } from "react-icons/pi";
import { VscDebugConsole } from "react-icons/vsc";
import Button_Loader from "../Button_Loader";
import Footer from "../Footer";
import { toast } from "react-toastify";

// const initialData = {
//   columns: {
//     todo: {
//       id: "todo",
//       title: "To Do",
//       items:alldata.taskToDo.map((value)=>{return(value.title)}),
//     },
//     inprogress: {
//       id: "inprogress",
//       title: "In Progress",
//       items: ["Task 4", "Task 5"],
//     },
//     inreview: {
//       id: "inreview",
//       title: "In Review",
//       items: ["Task 4", "Task 5"],
//     },
//     done: {
//       id: "done",
//       title: "Done",
//       items: ["Task 4", "Task 5"],
//     },
//   },
//   columnOrder: ["todo", "inprogress", "inreview", "done"],
// };

const TaskList = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  // Fetch tasks from API and format data

  // Handle drag and drop
  // const onDragEnd = (result) => {
  //   const { source, destination } = result;
  //   if (!destination) return;

  //   const sourceCol = data.columns[source.droppableId];
  //   const destCol = data.columns[destination.droppableId];
  //   const sourceItems = [...sourceCol.items];
  //   const destItems = [...destCol.items];

  //   const [movedItem] = sourceItems.splice(source.index, 1);

  //   if (source.droppableId === destination.droppableId) {
  //     sourceItems.splice(destination.index, 0, movedItem);
  //     setData({
  //       ...data,
  //       columns: {
  //         ...data.columns,
  //         [sourceCol.id]: {
  //           ...sourceCol,
  //           items: sourceItems,
  //         },
  //       },
  //     });
  //   } else {
  //     destItems.splice(destination.index, 0, movedItem);
  //     setData({
  //       ...data,
  //       columns: {
  //         ...data.columns,
  //         [sourceCol.id]: {
  //           ...sourceCol,
  //           items: sourceItems,
  //         },
  //         [destCol.id]: {
  //           ...destCol,
  //           items: destItems,
  //         },
  //       },
  //     });
  //   }
  // };

  // const onDragEnd = async (result) => {
  //   const { source, destination } = result;
  //   if (!destination) return;

  //   const sourceCol = data.columns[source.droppableId];
  //   const destCol = data.columns[destination.droppableId];
  //   const sourceItems = [...sourceCol.items];
  //   const destItems = [...destCol.items];

  //   const [movedItem] = sourceItems.splice(source.index, 1);

  //   if (source.droppableId === destination.droppableId) {
  //     // Same column — just reorder
  //     sourceItems.splice(destination.index, 0, movedItem);
  //     setData((prevData) => ({
  //       ...prevData,
  //       columns: {
  //         ...prevData.columns,
  //         [sourceCol.id]: {
  //           ...sourceCol,
  //           items: sourceItems,
  //         },
  //       },
  //     }));
  //   } else {
  //     // Cross-column move — update state & send API
  //     destItems.splice(destination.index, 0, movedItem);
  //     setData((prevData) => ({
  //       ...prevData,
  //       columns: {
  //         ...prevData.columns,
  //         [sourceCol.id]: {
  //           ...sourceCol,
  //           items: sourceItems,
  //         },
  //         [destCol.id]: {
  //           ...destCol,
  //           items: destItems,
  //         },
  //       },
  //     }));

  //     //  Map column ID to backend status
  //     const statusMap = {
  //       inprogress: "in-progress",
  //       inreview: "in-review",
  //       todo: "todo",
  //       done: "done",
  //     };
  //     const newStatus = statusMap[destCol.id] || destCol.id;

  //     const now = new Date().toISOString();
  //     let updatedStartTime = movedItem.startTime;
  //     let updatedStopTime = movedItem.endTime;

  //     if (newStatus === "in-progress" && !updatedStartTime) {
  //       updatedStartTime = now;
  //     } else if (newStatus === "in-review" && !updatedStopTime) {
  //       updatedStopTime = now;
  //     }

  //     const payload = {
  //       status: newStatus,
  //       startTime: updatedStartTime,
  //       endTime: updatedStopTime,
  //       updatedAt: now,
  //     };

  //     try {
  //       const response = await axios.patch(
  //         `${API_URL}api/task/updated-status/${movedItem.taskId}`,
  //         payload
  //       );
  //       console.log("Status updated via drag:", response.data);
  //     } catch (error) {
  //       console.error("Error updating status via drag:", error);
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error",
  //         text: "Failed to update task status after dragging.",
  //       });
  //     }
  //   }
  // };

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;

    // if (destination.droppableId === "inreview") return;
    // if (destination.droppableId === "inprogress") return;
    // if (source.droppableId === "inprogress") return;
    // if (source.droppableId === "inreview") return;

    const sourceCol = data.columns[source.droppableId];
    const destCol = data.columns[destination.droppableId];
    const sourceItems = [...sourceCol.items];
    const destItems = [...destCol.items];

    const [movedItem] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      // Reorder within same column
      sourceItems.splice(destination.index, 0, movedItem);
      setData((prevData) => ({
        ...prevData,
        columns: {
          ...prevData.columns,
          [sourceCol.id]: {
            ...sourceCol,
            items: sourceItems,
          },
        },
      }));
    } else {
      // Move to different column — update backend
      destItems.splice(destination.index, 0, movedItem);
      setData((prevData) => ({
        ...prevData,
        columns: {
          ...prevData.columns,
          [sourceCol.id]: {
            ...sourceCol,
            items: sourceItems,
          },
          [destCol.id]: {
            ...destCol,
            items: destItems,
          },
        },
      }));

      const statusMap = {
        inprogress: "in-progress",
        inreview: "in-review",
        todo: "todo",
        done: "done",
      };
      const newStatus = statusMap[destCol.id] || destCol.id;
      const now = new Date().toISOString();

      let updatedStartTime = movedItem.startTime;
      let updatedStopTime = movedItem.endTime;

      if (newStatus === "in-progress" && !updatedStartTime) {
        updatedStartTime = now;
      } else if (newStatus === "in-review" && !updatedStopTime) {
        updatedStopTime = now;
      }

      const payload = {
        status: newStatus,
        startTime: updatedStartTime,
        endTime: updatedStopTime,
        updatedAt: now,
        updatedBy: superUser ? employeeemail : employeeId,
      };

      try {
        const response = await axios.patch(
          `${API_URL}/api/task/updated-status/${movedItem.taskId}`,
          payload
        );
        //       console.log("Dragged Task Object:", movedItem);
        // console.log("Calling PATCH on:", `${API_URL}api/task/updated-status/${movedItem.taskId}`);
        toast.success("Task status updated successfully");
        console.log("Status updated via drag:", response.data);
      } catch (error) {
        console.error("Error updating status via drag:", error);
        toast.error(error?.response?.data?.message || "Failed to update task status after dragging.");
      }
    }
  };

  const navigate = useNavigate();
  const employeeDetails = JSON.parse(localStorage.getItem("hrmsuser"));
  // console.log("employeeDetails:", employeeDetails.email);

  const employeeemail = employeeDetails._id;
  console.log("employeeemail:", employeeemail);
  const superUser = employeeDetails?.superUser;
  const employeeId = employeeDetails.employeeId;
  // console.log("employeeemail:", employeeemail);

  // const [data, setData] = useState(initialData);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };
  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  // const onDragEnd = (result) => {
  //   const { source, destination } = result;

  //   if (!destination) return;
  //   if (destination.droppableId === "done") return;
  //   if (source.droppableId === "done") return;

  //   const sourceCol = data.columns[source.droppableId];
  //   const destCol = data.columns[destination.droppableId];

  //   if (sourceCol === destCol) {
  //     const newItems = Array.from(sourceCol.items);
  //     const [movedItem] = newItems.splice(source.index, 1);
  //     newItems.splice(destination.index, 0, movedItem);

  //     const newCol = {
  //       ...sourceCol,
  //       items: newItems,
  //     };

  //     setData({
  //       ...data,
  //       columns: {
  //         ...data.columns,
  //         [newCol.id]: newCol,
  //       },
  //     });
  //   } else {
  //     const sourceItems = Array.from(sourceCol.items);
  //     const destItems = Array.from(destCol.items);
  //     const [movedItem] = sourceItems.splice(source.index, 1);
  //     destItems.splice(destination.index, 0, movedItem);

  //     setData({
  //       ...data,
  //       columns: {
  //         ...data.columns,
  //         [sourceCol.id]: { ...sourceCol, items: sourceItems },
  //         [destCol.id]: { ...destCol, items: destItems },
  //       },
  //     });
  //   }
  // };

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    // console.log(today)
// setDateFilter
    setCurrentDate(today);
  }, []);

  // const handleNavigate = (item) => {

  //   navigate("/tasklist-details");
  // };

  const handleNavigate = (item) => {
    // console.log("item", item);
    const filters = {
      project: projectname,
      assignee: assignTo,
    };

    sessionStorage.setItem("taskListFilters", JSON.stringify(filters));

    window.open(`/tasklist-details_client/${item.taskId}`);
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  useEffect(() => {
    // Restore filters from session storage when component mounts
    const savedFilters = sessionStorage.getItem("taskListFilters");

    if (savedFilters) {
      const filters = JSON.parse(savedFilters);
      console.log("filters", filters);
      setAssignTo(filters.assignee);
      // setProjectName(filters.project);
      // handleRoleChange(filters.project.name);

      // Clear the stored filters after restoring
      sessionStorage.removeItem("taskListFilters");
    }
  }, []);

  // handlsumbit

  const [projectname, setProjectName] = useState("");
  console.log("projectname",projectname);
  const [projectDescription, setProjectDescription] = useState("");
  const [projecttile, setProjecttiltle] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [assignTo, setAssignTo] = useState("");
  const [projectManagerName, setProjectManagerName] = useState("");

  const handleRoleChange = (name) => {
    // const selectedRoleName = e.target.value;
    setProjectName(name);
    const selectedRole = roles.find((role) => role.name === name);
    if (selectedRole) {
      setProjectManagerName(selectedRole.projectManager || "");
    } else {
      setProjectManagerName("");
    }
  };

  const [employeeOption, setEmployeeOption] = useState(null);
  const [dateFilter, setDateFilter] = useState("");

  const fetchEmployeeList = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/employees/all-employees`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // const employeeIds = response.data.data.map(emp => `${emp.employeeId} - ${emp.employeeName}`);
      const employeeName = response.data.data.map((emp) => ({
        label: emp.employeeName,
        value: emp._id,
      }));
      // console.log("employeeemail", employeeemail);

      setEmployeeOption(employeeName);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // fetchData();
    fetchEmployeeList();
    const today = new Date().toISOString().split("T")[0];
    setDateFilter(today);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedProject = roles.find((role) => role.name === projectname);
    const projectId = selectedProject?._id || "";

    try {
      const formData = new FormData();
      formData.append("dueDate", currentDate);
      formData.append("projectName", projectname);
      formData.append("description", projectDescription);
      formData.append("status", "todo");
      formData.append("title", projecttile);
      formData.append("assignedTo", assignTo);
      formData.append("createdBy", employeeemail);
      formData.append("priority", priority);
      formData.append("projectId", projectId);
      formData.append("projectManagerId", projectManagerName);
      uploadedFiles.forEach((file) => {
        formData.append("document[]", file);
      });

      const response = await axios.post(
        `${API_URL}/api/task/create-task`,
        formData
      );

      console.log("response", response);
      Swal.fire({
        icon: "success",
        title: "Task Created!",
        text: "Your task has been successfully created.",
        confirmButtonColor: "#3085d6",
      });
      closeAddModal();
      setProjectName("");
      setProjecttiltle("");
      setProjectDescription("");
      setStatus("");

      setPriority("");
      setUploadedFiles([]);
      setCurrentDate(new Date().toISOString().split("T")[0]);
      setErrors({});
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        console.error("Error submitting form:", err);
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Something went wrong while creating the task.",
        });
      }
    }
  };
  const [project, setProject] = useState([]);
  // console.log("roles", project.value);
const allProjectIds = project.map((proj) => proj.value);

const allProjectIdsString = allProjectIds.join(",");
  console.log("allProjectIds",allProjectIdsString);

  const fetchProject = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/project/view-projects-id`,{
        params: { clientId: employeeemail },
      });
      console.log("clientID", employeeemail);
      // console.log(response);
      if (response.data.success) {
        const projectName = response.data.data.map((emp) => ({
          label: emp.name,
          value: emp._id,
          teamMembers: emp.teamMembers,
          projectManager: emp.projectManager,
        }));
        setProject(projectName);
      } else {
        setErrors("Failed to fetch project.");
      }
    } catch (err) {
      setErrors("Failed to fetch project.");
    }
  };

  useEffect(() => {
    // fetchProjectall();
    fetchProject();
  }, []);

  const [projectTaskCount, setProjectTaskCount] = useState(null);

  // const projectIdToSend = projectname && projectname.length >=0 
  //   ? projectname  // if user selected a project, send that
  //   : allProjectIdsString;

  //  const projectIdToSend = projectname && projectname.length > 0 
  //       ? projectname       
  //       : allProjectIdsString; 

  const handleSearch = async () => {
    try {
      setButtonLoading(true);
      const payload = {
        employeeId: employeeemail,
        projectId: projectname,
         day: dateFilter,
      };

      console.log(payload);
      const response = await axios.get(
        `${API_URL}/api/task/particular-all-task-status-id`,
        { params: payload }
      );

      // console.log("Full API response:", response.data.data);

      const allTasks = response.data.data;
      console.log("Extracted task data:", allTasks);
      const allCounts = response.data;
      setProjectTaskCount(allCounts.counts);

      const formattedData = {
        columns: {
          todo: {
            id: "todo",
            title: "To Do",
            items: allTasks.taskToDo || [],
          },
          inprogress: {
            id: "inprogress",
            title: "In Progress",
            items: allTasks.taskInProcess || [],
          },
          inreview: {
            id: "inreview",
            title: "In Review",
            items: allTasks.taskInReview || [],
          },
          done: {
            id: "done",
            title: "Done",
            items: allTasks.taskDone || [],
          },
          completed: {
            id: "completed",
            title: "Closed",
            items: allTasks.taskCompleted || [],
          },
          block: {
            id: "block",
            title: "Blocked",
            items: allTasks.taskBlock || [],
          },
        },
        columnOrder: [
          "todo",
          "inprogress",
          "inreview",
          "done",
          "completed",
          "block",
        ],
      };

      setData(formattedData);
      setButtonLoading(false);
    } catch (err) {
      console.error("Fetch error:", err?.response || err.message);
      setError("Error fetching tasks.");
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const getStatusCircle = (status) => {
    switch (status.toLowerCase()) {
      case "todo":
        return (
          <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
        );
      case "inprogress":
        return (
          <span className="inline-block w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
        );
      case "inreview":
        return (
          <span className="inline-block w-2 h-2 rounded-full bg-orange-500 mr-2"></span>
        );
      case "done":
        return (
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
        );
      case "completed":
        return (
          <span className="inline-block w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
        );
      case "block":
        return (
          <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
        );
      default:
        return (
          <span className="inline-block w-2 h-2 rounded-full bg-gray-500 mr-2"></span>
        );
    }
  };

  // const filteredEmployees = projectname
  //   ? employeeOption.filter((emp) =>
  //       projectname.teamMembers.includes(emp.value)
  //     )
  //   : employeeOption;

  // project.find((role) => role === projectname)?.teamMembers ||
  //             employeeOption
  const projectFilter = project.filter((proj) => proj.value == projectname);

  const filteredEmployees = projectname
    ? employeeOption.filter(
        (emp) =>
          projectFilter[0].teamMembers.includes(emp.value) ||
          projectFilter[0].projectManager.includes(emp.value)
      )
    : employeeOption;

  return (
    <div className="w-full overflow-hidden">
      <div>
        {buttonLoading ? (
          <div className="flex justify-center items-center w-full h-screen">
            <div className="w-12 h-12 border-4 border-blue-500 rounded-full animate-ping"></div>
          </div>
        ) : (
          <div className=" p-5 w-full mt-10 ">
            <div className="flex gap-2 items-center cursor-pointer">
              <p
                className="text-sm text-gray-500"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </p>

              <p>{">"}</p>
              <p className="text-sm text-blue-500">Task List</p>
            </div>
            {/* <div className="flex justify-around  gap-8 my-8 text-[#6b7280] ">
              <div className="flex justify-between bg-[#f3f4f610]    border px-8 py-6 rounded-lg shadow-sm w-full">
                <div className="">
                  <h2 className="text-[16px]  font-semibold">Total Project</h2>
                  <p className="text-[14px]  mt-2 ">
                    {projectTaskCount?.totalProjectCount}
                  </p>
                </div>
                <div className="flex ">
                  <span className="text-blue-500 w-12 h-12 text-2xl bg-blue-200/30  rounded-full flex justify-center items-center">
                    <GoProjectSymlink />
                  </span>
                </div>
              </div>
              <div className="flex justify-between bg-[#f3f4f610] border px-8 py-6 rounded-lg shadow-sm w-full">
                <div className="">
                  <h2 className="text-[16px]   font-semibold">Total Tasks</h2>
                  <p className="text-[14px]  mt-2">
                    {projectTaskCount?.totalUserTasks}
                  </p>
                </div>
                <div className="flex">
                  <span className="text-blue-500 w-12 h-12 text-2xl bg-blue-200/30  rounded-full flex justify-center items-center">
                    {" "}
                    <VscTasklist />
                  </span>
                </div>
              </div>
              <div className="flex justify-between bg-[#f3f4f610]  border px-8 py-6 rounded-lg shadow-sm w-full">
                <div className="">
                  <h2 className="text-[16px]  font-semibold">Today Tasks</h2>
                  <p className="ext-[14px]  mt-2">
                    {projectTaskCount?.todayTasks}
                  </p>
                </div>
                <div className="flex">
                  <span className="text-blue-500 w-12 h-12 text-2xl bg-blue-200/30  rounded-full flex justify-center items-center">
                    {" "}
                    <FaTasks />
                  </span>
                </div>
              </div>
            </div> */}
            {/* add */}

            <div className="flex justify-between mt-8 mb-4">
              <div className="flex gap-8">
                {/* <select
              value={projectname}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-[300px] px-2 py-2  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a Project</option>
              {roles.map((role) => (
                <option key={role._id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select> */}
                <Dropdown
                  value={projectname}
                  onChange={(e) => setProjectName(e.value)}
                  options={project}
                  optionLabel="label"
                  filter
                  placeholder="Select a Project"
                  className="w-[300px]  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {/* <Dropdown
                  value={assignTo}
                  onChange={(e) => setAssignTo(e.value)}
                  // options={
                  //   project.find((role) => role === projectname)?.teamMembers ||
                  //   employeeOption
                  // }
                  options={filteredEmployees}
                  filter
                  optionLabel="label"
                  placeholder="Select a Employee"
                  className="w-full  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                /> */}
                <input
                  type="date"
                  className="px-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                  value={dateFilter}
                  max={new Date().toISOString().split('T')[0]} 
                  onChange={(e) => setDateFilter(e.target.value)}
                />
                <button
                  onClick={handleSearch}
                  className=" text-white bg-blue-500 hover:bg-blue-600 font-medium  rounded-lg px-4"
                >
                  Search
                </button>
              </div>

              <div className="flex gap-5 px-4">
                {/* <button
                  className="bg-red-500 hover:bg-red-600 px-4 text-white  rounded-2xl"
                  onClick={() => navigate("/close-details-client")}
                >
                  Close Lists
                </button> */}
                <button
                  className="bg-gray-600 hover:bg-gray-500 px-4 text-white  rounded-2xl"
                  onClick={() => navigate("/task-details-client")}
                >
                  Task List
                </button>
              </div>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
              <div className="flex gap-3 overflow-x-auto  ">
                {data &&
                  data.columnOrder.map((columnId) => {
                    const column = data.columns[columnId];

                    return (
                      <div
                        key={column.id}
                        className="w-[19.2%] h-[600px] bg-gray-100/80 shadow-sm rounded-md p-2 flex-shrink-0 relative "
                      >
                        <h2 className=" p-2 flex items-center sticky top-0 gap-1 mb-3 border-b-2 pb-2 border-gray-300">
                          {getStatusCircle(column.id)}
                          <span className=" text-[#6b7280] uppercase text-[12px] font-bold ">
                            {" "}
                            {column.title}
                          </span>
                          <span className="text-sm  bg-[#0515240f] text-[#292929] px-[4px] rounded-md">
                            {column?.items?.length}
                          </span>
                        </h2>

                        <Droppable droppableId={column.id}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className={`h-[520px] overflow-y-auto pr-1 hide-scrollbar `}
                            >
                              {column.items.map((item, index) => (
                                <Draggable
                                  key={item._id}
                                  draggableId={item._id}
                                  index={index}
                                >
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      onClick={() => handleNavigate(item)}
                                      className="bg-white rounded-sm shadow-[0px_6px_42px_-23px_rgba(0,_0,_0,_0.1)]   p-3 mb-2  hover:scale-[1.06] duration-300  cursor-pointer m-1"
                                    >
                                      {/* <div>{capitalizeFirstLetter(item.title)}</div> */}

                                      <div className="flex flex-col gap-4">
                                        {" "}
                                        <span className="truncate text-wrap text-[14px]  flex items-center justify-between">
                                          {item.title.length > 40
                                            ? `${item.title.substring(
                                                0,
                                                40
                                              )}...`
                                            : item.title}
                                          {item.testerStatus == 1 ? (
                                            <VscDebugConsole className="text-2xl text-green-950" />
                                          ) : (
                                            ""
                                          )}
                                        </span>
                                        <div>
                                          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 font-medium shadow-sm">
                                            {item.assignedTo?.employeeName
                                              ?.length > 16
                                              ? `${item.assignedTo?.employeeName.substring(
                                                  0,
                                                  20
                                                )}...`
                                              : item.assignedTo?.employeeName}
                                          </span>
                                        </div>
                                        <div className="">
                                          <span className="text-[10px]  bg-blue-100 rounded-full px-1 py-[2px]">
                                            {item.projectId?.name?.length > 16
                                              ? `${item.projectId?.name?.substring(
                                                  0,
                                                  16
                                                )}...`
                                              : item.projectId?.name}
                                          </span>
                                        </div>
                                        <div className="flex justify-between w-full">
                                          <span className="text-sm flex gap-2 items-center">
                                            #{item.taskId}
                                            <span className="text-xs">
                                              ({item.createdAt.split("T")[0]})
                                            </span>
                                          </span>
                                          <div
                                            className={`font-semibold capitalize ${
                                              item.priority === "high"
                                                ? "text-red-500"
                                                : item.priority === "medium"
                                                ? "text-orange-400"
                                                : item.priority === "low"
                                                ? "text-yellow-300"
                                                : "text-gray-500"
                                            }`}
                                          >
                                            <PiFlagPennantFill />
                                            {/* <PiFlagBannerFill className="text-xl" /> */}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              ))}

                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </div>
                    );
                  })}
              </div>
            </DragDropContext>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default TaskList;
