import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Constants } from '../lib/const/constants';
import { PrimaryButton } from '../components/button';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SetFees() {
    const navigate = useNavigate();
    const location = useLocation();
    const paramsdata = location.state;
    const admin_id = paramsdata.admin_id;
    const account_id = paramsdata.account_id;
    const [loading, setLoading] = useState(false);
    const [loadingDetails, setLoadingDetails] = useState(false);
    const [otf, setOtf] = useState();
    const [itf, setItf] = useState();
    const [erf, setErf] = useState({});

    const submitHandler = async () => {
        setLoading(true)
        const token = sessionStorage.getItem('staff_login_token');
        await axios.post(Constants.BASE_URL + 'API-FX-221-ADD-FEES-CONFIG', {
            "user_id": admin_id,
            "inbound_transaction_fees": itf,
            "transaction_fees": otf,
            "transaction_type": "daily-based",
            "exchange_rate": erf
        }, {
            headers: {
                Authorization: 'Bearer ' + JSON.parse(token),
                fx_key: Constants.SUBSCRIPTION_KEY
            }
        }).then(resp => {
            toast.success(resp.data.message);
            setLoading(false)
        }).then(err => {
            toast.error(JSON.stringify(err));
            setLoading(false)
        })
    }


    const getData = async () => {
        setLoadingDetails(true)
        const token = sessionStorage.getItem('staff_login_token');
        await axios.get(Constants.BASE_URL + 'API-FX-222-GET-FEES-CONFIG?user_id=' + admin_id, {
            headers: {
                Authorization: 'Bearer ' + JSON.parse(token),
                fx_key: Constants.SUBSCRIPTION_KEY
            }
        }).then(resp => {
            (resp.data.data).map(fees => {
                
                if (fees.key == 'exchangerate_info')
                    {
                        console.log("ex"+typeof fees.value);
                        
                        if(typeof fees.value!='object')
                            setErf(JSON.parse(fees.value).percentage)
                        else
                            setErf(fees.value.percentage)
                    }
                else
                    if (fees.key == 'transaction_fees')
                    {
                        console.log("ex"+typeof fees.value);
                        if(typeof fees.value!='object')
                        setOtf(JSON.parse(fees.value).percentage)
                    else                        
                        setOtf(fees.value.percentage)                        
                    }
                    else
                        if (fees.key == 'inbound_transaction_fees')
                        {
                            console.log("ex"+typeof fees.value);
                            if(typeof fees.value!='object')
                            setItf(JSON.parse(fees.value).percentage)
                            else
                            setItf(fees.value.percentage)
                        }
            })
            setLoadingDetails(false)
        }).catch(err => {
            console.log(err.response.data);
            setLoadingDetails(false)
        })
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <div className="my-2 flex">
            <ToastContainer />
            <div className='w-1/2'>
                <span className="text-lg font-semibold">Fees</span>

                {!loadingDetails ?
                    <>
                        <div className='my-3'>
                        <div className="text-sm font-semibold">Outbound Transaction Fees</div>
                            <input
                                type='text'
                                required={true}
                                placeholder={'Outbound Transaction Fees'}
                                value={otf}
                                className="pl-8  w-1/2 p-2 outline-none rounded-2xl text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
                                onChange={(e) => {
                                    setOtf(e.target.value)
                                }}
                            />
                        </div>


                        <div className='my-3'>
                        <div className="text-sm font-semibold">Inbound Transaction Fees</div>
                            <input
                                type='text'
                                required={true}
                                value={itf}
                                placeholder={'Inbound Transaction Fees'}
                                className="pl-8  w-1/2 p-2 outline-none rounded-2xl text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
                                onChange={(e) => {
                                    setItf(e.target.value)
                                }}
                            />
                        </div>

                        <div className='my-3'>
                        <div className="text-sm font-semibold">Exchange Rate Fees</div>
                            <input
                                type='text'
                                required={true}
                                value={erf != null && erf.length > 0 ? erf : ''}
                                placeholder={'Exchange Rate Fees'}
                                className="pl-8  w-1/2 p-2 outline-none rounded-2xl text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
                                onChange={(e) => {
                                    setErf(e.target.value)
                                }}
                            />
                        </div>

                        <div className='flex my-3'>
                            {account_id != '' && account_id != null ?
                                <PrimaryButton
                                    label={'Go Back'}
                                    onClick={() => navigate('/ListUsers', { state: { account_id: account_id } })}
                                    style={{ width: '25%' }}
                                />
                                :
                                <PrimaryButton
                                    label={'Go Back'}
                                    onClick={() => navigate('/memberships')}
                                    style={{ width: '25%' }}
                                />
                            }

                            <PrimaryButton
                                label={'Save'}
                                loading={loading}
                                onClick={submitHandler}
                                style={{ width: '25%' }}
                            />
                        </div>
                    </>
                    :
                    <div className='my-3'>
                        loading...
                    </div>
                }
            </div>
            <div className='w-1/2'>
                {/* <div className="text-lg font-semibold">Generate KYC Link</div> */}
            </div>
        </div>
    );
}

export default SetFees;