import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Mobile_Sidebar from "../Mobile_Sidebar";
import Footer from "../Footer";
import Loader from "../Loader";

const DashboardClient_Mainbar = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user info from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("hrmsuser"));
    if (storedUser) {
      setUserDetails(storedUser);
    } else {
      // If no user data found, redirect to login
      navigate("/login");
    }
    setLoading(false);
  }, [navigate]);

  // ✅ Handle card click
  const onClickCard = (id) => {
    if (!id) return;
    navigate(`/client-details/${id}`); // change this path as needed
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="h-full w-screen flex flex-col justify-between min-h-screen bg-gray-100">
      {loading ? (
        <Loader />
      ) : (
        <>
      <div className="px-3 py-3 md:px-7 lg:px-10 xl:px-16 md:py-10">
        <Mobile_Sidebar />

        <div className="flex gap-2 items-center">
          <p className="text-sm text-blue-500">Dashboard</p>
          <p>{">"}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-5 mt-8">
          {/* Client Card Section */}
          <section className="w-full flex items-center gap-10">
            {/* <div className="flex flex-wrap gap-5">
              <div
                className="flex basis-full w-[300px] rounded-2xl bg-white shadow-sm cursor-pointer bg-cover flex-col top-8 items-center px-3 py-3 md:px-5 md:py-5 hover:shadow-md transition"
                title="Click here to view full details"
                // onClick={() => onClickCard(userDetails?._id)}
              >
                <div className="flex flex-col items-center mt-2">
                  <p className="text-[24px] font-medium text-center capitalize">
                    {userDetails?.name || "Client Name"}
                  </p>
                  <p className="text-gray-500 text-md mt-2">
                    {userDetails?.companyName || "Company Name"}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    {userDetails?.email || "Email not found"}
                  </p>
                </div>
              </div>
            </div> */}
          </section>
        </div>
      </div>
        </>
      )}
      <Footer />
    </div>
  );
};

export default DashboardClient_Mainbar;
