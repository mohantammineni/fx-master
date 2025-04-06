import React, { useEffect, useState } from 'react';
import { Constants } from '../lib/const/constants';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SelfAccount() {
    const navigate = useNavigate();
    const location = useLocation();
    const paramsdata = location.state;
    const currency = paramsdata.currency;
    const transferflowamount = paramsdata.transferflowamount;
    const currencyid = paramsdata.currencyid;
    const balance = paramsdata.balance;
    const routeName = paramsdata.routeName;
    const [loading, setLoading] = useState(false);

    const [beneType, setbeneType] = useState("");
    const [countries, setCountries] = useState([]);
    const [beneCountry, setbeneCountry] = useState("");
    const [formFeilds, setFormFeilds] = useState([]);
    const [formKeys, setFormKeys] = useState([]);
    const [bankDetails, setbankDetails] = useState({});


    const submitHandler = async () => {
        setLoading(true)
        const token = sessionStorage.getItem('login_token');
        const workspaceId = sessionStorage.getItem('login_workspaces_id');
        const defaultBank = sessionStorage.getItem('defaultBank');
        const clearBankCustomerId = sessionStorage.getItem('clearBankCustomerId');
        var obj = {};
        obj = {
            "workspace_id": workspaceId,
            "currency": currency,
            "type": "individual",
            "beneficiary_first_name": bankDetails.beneficiary_first_name,
            "beneficiary_last_name": bankDetails.beneficiary_last_name,
            "payment_type": beneType,
            "bank_country": beneCountry == 'UK' ? 'GB' : beneCountry,
            "bic_swift": bankDetails.bic_swift,
            "account_number": bankDetails.account_number,
            "iban": bankDetails.iban,
            "routing_code": bankDetails.routing_code,
            "ifsc": bankDetails.ifsc,
            "bank_code": bankDetails.bank_code,
            "branch_code": bankDetails.branch_code,
            "cnaps": bankDetails.cnaps,
            "bsb_code": bankDetails.bsb_code,
            "clabe": bankDetails.clabe,
            "sort_code": bankDetails.sort_code,
            "institution_no": bankDetails.institution_no,
            "aba": bankDetails.aba,
            "bank_account_holder_name": bankDetails.beneficiary_first_name + " " + bankDetails.beneficiary_last_name,
            "beneficiary_address": bankDetails.beneficiary_address,
            "beneficiary_city": bankDetails.beneficiary_city,
            "beneficiary_state_or_province": bankDetails.beneficiary_state_or_province,
            "beneficiary_company_name": bankDetails.beneficiary_company_name,
            "beneficiary_postcode": bankDetails.beneficiary_postcode
        }
        if (currencyid == 231 && defaultBank == 'Clear Bank as Service' && beneCountry == 'UK') {

            obj = ({
                "workspace_id": workspaceId,
                "type": "personal",
                "first_name": bankDetails.beneficiary_first_name,
                "middle_name": "",
                "last_name": bankDetails.beneficiary_last_name,
                "email": "",
                "mobile": "7777777777",
                "bank_account_number": bankDetails.account_number,
                "sort_code": bankDetails.sort_code,
                "bank_code_type": "sort-code",
                "bank_account_name": bankDetails.beneficiary_first_name + " " + bankDetails.beneficiary_last_name,
                "bank_country": 231,
                "beneficiary_type": ["supplier", "customer"],
                "payment_type": "regular",
                "beneficiary_address": "NANANA",
                "beneficiary_city": "NANANA",
                "post_code": "NANANA",
                "beneficiary_state": "NANANA",
                "customer_id": clearBankCustomerId
            })


            await axios.post(Constants.BASE_URL + "API-FX-190-CLEAR-BANK-CREATE-BENEFICIARY", obj, {
                headers: {
                    fx_key: Constants.SUBSCRIPTION_KEY,
                    Authorization: "Bearer " + JSON.parse(token)
                }
            }).then(resp => {
                // console.log(resp.data);
                resp
                toast.success('Beneficiary Added Successfully.');
                if (routeName == '' || routeName == null)
                    navigate('/SendMoney', { state: { currency: currency, transferflowamount: transferflowamount, currencyid: currencyid, balance: balance } })
                else
                    navigate('/' + routeName, { state: { currency: currency, transferflowamount: transferflowamount, currencyid: currencyid, balance: balance } })
                setLoading(false)
            }).catch((err) => {
                console.log(err.response.data.message);
                toast.error(err.response.data.message);
                setLoading(false)
            })
        }
        else {
            if (Object.keys(bankDetails).length == 0) {
                axios.post(Constants.BASE_URL + "API-FX-127-AddBeneficiary", obj, {
                    headers: {
                        fx_key: Constants.SUBSCRIPTION_KEY,
                        Authorization: "Bearer " + JSON.parse(token)
                    }
                }).then(resp => {
                    console.log(resp.data);
                    //toast.error(resp.data.message);
                    setLoading(false)
                    navigate('/BeneficiaryOtpScreen', { state: { beneId: resp.data.beneficiary_id, contactId: resp.data.beneficiary_id, currency: currency, transferflowamount: transferflowamount, currencyid: currencyid, balance: balance, routeName: routeName } })
                }).catch(err => {
                    console.log(err.response.data);
                    toast.error(err.response.data.message);
                    setLoading(false)
                })
            }
            else {
                axios.post(Constants.BASE_URL + "API-FX-210-ADD-BENEFICIARY", obj, {
                    headers: {
                        fx_key: Constants.SUBSCRIPTION_KEY,
                        Authorization: "Bearer " + JSON.parse(token)
                    }
                }).then(resp => {
                    console.log(resp.data);
                    //toast.error(resp.data.message);
                    setLoading(false)
                    navigate('/BeneficiaryOtpScreen', { state: { beneId: resp.data.beneficiary_id, contactId: resp.data.contact_id, currency: currency, transferflowamount: transferflowamount, currencyid: currencyid, balance: balance } })
                }).catch(err => {
                    console.log(err.response.data);
                    toast.error(err.response.data.message);
                    setLoading(false)
                })
            }
        }
    };

    useEffect(() => {
        getData()
        if (currencyid == 105) {
            getBeneFields('regular', 'IN')
            setbeneCountry("IN");
        }
    }, [beneCountry])
    const getData = async () => {
        const countriesList = sessionStorage.getItem('countries');
        setCountries([JSON.parse(countriesList)])
    }

    const getBeneFields = async (type, code) => {
        setLoading(true)
        if(type=='' || type==null)
            type='regular'
        const token = sessionStorage.getItem('login_token');
        await axios.post(Constants.BASE_URL + 'API-FX-209-BENEFICIARY-FORM-FEILDS', {
            "currency": currency,
            "payment_type": type,
            "bank_country": code == "" || code == null ? beneCountry == 'UK' ? 'GB' : beneCountry : code == 'UK' ? 'GB' : code,
            "beneficiary_type": "individual"
        }, {
            headers: {
                fx_key: Constants.SUBSCRIPTION_KEY,
                Authorization: "Bearer " + JSON.parse(token)
            }
        }).then(resp => {
            setbeneType(type)
            setFormFeilds(Object.values(resp.data.form_fields))
            setFormKeys(Object.keys(resp.data.form_fields))
            setLoading(false)
        }).catch(err => {
            console.log(err.response);
            setLoading(false)
        })
    }


    return (
        <div className="flex items-center justify-center w-full h-full bg-white">
        <div className="bg-white rounded-lg w-full max-w-md shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)]">
            <ToastContainer />
            <div className='flex justify-between items-center w-full border-b p-4 border-[#E7E3E3]'>
            <span className="text-lg font-semibold">Add Beneficiary</span>
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
<div className='px-6'>
            <div className='my-3 mx-1 flex'>
                {countries.length > 0 && currencyid != 105 &&
                    (<select
                        className="pl-8 w-1/4 p-2 outline-none rounded-md bg-[#EAEAEA] w-full text-[#205FFF]"
                        onChange={(e) => {
                            setbeneCountry(e.target.value)
                            getBeneFields(beneType, e.target.value)
                        }}
                    >
                        <option key={0}>---Select Country---</option>
                        {countries[0].length > 0 && countries[0].map(resp => {
                            return (
                                <option key={resp.id} value={resp.code}>{resp.name}</option>
                            )
                        })}
                    </select>)}
            </div>
            {currencyid != 105 ?
                currencyid == 231 ?
                    beneCountry != 'UK' ?
                        <div className='my-3 mx-1 flex'>
                            <select className="pl-8 w-1/4 p-2 outline-none bg-[#EAEAEA] w-full rounded-md text-[#205FFF]" onChange={(e) => {
                                if (e.target.value == 'priority') {
                                    getBeneFields('priority', beneCountry)
                                }
                                else {
                                    getBeneFields('regular', beneCountry)
                                }
                            }}>
                                <option value={'regular'}>Regular</option>
                                <option value={'priority'}>Priority</option>
                            </select>
                        </div>
                        : ''
                    :
                    <div className='my-3 mx-1 flex'>
                        <select className="pl-8 w-1/4 p-2 outline-none bg-[#EAEAEA] w-full rounded-md text-[#205FFF]" onChange={(e) => {
                            if (e.target.value == 'priority') {
                                getBeneFields('priority', beneCountry)
                            }
                            else {
                                getBeneFields('regular', beneCountry)
                            }
                        }}>
                            <option value={'regular'}>Regular</option>
                            <option value={'priority'}>Priority</option>
                        </select>
                    </div>
                :
                ""
            }

            {formFeilds.length > 0 && formFeilds.map((field, index) => {
                return (
                    <div className='my-3' key={index}>

                        <input
                            type={field.type}
                            required={field.is_required}
                            placeholder={field.label}
                            className="pl-8  w-1/4 p-2 outline-none bg-[#EAEAEA] w-full rounded-md text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
                            onChange={(e) => {
                                setbankDetails({ ...bankDetails, [formKeys[index]]: e.target.value })
                            }}
                        />
                    </div>
                )
            })
            }

            <div className='my-3'>
                {loading ? (
                    <div className="text-center">Processing...</div>
                )
                    :
                    formFeilds.length > 0 &&
                    <button onClick={submitHandler}
                        className="bg-[#205FFF] border w-full border-[#205FFF] text-white px-6 py-2 rounded-md">
                        Proceed
                    </button>

                }
            </div>
        </div>
    </div>
    </div>
    );
}

export default SelfAccount;