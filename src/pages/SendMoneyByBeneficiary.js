import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Constants } from '../lib/const/constants';
import { useLocation, useNavigate } from "react-router-dom";
import getCurrencySymbol, { getCountryInfo } from '../lib/currenyUtils';
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { FaPlusCircle } from 'react-icons/fa';

function SendMoneyByBeneficiary() {
    const navigate = useNavigate();
    const location = useLocation();
    const paramsdata = location.state;
    var transferflowamount = paramsdata.transferflowamount;
    var currencyid = paramsdata.currencyid;
    var selectedbeneficiary = paramsdata.selectedBeneficiary;
    var selectedbeneficiaryCode = paramsdata.selectedbeneficiaryCode;
    var selectedbeneficiaryBankAccoutNumber = paramsdata.selectedbeneficiaryBankAccoutNumber;
    var selectedbeneficiaryType = paramsdata.selectedbeneficiaryType;
    var selectedbeneficiaryId = paramsdata.selectedbeneficiaryId;
    var selectedbeneficiaryCountry = paramsdata.selectedbeneficiaryCountry;
    var selectedbeneficiaryBankAccountId = paramsdata.selectedbeneficiaryBankAccountId;


    const [amount, setAmount] = useState("");
    const [balance, setBalance] = useState("")
    const [currency, setCurrency] = useState("")
    const [loading, setLoading] = useState(false)
    const [clearBankBalance, setclearBankBalance] = useState(0.00);
    const [currencyCloudBalance, setcurrencyCloudBalance] = useState(0.00);
    const [clearBankConfiguration, setclearBankConfiguration] = useState();


    useEffect(() => {
        getData()
        removeData()
        getBalances()
    }, [])

    const getData = async () => {
        if (transferflowamount != "" && transferflowamount != null) {
            setAmount(transferflowamount)
            sessionStorage.setItem('receive', JSON.stringify(currencyid));
        }
    }

    const removeData = async () => {
        sessionStorage.removeItem('send');
        sessionStorage.removeItem('receive');
    }


    const proceedToPay = async () => {
        if (amount == 0 || amount == '' || amount == null) {
            toast.error('Please enter a valid amount')
        } else {
            if (balance >= amount) {
                navigate('/PaymentConfirmation', { state: { name: selectedbeneficiary, ifsc: selectedbeneficiaryCode, account: selectedbeneficiaryBankAccoutNumber, type: selectedbeneficiaryType, id: selectedbeneficiaryId, bank_account_name: selectedbeneficiary, currencyid: currencyid, currency: currency, amount: amount, bank_account_id: selectedbeneficiaryBankAccountId, country: selectedbeneficiaryCountry } })
            }
            else {
                toast.error('Insufficient Funds.')
            }
        }
    }
    //   function numberWithCommas(x) {
    //     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //   }

    const getBalances = async () => {
        console.log('loading getbalances');
        setLoading(true);
        const login_workspaces_id = sessionStorage.getItem('login_workspaces_id');
        const login_token = sessionStorage.getItem('login_token');
        try {
            const resp = await axios.get(Constants.BASE_URL + 'API-FX-161-BALANCES/' + login_workspaces_id, {
                headers: {
                    Authorization: "Bearer " + JSON.parse(login_token),
                    fx_key: Constants.SUBSCRIPTION_KEY
                }
            });
            const balArray = Object.values(resp.data);
            const usedBalance = resp.data.used_balances; 
            balArray.pop();
            setcurrencyCloudBalance(resp.data.currency_cloud_account_balance)
            setclearBankBalance(resp.data.clear_bank_account_balance)
            setclearBankConfiguration(resp.data.fees_configuration)
            balArray.pop();
            balArray.pop();
            balArray.pop();
            console.log("clearbank"+clearBankBalance);
            console.log("currency"+currencyCloudBalance);
            console.log("clearBankConfiguration"+clearBankConfiguration);
            balArray.map((balance) => {
                // console.log(paramsdata.currencyid , balance.meta.country_id);
                if (paramsdata.currencyid == balance.meta.country_id) {
                    const availableBalance = balance.balance - (usedBalance[balance.currency]?? 0)    
                    setBalance(availableBalance < 0 ? parseFloat(0).toFixed(2) : parseFloat(availableBalance).toFixed(2))
                    setCurrency(balance.currency)
                }
            })
            setLoading(false);
        } catch (err) {
            console.log(err.response.data);
            setLoading(false);
        }

    };
    return (
        <div className="my-2">
            <ToastContainer />
            <div
                className="bg-gradient-to-r from-[#1152BE] to-[#1152BE] rounded-3xl shadow-lg p-6 flex items-center justify-between text-white">
                <div className="w-1/2 flex gap-8 items-center">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <span>{getCountryInfo(currency, { className: "w-10 h-10" }).flag}
                                {/* {paramsdata.currency=='EUR' && <img src={paramsdata.uri}></img>} */}
                            </span>
                            {/* <span className="text-xl font-semibold">{currency}</span> */}
                        </div>
                        <p className="font-bold text-2xl">{getCurrencySymbol(currency)} {balance ?? parseFloat(balance).toFixed(2)}</p>
                    </div>
                    <div className="relative flex flex-col space-y-2 w-full max-w-xs">
                        <label className="text-base font-semibold" htmlFor="amount">
                            Enter amount
                        </label>
                        <div className="relative flex items-center">
                            <span className="absolute left-3 text-lg text-[#205FFF]">{getCurrencySymbol(currency)}</span>
                            <input
                                id="amount"
                                type="number"
                                min="0"
                                value={amount}
                                placeholder="Enter amount"
                                style={{ paddingLeft: 50 }}
                                className="w-full p-2 outline-none rounded-2xl text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
                                onChange={(e) => setAmount(Math.abs(e.target.value))}
                            />
                        </div>
                    </div>
                </div>

                {
                    selectedbeneficiary &&
                    <div className="w-1/2 flex space-y-2 justify-center">
                        <div className="flex-col flex space-y-2">
                            <h3 className="text-lg font-semibold">Beneficiary Name</h3>
                            <span className="text-base font-medium">{selectedbeneficiary}</span>
                            {loading ?
                                <button
                                    className="bg-[#1E58EB] text-white rounded-2xl px-4 py-2 text-lg font-semibold"
                                >
                                    loading balance...
                                </button>
                                :
                                <button
                                    onClick={proceedToPay}
                                    className="bg-[#1E58EB] text-white rounded-2xl px-4 py-2 text-lg font-semibold"
                                >
                                    Proceed
                                </button>}
                        </div>
                    </div>
                }
            </div>
            <div className="flex items-center justify-between py-4 mb-4">
                <div className="flex items-center m-5">
                    <p className="font-bold text-lg pb-2">Selected Beneficiary</p>
                </div>
                <div className="flex space-x-4">
                    {/* <button onClick={() => navigate("/BeneficiaryTypes", { state: { currency: currency, transferflowamount: amount, currencyid: currencyid, balance: balance } })}
                        className="bg-[#1152BE] border border-[#1152BE] text-white px-6 py-2 rounded-lg flex items-center text-base">
                        <FaPlusCircle className="font-light m-1" /> Add Beneficiary
                    </button> */}
                </div>
            </div>
            <div className="mt-6 bg-white p-5 rounded-lg">
                <div className="items-center m-5">
                    <div className="flex text pb-2">Beneficiary Name: <p className='font-bold '>{selectedbeneficiary}</p></div>
                    {selectedbeneficiaryBankAccoutNumber &&
                        <div className="flex text pb-2">Account Number / IBAN: <p className='font-bold '>{selectedbeneficiaryBankAccoutNumber}</p></div>}
                    {selectedbeneficiaryCode && <div className="flex text pb-2">Code: <p className='font-bold '>{selectedbeneficiaryCode}</p></div>}
                </div>
            </div>
        </div>
    );
}

export default SendMoneyByBeneficiary;