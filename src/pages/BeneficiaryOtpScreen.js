import React, { useEffect, useState } from 'react';
import { Constants } from '../lib/const/constants';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function BeneficiaryOtpScreen() {
    const navigate = useNavigate();
    const location = useLocation();
    const paramsdata = location.state;
    const currency = paramsdata.currency;
    const transferflowamount = paramsdata.transferflowamount;
    const currencyid = paramsdata.currencyid;
    const balance = paramsdata.balance;
    const beneId = paramsdata.beneId;
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
                    alert('OTP Verified Successfully')
                    navigate('/SendMoney', { state: { currency: currency, transferflowamount: transferflowamount, currencyid: currencyid, balance: balance } });
                }
                else {
                    alert('Invalid OTP')
                }
            }
            else {
                alert(resp.data.message);
                navigate('/');
            }
            setLoading(false);
        }).catch(err => {
            console.log(err.response.data);
            alert('Invalid OTP'); setLoading(false);
        })

        setLoading(false);
    };
    return (
        <div className="my-2">
            <span className="text-lg font-semibold">Enter OTP</span>
            <div className='flex'>
                <div className='my-3 mx-2'>
                    <input
                        type='number'
                        value={f1}
                        id='f1'
                        className="pl-8 w-20 p-2 outline-none rounded-2xl text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
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
                        className="pl-8 w-20 p-2 outline-none rounded-2xl text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
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
                        className="pl-8 w-20 p-2 outline-none rounded-2xl text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
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
                        className="pl-8 w-20 p-2 outline-none rounded-2xl text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
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
                        className="pl-8 w-20 p-2 outline-none rounded-2xl text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
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
                        className="pl-8 w-20 p-2 outline-none rounded-2xl text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
                        onChange={(e) => {
                            setF6(e.target.value[0]);
                            if(!e.target.value || e.target.value[0].length==0){
                                document.getElementById('f5').focus();
                            }
                        }}
                    />
                </div>
            </div>
            <div className='my-3'>

                {loading ? (
                    <div className="text-center">Processing...</div>
                )
                    :
                    <button onClick={otpValidate}
                        className="bg-[#1152BE] border border-[#1152BE] text-white px-6 py-2 rounded-lg flex items-center text-base">
                        Add
                    </button>}
            </div>
        </div>
    );
}

export default BeneficiaryOtpScreen;