import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import HeadingBarWithSearch from "../HeadingBarWithSearch";
import { Toaster } from "react-hot-toast";

export default function Layout() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Sidebar toggle state

  const getData = async () => {
    const user = sessionStorage;
    if (
      user.getItem("login_id") === "" ||
      user.getItem("login_id") == null
    ) {
      if (
        user.getItem("staff_login_id") === "" ||
        user.getItem("staff_login_id") == null
      ) {
        sessionStorage.clear();
        navigate("/business");
      } else {
        navigate("/DebitTransactions");
      }
    }
    setFullName(user.getItem("login_full_name"));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div>
        {/* Pass toggle logic to the header */}
        <HeadingBarWithSearch
          fullName={fullName}
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </div>
      <div className="flex h-[calc(100vh-87.11px)] overflow-hidden">
        {/* Pass toggle logic to the sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col bg-slate-200 overflow-hidden">
          <div className="flex-1 p-4 overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
