import React, { useEffect, useState } from 'react';
import TransactionList from '../components/transactions/TransactionList';
// import TransactionBarGraph from '../components/transactions/TransactionBarGraph';
// import TransactionDonutGraph from '../components/transactions/TransactionDonutGraph';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Constants } from '../lib/const/constants';
import { useLocation } from "react-router-dom";
import { FaArrowLeft } from 'react-icons/fa';
import getCurrencySymbol, { getCountryInfo } from '../lib/currenyUtils';

function CurrencyDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { params } = location.state;
  const paramsdata = params.data
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noLoading, setNoLoading] = useState(false);
  const [showconvertTab, setshowconvertTab] = useState(false);

  useEffect(() => {
    getData(0);
  }, []);

  const getData = async (pageNumber) => {

    // var kyc_submitted = sessionStorage.getItem('kyc_submitted');
    // var yoti_state = sessionStorage.getItem('yoti_state');
    // setKycstate(yoti_state)
    // setKyc(kyc_submitted)
    const conversionstab = sessionStorage.getItem('conversions');
    if (conversionstab) {
      setshowconvertTab(true);
    }
    var login_id = sessionStorage.getItem('login_id');
    var login_token = sessionStorage.getItem('login_token');
    var login_workspaces_id = sessionStorage.getItem('login_workspaces_id');
    if (login_id == "" || login_id == null || login_token == "" || login_token == null) {
      sessionStorage.clear();
      navigate('/Homepage')
    }
    else {
      var from = new Date().getFullYear() + "-" + (+new Date().getMonth() + 1) + "-" + (+new Date().getDate() - 100);
      var to = new Date().getFullYear() + "-" + (+new Date().getMonth() + 1) + "-" + new Date().getDate();
      if (!loading && !noLoading) {
        setLoading(true)
        await axios.get(Constants.BASE_URL + 'API-FX-180-CONVERSIONLIST/' + login_workspaces_id + '?page=' + pageNumber + '&from=' + from + '&to=' + to + '&currency=' + paramsdata.currency, {
          headers: {
            Authorization: "Bearer " + JSON.parse(login_token),
            fx_key: Constants.SUBSCRIPTION_KEY
          }
        }).then(resp => {
          if (resp.data.transactions.length == 0) {
            setNoLoading(true);
            setLoading(false)

            return true;
          }
          else {
            setTransactions((transactions) => [...transactions, ...resp.data.transactions])
            setLoading(false)

          }

          if (resp.data.data.length == 0) {
            setNoLoading(true);
            setLoading(false)

            return true;
          }
          else {
            setLoading(false)

          }
        }).catch(err => {
          console.log(err.response.data);
          setLoading(false)

        })
      }
      else {
        setLoading(false)
      }
    }
  }
  return (
    <div className="my-2">
      <div className="flex items-center justify-between py-4 mb-4">
        <div className="flex items-center">
          <p className="text-2xl font-semibold">Currency</p>
        </div>

        <div className="flex space-x-4">
          <Link to="/"
            className="bg-[#1152BE] border border-[#1152BE] text-white px-6 py-2 rounded-lg flex items-center text-base">
            <FaArrowLeft className="font-light" /> Back
          </Link>
        </div>
      </div>
      <div className="flex bg-white rounded-2xl my-4 justify-between">
        <div className="">
          <div className="flex items-center px-4 pt-4 space-x-2">
            <span>
              {paramsdata.currency!='EUR' && getCountryInfo(paramsdata.currency, {
                className: "w-12 h-12"
              }).flag}
              {paramsdata.currency=='EUR' && <img src={paramsdata.flag}></img>}
            </span>
            <span className="text-lg font-semibold">{paramsdata.currency}</span>
          </div>
          <div className="items-center justify-between px-4 py-2 text-2xl font-medium text-[#205FFF] ">
            {getCurrencySymbol(paramsdata.currency)}{paramsdata.balance}
          </div>
        </div>

        {paramsdata.currencyid==231 &&
        <>
        <div className="items-center justify-between px-8 pt-6 pb-4 text-black">
          <p className="font-normal text-[#1152BE] text-base pb-2">Account Number</p>
          <p className="text-base">{paramsdata.accountNumber}</p>
        </div>

        <div className="items-center justify-between px-8 pt-6 pb-4 text-black">
          <p className="font-normal text-[#1152BE] text-base pb-2">Sort Code</p>
          <p className="text-base">{paramsdata.sortcode}</p>
        </div>
        </>}

        <div className="flex  py-2 px-4 items-center">
          <div className="space-x-2">
            <button onClick={() => navigate('/sendMoney', {
              state: {
                currency: paramsdata.currency,
                currencyid: paramsdata.currencyid,
                balance: paramsdata.balance,
                uri: paramsdata.flag,
              },
            })}
              className="border border-[#1152BE] text-[#1152BE] px-6 py-1 rounded-lg font-semibold">
              Send
            </button>
            {showconvertTab && (
              <button onClick={() => navigate('/CurrencyConverterScreen', {
                state: {
                  currency: paramsdata.currency,
                  currencyid: paramsdata.currencyid,
                  balance: paramsdata.balance,
                  uri: paramsdata.flag,
                },
              })}
                className="border border-[#1152BE] text-[#1152BE] px-6 py-1 rounded-lg font-semibold">
                Convert
              </button>)}

            <button onClick={() => navigate('/AddBalance', { state: { currency: paramsdata.currency, currencyid: paramsdata.currencyid, balance: paramsdata.balance, uri: paramsdata.flag, accountNumber: paramsdata.accountNumber, sortcode: paramsdata.sortcode } })}
              className="border border-[#1152BE] text-[#1152BE] px-6 py-1 rounded-lg font-semibold">
              Add Balance
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl">
        <div className="flex items-center justify-between px-8 pt-6 pb-1 text-black">
          <span
            className="font-medium text-lg border-l-4 border-l-[#F4CE14] pl-3">Latest {paramsdata.currency} Transactions</span>
          <div className="flex space-x-2">
            <button onClick={() => navigate('/transactions')}
              className="border border-[#1152BE] text-[#1152BE] px-6 py-1 rounded-lg font-semibold">
              View All
            </button>
          </div>
        </div>
        {
          loading
            ? <div className="text-center py-8">Loading {paramsdata.currency} transactions...</div>
            : <TransactionList transactionList={transactions} />
        }
      </div>
    </div>
  );
}

export default CurrencyDashboard;