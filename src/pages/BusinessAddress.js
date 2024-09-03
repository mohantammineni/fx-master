import React, { useEffect, useState } from 'react';
import { PrimaryButton } from '../components/button';
import { Constants } from '../lib/const/constants';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function BusinessAddress() {
    const navigate = useNavigate();
    const [buttonLoading, setButtonLoading] = useState("");
    const [privateAddress, setPrivateAddress] = useState("");
    const [shippingAddress, setShippingAddress] = useState("");
    const [invoiceAddress, setInvoiceAddress] = useState("");
    const [correspondenceAddress, setCorrespondenceAddress] = useState("");
    const [companyAddress, setcompanyAddress] = useState("");
    const [samePrivateAddress, setSamePrivateAddress] = useState("");
    const [sameShippingAddress, setSameShippingAddress] = useState("");
    const [sameInvoicwAddress, setSameInvoicwAddress] = useState("");
    const [sameCorrespondenceAddress, setSameCorrespondenceAddress] = useState("");

    const submitData = async () => {
        setButtonLoading(true);
        const token = sessionStorage.getItem('registrationToken');
        var deviceId = sessionStorage.getItem('deviceid');
        var userid = sessionStorage.getItem('userid');

        //shipping address
        await axios.post(Constants.BASE_URL + "API-FX-177-BUSINESS-REGISTRATION-COMPANY-ADDRESS", {
            "house_no": null,
            "address_info": shippingAddress,
            "city": shippingAddress,
            "postcode": shippingAddress,
            "country_id": "231",
            "shipping_address": true
        }, {
            headers: {
                fx_key: Constants.SUBSCRIPTION_KEY,
                Authorization: 'Bearer ' + token
            }
        }).then(resp => {
            resp
        }).catch(err => {
            console.log(err.response.data);
            setButtonLoading(false);
            // Alert.alert('Error',err.response.data.message)
        })

        //invoice address
        await axios.post(Constants.BASE_URL + "API-FX-177-BUSINESS-REGISTRATION-COMPANY-ADDRESS", {
            "house_no": null,
            "address_info": invoiceAddress,
            "city": invoiceAddress,
            "postcode": invoiceAddress,
            "country_id": "231",
            "invoice_address": true
        }, {
            headers: {
                fx_key: Constants.SUBSCRIPTION_KEY,
                Authorization: 'Bearer ' + token
            }
        }).then(resp => {
            resp
        }).catch(err => {
            console.log(err.response.data);
            setButtonLoading(false);
            // Alert.alert('Error',err.response.data.message)
        })


        //correspondence address
        await axios.post(Constants.BASE_URL + "API-FX-177-BUSINESS-REGISTRATION-COMPANY-ADDRESS", {
            "house_no": null,
            "address_info": correspondenceAddress,
            "city": correspondenceAddress,
            "postcode": correspondenceAddress,
            "country_id": "231",
            "correspondence_address": true
        }, {
            headers: {
                fx_key: Constants.SUBSCRIPTION_KEY,
                Authorization: 'Bearer ' + token
            }
        }).then(resp => {
            resp
        }).catch(err => {
            console.log(err.response.data);
            setButtonLoading(false);
            // Alert.alert('Error',err.response.data.message)
        })

        //private address
        await axios.post(Constants.BASE_URL + "API-FX-177-BUSINESS-REGISTRATION-COMPANY-ADDRESS", {
            "house_no": null,
            "address_info": privateAddress,
            "city": privateAddress,
            "postcode": privateAddress,
            "country_id": "231",
            "private_address": true
        }, {
            headers: {
                fx_key: Constants.SUBSCRIPTION_KEY,
                Authorization: 'Bearer ' + token
            }
        }).then(resp => {
            resp
        }).catch(err => {
            console.log(err.response.data);
            setButtonLoading(false);
            // Alert.alert('Error',err.response.data.message)
        })



        await axios.post(Constants.BASE_URL + "API-FX-159-DROPSCREEN", {
            screen_name: "BUSINESS_ADDRESS_8",
            meta: { privateAddress: privateAddress, correspondenceAddress: correspondenceAddress, invoiceAddress: invoiceAddress, shippingAddress: shippingAddress },
            device_id: deviceId,
            user_id: userid
        }, {
            headers: {
                fx_key: Constants.SUBSCRIPTION_KEY
            }
        }).then(dropresponse => {
            dropresponse
            setButtonLoading(false);
            navigate('/SelectOfficer');
        }).catch(dropError => {
            setButtonLoading(false);
            console.log(dropError);
            alert(dropError.response.data.message)
        })

    }
    const loadData = async () => {
        setcompanyAddress(sessionStorage.getItem('selectedcompanyAddress'));
    }
    useEffect(() => {
        loadData()
    })


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


                <h1 className="text-2xl font-bold mb-2 uppercase">Add Address</h1>

                <div className="flex items-center mb-4 bg-custom-gray-light rounded-2xl w-full">
                    <input
                        type="text"
                        placeholder="Company Address"
                        className="w-full p-2 outline-none rounded-2xl bg-custom-gray-light placeholder:text-custom-neutral-900 placeholder:text-sm"
                        value={companyAddress}
                        readOnly
                    />
                </div>


                <div className="items-center mb-1 bg-custom-gray-light rounded-2xl w-full">
                    <input
                        type="text"
                        placeholder="Add Private Address"
                        className="w-full p-2 outline-none rounded-2xl bg-custom-gray-light placeholder:text-custom-neutral-900 placeholder:text-sm"
                        value={privateAddress}
                        onChange={(e) => setPrivateAddress(e.target.value)}
                    />
                </div>
                <div className='mb-5'>
                    <input type='checkbox' onClick={() => {
                        if (samePrivateAddress) {
                            setSamePrivateAddress(false);
                            setPrivateAddress("")
                        }
                        else {
                            setSamePrivateAddress(true);
                            setPrivateAddress(companyAddress)
                        }

                    }} /> Same as contact address
                </div>

                <div className="items-center mb-1 bg-custom-gray-light rounded-2xl w-full">
                    <input
                        type="text"
                        placeholder="Add Shipping Address"
                        className="w-full p-2 outline-none rounded-2xl bg-custom-gray-light placeholder:text-custom-neutral-900 placeholder:text-sm"
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                    />
                </div>
                <div className='mb-5'>
                    <input type='checkbox' onClick={() => {
                        if (sameShippingAddress) {
                            setSameShippingAddress(false);
                            setShippingAddress("")
                        }
                        else {
                            setSameShippingAddress(true);
                            setShippingAddress(companyAddress)
                        }

                    }} /> Same as contact address
                </div>

                <div className="items-center mb-1 bg-custom-gray-light rounded-2xl w-full">
                    <input
                        type="text"
                        placeholder="Add Invoice Address"
                        className="w-full p-2 outline-none rounded-2xl bg-custom-gray-light placeholder:text-custom-neutral-900 placeholder:text-sm"
                        value={invoiceAddress}
                        onChange={(e) => setInvoiceAddress(e.target.value)}
                    />
                </div>
                <div className='mb-5'>
                    <input type='checkbox' onClick={() => {
                        if (sameInvoicwAddress) {
                            setSameInvoicwAddress(false);
                            setInvoiceAddress("")
                        }
                        else {
                            setSameInvoicwAddress(true);
                            setInvoiceAddress(companyAddress)
                        }

                    }} /> Same as contact address
                </div>

                <div className="items-center mb-1 bg-custom-gray-light rounded-2xl w-full">
                    <input
                        type="text"
                        placeholder="Add Correspondence Address"
                        className="w-full p-2 outline-none rounded-2xl bg-custom-gray-light placeholder:text-custom-neutral-900 placeholder:text-sm"
                        value={correspondenceAddress}
                        onChange={(e) => setCorrespondenceAddress(e.target.value)}
                    />
                </div>
                <div className='mb-5'>
                    <input type='checkbox' onClick={() => {
                        if (sameCorrespondenceAddress) {
                            setSameCorrespondenceAddress(false);
                            setCorrespondenceAddress("")
                        }
                        else {
                            setSameCorrespondenceAddress(true);
                            setCorrespondenceAddress(companyAddress)
                        }

                    }} /> Same as contact address
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