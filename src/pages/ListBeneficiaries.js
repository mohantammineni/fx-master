import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Constants } from '../lib/const/constants';
import { PrimaryButton } from '../components/button';
import Beneficiary from './Beneficiaries/Beneficiary';
import { FaPlusCircle } from 'react-icons/fa';

function ListBeneficiaries() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [searchName, setsearchName] = useState('');
  var beneficiaryLists = [];

  const getData = async () => {
    const login_id = sessionStorage.getItem('login_id');
    const staff_login_id = sessionStorage.getItem('staff_login_id');
    const login_token = sessionStorage.getItem('login_token');
    if (!login_id || !login_token) {
      if (staff_login_id === '' || staff_login_id == null) {
        sessionStorage.clear();
        navigate('/business');
      }
      else {
        navigate('/DebitTransactions')
      }
    }
  };

  useEffect(() => {
    getData(0);
    setLoading(true)
    beneficiaryList()
  }, [searchName]);

  const beneficiaryList = async () => {
    setLoading(true)
    const token = sessionStorage.getItem('login_token');
    const workspaceId = sessionStorage.getItem('login_workspaces_id');
    // const defaultBank = sessionStorage.getItem('defaultBank');
    getBene(token, workspaceId)
  }

  const getBene = async (token, workspaceId) => {
    setLoading(true)
    await axios.get(`${Constants.BASE_URL}API-FX-211-LIST-ALL-BENEFICIARIES?workspace_id=${workspaceId}&name=${searchName}`, {
      headers: {
        fx_key: Constants.SUBSCRIPTION_KEY,
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then(resp => {
      var beneData = resp.data.data;

      beneData.forEach(element => {
        if (element.provider == 'clear_bank') {
          beneficiaryLists.push({
            "id": element.id, "display_name": element.beneficiaryName, "bank_account_number": element.banks[0].accountNumber, "country_flag": Constants.FXMASTER_BASE_URL + "flags/UK.png", "avatar": "",
            "code": element.banks[0].sortCode, "bank_code_type": "sort_code", "type": "Sort Code", "country": element.country, "bank_account_name": "", "bank_account_id": element.banks[0].id, "currency": "GBP", "country_id": 231
          })
        }
        else {
          // const countryCodeMapping = {
          //   105: 'ifsc_code',
          //   234: 'aba_number',
          //   231: 'sort_code',
          //   38: 'branch_code',
          //   13: 'bsb_number',
          //   2: 'iban_number',
          //   1: 'iban_number',
          //   55: 'iban_number'
          // };

          beneficiaryLists.push({
            "id": element.id, "display_name": element.display_name, "bank_account_number": element.meta.bank_account_number != null && element.meta.bank_account_number != '' ? element.meta.bank_account_number : element.meta.iban, "country_flag": "", "avatar": "",
            "code": element.meta.bic_number ?? element.meta.aba_number ?? element.meta.ifsc_code ?? element.meta.aba_number ?? element.meta.sort_code ?? element.meta.branch_code ?? element.meta.bsb_number ?? element.meta.routing_code_value_1, "bank_code_type": element.meta.bank_code_type, "type": element.type, "country": element.meta.beneficiary_address, "bank_account_name": element.meta.bank_account_name, "bank_account_id": "", "currency": "", "country_id": element.meta.bank_country
          })
        }
      })
      setBeneficiaries(beneficiaryLists)
      setLoading(false);

    }).catch(err => {
      console.log(err.response);
      setLoading(false)
    })
  }

  const selectedBeneficiary = async (display_name, code, bank_account_number, type, beneficiaryid, country, bank_account_id, country_id) => {
    console.log(display_name, code, bank_account_number, type, beneficiaryid, country, bank_account_id, country_id);
    if (country_id != '' && country_id != null) {
      console.log(display_name, code, bank_account_number, type, beneficiaryid, country, bank_account_id, country_id);
      
      navigate('/SendMoneyByBeneficiary', {
        state: {
          currencyid: country_id,
          selectedBeneficiary: display_name.toUpperCase(),
          selectedbeneficiaryCode: code,
          selectedbeneficiaryBankAccoutNumber: bank_account_number,
          selectedbeneficiaryType: type,
          selectedbeneficiaryId: beneficiaryid,
          selectedbeneficiaryCountry: country,
          selectedbeneficiaryBankAccountId: bank_account_id
        },
      })
    }
  }

  return (
    <div className="my-2">
      <div className="bg-white rounded-2xl my-4 justify-between shadow-lg items-center">
        <div className="items-center justify-between px-8 pt-6 pb-4 text-black">
          <p className="font-normal text-lg pb-2">Beneficiaries</p>
          {loading}
        </div>
        <div className="flex items-center justify-between px-8 pt-6 pb-4 text-black">
          <input type="text" pattern=".{3,}" value={searchName} title="3 characters minimum" className="w-full rounded-2xl p-2 bg-[#E0E4EB] mx-1" placeholder="Search Beneficiaries" onChange={(e) => { setsearchName(e.target.value); }}></input>
          {/* <PrimaryButton label={'Search'} style={{ width: 100 }} onClick={() => beneficiaryList()} /> */}
          <PrimaryButton label={'Clear'} style={{ width: 100 }} onClick={() => { setsearchName(''); beneficiaryList() }} />
        </div>
      </div>

      <div className="flex items-center justify-between py-4 mb-4">
        <div className="flex items-center m-5">
          <p className="font-bold text-lg pb-2">Select Beneficiary</p>
        </div>
        <div className="flex space-x-4">
          <button onClick={() => navigate("/SelectCurrencyForBeneficiary")}
            className="bg-[#1152BE] border border-[#1152BE] text-white px-6 py-2 rounded-lg flex items-center text-base">
            <FaPlusCircle className="font-light m-1" /> Add Beneficiary
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl">
        {loading ? (
          <div className="text-center">Loading beneficiaries...</div>
        ) : (
          <Beneficiary
            beneficiaryList={beneficiaries}
            sendDataToParent={selectedBeneficiary}
            pay={true}
          />
        )}
      </div>
    </div>
  );
}

export default ListBeneficiaries;
