import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Constants } from '../../lib/const/constants';
import { PrimaryButton } from '../../components/button';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import AddFundsDialog from './Components/AddFundsDialog';

function ListUsers() {
    const navigate = useNavigate();
    const location = useLocation();
    const paramsdata = location.state;
    const account_id = paramsdata.account_id;
    const [loading, setLoading] = useState(false);
    const [memberships, setmemberships] = useState([]);
    const [subaccounts, setSubaccounts] = useState([]);
    const [accountNumbers, setAccountNumbers] = useState([]);
    const [url, setUrl] = useState();
    const [showTab, setShowTab] = useState();
    const [kycLoading, setkycLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [membershipId, setMembershipId] = useState();
    const [workspaceName, setWorkspaceName] = useState();

    const openDialog = (membershipId, workspaceName) => {
        setMembershipId(membershipId);
        setWorkspaceName(workspaceName);
        setIsOpen(true);
    };

    const getData = async () => {
        setLoading(true)
        var url;
        if (Constants.ENVIRONMENT == 'uat')
            url = Constants.BASE_URL + "API-FX-216-GET-VIRTUAL-ACCOUNT?account_id=019ac802-fe8d-43ea-9690-3b1d02887dd5";
        else
            url = Constants.BASE_URL + "API-FX-216-GET-VIRTUAL-ACCOUNT?account_id=" + account_id;
        await axios.get(url, {
            headers: {
                fx_key: Constants.SUBSCRIPTION_KEY
            }
        }).then(response => {
            setAccountNumbers(response.data.data.original.accountNumber);
            setmemberships(response.data.data.original.workspace)
            setSubaccounts(response.data.data.original.subaccounts)
            setLoading(false)
        }).catch(error => {
            console.log("workspaces" + error.response);
            setLoading(false)
        })

    }
    const generateKyc = async (mobile, index) => {
        if (mobile == null || mobile == "") {
            toast.error("Please enter mobile number.");
        }
        else {
            setkycLoading(true)
            setUrl();
            await axios.post(Constants.BASE_URL + 'API-FX-187-SUMSUB-URL', {
                "user_id": mobile
            }, {
                headers: {
                    fx_key: Constants.SUBSCRIPTION_KEY
                }
            }).then(resp => {
                setUrl(resp.data.url)
                setShowTab(index);
                setkycLoading(false)
            }).catch(err => {
                toast.error(err.response.data);
                setkycLoading(false)
            })
        }
    }
    const copyToClipBoard = async () => {
        navigator.clipboard.writeText(url)
        toast.success("Copied")
    }
    useEffect(() => {
        getData()
    }, [])


    async function onbehalfOf(user_id) {
        user_id
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
          setAsyncData("login_currency_code_iso", resp.data.data.addresses[0].country.currency)
        //   console.log(resp.data.clear_bank_data);
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
          console.log(JSON.stringify(err));
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
        <div className="my-2">
            <ToastContainer />
            <div className="flex items-center mb-6">
    
    {/* Chevron Icon */}
    <button
      onClick={() => navigate('/memberships')}
      className="text-blue-500 hover:text-blue-600 focus:outline-none mr-4"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
    </button>
    <div className="text-left font-bold text-lg">List Accounts</div>
    </div>
            <div className='w-full'>
                {!loading ?
                    <table cellPadding={10} cellSpacing={10} className='w-full rounded-3xl bg-[#ffffff]' style={{boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.25)"}}>
                        {Object.values(memberships).map((workspace, index) => {
                            return (
                                <>
                                    {index == 0 &&
                                        <thead className="border-b-2 border-[#F0F0F0]">
                                            <tr>
                                                <th scope="col" className="px-6 py-6">Id</th>
                                                <th scope="col" className="px-6 py-6">Name</th>
                                                <th scope="col" className="px-6 py-6">Email</th>
                                                <th scope="col" className="px-6 py-6">Phone</th>
                                                <th scope="col" className="px-6 py-6">Type</th>
                                                <th scope="col" className="px-6 py-6">Balance</th>
                                                <th scope="col" className="px-6 py-6">Account Details</th>
                                                <th scope="col" className="px-6 py-6">Actions</th>
                                            </tr>
                                        </thead>}
                                    {workspace.length > 0 &&
                                        <>
                                            <tr key={Object.keys(memberships)[index]} className="border-b-2 border-[#F0F0F0]">
                                                <th scope="row" className="px-6 py-4 whitespace-nowrap font-bold">{workspace[0].id}</th>
                                                <td className="px-6 py-6 font-bold">{workspace[0].name}</td>
                                                <td className="px-6 py-6 font-bold">{workspace[0].email}</td>
                                                <td className="px-6 py-6 font-bold">{workspace[0].phone}</td>
                                                <td className="px-6 py-6 font-bold">{workspace[0].type}</td>
                                                <td className="px-6 py-6 font-bold">{(Object.values(subaccounts)[index])}</td>
                                                <td className="px-6 py-6 font-bold">
                                                    <b>IBAN</b>: {(Object.values(accountNumbers)[index])}<br />
                                                    <b>Account No</b>: {(Object.values(accountNumbers)[index]).slice(-8)}<br />
                                                    <b>Sort Code</b>: {((Object.values(accountNumbers)[index]).slice(0, -8)).slice(-6)}
                                                </td>
                                                <td className="flex px-6 py-6 font-bold">
                                                    <div className='mx-2'>
<button className="view-details-btn font-semibold rounded-full text-white px-4 py-2 whitespace-nowrap"
                                                            onClick={() => generateKyc(workspace[0].phone, index)}
                                                            loading={kycLoading}
                                                        >Generate KYC</button>
                                                        {url && showTab == index &&
                                                            <div className='my-3 flex' id={'url' + index}>


                                                                <>
                                                                    <input
                                                                        type='text'
                                                                        disabled={true}
                                                                        required={true}
                                                                        placeholder={'KYC URL'}
                                                                        value={url}
                                                                        className="pl-8 bg-[#f0f0f0] w-1/2 p-2 outline-none rounded-2xl text-[#205FFF] placeholder:text-sm placeholder:text-slate-700"
                                                                    />

                                                                    <PrimaryButton
                                                                        label={'Copy'}
                                                                        style={{ width: "30%" }}
                                                                        onClick={copyToClipBoard}
                                                                    />
                                                                </>

                                                            </div>
                                                        }
                                                    </div>
                                                    <div className='mx-2'>
                                                    <button className="view-details-btn font-semibold rounded-full text-white px-4 py-2 whitespace-nowrap" onClick={() => openDialog(Object.keys(memberships)[index], workspace[0].name)}
                                                           >
                                                            Add Funds
                                                        </button>

                                                        <AddFundsDialog
                                                            isOpen={isOpen}
                                                            onClose={() => setIsOpen(false)}
                                                            selectedWorkspace={workspaceName}
                                                            type={workspace[0].type}
                                                            creditor={membershipId}
                                                            debitor={Constants.ENVIRONMENT == 'uat' ? "019ac802-fe8d-43ea-9690-3b1d02887dd5" : account_id}
                                                        />
                                                    </div>
                                                    <div className='mx-2'>
                                                       <button className="view-details-btn font-semibold rounded-full text-white px-4 py-2 whitespace-nowrap"
                                                            onClick={() => navigate('/SetFees', { state: { admin_id: workspace[0].admin_id, account_id : Constants.ENVIRONMENT == 'uat' ? "019ac802-fe8d-43ea-9690-3b1d02887dd5" : account_id } }) }
                                                        >Add Fees</button>
                                                    </div>

                                                    <div className='mx-2'>
                                                        <button className="view-details-btn font-semibold rounded-full text-white px-4 py-2 whitespace-nowrap"
                                                            onClick={() => onbehalfOf(workspace[0].admin_id) }
                                                        >On Behalf Of</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </>
                                    }
                                </>
                            )
                        })
                        }
                    </table>
                    :
                    <div className='text-bold'>loading...</div>
                }

            </div>
        </div>
    );
}

export default ListUsers;