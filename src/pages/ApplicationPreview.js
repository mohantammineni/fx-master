import React, { useEffect, useState } from 'react';
import { Constants } from '../lib/const/constants';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export default function ApplicationPreview() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        loginHandler()
    }, [])
    const setAsyncData = async (key, value) => {
        sessionStorage.setItem(key, value);
    }
    const removeAsyncData = async (key) => {
        sessionStorage.removeItem(key);
    }

    const loginHandler = async () => {
        setLoading(true);
        const pin = sessionStorage.getItem('enterPin')
        const email = sessionStorage.getItem('user_email')
        await axios.post(Constants.BASE_URL + "API-FX-120-Login", {
            "email": email,
            "password": pin
        }, {
            headers: {
                fx_key: Constants.SUBSCRIPTION_KEY
            }
        }).then(resp => {
            console.log("loginnnnnn"+resp.data);
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
            if (resp.data.default_bank.length > 0) {
                setAsyncData("defaultBank", resp.data.default_bank[0])
                setAsyncData("clearBankCustomerId", resp.data.clear_bank_data[0].customer_id)
            }
            else {
                setAsyncData("defaultBank", "CC as Service")
                setAsyncData("clearBankCustomerId", "")
            }
            setAsyncData("kyc_submitted", "true");
            removeAsyncData("enterPin");
            setLoading(false);
            accountPreview(resp.data.token, resp.data.data.id);
        }).catch(err => {
            alert(err.response.data.message);
            setLoading(false);
        })

    };

    const accountPreview = async (token) => {
        console.log("prev");
        axios.get(Constants.BASE_URL + "API-FX-154-ApplicationPreview", {
            headers: {
                fx_key: Constants.SUBSCRIPTION_KEY,
                Authorization: "Bearer " + token,
            }
        }).then(resp => {
            console.log(resp.data);
            navigate('/')
        }).catch(err => {
            console.log(err);
        })
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


                <h1 className="text-2xl font-bold mb-2 uppercase">Verify KYC</h1>
                {loading &&
                    (<div> Loading... </div>)}

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