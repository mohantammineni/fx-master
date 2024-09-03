import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Constants } from '../lib/const/constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { BiRadioCircleMarked, BiRadioCircle } from 'react-icons/bi';
import getCurrencySymbol, { getCountryInfo } from '../lib/currenyUtils';


function AddBalance() {
  const navigate = useNavigate();
  const location = useLocation();
  const paramsdata = location.state;
  const currency = paramsdata.currency;
  const accountNumber = paramsdata.accountNumber;
  const sortcode = paramsdata.sortcode;
  const balance = paramsdata.balance;

  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(1000);
  const [cardtype, setcardtype] = useState('visa');
  const [convertloading, setConvertLoading] = useState(false);
  const [buyAmount, setBuyAmount] = useState('0.00');
  const [sellAmount, setSellAmount] = useState('0.00');
  const [exchangeRate, setexchangeRate] = useState('0.00');
  const timeout = useRef(null);

  const getConversionData = async (amt, cardtyp) => {
    setConvertLoading(true);
    setLoading(true);
    var convertamount = amount;
    var cardType = cardtype;
    if (amt == '' || amt == null) {
      convertamount = amount;
      setAmount(amount);
    } else {
      convertamount = amt;
      setAmount(amt);
    }

    if (cardtyp == '' || cardtyp == null) {
      cardType = cardtype;
      setcardtype(cardtype);
    } else {
      cardType = cardtyp;
      setcardtype(cardtyp);
    }
    if (convertamount != '' && convertamount != null) {
      const token = sessionStorage.getItem('login_token');
      await axios.post(Constants.BASE_URL + 'API-FX-183-GET-PAYMENT-FEES',
        {
          'currency': 'GBP',
          'amount': convertamount,
          'card_type': cardType,
          'country_id': 231,
        }, {
          headers: {
            fx_key: Constants.SUBSCRIPTION_KEY,
            Authorization: 'Bearer ' + JSON.parse(token),
          },
        }).then(resp => {
        console.log('preview response' + JSON.stringify(resp.data));

        setBuyAmount(resp.data.data.fees);
        setSellAmount(resp.data.data.originalAmount);
        setexchangeRate(resp.data.data.finalAmount);
        setConvertLoading(false);
        setLoading(false);
      }).catch(error => {
        console.log(error.response.data);
        alert(error.response.data.message);
        setConvertLoading(false);
        setLoading(false);
      });
    }
    setConvertLoading(false);
    setLoading(false);
  };
  const proceedToPay = async () => {
    setConvertLoading(true);
    setLoading(true);
    const workspaceId = sessionStorage.getItem('login_workspaces_id');
    const login_id = sessionStorage.getItem('login_id');
    const token = sessionStorage.getItem('login_token');
    await axios.post(Constants.BASE_URL + 'API-FX-184-GENERATE-CHECKOUT-LINK',
      {
        'userId': login_id,
        'workspaceId': workspaceId,
        'currency': 'GBP',
        'amount': amount,
        'reason': 'Add Balance',
        'card_type': 'visa',
        'country_id': 231,
      }, {
        headers: {
          fx_key: Constants.SUBSCRIPTION_KEY,
          Authorization: 'Bearer ' + JSON.parse(token),
        },
      }).then(resp => {
      console.log('submit response' + JSON.stringify(resp.data));
      setConvertLoading(false);
      setLoading(false);
      setAsyncData('totalprocessingid', JSON.stringify(resp.data.data.checkout_id));
      setAsyncData('totalprocessingurl', resp.data.data.checkout_url);
      setAsyncData('totalprocessingcardtype', cardtype);
      navigate('/RenderUrl', { state: { url: resp.data.data.checkout_url, cardType: cardtype } });
    }).catch(err => {
      setConvertLoading(false);
      setLoading(false);
      console.log(err);
      alert(err.response.data.message);
    });
  };
  const setAsyncData = async (key, value) => {
    sessionStorage.setItem(key, value);
  };
  const onChangeHandler = (value) => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      getConversionData(value);
    }, 2000);
  };

  useEffect(() => {
    getConversionData(amount, 'visa');
  }, []);
  return (
    <div className="my-2">

      <div
        className="bg-gradient-to-r from-[#205FFF] to-[#133999] rounded-3xl shadow-lg p-6 flex items-center justify-between text-white">
        <div className="w-1/2 flex gap-8 items-center">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span>{getCountryInfo(currency, { className: 'w-10 h-10' }).flag}</span>
              <span className="text-xl font-semibold">{currency}</span>
            </div>
            <p className="font-bold text-2xl">{balance}</p>
          </div>
          <div className="relative flex flex-col space-y-2 w-full max-w-xs">
            <label className="text-base font-semibold" htmlFor="amount">
              Enter amount
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-lg text-[#205FFF]">{getCurrencySymbol(currency)}</span>
              <input
                type="number"
                placeholder="Enter amount"
                className="pl-10 w-full p-2 outline-none rounded-2xl text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  onChangeHandler(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>


      <div className="bg-white rounded-3xl p-6 shadow-lg my-4">

        <div className="mb-6">
          <div className="flex justify-between text-lg mb-2">
            <span className="font-semibold">Original Amount:</span>
            <span>{!convertloading ? ((sellAmount * 100) / 100).toFixed(4) : '0'}</span>
          </div>
          <div className="flex justify-between text-lg mb-2">
            <span className="font-semibold">Transfer Fee:</span>
            <span>{!convertloading ? ((buyAmount * 100) / 100).toFixed(4) : '0'}</span>
          </div>
          <div className="flex justify-between text-lg">
            <span className="font-semibold">Final Amount:</span>
            <span>{!convertloading ? ((exchangeRate * 100) / 100).toFixed(4) : '0'}</span>
          </div>
        </div>

        <div className="flex justify-around items-center mt-6">
          <button
            onClick={() => {
              setcardtype('visa');
              getConversionData(amount, 'visa');
            }}
            className={`flex items-center px-4 py-2 rounded-full ${cardtype === 'visa' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {cardtype === 'visa' ? <BiRadioCircleMarked className="mr-2" /> :
              <BiRadioCircle className="mr-2" />}
            Visa
          </button>

          <button
            onClick={() => {
              setcardtype('master_card');
              getConversionData(amount, 'master_card');
            }}
            className={`flex items-center px-4 py-2 rounded-full ${cardtype === 'master_card' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {cardtype === 'master_card' ? <BiRadioCircleMarked className="mr-2" /> :
              <BiRadioCircle className="mr-2" />}
            Master Card
          </button>

          <button
            onClick={() => {
              setcardtype('amex');
              getConversionData(amount, 'amex');
            }}
            className={`flex items-center px-4 py-2 rounded-full ${cardtype === 'amex' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {cardtype === 'amex' ? <BiRadioCircleMarked className="mr-2" /> :
              <BiRadioCircle className="mr-2" />}
            Amex
          </button>
        </div>

        <div className="text-center my-6">
          {
            !convertloading ? (<button onClick={proceedToPay}
                                       className="bg-blue-500 text-white px-16 py-2 rounded-lg hover:bg-blue-600">
              {loading ? 'Loading...' : 'Continue'}
            </button>) : ''
          }
        </div>

        <div className="text-center my-4 text-lg font-semibold">OR</div>

        <div className="text-center mt-4">
          <p className="mb-2 font-semibold">Manual transfer to the following account details:</p>
          <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg mb-2">
            <span className="font-semibold">Account Number:</span>
            <span>{accountNumber}</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
            <span className="font-semibold">Sort Code:</span>
            <span>{sortcode && '-'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBalance;