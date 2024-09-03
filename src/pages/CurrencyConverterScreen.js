import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Constants } from '../lib/const/constants';
import { useLocation, useNavigate } from "react-router-dom";
import { getCountryInfo, getCurrencySymbol } from '../lib/currenyUtils';


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
    const [buyAmount, setBuyAmount] = useState("0.00");
    const [exchangeRate, setexchangeRate] = useState("0.00");
    const [convertDate, setConvertDate] = useState("");
    const [contactId, setContactId] = useState("");
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
            await axios.post(Constants.BASE_URL + "API-FX-163-CONVERTRATES",
                {
                    "sell_currency_country_id": currencyid,
                    "buy_currency_country_id": currencyReceive,
                    "amount": convertamount,
                    "workspace_id": workspaceId,
                    "type": type
                }, {
                headers: {
                    fx_key: Constants.SUBSCRIPTION_KEY,
                    Authorization: "Bearer " + JSON.parse(token)
                }
            }).then(resp => {
                if (resp.data.code != 400) {
                    setBuyAmount(resp.data.data.meta.client_buy_amount)
                    setexchangeRate(resp.data.data.meta.client_rate)
                    const updatedate = new Date(resp.data.data.updated_at);
                    setConvertDate(updatedate.getDate() + "-" + (+updatedate.getMonth() + 1) + "-" + updatedate.getFullYear())
                    setContactId(resp.data.contact_id);
                }
                else {
                    alert(resp.data.message);
                    navigate('/');
                }
                setConvertLoading(false);
            }).catch(error => {
                alert(error.response.data.message)
                setConvertLoading(false);
            })
        }
        setConvertLoading(false)
    }
    const removeData = async () => {
        sessionStorage.removeItem('sell');
        sessionStorage.removeItem('buy');
    }
    const updateConvert = async () => {
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
                alert('Conversion Successful');
                navigate('/');
            }
            else {
                alert(resp.data.message);
                navigate('/');
            }
        }).catch(err => {
            setLoading(false);
            alert(err.response.data.message);
        })
    }

    const onChangeHandler = (value) => {
        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
            getConversionData(value, receiveCurrency)
        }, 2000);
    }

    // function search(nameKey, myArray) {
    //     for (let i = 0; i < myArray.length; i++) {
    //         if (myArray[i].currency === nameKey) {
    //             return myArray[i];
    //         }
    //     }
    // }

    return (
        <div className="my-2">

            <div
                className="bg-gradient-to-r from-[#133999] to-[#133999] rounded-3xl shadow-lg flex items-center justify-between text-white">
                <div className="w-1/2 flex gap-8 items-center p-8 border-r">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <span>{getCountryInfo(currency).flag}</span>
                            <span className="text-xl font-semibold">{paramsdata.balance} {currency}</span>
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
                                className="pl-8 w-full p-2 outline-none rounded-2xl text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
                                onChange={(e) => {
                                    setAmount(e.target.value);
                                    setConvertLoading(true)
                                    onChangeHandler(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="w-1/2 flex gap-8 items-center p-8">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div>
                                <img src={receiveCurrencyFlag} />
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
                                        await getConversionData(amount, splitted[1]);
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
                                                {countryRow.currency}
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
                            <span className="absolute left-3 text-lg text-slate-900">{getCurrencySymbol(receiveCurrencyValue)}</span>
                            <input
                                value={buyAmount !== '0.00' ? ((buyAmount * 100) / 100).toFixed(4) : ''}
                                type="number"
                                placeholder="0"
                                className="pl-10 w-full p-2 outline-none rounded-2xl bg-gray-300 text-slate-900 placeholder:text-sm placeholder:text-slate-700"
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
                {convertloading?
                    <button className="bg-[#205FFF] text-white py-2 px-6 rounded-2xl">
                        Loading...
                    </button>:""
                }
            </div>
        </div>
    );
}

export default CurrencyConverterScreen;