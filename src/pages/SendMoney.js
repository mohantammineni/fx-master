import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Constants } from '../lib/const/constants';
import { useLocation, useNavigate } from "react-router-dom";
import Beneficiary from './Beneficiaries/Beneficiary';
import getCurrencySymbol, { getCountryInfo } from '../lib/currenyUtils';
import toast from 'react-hot-toast';
import { FaPlusCircle } from 'react-icons/fa';

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
          "code": element.banks[0].sortCode, "bank_code_type": "sort_code", "type": "Sort Code", "country": element.country, "bank_account_name": "", "bank_account_id": element.banks[0].id
        })

      });
      setBeneficiaries(beneficiaryLists)
      setLoading(false)
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
        55: 'iban_number'
      };

      const beneficiaryLists = response.data.data
        .filter(element => countryCodeMapping[element.meta.bank_country])
        .map(element => ({
          id: element.id,
          display_name: element.display_name,
          bank_account_number: element.meta.bank_account_number,
          country_flag: element.country_flag,
          avatar: element.avatar,
          code: element.meta[countryCodeMapping[element.meta.bank_country]],
          bank_code_type: element.meta.bank_code_type,
          type: element.type,
          country: element.meta.beneficiary_address,
          bank_account_name: element.meta.bank_account_name,
          bank_account_id: ""
        }));

      setBeneficiaries(beneficiaryLists);
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
      }
      else {
        await getCCBene(token, workspaceId)
      }
    }
  }

  const selectedBeneficiary = async (display_name, code, bank_account_number, type, beneficiaryid, country, bank_account_id) => {
    console.log(display_name, code, bank_account_number, type, beneficiaryid, country, bank_account_id);
    setselectedbeneficiary(display_name.toUpperCase())
    setselectedbeneficiaryCode(code)
    setselectedbeneficiaryBankAccoutNumber(bank_account_number)
    setselectedbeneficiaryType(type)
    setselectedbeneficiaryId(beneficiaryid)
    setselectedbeneficiaryCountry(country)
    setselectedbeneficiaryBankAccountId(bank_account_id)
  }
  const proceedToPay = async () => {
    if (amount == 0 || amount == '' || amount == null) {
      toast.error('Please enter a valid amount')
    } else {
      navigate('/PaymentConfirmation', { state: { name: selectedbeneficiary, ifsc: selectedbeneficiaryCode, account: selectedbeneficiaryBankAccoutNumber, type: selectedbeneficiaryType, id: selectedbeneficiaryId, bank_account_name: selectedbeneficiary, currencyid: paramsdata.currencyid, currency: paramsdata.currency, amount: amount, bank_account_id: selectedbeneficiaryBankAccountId, country: selectedbeneficiaryCountry } })
    }
  }
  return (
    <div className="my-2">

      <div
        className="bg-gradient-to-r from-[#133999] to-[#133999] rounded-3xl shadow-lg p-6 flex items-center justify-between text-white">
        <div className="w-1/2 flex gap-8 items-center">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span>{paramsdata.currency!='EUR' && getCountryInfo(currency, {className: "w-10 h-10"}).flag}
              {paramsdata.currency=='EUR' && <img src={paramsdata.uri}></img>}
              </span>
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
                id="amount"
                type="number"
                min="0"
                value={amount}
                placeholder="Enter amount"
                className="pl-10 w-full p-2 outline-none rounded-2xl text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
                onChange={(e) => setAmount(Math.abs(e.target.value))}
              />
            </div>
          </div>
        </div>

        {
          selectedbeneficiary &&
          <div className="w-1/2 flex space-y-2 justify-center">
            <div className="flex-col flex space-y-2">
              <h3 className="text-lg font-semibold">Beneficiary Name</h3>
              <span className="text-base font-medium">{selectedbeneficiary}</span>
              <button
                onClick={proceedToPay}
                className="bg-[#1E58EB] text-white rounded-2xl px-4 py-2 text-lg font-semibold"
              >
                Proceed
              </button>
            </div>
          </div>
        }
      </div>
      <div className="flex items-center justify-between py-4 mb-4">
        <div className="flex items-center m-5">
        <p className="font-bold text-lg pb-2">Select Beneficiary</p>
        </div>
        <div className="flex space-x-4">
          <button onClick={()=>navigate("/BeneficiaryTypes",{state:{currency:currency,transferflowamount:amount,currencyid:currencyid,balance:balance}})}
            className="bg-[#1152BE] border border-[#1152BE] text-white px-6 py-2 rounded-lg flex items-center text-base">
            <FaPlusCircle className="font-light m-1" /> Add Beneficiary
          </button>
        </div>
      </div>
      <div className="mt-6">
        {loading ? (
          <div className="text-center">Loading beneficiaries...</div>
        ) : (
          <Beneficiary
            beneficiaryList={beneficiaries}
            sendDataToParent={selectedBeneficiary}
          />
        )}
      </div>
    </div>
  );
}

export default SendMoney;