import React, { useEffect, useState } from 'react';
import { Constants } from '../lib/const/constants';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BeneficiaryOtpScreen() {
    const navigate = useNavigate();
    const location = useLocation();
    const paramsdata = location.state;
    const currency = paramsdata.currency;
    const transferflowamount = paramsdata.transferflowamount;
    const currencyid = paramsdata.currencyid;
    const balance = paramsdata.balance;
    const beneId = paramsdata.beneId;
    // const contactId = paramsdata.contactId;
    const routeName = paramsdata.routeName;
    const [f1, setF1] = useState('');
    const [f2, setF2] = useState('');
    const [f3, setF3] = useState('');
    const [f4, setF4] = useState('');
    const [f5, setF5] = useState('');
    const [f6, setF6] = useState('');
    const [count, setCount] = useState(60);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
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
    }, [count]);

    const otpValidate = async () => {
        setLoading(true)
        let enteredOtp = f1 + f2 + f3 + f4 + f5 + f6;
        const token = sessionStorage.getItem('login_token');
        console.log(beneId);
        var url = "";

        url = Constants.BASE_URL + 'API-FX-144-beneficiaryverification/' + beneId
        await axios.post(url, {
            "code": enteredOtp
        }, {
            headers: {
                Authorization: "Bearer " + JSON.parse(token),
                fx_key: Constants.SUBSCRIPTION_KEY
            }
        }).then(resp => {
            console.log(resp.data);
            if (resp.data.code != 400) {
                if (resp.data.message == "Beneficiary OTP Verified.") {
                    toast.success('OTP Verified Successfully')
                    if (routeName == '' || routeName == null)
                    navigate('/SendMoney', { state: { currency: currency, transferflowamount: transferflowamount, currencyid: currencyid, balance: balance } });
                    else
                    navigate('/'+routeName, { state: { currency: currency, transferflowamount: transferflowamount, currencyid: currencyid, balance: balance } });
                }
                else {
                    toast.error('Invalid OTP')
                }
            }
            else {
                toast.error(resp.data.message);
                navigate('/');
            }
            setLoading(false);
        }).catch(err => {
            console.log(err.response.data);
            toast.error('Invalid OTP'); setLoading(false);
        })

        setLoading(false);
    };
    return (
        <div className="flex items-center justify-center w-full h-full bg-white">
        <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)]">
            <ToastContainer />
            <div className='flex justify-between items-center w-full'>
            <span className="text-lg font-semibold">OTP Verification</span>
            <span><button onClick={() =>
  navigate('/BeneficiaryTypes', {
    state: {
      currency,
      currencyid,
      transferflowamount,
      balance,
      routeName
    }
  })
} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
  Back
</button></span></div>
<div className='text-center'>
           <img src="./password-lock.png" className="mx-auto" />
           <div className='text-[#3A3A3A] mt-4'>Enter the OTP sent to</div>
           <span className='text-[#205FFF] font-bold border-b border-[#205FFF]'>+44 789 675 4321</span>
            <div className='flex'>
                <div className='my-3 mx-2'>
                    <input
                        type='number'
                        value={f1}
                        id='f1'
                         placeholder=''
                        className="w-12 p-2 text-black font-bold border-b border-[#2743FD]"
                        onChange={(e) => {
                            setF1(e.target.value[0]);
                            if(e.target.value && e.target.value[0].length>0){
                                document.getElementById('f2').focus();
                            }
                        }}
                    />
                </div>
                <div className='my-3 mx-2'>
                    <input
                        type='number'
                        id='f2'
                        value={f2}
                         placeholder=''
                        className="w-12 p-2 text-black font-bold border-b border-[#2743FD]"
                        onChange={(e) => {
                            setF2(e.target.value[0]);
                            if(e.target.value && e.target.value[0].length>0){
                                document.getElementById('f3').focus();
                            }
                            else{
                                document.getElementById('f1').focus();
                            }
                        }}
                    />
                </div>
                <div className='my-3 mx-2'>

                    <input
                        type='number'
                        value={f3}
                        id='f3'
                         placeholder=''
                        className="w-12 p-2 text-black font-bold outline-none border-b border-[#2743FD]"
                        onChange={(e) => {
                            setF3(e.target.value[0]);
                            if(e.target.value && e.target.value[0].length>0){
                                document.getElementById('f4').focus();
                            }
                            else{
                                document.getElementById('f2').focus();
                            }
                        }}
                    />
                </div>
                <div className='my-3 mx-2'>

                    <input
                        type='number'
                        value={f4}
                        id='f4'
                         placeholder=''
                        className="w-12 p-2 text-black font-bold outline-none border-b border-[#2743FD]"
                        onChange={(e) => {
                            setF4(e.target.value[0]);
                            if(e.target.value && e.target.value[0].length>0){
                                document.getElementById('f5').focus();
                            }
                            else{
                                document.getElementById('f3').focus();
                            }
                        }}
                    />
                </div>
                <div className='my-3 mx-2'>

                    <input
                        type='number'
                        value={f5}
                        id='f5'
                         placeholder=''
                        className="w-12 p-2 text-black font-bold outline-none border-b border-[#2743FD]"
                        onChange={(e) => {
                            setF5(e.target.value[0]);
                            if(e.target.value && e.target.value[0].length>0){
                                document.getElementById('f6').focus();
                            }
                            else{
                                document.getElementById('f4').focus();
                            }
                        }}
                    />
                </div>
                <div className='my-3 mx-2'>

                    <input
                        type='number'
                        value={f6}
                        id='f6'
                        placeholder=''
                        className="w-12 p-2 text-black font-bold outline-none border-b border-[#2743FD]"
                        onChange={(e) => {
                            setF6(e.target.value[0]);
                            if(!e.target.value || e.target.value[0].length==0){
                                document.getElementById('f5').focus();
                            }
                        }}
                    />
                </div>
            </div>
            <div className='text-[#707070] mb-4'>Didn&apos;t you receive the OTP? <span className='text-[#1D3BFF]'>Resend OTP</span></div>
            <div className='my-3'>

                {loading ? (
                    <div className="text-center">Processing...</div>
                )
                    :
                    <button onClick={otpValidate}
                        className="bg-[#205FFF] w-full border border-[#205FFF] font-semibold text-white px-6 py-2 rounded-md">
                        Verify OTP
                    </button>}
            </div>
        </div> 
        </div>
    </div>
    );
}

export default BeneficiaryOtpScreen;