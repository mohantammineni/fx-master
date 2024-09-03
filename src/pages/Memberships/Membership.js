import React from "react";
import HeadingBarWithSearch from '../../components/HeadingBarWithSearch';
import { BENEFICIARIES } from '../../faker/beneficiaries';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { HiOutlineCog6Tooth } from 'react-icons/hi2';

function Membership () {
  return (
    <div className="my-2">
      <HeadingBarWithSearch title="Memberships" />

      <div className="relative overflow-x-auto bg-custom-neutral-900 rounded-3xl">
        <table className="w-full text-sm text-left text-custom-ivory-500">
          <thead className="border-b-2 border-custom-sky-blue-500">
          <tr>
            <th scope="col" className="px-6 py-6">Beneficiary ID</th>
            <th scope="col" className="px-6 py-6">Name</th>
            <th scope="col" className="px-6 py-6">Account Number</th>
            <th scope="col" className="px-6 py-6">IFSC Code</th>
            <th scope="col" className="px-6 py-6">UPI ID</th>
            <th scope="col" className="px-6 py-6">Type</th>
            <th scope="col" className="px-6 py-6">Action</th>
          </tr>
          </thead>
          <tbody>
          {
            BENEFICIARIES.map((beneficiary) => (
              <tr key={beneficiary.beneficiary_id} className="border-b-2 border-custom-sky-blue-500">
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">{beneficiary.beneficiary_id}</th>
                <td className="px-6 py-6">{beneficiary.name}</td>
                <td className="px-6 py-6">{beneficiary.account_number}</td>
                <td className="px-6 py-6">{beneficiary.ifsc_code}</td>
                <td className="px-6 py-6">{beneficiary.upi_id}</td>
                <td className="px-6 py-6">{beneficiary.type}</td>
                <td className="px-6 py-6">
                  <Menu>
                    <MenuButton><HiOutlineCog6Tooth className="text-lg" /></MenuButton>
                    <MenuItems anchor="bottom" className="rounded mt-2 bg-custom-blue-400 text-custom-ivory-500">
                      <MenuItem key="edit" className="px-6 py-1 hover:bg-none">
                        <a className="block" href="/memberships/show">
                          Show
                        </a>
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                </td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
      <nav className="flex justify-center my-4">
        <ul className="inline-flex space-x-2 text-sm">
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
        </ul>
      </nav>
    </div>
  )
}

export default Membership