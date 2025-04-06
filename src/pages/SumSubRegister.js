import React, { useEffect, useState } from 'react';
import { Constants } from '../lib/const/constants';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from '../components/button';
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function SumSubRegister() {
    const navigate = useNavigate();
    const [url, setUrl] = useState("");
    const [allow, setAllow] = useState("");
    const [showproceedButton, setshowproceedButton] = useState(false);
    const [intervalCall, setintervalCall] = useState(false);
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const getData = async () => {
        const uniqueId = sessionStorage.getItem('user_phone');
        await axios.post(Constants.BASE_URL + 'API-FX-187-SUMSUB-URL', {
            "user_id": uniqueId
        }, {
            headers: {
                fx_key: Constants.SUBSCRIPTION_KEY
            }
        }).then(resp => {
            setUrl(resp.data.url)
            setAllow("camera " + resp.data.url + "; microphone " + resp.data.url);
        }).catch(err => {
            toast.error(err.response.data);
        })


        setintervalCall(setInterval(function () {
            checkuserregisteredstatus()
        }, 10000))
    }
    const checkuserregisteredstatus = async () => {
        const uniqueId = sessionStorage.getItem('user_phone');
        await axios.post(Constants.BASE_URL + 'API-FX-188-SUMSUB-DETAILS', {
            "user_id": uniqueId
        }, {
            headers: {
                fx_key: Constants.SUBSCRIPTION_KEY
            }
        }).then(resp => {

            if (resp.data) {
                setshowproceedButton(true)
                setData(resp.data)
            }

        }).catch(err => {
            console.log(err.response);
        })
    }
    const proceedtoScreen = async () => {
        const registrationType = sessionStorage.getItem('registrationType');
        const token = sessionStorage.getItem('registrationToken');
        var deviceId = sessionStorage.getItem('deviceid');
        var userid = sessionStorage.getItem('userid');
        console.log(JSON.stringify(data));
        setLoading(true)
        axios.post(Constants.BASE_URL + 'API-FX-186-UPDATE-USER-DETAILS', {
            firstName: data.firstName,
            lastName: data.lastName,
            dob: data.dob,
            country: data.country.slice(0, 2),
            address: data.addresses[0].formattedAddress,
            street: data.addresses[0].street,
            town: data.addresses[0].town,
            postCode: data.addresses[0].postCode,

        }, {
            headers: {
                fx_key: Constants.SUBSCRIPTION_KEY,
                Authorization: 'Bearer ' + token
            }
        }).then(response => {
            console.log(JSON.stringify(response.data));

            axios.post(Constants.BASE_URL + "API-FX-159-DROPSCREEN", {
                screen_name: "DOB_ADDRESS_5",
                meta: { regType: registrationType },
                device_id: deviceId,
                user_id: userid
            }, {
                headers: {
                    fx_key: Constants.SUBSCRIPTION_KEY
                }
            }).then(dropresponse => {
                console.log(dropresponse.data);
                clearInterval(intervalCall);
                setLoading(false)
                if (registrationType == 'personal') {
                    navigate('/ApplicationPreview',{state:{pin:null}})
                }
                else
                    navigate('/BusinessDetails',{state:{pin:null}});
            }).catch(dropError => {
                setLoading(false)
                console.log(dropError);
                toast.error(dropError.response.data.message)
            })

        }).catch(error => {
            setLoading(false)
            toast.error(error.response.data);
        })


    }
    // const skipkyc = async() =>{
    //     const registrationType = sessionStorage.getItem('registrationType');
    //     const token = sessionStorage.getItem('registrationToken');
    //     var deviceId = sessionStorage.getItem('deviceid');
    //     var userid = sessionStorage.getItem('userid');
    //     await axios.post(Constants.BASE_URL + 'API-FX-186-UPDATE-USER-DETAILS', {
    //         firstName: "Test firstname",
    //         lastName: "Test Lastname",
    //         dob: "1999-01-01",
    //         country: "GB",
    //         address: "Test address",
    //         street: "Test Street",
    //         town: "Test Town",
    //         postCode: "501113",

    //     }, {
    //         headers: {
    //             fx_key: Constants.SUBSCRIPTION_KEY,
    //             Authorization: 'Bearer ' + token
    //         }
    //     }).then(response => {
    //         console.log(JSON.stringify(response.data));

    //         axios.post(Constants.BASE_URL + "API-FX-159-DROPSCREEN", {
    //             screen_name: "DOB_ADDRESS_5",
    //             meta: { regType: registrationType },
    //             device_id: deviceId,
    //             user_id: userid
    //         }, {
    //             headers: {
    //                 fx_key: Constants.SUBSCRIPTION_KEY
    //             }
    //         }).then(dropresponse => {
    //             console.log(dropresponse.data);
    //             if (registrationType == 'personal') {
    //                 navigate('/ApplicationPreview')
    //             }
    //             else
    //                 navigate('/BusinessDetails');
    //         }).catch(dropError => {
    //             console.log(dropError);
    //             toast.error(dropError.response.data.message)
    //         })

    //     }).catch(error => {
    //         toast.error(error.response.data);
    //     })

    // }
    useEffect(() => {
        getData();
    }, [])


    return (
        <div className="flex h-screen">
            <ToastContainer />
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
                {url &&
                    (<iframe src={url} allow={allow} style={{ width: "100%", height: "100%" }}></iframe>)}

                <div className='w-full my-5'>
                    {showproceedButton && <PrimaryButton loading={loading} label={'KYC Verified. Please Click Here to Proceed'} onClick={() => proceedtoScreen()} style={{ width: '100%' }} />}
                    {/* Already Registered?
                    <button onClick={() => navigate("/login")} className="text-sm font-semibold">
                        &nbsp; Login Here
                    </button> */}
                </div>

                {/* <div className='my-5'>
                    Skip Kyc?
                    <button onClick={skipkyc} className="text-sm font-semibold">
                        &nbsp; Click Here
                    </button>
                </div> */}
            </div>
        </div>
    );
}
