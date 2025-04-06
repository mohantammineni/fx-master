import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Constants } from '../lib/const/constants';
import { useNavigate } from "react-router-dom";
import { getCountryInfo, getCurrencySymbol } from '../lib/currenyUtils';
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CURRENCIES } from '../lib/currencies';


function CurrencyConverterFormScreen() {
    const navigate = useNavigate();

    const [receiveCurrency, setReceiveCurrency] = useState("");
    const [receiveCurrencyValue, setReceiveCurrencyValue] = useState("");
    const [receiveCurrencyFlag, setReceiveCurrencyFlag] = useState("");

    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [balLoading, setBalLoading] = useState(false);
    const [amount, setAmount] = useState();
    const [type, settype] = useState('sell');
    const ref = useRef(null);

    const [convertloading, setConvertLoading] = useState(false);
    const [buyAmount, setBuyAmount] = useState();
    const [exchangeRate, setexchangeRate] = useState("0.00");
    const [convertDate, setConvertDate] = useState("");
    const [contactId, setContactId] = useState("");
    const [recentEdit, setrecentEdit] = useState();
    const [currency, setCurrency] = useState();
    const [currencyid, setCurrencyId] = useState();
    const [balance, setBalance] = useState();
    const [receivebalance, setreceivebalance] = useState();
    const [usedBalances, setusedBalances] = useState([]);
    const [balances, setBalances] = useState([]);
    const [recentLoaded, setRecentLoaded] = useState();

    const timeout = useRef(null);

    useEffect(() => {
        if (ref.current) return;
        ref.current = true;
        getBalances()
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

    const getBalances = async () => {
        setBalLoading(true)
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
            setusedBalances(resp.data.used_balances)
            balArray.pop();
            setBalances(balances => [...balances, ...balArray]);
            setBalLoading(false);
        } catch (err) {
            console.log(err.response.data);
            setBalLoading(false);
        } finally {
            setBalLoading(false);
        }
    };


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
            const workspaceId = sessionStorage.getItem('login_workspaces_id');
            if (convertamount != "" && convertamount != null) {
                if (currencyid == currencyReceive) {
                    toast.error('Same currency cannot be converted.');
                }
                else {
                    setRecentLoaded("normal");
                    if (currencyid != "" && currencyid != null && currencyReceive != "" && currencyReceive != null) {
                        await axios.post(Constants.BASE_URL + "API-FX-163-CONVERTRATES",
                            {
                                "sell_currency_country_id": currencyid,
                                "buy_currency_country_id": currencyReceive,
                                "amount": parseFloat(convertamount).toFixed(2),
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
                                setBuyAmount(parseFloat(resp.data.data.meta.client_buy_amount).toFixed(2))
                                setAmount(parseFloat(resp.data.data.meta.client_sell_amount).toFixed(2))
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
            }
        }
        setConvertLoading(false)
    }
    const removeData = async () => {
        sessionStorage.removeItem('sell');
        sessionStorage.removeItem('buy');
    }
    const updateConvert = async () => {

        if (parseFloat(balance) >= parseFloat(amount)) {
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
                toast.error(err.response);
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

            var convertamount = parseFloat(buyAmount).toFixed(2);
            if (amt == "" || amt == null) {
                convertamount = buyAmount
                setBuyAmount(buyAmount);
            }
            else {
                convertamount = amt
                setBuyAmount(amt);
            }
            const workspaceId = sessionStorage.getItem('login_workspaces_id');
            if (convertamount != "" && convertamount != null) {
                if (currencyid == currencyReceive) {
                    toast.error('Same currency cannot be converted.');
                }
                else {
                    setRecentLoaded("inverse");
                    if (currencyid != "" && currencyid != null && currencyReceive != "" && currencyReceive != null) {
                        await axios.post(Constants.BASE_URL + "API-FX-163-CONVERTRATES",
                            {
                                "sell_currency_country_id": currencyid,
                                "buy_currency_country_id": currencyReceive,
                                "amount": parseFloat(convertamount).toFixed(2),
                                "workspace_id": workspaceId,
                                "type": "buy",
                                "staff_login_id":staff_login_id
                            }, {
                            headers: {
                                fx_key: Constants.SUBSCRIPTION_KEY,
                                Authorization: "Bearer " + JSON.parse(token)
                            }
                        }).then(resp => { 
                            if (resp.data.code != 400) {
                                setBuyAmount(parseFloat(resp.data.data.meta.client_buy_amount).toFixed(2))
                                setAmount(parseFloat(resp.data.data.meta.client_sell_amount).toFixed(2))
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
            }
        }
        setConvertLoading(false)
    }

    // const createConvert = async () => {
    //     const token = sessionStorage.getItem('login_token');
    //     const workspaceId = sessionStorage.getItem('login_workspaces_id');
    //     if (amount != "" && amount != null) {
    //         if (currencyid == receiveCurrency) {
    //             toast.error('Same currency cannot be converted.');
    //         }
    //         else {
    //             console.log({
    //                 "sell_currency_country_id": currencyid,
    //                 "buy_currency_country_id": receiveCurrency,
    //                 "amount": parseFloat(amount).toFixed(2),
    //                 "workspace_id": workspaceId,
    //                 "type": type
    //             });
    //             if (currencyid != "" && currencyid != null && receiveCurrency != "" && receiveCurrency != null) {
    //                 setConvertLoading(true);
    //                 await axios.post(Constants.BASE_URL + "API-FX-163-CONVERTRATES",
    //                     {
    //                         "sell_currency_country_id": currencyid,
    //                         "buy_currency_country_id": receiveCurrency,
    //                         "amount": parseFloat(amount).toFixed(2),
    //                         "workspace_id": workspaceId,
    //                         "type": type
    //                     }, {
    //                     headers: {
    //                         fx_key: Constants.SUBSCRIPTION_KEY,
    //                         Authorization: "Bearer " + JSON.parse(token)
    //                     }
    //                 }).then(resp => {
    //                     if (resp.data.code != 400) {
    //                         setBuyAmount(parseFloat(resp.data.data.meta.client_buy_amount).toFixed(2))
    //                         setexchangeRate(resp.data.data.meta.client_rate)
    //                         const updatedate = new Date(resp.data.data.updated_at);
    //                         setConvertDate(updatedate.getDate() + "-" + (+updatedate.getMonth() + 1) + "-" + updatedate.getFullYear())
    //                         setContactId(resp.data.contact_id);


    //                         if (parseFloat(balance) >= parseFloat(amount)) {

    //                             axios.post(Constants.BASE_URL + "API-FX-164-CONVERTRATESCONFIRM",
    //                                 {
    //                                     "workspace_id": workspaceId,
    //                                     "contact_id": resp.data.contact_id
    //                                 }, {
    //                                 headers: {
    //                                     fx_key: Constants.SUBSCRIPTION_KEY,
    //                                     Authorization: "Bearer " + JSON.parse(token)
    //                                 }
    //                             }).then(resp => {
    //                                 setConvertLoading(false);
    //                                 if (resp.data.code != 400) {
    //                                     toast.success('Conversion Successful');
    //                                     navigate('/');
    //                                 }
    //                                 else {
    //                                     toast.error(resp.data.message);
    //                                 }
    //                             }).catch(err => {
    //                                 setConvertLoading(false);
    //                                 toast.error(err.response);
    //                             })
    //                         }
    //                         else {
    //                             toast.error("Insufficient Funds.")
    //                         }

    //                         setConvertLoading(false);
    //                     }
    //                     else {
    //                         toast.error(resp.data.message);
    //                         // navigate('/');
    //                         setConvertLoading(false);
    //                     }
    //                     setConvertLoading(false);
    //                 }).catch(error => {
    //                     toast.error(error.response.data.message)
    //                     setConvertLoading(false);
    //                 })
    //             }
    //         }
    //     }
    // }
    return (
        <div className="my-2">
            <ToastContainer />
            {!balLoading ?
                <div
                    className="bg-gradient-to-r from-[#1152BE] to-[#1152BE] rounded-3xl shadow-lg flex items-center justify-between text-white">
                    <div className="w-1/2 flex gap-8 items-center p-8 border-r">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">

                                <>
                                    <span>{currency != "" && currency != null && getCountryInfo(currency).flag}</span>
                                    <span className="text-xl font-semibold">{balance != "" && balance != null ? parseFloat(balance).toFixed(2) : '0.00'} {currency}</span>
                                </>
                                <select
                                    onChange={async (value) => {
                                        let splitted = value.target.value.split('_');
                                        setCurrencyId(splitted[1]);
                                        setCurrency(splitted[0]);
                                        setConvertLoading(true)
                                        if (recentEdit == 'sell')
                                            await getConversionData(amount, splitted[1]);
                                        else
                                            await getInverseConversionData(amount, splitted[1]);
                                        balances.map((resp) => {
                                            if (resp.currency == splitted[0]) {
                                                resp.currency != null && resp.currency != '' && Object.prototype.hasOwnProperty.call(usedBalances, resp.currency) ?
                                                    (parseFloat((resp.balance - usedBalances[resp.currency]) < 0 ?
                                                        setBalance(0) :
                                                        setBalance(resp.balance - usedBalances[resp.currency]))) :
                                                    setBalance(resp.balance)
                                            }
                                        })
                                    }}
                                    className="bg-white border border-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                >
                                    <option key={0}
                                        value={''}>
                                        Select
                                    </option>
                                    {countries.map((countryRow) => {
                                        // const selectValue = receiveCurrencyValue === countryRow.currency ? ' selected ' : '';
                                        return (
                                            <>
                                                {receiveCurrencyValue != countryRow.currency &&
                                                    <option key={countryRow.id}
                                                        value={countryRow.currency + '_' + countryRow.id}>
                                                        {countryRow.currency} - {CURRENCIES[countryRow.currency]}
                                                    </option>
                                                }
                                            </>

                                        );
                                    })}
                                </select>

                            </div>
                        </div>
                        <div className="relative flex flex-col space-y-2 w-full max-w-xs">
                            <label className="text-base font-semibold" htmlFor="amount">
                                From amount
                            </label>
                            <div className="relative flex items-center">
                                <span className="absolute left-3 text-lg text-[#205FFF]">{currency != "" && currency != null && getCurrencySymbol(currency)}</span>
                                <input
                                    value={amount}
                                    type="number"
                                    placeholder="Enter amount"
                                    style={{ paddingLeft: 50 }}
                                    className="w-full p-2 outline-none rounded-2xl text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
                                    onChange={(e) => {
                                        const validated = (e.target.value).match(/^(\d*\.{0,1}\d{0,2}$)/)
                                        if (validated) {
                                            console.log(validated[0]);

                                            setAmount(validated[0]);

                                        }
                                        setConvertLoading(true)
                                        if(e.target.value=="")
                                            setBuyAmount("")
                                        onChangeHandler(e.target.value);
                                        setrecentEdit("sell")
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
                                    <>
                                        <span className="text-xl font-semibold">{receivebalance != "" && receivebalance != null ? parseFloat(receivebalance).toFixed(2) : '0.00'} {receiveCurrencyValue}</span>
                                    </>
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
                                            if (recentEdit == 'sell')
                                                await getConversionData(amount, splitted[1]);
                                            else
                                                await getInverseConversionData(amount, splitted[1]);

                                            balances.map((resp) => {
                                                if (resp.currency == splitted[0]) {
                                                    resp.currency != null && resp.currency != '' && Object.prototype.hasOwnProperty.call(usedBalances, resp.currency) ?
                                                        (parseFloat((resp.balance - usedBalances[resp.currency]) < 0 ?
                                                            setreceivebalance(0) :
                                                            setreceivebalance(resp.balance - usedBalances[resp.currency]))) :
                                                        setreceivebalance(resp.balance)
                                                }
                                            })
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
                                                <>
                                                    {currency != countryRow.currency &&
                                                        <option selected={selectValue} key={countryRow.id}
                                                            value={countryRow.currency + '_' + countryRow.id}>
                                                            {countryRow.currency} - {CURRENCIES[countryRow.currency]}
                                                        </option>
                                                    }
                                                </>

                                            );
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="relative flex flex-col space-y-2 w-full max-w-xs">
                            <label className="text-base font-semibold" htmlFor="amount">
                                To Amount
                            </label>
                            <div className="relative flex items-center">
                                <span className="absolute left-1 text-lg text-slate-900">{getCurrencySymbol(receiveCurrencyValue)}</span>
                                <input
                                    value={buyAmount}
                                    type="number"
                                    placeholder="Enter Amount"
                                    style={{ paddingLeft: 50 }}
                                    className="w-full p-2 outline-none rounded-2xl text-slate-900 placeholder:text-sm placeholder:text-slate-700"
                                    onChange={(e) => {
                                        const validated = (e.target.value).match(/^(\d*\.{0,1}\d{0,2}$)/)
                                        if (validated) {
                                            console.log(validated[0]);

                                            setBuyAmount(validated[0]);

                                        }
                                        setConvertLoading(true)
                                        if(e.target.value=="")
                                            setAmount("")
                                        onInverseChangeHandler(e.target.value);
                                        setrecentEdit("buy")
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className='text-center align-center'>loading...</div>
            }
            <div className="mt-6 rounded-3xl bg-white shadow-lg overflow-hidden">
                <div className="">
                    <div className="flex justify-between border-b p-4">
                        <span>Exchange Rate</span>
                        <span className="text-gray-700">
                            {
                                exchangeRate !== '0.00' && !convertloading ?
                                        parseFloat( exchangeRate).toFixed(4)
                                    : '0'
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
                    recentLoaded == 'normal' ?
                        <button className="bg-[#205FFF] text-white py-2 px-6 rounded-2xl" disabled={loading} onClick={updateConvert}>
                            {loading ? 'Processing...' : 'Proceed'}
                        </button> :
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

export default CurrencyConverterFormScreen;