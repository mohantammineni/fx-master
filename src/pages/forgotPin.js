import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { PrimaryButton } from '../components/button';
import { Constants } from '../lib/const/constants';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function ForgotPin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const submitHandler = async () => {
    if(email!='')
    {
      setLoading(true)
      await axios.post(Constants.BASE_URL+"API-FX-121-ForgotPassword",{
        "email": email
      },{
        headers: {
          fx_key: Constants.SUBSCRIPTION_KEY
        }
      }).then(resp=>{
        console.log(resp.data);
        setMessage("We've sent you an email with instructions on how to reset the 6 digit PIN(also check the Spam folder)");
        setLoading(false)
      }).catch(err=>{
        console.log(err.response.data);
        alert(err.response.data.message)
        setLoading(false)
      })
    }
    else
    alert('Please enter your registered email');
  };



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
        <h1 className="text-2xl font-bold mb-2 uppercase">Reset PIN</h1>

        {/* Paragraph */}
        <p className="text-sm font-medium mb-6">
        You will receive an email to your registered email address to create new 6 digit PIN
        </p>

        {message && <div className="text-red-500 mb-4">{message}</div>}

        {/* Username Input */}
        <div className="flex items-center mb-4 bg-custom-gray-light rounded-2xl w-full">
          <FaUser className="text-gray-500 ml-3" />
          <input
            type="email"
            placeholder="Enter E-mail ID"
            className="w-full p-2 outline-none rounded-2xl bg-custom-gray-light placeholder:text-custom-neutral-900 placeholder:text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

       
        <PrimaryButton
          onClick={submitHandler}
          label={"Submit"}
          loading={loading}
        />

        <div className='my-5'>
          Remember Password?
          <button onClick={()=>navigate('/login')} className="text-sm font-semibold">
            &nbsp; Login Here
          </button>
        </div>
      </div>
    </div>
  );
}