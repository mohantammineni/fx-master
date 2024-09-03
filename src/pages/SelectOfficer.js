import React, { useEffect, useState } from 'react';
import { PrimaryButton } from '../components/button';
import { Constants } from '../lib/const/constants';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
var classname = "";
export default function SelectOfficer() {
    const navigate = useNavigate();
    const [buttonLoading, setButtonLoading] = useState("");
    const [loading, setloading] = useState(false);
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [dateOfBirth, setdateOfBirth] = useState("");
    const [role, setrole] = useState("");
    const [joiningDate, setjoiningDate] = useState("");
    const [selectedOfficer, setselectedOfficer] = useState();
    const [data, setData] = useState([]);

    const submitData = async () => {
        setButtonLoading(true);
        const token = sessionStorage.getItem('registrationToken');
        var deviceId = sessionStorage.getItem('deviceid');
        var userid = sessionStorage.getItem('userid');
        var businessEmail = sessionStorage.getItem('businessEmail');
        var businessPhone = sessionStorage.getItem('businessPhone');
        console.log(JSON.stringify({
            "officers": [
                {
                    "first_name": firstName,
                    "last_name": lastName,
                    "email": businessEmail,
                    "mobile": businessPhone,
                    "date_of_birth": dateOfBirth,
                    "role": role,
                    "meta": {
                        "joining_date": joiningDate,
                        "resign_date": null
                    },
                    "share": null,
                    "is_registered": true,
                    "is_first_officer": null
                }
            ]
        }));
        await axios.post(Constants.BASE_URL + "API-FX-178-BUSINESS-REGISTRATION-COMPANY-OFFICERS", {
            "officers": [
                {
                    "first_name": firstName,
                    "last_name": lastName,
                    "email": businessEmail,
                    "mobile": businessPhone,
                    "date_of_birth": dateOfBirth,
                    "role": role,
                    "meta": {
                        "joining_date": joiningDate,
                        "resign_date": null
                    },
                    "share": null,
                    "is_registered": true,
                    "is_first_officer": null
                }
            ]
        }, {
            headers: {
                fx_key: Constants.SUBSCRIPTION_KEY,
                Authorization: 'Bearer ' + token
            }
        }).then(resp => {
            resp
            setButtonLoading(false);
            axios.post(Constants.BASE_URL + "API-FX-159-DROPSCREEN", {
                screen_name: "SELECT_OFFICER_9",
                meta: { firstName: firstName, lastName: lastName, dateOfBirth: dateOfBirth, role: role, joiningDate: joiningDate },
                device_id: deviceId,
                user_id: userid
            }, {
                headers: {
                    fx_key: Constants.SUBSCRIPTION_KEY
                }
            }).then(dropresponse => {
                dropresponse
                setButtonLoading(false);
                navigate('/ApplicationPreview');

            }).catch(dropError => {
                setButtonLoading(false);
                console.log(dropError);
                alert(dropError.response.data.message)
            })

        }).catch(err => {
            setButtonLoading(false);
            console.log(err);
            alert(err.response.data.message)
        })

    }
    const loadData = async () => {
        setloading(true)
        const token = sessionStorage.getItem('registrationToken');
        const regNumber = sessionStorage.getItem('selectedcompanyNumber');
        // const regNumber = "04631206";
        console.log(token);
        console.log(Constants.BASE_URL + "API-FX-170-COMPANY-OFFICERS?number=" + regNumber);
        await axios.get(Constants.BASE_URL + "API-FX-170-COMPANY-OFFICERS?number=" + regNumber, {
            headers: {
                fx_key: Constants.SUBSCRIPTION_KEY,
                Authorization: 'Bearer ' + token
            }
        }).then(resp => {
            console.log(JSON.stringify(resp.data.data));
            setData(resp.data.data);
            setloading(false)
        }).catch(err => {
            console.log(err.response.data);
            setloading(false)
        })

    }
    useEffect(() => {
        loadData()
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

            <div className="w-1/2 flex flex-col items-start p-8 border-l">
                {/* Logo */}
                <div className="mb-4">
                    <img src="fx_logo.png" alt="Logo" className="w-24" />
                </div>
                <h1 className="text-2xl font-bold mb-2 uppercase">Select Officer</h1>
                {loading && <div className='justify-center'>loading...</div>}
                <div style={{ height: 'auto', overflow: 'scroll' }}>
                    {data.map((item, index) => {
                        if (selectedOfficer == index)
                            classname = "flex mb-4 bg-[#205FFF] text-white rounded-2xl w-full p-5"
                        else
                            classname = "flex mb-4 bg-custom-gray-light rounded-2xl w-full p-5"
                        return (
                            <div className={classname} key={index}>
                                <button onClick={() => {
                                    setselectedOfficer(index)
                                    setfirstName(item.first_name)
                                    setlastName(item.last_name)
                                    if ('date_of_birth' in item)
                                        setdateOfBirth(item.date_of_birth.month + "-" + item.date_of_birth.year)
                                    setrole(item.officer_role)
                                    setjoiningDate(item.appointed_on)
                                }}>
                                    <div style={{fontSize: (15),fontWeight: 'bold',textAlign:'left'}}>{item.name} ({item.officer_role})</div>
                                    <div style={{fontSize: (11),textAlign:'left'}}>Nationality: {item.nationality}</div>
                                    <div style={{fontSize: (11),textAlign:'left'}}>Residence Country: {item.country_of_residence ? item.country_of_residence : "-"}</div>
                                    <div style={{fontSize: (11),textAlign:'left'}}>Occupation: {item.occupation}</div>
                                    <div style={{fontSize: (11),textAlign:'left'}}>Address: {item.address.locality},{item.address.region},{item.address.address_line_1},{item.address.postal_code}</div>
                                </button>
                            </div>
                        )
                    })}
                </div>
                <PrimaryButton
                    onClick={submitData}
                    label={"Continue"}
                    loading={buttonLoading}
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