import React from 'react';
// import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
// import { HiOutlineCog6Tooth } from 'react-icons/hi2';
import PropTypes from "prop-types";

function Beneficiary({beneficiaryList,sendDataToParent}) {

  Beneficiary.propTypes = {
    beneficiaryList: PropTypes.array,
    sendDataToParent: PropTypes.any
  };

  const passdata = async(display_name,code,bank_account_number,type,beneficiaryid,country,bank_account_id) =>{
    sendDataToParent(display_name,code,bank_account_number,type,beneficiaryid,country,bank_account_id);
  }
  return (
    <div className="my-2">

      <div className="relative overflow-x-auto rounded-3xl">
        <table className="w-full text-sm text-left text-slate-700">
          <thead className="bg-white">
          <tr>
            <th scope="col" className="px-6 py-6"></th>
            <th scope="col" className="px-6 py-6">Beneficiary ID</th>
            <th scope="col" className="px-6 py-6">Name</th>
            <th scope="col" className="px-6 py-6">Account Number</th>
            <th scope="col" className="px-6 py-6">Code</th>
            <th scope="col" className="px-6 py-6">Code Type</th>
          </tr>
          </thead>
          <tbody>
          {
            beneficiaryList && beneficiaryList.map((beneficiary, index) => (
              <tr
                key={beneficiary.id}
                className={`${index % 2 === 0 ? 'bg-[#EEEDEB]' : 'bg-white'} cursor-pointer`}
                onClick={(e) => {
                  const radio = e.currentTarget.querySelector('input[type="radio"]');
                  if (radio) radio.checked = true;
                  passdata(beneficiary.display_name, beneficiary.code, beneficiary.bank_account_number, beneficiary.type, beneficiary.id, beneficiary.country, beneficiary.bank_account_id);
                }}
              >
                <td className="px-6 py-4">
                  <input
                    type="radio"
                    name="beneficiary"
                    value={beneficiary.id}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-0"
                  />
                </td>
                <td className="px-6 py-4 font-medium whitespace-nowrap">{beneficiary.id}</td>
                <td className="px-6 py-4">{beneficiary.display_name}</td>
                <td className="px-6 py-4">{beneficiary.bank_account_number}</td>
                <td className="px-6 py-4">{beneficiary.code}</td>
                <td className="px-6 py-4">{beneficiary.type}</td>
              </tr>
            ))
          }
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