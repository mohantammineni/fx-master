import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Constants } from '../lib/const/constants';
import { PrimaryButton } from '../components/button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useId } from 'react';
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const paramsdata = location.state;
    const account_id = paramsdata.account_id;
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState({});
    const [titles, setTitles] = useState([]);
    const [url, setUrl] = useState();
    const [kycLoading, setkycLoading] = useState(false);
    const deviceId = useId()

    const submitHandler = async () => {
        setLoading(true)

        await axios.post(Constants.BASE_URL + "API-FX-159-DROPSCREEN", {
            screen_name: "CREATE_ACCOUNT_1",
            meta: { enterPin: details.pin },
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
            toast.error(dropError.response.data.message)
        })
    };


    const submitHandlerNationality = async () => {
        setLoading(true)
        if (details.email.trim() == "" || details.mobile.trim() == "" || details.pin.trim() == "") {
            toast.error("Please fill all the fields.");
            setLoading(false)
        }
        else {
            var titleDetails = (details.title).split("_");
            await axios.post(Constants.BASE_URL + "API-FX-105-CustomerSignup", {
                "title_id": titleDetails[1],
                "first_name": details.first_name,
                "middle_name": "",
                "last_name": details.last_name,
                "country_code": "44",
                "nationality": details.nationality,
                "password": details.pin,
                "password_confirmation": details.pin,
                "country_id": "231",
                "phone": details.mobile,
                "email": details.email,
                "is_banking_user": 2,
                "type": "standard",
                "occupation": "NA",
                "account": "NA",
                "destination_country": "NA",
                "domain": 1
            }, {
                headers: {
                    fx_key: Constants.SUBSCRIPTION_KEY
                }
            }).then(response => {
                console.log(JSON.stringify(response.data.data));
                axios.post(Constants.BASE_URL + "API-FX-159-DROPSCREEN", {
                    screen_name: "NATIONALITY_2",
                    meta: {
                        "title_id": titleDetails[1],
                        "first_name": details.first_name,
                        "middle_name": "",
                        "last_name": details.last_name,
                        "country_code": "44",
                        "nationality": details.nationality,
                        "password": details.pin,
                        "password_confirmation": details.pin,
                        "country_id": "231",
                        "phone": details.mobile,
                        "email": details.email,
                        "is_banking_user": 2,
                        "type": "standard",
                        "occupation": "NA",
                        "account": "NA",
                        "destination_country": "NA"
                    },
                    device_id: deviceId,
                    user_id: response.data.data.id
                }, {
                    headers: {
                        fx_key: Constants.SUBSCRIPTION_KEY
                    }
                }).then(dropresponse => {
                    console.log(dropresponse.data);
                    setLoading(false)
                    createVirtualAccount(response.data.data.workspaces[0].id, response.data.data.workspaces[0].memberships.id,response.data.data.id)
                }).catch(dropError => {
                    setLoading(false)
                    toast.error(dropError.response.data.message)
                })
            }).catch(error => {
                toast.error(error.response.data.message);
                setLoading(false)
            })
        }
    }
    const createVirtualAccount = async (workspaceId, membershipId,user_id) => {
        var titleDetails = (details.title).split("_");
        setLoading(true);
        const complianceId = sessionStorage.getItem('staff_login_id');
        await axios.post(Constants.BASE_URL + "API-FX-215-CREATE-VIRTUAL-ACCOUNT", {
            "title": titleDetails[0],
            "email": details.email,
            "mobile": details.mobile,
            "first_name": details.first_name,
            "last_name": details.last_name,
            "address_line1": details.address_line1,
            "city": details.city,
            "post_code": details.post_code,
            "country": details.country,
            "nationality": details.nationality,
            "place_of_birth": details.place_of_birth,
            "date_of_birth": details.date_of_birth,
            "account_id": Constants.ENVIRONMENT=='uat' ? "019ac802-fe8d-43ea-9690-3b1d02887dd5":account_id,
            "workspace_id": workspaceId,
            "membershipId": membershipId,
            "user_id": user_id,
            "complianceId": complianceId
        }, {
            headers: {
                fx_key: Constants.SUBSCRIPTION_KEY
            }
        }).then(resp => {
            resp
            toast.success("Account Created Successfully.")
            setLoading(false);
            setTimeout(function(){
                navigate('/memberships');
            },2000)
        }).catch(err => {
            console.log(err.response.data);
            setLoading(false);
            toast.error(err.response.data.message)
        })
    }
    const getData = async () => {
        await axios.get(Constants.BASE_URL + "API-FX-101-Title", {
            headers: {
                fx_key: Constants.SUBSCRIPTION_KEY
            }
        }).then(response => {
            console.log("titlesss" + JSON.stringify(response.data.data));
            setTitles(response.data.data)
        }).catch(error => {
            console.log("titlesss" + error.response.data);
        })

    }
    const generateKyc = async () => {
        if (details.mobile == null || details.mobile == "") {
            toast.error("Please enter mobile number.");
        }
        else {
            setkycLoading(true)
            await axios.post(Constants.BASE_URL + 'API-FX-187-SUMSUB-URL', {
                "user_id": details.mobile
            }, {
                headers: {
                    fx_key: Constants.SUBSCRIPTION_KEY
                }
            }).then(resp => {
                setUrl(resp.data.url)
                setkycLoading(false)
            }).catch(err => {
                toast.error(err.response.data);
                setkycLoading(false)
            })
        }
    }
    const copyToClipBoard = async () => {
        navigator.clipboard.writeText(url)
        toast.success("Copied")
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <div className="my-2 flex">
            <ToastContainer />
            <div className='w-1/2'>
                <span className="text-lg font-semibold">Enter User Details</span>

                <div className='my-3'>
                    <select className="pl-8  w-1/2 p-2 outline-none rounded-2xl text-[#205FFF] placeholder:text-sm placeholder:text-slate-700" onChange={(e) => {
                        setDetails({ ...details, 'title': e.target.value })
                    }}>
                        <option>---Select Title---</option>
                        {
                            titles && titles.length != 0 && titles.map((title) => {
                                return (
                                    <option key={title.id} value={title.name + "_" + title.id}>{title.name}</option>
                                )
                            }
                            )
                        }
                    </select>
                </div>

                <div className='my-3'>
                    <input
                        type='email'
                        required={true}
                        placeholder={'Email'}
                        className="pl-8  w-1/2 p-2 outline-none rounded-2xl text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
                        onChange={(e) => {
                            setDetails({ ...details, 'email': e.target.value })
                        }}
                    />
                </div>

                <div className='my-3'>
                    <div className='flex'>
                        <input
                            type='number'
                            required={true}
                            placeholder={'Mobile'}
                            className="pl-8  w-1/2 p-2 outline-none rounded-2xl text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
                            onChange={(e) => {
                                setDetails({ ...details, 'mobile': e.target.value })
                            }}
                        />
                        <PrimaryButton
                            label={'Generate KYC Link'}
                            style={{ width: "25%" }}
                            onClick={generateKyc}
                            loading={kycLoading}
                        />
                    </div>
                    {url &&
                        <div className='my-3 flex'>


                            <>
                                <input
                                    type='text'
                                    disabled={true}
                                    required={true}
                                    placeholder={'KYC URL'}
                                    value={url}
                                    className="pl-8 bg-[#f0f0f0] w-1/2 p-2 outline-none rounded-2xl text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
                                />

                                <PrimaryButton
                                    label={'Copy'}
                                    style={{ width: "25%" }}
                                    onClick={copyToClipBoard}
                                />
                            </>

                        </div>
                    }
                </div>

                <div className='my-3'>
                    <input
                        type='number'
                        required={true}
                        maxLength={6}
                        placeholder={'Pin'}
                        className="pl-8  w-1/2 p-2 outline-none rounded-2xl text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
                        onChange={(e) => {
                            setDetails({ ...details, 'pin': e.target.value })
                        }}
                    />
                </div>

                <div className='my-3'>
                    <input
                        type='text'
                        required={true}
                        placeholder={'First Name'}
                        className="pl-8  w-1/2 p-2 outline-none rounded-2xl text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
                        onChange={(e) => {
                            setDetails({ ...details, 'first_name': e.target.value })
                        }}
                    />
                </div>

                <div className='my-3'>
                    <input
                        type='text'
                        required={true}
                        placeholder={'Last Name'}
                        className="pl-8  w-1/2 p-2 outline-none rounded-2xl text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
                        onChange={(e) => {
                            setDetails({ ...details, 'last_name': e.target.value })
                        }}
                    />
                </div>

                <div className='my-3'>
                    <input
                        type='text'
                        required={true}
                        placeholder={'Address'}
                        className="pl-8  w-1/2 p-2 outline-none rounded-2xl text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
                        onChange={(e) => {
                            setDetails({ ...details, 'address_line1': e.target.value })
                        }}
                    />
                </div>

                <div className='my-3'>
                    <input
                        type='text'
                        required={true}
                        placeholder={'City'}
                        className="pl-8  w-1/2 p-2 outline-none rounded-2xl text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
                        onChange={(e) => {
                            setDetails({ ...details, 'city': e.target.value })
                        }}
                    />
                </div>

                <div className='my-3'>
                    <input
                        type='text'
                        required={true}
                        placeholder={'Post Code'}
                        className="pl-8  w-1/2 p-2 outline-none rounded-2xl text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
                        onChange={(e) => {
                            setDetails({ ...details, 'post_code': e.target.value })
                        }}
                    />
                </div>

                <div className='my-3'>
                    <input
                        type='text'
                        required={true}
                        placeholder={'Country'}
                        className="pl-8  w-1/2 p-2 outline-none rounded-2xl text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
                        onChange={(e) => {
                            setDetails({ ...details, 'country': e.target.value })
                        }}
                    />
                </div>

                <div className='my-3'>
                    <input
                        type='text'
                        required={true}
                        placeholder={'Nationality'}
                        className="pl-8  w-1/2 p-2 outline-none rounded-2xl text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
                        onChange={(e) => {
                            setDetails({ ...details, 'nationality': e.target.value })
                        }}
                    />
                </div>

                <div className='my-3'>
                    <input
                        type='text'
                        required={true}
                        placeholder={'Place of Birth'}
                        className="pl-8  w-1/2 p-2 outline-none rounded-2xl text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
                        onChange={(e) => {
                            setDetails({ ...details, 'place_of_birth': e.target.value })
                        }}
                    />
                </div>

                <div className='my-3'>
                    <input
                        type='date'
                        required={true}
                        placeholder={'Date of Birth'}
                        className="pl-8  w-1/2 p-2 outline-none rounded-2xl text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
                        onChange={(e) => {
                            setDetails({ ...details, 'date_of_birth': e.target.value })
                        }}
                    />
                </div>

                <div className='my-3'>
                    <PrimaryButton
                        label={'Create'}
                        loading={loading}
                        onClick={submitHandler}
                        style={{ width: '50%' }}
                    />
                </div>
            </div>
            <div className='w-1/2'>
                {/* <div className="text-lg font-semibold">Generate KYC Link</div> */}
            </div>
        </div>
    );
}

export default UserDetails;