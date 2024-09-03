import React, { useEffect, useState } from 'react';
import { PrimaryButton } from '../components/button';
import { Constants } from '../lib/const/constants';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export default function VerifyPhone() {
    const navigate = useNavigate();
    const [change, setChange] = useState(false);
    const [countrycode, setCountrycode] = useState("44");
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [count, setCount] = useState(60);
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        setCountrycode(sessionStorage.getItem('user_country_code'))
        var phoneNo = sessionStorage.getItem('user_phone');
        phoneNo = phoneNo.replace(/^0+(?=\d)/, '');
        setPhone(phoneNo)
        const pin = sessionStorage.getItem('enterPin')
        const email = sessionStorage.getItem('user_email')
        console.log(JSON.stringify({
            "email": email,
            "password": pin
        }));
    }

    useEffect(() => {
        getData()
        const interval = setInterval(() => {
            if (count === 0) {
                clearInterval(interval);
            } else {
                setCount(count - 1);
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [count])



    const setAsyncData = async (key, value) => {
        sessionStorage.setItem(key, value)
    }
    const updateMobile = async () => {
        const token = sessionStorage.getItem('registrationToken');
        console.log(phone);
        await axios.post(Constants.BASE_URL + 'API-FX-108-ModifyMobile', {
            "phone": phone
        }, {
            headers: {
                Authorization: "Bearer " + token,
                fx_key: Constants.SUBSCRIPTION_KEY
            }
        }).then(resp => {
            console.log(resp.data);
            setAsyncData('user_phone', phone)
            alert(resp.data.message)
        }).catch(err => { console.log(); alert(err.response.data.message); })


        setChange(false)
    }

    const resendOtp = async () => {
        setLoading(true)
        var url = "";
        url = Constants.BASE_URL + 'API-FX-107-ResendMobileOTP'
        const token = sessionStorage.getItem('registrationToken');

        await axios.post(url, {}, {
            headers: {
                Authorization: "Bearer " + token,
                fx_key: Constants.SUBSCRIPTION_KEY
            }
        }).then(resp => {
            console.log(resp.data);
            setCount(60)
            alert(resp.data.message)
            setLoading(false)
        }).catch(err => { console.log(err); alert('Please try after sometime.'); setLoading(false); })
    }
    const otpValidate = async () => {
        setLoading(true)
        let enteredOtp = otp;
        const token = sessionStorage.getItem('registrationToken');
        var deviceId = sessionStorage.getItem('deviceid');
        var userid = sessionStorage.getItem('userid');
        var url = "";
        url = Constants.BASE_URL + 'API-FX-106-MobileVerification'
        await axios.post(url, {
            "code": enteredOtp
        }, {
            headers: {
                Authorization: "Bearer " + token,
                fx_key: Constants.SUBSCRIPTION_KEY
            }
        }).then(resp => {
            console.log(resp.data);
            if (resp.data.message == 'Phone OTP Verified' || resp.data.message == 'Email OTP Verified') {

                axios.post(Constants.BASE_URL + "API-FX-159-DROPSCREEN", {
                    screen_name: "MOBILE_OTP_3",
                    meta: { enteredOtp: enteredOtp },
                    device_id: deviceId,
                    user_id: userid
                }, {
                    headers: {
                        fx_key: Constants.SUBSCRIPTION_KEY
                    }
                }).then(dropresponse => {
                    console.log(dropresponse.data);
                    navigate('/VerifyEmail');
                }).catch(dropError => {
                    alert(dropError.response.data.message)
                })
            }
            else {
                alert('Invalid OTP')
            }
            setLoading(false);
        }).catch(err => { console.log(err.response.data);
         alert('Invalid OTP'); setLoading(false); })

        setLoading(false);
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


                <h1 className="text-2xl font-bold mb-2 uppercase">Mobile OTP Verification</h1>
                {!change ? (
                    <div className="flex items-center mb-4 rounded-2xl w-full space-x-2">
                        <span>+{countrycode} {phone}</span>
                        <button
                          className="text-[#1D3BFF] text-sm font-semibold"
                          onClick={() => setChange(true)}
                        >Change</button>
                    </div>
                ) : (
                  <div className="flex items-center mb-4 rounded-2xl w-full p-2">
                      <input
                        type="number"
                        placeholder="Enter Your Mobile Number"
                        className="flex-grow p-2 outline-none rounded-l-2xl bg-custom-gray-light placeholder:text-custom-neutral-900 placeholder:text-sm"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      <button
                        onClick={updateMobile}
                        className="bg-blue-600 text-white px-4 py-2 rounded-r-2xl hover:bg-blue-700 transition-colors duration-200"
                      >
                          Update
                      </button>
                  </div>

                )}


                <div>
                    <input
                      type="number"
                      required
                      placeholder="Enter Your OTP"
                      className="w-full p-2 outline-none rounded-2xl bg-custom-gray-light placeholder:text-custom-neutral-900 placeholder:text-sm"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                </div>

                <div>
                    {count == 0 && (
                      <button
                        className="text-[#1D3BFF] text-sm font-semibold"
                        onClick={resendOtp}
                      >Resend OTP</button>)}
                    {count !== 0 && (
                        <button >
                            {' '}
                            {count + ' seconds'}
                        </button>
                    )}
                </div>


                <PrimaryButton
                    onClick={otpValidate}
                    label={"Verify OTP"}
                    loading={loading}
                />

                <div className='my-5'>
                    Already Registered?
                    <button onClick={()=>navigate("/login")} className="text-sm font-semibold">
                        &nbsp; Login Here
                    </button>
                </div>
            </div>
        </div>
    );
}