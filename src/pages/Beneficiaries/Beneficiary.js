import React, { useEffect, useState } from 'react';
// import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
// import { HiOutlineCog6Tooth } from 'react-icons/hi2';
import PropTypes from "prop-types";
import { PrimaryButton } from '../../components/button';
import { Constants } from '../../lib/const/constants';
import { getCountryInfo } from '../../lib/currenyUtils';
import { CURRENCIES } from '../../lib/currencies';

function Beneficiary({ beneficiaryList, sendDataToParent, pay = false }) {

  Beneficiary.propTypes = {
    beneficiaryList: PropTypes.array,
    sendDataToParent: PropTypes.any,
    pay: PropTypes.bool
  };
  const [accountNumber, setAccountNumber] = useState("");
  const [sortcode, setSortcode] = useState("");

  const [accountNumber1, setAccountNumber1] = useState("");
  const [sortcode1, setSortcode1] = useState("");

  const passdata = async (display_name, code, bank_account_number, type, beneficiaryid, country, bank_account_id, country_id, bene_type,bank_type) => {
    sendDataToParent(display_name, code, bank_account_number, type, beneficiaryid, country, bank_account_id, country_id, bene_type,bank_type);
  }
  useEffect(() => {
    getData()
  })
  const getData = async () => {
    const workspace = sessionStorage.getItem('login_workspaces');
    if (workspace) {
      const defaultBank = sessionStorage.getItem('defaultBank');
      const parsedWorkspace = JSON.parse(workspace);
      if (defaultBank === 'Clear Bank as Service') {
        setAccountNumber(sessionStorage.getItem('clearBankCustomerWalletNumber'));
        setSortcode(sessionStorage.getItem('clearBankCustomerSortCode'));

      }
      if (((parsedWorkspace[0].accounts).length>0)) {
        setAccountNumber1(parsedWorkspace[0].accounts.meta.account_number);
        setSortcode1(parsedWorkspace[0].accounts.meta.routing_code);
      }
    }
    console.log(accountNumber, sortcode, accountNumber1, sortcode1);

  }
  return (
    <div className="my-2">
      <div className="relative overflow-x-auto bg-white shadow-lg rounded-3xl">
  <table className="w-full text-sm text-left text-slate-700 bg-white border-collapse">
    <thead className="bg-white border-b">
      <tr>
        <th scope="col" className="px-6 py-6">Beneficiary ID</th>
        <th scope="col" className="px-6 py-6">Name</th>
        {pay && <th scope="col" className="px-6 py-6">Currency</th>}
        <th scope="col" className="px-6 py-6">Account Number / IBAN</th>
        <th scope="col" className="px-6 py-6">Code</th>
        <th scope="col" className="px-6 py-6">Type</th>
        {pay && <th scope="col" className="px-6 py-6">Action</th>}
      </tr>
    </thead>
    <tbody className="divide-y">
      {beneficiaryList &&
        beneficiaryList.map((beneficiary) =>
          beneficiary.id ? (
            <tr
              key={beneficiary.id}
              className="cursor-pointer hover:bg-gray-100 transition border-b"
              onClick={(e) => {
                const radio = e.currentTarget.querySelector('input[type="radio"]');
                if (radio) radio.checked = true;
                passdata(
                  beneficiary.display_name,
                  beneficiary.code,
                  beneficiary.bank_account_number,
                  beneficiary.type,
                  beneficiary.id,
                  beneficiary.country,
                  beneficiary.bank_account_id,
                  beneficiary.bene_type,
                  beneficiary.bank_type
                );
              }}
            >
              <td className="px-6 py-4 font-bold whitespace-nowrap">
                <div className="flex items-center gap-2">
                  {!pay && (
                    <input
                      type="radio"
                      name="beneficiary"
                      value={beneficiary.id}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-0"
                    />
                  )}
                  {beneficiary.id}
                </div>
              </td>
              <td className="px-6 py-4 font-bold">{beneficiary.display_name}</td>
              {pay && (
                <td className="px-6 py-4">
                  {Constants.CURRENCYID[beneficiary.country_id] &&
                    CURRENCIES[Constants.CURRENCYID[beneficiary.country_id]]}
                </td>
              )}
              <td className="flex px-6 py-4 text-left font-bold items-center">
                <div className="mx-2">
                  {Constants.CURRENCYID[beneficiary.country_id] &&
                    getCountryInfo(Constants.CURRENCYID[beneficiary.country_id], { className: "w-7 h-5" }).flag}
                </div>
                <div>{beneficiary.bank_account_number}</div>
              </td>
              <td className="px-6 py-4 font-bold">{beneficiary.code}</td>
              <td className="px-6 py-4 font-bold">{beneficiary.type}</td>
              {pay && (
                <td className="px-6 py-4">
                  <PrimaryButton
                    label={'Pay'}
                    onClick={() =>
                      passdata(
                        beneficiary.display_name,
                        beneficiary.code,
                        beneficiary.bank_account_number,
                        beneficiary.type,
                        beneficiary.id,
                        beneficiary.country,
                        beneficiary.bank_account_id,
                        beneficiary.country_id,
                        beneficiary.bene_type,
                        beneficiary.bank_type
                      )
                    }
                  />
                </td>
              )}
            </tr>
          ) : null
        )}
    </tbody>
  </table>
</div>

      <nav className="flex justify-center my-4">
        {/* <ul className="inline-flex space-x-2 text-sm">
          <li>
            <a href="#"
               className="flex items-center justify-center px-3 h-8 ms-0 text-gray-500 bg-white border rounded-full hover:bg-gray-100">&laquo;</a>
          </li>
          <li>
            <a href="#"
               className="flex items-center justify-center px-3 h-8 text-gray-500 bg-white border rounded-full">1</a>
          </li>
          <li>
            <a href="#"
               className="flex items-center justify-center px-3 h-8 text-gray-500 bg-white border rounded-full">2</a>
          </li>
          <li>
            <a href="#" aria-current="page"
               className="flex items-center justify-center px-3 h-8 text-custom-sky-blue-500 border rounded-full bg-custom-neutral-900">3</a>
          </li>
          <li>
            <a href="#"
               className="flex items-center justify-center px-3 h-8 text-gray-500 bg-white border rounded-full">4</a>
          </li>
          <li>
            <a href="#"
               className="flex items-center justify-center px-3 h-8 text-gray-500 bg-white border rounded-full">5</a>
          </li>
          <li>
            <a href="#"
               className="flex items-center justify-center px-3 h-8 text-gray-500 bg-white border rounded-full">&raquo;</a>
          </li>
        </ul> */}
      </nav>
    </div>
  );

}

export default Beneficiary;