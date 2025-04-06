import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Constants } from '../lib/const/constants';
import { useLocation, useNavigate } from "react-router-dom";
import Beneficiary from './Beneficiaries/Beneficiary';
import  getCurrencySymbol, { getCountryInfo } from '../lib/currenyUtils';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiSearch } from 'react-icons/fi';


function SendMoney() {
  const navigate = useNavigate();
  const location = useLocation();
  const paramsdata = location.state;
  var currency = paramsdata.currency;
  var transferflowamount = paramsdata.transferflowamount;
  var currencyid = paramsdata.currencyid;
  var balance = paramsdata.balance;

  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [selectedbeneficiary, setselectedbeneficiary] = useState('');
  const [selectedbeneficiaryCode, setselectedbeneficiaryCode] = useState('');
  const [selectedbeneficiaryBankAccoutNumber, setselectedbeneficiaryBankAccoutNumber] = useState('');
  const [selectedbeneficiaryType, setselectedbeneficiaryType] = useState('');
  const [selectedbeneficiaryId, setselectedbeneficiaryId] = useState('');
  const [selectedbeneficiaryCountry, setselectedbeneficiaryCountry] = useState('');
  const [selectedbeneficiaryBankAccountId, setselectedbeneficiaryBankAccountId] = useState('');
  const [selectedbeneficiaryBeneType, setselectedbeneficiaryBeneType] = useState('');
  const [selectedbeneficiaryBankType, setselectedbeneficiaryBankType] = useState('');
  const beneficiaryLists = [];

  useEffect(() => {
    getData()
    removeData()
    beneficiaryList()
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

  const getClearbankBene = async (token, workspaceId) => {
    await axios.post(Constants.BASE_URL + "API-FX-191-CLEAR-BANK-LIST-BENEFICIARY", {
      "workspace_id": workspaceId
    }, {
      headers: {
        fx_key: Constants.SUBSCRIPTION_KEY,
        Authorization: "Bearer " + JSON.parse(token)
      }
    }).then(resp => {
      resp.data.data.forEach(element => {

        beneficiaryLists.push({
          "id": element.id, "display_name": element.beneficiaryName, "bank_account_number": element.banks[0].accountNumber, "country_flag": Constants.FXMASTER_BASE_URL + "flags/UK.png", "avatar": "",
          "code": element.banks[0].sortCode, "bank_code_type": "sort_code", "type": "Sort Code", "country": element.country, "bank_account_name": "", "bank_account_id": element.banks[0].id, "bene_type": element.type, "bank_type": "clear_bank"
        })

      });

      axios.get(`${Constants.BASE_URL}API-FX-126-ListBeneficiary`, {
        params: {
          workspace_id: workspaceId,
          reference_type: 'money_transfer',
          country_id: currencyid
        },
        headers: {
          fx_key: Constants.SUBSCRIPTION_KEY,
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      }).then(response => {
        console.log(response.data.data);

        response.data.data.forEach(element => {

          beneficiaryLists.push({
            "id": element.id, "display_name": element.display_name, "bank_account_number": element.meta.bank_account_number != null && element.meta.bank_account_number != '' ? element.meta.bank_account_number : element.meta.iban, "country_flag": Constants.FXMASTER_BASE_URL + "flags/UK.png", "avatar": "",
            "code": element.meta.bic_number ?? element.meta.aba_number ?? element.meta.ifsc_code ?? element.meta.aba_number ?? element.meta.sort_code ?? element.meta.branch_code ?? element.meta.bsb_number ?? element.meta.routing_code_value_1, "bank_code_type": "sort_code", "type": "Sort Code", "country": element.meta.bank_country, "bank_account_name": "", "bank_account_id": element.id, "bene_type": element.type, "bank_type": "currency_cloud"
          })

        });
        setLoading(false)
      }).catch(error => {
        console.log(error.response);
        setLoading(false)
      })
      console.log(JSON.stringify(beneficiaryLists));

      setBeneficiaries(beneficiaryLists)
    }).catch(err => {
      console.log(err);
      setLoading(false)
    })
  }

  const getCCBene = async (token, workspaceId) => {
    try {
      const response = await axios.get(`${Constants.BASE_URL}API-FX-126-ListBeneficiary`, {
        params: {
          workspace_id: workspaceId,
          reference_type: 'money_transfer',
          country_id: currencyid
        },
        headers: {
          fx_key: Constants.SUBSCRIPTION_KEY,
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      });

      const countryCodeMapping = {
        105: 'ifsc_code',
        234: 'aba_number',
        231: 'sort_code',
        38: 'branch_code',
        13: 'bsb_number',
        2: 'iban_number',
        1: 'iban_number',
        55: 'iban_number',
        114: 'iban_number',
        115: 'iban_number',
        129: 'iban_number',
        158: 'iban_number',
        177: 'iban_number',
        198: 'iban_number',
        59: 'iban_number',
        95: 'iban_number',
        100: 'iban_number',
        193: 'iban_number',
        249: 'iban_number'
      };

      const beneficiaryLists = response.data.data
        .filter(element => countryCodeMapping[element.meta.bank_country])
        .map(element => ({
          id: element.id,
          display_name: element.display_name,
          bank_account_number: element.meta.bank_account_number != null && element.meta.bank_account_number != '' ? element.meta.bank_account_number : element.meta.iban,
          country_flag: element.country_flag,
          avatar: element.avatar,
          code: element.meta.bic_number ?? element.meta.aba_number ?? element.meta.ifsc_code ?? element.meta.aba_number ?? element.meta.sort_code ?? element.meta.branch_code ?? element.meta.bsb_number ?? element.meta.routing_code_value_1,
          bank_code_type: element.meta.bank_code_type,
          type: element.type,
          country: element.meta.beneficiary_address,
          bank_account_name: element.meta.bank_account_name,
          bank_account_id: "",
          bene_type: element.type,
          bank_type: "currency_cloud"
        }));

      setBeneficiaries(beneficiaries => [...beneficiaries, beneficiaryLists]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };


  const beneficiaryList = async () => {
    setLoading(true)
    const token = sessionStorage.getItem('login_token');
    const workspaceId = sessionStorage.getItem('login_workspaces_id');
    const defaultBank = sessionStorage.getItem('defaultBank');
    if (defaultBank !== 'Clear Bank as Service') {
      await getCCBene(token, workspaceId)
    }
    else {
      if (currencyid == 231) {
        await getClearbankBene(token, workspaceId)
        await getCCBene(token, workspaceId)
      }
      else {
        await getCCBene(token, workspaceId)
      }
    }
  }

  const selectedBeneficiary = async (display_name, code, bank_account_number, type, beneficiaryid, country, bank_account_id, bene_type, bank_type) => {
    console.log(display_name, code, bank_account_number, type, beneficiaryid, country, bank_account_id);
    setselectedbeneficiary(display_name.toUpperCase())
    setselectedbeneficiaryCode(code)
    setselectedbeneficiaryBankAccoutNumber(bank_account_number)
    setselectedbeneficiaryType(type)
    setselectedbeneficiaryId(beneficiaryid)
    setselectedbeneficiaryCountry(country)
    setselectedbeneficiaryBankAccountId(bank_account_id)
    setselectedbeneficiaryBeneType(bene_type)
    setselectedbeneficiaryBankType(bank_type)
  }
  const proceedToPay = async () => {
    if (amount == 0 || amount == '' || amount == null) {
      toast.error('Please enter a valid amount')
    } else {
      balance = balance.split(',');
      balance = balance.join('');
      balance = parseFloat(balance).toFixed(2);
      console.log(balance);

      if (balance >= amount) {
        navigate('/PaymentConfirmation', { state: { name: selectedbeneficiary, ifsc: selectedbeneficiaryCode, account: selectedbeneficiaryBankAccoutNumber, type: selectedbeneficiaryType, id: selectedbeneficiaryId, bank_account_name: selectedbeneficiary, currencyid: paramsdata.currencyid, currency: paramsdata.currency, amount: amount, bank_account_id: selectedbeneficiaryBankAccountId, country: selectedbeneficiaryCountry, bene_type: selectedbeneficiaryBeneType, bank_type: selectedbeneficiaryBankType } })
      }
      else {
        toast.error('Insufficient Funds.')
      }
    }
  }
  // function numberWithCommas(x) {
  //   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // }

 
  return (
    <div className="my-2">
      <ToastContainer />
      <div className="rounded-3xl p-6 bg-white w-full" style={{boxShadow :'0px 0px 4px 0px rgba(0, 0, 0, 0.25)'}}>
  
  {/* First Row - Currency & Beneficiary Name */}
  <div className="flex justify-between items-center">
    
    {/* Left - Currency Selection */}
<div className="flex items-center gap-2">
  {React.isValidElement(getCountryInfo(currency).flag) ? (
    getCountryInfo(currency).flag 
  ) : (
    <img 
      src={getCountryInfo(currency).flag}  
      alt="flag"
      className="w-6 h-6 rounded-full"
      onError={(e) => (e.target.src = "/flags/default.png")}
    />
  )}
  <span className="text-lg font-semibold">{currency} ({getCurrencySymbol(currency)} {balance})</span>
</div>


    {/* Right - Beneficiary Name */}
    <div className="flex items-center">
    {selectedbeneficiary ? (<>
      <h3 className="text-sm text-gray-600">Beneficiary Name:</h3>
      <span className="text-sm font-bold ml-2">{selectedbeneficiary || "None"}</span></>):<></>}
    </div>
  </div>

  {/* Second Row - Input and Button (Inside same container) */}
  <div className="flex items-center gap-4 mt-4">
    
    {/* Input Field */}
    <div className="relative flex items-center w-3/5">
      {/* Currency Name Instead of Symbol */}
      <span className="absolute left-3 text-lg font-semibold text-[#205FFF]">
        {currency} 
      </span>
      

<input
  id="amount"
  type="number"
  min="0"
  value={amount}
  placeholder="Enter Amount"
  style={{ paddingLeft: `${currency?.length * 10 + 25}px` }}
  className="w-full p-2 outline-none border border-[#DEDCE1] rounded-md text-[#205FFF] 
             placeholder:text-sm placeholder:text-[#ADB0B7] focus:ring-0 focus:border-[#DEDCE1] 
             active:border-[#DEDCE1] hover:border-[#DEDCE1]"
  onChange={(e) => {
    const validated = (e.target.value).match(/^(\d*\.{0,1}\d{0,2}$)/);
    if (validated) {
      setAmount(Math.abs(validated[0]));
    }
  }}
/>

  
    </div>

    {/* Proceed Button (Aligned with Beneficiary Name) */}
    <button
      onClick={proceedToPay}
      disabled={!selectedbeneficiary}
      className={`w-2/5 px-4 py-2 text-white font-semibold rounded-md transition-all ${
        selectedbeneficiary ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
      }`}
    >
      Proceed
    </button>
  </div>

</div>




<div className="flex items-center justify-between py-4 mb-4">
  {/* Beneficiary Heading - Left Aligned */}
  <div className="flex items-center">
    <p className="font-bold text-lg pb-2">Select Beneficiary</p>
  </div>

  <div className="flex items-center gap-4">
    <div className="relative w-64">  
      <input
        type="text"
        placeholder="Search Beneficiary"
        className="w-full pl-4 pr-10 py-2 text-sm rounded-md shadow-sm 
                   bg-[#EAE8E8] focus:outline-none focus:ring-2 
                   focus:ring-blue-500 focus:border-transparent bg-white 
                   placeholder:text-[#303644]"
      />
      <FiSearch className="absolute top-2.5 right-4 text-[#303644]" /> 
    </div>

   <button 
      onClick={() => navigate("/BeneficiaryTypes", { state: { currency, transferflowamount: amount, currencyid, balance } })}
      className="bg-white border border-[#1152BE] text-[#1152BE] font-semibold 
                 px-6 py-2 rounded-lg flex items-center text-base">
      + Add Beneficiary
    </button>
  </div>
</div>


      <div>
        {loading ? (
          <div className="text-center">Loading beneficiaries...</div>
        ) : (
          <Beneficiary
            beneficiaryList={currencyid == 231 ? beneficiaries : beneficiaries[0]}
            sendDataToParent={selectedBeneficiary}
          />
        )}
      </div>
    </div>
  );
}

export default SendMoney;