import React from "react";
import {RxDashboard} from "react-icons/rx";
import {AiOutlineSwap} from "react-icons/ai";
import {SiConvertio} from "react-icons/si";
import {IoIosLogOut} from "react-icons/io";

export const NAVIGATION_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/",
    icon: <RxDashboard />
  },
  {
    key: "transactions",
    label: "Transactions",
    path: "/transactions",
    icon: <AiOutlineSwap />
  },
  {
    key: "convert",
    label: "Conversions",
    path: "/Conversions",
    icon: <SiConvertio />
  }
]

export const BOTTOM_LINKS = [
  {
    key: "logout",
    label: "Logout",
    path: "/logout",
    icon: <IoIosLogOut />
  }
]