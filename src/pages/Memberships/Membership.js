import React, { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { HiOutlineCog6Tooth } from 'react-icons/hi2';
import axios from "axios";
import { Constants } from "../../lib/const/constants";
import ReactPaginate from 'react-paginate';
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FiSearch } from 'react-icons/fi';

function Membership() {
  const navigate = useNavigate();
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    setLoading(true);
    const staff_login_id = sessionStorage.getItem('staff_login_id');
    await axios.get(Constants.BASE_URL + 'API-FX-214-LIST-MEMBERSHIP-COMPLIANCE?login_id=' + staff_login_id, {
      headers: {
        fx_key: Constants.SUBSCRIPTION_KEY
      }
    }).then(resp => {
      setMemberships(resp.data.workspaces)
      setLoading(false)
    }).catch(err => {
      console.log(err.response.data);
      setLoading(false)
    })
  }

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchText(query);
  };
  function Items({ currentItems }) {
    Items.propTypes = {
      currentItems: PropTypes.any,
    };
    async function onbehalfOf(user_id) {

      setLoading(true);
      setAsyncData();
      setAsyncData("staff_login_id", sessionStorage.getItem('staff_login_id'))
      setAsyncData("staff_login_full_name", sessionStorage.getItem('login_full_name'))
      setAsyncData("staff_login_email", sessionStorage.getItem('login_email'))
      setAsyncData("staff_login_phone", sessionStorage.getItem('login_phone'))
      setAsyncData("staff_login_date_of_birth", sessionStorage.getItem('login_date_of_birth'))
      setAsyncData("staff_login_country_code", sessionStorage.getItem('login_country_code'))
      setAsyncData("staff_login_country_id", sessionStorage.getItem('login_country_id'))
      setAsyncData("staff_login_country_name", sessionStorage.getItem('login_country_name'))
      setAsyncData("staff_login_nationality", sessionStorage.getItem('login_nationality'))
      setAsyncData("staff_login_token", sessionStorage.getItem('staff_login_token'))
      setAsyncData("staff_kyc_submitted", sessionStorage.getItem('kyc_submitted'));

      await axios.post(Constants.BASE_URL + 'API-FX-223-LOGIN-BY-USERID', {
        user_id: user_id,
      }, {
        headers: {
          'fx_key': Constants.SUBSCRIPTION_KEY,
        }
      }).then(resp => {
        // console.log(JSON.stringify(resp.data));
        loadAppDefault();
        loadcountries();


        setAsyncData("login_id", JSON.stringify(resp.data.data.id))
        setAsyncData("login_full_name", resp.data.data.full_name)
        setAsyncData("login_email", resp.data.data.email)
        setAsyncData("login_phone", resp.data.data.phone)
        setAsyncData("login_date_of_birth", resp.data.data.date_of_birth)
        setAsyncData("login_country_code", resp.data.data.country_code)
        setAsyncData("login_country_id", JSON.stringify(resp.data.data.country_id))
        setAsyncData("login_country_name", resp.data.data.country_name)
        setAsyncData("login_nationality", resp.data.data.nationality)
        setAsyncData("login_registration_step", resp.data.data.registration_step)
        setAsyncData("login_is_banking_user", JSON.stringify(resp.data.data.is_banking_user))
        setAsyncData("login_status", resp.data.data.status)
        setAsyncData("login_yoti_status", resp.data.data.yoti_status)
        setAsyncData("login_workspaces", JSON.stringify(resp.data.data.workspaces))
        setAsyncData("login_workspaces_id", JSON.stringify(resp.data.data.workspaces[0].id))
        setAsyncData("login_token", JSON.stringify(resp.data.token))
        setAsyncData("login_address", JSON.stringify(resp.data.data.addresses[0].address + resp.data.data.addresses[0].street))
        setAsyncData("login_postcode", JSON.stringify(resp.data.data.addresses[0].postcode))
        setAsyncData("login_city", JSON.stringify(resp.data.data.addresses[0].city))
        console.log(resp.data.default_bank);
        if (resp.data.default_bank.length > 0 && resp.data.default_bank[0] != 'CC as Service') {
          setAsyncData("defaultBank", resp.data.default_bank[0])
          setAsyncData("clearBankCustomerId", resp.data.clear_bank_data[0].customer_id)
          setAsyncData("clearBankCustomerBankCode", resp.data.clear_bank_data[0].meta.bank[0].BankCode)
          setAsyncData("clearBankCustomerIBAN", resp.data.clear_bank_data[0].meta.bank[0].IBAN)
          setAsyncData("clearBankCustomerWalletId", resp.data.clear_bank_data[0].meta.bank[0].WalletId)
          setAsyncData("clearBankCustomerSWIFTCode", resp.data.clear_bank_data[0].meta.bank[0].SWIFTCode)
          setAsyncData("clearBankCustomerAccountName", resp.data.clear_bank_data[0].meta.bank[0].AccountName)
          setAsyncData("clearBankCustomerWalletNumber", resp.data.clear_bank_data[0].meta.bank[0].WalletNumber)
          setAsyncData("clearBankCustomerSortCode", resp.data.clear_bank_data[0].meta.bank[0].sortCode)
          setAsyncData("clearBankCustomerServiceProviderAccountId", resp.data.clear_bank_data[0].meta.bank[0].ServiceProviderAccountId)
        }
        else {
          setAsyncData("defaultBank", "CC as Service")
          setAsyncData("clearBankCustomerId", "")
        }
        setAsyncData("kyc_submitted", "true");
        setLoading(false);
        setAsyncData("login_id", JSON.stringify(resp.data.data.id))
        console.log("rrrrr" + resp.data.data.id);
        navigate('/')


        setLoading(false);
      }).catch(err => {
        console.log(JSON.stringify(err.response.data));
        setLoading(false);
      })

    }


    const loadcountries = async () => {
      await axios.get(Constants.BASE_URL + "API-FX-102-Country", {
        headers: {
          fx_key: Constants.SUBSCRIPTION_KEY
        }
      }).then(response => {
        setAsyncData('countries', JSON.stringify(response.data.data));
      }).catch(error => {
        console.log("countr" + error.response.data);
      })
    }
    const loadAppDefault = async () => {
      await axios.get(Constants.BASE_URL + "API-FX-100-App", {
        headers: {
          fx_key: Constants.SUBSCRIPTION_KEY
        }
      }).then(response => {
        setAsyncData('transfer_reasons', JSON.stringify(response.data.data.transfer_reasons));
      }).catch(error => {
        console.log("app" + error.response);
      })
    }
    const setAsyncData = async (key, value) => {
      sessionStorage.setItem(key, value);
    }
    return (
      <>
        <table cellPadding={10} cellSpacing={10} className='w-full bg-[#ffffff] table-striped-membership text-sm' >
          {currentItems &&
            currentItems.map((item, index) => {
              return (
                <>
                  {index == 0 &&
                    <thead>
                      <tr>
                        <th scope="col" className="px-4 py-6">Membership No</th>
                        <th scope="col" className="px-4 py-2">Name</th>
                        <th scope="col" className="px-4 py-2">Email</th>
                        <th scope="col" className="px-4 py-2">Phone</th>
                        <th scope="col" className="px-4 py-2">Type</th>
                        <th scope="col" className="px-4 py-2">Account Details</th>
                        <th scope="col" className="px-4 py-2">Action</th>
                      </tr>
                    </thead>}
                  {item.user_account != 'virtual_account' &&
                    <tr key={item.memershipNo} >
                      <th scope="row" className="px-4 py-2 font-bold whitespace-nowrap">{item.memershipNo}</th>
                      <td className="px-4 py-2 font-bold">{item.name}</td>
                      <td className="px-4 py-2 font-bold">{item.email}</td>
                      <td className="px-4 py-2 font-bold">{item.phone}</td>
                      <td className="px-4 py-2 font-bold">{item.type}</td>
                      <td className="px-4 py-2 font-bold">
                        Account No: <b>{JSON.parse(item.clearbank_meta).bank[0].WalletNumber}</b><br />
                        Sort Code: <b>{JSON.parse(item.clearbank_meta).bank[0].sortCode}</b><br />
                        IBAN: <b>{JSON.parse(item.clearbank_meta).bank[0].IBAN}</b>
                      </td>
                      <td className="px-4 py-2 font-bold">
                        <Menu>
                          <MenuButton><HiOutlineCog6Tooth className="text-lg font-bold" /></MenuButton>
                          <MenuItems anchor="bottom" className="rounded mt-2  text-[#ffffff]">
                            {/* <MenuItem key="edit" className="px-6 py-1 hover:bg-none">
                            <a className="block" href="javascript:void(0);" onClick={()=>navigate('/memberships/show')}>
                              Show
                            </a>
                          </MenuItem> */}
                            <MenuItem key="create_virtual_account" className="px-6 py-3 hover:bg-none bg-[#1152BE]">
                              <a className="block" href="javascript:void(0);" onClick={() => navigate('/userDetails', { state: { account_id: item.customer_id } })}>
                                Create Virtual Account
                              </a>
                            </MenuItem>

                            <MenuItem key="list_accounts" className="px-6 py-3 hover:bg-none bg-[#1152BE]">
                              <a className="block" href="javascript:void(0);" onClick={() => navigate('/ListUsers', { state: { account_id: item.customer_id } })}>
                                List Accounts
                              </a>
                            </MenuItem>

                            <MenuItem key="fees" className="px-6 py-3 hover:bg-none bg-[#1152BE]">
                              <a className="block" href="javascript:void(0);" onClick={() => navigate('/SetFees', { state: { admin_id: item.admin_id } })}>
                                Fees
                              </a>
                            </MenuItem>

                            <MenuItem key="on_behalf_of" className="px-6 py-3 hover:bg-none bg-[#1152BE]">
                              <a className="block" href="javascript:void(0);" onClick={() => onbehalfOf(item.admin_id)}>
                                On Behalf Of
                              </a>
                            </MenuItem>
                          </MenuItems>
                        </Menu>
                      </td>
                    </tr>
                  }
                </>
              )
            })
          }
        </table>
      </>
    );
  }

  function PaginatedItems({ itemsPerPage }) {
    PaginatedItems.propTypes = {
      itemsPerPage: PropTypes.any,
    };
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = memberships.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(memberships.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % memberships.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };
    return (
      <>
        <Items currentItems={currentItems} />
        <ReactPaginate
          breakLabel="..."
          nextLabel={<div className="w-8 h-8 border border-[#205FFF] rounded-full flex items-center justify-center text-[#205FFF]">{'>'}</div>}
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel={<div className="w-8 h-8 border border-[#205FFF] rounded-full flex items-center justify-center text-[#205FFF]">{'<'}</div>}
          renderOnZeroPageCount={null}
          className="flex justify-center my-5 space-x-3"
          pageLinkClassName="flex items-center justify-center w-8 h-8 border border-[#205FFF] rounded-full text-[#205FFF]"
          activeLinkClassName="!text-white"
          activeClassName="bg-[#205FFF] rounded-full"
        />
      </>
    );
  }

  return (
    <div className="my-2">
      <div className="flex items-center justify-between py-4 mb-4">
        <div className="flex items-center ml-1">
          <span className="font-bold text-lg pl-3">Memberships</span>
        </div>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={handleSearch}
              className="pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white placeholder:text-[#303644]"
            />
            <FiSearch className="absolute top-2.5 right-4 text-[#303644]" />
          </div>
        </div>
      </div>
      <div className="relative overflow-x-auto bg-[#ffffff] rounded-3xl">
        {loading ?
          <tr aria-colspan={6}>
            <th scope="col" className="px-6 py-6">loading...</th>
          </tr>
          :
          <PaginatedItems itemsPerPage={10} />
        }
      </div>
      {/* <nav className="flex justify-center my-4">
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
      </nav> */}
    </div>
  )
}

export default Membership