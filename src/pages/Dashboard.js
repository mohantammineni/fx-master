import React, { useEffect, useState } from 'react';
// import TransactionList from '../components/transactions/TransactionList';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { Constants } from '../lib/const/constants';
import getCurrencySymbol, { getCountryInfo } from '../lib/currenyUtils';
import Transaction from './Transactions/Transaction';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { CURRENCIES } from '../lib/currencies';

function Dashboard() {
  // const isDataLoaded = useRef(false);
  const navigate = useNavigate();
  // const [transactions, setTransactions] = useState([]);
  const [balances, setBalances] = useState([]);
  const [balancesId, setbalancesId] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [noLoading, setNoLoading] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [sortcode, setSortcode] = useState("");
  const [showBalancesTab, setShowBalancesTab] = useState(false);
  const [mainBalance, setMainBalance] = useState(0.00);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [accountName, setAccountName] = useState(false);
  const [symbol, setSymbol] = useState("£");
  const [usedBalances, setusedBalances] = useState([]);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [countries, setCountries] = useState([]);
  const [currencyLoading, setCurrencyLoading] = useState(false);
  const [addWalletCurrency, setAddWalletCurrency] = useState("GBP");

  const setAsyncData = async (key, value) => {
    sessionStorage.setItem(key, value);
  }

  const getData = async () => {
    const workspace = sessionStorage.getItem('login_workspaces');
    const login_id = sessionStorage.getItem('login_id');
    const staff_login_id = sessionStorage.getItem('staff_login_id');
    const login_token = sessionStorage.getItem('login_token');
    const login_workspaces_id = sessionStorage.getItem('login_workspaces_id');

    setAsyncData('balances', "");
    setAsyncData('conversions', "");
    await axios.get(Constants.BASE_URL + 'API-FX-165-CCTRANSACTIONS/' + login_workspaces_id + '?page=1&from=1970-01-01&to=1970-02-01', {
      headers: {
        Authorization: "Bearer " + JSON.parse(login_token),
        fx_key: Constants.SUBSCRIPTION_KEY
      }
    }).then(resp => {
      console.log("menu tabs" + JSON.stringify(resp.data.menu));

      if (resp.data.menu.length > 0) {
        for (var m = 0; m < resp.data.menu.length; m++) {
          if (resp.data.menu[m].tab_id == 2) {
            setAsyncData('balances', JSON.stringify(resp.data.menu[m].tab_id));
          }
          if (resp.data.menu[m].tab_id == 1) {
            setAsyncData('conversions', JSON.stringify(resp.data.menu[m].tab_id));
          }
        }
        setLoading(false)
        return true;
      }
      else {
        setLoading(false)
        setAsyncData('balances', "");
        setAsyncData('conversions', "");
      }
    }).catch(err => {
      console.log(err);
      setLoading(false)
    })



    const balancestab = sessionStorage.getItem('balances');
    console.log("balancestab" + balancestab);

    if (balancestab) {
      setShowBalancesTab(true);
    }
    if (workspace) {
      const defaultBank = sessionStorage.getItem('defaultBank');
      const parsedWorkspace = JSON.parse(workspace);
      if (defaultBank === 'Clear Bank as Service') {
        setAccountNumber(sessionStorage.getItem('clearBankCustomerWalletNumber'));
        setSortcode(sessionStorage.getItem('clearBankCustomerSortCode'));
        setAccountName(parsedWorkspace[0].name);
      } else {
        if (parsedWorkspace[0].accounts.length > 0) {
          setAccountNumber(parsedWorkspace[0].accounts.meta.account_number);
          setSortcode(parsedWorkspace[0].accounts.meta.routing_code);
          setAccountName(parsedWorkspace[0].accounts.meta.account_holder_name);
        }
      }
    }

    if (!login_id || !login_token) {
      if (staff_login_id === '' || staff_login_id == null) {
        sessionStorage.clear();
        navigate('/business');
      }
      else {
        navigate('/DebitTransactions')
      }
    } else {
      // const from = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + (new Date().getDate() - 100);
      // const to = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
      // if (!loading && !noLoading) {
      //   setLoading(true);
      //   await axios.get(Constants.BASE_URL + 'API-FX-180-CONVERSIONLIST/' + login_workspaces_id + '?page=' + pageNumber + '&from=' + from + '&to=' + to, {
      //     headers: {
      //       Authorization: "Bearer " + JSON.parse(login_token),
      //       fx_key: Constants.SUBSCRIPTION_KEY
      //     }
      //   }).then(resp => {
      //     if (resp.data.transactions.length === 0) {
      //       setNoLoading(true);
      //     } else {
      //       setTransactions(transactions => [...transactions, ...resp.data.transactions]);
      //     }
      //   }).catch(err => {
      //     console.log(err.response.data);
      //   }).finally(() => {
      //     setLoading(false);
      //   });
      // }
    }
  };

  const getBalances = async (currency = "") => {
    if (balanceLoading) return;
    setBalanceLoading(true);
    setBalances([]);
    setOpenPopUp(false);
    console.log('loading getbalances');
    const login_workspaces_id = sessionStorage.getItem('login_workspaces_id');
    const login_token = sessionStorage.getItem('login_token');

    if (!login_workspaces_id) {
      const staff_login_id = sessionStorage.getItem('staff_login_id');
      if (staff_login_id === '' || staff_login_id == null) {
        navigate('/business');
      }
      else {
        navigate('/DebitTransactions')
      }
    } else {
      try {
        var balanceUrl = Constants.BASE_URL + 'API-FX-161-BALANCES/' + login_workspaces_id;
        if (currency != "")
          balanceUrl = Constants.BASE_URL + 'API-FX-161-BALANCES/' + login_workspaces_id + '?currency=' + currency;
        const resp = await axios.get(balanceUrl, {
          headers: {
            Authorization: "Bearer " + JSON.parse(login_token),
            fx_key: Constants.SUBSCRIPTION_KEY
          }
        });

        const balArray = Object.values(resp.data);
        setusedBalances(resp.data.used_balances)
        balArray.pop();

        setBalances(balances => [...balances, ...balArray]);

        const gbpBalance = balArray.find(balance => balance.currency === 'GBP');
        if (gbpBalance) {
          console.log("babbbb"+gbpBalance.balance);
          
          setMainBalance(gbpBalance.balance);
          setSymbol(getCurrencySymbol('GBP'));
        }
        if (currency != "")
          location.reload();
        const balId = [];
        balArray.map((bal) => {
          balId.push(bal.currency)
        })
        setbalancesId(balId)
      } catch (err) {
        console.log(err.response.data);
      } finally {
        setBalanceLoading(false);
      }
    }
  };
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  useEffect(() => {
    getData(0);
    getBalances();
    setLoading(true)
  }, []);
  const addWallet = async () => {
    setOpenPopUp(true);
    setCurrencyLoading(true)
    const token = sessionStorage.getItem('login_token');
    await axios.get(Constants.BASE_URL + 'API-FX-162-CONVERTCOUNTRIES', {
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
        fx_key: Constants.SUBSCRIPTION_KEY
      }
    }).then(resp => {
      setCountries(resp.data.buying_currencies);

      setCurrencyLoading(false);
    }).catch(() => {
      setCurrencyLoading(false);
    })


  }
  const onClose = async () => {
    setOpenPopUp(false);
  }

  const proceedToAddWallet = async () => {
    getBalances(addWalletCurrency);
  }
  return (
    <div className="py-2 bg-[#eeedeb]">

      <Dialog open={openPopUp} onClose={() => onClose()} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-gray-500/20 transition-opacity" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <DialogTitle className="text-lg font-medium leading-6 text-gray-900 mb-5">
                  Select Currency
                </DialogTitle>
                {currencyLoading ?
                  "loading..."
                  :
                  <select
                    onChange={async (value) => {
                      let splitted = value.target.value.split('_');
                      setAddWalletCurrency(splitted[0]);
                    }}
                    className="bg-white border border-blue text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    <option key={0}
                      value={''}>
                      Select
                    </option>
                    {countries.map((countryRow) => {
                      return (
                        <>
                          {!balancesId.includes(countryRow.currency) &&
                            <option key={countryRow.id}
                              value={countryRow.currency + '_' + countryRow.id}>
                              {countryRow.currency} - {CURRENCIES[countryRow.currency]}
                            </option>
                          }
                        </>

                      );
                    })}
                  </select>
                }
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={proceedToAddWallet}
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-100 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Add
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-100 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      {/* {mainBalance != '' && */}
        <div className="flex my-4 justify-between items-start gap-4">
          {/* First Column: 40% */}
          <div
            className="flex-none w-2/5 rounded-2xl shadow-lg px-8 pt-6 pb-4 text-white"
            style={{
              background: "linear-gradient(to right, #205FFF, #133999)",
            }}
          >
            <p className="font-normal text-lg pb-2">Total GBP Balance</p>
            <p className="text-2xl font-semibold">
              {symbol} {numberWithCommas(parseFloat(mainBalance).toFixed(2))}
            </p>
            <p className="font-normal text-lg pb-2">Available Balance</p>
            <p className="text-2xl font-semibold">
              {symbol} {parseFloat(mainBalance).toFixed(2) - parseFloat(usedBalances.GBP ? usedBalances.GBP : 0).toFixed(2) < 0 ? "0.00" : numberWithCommas(parseFloat(mainBalance - (usedBalances.GBP ? usedBalances.GBP : 0)).toFixed(2))}
            </p>
          </div>

          {/* Second Column: 60% */}
          <div className="flex-grow w-3/5 bg-white rounded-2xl shadow-lg">
            {/* Header with underline */}
            <div className="font-bold text-[#205FFF] text-lg px-8 pt-2 pb-2 border-b"
              style={{ borderColor: "#EEEDEB" }}>
              Account Details
            </div>
            {loading ?
              <div className="text-center py-12">Loading...</div> :
            <div className="divide-y" style={{ borderColor: "#EEEDEB" }}>
              {/* Row 1: Account Name */}
              {accountName && (
                <div className="flex justify-between items-center px-8 py-2">
                  <p className="font-normal text-gray-500 text-base">Account Name</p>
                  <p className="font-bold text-[#205FFF] text-base">{accountName}</p>
                </div>
              )}
              {/* Row 2: Sort Code */}
              {sortcode && (
                <div className="flex justify-between items-center px-8 py-2">
                  <p className="font-normal text-gray-500 text-base">Sort Code</p>
                  <p className="font-bold text-[#205FFF] text-base">{sortcode}</p>
                </div>
              )}
              {/* Row 3: Account Number */}
              {accountNumber && (
                <div className="flex justify-between items-center px-8 py-2">
                  <p className="font-normal text-gray-500 text-base">Account No</p>
                  <p className="font-bold text-[#205FFF] text-base">{accountNumber}</p>
                </div>
              )}
            </div>
            }
          </div>



        </div>
      {/* } */}




      {showBalancesTab && (
        <div className="bg-white rounded-2xl my-4 shadow-lg">
          <div className="flex items-center justify-between px-8 pt-6 pb-1 text-black">
            <span className="font-medium text-lg border-l-4 border-l-[#F4CE14] pl-3">Wallets</span>

            <div className="flex space-x-2">
              <Link to="/Pay"
                    className="border border-[#205FFF] text-[#205FFF] px-6 py-2 font-bold rounded-lg mx-2">
                Send
              </Link>
              <Link to="/Conversions"
                    className="border border-[#205FFF] text-[#205FFF] px-6 py-2 font-bold rounded-lg mx-2">
                Convert
              </Link>
              <button onClick={addWallet} className="border border-[#205FFF] text-[#205FFF] px-6 py-2 font-bold rounded-lg mx-2">+ Add Currency</button>
            </div>
          </div>

          <div className={`flex overflow-x-auto space-x-5 px-4 py-4 w-full ${balanceLoading || loading ? 'justify-center' : ''}`}>
            {balanceLoading || loading ?
              <div className="text-center py-12">Loading balances...</div> : balances.map((resp, index) => {
                const splitflag = (resp?.meta?.flag || '').split('/');
                const flagname = splitflag?.length > 1 ? Constants.FXMASTER_BASE_URL + 'flags/' + splitflag[splitflag?.length - 1] : '';
                const data = {
                  currency: resp.currency,
                  balance: resp.currency != null && resp.currency != '' && Object.prototype.hasOwnProperty.call(usedBalances, resp.currency) ? numberWithCommas(parseFloat((resp.balance - usedBalances[resp.currency]) < 0 ? '0' : resp.balance - usedBalances[resp.currency]).toFixed(2)) : numberWithCommas(parseFloat(resp.balance).toFixed(2)),
                  flag: flagname,
                  currencyid: resp.meta?.country_id,
                  accountNumber: accountNumber,
                  sortcode: sortcode,
                  accountName: accountName
                };
                return (

                  <Link to="/currencyDashboard" state={{ params: { data } }}
                    key={index}>
                    <div className="bg-[#EDEFEC] rounded-xl pl-4 pr-4 py-4" style={{width:200,maxWidth:200}} >
                      <div className="flex items-center space-x-3 text-left pb-2">
                        <div className="">
                          {/* {resp.currency != 'EUR' ?
                          getCountryInfo(resp.currency, { className: "w-10 h-10" }).flag
                          :
                          <img src={flagname}></img>
                        } */}
                          {getCountryInfo(resp.currency, { className: "w-10 h-10" })?.flag}
                        </div>
                        <span className="font-semibold">{resp.currency}</span>
                      </div>
                      <div className='pb-2'>
                        <p className="font-light text-[15px]">Total Balance</p>
                        <p className="font-bold text-sm  text-[#205FFF]">{getCurrencySymbol(resp.currency)}{numberWithCommas(parseFloat(resp.balance).toFixed(2))}</p>
                      </div>
                      <div className='pb-2'>
                        <p className="font-light text-[15px]">Available Balance</p>
                        <p className="font-bold text-sm text-[#205FFF]">{getCurrencySymbol(resp.currency)}

                          {resp.currency != null && resp.currency != '' && Object.prototype.hasOwnProperty.call(usedBalances, resp.currency) ? numberWithCommas(parseFloat((resp.balance - usedBalances[resp.currency]) < 0 ? '0' : resp.balance - usedBalances[resp.currency]).toFixed(2)) : numberWithCommas(parseFloat(resp.balance).toFixed(2))}</p>
                      </div>
                    </div>
                  </Link>

                );
              })}
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl">
        <div className="flex items-center justify-between px-8 pt-6 pb-1 text-black">
          {/* <span className="font-medium text-lg border-l-4 border-l-[#F4CE14] pl-3">Recent Transactions</span>
          <div className="flex space-x-2">
            <Link to="/transactions"
              className="border border-[#1152BE] text-[#1152BE] px-6 py-1 rounded-lg font-semibold">
              View All
            </Link>
          </div> */}
        </div>
        {/* {
          loading
            ? <div className="text-center py-8">Loading transactions...</div>
            : <TransactionList transactionList={transactions} />
        } */}

        <Transaction />
      </div>
    </div>
  );
}

export default Dashboard;
