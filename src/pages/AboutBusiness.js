import React, { useState } from 'react';
import { PrimaryButton } from '../components/button';
import { Constants } from '../lib/const/constants';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function AboutBusiness() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [website, setWebsite] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [about, setAbout] = useState("");
 
    const submitData = async () => {
        setLoading(true)
        const token = sessionStorage.getItem('registrationToken');
        const entity_type = sessionStorage.getItem('company_type');
        const name = sessionStorage.getItem('selectedcompanyName');
        const turnover = sessionStorage.getItem('turnover');
        const selectedcompanyNumber = sessionStorage.getItem('selectedcompanyNumber');
        const selectedcompanyHouseNumber = sessionStorage.getItem('selectedcompanyHouseNumber');
        const selectedcompanyStreet = sessionStorage.getItem('selectedcompanyStreet');
        const selectedcompanyAddress = sessionStorage.getItem('selectedcompanyAddress');
        const selectedcompanyPostalCode = sessionStorage.getItem('selectedcompanyPostalCode');
        const selectedcompanyCountry = sessionStorage.getItem('selectedcompanyCountry');
        const selectedcompanyStatus = sessionStorage.getItem('selectedcompanyStatus');
        sessionStorage.setItem('businessEmail',email);
        sessionStorage.setItem('businessPhone',phone);
        var deviceId = sessionStorage.getItem('deviceid');
        var userid = sessionStorage.getItem('userid');
        await axios.post(Constants.BASE_URL + "API-FX-175-BUSINESS-REGISTRATION-COMPANY-DETAILS",{
            "is_registered": "1",
            "entity_type": entity_type,
            "name": name,
            "website": website,
            "email": email,
            "country_code": "",
            "phone": phone,
            "description": about,
            "turnover": turnover,
            "registration_no": selectedcompanyNumber,
            "house_no": selectedcompanyHouseNumber,
            "street": selectedcompanyStreet,
            "address_info": selectedcompanyAddress,
            "postal_code": selectedcompanyPostalCode,
            "city": null,
            "country_id": selectedcompanyCountry,
            "company_status": selectedcompanyStatus
        },{headers: {
            fx_key: Constants.SUBSCRIPTION_KEY,
            Authorization: 'Bearer ' + token
        }}).then(resp=>{
            
            resp.data
            axios.post(Constants.BASE_URL + "API-FX-159-DROPSCREEN", {
                screen_name: "ABOUT_BUSINESS_7",
                meta: { website: website, email: email, phone: phone,about:about},
                device_id: deviceId,
                user_id: userid
              }, {
                headers: {
                  fx_key: Constants.SUBSCRIPTION_KEY
                }
              }).then(dropresponse => {
                dropresponse.data
                setLoading(false)
                navigate('/BusinessAddress');
              }).catch(dropError => {
                console.log(dropError);
                setLoading(false)
                alert(dropError.response.data.message)
              })


        }).catch(err=>{
            setLoading(false)
            alert(err.response.data.message);
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


                <h1 className="text-2xl font-bold mb-2 uppercase">Tell Us About Your Business</h1>
               
                <div className="flex items-center mb-4 bg-custom-gray-light rounded-2xl w-full">
                    <input
                        type="url"
                        placeholder="Company Website"
                        className="w-full p-2 outline-none rounded-2xl bg-custom-gray-light placeholder:text-custom-neutral-900 placeholder:text-sm"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                    />
                </div>


                <div className="flex items-center mb-4 bg-custom-gray-light rounded-2xl w-full">
                    <input
                        type="email"
                        placeholder="Company Email"
                        className="w-full p-2 outline-none rounded-2xl bg-custom-gray-light placeholder:text-custom-neutral-900 placeholder:text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="flex items-center mb-4 bg-custom-gray-light rounded-2xl w-full">
                    <input
                        type="number"
                        placeholder="Company Phone"
                        className="w-full p-2 outline-none rounded-2xl bg-custom-gray-light placeholder:text-custom-neutral-900 placeholder:text-sm"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <div className="flex items-center mb-4 bg-custom-gray-light rounded-2xl w-full">
                    <input
                        type="text"
                        placeholder="About Business"
                        className="w-full p-2 outline-none rounded-2xl bg-custom-gray-light placeholder:text-custom-neutral-900 placeholder:text-sm"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
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
        </div>
    );
}