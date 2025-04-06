import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Constants } from '../lib/const/constants';
import { useLocation, useNavigate } from "react-router-dom";
import { getCountryInfo, getCurrencySymbol } from '../lib/currenyUtils';
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CURRENCIES } from '../lib/currencies';


function CurrencyConverterScreen() {
    const navigate = useNavigate();
    const location = useLocation();
    const paramsdata = location.state;
    const currency = paramsdata.currency;
    const currencyid = paramsdata.currencyid;

    const [receiveCurrency, setReceiveCurrency] = useState("");
    const [receiveCurrencyValue, setReceiveCurrencyValue] = useState("");
    const [receiveCurrencyFlag, setReceiveCurrencyFlag] = useState("");

    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState();
    const [type, settype] = useState('sell');
    const ref = useRef(null);

    const [convertloading, setConvertLoading] = useState(false);
    const [buyAmount, setBuyAmount] = useState();
    const [exchangeRate, setexchangeRate] = useState("0.00");
    const [convertDate, setConvertDate] = useState("");
    const [contactId, setContactId] = useState("");
    // const [recentEdit, setrecentEdit] = useState();
    // const [filtercountries, setfiltercountries] = useState([]);
    const timeout = useRef(null);

    useEffect(() => {
        if (ref.current) return;
        ref.current = true;
        getData()
        removeData()
    }, [])

    const getData = async () => {
        setLoading(true);
        settype('sell');
        // const countries = sessionStorage.getItem('countries');
        // setfiltercountries(countries);
        const token = sessionStorage.getItem('login_token');
        await axios.get(Constants.BASE_URL + 'API-FX-162-CONVERTCOUNTRIES', {
            headers: {
                Authorization: "Bearer " + JSON.parse(token),
                fx_key: Constants.SUBSCRIPTION_KEY
            }
        }).then(resp => {
            setCountries(resp.data.buying_currencies);

            setLoading(false);
        }).catch(() => {
            setLoading(false);
        })
    }
    const getConversionData = async (amt, currencyReceive) => {
        const token = sessionStorage.getItem('login_token');
        const staff_login_id = sessionStorage.getItem('staff_login_id');
        if (currencyReceive != "" && currencyReceive != null && amt != "" && amt != 0) {
            setConvertLoading(true)
            var convertamount = amount;
            if (amt == "" || amt == null) {
                convertamount = amount
                setAmount(amount);
            }
            else {
                convertamount = amt
                setAmount(amt);
            }
            if (currencyid == currencyReceive) {
                toast.error('Same currency cannot be converted.');
            }
            else {
                const workspaceId = sessionStorage.getItem('login_workspaces_id');
                await axios.post(Constants.BASE_URL + "API-FX-163-CONVERTRATES",
                    {
                        "sell_currency_country_id": currencyid,
                        "buy_currency_country_id": currencyReceive,
                        "amount": parseInt(convertamount),
                        "workspace_id": workspaceId,
                        "type": type,
                        "staff_login_id":staff_login_id
                    }, {
                    headers: {
                        fx_key: Constants.SUBSCRIPTION_KEY,
                        Authorization: "Bearer " + JSON.parse(token)
                    }
                }).then(resp => {
                    if (resp.data.code != 400) {
                        setBuyAmount(parseFloat(resp.data.data.meta.client_buy_amount).toFixed(4))
                        setexchangeRate(resp.data.data.meta.client_rate)
                        const updatedate = new Date(resp.data.data.updated_at);
                        setConvertDate(updatedate.getDate() + "-" + (+updatedate.getMonth() + 1) + "-" + updatedate.getFullYear())
                        setContactId(resp.data.contact_id);
                    }
                    else {
                        toast.success(resp.data.message);
                        navigate('/');
                    }
                    setConvertLoading(false);
                }).catch(error => {
                    toast.error(error.response.data.message)
                    setConvertLoading(false);
                })
            }
        }
        setConvertLoading(false)
    }
    const removeData = async () => {
        sessionStorage.removeItem('sell');
        sessionStorage.removeItem('buy');
    }
    const updateConvert = async () => {
        paramsdata.balance = paramsdata.balance.split(',');
        paramsdata.balance = paramsdata.balance.join('');
        paramsdata.balance = parseFloat(paramsdata.balance).toFixed(2);

        if (parseFloat(paramsdata.balance) >= parseFloat(amount)) {
            setLoading(true);
            const workspaceId = sessionStorage.getItem('login_workspaces_id');
            const token = sessionStorage.getItem('login_token');
            await axios.post(Constants.BASE_URL + "API-FX-164-CONVERTRATESCONFIRM",
                {
                    "workspace_id": workspaceId,
                    "contact_id": contactId
                }, {
                headers: {
                    fx_key: Constants.SUBSCRIPTION_KEY,
                    Authorization: "Bearer " + JSON.parse(token)
                }
            }).then(resp => {
                setLoading(false);
                if (resp.data.code != 400) {
                    toast.success('Conversion Successful');
                    navigate('/');
                }
                else {
                    toast.error(resp.data.message);
                }
            }).catch(err => {
                setLoading(false);
                toast.error(err.response.data.message);
            })
        }
        else {
            toast.error("Insufficient Funds.")
        }
    }

    const onChangeHandler = (value) => {
        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
            getConversionData(value, receiveCurrency)
        }, 2000);
    }
    const onInverseChangeHandler = (value) => {
        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
            getInverseConversionData(value, receiveCurrency)
        }, 2000);
    }


    const getInverseConversionData = async (amt, currencyReceive) => {
        const token = sessionStorage.getItem('login_token');
        const staff_login_id = sessionStorage.getItem('staff_login_id');
        if (currencyReceive != "" && currencyReceive != null && amt != "" && amt != 0) {
            setConvertLoading(true)
            console.log(amt);

            var convertamount = parseInt(buyAmount);
            if (amt == "" || amt == null) {
                convertamount = buyAmount
                setBuyAmount(buyAmount);
            }
            else {
                convertamount = amt
                setBuyAmount(amt);
            }
            const workspaceId = sessionStorage.getItem('login_workspaces_id');
            if (currencyid == currencyReceive) {
                toast.error('Same currency cannot be converted.');
            }
            else {
                await axios.post(Constants.BASE_URL + "API-FX-163-CONVERTRATES",
                    {
                        "sell_currency_country_id": currencyReceive,
                        "buy_currency_country_id": currencyid,
                        "amount": parseInt(convertamount),
                        "workspace_id": workspaceId,
                        "type": type,
                        "staff_login_id": staff_login_id
                    }, {
                    headers: {
                        fx_key: Constants.SUBSCRIPTION_KEY,
                        Authorization: "Bearer " + JSON.parse(token)
                    }
                }).then(resp => {
                    if (resp.data.code != 400) {
                        setAmount(parseFloat(resp.data.data.meta.client_buy_amount).toFixed(4))
                        setexchangeRate(resp.data.data.meta.client_rate)
                        const updatedate = new Date(resp.data.data.updated_at);
                        setConvertDate(updatedate.getDate() + "-" + (+updatedate.getMonth() + 1) + "-" + updatedate.getFullYear())
                        setContactId(resp.data.contact_id);
                    }
                    else {
                        toast.success(resp.data.message);
                        navigate('/');
                    }
                    setConvertLoading(false);
                }).catch(error => {
                    toast.error(error.response.data.message)
                    setConvertLoading(false);
                })
            }
        }
        setConvertLoading(false)
    }
    return (
        <div className="my-2">
            <ToastContainer />
            <div
                className="bg-gradient-to-r from-[#1152BE] to-[#1152BE] rounded-3xl shadow-lg flex items-center justify-between text-white">
                <div className="w-1/2 flex gap-8 items-center p-8 border-r">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            {currency != '' ?
                                <>
                                    <span>{getCountryInfo(currency).flag}</span>
                                    <span className="text-xl font-semibold">{paramsdata.balance} {currency}</span>
                                </>
                                :
                                <select
                                    onChange={async (value) => {
                                        let splitted = value.target.value.split('_');
                                        // let obj = search(splitted[0], JSON.parse(filtercountries));
                                        let flagsplitted = splitted[0].split("/");
                                        let splittedflag = Constants.FXMASTER_BASE_URL + "flags/" + flagsplitted[flagsplitted.length - 1][0] + flagsplitted[flagsplitted.length - 1][1] + '.png';
                                        setReceiveCurrency(splitted[1]);
                                        setReceiveCurrencyValue(splitted[0]);
                                        setReceiveCurrencyFlag(splittedflag);
                                        setConvertLoading(true)
                                        // if (recentEdit == 'sell')
                                            await getConversionData(amount, splitted[1]);
                                        // else
                                        //     await getInverseConversionData(amount, splitted[1]);
                                    }}
                                    className="bg-white border border-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                >
                                    <option key={0}
                                        value={''}>
                                        Select
                                    </option>
                                    {countries.map((countryRow) => {
                                        const selectValue = receiveCurrencyValue === countryRow.currency ? ' selected ' : '';
                                        return (

                                            <option selected={selectValue} key={countryRow.id}
                                                value={countryRow.currency + '_' + countryRow.id}>
                                                {countryRow.currency} - {CURRENCIES[countryRow.currency]}
                                            </option>

                                        );
                                    })}
                                </select>
                            }
                        </div>
                    </div>
                    <div className="relative flex flex-col space-y-2 w-full max-w-xs">
                        <label className="text-base font-semibold" htmlFor="amount">
                            Enter amount
                        </label>
                        <div className="relative flex items-center">
                            <span className="absolute left-3 text-lg text-[#205FFF]">{getCurrencySymbol(currency)}</span>
                            <input
                                value={amount}
                                type="number"
                                placeholder="Enter amount"
                                style={{ paddingLeft: 50 }}
                                className="w-full p-2 outline-none rounded-2xl text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
                                onChange={(e) => {
                                    setAmount(e.target.value);
                                    setConvertLoading(true)
                                    onChangeHandler(e.target.value);
                                    // setrecentEdit("sell")
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="w-1/2 flex gap-8 items-center p-8">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div>
                                {receiveCurrencyValue == 'EUR' ?
                                    <img src={receiveCurrencyFlag} style={{ width: 40, borderColor: '#c0c0c0', borderRadius: 10 }} />
                                    :
                                    <img src={receiveCurrencyFlag} />
                                }
                            </div>
                            <div>
                                <select
                                    onChange={async (value) => {
                                        let splitted = value.target.value.split('_');
                                        // let obj = search(splitted[0], JSON.parse(filtercountries));
                                        let flagsplitted = splitted[0].split("/");
                                        let splittedflag = Constants.FXMASTER_BASE_URL + "flags/" + flagsplitted[flagsplitted.length - 1][0] + flagsplitted[flagsplitted.length - 1][1] + '.png';
                                        setReceiveCurrency(splitted[1]);
                                        setReceiveCurrencyValue(splitted[0]);
                                        setReceiveCurrencyFlag(splittedflag);
                                        setConvertLoading(true)
                                        // if (recentEdit == 'sell')
                                            await getConversionData(amount, splitted[1]);
                                        // else
                                        //     await getInverseConversionData(amount, splitted[1]);
                                    }}
                                    className="bg-white border border-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                >
                                    <option key={0}
                                        value={''}>
                                        Select
                                    </option>
                                    {countries.map((countryRow) => {
                                        const selectValue = receiveCurrencyValue === countryRow.currency ? ' selected ' : '';
                                        return (

                                            <option selected={selectValue} key={countryRow.id}
                                                value={countryRow.currency + '_' + countryRow.id}>
                                                {countryRow.currency}  - {CURRENCIES[countryRow.currency]}
                                            </option>

                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="relative flex flex-col space-y-2 w-full max-w-xs">
                        <label className="text-base font-semibold" htmlFor="amount">
                            Convertable Amount
                        </label>
                        <div className="relative flex items-center">
                            <span className="absolute left-1 text-lg text-slate-900">{getCurrencySymbol(receiveCurrencyValue)}</span>
                            <input
                                value={buyAmount}
                                type="number"
                                placeholder="Enter Amount"
                                style={{ paddingLeft: 50 }}
                                className="w-full p-2 outline-none rounded-2xl bg-gray-300 text-slate-900 placeholder:text-sm placeholder:text-slate-700"
                                onChange={(e) => {
                                    setBuyAmount(e.target.value);
                                    setConvertLoading(true)
                                    onInverseChangeHandler(e.target.value);
                                    // setrecentEdit("buy")
                                }}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 rounded-3xl bg-white shadow-lg overflow-hidden">
                <div className="">
                    <div className="flex justify-between border-b p-4">
                        <span>Exchange Rate</span>
                        <span className="text-gray-700">
                            {
                                exchangeRate !== '0.00' && !convertloading ? (((exchangeRate * 100)) / 100).toFixed(4) : '0'
                            }
                        </span>
                    </div>
                    <div className="flex justify-between p-4">
                        <span>Conversion Date</span>
                        <span className="text-gray-700">
                            {
                                exchangeRate !== '0.00' && !convertloading ? convertDate : '-'
                            }
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-6">
                {exchangeRate != '0.00' && !convertloading ?
                    <button className="bg-[#205FFF] text-white py-2 px-6 rounded-2xl" disabled={loading} onClick={updateConvert}>
                        {loading ? 'Processing...' : 'Proceed'}
                    </button> : ''}
                {convertloading ?
                    <button className="bg-[#205FFF] text-white py-2 px-6 rounded-2xl">
                        Loading...
                    </button> : ""
                }
            </div>
        </div>
    );
}

export default CurrencyConverterScreen;