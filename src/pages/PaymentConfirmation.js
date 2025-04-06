import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Constants } from '../lib/const/constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCountryInfo, getCurrencySymbol } from '../lib/currenyUtils';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getInitialsName } from '../lib/utils';
import { Table, Tbody, Tr, Td } from 'react-super-responsive-table';


function PaymentConfirmation() {
  const fileInputRef = useRef(null);

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };
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
  const bene_type = paramsdata.bene_type;
  // const bank_type = paramsdata.bank_type;

  const [defaultBank, setDefaultBank] = useState('');
  const [transferReason, settransferReason] = useState('Paying an Invoice');
  // const [transferReasonvalue, settransferReasonValue] = useState("Transfer Reason");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [transferReasons, setTransferReasons] = useState([]);
  const [ref, setRef] = useState("");
  const [notes, setNotes] = useState();
  const [file, setFile] = useState()
  const [clearBankBalance, setclearBankBalance] = useState(0.00);
  const [currencyCloudBalance, setcurrencyCloudBalance] = useState(0.00);
  const [clearBankConfiguration, setclearBankConfiguration] = useState();
  const [transacitonfees, setTransactionFees] = useState();
  const setReasonForTransfer = async (val) => {
    settransferReason(val);
  };

  useEffect(() => {
    setAsyncData();
    loadBalances();
  }, []);


  const setAsyncData = async () => {
    sessionStorage.setItem('beneficiary_id', JSON.stringify(id));
    sessionStorage.setItem('beneficiary_bank_account_name', bank_account_name);
    setDefaultBank(sessionStorage.getItem('defaultBank'));
    setTransferReasons(JSON.parse(sessionStorage.getItem('transfer_reasons')));
  };

  const loadBalances = async () => {
    setButtonLoading(true)
    const login_workspaces_id = sessionStorage.getItem('login_workspaces_id');
    const token = sessionStorage.getItem('login_token');
    var balanceUrl = Constants.BASE_URL + 'API-FX-161-BALANCES/' + login_workspaces_id + '?currency=' + currency;
    const resp = await axios.get(balanceUrl, {
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
        fx_key: Constants.SUBSCRIPTION_KEY
      }
    });
    var transactionFee = 0;
    transactionFee = Object.prototype.hasOwnProperty.call(resp.data.fees_configuration, "transaction_fees") && resp.data.fees_configuration.transaction_fees.percentage;
    setTransactionFees(transactionFee)
    setButtonLoading(false)
  }

  const initiateTransaction = async () => {
    setButtonLoading(true);
    const login_workspaces_id = sessionStorage.getItem('login_workspaces_id');
    const workspace = sessionStorage.getItem('login_workspaces');
    const parsedWorkspace = JSON.parse(workspace);
    const login_full_name = parsedWorkspace[0].name;
    const token = sessionStorage.getItem('login_token');
    const staff_login_id = sessionStorage.getItem('staff_login_id');
    if (transferReason != null && transferReason != '') {
      var balanceUrl = Constants.BASE_URL + 'API-FX-161-BALANCES/' + login_workspaces_id + '?currency=' + currency;
      const resp = await axios.get(balanceUrl, {
        headers: {
          Authorization: "Bearer " + JSON.parse(token),
          fx_key: Constants.SUBSCRIPTION_KEY
        }
      });
      const balArray = Object.values(resp.data);
      var usedbalances = resp.data.used_balances
      balArray.pop();
      setcurrencyCloudBalance(resp.data.currency_cloud_account_balance)
      setclearBankBalance(resp.data.clear_bank_account_balance)
      setclearBankConfiguration(resp.data.fees_configuration)
      balArray.pop();
      balArray.pop();
      balArray.pop();
      console.log("clearbank" + clearBankBalance);
      console.log("currency" + currencyCloudBalance);
      console.log("clearBankConfiguration" + clearBankConfiguration);
      balArray.map(async (balance) => {
        if (balance.currency == currency) {
          var usedbalance = 0;
          console.log(balance.balance);
          const key = getKeyByValue(Object.keys(usedbalances), currency);
          if (key != null && key != "" && key != "undefined")
            usedbalance = (Object.values(usedbalances)[key]);
          var availableBalance = parseFloat(balance.balance - usedbalance).toFixed(2);
          if (availableBalance < 0)
            availableBalance = 0
          if (availableBalance == null || availableBalance == '' || availableBalance == 'NaN' || availableBalance == 'undefined')
            availableBalance = 0

          await axios.post(Constants.BASE_URL + 'API-FX-189-CLEAR-BANK-CREATE-TRANSACTION', {
            'workspaceId': login_workspaces_id,
            'beneficiaryId': id,
            'beneficiaryBankId': bank_account_id,
            'reference': ref != "" ? ref : login_full_name,
            'reason': transferReason,
            'amount': amount,
            'currency': currency,
            'type': bene_type,
            'staff_login_id': staff_login_id,
            'total_balance': availableBalance,
            'currency_cloud_balance': currencyCloudBalance,
            'clear_bank_balance': availableBalance
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
        }
      })
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
    const workspace = sessionStorage.getItem('login_workspaces');
    const parsedWorkspace = JSON.parse(workspace);
    const login_full_name = parsedWorkspace[0].name;
    const staff_login_id = sessionStorage.getItem('staff_login_id');
    // const beneficiary_bank_account_name = sessionStorage.getItem('beneficiary_bank_account_name');
    if (transferReason != null && transferReason != '') {

      var balanceUrl = Constants.BASE_URL + 'API-FX-161-BALANCES/' + login_workspaces_id + '?currency=' + currency;
      const resp = await axios.get(balanceUrl, {
        headers: {
          Authorization: "Bearer " + JSON.parse(token),
          fx_key: Constants.SUBSCRIPTION_KEY
        }
      });
      const balArray = Object.values(resp.data);
      var usedbalances = resp.data.used_balances
      balArray.pop();
      setcurrencyCloudBalance(resp.data.currency_cloud_account_balance)
      setclearBankBalance(resp.data.clear_bank_account_balance)
      setclearBankConfiguration(resp.data.fees_configuration)
      balArray.pop();
      balArray.pop();
      balArray.pop();
      console.log("clearbank" + clearBankBalance);
      console.log("currency" + currencyCloudBalance);
      console.log("clearBankConfiguration" + clearBankConfiguration);
      balArray.map(async (balance) => {
        if (balance.currency == currency) {
          var usedbalance = 0;
          console.log(balance.balance);
          const key = getKeyByValue(Object.keys(usedbalances), currency);
          if (key != null && key != "" && key != "undefined")
            usedbalance = (Object.values(usedbalances)[key]);
          var availableBalance = parseFloat(balance.balance - usedbalance).toFixed(2);
          if (availableBalance < 0)
            availableBalance = 0
          if (availableBalance == null || availableBalance == '' || availableBalance == 'NaN' || availableBalance == 'undefined')
            availableBalance = 0
          await axios.post(Constants.BASE_URL + ' API-FX-181-DIRECTTRANSFER-CREATEPAYMENT', {
            'workspaceId': login_workspaces_id,
            'currencyCodeTo': currencyid,
            'amount': amount,
            'paymentMethod': 'manual_transfer',
            'beneficiaryId': id,
            'reference': ref != "" ? ref : login_full_name,
            'staff_login_id': staff_login_id,
            'total_balance': availableBalance,
            'currency_cloud_balance': currencyCloudBalance,
            'clear_bank_balance': clearBankBalance
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
        }
      })

    } else {
      toast.error('Please select transfer reason');
      setButtonLoading(false);
    }
  };
  function getKeyByValue(object, value) {
    return Object.keys(object).find(key =>
      object[key] === value);
  }
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
        if (file != '' && file != null) { handleSubmit(transactionId) }
        setButtonLoading(false);
        navigate('/PaymentSuccess');
      }).catch(err => {
        console.log("error" + err.response);
        setButtonLoading(false);
      });
    } else {
      toast.error('Please select transfer reason');
      setButtonLoading(false);
    }
  };


  const handleSingleFileChange = (event) => {
    setFile(event.target.files[0])
  };
  const getBase64 = async (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  function handleSubmit(transactionId) {
    getBase64(file, (result) => {
      uploadSingleDocument(result, transactionId)
    });
  }

  const uploadSingleDocument = async (document, transactionId) => {
    if (notes != '' && notes != null && (file == '' || file == null))
      toast.error('File upload is mandatory')
    if (file != '' && file != null) {
      const token = sessionStorage.getItem('login_token');
      var extension = (file.name).split(".");
      console.log(extension[extension.length - 1]);
      await axios.post(Constants.BASE_URL + 'API-FX-195-UPLOAD-USER-TRANSACTION-DOCUMENTS', {
        document: document,
        transaction_id: transactionId,
        notes: notes == '' || notes == null ? 'NA' : notes,
        extension: extension[extension.length - 1]
      }, {
        headers: {
          Authorization: "Bearer " + JSON.parse(token),
          fx_key: Constants.SUBSCRIPTION_KEY
        }
      }).then((response) => {
        console.log(response.data);
      }).catch(err => {
        err
      });
    }
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


  return (
    <div className="my-2">
      <ToastContainer />
      <div className="bg-white rounded-xl p-6 space-y-6 w-full" style={{boxShadow: '0px 0px 14.2px 0px rgba(0, 0, 0, 0.25)'}}>
      <div className="flex justify-between items-center p-4">
  {/* Left Column - User Details */}
  <div className="flex items-center space-x-4">
    {/* Profile Icon */}
    <div className="flex items-center justify-center">
      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
        {getInitialsName(name)}
      </div>
    </div>

    {/* Name & Account Details */}
    <div>
      <div className="flex items-center space-x-2">
        <span className="text-lg font-semibold">{name}</span>
        <span>
          {getCountryInfo(currency, {
            className: "w-5 h-5"
          }).flag}
        </span>
      </div>
      <p className="text-gray-500">{account} ({ifsc})</p>
    </div>
  </div>

  {/* Right Column - Amount Display */}
  <div className="text-right">
    <p className="text-sm text-gray-500">Total Amount</p>
    <p className="text-2xl font-semibold text-[#012646]">
      {getCurrencySymbol(currency)} {numberWithCommas(amount)}
    </p>
  </div>
</div>


        {/* <div className="relative">
          <hr className="border-t border-dashed" />
          <div
            className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white border rounded-full"></div>
        </div> */}
   <Table className="w-full text-sm text-left border border-gray-200 border-collapse">
  <Tbody>
    <Tr className="border-b border-[#B7B7B7]">
      <Td className="w-[30%] border-r border-[#B7B7B7] px-4 py-2 text-base font-normal text-gray-600">
       Account Number
      </Td>
      <Td className="w-[70%] px-4 py-2 font-semibold text-base text-gray-900">
      {account}({ifsc})
      </Td>
    </Tr>
    <Tr className="border-b border-[#B7B7B7]">
      <Td className="w-[30%] border-r border-[#B7B7B7] px-4 py-2 text-base font-normal text-gray-600">
      Type
      </Td>
      <Td className="w-[70%] px-4 py-2 font-semibold text-base text-gray-900">
      {type}
      </Td>
    </Tr>
    <Tr className="border-b border-[#B7B7B7]">
      <Td className="w-[30%] border-r border-[#B7B7B7] px-4 py-2 text-base font-normal text-gray-600">
       Country
      </Td>
      <Td className="w-[70%] px-4 py-2 font-semibold text-base text-gray-900">
      {country}
      </Td>
    </Tr>
    
    </Tbody>
    </Table>
    <div 
  className="flex items-center h-20 w-full p-4 border border-dashed border-[#C1BBBB] bg-[#F8F9FA] rounded-md cursor-pointer"
  onClick={handleFileUpload}
>
  {/* Left Column: Icon (Right-aligned) */}
  <div className="w-1/2 flex justify-end pr-3">
    <img className="w-10" src="./cloud.png" alt="File Icon" />
  </div>

  {/* Right Column: Upload Text (Left-aligned) */}
  <div className="w-1/2 flex justify-start">
    <div>
      <p className="text-[#2463CD] font-medium text-sm">Upload Attachment</p>
      <p className="text-[#87888A] text-xs">Jpg, pdf or Png (max. 50mb)</p>
    </div>
  </div>

  {/* Hidden File Input */}
  <input type="file" ref={fileInputRef} className="hidden" />
</div>




    <div className='w-full'>
    <textarea
            value={ref}
            onChange={(e) => setRef(e.target.value)}
            className="p-2 w-full rounded-lg h-20 outline-none mr-4 text-sm placeholder:text-[#87888A] placeholder:font-normal resize-none w-3/4 bg-[#EAEAEA]"
            placeholder="Payment referance"
           
          />
    <select 
  onChange={(e) => setReasonForTransfer(e.target.value)}
  className="p-2 w-full h-20 rounded-lg outline-none text-sm text-[#87888A] placeholder:text-[#87888A] placeholder:font-normal bg-[#EAEAEA] resize-none"
>
  <option key={0} className="text-[#87888A]">Transfer Reason</option>
  {
    transferReasons.map((option) => (
      <option key={option.id} value={option.reason} className="text-[#87888A]">
        {option.reason}
      </option>
    ))
  }
</select>

    </div>
    <div>
        <div className="flex space-x-4">

          {/* <select onChange={(e) => setReasonForTransfer(e.target.value)}
            className="w-1/2 p-2 border border-gray-300 rounded-lg bg-[#EAEAEA] text-[#707070] outline-0">
            <option key={0}>---Select Reason---</option>
            {
              transferReasons.map((option) => {
                return (
                  <option key={option.id} value={option.reason}>{option.reason}</option>
                );
              })
            }
          </select> */}

          {/* <input
            id="ref"
            type="text"
            value={ref}
            placeholder="Payment Reference"
            className="pl-10 p-2 rounded-xl outline text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
            onChange={(e) => setRef(e.target.value)}
          /> */}

          {/* <div className='font-bold'>
            Upload Attachment
            <input type='file' onChange={(event) => handleSingleFileChange(event)} className='font-normal' />
          </div> */}
          {/* <input type='text' className="pl-10 p-2 rounded-xl outline text-[#205FFF] placeholder:text-sm placeholder:text-slate-700" placeholder='Enter Your Notes' onChange={(text) => setNotes(text.target.value)} /> */}
        </div>

        {/* <div className="relative">
          <hr className="border-t border-dashed" />
          <div
            className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white border rounded-full"></div>
        </div> */}

        {/* <div className="flex space-x-16">
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
            <span className="text-[#205FFF] font-bold"> {getCurrencySymbol(currency)} {numberWithCommas(amount)}</span>
          </div>
        </div> */}
      </div>

        <div className="flex justify-center">
          {defaultBank === 'Clear Bank as Service' && currencyid == 231 && bank_type == 'clear_bank' ?

            buttonLoading ?
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
                Loading...
              </button>
              :
              <button onClick={initiateTransaction}
                className="bg-[#205FFF] text-white px-16 py-2 rounded-lg hover:bg-blue-600">
                Continue
              </button>
            :
            buttonLoading ?
              <button
                className="bg-[#205FFF] text-white px-16 py-2 rounded-lg hover:bg-blue-600">
                Loading
              </button>
              :
              <button onClick={initiateCCTransaction}
                className="bg-[#205FFF] text-white px-16 py-2 rounded-lg hover:bg-blue-600">
                Continue
              </button>
          }

        </div>
      </div>
    </div>
  );
}

export default PaymentConfirmation;