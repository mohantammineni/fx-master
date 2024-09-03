import React, { useEffect, useState } from 'react';
import { Constants } from '../lib/const/constants';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function SelfAccount() {
    const navigate = useNavigate();
    const location = useLocation();
    const paramsdata = location.state;
    const currency = paramsdata.currency;
    const transferflowamount = paramsdata.transferflowamount;
    const currencyid = paramsdata.currencyid;
    const balance = paramsdata.balance;
    const [loading, setLoading] = useState(false);
    const [ifscPLaceholder, setIfscPlaceholder] = useState("");
    const [bankCodePLaceholder, setbankCodePLaceholder] = useState("");

    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [ifscCode, setIfscCode] = useState("");
    const [bankCode, setBankCode] = useState("");
    const [city, setCity] = useState("");
    const [postCode, setPostCode] = useState("");
    const [state, setState] = useState("");
    const [address, setAddress] = useState("");


    const choosePLaceholder = (message) => {
        if (message == 105) {
            setIfscPlaceholder("IFSC Code");
            setbankCodePLaceholder("");
        }
        if (message == 234) {
            setIfscPlaceholder("ABA Code");
            setbankCodePLaceholder("");
        }
        if (message == 231) {
            setIfscPlaceholder("Sort Code");
            setbankCodePLaceholder("");
        }
        if (message == 38) {
            setIfscPlaceholder("Branch Code");
            setbankCodePLaceholder("Bank Code");
        }
        if (message == 13) {
            setIfscPlaceholder("BSB Number");
            setbankCodePLaceholder("");
        }
        if (message == 2) {
            setIfscPlaceholder("IBAN Number");
            setbankCodePLaceholder("BIC Number");
        }
        if (message == 55 || message == 1) {
            setIfscPlaceholder("IBAN Number");
            setbankCodePLaceholder("");
        }
    };

    const submitHandler = async () => {
        setLoading(true)
        const token = sessionStorage.getItem('login_token');
        const workspaceId = sessionStorage.getItem('login_workspaces_id');
        const defaultBank = sessionStorage.getItem('defaultBank');
        const clearBankCustomerId = sessionStorage.getItem('clearBankCustomerId');
        console.log(clearBankCustomerId);
        var obj = {};
        if (currencyid == 105) {
            obj = ({
                "workspace_id": workspaceId,
                "type": "personal",
                "first_name": firstName,
                "middle_name": middleName,
                "last_name": lastName,
                "email": "",
                "mobile": "",
                "meta": {
                    "bank_account_number": accountNumber,
                    "ifsc_code": ifscCode,
                    "bank_code_type": "sort-code",
                    "bank_account_name": firstName + " " + lastName,
                    "bank_country": 105,
                    "beneficiary_type": ["supplier", "customer"],
                    "payment_type": "regular",
                    "beneficiary_address": address,
                    "beneficiary_city": city,
                    "post_code": postCode,
                    "beneficiary_state": state,
                }
            })
        }
        else if (currencyid == 234) {
            obj = ({
                "workspace_id": workspaceId,
                "type": "personal",
                "first_name": firstName,
                "middle_name": middleName,
                "last_name": lastName,
                "email": "",
                "mobile": "",
                "meta": {
                    "bank_account_number": accountNumber,
                    "aba_number": ifscCode,
                    "bank_code_type": "sort-code",
                    "bank_account_name": firstName + " " + lastName,
                    "bank_country": 234,
                    "beneficiary_type": ["supplier", "customer"],
                    "payment_type": "regular",
                    "beneficiary_address": address,
                    "beneficiary_city": city,
                    "post_code": "NANANA",
                    "beneficiary_state": state,
                }
            })
        }
        else if (currencyid == 231) {
            obj = ({
                "workspace_id": workspaceId,
                "type": "personal",
                "first_name": firstName,
                "middle_name": middleName,
                "last_name": lastName,
                "email": "",
                "mobile": "",
                "meta": {
                    "bank_account_number": accountNumber,
                    "sort_code": ifscCode,
                    "bank_code_type": "sort-code",
                    "bank_account_name": firstName + " " + lastName,
                    "bank_country": 231,
                    "beneficiary_type": ["supplier", "customer"],
                    "payment_type": "regular",
                    "beneficiary_address": address,
                    "beneficiary_city": city,
                    "post_code": postCode,
                    "beneficiary_state": state,
                }
            })
        }
        else if (currencyid == 38) {
            obj = ({
                "workspace_id": workspaceId,
                "type": "personal",
                "first_name": firstName,
                "middle_name": middleName,
                "last_name": lastName,
                "email": "",
                "mobile": "",
                "meta": {
                    "bank_account_number": accountNumber,
                    "branch_code": ifscCode,
                    "bank_code_type": "sort-code",
                    "bank_account_name": firstName + " " + lastName,
                    "bank_country": 38,
                    "beneficiary_type": ["supplier", "customer"],
                    "payment_type": "regular",
                    "beneficiary_address": address,
                    "beneficiary_city": city,
                    "post_code": "NANANA",
                    "beneficiary_state": "NANANA",
                    "bank_code": bankCode,
                }
            })
        }
        else if (currencyid == 13) {
            obj = ({
                "workspace_id": workspaceId,
                "type": "personal",
                "first_name": firstName,
                "middle_name": middleName,
                "last_name": lastName,
                "email": "",
                "mobile": "",
                "meta": {
                    "bank_account_number": accountNumber,
                    "bsb_number": ifscCode,
                    "bank_code_type": "sort-code",
                    "bank_account_name": firstName + " " + lastName,
                    "bank_country": 13,
                    "beneficiary_type": ["supplier", "customer"],
                    "payment_type": "regular",
                    "beneficiary_address": address,
                    "beneficiary_city": city,
                    "post_code": "NANANA",
                    "beneficiary_state": state,
                }
            })
        }
        else if (currencyid == 2) {
            obj = ({
                "workspace_id": workspaceId,
                "type": "personal",
                "first_name": firstName,
                "middle_name": middleName,
                "last_name": lastName,
                "email": "",
                "mobile": "",
                "meta": {
                    "bank_account_number": accountNumber,
                    "iban_number": ifscCode,
                    "bank_code_type": "sort-code",
                    "bank_account_name": firstName + " " + lastName,
                    "bank_country": 2,
                    "beneficiary_type": ["supplier", "customer"],
                    "payment_type": "Priority",
                    "beneficiary_address": address,
                    "beneficiary_city": city,
                    "post_code": postCode,
                    "beneficiary_state": state,
                    "bic_number": bankCode,
                }
            })
        }
        else if (currencyid == 55 || currencyid == 1) {
            obj = ({
                "workspace_id": workspaceId,
                "type": "personal",
                "first_name": firstName,
                "middle_name": middleName,
                "last_name": lastName,
                "email": "",
                "mobile": "",
                "meta": {
                    "bank_account_number": accountNumber,
                    "iban_number": ifscCode,
                    "bank_code_type": "sort-code",
                    "bank_account_name": firstName + " " + lastName,
                    "bank_country": 1,
                    "beneficiary_type": ["supplier", "customer"],
                    "payment_type": "regular",
                    "beneficiary_address": address,
                    "beneficiary_city": city,
                    "post_code": postCode,
                    "beneficiary_state": state,
                }
            })
        }
        if (currencyid == 231 && defaultBank == 'Clear Bank as Service') {

            obj = ({
                "workspace_id": workspaceId,
                "type": "personal",
                "first_name": firstName,
                "middle_name": middleName,
                "last_name": lastName,
                "email": "",
                "mobile": "7794020107",
                "bank_account_number": accountNumber,
                "sort_code": ifscCode,
                "bank_code_type": "sort-code",
                "bank_account_name": firstName + " " + middleName + " " + lastName,
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
                alert('Beneficiary Added Successfully.');
                navigate('/SendMoney', { state: { currency: currency, transferflowamount: transferflowamount, currencyid: currencyid, balance: balance } })
                setLoading(false)
            }).catch((err) => {
                console.log(err.response.data.message);
                alert(err.response.data.message);
                setLoading(false)
            })
        }
        else {

            axios.post(Constants.BASE_URL + "API-FX-127-AddBeneficiary", obj, {
                headers: {
                    fx_key: Constants.SUBSCRIPTION_KEY,
                    Authorization: "Bearer " + JSON.parse(token)
                }
            }).then(resp => {
                console.log(resp.data);
                //alert(resp.data.message);
                setLoading(false)
                navigate('/BeneficiaryOtpScreen', { state: { beneId: resp.data.beneficiary_id, currency: currency, transferflowamount: transferflowamount, currencyid: currencyid, balance: balance } })
            }).catch(err => {
                console.log(err.response.data);
                alert(err.response.data.message);
                setLoading(false)
            })
        }
    };

    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        choosePLaceholder(currencyid)
    }



    return (
        <div className="my-2">
            <span className="text-lg font-semibold">Add Beneficiary</span>
            <div className='my-3'>
                <input
                    placeholder='First Name'
                    className="pl-8 w-1/4 p-2 outline-none rounded-2xl text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
                    onChange={(e) => { setFirstName(e.target.value) }}
                />
            </div>
            <div className='my-3'>
                <input
                    placeholder='Middle Name'
                    className="pl-8 w-1/4 p-2 outline-none rounded-2xl text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
                    onChange={(e) => { setMiddleName(e.target.value) }}
                />
            </div>
            <div className='my-3'>
                <input
                    placeholder='Last Name'
                    className="pl-8  w-1/4 p-2 outline-none rounded-2xl text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
                    onChange={(e) => { setLastName(e.target.value) }}
                />
            </div>
            <div className='my-3'>
                {currency != 'EUR' && (
                    <input
                        placeholder='Account Number'
                        className="pl-8  w-1/4 p-2 outline-none rounded-2xl text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
                        onChange={(e) => { setAccountNumber(e.target.value) }}
                    />)}
            </div>
            <div className='my-3'>
                {ifscPLaceholder != "" &&
                    (<input
                        placeholder={ifscPLaceholder}
                        className="pl-8  w-1/4 p-2 outline-none rounded-2xl text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
                        onChange={(e) => { setIfscCode(e.target.value) }}
                    />)}
            </div>
            <div className='my-3'>
                {bankCodePLaceholder != "" &&
                    (<input
                        placeholder={bankCodePLaceholder}
                        className="pl-8  w-1/4 p-2 outline-none rounded-2xl text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
                        onChange={(e) => { setBankCode(e.target.value) }}
                    />)}
            </div>
            <div className='my-3'>
                {ifscPLaceholder != "" && currencyid != 231 &&
                    (<input
                        placeholder='city'
                        className="pl-8  w-1/4 p-2 outline-none rounded-2xl text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
                        onChange={(e) => { setCity(e.target.value) }}
                    />)}
            </div>
            <div className='my-3'>
                {currencyid == 13 || currencyid == 234 || currencyid == 1 || currencyid == 55 &&
                    (<input
                        placeholder='Postcode'
                        className="pl-8  w-1/4 p-2 outline-none rounded-2xl text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
                        onChange={(e) => { setPostCode(e.target.value) }}
                    />)}
            </div>
            <div className='my-3'>
                {currencyid == 234 &&
                    (<input
                        placeholder='State'
                        className="pl-8  w-1/4 p-2 outline-none rounded-2xl text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
                        onChange={(e) => { setState(e.target.value) }}
                    />)}
            </div>
            <div className='my-3'>
                {ifscPLaceholder != "" && currencyid != 231 &&
                    (<input
                        placeholder='Address'
                        className="pl-8  w-1/4 p-2 outline-none rounded-2xl text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
                        onChange={(e) => { setAddress(e.target.value) }}
                    />)}
            </div>
            <div className='my-3'>
                {loading ? (
                    <div className="text-center">Processing...</div>
                )
                    :
                    <button onClick={submitHandler}
                        className="bg-[#1152BE] border border-[#1152BE] text-white px-6 py-2 rounded-lg flex items-center text-base">
                        Add
                    </button>}
            </div>
        </div>
    );
}

export default SelfAccount;