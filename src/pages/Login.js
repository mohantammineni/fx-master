import React, { useId, useState } from 'react';
import { FaLock, FaUser } from 'react-icons/fa';
import { PrimaryButton } from '../components/button';
import { Constants } from '../lib/const/constants';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const deviceId = useId();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pin, setPin] = useState('');


  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    await axios.post(Constants.BASE_URL + 'API-FX-120-Login', {
      email: username,
      password: password
    }, {
      headers: {
        'fx_key': Constants.SUBSCRIPTION_KEY,
      }
    }).then(resp => {
      console.log(JSON.stringify(resp));
      loadAppDefault();
      loadcountries();
      if (resp.data.data.registration_step == 'account_preview') {
        setAsyncData("login_id", JSON.stringify(resp.data.data.id))
        setAsyncData("login_full_name", resp.data.data.full_name)
        setAsyncData("login_email", resp.data.data.email)
        setAsyncData("login_phone", resp.data.data.phone)
        setAsyncData("login_date_of_birth", resp.data.data.date_of_birth)
        setAsyncData("login_country_code", resp.data.data.country_code)
        setAsyncData("login_country_id", JSON.stringify(resp.data.data.country_id))
        setAsyncData("login_country_name", resp.data.data.country_name)
        setAsyncData("login_nationality", resp.data.data.nationality)
        setAsyncData("login_registration_step", resp.data.data.registration_step)
        setAsyncData("login_is_banking_user", JSON.stringify(resp.data.data.is_banking_user))
        setAsyncData("login_status", resp.data.data.status)
        setAsyncData("login_yoti_status", resp.data.data.yoti_status)
        setAsyncData("login_workspaces", JSON.stringify(resp.data.data.workspaces))
        setAsyncData("login_workspaces_id", JSON.stringify(resp.data.data.workspaces[0].id))
        setAsyncData("login_token", JSON.stringify(resp.data.token))
        setAsyncData("login_address", JSON.stringify(resp.data.data.addresses[0].address + resp.data.data.addresses[0].street))
        setAsyncData("login_postcode", JSON.stringify(resp.data.data.addresses[0].postcode))
        setAsyncData("login_city", JSON.stringify(resp.data.data.addresses[0].city))
        setAsyncData("login_currency_code_iso", resp.data.data.addresses[0].country.currency)
        console.log(resp.data.default_bank);
        if (resp.data.default_bank.length > 0) {
          setAsyncData("defaultBank", resp.data.default_bank[0])
          setAsyncData("clearBankCustomerId", resp.data.clear_bank_data[0].customer_id)
          setAsyncData("clearBankCustomerBankCode", resp.data.clear_bank_data[0].meta.bank[0].BankCode)
          setAsyncData("clearBankCustomerIBAN", resp.data.clear_bank_data[0].meta.bank[0].IBAN)
          setAsyncData("clearBankCustomerWalletId", resp.data.clear_bank_data[0].meta.bank[0].WalletId)
          setAsyncData("clearBankCustomerSWIFTCode", resp.data.clear_bank_data[0].meta.bank[0].SWIFTCode)
          setAsyncData("clearBankCustomerAccountName", resp.data.clear_bank_data[0].meta.bank[0].AccountName)
          setAsyncData("clearBankCustomerWalletNumber", resp.data.clear_bank_data[0].meta.bank[0].WalletNumber)
          setAsyncData("clearBankCustomerSortCode", resp.data.clear_bank_data[0].meta.bank[0].sortCode)
          setAsyncData("clearBankCustomerServiceProviderAccountId", resp.data.clear_bank_data[0].meta.bank[0].ServiceProviderAccountId)
          setAsyncData("clearBankCustomerContactId", resp.data.clear_bank_data[0].meta.contactDetail[0].ContactId)
        }
        else {
          setAsyncData("defaultBank", "CC as Service")
          setAsyncData("clearBankCustomerId", "")
        }
        setAsyncData("kyc_submitted", "true");
        setLoading(false);
        setAsyncData("login_id", JSON.stringify(resp.data.data.id))
        console.log("rrrrr" + resp.data.data.id);
        navigate('/')
      }
      else {
        dropscreens(resp.data.data.id, pin)
        setLoading(false);
      }
      setLoading(false);
    }).catch(err => {
      console.log(JSON.stringify(err.response.data));
      setError(err.response.data.message)
      setPin("");
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
  const dropscreens = async (userid, pin) => {
    await axios.get(Constants.BASE_URL + "API-FX-160-DROPSCREENDETAILS?user-id=" + userid, {
      headers: {
        fx_key: Constants.SUBSCRIPTION_KEY
      }
    }).then(dropresp => {
      var pagename = "";
      for (var d = 0; d < dropresp.data.length; d++) {
        if (dropresp.data[d].screen_name == "NATIONALITY_2") {
          setAsyncData('userid', JSON.stringify(userid))
          setAsyncData('user_full_name', dropresp.data[d].meta.first_name)
          setAsyncData('user_email', dropresp.data[d].meta.email)
          setAsyncData('user_phone', dropresp.data[d].meta.phone)
          setAsyncData('user_first_name', dropresp.data[d].meta.first_name)
          setAsyncData('user_middle_name', dropresp.data[d].meta.middle_name)
          setAsyncData('user_last_name', dropresp.data[d].meta.last_name)
          setAsyncData('user_country_code', dropresp.data[d].meta.country_code)
          setAsyncData('user_country_id', dropresp.data[d].meta.country_id)
          setAsyncData('registrationToken', dropresp.data[d].meta.registrationToken)
          setAsyncData('deviceid', deviceId)
          setAsyncData('firstName', dropresp.data[d].meta.first_name)
          setAsyncData('middleName', dropresp.data[d].meta.middle_name)
          setAsyncData('lastName', dropresp.data[d].meta.last_name)
          setAsyncData('registrationType', dropresp.data[d].meta.registrationType)
          pagename = 'VerifyPhone';
        }
        if (dropresp.data[d].screen_name == "MOBILE_OTP_3") {
          pagename = 'VerifyEmail';
        }
        if (dropresp.data[d].screen_name == "EMAIL_OTP_4") {
          pagename = 'SumSubRegister';
        }
        if (dropresp.data[d].screen_name == "DOB_ADDRESS_5") {
          // setAsyncData("yotisessionID", dropresp.data[d].meta.yotisessionID);
          // setAsyncData("yotisessionToken", dropresp.data[d].meta.yotisessionToken);
          // setAsyncData("yotiurl", dropresp.data[d].meta.yotiurl);
          setAsyncData("enterPin", pin);
          if (dropresp.data[d].meta.regType == 'personal')
            pagename = 'ApplicationPreview';
          else
            pagename = 'BusinessDetails';
        }
        if (dropresp.data[d].screen_name == "BUSINESS_DETAILS_6") {
          setAsyncData('activity', dropresp.data[d].meta.activity);
          setAsyncData('turnover', dropresp.data[d].meta.turnover);
          setAsyncData('selectedAddress', dropresp.data[d].meta.selectedAddress);
          setAsyncData('selectedcompanyName', dropresp.data[d].meta.selectedcompanyName);
          setAsyncData('selectedcompanyNumber', dropresp.data[d].meta.selectedcompanyNumber);
          setAsyncData('selectedcompanyAddress', dropresp.data[d].meta.selectedcompanyAddress);
          setAsyncData('selectedcompanyPostalCode', dropresp.data[d].meta.selectedcompanyPostalCode);
          setAsyncData('selectedcompanyStatus', dropresp.data[d].meta.selectedcompanyStatus);
          setAsyncData('selectedcompanyCountry', dropresp.data[d].meta.selectedcompanyCountry);
          setAsyncData('selectedcompanyStreet', dropresp.data[d].meta.selectedcompanyStreet);
          setAsyncData('selectedcompanyHouseNumber', dropresp.data[d].meta.selectedcompanyHouseNumber);
          pagename = 'AboutBusiness';
        }
        if (dropresp.data[d].screen_name == "ABOUT_BUSINESS_7") {
          setAsyncData('businessWebsite', dropresp.data[d].meta.website);
          setAsyncData('businessEmail', dropresp.data[d].meta.email);
          setAsyncData('businessPhone', dropresp.data[d].meta.phone);
          setAsyncData('businessAbout', dropresp.data[d].meta.about);
          pagename = 'BusinessAddress';
        }
        if (dropresp.data[d].screen_name == "BUSINESS_ADDRESS_8") {
          pagename = 'SelectOfficer';
        }
        if (dropresp.data[d].screen_name == "SELECT_OFFICER_9") {
          setAsyncData("enterPin", pin);
          pagename = 'ApplicationPreview';
        }
        if (dropresp.data[d].screen_name == "YOTI_COMPLETED_6") {
          setAsyncData("enterPin", pin);
          pagename = 'ApplicationPreview';
        }
        if (pagename != "" && pagename != null) {
          navigate('/' + pagename)
        }
      }
      setLoading(false);
    }).catch(droperr => {
      console.log(droperr.response.data);
      setLoading(false);
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
            <button onClick={() => navigate("/forgotPin")} className="text-sm font-semibold">
              Forgot Pin?
            </button>
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