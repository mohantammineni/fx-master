import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Constants } from '../lib/const/constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCountryInfo, getCurrencySymbol } from '../lib/currenyUtils';
import toast from 'react-hot-toast';
import { getInitialsName } from '../lib/utils';


function PaymentConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const paramsdata = location.state;
  const name = paramsdata.name;
  const ifsc = paramsdata.ifsc;
  const account = paramsdata.account;
  const type = paramsdata.type;
  const id = paramsdata.id;
  const bank_account_name = paramsdata.bank_account_name;
  const currencyid = paramsdata.currencyid;
  const currency = paramsdata.currency;
  const amount = paramsdata.amount;
  const bank_account_id = paramsdata.bank_account_id;
  const country = paramsdata.country;

  const [defaultBank, setDefaultBank] = useState('');
  const [transferReason, settransferReason] = useState('Family');
  // const [transferReasonvalue, settransferReasonValue] = useState("Transfer Reason");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [transferReasons, setTransferReasons] = useState([]);
  const setReasonForTransfer = async () => {
    settransferReason('Family');
  };

  useEffect(() => {
    setAsyncData();
  }, []);


  const setAsyncData = async () => {
    sessionStorage.setItem('beneficiary_id', JSON.stringify(id));
    sessionStorage.setItem('beneficiary_bank_account_name', bank_account_name);
    setDefaultBank(sessionStorage.getItem('defaultBank'));
    setTransferReasons(JSON.parse(sessionStorage.getItem('transfer_reasons')));
  };

  const initiateTransaction = async () => {
    setButtonLoading(true);
    const login_workspaces_id = sessionStorage.getItem('login_workspaces_id');
    const token = sessionStorage.getItem('login_token');
    if (transferReason != null && transferReason != '') {
      await axios.post(Constants.BASE_URL + 'API-FX-189-CLEAR-BANK-CREATE-TRANSACTION', {
        'workspaceId': login_workspaces_id,
        'beneficiaryId': id,
        'beneficiaryBankId': bank_account_id,
        'reference': 'some reference',
        'reason': transferReason,
        'amount': amount,
        'currency': currency,
      }, {
        headers: {
          fx_key: Constants.SUBSCRIPTION_KEY,
          Authorization: 'Bearer ' + JSON.parse(token),
        },
      }).then(resp => {
        console.log(resp.data);
        transferMoney(resp.data.data.id);
        setButtonLoading(false);
      }).catch(err => {
        console.log(err.response.data);
        setButtonLoading(false);
        toast.error(err.response.data.message);
      });
    } else {
      toast.error('Please select transfer reason');
      setButtonLoading(false);
    }

  };

  const initiateCCTransaction = async () => {
    setButtonLoading(true);
    sessionStorage.removeItem('transfer_reason');
    const login_workspaces_id = sessionStorage.getItem('login_workspaces_id');
    // const beneficiary_id = sessionStorage.getItem('beneficiary_id');
    const token = sessionStorage.getItem('login_token');
    // const beneficiary_bank_account_name = sessionStorage.getItem('beneficiary_bank_account_name');
    if (transferReason != null && transferReason != '') {
      await axios.post(Constants.BASE_URL + ' API-FX-181-DIRECTTRANSFER-CREATEPAYMENT', {
        'workspaceId': login_workspaces_id,
        'currencyCodeTo': currencyid,
        'amount': amount,
        'paymentMethod': 'manual_transfer',
        'beneficiaryId': id,
      }, {
        headers: {
          fx_key: Constants.SUBSCRIPTION_KEY,
          Authorization: 'Bearer ' + JSON.parse(token),
        },
      }).then(resp => {
        transferMoney(resp.data.data.transaction_id);
      }).catch(err => {
        toast.error(err.response.data.message);
        setButtonLoading(false);
        navigate(-1);
      });
    } else {
      toast.error('Please select transfer reason');
      setButtonLoading(false);
    }
  };

  const transferMoney = async (transactionId) => {
    setButtonLoading(true);
    const token = sessionStorage.getItem('login_token');

    if (transferReason != null && transferReason != '') {
      await axios.post(Constants.BASE_URL + ' API-FX-182-DIRECTTRANSFER-SUBMITPAYMENT', {
        'reason': transferReason,
        'transactionId': transactionId,
      }, {
        headers: {
          fx_key: Constants.SUBSCRIPTION_KEY,
          Authorization: 'Bearer ' + JSON.parse(token),
        },
      }).then(resp => {
        console.log(resp.data);
        navigate('/PaymentSuccess');
        setButtonLoading(false);
      }).catch(err => {
        console.log(err.response.data);
        setButtonLoading(false);
      });
    } else {
      toast.error('Please select transfer reason');
      setButtonLoading(false);
    }
  };

  return (
    <div className="my-2">

      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6 w-full">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              {getInitialsName(name)}
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold">{name}</span>
              <span>{getCountryInfo(currency, {
                className: "w-8 h-8"
              }).flag}</span>
            </div>
            <p className="text-gray-500">{account}({ifsc})</p>
          </div>
        </div>

        <div className="relative">
          <hr className="border-t border-dashed" />
          <div
            className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white border rounded-full"></div>
        </div>

        <div className="flex space-x-4">

          <select onChange={() => setReasonForTransfer}
                  className="w-1/2 p-2 border border-gray-300 rounded-lg bg-[#EAEAEA] text-[#707070] outline-0">
            <option key={0}>---Select Reason---</option>
            {
              transferReasons.map((option) => {
                return (
                  <option key={option.id} value={option.id}>{option.reason}</option>
                );
              })
            }
          </select>
        </div>

        <div className="relative">
          <hr className="border-t border-dashed" />
          <div
            className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white border rounded-full"></div>
        </div>

        <div className="flex space-x-16">
          <div>
            <span className="font-semibold block">Account No:</span>
            <span className="text-[#205FFF] font-bold">{account}({ifsc})</span>
          </div>
          <div>
            <span className="font-semibold block">Country:</span>
            <span className="text-[#205FFF] font-bold">{country}</span>
          </div>
          <div>
            <span className="font-semibold block">Type:</span>
            <span className="text-[#205FFF] font-bold">{type}</span>
          </div>
          <div>
            <span className="font-semibold block">Amount:</span>
            <span className="text-[#205FFF] font-bold"> {getCurrencySymbol(currency)} {amount}</span>
          </div>
        </div>

        <div className="flex justify-center">
          {defaultBank === 'Clear Bank as Service' ?
            <button onClick={initiateTransaction}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
              {buttonLoading ? 'Loading...' : 'Continue'}
            </button>
            :
            <button onClick={initiateCCTransaction}
                    className="bg-blue-500 text-white px-16 py-2 rounded-lg hover:bg-blue-600">
              {buttonLoading ? 'Loading...' : 'Continue'}
            </button>
          }

        </div>
      </div>
    </div>
  );
}

export default PaymentConfirmation;