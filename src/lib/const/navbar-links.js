import React from "react";
import {RxDashboard, RxPerson} from "react-icons/rx";
import {AiFillAlipayCircle, AiOutlineSwap, AiOutlineUpload} from "react-icons/ai";
import { HiOutlineArrowUp, HiOutlineArrowDown, HiOutlineUserGroup } from "react-icons/hi";
import { GrRevert } from "react-icons/gr";
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
    key: "pay",
    label: "Pay",
    path: "/Pay",
    icon: <AiFillAlipayCircle />
  },
  {
    key: "beneficiaries",
    label: "Beneficiaries",
    path: "/ListBeneficiaries",
    icon: <RxPerson />
  },
  {
    key: "transactions",
    label: "Transactions",
    path: "/transactions",
    icon: <AiOutlineSwap />
  },
  {
    key: "convert",
    label: "Convert",
    path: "/Conversions",
    icon: <SiConvertio />
  },
  {
    key: "bulkupload",
    label: "Bulk Upload",
    path: "/bulkupload",
    icon: <AiOutlineUpload />
  }
]

export const ADMIN_USER_NAVIGATION_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/",
    icon: <RxDashboard />
  },
  {
    key: "pay",
    label: "Pay",
    path: "/Pay",
    icon: <AiFillAlipayCircle />
  },
  {
    key: "beneficiaries",
    label: "Beneficiaries",
    path: "/ListBeneficiaries",
    icon: <RxPerson />
  },
  {
    key: "transactions",
    label: "Transactions",
    path: "/transactions",
    icon: <AiOutlineSwap />
  },
  {
    key: "convert",
    label: "Convert",
    path: "/Conversions",
    icon: <SiConvertio />
  },
  {
    key: "bulkupload",
    label: "Bulk Upload",
    path: "/bulkupload",
    icon: <AiOutlineUpload />
  },
  {
    key: "reverttoself",
    label: "Revert To Self",
    path: "/reverttoself",
    icon: <GrRevert />
  },
]

export const ADMIN_NAVIGATION_LINKS = [
  {
    key: "transactions",
    label: "Debit Transactions",
    path: "/DebitTransactions",
    icon: <HiOutlineArrowUp />
  },
  {
    key: "credittransactions",
    label: "Credit Transactions",
    path: "/CreditTransactions",
    icon: <HiOutlineArrowDown />
  },
  {
    key: "memberships",
    label: "Memberships",
    path: "/memberships",
    icon: <HiOutlineUserGroup />
  },
]

export const BOTTOM_LINKS = [
  {
    key: "logout",
    label: "Logout",
    path: "/logout",
    icon: <IoIosLogOut />
  }
]