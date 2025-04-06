import React, { useEffect, useState } from 'react';
import {Outlet} from "react-router-dom";
import ExternalSidebar from "./ExternalSidebar";
import { useNavigate } from "react-router-dom";
import HeadingBarWithSearch from '../HeadingBarWithSearch';
import { Toaster } from 'react-hot-toast';

export default function ExternalLayout() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');

  const getData = async() =>{
    const user = sessionStorage;
    console.log("hihihihi"+JSON.stringify(user));
    
    if (user.getItem('external_login_id') === '' || user.getItem('external_login_id') == null) {
      sessionStorage.clear();
      navigate('/externalLogin')
    }
    setFullName(user.getItem('external_login_full_name'));
  }
  useEffect(()=>{
    getData()
  })
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <div>
        <HeadingBarWithSearch fullName={fullName} />
      </div>
      <div className="overflow-hidden flex flex-row" style={{ height: 'calc(100vh - 87.11px)' }}>
        <ExternalSidebar />
        <div className="flex flex-1 flex-col bg-slate-200 px-4">
          <div className="flex-1 p-4 min-h-0 overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}