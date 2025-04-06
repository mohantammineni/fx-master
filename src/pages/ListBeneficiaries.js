import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Constants } from '../lib/const/constants';
import Beneficiary from './Beneficiaries/Beneficiary';


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
      if (!staff_login_id) {
        sessionStorage.clear();
        navigate('/business');
      } else {
        navigate('/DebitTransactions');
      }
    }
  };

  useEffect(() => {
    getData();
    setLoading(true);
    beneficiaryList();
  }, [searchName]);

  const beneficiaryList = async () => {
    setLoading(true);
    const token = sessionStorage.getItem('login_token');
    const workspaceId = sessionStorage.getItem('login_workspaces_id');
    getBene(token, workspaceId);
  };

  const getBene = async (token, workspaceId) => {
    setLoading(true);
    await axios.get(`${Constants.BASE_URL}API-FX-211-LIST-ALL-BENEFICIARIES?workspace_id=${workspaceId}&name=${searchName}`, {
      headers: {
        fx_key: Constants.SUBSCRIPTION_KEY,
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then(resp => {
      var beneData = resp.data.data;
      beneData.forEach(element => {
        if (element.provider === 'clear_bank') {
          beneficiaryLists.push({
            id: element.id,
            display_name: element.beneficiaryName,
            bank_account_number: element.banks[0].accountNumber,
            country_flag: Constants.FXMASTER_BASE_URL + "flags/UK.png",
            avatar: "",
            code: element.banks[0].sortCode,
            bank_code_type: "sort_code",
            type: "Sort Code",
            country: element.country,
            bank_account_name: "",
            bank_account_id: element.banks[0].id,
            currency: "GBP",
            country_id: 231
          });
        } else {
          beneficiaryLists.push({
            id: element.id,
            display_name: element.display_name,
            bank_account_number: element.meta.bank_account_number || element.meta.iban,
            country_flag: "",
            avatar: "",
            code: element.meta.bic_number ?? element.meta.aba_number ?? element.meta.ifsc_code ?? element.meta.sort_code ?? element.meta.branch_code ?? element.meta.bsb_number ?? element.meta.routing_code_value_1,
            bank_code_type: element.meta.bank_code_type,
            type: element.type,
            country: element.meta.beneficiary_address,
            bank_account_name: element.meta.bank_account_name,
            bank_account_id: "",
            currency: "",
            country_id: element.meta.bank_country
          });
        }
      });
      setBeneficiaries(beneficiaryLists);
      setLoading(false);
    }).catch(err => {
      console.log(err.response);
      setLoading(false);
    });
  };

  const selectedBeneficiary = (display_name, code, bank_account_number, type, beneficiaryid, country, bank_account_id, country_id) => {
    if (country_id) {
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
      });
    }
  };

  return (
    <div className="my-2">
     
      <div className="flex items-center justify-between py-4 px-8">
  {/* Heading */}
  <h2 className="text-xl font-bold text-black flex-shrink-0">Beneficiaries</h2>

  {/* Search & Add Beneficiary in the Same Row */}
  <div className="flex items-center space-x-4 w-full justify-end">
    {/* Search Bar with Icon */}
    <div className="relative w-64"> {/* Reduced width from max-w-sm to w-64 */}
      <input
        type="text"
        pattern=".{3,}"
        value={searchName}
        title="3 characters minimum"
        className="w-full rounded-md p-2 pr-10 border border-[#454951] text-black placeholder-[#303644] focus:outline-none"
        placeholder="Search beneficiaries"
        onChange={(e) => setsearchName(e.target.value)}
      />
      <img
        src="/search-benificiary.png"
        alt="Search Icon"
        className="absolute right-3 top-2.5 w-5 h-5"
      />
    </div>

    {/* Add Beneficiary Button */}
    <button
      onClick={() => navigate("/SelectCurrencyForBeneficiary")}
      className="border border-[#205FFF] font-bold text-[#205FFF] px-6 py-2 rounded-lg text-base whitespace-nowrap"
    >
      + Add Beneficiary
    </button>
  </div>
</div>


     
      <div className="bg-white rounded-3xl mt-4">
        {loading ? (
          <div className="text-center py-6">Loading beneficiaries...</div>
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
