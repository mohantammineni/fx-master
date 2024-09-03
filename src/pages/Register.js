import React, { useId, useState } from 'react';
import { PrimaryButton } from '../components/button';
import { Constants } from '../lib/const/constants';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    var deviceId = useId();
    const [loading, setLoading] = useState("");
    const [pin, setPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [regType, setRegType] = useState("personal");


    const submitHandler = async () => {
        setLoading(true);
        if (confirmPin === pin) {
            sessionStorage.setItem('enterPin', pin)
            sessionStorage.setItem('deviceid', deviceId)
            console.log(deviceId);
            axios.post(Constants.BASE_URL + "API-FX-159-DROPSCREEN", {
                screen_name: "CREATE_ACCOUNT_1",
                meta: { enterPin: pin },
                device_id: deviceId,
                user_id: Date.now()
            }, {
                headers: {
                    fx_key: Constants.SUBSCRIPTION_KEY
                }
            }).then(dropresponse => {
                console.log(dropresponse.data);
                setLoading(false);
                submitHandlerNationality();
            }).catch(dropError => {
                console.log(dropError.response.data);
                setLoading(false);
                alert(dropError.response.data.message)
            })
        }
        else {
            alert('PIN Mismatch')
            setLoading(false);
        }
    };


    const submitHandlerNationality = async () => {
        setLoading(true)
        if (email.trim() == "" || mobile.trim() == "" || pin.trim() == "" || confirmPin.trim() == "") {
            alert("Please fill all the mandatory fields.");
            setLoading(false)
        }
        else {
            const selectedTitle = sessionStorage.getItem('select_title');
            const selectedOccupation = sessionStorage.getItem('occupation');
            const selectedPurposeOfAccount = sessionStorage.getItem('purpose_of_account');
            const destinationCountry = sessionStorage.getItem('destination_country');
            const nationality = sessionStorage.getItem('nationality');
            const firstName = sessionStorage.getItem('firstName')
            const middleName = sessionStorage.getItem('middleName')
            const lastName = sessionStorage.getItem('lastName')
            const enterPin = sessionStorage.getItem('enterPin')
            var deviceId = sessionStorage.getItem('deviceid');
            await axios.post(Constants.BASE_URL + "API-FX-105-CustomerSignup", {
                "title_id": "1",
                "first_name": "NA",
                "middle_name": "NA",
                "last_name": "NA",
                "country_code": "44",
                "nationality": nationality,
                "password": enterPin,
                "password_confirmation": enterPin,
                "country_id": "231",
                "phone": mobile,
                "email": email,
                "is_banking_user": 2,
                "type": "standard",
                "occupation": selectedOccupation,
                "account": selectedPurposeOfAccount,
                "destination_country": destinationCountry
            }, {
                headers: {
                    fx_key: Constants.SUBSCRIPTION_KEY
                }
            }).then(response => {
                console.log(JSON.stringify(response.data.data));
                setAsyncData('userid', JSON.stringify(response.data.data.id))
                setAsyncData('user_full_name', response.data.data.full_name)
                setAsyncData('user_email', response.data.data.email)
                setAsyncData('user_phone', response.data.data.phone)
                setAsyncData('user_first_name', response.data.data.first_name)
                setAsyncData('user_middle_name', response.data.data.middle_name)
                setAsyncData('user_last_name', response.data.data.last_name)
                setAsyncData('user_country_code', response.data.data.country_code)
                setAsyncData('user_country_id', response.data.data.country_id)
                setAsyncData('user_country_name', response.data.data.country_name)
                setAsyncData('user_registration_step', response.data.data.registration_step)
                setAsyncData('registrationToken', response.data.token)
                setAsyncData('user_workspaces', JSON.stringify(response.data.data.workspaces))
                setAsyncData('registrationType',regType);

                axios.post(Constants.BASE_URL + "API-FX-159-DROPSCREEN", {
                    screen_name: "NATIONALITY_2",
                    meta: { title_id: selectedTitle, country_code: "44", nationality: nationality, password: enterPin, country_id: "231", phone: mobile, email: email, is_banking_user: 2, type: "standard", destination_country: destinationCountry, first_name: firstName, middle_name: middleName, last_name: lastName, registrationToken: response.data.token, user_registration_step: response.data.data.registration_step,registrationType:regType },
                    device_id: deviceId,
                    user_id: response.data.data.id
                }, {
                    headers: {
                        fx_key: Constants.SUBSCRIPTION_KEY
                    }
                }).then(dropresponse => {
                    console.log(dropresponse.data);
                    setLoading(false)
                    navigate("/VerifyPhone");
                }).catch(dropError => {
                    setLoading(false)
                    alert(dropError.response.data.message)
                })
            }).catch(error => {
                alert(error.response.data.message);
                setLoading(false)
            })
        }
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


                <h1 className="text-2xl font-bold mb-2 uppercase">Register Here</h1>

                <div className="flex items-center mb-4 rounded-2xl w-full">
                    <div className="flex space-x-8">
                        <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="regType"
                              value="personal"
                              checked={regType === 'personal'}
                              onChange={(e) => setRegType(e.target.value)}
                              className="form-radio h-4 w-4 text-blue-600"
                            />
                            <span>Personal</span>
                        </label>

                        <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="regType"
                              value="corporate"
                              checked={regType === 'corporate'}
                              onChange={(e) => setRegType(e.target.value)}
                              className="form-radio h-4 w-4 text-blue-600"
                            />
                            <span>Business</span>
                        </label>
                    </div>
                </div>
                <div className="flex items-center mb-4 bg-custom-gray-light rounded-2xl w-full">
                    <input
                      type="text"
                      placeholder="Enter Mobile Number"
                      className="w-full p-2 outline-none rounded-2xl bg-custom-gray-light placeholder:text-custom-neutral-900 placeholder:text-sm"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                </div>

                <div className="flex items-center mb-4 bg-custom-gray-light rounded-2xl w-full">
                    <input
                      type="email"
                      placeholder="Enter Your Email"
                      className="w-full p-2 outline-none rounded-2xl bg-custom-gray-light placeholder:text-custom-neutral-900 placeholder:text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="flex items-center mb-4 bg-custom-gray-light rounded-2xl w-full">
                    <input
                        type="password"
                        placeholder="Enter Pin"
                        className="w-full p-2 outline-none rounded-2xl bg-custom-gray-light placeholder:text-custom-neutral-900 placeholder:text-sm"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                    />
                </div>


                <div className="flex items-center mb-4 bg-custom-gray-light rounded-2xl w-full">
                    <input
                        type="password"
                        placeholder="Re-Enter Your Pin"
                        className="w-full p-2 outline-none rounded-2xl bg-custom-gray-light placeholder:text-custom-neutral-900 placeholder:text-sm"
                        value={confirmPin}
                        onChange={(e) => setConfirmPin(e.target.value)}
                    />
                </div>

                <PrimaryButton
                    onClick={submitHandler}
                    label={"Register"}
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