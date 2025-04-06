import React, { useState } from 'react';
import { FaLock, FaUser } from 'react-icons/fa';
import { PrimaryButton } from '../components/button';
import { Constants } from '../lib/const/constants';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function StaffLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    await axios.post(Constants.BASE_URL + 'API-FX-197-STAFF_LOGIN', {
      email: username,
      password: password
    }, {
      headers: {
        'fx_key': Constants.SUBSCRIPTION_KEY,
      }
    }).then(resp => {
      console.log(JSON.stringify(resp.data));
      loadAppDefault();
      loadcountries();
        setAsyncData("staff_login_id", JSON.stringify(resp.data.data.id))
        setAsyncData("login_id", JSON.stringify(resp.data.data.id))
        setAsyncData("login_full_name", resp.data.data.full_name)
        setAsyncData("login_email", resp.data.data.email)
        setAsyncData("login_phone", resp.data.data.phone)
        setAsyncData("login_date_of_birth", resp.data.data.date_of_birth)
        setAsyncData("login_country_code", resp.data.data.country_code)
        setAsyncData("login_country_id", JSON.stringify(resp.data.data.country_id))
        setAsyncData("login_country_name", resp.data.data.country_name)
        setAsyncData("login_nationality", resp.data.data.nationality)
        setAsyncData("staff_login_token", JSON.stringify(resp.data.token))
        setAsyncData("admin_login", '1');
        setAsyncData("kyc_submitted", "true");
        navigate('/DebitTransactions')
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
    sessionStorage.removeItem('yotiurl')
    sessionStorage.removeItem('totalprocessingurl')
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

        {/* Remember Me and Forgot Pin */}
        <div className="flex justify-between items-center w-full mb-8">
          <div className="flex items-center">
            {/* <input type="checkbox" id="remember" className="mr-2 p-4" />
            <label htmlFor="remember" className="text-sm font-semibold">
              Remember me
            </label> */}
          </div>
          <div>
            {/* <button onClick={() => navigate("/forgotPin")} className="text-sm font-semibold">
              Forgot Pin?
            </button> */}
          </div>
        </div>

        {/* Login Button */}
        {/* <button
          className="w-full bg-custom-neutral-900 text-custom-sky-blue-500 py-2 rounded-4xl text-sm"
          onClick={handleLogin}
        >
          Login
        </button> */}
        <PrimaryButton
          onClick={handleLogin}
          label={"Login"}
          loading={loading}
        />

        {/* <div className='my-5'>
          Donnot have an account?
          <button onClick={() => navigate('/Register')} className="text-sm font-semibold">
            &nbsp; Register Here
          </button>
        </div> */}
      </div>
    </div>
  );
}