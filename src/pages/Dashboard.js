import React, { useEffect, useState } from 'react';
import TransactionList from '../components/transactions/TransactionList';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { Constants } from '../lib/const/constants';
import getCurrencySymbol, { getCountryInfo } from '../lib/currenyUtils';

function Dashboard() {
  // const isDataLoaded = useRef(false);
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noLoading, setNoLoading] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [sortcode, setSortcode] = useState("");
  const [showBalancesTab, setShowBalancesTab] = useState(false);
  const [mainBalance, setMainBalance] = useState(0.00);
  const [balanceLoading, setBalanceLoading] = useState(false);

  const setAsyncData = async (key, value) => {
    sessionStorage.setItem(key, value);
  }

  const getData = async (pageNumber) => {
    const workspace = sessionStorage.getItem('login_workspaces');
    const login_id = sessionStorage.getItem('login_id');
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
      if (defaultBank === 'Clear Bank as Service') {
        setAccountNumber(sessionStorage.getItem('clearBankCustomerWalletNumber'));
        setSortcode(sessionStorage.getItem('clearBankCustomerSortCode'));
      } else {
        const parsedWorkspace = JSON.parse(workspace);
        if (parsedWorkspace[0].accounts.meta.account_number) {
          setAccountNumber(parsedWorkspace[0].accounts.meta.account_number);
          setSortcode(parsedWorkspace[0].accounts.meta.routing_code);
        }
      }
    }

    if (!login_id || !login_token) {
      sessionStorage.clear();
      navigate('/Homepage');
    } else {
      const from = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + (new Date().getDate() - 100);
      const to = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
      if (!loading && !noLoading) {
        setLoading(true);
        await axios.get(Constants.BASE_URL + 'API-FX-180-CONVERSIONLIST/' + login_workspaces_id + '?page=' + pageNumber + '&from=' + from + '&to=' + to, {
          headers: {
            Authorization: "Bearer " + JSON.parse(login_token),
            fx_key: Constants.SUBSCRIPTION_KEY
          }
        }).then(resp => {
          if (resp.data.transactions.length === 0) {
            setNoLoading(true);
          } else {
            setTransactions(transactions => [...transactions, ...resp.data.transactions]);
          }
        }).catch(err => {
          console.log(err.response.data);
        }).finally(() => {
          setLoading(false);
        });
      }
    }
  };

  const getBalances = async () => {
    if (balanceLoading) return;
    setBalanceLoading(true);
    console.log('loading getbalances');
    const login_workspaces_id = sessionStorage.getItem('login_workspaces_id');
    const login_token = sessionStorage.getItem('login_token');

    if (!login_workspaces_id) {
      navigate('/Homepage');
    } else {
      try {
        const resp = await axios.get(Constants.BASE_URL + 'API-FX-161-BALANCES/' + login_workspaces_id, {
          headers: {
            Authorization: "Bearer " + JSON.parse(login_token),
            fx_key: Constants.SUBSCRIPTION_KEY
          }
        });

        const balArray = resp.data;
        setBalances(balances => [...balances, ...balArray]);

        const gbpBalance = balArray.find(balance => balance.currency === 'GBP');
        if (gbpBalance) {
          setMainBalance(gbpBalance.balance);
        }
      } catch (err) {
        console.log(err.response.data);
      } finally {
        setBalanceLoading(false);
      }
    }
  };

  useEffect(() => {
    getData(0);
    getBalances();
    setLoading(true)
  }, []);

  return (
    <div className="my-2">
      <div className="flex bg-white rounded-2xl my-4 justify-between shadow-lg items-center">
        <div className="items-center justify-between px-8 pt-6 pb-4 text-black">
          <p className="font-normal text-lg pb-2">Total GBP Balance</p>
          <p className="text-3xl font-semibold">{parseFloat(mainBalance).toFixed(2)} GBP</p>
        </div>
        <div className="flex">
          {sortcode != 'undefined' && sortcode != '' && (
            <div className="items-center justify-between px-8 pt-6 pb-4 text-black">
              <p className="font-normal text-[#1152BE] text-base pb-2">Sort Code</p>
              <p className="text-base">{sortcode}</p>
            </div>
          )}
          {accountNumber != 'undefined' && accountNumber != '' && (
            <div className="items-center justify-between px-8 pt-6 pb-4 text-black text-center">
              <p className="font-normal text-[#1152BE] text-base pb-2">Account No</p>
              <p className="text-base">{accountNumber}</p>
            </div>
          )}
        </div>
      </div>

      {showBalancesTab && (
        <div className="bg-white rounded-2xl my-4 shadow-lg">
          <div className="flex items-center justify-between px-8 pt-6 pb-1 text-black">
            <span className="font-medium text-lg border-l-4 border-l-[#F4CE14] pl-3">Wallets</span>

            <div className="flex space-x-2">
              {/* <Link to="/send"
                    className="border border-[#1152BE] text-[#1152BE] px-6 py-1 rounded-lg font-semibold">
                Send
              </Link>
              <Link to="/convert"
                    className="border border-[#1152BE] text-[#1152BE] px-6 py-1 rounded-lg font-semibold">
                Convert
              </Link>
              <Link to="/add-currency"
                    className="border border-[#1152BE] text-[#1152BE] px-6 py-1 rounded-lg font-semibold">
                + Add Currency
              </Link> */}
            </div>
          </div>

          <div className={`flex overflow-x-auto space-x-5 px-4 py-4 w-full ${balanceLoading || loading ? 'justify-center' : ''}`}>
            {balanceLoading || loading ?
              <div className="text-center py-12">Loading balances...</div> : balances.map((resp, index) => {
                const splitflag = (resp.meta.flag || '').split('/');
                const flagname = splitflag.length > 1 ? Constants.FXMASTER_BASE_URL + 'flags/' + splitflag[splitflag.length - 1] : '';
                const data = {
                  currency: resp.currency,
                  balance: resp.balance,
                  flag: flagname,
                  currencyid: resp.meta.country_id,
                  accountNumber: accountNumber,
                  sortcode: sortcode
                };
                return (
                  flagname && (
                    <Link to="/currencyDashboard" state={{ params: { data } }}
                      className="bg-slate-200 rounded-xl pl-4 pr-16 py-4" key={index}>
                      <div className="flex items-center space-x-3 text-left pb-8">
                        <div className="">
                          {resp.currency!='EUR'?
                          getCountryInfo(resp.currency, { className: "w-10 h-10" }).flag
                          :
                          <img src={flagname}></img>
                          }
                        </div>
                        <span className="font-semibold">{resp.currency}</span>
                      </div>
                      <p className="font-semibold">{getCurrencySymbol(resp.currency)}{parseFloat(resp.balance).toFixed(2)}</p>
                    </Link>
                  )
                );
              })}
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl">
        <div className="flex items-center justify-between px-8 pt-6 pb-1 text-black">
          <span className="font-medium text-lg border-l-4 border-l-[#F4CE14] pl-3">Recent Transactions</span>
          <div className="flex space-x-2">
            <Link to="/transactions"
              className="border border-[#1152BE] text-[#1152BE] px-6 py-1 rounded-lg font-semibold">
              View All
            </Link>
          </div>
        </div>
        {
          loading
            ? <div className="text-center py-8">Loading transactions...</div>
            : <TransactionList transactionList={transactions} />
        }
      </div>
    </div>
  );
}

export default Dashboard;
