import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Constants } from '../../lib/const/constants';
import getCurrencySymbol from '../../lib/currenyUtils';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FiArrowDownLeft, FiArrowUpRight } from 'react-icons/fi';
// import { FiSearch } from 'react-icons/fi';
import { MdOutlineCurrencyExchange, MdClose } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import 'react-tabs/style/react-tabs.css';
import ChangeStatusDialog from './Component/ChangeStatusDialog';

function DebitTransactions() {
  const userFileInputRef = useRef(null);
  const complianceFileInputRef = useRef(null);
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // start with true
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setLoading(false);
    setEdit(false);
    setPaymentStatus();
    setPaymentId();
    setPaymentSubmitted();
    setpayoutButton('Submit to payout');
  };
  const handleShow = () => {
    setShow(true);
  };

  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [beneName, setBeneName] = useState('');
  const [refId, setRefId] = useState('');
  const [beneBankNumber, setBeneBankNumber] = useState('');
  const [beneBankCodeValue, setBeneBankCodeValue] = useState('');
  const [cardFees, setcardFees] = useState('');
  const [paymentMethod, setpaymentMethod] = useState('');
  const [uploadedDocuments, setuploadedDocuments] = useState([]);
  // const [fieldName, setFieldName] = useState('');
  // const [fieldValue, setFieldValue] = useState('');
  // const [flag, setFlag] = useState('');
  const [userNotes, setUserNotes] = useState('');
  const [userAttachment, setuserAttachment] = useState([]);
  const [complianceNotes, setComplianceNotes] = useState('');
  const [complianceAttachment, setcomplianceAttachment] = useState([]);
  const [adminRequestedAttachments, setadminRequestedAttachments] = useState([]);
  const [edit, setEdit] = useState(false);

  const [editfieldName, seteditFieldName] = useState([]);
  const [editfieldValue, seteditFieldValue] = useState([]);
  const [editflag, seteditFlag] = useState();
  const [edituserNotes, seteditUserNotes] = useState();
  const [edituserAttachment, setedituserAttachment] = useState([]);
  const [editcomplianceNotes, seteditComplianceNotes] = useState();
  const [editcomplianceAttachment, seteditcomplianceAttachment] = useState([]);
  const [edittypeOfDocuments, setedittypeOfDocuments] = useState([]);

  const [editfieldSelectedName, seteditFieldSelectedName] = useState();
  const [editfieldSelectedValue, seteditFieldSelectedValue] = useState();
  const [editSelectedflag, seteditSelectedFlag] = useState();
  const [save, setSave] = useState(false);
  const [beneId, setBeneId] = useState('');
  const [individual, setIndividual] = useState([]);
  const [business, setBusiness] = useState([]);
  const [transactionUserType, setTransactionUserType] = useState();
  const [paymentStatus, setPaymentStatus] = useState();
  const [paymentId, setPaymentId] = useState();
  const [paymentSubmitted, setPaymentSubmitted] = useState();
  const [payoutButton, setpayoutButton] = useState('Submit to payout');
  // const [ip, setIP] = useState();
  // const [email, setEmail] = useState();
  const queryParams = new URLSearchParams(window.location.search);
  const beneficiary_id = queryParams.get('beneficiary_id');
  const [changeStatusTransactionId, setChangeStatusTransactionId] = useState();
  const [changeStatusWorkspaceId, setChangeStatusWorkspaceId] = useState();
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [searchText, setSearchText] = useState({
    transactionId: '',
    date: '',
    sender: '',
    receiver: '',
    sendingAmount: '',
    receivingAmount: '',
    status: '',
  });

  const getData = async (pagenumber) => {
    const login_id = sessionStorage.getItem('login_id');
    const login_token = sessionStorage.getItem('staff_login_token');
    // const login_email = sessionStorage.getItem('login_email');
    // setEmail(login_email);
    if (!login_id || !login_token) {
      sessionStorage.clear();
      navigate('/business');
      return;
    }
    setLoading(true); // Start loading
    var dataUrl = Constants.BASE_URL + 'API-FX-198-STAFF-TRANSACTIONS?page=' + pagenumber + '&transactionId=' + searchText.transactionId + '&date=' + searchText.date + '&sender=' + searchText.sender + '&receiver=' + searchText.receiver + '&sendingAmount=' + searchText.sendingAmount + '&receivingAmount=' + searchText.receivingAmount + '&status=' + searchText.status;
    if (beneficiary_id != '' && beneficiary_id != null)
      dataUrl = Constants.BASE_URL + 'API-FX-198-STAFF-TRANSACTIONS?page=' + pagenumber + '&beneficiary_id=' + beneficiary_id + '&transactionId=' + searchText.transactionId + '&date=' + searchText.date + '&sender=' + searchText.sender + '&receiver=' + searchText.receiver + '&sendingAmount=' + searchText.sendingAmount + '&receivingAmount=' + searchText.receivingAmount + '&status=' + searchText.status;

    await axios.get(dataUrl, {
      headers: {
        Authorization: 'Bearer ' + JSON.parse(login_token),
        fx_key: Constants.SUBSCRIPTION_KEY,
      },
    }).then(resp => {
      // console.log(JSON.stringify(resp.data.transactions.data));

      setLoading(false);
      const newTransactions = resp.data.transactions.data;
      if (newTransactions.length > 0) {
        setTransactions(prevTransactions => [...prevTransactions, ...newTransactions]);
        setCurrentPage(prevPage => prevPage + 1);
      } else {
        setHasMore(false); // No more data to load
      }
      setLoading(false);
    }).catch(err => {
      console.error('Error fetching data:', err.response);
      setLoading(false);
    });

    setLoading(true);
    await axios.get(Constants.BASE_URL + 'API-FX-200-FIELD-DETAILS', {
      headers: {
        Authorization: 'Bearer ' + JSON.parse(login_token),
        fx_key: Constants.SUBSCRIPTION_KEY,
      },
    }).then(resp => {
      var fields = [];
      var values = [];
      for (var f = 0; resp.data.fields_details.length > 0; f++) {
        if (resp.data.fields_details[f].field_type == 1)
          fields.push({ 'id': resp.data.fields_details[f].id, 'value': resp.data.fields_details[f].value });
        else if (resp.data.fields_details[f].field_type == 2)
          values.push({ 'id': resp.data.fields_details[f].id, 'value': resp.data.fields_details[f].value });

        seteditFieldName(fields);
        seteditFieldValue(values);
      }
      setLoading(false);
    }).catch(err => {
      console.log(err.response);
      setLoading(false);
    });

    await axios.get(Constants.BASE_URL + 'API-FX-202-DOCUMENTS-LIST', {
      headers: {
        Authorization: 'Bearer ' + JSON.parse(login_token),
        fx_key: Constants.SUBSCRIPTION_KEY,
      },
    }).then(resp => {
      var individual = [];
      var business = [];
      for (var d = 0; d < resp.data.documents.data.length; d++) {
        if (resp.data.documents.data[d].type == 'individual') {
          individual.push(resp.data.documents.data[d]);
        } else if (resp.data.documents.data[d].type == 'business') {
          business.push(resp.data.documents.data[d]);
        }
        setIndividual(individual);
        setBusiness(business);
      }
    }).catch(err => {
      console.log(err.response);
    });
    seteditFlag(['Green', 'Red', 'Blue', 'Yellow', 'Cyan', 'Purple', 'Gold', 'Brown']);
    setedittypeOfDocuments([]);
  };
 

  useEffect(() => {
    getData(currentPage);
    // getIpAddress();
  }, []);

  const handleSearch = () => {
    setCurrentPage(0);
    setTransactions([]);
    getData(1)
  };
  const reset =() =>{
    setSearchText({
      transactionId: '',
      date: '',
      sender: '',
      receiver: '',
      sendingAmount: '',
      receivingAmount: '',
      status: '',
    })
    handleSearch()
  }

  const navigatetotransaction = async (payment_method, metaDetails, date, transactionid, transaction) => {
    handleShow();
    setChangeStatusTransactionId(transactionid);
    setChangeStatusWorkspaceId(transaction.workspace_id);
    setLoading(true);
    setedittypeOfDocuments([]);
    setuploadedDocuments([]);
    const token = sessionStorage.getItem('staff_login_token');
    await axios.post(Constants.BASE_URL + 'API-FX-196-GET-TRANSACTION-DOCUMENTS', {
      transaction_id: transactionid,
    }, {
      headers: {
        Authorization: 'Bearer ' + JSON.parse(token),
        fx_key: Constants.SUBSCRIPTION_KEY,
      },
    }).then(resp => {
      console.log(resp.data, 'transaction documents');
      if (resp.data.documents.length > 0)
        setuploadedDocuments(resp.data.documents);
    }).catch(err => {
      console.log(err.response);
    });
    setRefId(transactionid);
    setAmount(metaDetails.exchange_currency + ' ' + metaDetails.recipient_amount);
    setDate(date);
    transaction.type == 'debit' ? setBeneName(metaDetails.second_beneficiary_name) : setBeneName(metaDetails.sender_name);
    setcardFees(metaDetails.card_fees);
    setBeneBankNumber(metaDetails.second_beneficiary_bank_account_number);
    setBeneBankCodeValue(metaDetails.second_beneficiary_bank_code);
    setpaymentMethod(payment_method);
    // setFieldName(metaDetails.fieldName);
    // setFieldValue(metaDetails.fieldValue);
    // setFlag(metaDetails.flag);
    setUserNotes(metaDetails.user_note);
    setComplianceNotes(metaDetails.compliance_note);
    setBeneId(metaDetails.beneficiary_id);
    setTransactionUserType(transaction.user_type);

    Object.prototype.hasOwnProperty.call(transaction, 'type_of_documents') ? setadminRequestedAttachments(transaction.type_of_documents) : setadminRequestedAttachments([]);
    Object.prototype.hasOwnProperty.call(metaDetails, 'user_attachment') ? setuserAttachment(metaDetails.user_attachment) : setuserAttachment([]);
    Object.prototype.hasOwnProperty.call(metaDetails, 'compliance_attachment') ? setcomplianceAttachment(metaDetails.compliance_attachment) : setcomplianceAttachment([]);

    Object.prototype.hasOwnProperty.call(metaDetails, 'clearbank_trx_status') && transaction.status != 'pending' && setPaymentStatus(metaDetails.clearbank_trx_status.response.message);
    Object.prototype.hasOwnProperty.call(metaDetails, 'clearbank_trx_status') && transaction.status != 'pending' && setPaymentId(metaDetails.clearbank_trx_status.response.id);
    Object.prototype.hasOwnProperty.call(metaDetails, 'clearbank_trx_status') && transaction.status != 'pending' && setPaymentSubmitted('Clear Bank');

    Object.prototype.hasOwnProperty.call(metaDetails, 'clearbank_response') && transaction.status != 'pending' && setPaymentStatus(metaDetails.clearbank_response.message);
    Object.prototype.hasOwnProperty.call(metaDetails, 'clearbank_response') && transaction.status != 'pending' && setPaymentId(metaDetails.clearbank_response.id);
    Object.prototype.hasOwnProperty.call(metaDetails, 'clearbank_response') && transaction.status != 'pending' && setPaymentSubmitted('Clear Bank');

    Object.prototype.hasOwnProperty.call(metaDetails, 'currency_cloud_payment_id') && transaction.status != 'pending' && setPaymentStatus(metaDetails.currency_cloud_status);
    Object.prototype.hasOwnProperty.call(metaDetails, 'currency_cloud_payment_id') && transaction.status != 'pending' && setPaymentId(metaDetails.currency_cloud_payment_id);
    Object.prototype.hasOwnProperty.call(metaDetails, 'currency_cloud_payment_id') && transaction.status != 'pending' && setPaymentSubmitted('Currency Cloud');
    setLoading(false);
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

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

  const handleComplianceFileChange = (event) => {
    const files = event.target.files;
    const filePromises = [];

    for (let i = 0; i < files.length; i++) {
      filePromises.push(convertFileToBase64(files[i]));
    }

    Promise.all(filePromises)
      .then((base64Files) => {
        const updatedFiles = base64Files.map((file, index) => ({
          file, // Base64 string
          name: files[index].name, // Original file name
        }));
        seteditcomplianceAttachment(updatedFiles); // Update state with structured data
      })
      .catch((error) => {
        console.error('Error converting files to Base64:', error);
      });
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
    setSave(true);
    const login_token = sessionStorage.getItem('staff_login_token');

    try {
      const response = await axios.post(
        `${Constants.BASE_URL}API-FX-201-STORE-COMPLIANCE-TRANSACTION-DETAILS/${refId}`,
        {
          flag: editSelectedflag,
          user_attachments: edituserAttachment,
          user_notes: edituserNotes ?? 'NA',
          compliance_attachments: editcomplianceAttachment,
          compliance_notes: editcomplianceNotes ?? 'NA',
          field_name: editfieldSelectedName,
          field_value: editfieldSelectedValue,
          type_of_documents: edittypeOfDocuments,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(login_token)}`,
            fx_key: Constants.SUBSCRIPTION_KEY,
          },
        }
      );

      console.log('Save Response:', response.data);

      // Update necessary states or data after a successful save
      toast.success('Successfully Saved.');
      setTransactions([]);
      getData(1);
      setCurrentPage(1);
      // Close the edit modal and reset flags
      setEdit(false);
      handleClose();
    } catch (error) {
      console.error('Error saving data:', error.response);
      toast.error('Failed to save data.');
    } finally {
      setSave(false); // Reset the saving state
    }
  };

  const openBene = async (beneId) => {
    window.open('/DebitTransactions?beneficiary_id=' + beneId);
  };
  const submitTopayOut = async () => {
    if(payoutButton!='Submitting...')
    {
    setpayoutButton('Submitting...');
    const login_token = sessionStorage.getItem('staff_login_token');
    const userId = sessionStorage.getItem('staff_login_id');
    await axios.post(Constants.BASE_URL + 'API-FX-207-SUBMIT-PAYMENT', {
      'id': refId,
      'userId': JSON.parse(userId)
    }, {
      headers: {
        Authorization: 'Bearer ' + JSON.parse(login_token),
        fx_key: Constants.SUBSCRIPTION_KEY,
      },
    }).then(resp => {
      toast.success(resp.data.message);
      // location.reload();
      setTransactions([]);
      handleClose();
      getData(1);
      setpayoutButton('Submitted');
    }).catch(err => {
      toast.error(err.response.data.message);
      // location.reload();
      setTransactions([]);
      handleClose();
      getData(1);
      setpayoutButton('Error Submitting');
    });
    }

  };
  // const getIpAddress = async () => {
  //   const res = await axios.get('https://api.ipify.org/?format=json');
  //   setIP(res.data.ip);
  // };
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


        <ChangeStatusDialog
          isOpen={openStatusDialog}
          onClose={() => setOpenStatusDialog(false)}
          transactionId={changeStatusTransactionId}
          workspaceId={changeStatusWorkspaceId}
        />

        <>
          <div className="flex justify-between px-4 pt-6">
            <div className="text-left font-bold text-lg">Transaction Details</div>
            <div className="text-right font-bold space-x-8 text-lg">
              <span>
                <button
                  className="text-blue-600"
                  onClick={() => setOpenStatusDialog(true)}
                >Change Status</button>
              </span>
              {!loading && (
                <span>
                  Beneficiary Name:
                  <button
                    className="font-bold text-[#205FFF] ml-2"
                    onClick={() => openBene(beneId)}>{beneName}
                  </button>
                </span>)}
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
                {loading && (<div className="mx-5">loading...</div>)}

                {!loading &&
                  <>
                    <Table className="w-full text-sm text-left border border-gray-200 border-collapse shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                      <Tbody>
                        <Tr className="border-b border-[#B7B7B7]">
                          <Td className="w-[30%] border-r border-[#B7B7B7] px-4 py-2 text-base font-normal text-gray-600">
                            Reference Id
                          </Td>
                          <Td className="w-[70%] px-4 py-2 font-bold text-base text-gray-900">
                            {refId}
                          </Td>
                        </Tr>
                        <Tr className="border-b border-[#B7B7B7]">
                          <Td className="w-[30%] border-r border-[#B7B7B7] px-4 py-2 text-base font-normal text-gray-600">
                            Sent Amount
                          </Td>
                          <Td className="w-[70%] px-4 py-2 font-bold text-base text-gray-900">
                            {amount}
                          </Td>
                        </Tr>
                        {cardFees != '' && cardFees != null && (
                          <Tr className="border-b border-[#B7B7B7]">
                            <Td className="w-[30%] border-r border-[#B7B7B7] px-4 py-2 text-base font-normal text-gray-600">
                              Fees
                            </Td>
                            <Td className="w-[70%] px-4 py-2 font-bold text-base text-gray-900">
                              GBP {cardFees}
                            </Td>
                          </Tr>
                        )}
                        <Tr className="border-b border-[#B7B7B7]">
                          <Td className="w-[30%] border-r border-[#B7B7B7] px-4 py-2 text-base font-normal text-gray-600">
                            Date
                          </Td>
                          <Td className="w-[70%] px-4 py-2 font-bold text-base text-gray-900">
                            {date}
                          </Td>
                        </Tr>
                        {beneBankNumber != '' && beneBankNumber != null && (
                          <Tr className="border-b border-[#B7B7B7]">
                            <Td className="w-[30%] border-r border-[#B7B7B7] px-4 py-2 text-base font-normal text-gray-600">
                              Account Number
                            </Td>
                            <Td className="w-[70%] px-4 py-2 font-bold text-base text-gray-900">
                              {beneBankNumber}
                            </Td>
                          </Tr>
                        )}
                        {beneBankCodeValue != '' && beneBankCodeValue != null && (
                          <Tr className="border-b border-[#B7B7B7]">
                            <Td className="w-[30%] border-r border-[#B7B7B7] px-4 py-2 text-base font-normal text-gray-600">
                              Code
                            </Td>
                            <Td className="w-[70%] px-4 py-2 font-bold text-base text-gray-900">
                              {beneBankCodeValue}
                            </Td>
                          </Tr>
                        )}
                        <Tr className="border-b border-[#B7B7B7]">
                          <Td className="w-[30%] border-r border-[#B7B7B7] px-4 py-2 text-base font-normal text-gray-600">
                            Transfer Type
                          </Td>
                          <Td className="w-[70%] px-4 py-2 font-bold text-base text-gray-900">
                            {paymentMethod}
                          </Td>
                        </Tr>
                      </Tbody>
                    </Table>


                    <br />
                    <Table className="w-full text-sm text-left py-4">
                      <Thead className="=">
                        <Tr>
                          <Th scope="col" className="w-1/4 px-2 py-2 font-normal text-base">Field
                            Name</Th>
                          <Th scope="col" className="w-1/4 px-2 py-2 font-normal text-base">Field
                            Value</Th>
                          <Th scope="col" className="w-1/4 px-2 py-2 font-normal text-base">Flag</Th>
                          <Th scope="col" className="w-1/4 px-2 py-2 font-normal text-base">Requested
                            Documents</Th>
                        </Tr>

                      </Thead>
                      <Tbody>
                        {save &&
                          (<Tr>
                            <Th scope="col" className="px-2 py-2"></Th>
                            <Th scope="col" className="px-2 py-2">Saving...</Th>
                            <Th scope="col" className="px-2 py-2"></Th>
                            <Th scope="col" className="px-2 py-2"></Th>
                          </Tr>)}
                        <Tr>
                          <Td scope="col" className="px-2 py-2 font-normal">
                            <select
                              className={`w-3/4 px-2 py-1 rounded text-gray-700 border border-gray-300 focus:ring focus:ring-blue-500 ${edit ? 'bg-[#d9d9d9]' : 'bg-gray-100 shadow-[0_4px_4px_rgba(0,0,0,0.25)]'}`}
                              disabled={!edit}
                              value={editfieldSelectedName}
                              onChange={(e) => seteditFieldSelectedName(e.target.value)}
                            >
                              <option>-Name-</option>
                              {editfieldName.map((resp) => (
                                <option key={resp.id} value={resp.value}>
                                  {resp.value}
                                </option>
                              ))}
                            </select>
                          </Td>
                          <Td scope="col" className="px-2 py-2 font-normal">
                            <select
                              className={`w-3/4 px-2 py-1 rounded text-gray-700 border border-gray-300 focus:ring focus:ring-blue-500 ${edit ? 'bg-[#d9d9d9]' : 'bg-gray-100 shadow-[0_4px_4px_rgba(0,0,0,0.25)]'}`}
                              disabled={!edit}
                              value={editfieldSelectedValue}
                              onChange={(e) => seteditFieldSelectedValue(e.target.value)}
                            >
                              <option>-Value-</option>
                              {editfieldValue.map((resp) => (
                                <option key={resp.id} value={resp.value}>
                                  {resp.value}
                                </option>
                              ))}
                            </select>
                          </Td>
                          <Td scope="col" className="px-2 py-2 font-normal">
                            <select
                              className={`w-3/4 px-2 py-1 rounded text-gray-700 border border-gray-300 focus:ring focus:ring-blue-500 ${edit ? 'bg-[#d9d9d9]' : 'bg-gray-100 shadow-[0_4px_4px_rgba(0,0,0,0.25)]'}`}
                              disabled={!edit}
                              value={editSelectedflag}
                              onChange={(e) => seteditSelectedFlag(e.target.value)}
                            >
                              <option>-Flag-</option>
                              {editflag?.map((resp) => (
                                <option key={resp}>{resp}</option>
                              ))}
                            </select>
                          </Td>
                          <Td scope="col" className="px-2 py-2 font-normal">
                            <div className="relative">
                              <select
                                className={`w-3/4 px-2 py-1 rounded text-gray-700 border border-gray-300 focus:ring focus:ring-blue-500 ${edit ? 'bg-[#d9d9d9]' : 'bg-gray-100 shadow-[0_4px_4px_rgba(0,0,0,0.25)]'}`}
                                disabled={!edit}
                                multiple
                                size={edit ? 4 : 1} // Expand when in edit mode
                                onFocus={(e) => {
                                  if (edit) {
                                    e.target.size =
                                      transactionUserType === 'individual'
                                        ? Math.min(4, individual.length)
                                        : Math.min(4, business.length); // Limit to a max size of 4 visible options
                                  }
                                }}
                                onBlur={(e) => {
                                  e.target.size = 1; // Collapse on blur
                                }}
                                onChange={(e) => {
                                  const values = [...e.target.selectedOptions].map((opt) => opt.value);
                                  setedittypeOfDocuments(values);
                                }}
                              >
                                {transactionUserType === 'individual'
                                  ? individual.map((resp, index) => (
                                    <option key={index} value={resp.id}>
                                      {resp.document}
                                    </option>
                                  ))
                                  : business.map((resp, index) => (
                                    <option key={index} value={resp.id}>
                                      {resp.document}
                                    </option>
                                  ))}
                              </select>
                              <div className="absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="2"
                                  stroke="currentColor"
                                  className="w-4 h-4 text-gray-500"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19 9l-7 7-7-7"
                                  />
                                </svg>
                              </div>
                            </div>

                          </Td>
                        </Tr>

                      </Tbody>
                    </Table>

                    <Table className="w-full text-sm text-left">
                      <Tbody>
                        {/* User Notes & Attachment Section */}
                        <Tr>
                          <Th scope="col" className="px-2 py-2 font-bold text-base">
                            User (Notes & Attachment)
                            <div className="my-4 flex items-start">
                              {/* Textarea for Notes */}
                              <textarea
                                value={!edit ? userNotes : edituserNotes}
                                disabled={!edit}
                                onChange={(e) => edit && seteditUserNotes(e.target.value)}
                                className={`p-2 rounded-lg outline-none mr-4 text-sm placeholder:text-[#707070] placeholder:font-normal resize-none w-3/4 ${edit ? 'bg-[#d9d9d9]' : 'bg-gray-100 shadow-[0_4px_4px_rgba(0,0,0,0.25)]'
                                  }`}
                                placeholder="Add notes..."
                                rows={4}
                              />

                              {/* Attachment Section */}
                              <div
                                className="w-1/4 flex flex-col justify-center items-center py-4 pl-2 border-dotted border-4 border-blue-500 rounded-lg text-center"
                                style={{ height: '100%' }}
                              >
                                {userAttachment.length > 0 ? (
                                  <div className="flex flex-col items-center">
                                    <img className="w-10" src="./file-icon.jpeg" alt="File Icon" />
                                    <p className="text-sm text-blue-500 font-medium mb-2">
                                      { 'Document Attached'}
                                    </p>
                                    <button
                                      className={`px-8 py-1 rounded-xl bg-blue-500 text-white hover:bg-blue-600 ${userAttachment[0] ? 'cursor-pointer' : 'cursor-not-allowed'
                                        }`}
                                      onClick={() => {
                                        if (userAttachment[0]) {
                                          window.open(Constants.FILE_PATH_BASE_URL+userAttachment[0], '_blank');
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

                        {/* Compliance Notes & Attachment Section */}
                        <Tr>
                          <Th scope="col" className="px-2 py-2 font-bold text-base">
                            Compliance (Notes & Attachment)
                            <div className="my-4 flex items-start">
                              {/* Textarea for Compliance Notes */}
                              <textarea
                                value={!edit ? complianceNotes : editcomplianceNotes}
                                disabled={!edit}
                                onChange={(e) => edit && seteditComplianceNotes(e.target.value)}
                                className={`p-2 rounded-lg outline-none mr-4 text-sm placeholder:text-[#707070] placeholder:font-normal resize-none w-3/4 ${edit ? 'bg-[#d9d9d9]' : 'bg-gray-100 shadow-[0_4px_4px_rgba(0,0,0,0.25)]'
                                  }`}
                                placeholder="Add Notes..."
                                rows={4}
                              />

                              {/* Attachment Section */}
                              <div
                                className="w-1/4 flex flex-col justify-center items-center py-4 pl-2 border-dotted border-4 border-blue-500 rounded-lg text-center"
                                style={{ height: '100%' }}
                              >
                                {complianceAttachment.length > 0 ? (
                                  <div className="flex flex-col items-center">
                                    <img className="w-10" src="./file-icon.jpeg" alt="File Icon" />
                                    <p className="text-sm text-blue-500 font-medium mb-2">
                                      {complianceAttachment[0].name || 'Document Attached'}
                                    </p>
                                    <button
                                      className="px-8 py-1 rounded-xl bg-blue-500 text-white hover:bg-blue-600"
                                      onClick={() => {
                                        if (complianceAttachment[0]) {
                                          window.open(Constants.FILE_PATH_BASE_URL+complianceAttachment[0], '_blank');
                                        }
                                      }}
                                    >
                                      View Document
                                    </button>
                                  </div>
                                ) : (
                                  <div>
                                    <input
                                      type="file"
                                      ref={complianceFileInputRef}
                                      onChange={handleComplianceFileChange}
                                      className="hidden"
                                    />
                                    <button
                                      className={`px-8 py-1 rounded-xl ${edit ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                      disabled={!edit}
                                      onClick={() => {
                                        if (edit && complianceFileInputRef.current) {
                                          complianceFileInputRef.current.click();
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
                {uploadedDocuments.length > 0 && !loading && (
                  <>
                    <div style={{ width: '100%', height: 1, backgroundColor: 'GrayText' }}></div>
                    <div className="font-bold text-base py-6">
                      User Uploaded Documents
                    </div>
                    <table className="w-full text-sm text-left rounded-md border-2 border-[#5b5b5b]">
                      <thead>
                        <tr style={{ background: '#D9D9D9' }}>
                          <th className='py-2 px-2 border-r-2 border-[#5b5b5b]'>Sno</th>
                          <th className='py-2 px-2 border-r-2 border-[#5b5b5b]'>Notes</th>
                          <th className='py-2 px-2 border-r-2 border-[#5b5b5b]'>Document</th>
                        </tr>
                      </thead>
                      {uploadedDocuments.map((document, index) => {
                        return (
                          <tr key={index}>
                            <td className='py-2 px-2 border-r-2 border-[#5b5b5b]'>{index + 1}</td>
                            <td className='py-2 px-2 border-r-2 border-[#5b5b5b]'>{document.notes}</td>
                            <td className='py-2 px-2 border-r-2 border-[#5b5b5b]'><a rel="noopener noreferrer" target="_blank"
                              href={Constants.FILE_PATH_BASE_URL + document.document}> View
                              Document</a></td>
                          </tr>
                        );
                      })}
                    </table>
                  </>)}

                {adminRequestedAttachments.length > 0 && !loading && (
                  <>
                    <div style={{ width: '100%', height: 1, backgroundColor: 'GrayText' }}></div>
                    <div className="font-bold text-base py-6">
                      Admin Requested Documents
                    </div>
                    <table className="w-full text-sm text-left rounded-md border-2 border-[#5b5b5b] mb-10">
                      <thead>
                        <tr style={{ background: '#D9D9D9' }}>
                          <th className='py-2 px-2 border-r-2 border-[#5b5b5b]'>Sno</th>
                          <th className='py-2 px-2 border-r-2 border-[#5b5b5b]'>Document Type</th>
                          <th className='py-2 px-2'>User Document</th>
                        </tr>
                      </thead>
                      {adminRequestedAttachments.map((document, index) => {
                        return (
                          <tr key={index}>
                            <td className='py-2 px-2 border-r-2 border-[#5b5b5b]'>{index + 1}</td>
                            <td className='py-2 px-2 border-r-2 border-[#5b5b5b]'>{document.document}</td>
                            <td className='py-2 px-2'>
                              {document.pivot.document != '' && document.pivot.document != null ?
                                <a rel="noopener noreferrer" target="_blank"
                                  href={Constants.FILE_PATH_BASE_URL + document.pivot.document}> View
                                  Document</a> : '-'}

                            </td>
                          </tr>
                        );
                      })}
                    </table>
                  </>)}
              </>
            </div>
          </div>
        </>
        <>
          {paymentSubmitted != null && paymentSubmitted != '' ?
            <div className="p-5">
              {paymentSubmitted} Transaction
              <table className="w-1/2 text-sm text-left mx-5 border-2 mb-10">
                <thead>
                  <tr style={{ padding: 5, background: '#CECECE' }}>
                    <th>Payment Id</th>
                    <th>Status</th>
                  </tr>
                  <tr>
                    <td>{paymentId}</td>
                    <td>{paymentStatus}</td>
                  </tr>
                </thead>
              </table>
            </div>
            :
            <div className="p-5">
              {!loading && <button onClick={submitTopayOut} className="bg-[#205FFF] text-white px-4 mt-4 py-2 rounded-xl text-sm">
                {payoutButton}
              </button>}
            </div>
          }
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
                          setSave(false);
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
      <div className="flex items-center justify-between py-4 mb-4">
        <div className="flex items-center ml-1">
          <span className="font-bold text-lg pl-3">Debit Transactions</span>
        </div>
        <div className="flex space-x-4">
          <div className="relative">
            {/* <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={handleSearch}
              className="pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white placeholder:text-[#303644]"
            />
            <FiSearch className="absolute top-2.5 right-4 text-[#303644]" /> */}
          </div>
        </div>
      </div>
      <div className="relative overflow-x-auto rounded-3xl bg-white">
        <InfiniteScroll
          dataLength={transactions.length} // This is the length of the items array
          next={() => getData(currentPage)}
          hasMore={hasMore}
          loader={
            <div className="w-full mt-6">
              <div className="flex justify-center items-center h-5 pb-6">
                {/* <p>Loading transactions...</p> */}
              </div>
            </div>
          }
          endMessage={
            <div className="w-full">
              <div className="flex justify-center items-center h-5 pb-6">
                {/* <p>No more transactions to show</p> */}
              </div>
            </div>
          }
          scrollableTarget="scrollableDiv"
        >
          <div className="overflow-x-auto w-full">
            <table className="table-auto min-w-full text-sm text-left">

              <thead className="border-b-2">
                <tr>
                  <th scope="col" className="px-4 py-6">Transaction ID</th>
                  <th scope="col" className="px-4 py-2">Date & Time</th>
                  <th scope="col" className="px-4 py-2">Sender</th>
                  <th scope="col" className="px-4 py-2">Receiver</th>
                  <th scope="col" className="px-4 py-2">Sending Amount</th>
                  <th scope="col" className="px-4 py-2">Receiving Amount</th>
                  <th scope="col" className="px-4 py-2">Status</th>
                  <th scope="col" className="px-4 py-2">Details</th>
                </tr>

                <tr>
                  <th scope="col" className="px-4 py-6">
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchText.transactionId}
                      onChange={(text) => {setSearchText({...searchText, transactionId:text.target.value});}}
                      style={{ width: 150, maxWidth: 150 }}
                      className="pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white placeholder:text-[#303644]"
                    />
                  </th>
                  <th scope="col" className="px-4 py-2">
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchText.date}
                      onChange={(text) => {setSearchText({...searchText,date:text.target.value});}}
                      style={{ width: 150, maxWidth: 150 }}
                      className="pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white placeholder:text-[#303644]"
                    />
                  </th>
                  <th scope="col" className="px-4 py-2">
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchText.sender}
                      onChange={(text) => { setSearchText({ ...searchText,sender: text.target.value }); }}
                      style={{ width: 150, maxWidth: 150 }}
                      className="pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white placeholder:text-[#303644]"
                    />
                  </th>
                  <th scope="col" className="px-4 py-2">
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchText.receiver}
                      onChange={(text) => { setSearchText({ ...searchText,receiver: text.target.value }); }}
                      style={{ width: 150, maxWidth: 150 }}
                      className="pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white placeholder:text-[#303644]"
                    />
                  </th>
                  <th scope="col" className="px-4 py-2">
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchText.sendingAmount}
                      onChange={(text) => { setSearchText({ ...searchText,sendingAmount: text.target.value }); }}
                      style={{ width: 150, maxWidth: 150 }}
                      className="pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white placeholder:text-[#303644]"
                    />
                  </th>
                  <th scope="col" className="px-4 py-2">
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchText.receivingAmount}
                      onChange={(text) => { setSearchText({ ...searchText,receivingAmount: text.target.value }); }}
                      style={{ width: 150, maxWidth: 150 }}
                      className="pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white placeholder:text-[#303644]"
                    />
                  </th>
                  <th scope="col" className="px-4 py-2">
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchText.status}
                      onChange={(text) => { setSearchText({ ...searchText,status: text.target.value }); }}
                      style={{ width: 150, maxWidth: 150 }}
                      className="pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white placeholder:text-[#303644]"
                    />
                  </th>
                  <th scope="col" className="px-4 py-2 flex my-5">
                    <button className="view-details-btn font-semibold rounded-full text-white px-4 py-2 mx-2 whitespace-nowrap" onClick={handleSearch}>Search
                    </button>

                    <button className="view-details-btn font-semibold rounded-full text-white px-4 py-2 whitespace-nowrap" onClick={reset}>Reset
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((beneficiary) => {
                  const meta = beneficiary.meta;
                  // const senderName = beneficiary.type == 'debit' ? meta.second_beneficiary_name : meta.sender_name;
                  // let splittedSender = senderName.split(";;");
                  const receivingAmount = meta.recipient_amount || 'N/A';
                  const receivingCurrency = meta.exchange_currency || 'N/A';
                  const color = beneficiary.type === 'debit' ? 'bg-gray-400 text-black' : 'bg-green-100 text-green-500';
                  return (
                    <>
                      <tr key={beneficiary.id}>
                        <td scope="row" className="px-6 py-4 font-bold">
                          <div className="flex items-center space-x-2">
                            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${color}`}>
                              {beneficiary.type === 'debit' ? (
                                <FiArrowUpRight fontSize="25px" />
                              ) : beneficiary.type === null || beneficiary.type === '' || beneficiary.type === 'individual' ? (
                                <MdOutlineCurrencyExchange fontSize="25px" />
                              ) : (
                                <FiArrowDownLeft fontSize="25px" />
                              )}
                            </div>
                            <div>
                              <span className="text-[#205FFF]">{beneficiary.id}</span>
                              <div className="border-b-2 border-[#205FFF]"></div>
                            </div>
                          </div>
                        </td>

                        <td
                          className="px-4 py-2 font-bold">{new Date(beneficiary.created_at).getDate() + '-' + (new Date(beneficiary.created_at).getMonth() + 1) + '-' + new Date(beneficiary.created_at).getFullYear()}</td>
                        <td className="px-4 py-2 font-bold">{meta.sender_name}</td>
                        <td className="px-4 py-2 font-bold">
                          <button onClick={() => openBene(meta.beneficiary_id)}>{meta.second_beneficiary_name}</button>
                        </td>
                        <td
                          className="px-4 py-2 font-bold">{getCurrencySymbol(beneficiary.settled_currency)} {numberWithCommas(parseFloat(beneficiary.amount).toFixed(2))}</td>
                        <td
                          className="px-4 py-2 font-bold">{receivingAmount && getCurrencySymbol(receivingCurrency)} {numberWithCommas(parseFloat(receivingAmount).toFixed(2))}
                        </td>
                        <td className="px-4 py-2 font-bold">

                          {beneficiary.meta.status ?? beneficiary.status}
                        </td>
                        <td className="px-4 py-2">
                          <button className="view-details-btn font-semibold rounded-full text-white px-4 py-2 whitespace-nowrap" onClick={() => {
                            navigatetotransaction(beneficiary.payment_method, beneficiary.meta, new Date(beneficiary.created_at).getDate() + '-' + (new Date(beneficiary.created_at).getMonth() + 1) + '-' + new Date(beneficiary.created_at).getFullYear(), beneficiary.id, beneficiary);
                          }}>View Details
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </InfiniteScroll>
        {loading &&
          (<div className="w-full mt-6">
            <div className="flex justify-center items-center h-5 pb-6">
              <p>Loading transactions...</p>
            </div>
          </div>)}
        {!loading && hasMore &&
          (<div className="w-full mt-6">
            <div className="flex justify-center items-center h-5 pb-6">
              <button onClick={() => getData(currentPage)}>Load More...</button>
            </div>
          </div>)}
      </div>
    </div>
  );
}

export default DebitTransactions;