import React, { useEffect, useState } from 'react';
import { PrimaryButton } from '../components/button';
import { Constants } from '../lib/const/constants';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function BusinessDetails() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [companydata, setCompanydata] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [activity, setActivity] = useState("");
    const [turnover, setTurnover] = useState("");
    const [selectedAddress, setselectedAddress] = useState("");
    const [selectedcompanyName, setSelectedcompanyName] = useState("");
    const [selectedcompanyNumber, setSelectedcompanyNumber] = useState("");
    const [selectedcompanyAddress, setSelectedcompanyAddress] = useState("");
    const [selectedcompanyPostalCode, setSelectedcompanyPostalCode] = useState("");
    const [selectedcompanyStatus, setSelectedcompanyStatus] = useState("");
    const [selectedcompanyCountry, setSelectedcompanyCountry] = useState("");
    const [selectedcompanyStreet, setSelectedcompanyStreet] = useState("");
    const [selectedcompanyHouseNumber, setSelectedcompanyHouseNumber] = useState("");


    const setAsyncData = async (key, date) => {
        sessionStorage.setItem(key, date);
    }
    const loadData = async () => {
        const token = sessionStorage.getItem('registrationToken');
        await axios.get(Constants.BASE_URL + "API-FX-167-ENTITY-TYPES", {
            headers: {
                fx_key: Constants.SUBSCRIPTION_KEY,
                Authorization: 'Bearer ' + token
            }
        }).then(resp => {
            console.log(resp.data.data);
            setData(resp.data.data);
        }).catch(err => {
            console.log("error" + JSON.stringify(err.response));

        })
    }

    const searchCompany = async () => {
        setLoading(true)
        const token = sessionStorage.getItem('registrationToken');
        await axios.get(Constants.BASE_URL + "API-FX-168-COMPANY-SEARCH?name=" + search, {
            headers: {
                fx_key: Constants.SUBSCRIPTION_KEY,
                Authorization: 'Bearer ' + token
            }
        }).then(resp => {
            console.log(JSON.stringify(resp.data));
            setLoading(false)
            setCompanydata(resp.data.data)
        }).catch(err => { console.log("error" + JSON.stringify(err.response)); setLoading(false) })
    }

    const submitData = async () => {
        setLoading(true)
        setAsyncData('activity', activity);
        setAsyncData('turnover', turnover);
        setAsyncData('selectedAddress', selectedAddress);
        setAsyncData('selectedcompanyName', selectedcompanyName);
        setAsyncData('selectedcompanyNumber', selectedcompanyNumber);
        setAsyncData('selectedcompanyAddress', selectedcompanyAddress);
        setAsyncData('selectedcompanyPostalCode', selectedcompanyPostalCode);
        setAsyncData('selectedcompanyStatus', selectedcompanyStatus);
        setAsyncData('selectedcompanyCountry', selectedcompanyCountry);
        setAsyncData('selectedcompanyStreet', selectedcompanyStreet);
        setAsyncData('selectedcompanyHouseNumber', selectedcompanyHouseNumber);
        console.log("selected company name" + selectedcompanyName);

        var deviceId = sessionStorage.getItem('deviceid');
        var userid = sessionStorage.getItem('userid');
        axios.post(Constants.BASE_URL + "API-FX-159-DROPSCREEN", {
            screen_name: "BUSINESS_DETAILS_6",
            meta: { activity: activity, turnover: turnover, selectedAddress: selectedAddress, selectedcompanyName: selectedcompanyName, selectedcompanyNumber: selectedcompanyNumber, selectedcompanyAddress: selectedcompanyAddress, selectedcompanyPostalCode: selectedcompanyPostalCode, selectedcompanyStatus: selectedcompanyStatus, selectedcompanyCountry: selectedcompanyCountry, selectedcompanyStreet: selectedcompanyStreet, selectedcompanyHouseNumber: selectedcompanyHouseNumber },
            device_id: deviceId,
            user_id: userid
        }, {
            headers: {
                fx_key: Constants.SUBSCRIPTION_KEY
            }
        }).then(dropresponse => {
            console.log("dropscreen" + JSON.stringify(dropresponse.data));
            setLoading(false)
            navigate('/AboutBusiness');
        }).catch(dropError => {
            console.log(dropError);
            setLoading(false)
            alert(dropError.response.data.message)
        })


    }
    useEffect(() => {
        loadData();
    }, [])
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


                <h1 className="text-2xl font-bold mb-2 uppercase">Business Details</h1>
                <p>As a part of banking compliance, you are required to identify yourself and your business</p>
                <div className="flex items-center mb-4 bg-custom-gray-light rounded-2xl w-full">
                    {data && data.length != 0 ?
                        <select onChange={(event)=>{
                            setAsyncData('company_type', event.target.value)
                        }} className="w-full p-2 border border-gray-300 rounded-lg bg-[#EAEAEA] text-[#707070] outline-0">
                            <option>--- Select Company Type ----</option>
                            {data.map((types, index) => {
                                return (
                                    <option key={index} value={types.name}>{types.name}</option>
                                )
                            })}
                        </select> : ""}
                </div>

                <div className="flex items-center mb-4 bg-custom-gray-light rounded-2xl w-full">
                    <input
                        type="text"
                        placeholder="Search Company"
                        className="w-full p-2 outline-none rounded-2xl bg-custom-gray-light placeholder:text-custom-neutral-900 placeholder:text-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button onClick={searchCompany} className="bg-[#205FFF] text-white p-2 rounded-4xl text-sm">Search</button>
                    {loading ?
                        <div>
                            Loading...
                        </div>
                        : ""}
                </div>
                {companydata.length > 0 &&
                    (<div>
                        <select onChange={(event) => {
                            const value = event.target.value;
                            console.log(JSON.stringify(value));
                            var splitted = value.split("__");
                            setSelectedcompanyName(splitted[0])
                            setSelectedcompanyNumber(splitted[1])
                            setSelectedcompanyAddress(splitted[2])
                            setSelectedcompanyPostalCode(splitted[3])
                            setSelectedcompanyStatus(splitted[4])
                            setSelectedcompanyCountry(splitted[5])
                            setSelectedcompanyStreet(splitted[6])
                            setSelectedcompanyHouseNumber(splitted[7])
                            setselectedAddress(splitted[1])
                        }} className="w-full p-2 border border-gray-300 rounded-lg bg-[#EAEAEA] text-[#707070] outline-0 my-2">
                            <option>--- Select Company ----</option>
                            {companydata.map((value, index) => {
                                return (
                                    <option value={value.title + "__" + value.company_number + "__" + value.address_snippet + "__" + value.address.postal_code + "__" + value.company_status + "__" + value.address.country + "__" + value.address.locality + "__" + value.address.premises} key={index}>
                                        {value.title} - {value.company_number} - {value.company_status.toUpperCase()}
                                        {/* {value.address_snippet} */}
                                    </option>
                                );
                            })}
                        </select>
                    </div>)}
                <div className="flex items-center mb-4 bg-custom-gray-light rounded-2xl w-full">
                    <input
                        type="text"
                        placeholder="Enter Your Company Activity"
                        className="w-full p-2 outline-none rounded-2xl bg-custom-gray-light placeholder:text-custom-neutral-900 placeholder:text-sm"
                        value={activity}
                        onChange={(e) => setActivity(e.target.value)}
                    />
                </div>


                <div className="flex items-center mb-4 bg-custom-gray-light rounded-2xl w-full">
                    <input
                        type="text"
                        placeholder="Enter Your Expected TurnOver Per Annum"
                        className="w-full p-2 outline-none rounded-2xl bg-custom-gray-light placeholder:text-custom-neutral-900 placeholder:text-sm"
                        value={turnover}
                        onChange={(e) => setTurnover(e.target.value)}
                    />
                </div>

                <PrimaryButton
                    onClick={submitData}
                    label={"Continue"}
                    loading={loading}
                />

                <div className='my-5'>
                    Already Registered?
                    <button onClick={()=>navigate("/login")} className="text-sm font-semibold">
                        &nbsp; Login Here
                    </button>
                </div>
            </div>
        </div >
    );
}