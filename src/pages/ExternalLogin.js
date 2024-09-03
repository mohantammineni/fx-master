import React, { useState } from 'react';
import { FaLock, FaUser } from 'react-icons/fa';
import { PrimaryButton } from '../components/button';
import { Constants } from '../lib/const/constants';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function ExternalLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    await axios.post('http://127.0.0.1:8000/api/v1/externallogin', {
      email: username,
      password: password
    }, {
      headers: {
        'fx_key': Constants.SUBSCRIPTION_KEY,
      }
    }).then(resp => {
        console.log("login"+(resp.data.id));
        console.log("login"+(resp.data.username));
        
      loadAppDefault();
      loadcountries();
        setAsyncData("external_login_id", JSON.stringify(resp.data.id))
        setAsyncData("external_login_full_name", resp.data.username)
        setLoading(false);
        navigate('/externalDashboard/approveTransactions')
      setLoading(false);
    }).catch(err => {
      console.log(JSON.stringify(err.response.data));
      setError(err.response.data.message)
      setLoading(false);
    })
  };

  const loadcountries = async () => {
    await axios.get(Constants.BASE_URL + "API-FX-102-Country", {
      headers: {
        fx_key: Constants.SUBSCRIPTION_KEY
      }
    }).then(response => {
      setAsyncData('countries', JSON.stringify(response.data.data));
    }).catch(error => {
      console.log("countr" + error.response.data);
    })
  }
  const loadAppDefault = async() =>{
    await axios.get(Constants.BASE_URL + "API-FX-100-App", {
      headers: {
        fx_key: Constants.SUBSCRIPTION_KEY
      }
    }).then(response => {
      setAsyncData('transfer_reasons', JSON.stringify(response.data.data.transfer_reasons));
    }).catch(error => {
      console.log("app" + error.response);
    })
  }
  const setAsyncData = async (key, value) => {
    sessionStorage.setItem(key, value);
  }



  return (
    <div className="flex h-screen">
      <div className="w-1/2">
        <img
          src="loginbg.png"
          alt="Left Side"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="w-1/2 flex flex-col justify-center items-start p-8 border-l">
        {/* Logo */}
        <div className="mb-4">
          <img src="fx_logo.png" alt="Logo" className="w-24" />
        </div>

        {/* Welcome Back */}
        <h1 className="text-2xl font-bold mb-2 uppercase">Welcome Back</h1>

        {/* Paragraph */}
        <p className="text-sm font-medium mb-6">
          Swift, Secure, Seamless: Experience the Best Transfer Service Today
        </p>

        {/* Error Message */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Username Input */}
        <div className="flex items-center mb-4 bg-custom-gray-light rounded-2xl w-full">
          <FaUser className="text-gray-500 ml-3" />
          <input
            type="text"
            placeholder="Enter E-mail ID"
            className="w-full p-2 outline-none rounded-2xl bg-custom-gray-light placeholder:text-custom-neutral-900 placeholder:text-sm"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="flex items-center mb-4 bg-custom-gray-light rounded-2xl w-full">
          <FaLock className="text-gray-500 ml-3" />
          <input
            type="password"
            placeholder="Enter 6 digit PIN"
            className="w-full p-2 outline-none rounded-2xl bg-custom-gray-light placeholder:text-custom-neutral-900 placeholder:text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <PrimaryButton
          onClick={handleLogin}
          label={"Login"}
          loading={loading}
        />
      </div>
    </div>
  );
}