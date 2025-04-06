<<<<<<< HEAD
import React, { useEffect, useRef, useState } from "react";
=======
import React, { useEffect, useState } from "react";
>>>>>>> UIChanges
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { HiOutlineCog6Tooth } from 'react-icons/hi2';
import axios from "axios";
import { Constants } from "../../lib/const/constants";
import ReactPaginate from 'react-paginate';
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FiSearch } from 'react-icons/fi';
<<<<<<< HEAD
import { ToastContainer, toast } from "react-toastify";
import { MdClose } from "react-icons/md";
import { Table, Tbody, Th, Tr } from "react-super-responsive-table";
=======
>>>>>>> UIChanges

function Membership() {
  const navigate = useNavigate();
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
<<<<<<< HEAD
  const [kycLoading, setkycLoading] = useState(false);
  const [loadingid, setloadingid] = useState(0);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [userAttachment, setuserAttachment] = useState([]);
  const userFileInputRef = useRef(null);
  const [edituserAttachment, setedituserAttachment] = useState([]);
  const [userId, setuserId] = useState();
  const [membershipNo, setmembershipNo] = useState();
  const [membershipDocuments, setmembershipDocuments] = useState([]);
  const [docLoading, setDocLoading] = useState(false);
=======
>>>>>>> UIChanges
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
<<<<<<< HEAD
                        <th scope="col" className="px-4 py-2">Rekyc</th>
                        <th scope="col" className="px-4 py-2">Action</th>
                      </tr>
                    </thead>}
                  {
                    item.user_account != 'virtual_account' && kycLoading && loadingid == item.admin_id ?
                      <tr key={item.admin_id}>
                        <td>loading...</td>
                      </tr>
                      :
                      <tr key={item.admin_id} >
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
                        <td className="px-4 py-2 font-bold">{item.is_re_kyc==1 ? "Initiated" : ""}</td>
                        <td className="px-4 py-2 font-bold">
                          <Menu>
                            <MenuButton><HiOutlineCog6Tooth className="text-lg font-bold" /></MenuButton>
                            <MenuItems anchor="bottom" className="rounded mt-2  text-[#ffffff]">
                              {/* <MenuItem key="edit" className="px-6 py-1 hover:bg-none">
=======
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
>>>>>>> UIChanges
                            <a className="block" href="javascript:void(0);" onClick={()=>navigate('/memberships/show')}>
                              Show
                            </a>
                          </MenuItem> */}
<<<<<<< HEAD
                             {/* <MenuItem key="create_virtual_account" className="px-6 py-3 hover:bg-none bg-[#1152BE]">
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
                              </MenuItem> */}

                              <MenuItem key="on_behalf_of" className="px-6 py-3 hover:bg-none bg-[#1152BE]">
                                <a className="block" href="javascript:void(0);" onClick={() => onbehalfOf(item.admin_id)}>
                                  On Behalf Of
                                </a>
                              </MenuItem>

                              <MenuItem key="on_behalf_of" className="px-6 py-3 hover:bg-none bg-[#1152BE]">
                                <a className="block" href="javascript:void(0);" onClick={() => rekyc(item.admin_id, item.sumsub_external_id)}>
                                  Re-KYC
                                </a>
                              </MenuItem>
                              <MenuItem key="on_behalf_of" className="px-6 py-3 hover:bg-none bg-[#1152BE]">
                                <a className="block" href="javascript:void(0);" onClick={() => handleShow(item.admin_id, item.memershipNo)}>
                                  Upload Documents
                                </a>
                              </MenuItem>
                            </MenuItems>
                          </Menu>
                        </td>
                      </tr>
=======
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
>>>>>>> UIChanges
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

<<<<<<< HEAD
  const rekyc = async (user_id, user_mobile) => {
    if (confirm('Please confirm to reinitiate the kyc.')) {
      setkycLoading(true)
      setloadingid(user_id)

      await axios.post(Constants.BASE_URL+"API-FX-228-RE-KYC", {
        "kyc_type": "selfie",
        "user_mobile": user_mobile
      }, {
        headers: {
          fx_key: Constants.SUBSCRIPTION_KEY,
        }
      }).then(resp => {
        resp
        updatestatusinuser(user_id)
      }).catch(err => {
        console.log(err.response);
        if (err.response.status == 400)
          toast.error("User not found")
        else
          if (err.response.status == 409)
            toast.error("Previous KYC is still pending")
        setkycLoading(false)
      })
    }
  }
  const updatestatusinuser = async (user_id) => {
    const login_token = sessionStorage.getItem('staff_login_token');
    await axios.post(Constants.BASE_URL + 'API-FX-226-REKYC', {
      "user_id": user_id,
      "is_re_kyc": 1
    }, {
      headers: {
        Authorization: 'Bearer ' + JSON.parse(login_token),
        fx_key: Constants.SUBSCRIPTION_KEY
      }
    }).then(resp => {
      toast.success(resp.data.status)
      setkycLoading(false)
    }).catch(err => {
      console.log(err.response.data);
      setkycLoading(false)
    })
  }
  const handleClose = () => {
    setShow(false);
    // setLoading(false);
    setEdit(false);
  };
  const handleShow = (user_id, memershipNo) => {
    setShow(true);
    setuserId(user_id);
    setmembershipNo(memershipNo)
  };
  const handleUserFileChange = async (event) => {
    const files = event.target.files;
    const updatedFiles = []; // Temporary structure to update the UI immediately

    // Loop through files to prepare initial data
    for (let i = 0; i < files.length; i++) {
      updatedFiles.push({
        file: null, // Placeholder until conversion is done
        name: files[i].name, // Original file name
      });
    }

    setuserAttachment(updatedFiles); // Temporarily set the state for immediate UI update

    const filePromises = [];
    for (let i = 0; i < files.length; i++) {
      filePromises.push(convertFileToBase64(files[i]));
    }

    // Convert files to Base64 and update the state
    try {
      const base64Files = await Promise.all(filePromises);
      const completedFiles = base64Files.map((file, index) => ({
        file: file.file, // Base64 string
        name: updatedFiles[index].name, // Original file name
        preview: URL.createObjectURL(files[index]), // Preview URL for immediate display
      }));
      setedituserAttachment(completedFiles);
    } catch (error) {
      console.error('Error converting files to Base64:', error);
    }
  };
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      var extension = (file.name).split('.');
      reader.onload = () => resolve({ 'file': reader.result, 'extension': extension[extension.length - 1] });
      reader.onerror = (error) => reject(error);
    });
  };
  const saveData = async () => {
    setDocLoading(true)
    await axios.post(Constants.BASE_URL + 'API-FX-227-UPLOAD-MEMBERSHIP-DOCUMENTS', {
      user_attachments: edituserAttachment,
      user_id: userId,
      membership_no: membershipNo
    }, {
      headers: {
        fx_key: Constants.SUBSCRIPTION_KEY,
      },
    }).then(resp => {
      console.log(resp.data);
      getDocuments();
      setDocLoading(false)
      setEdit(false)
      setuserAttachment([])
    }).catch(err => {
      console.log(err.response.data);
      setDocLoading(false)
    })
  }
  const getDocuments = async () => {
    setDocLoading(true)
    await axios.post(Constants.BASE_URL + 'API-FX-228-GET-MEMBERSHIP-DOCUMENTS', {
      user_id: userId,
    }, {
      headers: {
        fx_key: Constants.SUBSCRIPTION_KEY,
      },
    }).then(resp => {
      setmembershipDocuments(resp.data.documents)
      console.log(membershipDocuments);
      setDocLoading(false)

    }).catch(err => {
      console.log(err.response.data);
      setDocLoading(false)
    })
  }
  useEffect(() => {
    getDocuments()
  }, [userId])
  return (
    <div className="my-2">
      <ToastContainer />

      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg z-50 transition-transform duration-300 overflow-y-auto ${show ? 'translate-x-0' : 'translate-x-full'
          }`}
        style={{
          width: '90%',

        }}
      >
        <>
          <div className="flex justify-between px-4 pt-6">
            <div className="text-left font-bold text-lg">Upload Files</div>
            <div className="text-right font-bold space-x-8 text-lg">

              <span>
                <button
                  onClick={handleClose}
                  className="text-2xl text-gray-600"
                >
                  <MdClose />
                </button>
              </span>
            </div>
          </div>
          <div style={{ paddingLeft: 15, paddingRight: 15, paddingBottom: 15, paddingTop: 15 }}>
            <div style={{
              borderRadius: 10,
              padding: 5,
              background: '#ffffff',
              height: 700,
              overflow: 'scroll',
            }}>
              <>
                {docLoading && (<div className="mx-5">loading...</div>)}

                {!docLoading &&
                  <>
                    <Table className="w-full text-sm text-left">
                      <Tbody>
                        {/* User Notes & Attachment Section */}
                        <Tr>
                          <Th scope="col" className="px-2 py-2 font-bold text-base">
                            <div className="my-4 flex items-start">
                              {/* Attachment Section */}
                              <div
                                className="w-1/4 flex flex-col justify-center items-center py-4 pl-2 border-dotted border-4 border-blue-500 rounded-lg text-center"
                                style={{ height: '100%' }}
                              >
                                {userAttachment.length > 0 ? (
                                  <div className="flex flex-col items-center">
                                    <img className="w-10" src="./file-icon.jpeg" alt="File Icon" />
                                    <p className="text-sm text-blue-500 font-medium mb-2">
                                      {'Document Attached'}
                                    </p>
                                    <button
                                      className={`px-8 py-1 rounded-xl bg-blue-500 text-white hover:bg-blue-600 ${userAttachment[0] ? 'cursor-pointer' : 'cursor-not-allowed'
                                        }`}
                                      onClick={() => {
                                        if (userAttachment[0]) {
                                          window.open(Constants.FILE_PATH_BASE_URL + userAttachment[0], '_blank');
                                        }
                                      }}
                                      disabled={!userAttachment[0]}
                                    >
                                      View Document
                                    </button>
                                  </div>
                                ) : (
                                  <div>
                                    <input
                                      type="file"
                                      ref={userFileInputRef}
                                      onChange={handleUserFileChange}
                                      className="hidden"
                                      multiple
                                    />
                                    <button
                                      className={`px-8 py-1 rounded-xl ${edit ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                      disabled={!edit}
                                      onClick={() => {
                                        if (edit && userFileInputRef.current) {
                                          userFileInputRef.current.click();
                                        }
                                      }}
                                    >
                                      Upload Document
                                    </button>
                                  </div>
                                )}
                              </div>

                            </div>
                          </Th>
                        </Tr>
                      </Tbody>
                    </Table>
                  </>}
                {!docLoading && membershipDocuments.length>0 &&
                  <div>
                    <Table>
                      <Tr><Th>Sno</Th><Th>Document</Th></Tr>
                      {membershipDocuments.map((membershipDoc, index) => {
                        return (<Tr key={index}><Th>{index + 1}</Th><Th><a href={Constants.FILE_PATH_BASE_URL + membershipDoc.fileName} target="_blank" rel="noreferrer">{membershipDoc.fileName}</a></Th></Tr>)
                      })}
                    </Table>
                  </div>
                }
              </>
            </div>
          </div>
        </>
        <div style={{ textAlign: 'center' }}>
          {!loading &&
            (!edit ?
              <button onClick={() => setEdit(true)}
                className="bg-[#205FFF] text-white px-4 py-2 mt-4 rounded-xl text-sm">
                Edit
              </button>
              :
              <>
                <button onClick={() => {
                  setEdit(false);
                  handleClose();
                }}
                  className="border-2 border-[#205FFF] text-[#205FFF] mr-4 px-4 mt-4 py-2 rounded-xl text-sm">
                  Cancel
                </button>
                <button onClick={() => saveData()}
                  className="bg-[#205FFF] text-white px-4 mt-4 py-2 rounded-xl text-sm">
                  Save
                </button>
              </>
            )
          }

        </div>

      </div>



=======
  return (
    <div className="my-2">
>>>>>>> UIChanges
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