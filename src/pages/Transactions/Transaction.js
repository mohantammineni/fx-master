import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Constants } from '../../lib/const/constants';
import getCurrencySymbol from '../../lib/currenyUtils';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FiArrowDownLeft, FiArrowUpRight } from 'react-icons/fi';
import { MdOutlineCurrencyExchange } from 'react-icons/md';

import { PrimaryButton } from '../../components/button';
import { ToastContainer, toast } from "react-toastify";
// import { FiSearch } from 'react-icons/fi';
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
// import fileDownload from 'js-file-download';
function Transaction({ filtercurrency }) {
  Transaction.propTypes = {
    filtercurrency: PropTypes.string,
  };

  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true); // start with true
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setLoading(false)
  }
  const handleShow = () => {
    setShow(true);

  }
  const [settype, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [beneName, setBeneName] = useState("");
  // const [refId, setRefId] = useState("");
  // const [beneBankName, setBeneBankName] = useState("");
  const [beneBankNumber, setBeneBankNumber] = useState("");
  // const [beneBankCodeType, setBeneBankCodeType] = useState("");
  // const [beneBankCodeValue, setBeneBankCodeValue] = useState("");
  // const [transtatus, settranstatus] = useState("");
  const [cardFees, setcardFees] = useState("");
  const [status, setStatus] = useState("");
  const [documents, setdocuments] = useState({});
  const [files, setFiles] = useState({});
  const [file, setFile] = useState()
  const [uploading, setUploading] = useState(false);
  const [docUploaded, setdocUploaded] = useState(false);
  const [uploadedDocuments, setuploadedDocuments] = useState([]);
  const [transactionId, setTransactionId] = useState();
  const [notes, setNotes] = useState();
  const [showdownload, setshowdownload] = useState(false);
  const [fromdate, setFromdate] = useState("");
  const [todate, setTodate] = useState("");
  const [downloadLoading, setdownloadLoading] = useState(false);
  const [reason, setReason] = useState("");
  const [transactionIds, settransactionIds] = useState([]);
  const [downloadId, setdownloadId] = useState(0);
  // const [searchText, setSearchText] = useState('');
  const [searchText, setSearchText] = useState({
        transactionId: '',
        date: '',
        sender: '',
        sendingAmount: '',
        receivingAmount: '',
        status: '',
      });

  const getData = async (pageNumber) => {
    const login_id = sessionStorage.getItem('login_id');
    const login_token = sessionStorage.getItem('login_token');
    const login_workspaces_id = sessionStorage.getItem('login_workspaces_id');

    if (!login_id || !login_token) {
      sessionStorage.clear();
      navigate('/business');
      return;
    }

    setLoading(true); // Start loading
    const from = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + (new Date().getDate() - 100);
    const to = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
    var geturl = '';
    try {
      if (filtercurrency == '' || filtercurrency == null)
        geturl = `${Constants.BASE_URL}API-FX-180-CONVERSIONLIST/${login_workspaces_id}?page=${pageNumber}&from=${from}&to=${to}&transactionId=${searchText.transactionId }&date=${searchText.date }&sender=${searchText.sender }&sendingAmount=${searchText.sendingAmount }&receivingAmount=${searchText.receivingAmount }&status=${searchText.status }`;
      else
        geturl = `${Constants.BASE_URL}API-FX-180-CONVERSIONLIST/${login_workspaces_id}?page=${pageNumber}&from=${from}&to=${to}&currency=${filtercurrency}&transactionId=${searchText.transactionId }&date=${searchText.date }&sender=${searchText.sender }&sendingAmount=${searchText.sendingAmount }&receivingAmount=${searchText.receivingAmount }&status=${searchText.status }`;
      const response = await axios.get(geturl, {
        headers: {
          Authorization: 'Bearer ' + JSON.parse(login_token),
          fx_key: Constants.SUBSCRIPTION_KEY,
        },
      });

      const newTransactions = response.data.transactions;
      const otherTransactions = response.data.otherTransactions;

      const mergedData = response.data.typeOfDocuments.reduce((acc, current) => {
        // Use the id as the key
        const key = current.transaction_id;

        // If the key does not exist in the accumulator, create a new array
        if (!acc[key]) {
          acc[key] = [];
        }

        // Push the current object into the array under the corresponding key
        acc[key].push(current);

        return acc;
      }, {});
      // if(mergedData.length>0)
      var result = Object.keys(mergedData).map((key) => [key, mergedData[key]]);
      console.log("datalength" + result.length);

      setdocuments(prevState => ({ ...prevState, ...mergedData }));
      setdocUploaded(response.data.docUploaded)
      docUploaded
      if (newTransactions.length > 0 && currentPage == 0) {
        setTransactions(prevTransactions => [...prevTransactions, ...newTransactions]);
      } else {
        setHasMore(false); // No more data to load
      }
      if (otherTransactions.length > 0) {
        setTransactions(prevTransactions => [...prevTransactions, ...otherTransactions]);
        setCurrentPage(prevPage => prevPage + 1);
      } else {
        setHasMore(false); // No more data to load
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      // setHasMore(false); // Stop infinite scroll if error occurs
    } finally {
      setLoading(false); // Stop loading
      // setHasMore(false); // Stop infinite scroll if error occurs
    }
  };


  useEffect(() => {
    getData(currentPage);
  }, []);

  const handleSearch = () => {
    setCurrentPage(0);
    setTransactions([]);
    getData(0)
    // setSearchText({
    //   transactionId: '',
    //   date: '',
    //   sender: '',
    //   sendingAmount: '',
    //   receivingAmount: '',
    //   status: '',
    // })
  };
  const reset =() =>{
    setSearchText({
      transactionId: '',
      date: '',
      sender: '',
      sendingAmount: '',
      receivingAmount: '',
      status: '',
    })
    handleSearch()
  }
  // const loadtransactiondetails = async (uuid, inbound, transactionid) => {
  //   if (inbound == 'credit') {
  //     // navigate('/CCTransCreditDetails', { state: { id: uuid } })
  //     setTransactionId(transactionid);
  //     CCTransCreditDetails(uuid)
  //   }
  //   else {
  //     // navigate('/CCTransDebitDetails', { state: { uuid: uuid } })
  //     setTransactionId(transactionid);
  //     CCTransDebitDetails(uuid)
  //   }
  //   handleShow()
  // }
  // const loadCBTransdetails = async (amount, date, beneName, transactionid) => {
  //   //navigate('/CBTransCreditDetails', { state: { amount: amount, date: date, beneName: beneName } })
  //   setTransactionId(transactionid);
  //   CBTransCreditDetails(amount, date, beneName);
  //   handleShow()
  // }
  async function loadTransdetails(ref, amount, paymentDate, beneName, beneAccount, card_fees, status, transactionid, reason,reference) {
    // navigate('/TransDebitDetails', { state: { ref: ref, amt: amount, paymentDate: paymentDate, benename: beneName, beneAccount: beneAccount, status: status, card_fees: card_fees } })
    setTransactionId(transactionid);
    TransDebitDetails(ref, amount, paymentDate, beneName, beneAccount, card_fees, status, reference ?? reason )
    handleShow()
  }
  const navigatetotransaction = async (paymentMethod, metaDetails, date, send, transactionid,status) => {
    handleShow();
    setLoading(true);
    const token = sessionStorage.getItem('login_token');
    await axios.post(Constants.BASE_URL + 'API-FX-196-GET-TRANSACTION-DOCUMENTS', {
      transaction_id: transactionid,
    }, {
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
        fx_key: Constants.SUBSCRIPTION_KEY
      }
    }).then(resp => {
      console.log(resp.data.documents);
      setuploadedDocuments(resp.data.documents)
    }).catch(err => {
      console.log(err.response);
    })

    Object.prototype.hasOwnProperty.call(JSON.parse(metaDetails), 'charge_against_trx_id') ? settransactionIds(JSON.parse(metaDetails).charge_against_trx_id) : settransactionIds([])

    // paymentMethod == "manual_transfer" && JSON.parse(metaDetails).city != "CB" ?
    //   Object.prototype.hasOwnProperty.call(JSON.parse(metaDetails), 'currency_cloud_payment_id') ?

    //     loadtransactiondetails(JSON.parse(metaDetails).currency_cloud_payment_id, send, transactionid) :

    //     loadTransdetails(JSON.parse(metaDetails).reference_no, JSON.parse(metaDetails).exchange_currency + " " + JSON.parse(metaDetails).recipient_amount, date, JSON.parse(metaDetails).second_beneficiary_name, JSON.parse(metaDetails).second_beneficiary_bank_account_number == '' ? JSON.parse(metaDetails).second_beneficiary_bank_iban : JSON.parse(metaDetails).second_beneficiary_bank_account_number, JSON.parse(metaDetails).card_fees, JSON.parse(metaDetails).status, transactionid, JSON.parse(metaDetails).reason, JSON.parse(metaDetails).referenece) :
    //   JSON.parse(metaDetails).city == "CB" ?
    //     loadCBTransdetails(JSON.parse(metaDetails).recipient_amount, date, JSON.parse(metaDetails).second_beneficiary_name, transactionid)
    //     :
        loadTransdetails(JSON.parse(metaDetails).reference_no, JSON.parse(metaDetails).exchange_currency + " " + JSON.parse(metaDetails).recipient_amount, date, JSON.parse(metaDetails).second_beneficiary_name, JSON.parse(metaDetails).second_beneficiary_bank_account_number == '' ? JSON.parse(metaDetails).second_beneficiary_bank_iban : JSON.parse(metaDetails).second_beneficiary_bank_account_number, JSON.parse(metaDetails).card_fees, status, transactionid, JSON.parse(metaDetails).reason, JSON.parse(metaDetails).referenece)
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // const CCTransCreditDetails = async (uuid) => {
  //   setLoading(true)
  //   setType('CCTransCreditDetails');
  //   console.log(Constants.BASE_URL + 'API-FX-166-INBOUND-SENDER-DETAILS/' + uuid);
  //   console.log(Constants.SUBSCRIPTION_KEY);
  //   await axios.get(Constants.BASE_URL + 'API-FX-166-INBOUND-SENDER-DETAILS/' + uuid, {
  //     headers: {
  //       fx_key: Constants.SUBSCRIPTION_KEY
  //     }
  //   }).then(resp => {
  //     // console.log(JSON.parse(resp.data.payment_data).id);
  //     console.log(resp.data.data);
  //     if (Object.keys(resp.data.data).length > 0) {
  //       var senderdetails = (resp.data.data.sender).split(";");
  //       setAmount(resp.data.data.currency + " " + resp.data.data.amount)
  //       var creditdate = (resp.data.data.value_date).split(" ");
  //       if (creditdate.length > 1)
  //         creditdate = new Date(resp.data.data.value_date).split(" ")[0];
  //       else
  //         creditdate = new Date(resp.data.data.value_date);
  //       setDate(creditdate.getDate() + "-" + (+creditdate.getMonth() + 1) + "-" + creditdate.getFullYear())
  //       setBeneName(senderdetails[0])
  //     }
  //     else {
  //       toast.error('Sender details not found.')
  //       handleClose()
  //     }
  //     setLoading(false)
  //   }).catch(err => {
  //     var msg = "";
  //     if (err.response.data.message == 'Server Error')
  //       msg = "No data found";
  //     else
  //       msg = err.response.data;
  //     toast.error(msg);
  //     handleClose()
  //     setLoading(false);
  //   })
  // };

  // const CCTransDebitDetails = async (uuid) => {
  //   setLoading(true)
  //   setType('CCTransDebitDetails');
  //   var uu_id = uuid + ",";
  //   var uui = uu_id.split(",")[0];
  //   console.log(Constants.BASE_URL + 'API-FX-179-CC-TRANS-DETAILS/' + uui);
  //   await axios.get(Constants.BASE_URL + 'API-FX-179-CC-TRANS-DETAILS/' + uui, {
  //     headers: {
  //       fx_key: Constants.SUBSCRIPTION_KEY
  //     }
  //   }).then(resp => {
  //     // console.log(JSON.parse(resp.data.payment_data).id);
  //     console.log(resp.data);
  //     if (Object.keys(resp.data).length > 0) {
  //       // setRefId(JSON.parse(resp.data.payment_data).reference)
  //       settranstatus(JSON.parse(resp.data.payment_data).status);
  //       setAmount(JSON.parse(resp.data.payment_data).currency + " " + JSON.parse(resp.data.payment_data).amount)
  //       setDate(JSON.parse(resp.data.payment_data).payment_date)
  //       setBeneName(JSON.parse(resp.data.bene_data).bank_account_holder_name)
  //       setBeneBankName(JSON.parse(resp.data.bene_data).bank_name)
  //       setBeneBankNumber(JSON.parse(resp.data.bene_data).account_number)
  //       setBeneBankCodeType(JSON.parse(resp.data.bene_data).routing_code_type_1)
  //       setBeneBankCodeValue(JSON.parse(resp.data.bene_data).routing_code_value_1)
  //     }
  //     else {
  //       toast.error('Details not found.')
  //       handleClose()
  //     }
  //     setLoading(false)
  //   }).catch(err => {
  //     var msg = "";
  //     if (err.response.data.message == 'Server Error')
  //       msg = "No data found";
  //     else
  //       msg = err.response.data;
  //     toast.error(msg);
  //     handleClose()
  //     setLoading(false);
  //   })
  // };

  // const CBTransCreditDetails = async (amount, date, beneName) => {
  //   setLoading(false)
  //   setType('CBTransCreditDetails');
  //   setAmount(amount);
  //   setDate(date);
  //   setBeneName(beneName);
  // };

  const TransDebitDetails = async (ref, amount, paymentDate, beneName, beneAccount, card_fees, status, reason) => {
    setLoading(true)
    setType('TransDebitDetails');
    setAmount(amount);
    setDate(paymentDate);
    setBeneName(beneName);
    setcardFees(card_fees)
    setBeneBankNumber(beneAccount)
    setStatus(status)
    setReason(reason)
    setLoading(false);
  }
  const handleFileChange = (event, index) => {
    const selectedFiles = event.target.files;
    setFiles((prevFiles) => ({
      ...prevFiles,
      [index]: selectedFiles,  // Update the state for the specific input field
    }));
  };
  const handleSingleFileChange = (event) => {
    setFile(event.target.files[0])
  };
  const getBase64 = async (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  function handleSubmit() {
    if (file != null && file != '') {
      setUploading(true)
      getBase64(file, (result) => {
        uploadSingleDocument(result)
      });
    }
    else
      toast.error('Please upload file.')
  }

  const uploadSingleDocument = async (document) => {
    const token = sessionStorage.getItem('login_token');
    var extension = (file.name).split(".");
    console.log(extension[extension.length - 1]);
    await axios.post(Constants.BASE_URL + 'API-FX-195-UPLOAD-USER-TRANSACTION-DOCUMENTS', {
      document: document,
      transaction_id: transactionId,
      notes: notes == '' || notes == null ? 'NA' : notes,
      extension: extension[extension.length - 1]
    }, {
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
        fx_key: Constants.SUBSCRIPTION_KEY
      }
    }).then((response) => {
      console.log(response.data);
      toast.success('Uploaded Successfully.')
      setUploading(false)
      handleClose()
    }).catch(err => {
      err
      toast.error('Something went wrong.Please try again later.')
      setUploading(false)
    });
  }

  const handleUpload = (transaction_id) => {
    var counter = 1;
    Object.keys(files).forEach((index) => {
      const reader = new FileReader();
      Array.from(files[index]).forEach(async (file) => {
        reader.onloadend = () => {
          setUploading(true)
          uploadDocument(transaction_id, documents[transaction_id][index]['document_id'], reader.result, file.name, counter)
          counter++;
        };
        reader.readAsDataURL(file);
      });
    });
  };

  const uploadDocument = async (transaction_id, document_id, document, filename, counter) => {
    var extension = filename.split(".");
    console.log(extension[extension.length - 1]);
    const token = sessionStorage.getItem('login_token');
    await axios.post(Constants.BASE_URL + 'API-FX-194-UPLOAD-TRANSACTION-DOCUMENTS', {
      transaction_id: transaction_id,
      document_id: document_id,
      document: document,
      extension: extension[extension.length - 1]
    }, {
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
        fx_key: Constants.SUBSCRIPTION_KEY
      }
    }).then(resp => {
      console.log("uploaded" + resp);

      console.log(counter);
      console.log(documents[transaction_id].length);
      if (counter == documents[transaction_id].length) {
        toast.success('Uploaded Successfully.')
        setUploading(false)
        location.reload();
      }
    }).catch(err => {
      toast.error('Something went wrong.Please try again later.')
      console.log("error" + err);

    })
  }
  const downloadStatement = async () => {
    if (fromdate == "" || fromdate == null || todate == "" || todate == null) {
      toast.error('Please select from date and to date');
    }
    else {
      setdownloadLoading(true)
      const login_workspaces_id = sessionStorage.getItem('login_workspaces_id');
      if (filtercurrency == '' || filtercurrency == null) {
        await axios.post(Constants.BASE_URL + 'API-FX-203-DOWNLOAD-TRANSACTION-STATEMENT', {
          "start_date": fromdate,
          "end_date": todate,
          "workspace_id": login_workspaces_id
        }, {
          headers: {
            'Content-Type': 'application/json',
            'fx_key': Constants.SUBSCRIPTION_KEY
          }
        }).then(resp => {
          window.open(JSON.parse(resp.data.document).url, "_blank");
          // handleDownload(JSON.parse(resp.data.document).url,"transaction_statement.pdf")
          setdownloadLoading(false)
          setshowdownload(false)
        }).catch(err => {
          setdownloadLoading(false)
          console.log(err.response.data);
        })
      }
      else {
        await axios.post(Constants.BASE_URL + 'API-FX-204-DOWNLOAD-TRANSACTION-CURRENCY-STATEMENT', {
          "start_date": fromdate,
          "end_date": todate,
          "workspace_id": login_workspaces_id,
          "currency": filtercurrency
        }, {
          headers: {
            'Content-Type': 'application/json',
            'fx_key': Constants.SUBSCRIPTION_KEY
          }
        }).then(resp => {
          window.open(JSON.parse(resp.data.document).url, "_blank");
          // handleDownload(JSON.parse(resp.data.document).url,"transaction_statement.pdf")
          setdownloadLoading(false)
          setshowdownload(false)
        }).catch(err => {
          setdownloadLoading(false)
          console.log(err.response.data);
        })
      }


    }
  }
  const openTransactions = async () => {
    navigate('/FilteredTransaction', { state: { transId: transactionIds } })
  }
  const downloadReceipt = async (id) => {
    setdownloadId(id)
    const login_workspaces_id = sessionStorage.getItem('login_workspaces_id');
    await axios.post(Constants.BASE_URL + 'API-FX-208-DOWNLOAD-TRANSACTION-RECEIPT', {
      "id": id,
      "workspace_id": login_workspaces_id
    }, {
      headers: {
        'Content-Type': 'application/json',
        'fx_key': Constants.SUBSCRIPTION_KEY
      }
    }).then(resp => {
      window.open(JSON.parse(resp.data.document).url, "_blank");
      setdownloadId(0)
    }).catch(err => {
      setdownloadId(0)
      console.log(err.response);
    })
  }
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
        <div className="flex items-center justify-between p-4 bg-white">

          <div className="flex items-center">

            {/* Chevron Icon */}
            <button
              onClick={handleClose}
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

            {/* Profile and Beneficiary Info */}
            <img
              src="https://avataaars.io/?avatarStyle=Circle" // Replace with the actual profile image URL
              alt="Profile"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <div className="text-lg font-semibold text-gray-900">{beneName}</div>
              <div className="text-sm text-gray-600">Sent on: {date}</div>
            </div>
          </div>


          <div className="flex items-center space-x-4">
            {/* <button className="px-4 py-2 text-sm font-medium text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-100">
      Download
    </button> */}
            <div className="flex items-center space-x-1">
              <span className="text-2xl font-bold text-[#73AF00] mr-4">{amount}</span>
              {/* <span className="text-sm font-medium text-gray-700">{status}</span> */}
            </div>
          </div>
        </div>



        <div>
          {loading && (<div className='mx-5'>loading...</div>)}
          {(settype == 'CCTransCreditDetails' || settype == 'CBTransCreditDetails') && !loading ?
            <table className="w-full text-sm m-6 text-left border border-gray-200 border-collapse">
              <tbody>
                <tr className="border-b-[3px] border-[#B7B7B7]">
                  <td className="px-4 py-2 text-base font-bold text-[#205FFF]">Transaction Details</td>
                </tr>
                <tr className="border-b-[3px] border-[#B7B7B7]">
                  <td className="w-[30%] border-r border-[#B7B7B7] px-4 py-2 text-base font-normal text-gray-600">Receiving Amount</td>
                  <td className="w-[70%] px-4 py-2 font-bold text-base text-gray-900">{amount}</td>
                </tr>
                <tr className="border-b-[3px] border-[#B7B7B7]">
                  <td className="w-[30%] border-r border-[#B7B7B7] px-4 py-2 text-base font-normal text-gray-600">Date</td>
                  <td className="w-[70%] px-4 py-2 font-bold text-base text-gray-900">{date}</td>
                </tr>
              </tbody>
            </table>

            :
            settype == 'CCTransDebitDetails' && !loading ?
              <table className="w-full text-sm text-left m-6 border border-gray-200 border-collapse">
                <tbody>
                  <tr className="border-b-[3px] border-[#B7B7B7]">
                    <td className="px-4 py-2 text-base font-bold text-[#205FFF]">Transaction Details</td>
                  </tr>
                  <tr className="border-b-[3px] border-[#B7B7B7]">
                    {/* <th scope="col" className="px-4 py-6">Reference Id</th> */}
                    <td className="w-[30%] border-r border-[#B7B7B7] px-4 py-2 text-base font-normal text-gray-600">Send Amount</td>
                    <td className="w-[70%] px-4 py-2 font-bold text-base text-gray-900">{amount}</td>
                  </tr>
                  <tr className="border-b-[3px] border-[#B7B7B7]">
                    <td className="w-[30%] border-r border-[#B7B7B7] px-4 py-2 text-base font-normal text-gray-600">Date</td>
                    <td className="w-[70%] px-4 py-2 font-bold text-base text-gray-900">{date}</td>
                  </tr>
                  {/* <tr className="border-b-[3px] border-[#B7B7B7]">
                    <td className="w-[30%] border-r border-[#B7B7B7] px-4 py-2 text-base font-normal text-gray-600">Beneficiary Bank Name</td>
                    <td className="w-[70%] px-4 py-2 font-bold text-base text-gray-900">{beneBankName}</td>
                  </tr> */}
                  <tr className="border-b-[3px] border-[#B7B7B7]">
                    <td className="w-[30%] border-r border-[#B7B7B7] px-4 py-2 text-base font-normal text-gray-600">Beneficiary Account Number</td>
                    <td className="w-[70%] px-4 py-2 font-bold text-base text-gray-900">{beneBankNumber}</td>
                  </tr>
                  {/* <tr className="border-b-[3px] border-[#B7B7B7]">
                    <td className="w-[30%] border-r border-[#B7B7B7] px-4 py-2 text-base font-normal text-gray-600">Routing Code Type</td>
                    <td className="w-[70%] px-4 py-2 font-bold text-base text-gray-900">{beneBankCodeType}</td>
                  </tr> */}
                  {/* <tr className="border-b-[3px] border-[#B7B7B7]">
                    <td className="w-[30%] border-r border-[#B7B7B7] px-4 py-2 text-base font-normal text-gray-600">Routing Code Value</td>
                    <td className="w-[70%] px-4 py-2 font-bold text-base text-gray-900">{beneBankCodeValue}</td>
                  </tr> */}
                  {/* <tr className="border-b border-[#B7B7B7]">
                    <td className="w-[30%] border-r border-[#B7B7B7] px-4 py-2 text-base font-normal text-gray-600">Status</td>
                    <td className="w-[70%] px-4 py-2 font-bold text-base text-gray-900 text-[#73AF00]">{transtatus}</td>
                  </tr> */}
                </tbody>

              </table>
              :
              settype == 'TransDebitDetails' && !loading ?
                <table className="w-full text-sm m-6 text-left border border-gray-200 border-collapse">
                  <tbody>
                    <tr className="border-b-[3px] border-[#B7B7B7]">
                      <td className="px-4 py-2 text-base font-bold text-[#205FFF]">Transaction Details</td>
                    </tr>
                    <tr className="border-b-[3px] border-[#B7B7B7]">
                      <td className="w-[30%] border-r border-[#B7B7B7] px-4 py-2 text-base font-normal text-gray-600">Send Amount</td>
                      <td className="w-[70%] px-4 py-2 font-bold text-base text-gray-900">{amount}</td>
                    </tr>
                    {cardFees != "" && cardFees != null ?
                      <tr className="border-b-[3px] border-2 border-[#B7B7B7]">
                        <td className="w-[30%] border-r border-[#B7B7B7] px-4 py-2 text-base font-normal text-gray-600">Fees</td>
                        <td className="w-[70%] px-4 py-2 font-bold text-base text-gray-900">GBP {cardFees}</td>
                      </tr> : ""}
                    <tr className="border-b-[3px] border-2 border-[#B7B7B7]">
                      <td className="w-[30%] border-r border-[#B7B7B7] px-4 py-2 text-base font-normal text-gray-600">Date</td>
                      <td className="w-[70%] px-4 py-2 font-bold text-base text-gray-900">{date}</td>
                    </tr>
                    {beneBankNumber != "" && beneBankNumber != null ?
                      <tr className="border-b-[3px] border-2 border-[#B7B7B7]">
                        <td className="w-[30%] border-r border-[#B7B7B7] px-4 py-2 text-base font-normal text-gray-600">Beneficiary Account Number</td>
                        <td className="w-[70%] px-4 py-2 font-bold text-base text-gray-900">{beneBankNumber}</td>
                      </tr> : ""}
                    <tr className="border-b-[3px] border-2 border-[#B7B7B7]">
                      <td className="w-[30%] border-r border-[#B7B7B7] px-4 py-2 text-base font-normal text-gray-600">Status</td>
                      <td className="w-[70%] px-4 py-2 font-bold text-base text-gray-900 text-[#73AF00]">{status}</td>
                    </tr>
                    <tr className="border-b border-[#B7B7B7]">
                      <td className="w-[30%] border-r border-[#B7B7B7] px-4 py-2 text-base font-normal text-gray-600">Reference</td>
                      <td className="w-[70%] px-4 py-2 font-bold text-base text-gray-900">{reason} <br />
                        {transactionIds.length > 0 &&
                          <PrimaryButton
                            label={"View Transactions"}
                            onClick={() => openTransactions()}
                            style={{ width: 145 }}
                          />}</td>
                    </tr>
                  </tbody>
                </table>
                // <table className="w-full text-sm text-center">
                //   <thead className="border-b-2">
                //     <tr>
                //       {/* <th scope="col" className="px-4 py-6">Reference Id</th> */}
                //       <th scope="col" className="px-4 py-6">Send Amount</th>
                //       {cardFees != "" && cardFees != null ?
                //         <th scope="col" className="px-4 py-6">Fees</th> : ""}
                //       <th scope="col" className="px-4 py-6">Date</th>
                //       <th scope="col" className="px-4 py-6">Beneficiary Name</th>
                //       {beneBankNumber != "" && beneBankNumber != null ?
                //         <th scope="col" className="px-4 py-6">Beneficiary Account Number</th> : ""}
                //       <th scope="col" className="px-4 py-6">Status</th>
                //       <th scope="col" className="px-4 py-6">Reason</th>
                //     </tr>
                //   </thead>
                //   <tbody className="table-striped">

                //     <tr>
                //       {/* <td scope="col" className="px-4 py-6">{paramsdata.ref}</td> */}
                //       <td scope="col" className="px-4 py-6">{amount}</td>
                //       {cardFees != "" && cardFees != null ?
                //         <td scope="col" className="px-4 py-6">GBP {cardFees}</td> : ""}
                //       <td scope="col" className="px-4 py-6">{date}</td>
                //       <td scope="col" className="px-4 py-6">{beneName}</td>
                //       {beneBankNumber != "" && beneBankNumber != null ?
                //         <td scope="col" className="px-4 py-6">{beneBankNumber}</td> : ""}
                //       <td scope="col" className="px-4 py-6">{status}</td>
                //       <td scope="col" className="px-4 py-6">{reason}
                //         <br />
                //         {transactionIds.length > 0 &&
                //           <PrimaryButton
                //             label={"View Transactions"}
                //             onClick={() => openTransactions()}
                //             style={{ width: 145 }}
                //           />}

                //       </td>
                //     </tr>
                //   </tbody>
                // </table>
                : ""}
          {!loading && (<><div className='border-b border-t border-gray-200 p-6'>
            <h2 className='font-bold text-lg'>Notes & Attachments</h2>

          </div>
            <div className='m-6'>
              <textarea rows="4" className="mt-2 border border-[#DEDCE1] w-full p-2 placeholder:text-sm placeholder:font-bold placeholder:text-black" placeholder='Notes' onChange={(text) => setNotes(text.target.value)} />
              <div className="grid grid-cols-2 w-full p-4 border-2 border-dashed rounded-lg border-gray-300 bg-gray-50">
                {/* Icon Column */}
                <div className="flex items-center justify-end pr-4">
                  <img src="file-icon.jpeg" alt="Upload Icon" className="w-12 h-12" />
                </div>

                {/* Text Column */}
                <div className="flex flex-col items-start justify-center pl-4">
                  <label
                    htmlFor="file-upload"
                    className="text-sm font-medium text-blue-500 cursor-pointer"
                  >
                    Upload Attachment
                  </label>
                  <p className="mt-1 text-xs text-gray-500">
                    Jpg, pdf or Png (max. 50mb)
                  </p>
                  <input
                    id="file-upload"
                    type="file"
                    onChange={handleSingleFileChange}
                    className="hidden"
                  />
                  {/* Display File Name */}
                  {file && (
                    <p className="mt-2 text-sm text-green-500 font-medium">
                      Uploaded: {file.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Button Row */}
              <div className="flex justify-center mt-4">
                <button
                  className="w-40 px-6 py-2 mr-4 border border-[#205fff] text-[#205fff] font-medium rounded-lg hover:bg-blue-50"
                >
                  Cancel
                </button>
                <button
                  className="w-40 px-6 py-2 bg-[#205fff] text-white font-medium rounded-lg hover:bg-blue-600"
                  onClick={() => handleSubmit()} loading={uploading}
                >
                  Save
                </button>
              </div>

            </div></>)
          }




          {/* <table className="w-1/2 text-sm text-center">
              <tr><th>Transaction Id for Charges</th><th>Action</th></tr>
              {transactionIds.length > 0 && transactionIds.map((transid, index) => {
                return (
                  <tr key={index}>
                    <td><button>{transid}</button></td>
                    <td><button>View Details</button></td>
                  </tr>
                )
              })}
            </table> */}

          {uploadedDocuments.length > 0 && !loading && (
            <>
              <div className='font-bold mx-5'>
                Uploaded Documents
              </div>
              <table className="w-full text-sm text-center">
                <thead className="border-b-2">
                  <tr><th>Sno</th><th>Notes</th><th>Document</th></tr>
                </thead>
                {uploadedDocuments.map((document, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{document.notes}</td>
                      <td><a rel="noopener noreferrer" target='_blank' href={Constants.FILE_PATH_BASE_URL + document.document}> View Document</a></td>
                    </tr>
                  )
                })}
              </table></>)}
        </div>
      </div>
      <div className="flex items-center justify-between py-4 mb-4">
        <div className="flex items-center ml-7">
          <span className="font-bold text-lg">{filtercurrency} Transactions</span>
          <div className="relative">
            {/* <input
                      type="text"
                      placeholder="Search Transaction"
                      value={searchText}
                      onChange={handleSearch}
                      className="pl-4 pr-10 py-2 ml-8 text-sm border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[#f8f7f6] placeholder:text-[#303644]"
                    />
                    <FiSearch className="absolute top-2.5 right-4 text-[#303644]" /> */}
          </div>
        </div>
        <div className="flex space-x-4">
          {!showdownload ?
            <button onClick={() => setshowdownload(true)} className="border border-[#205fff] text-[#205fff] px-6 py-2 rounded-lg mx-2">Download Statement</button>
            :
            <div className='flex'>
              From Date: <input type='date' onChange={(e) => setFromdate(e.target.value)} className="w-full p-2 outline-none rounded-2xl bg-custom-gray-light placeholder:text-custom-neutral-900 placeholder:text-sm mx-3" />
              To Date: <input type='date' onChange={(e) => setTodate(e.target.value)} className="w-full p-2 outline-none rounded-2xl bg-custom-gray-light placeholder:text-custom-neutral-900 placeholder:text-sm mx-3" />
              <button onClick={downloadStatement} className="border border-[#205fff] text-[#205fff] px-6 py-2 rounded-lg mx-2">
                {downloadLoading ? 'Downloading...' : 'Download'}
              </button>
            </div>
          }
          {/* <Link to="/convert" className="border border-[#1152BE] text-[#1152BE] px-6 py-2 rounded-lg">Filters</Link> */}
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
          <table className="w-full text-sm text-left rounded-md border-2 border-gray-200">
            <thead className="border-b-2">
              <tr>
                <th scope="col" className="px-4 py-6">Transaction ID</th>
                <th scope="col" className="px-4 py-6">Date & Time</th>
                <th scope="col" className="px-4 py-6">Account Name</th>
                <th scope="col" className="px-4 py-6">Amount</th>
                {/* <th scope="col" className="px-4 py-6">Receiving Amount</th> */}
                <th scope="col" className="px-4 py-6">Reference</th>
                <th scope="col" className="px-4 py-6">Upload Documents</th>
                <th scope="col" className="px-4 py-6">Status</th>
                <th scope="col" className="px-4 py-6">Details</th>
                <th scope="col" className="px-4 py-6"></th>
              </tr>

              <tr>
                <th scope="col" className="px-4 py-6">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchText.transactionId}
                    onChange={(text) => { setSearchText({...searchText, transactionId: text.target.value }); }}
                    style={{ width: 150, maxWidth: 150 }}
                    className="pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white placeholder:text-[#303644]"
                  />
                </th>
                <th scope="col" className="px-4 py-6">
                  <input
                    type="date"
                    placeholder="Search"
                    value={searchText.date}
                    onChange={(text) => { setSearchText({...searchText, date: text.target.value }); }}
                    style={{ width: 150, maxWidth: 150 }}
                    className="pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white placeholder:text-[#303644]"
                  />
                </th>
                <th scope="col" className="px-4 py-6">

                  <input
                    type="text"
                    placeholder="Search"
                    value={searchText.sender}
                    onChange={(text) => { setSearchText({...searchText, sender: text.target.value }); }}
                    style={{ width: 150, maxWidth: 150 }}
                    className="pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white placeholder:text-[#303644]"
                  />

                </th>
                <th scope="col" className="px-4 py-6">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchText.sendingAmount}
                    onChange={(text) => { setSearchText({...searchText, sendingAmount: text.target.value }); }}
                    style={{ width: 150, maxWidth: 150 }}
                    className="pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white placeholder:text-[#303644]"
                  />
                </th>
                <th scope="col" className="px-4 py-6"></th>
                {/* <th scope="col" className="px-4 py-6">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchText.receivingAmount}
                    onChange={(text) => { setSearchText({...searchText, receivingAmount: text.target.value }); }}
                    style={{ width: 150, maxWidth: 150 }}
                    className="pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white placeholder:text-[#303644]"
                  />
                </th> */}
                <th scope="col" className="px-4 py-6"></th>
                <th scope="col" className="px-4 py-6">
                  <select style={{ width: 150, maxWidth: 150 }}
                    className="pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white placeholder:text-[#303644]" onChange={(text)=>{
                      if(text.target.value=='FEES')
                      {
                        setSearchText({...searchText, sender: "Fee" });
                      }
                      else
                      {
                        setSearchText({...searchText, status: text.target.value });
                        if(searchText.sender=="Fee")
                        {
                          setSearchText({...searchText, sender: "" });
                        }
                      }
                      }}>
                      <option key={0} value={""}>Select</option>
                      {Constants.TRANSACTION_STATUS.map((status,index)=>{
                        return(
                          <option key={index}>{status?.toUpperCase()}</option>
                        )
                      })}
                  </select>
                </th>
                <th scope="col" className="px-4 py-6">
                <button className="view-details-btn font-semibold rounded-full text-white px-4 py-2 mx-2 whitespace-nowrap" onClick={handleSearch}>Search
                </button>
                </th>
                <th scope="col" className="px-4 py-6">
                    <button className="view-details-btn font-semibold rounded-full text-white px-4 py-2 whitespace-nowrap" onClick={reset}>Reset
                    </button>
                </th>
              </tr>

            </thead>
            <tbody className="table-striped">
              {transactions.map((beneficiary) => {
                const meta = JSON.parse(beneficiary.meta);
                const senderName = beneficiary.type == 'debit' ? meta.second_beneficiary_name : meta.sender_name;
                var splittedSender;
                beneficiary.settled_currency == 'EUR' ?
                  splittedSender = senderName.split(";")
                  :
                  splittedSender = senderName.split(";;")
                // const receivingAmount = meta.recipient_amount || "N/A";
                // const receivingCurrency = meta.exchange_currency || "N/A";
                const color = beneficiary.type === 'debit' ? 'bg-gray-400 text-black' : 'bg-green-100 text-green-500';
                const rowColor = beneficiary.id in documents && documents[beneficiary.id].map((resp) => {
                  return (
                    (resp.uploaded_document == "" || resp.uploaded_document == null) ?
                      'bg-red-100' : ""
                  )
                })
                return (
                  <>
                    <tr key={beneficiary.id} className={`${rowColor}`}>
                      <td scope="row" className="px-6 py-4 font-bold whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${color}`}>
                            {beneficiary.type == 'debit' ?
                              <FiArrowUpRight fontSize="25px" />
                              :
                              beneficiary.type == null || beneficiary.type == "" || beneficiary.type == "individual" ?
                                <MdOutlineCurrencyExchange fontSize="25px" />
                                :
                                <FiArrowDownLeft fontSize="25px" />
                            }
                          </div>

                          <div>
                            <span className="text-[#205FFF]">{beneficiary.id}</span>
                            <div className="border-b-2 border-[#205FFF]"></div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4 font-bold">{new Date(beneficiary.created_at).getDate() + "-" + (new Date(beneficiary.created_at).getMonth() + 1) + "-" + new Date(beneficiary.created_at).getFullYear() + " " + new Date(beneficiary.created_at).toLocaleTimeString()}</td>
                      <td className="px-4 py-4 font-bold">{splittedSender[0]}</td>
                      <td className="px-4 py-4 font-bold">{getCurrencySymbol(beneficiary.settled_currency)} {numberWithCommas(parseFloat(beneficiary.amount).toFixed(2))}</td>
                      {/* <td
                        className="px-4 py-4 font-bold">{receivingAmount && getCurrencySymbol(receivingCurrency)} {numberWithCommas(parseFloat(receivingAmount).toFixed(2))}
                      </td> */}
                      <td className="px-4 py-4 font-bold">{meta.reference ?? meta.reason}</td>
                      <td className="px-4 py-4 font-bold">

                        {beneficiary.id in documents ?
                          <>
                            <div className="whitespace-wrap flex">
                              {documents[beneficiary.id].map((resp, index) => {
                                return (
                                  <div key={index} className='mx-2 my-2'>
                                    {resp.uploaded_document == '' || resp.uploaded_document == null ?
                                      (<div style={{ borderWidth: 1, borderStyle: 'dashed', borderColor: '#1152BE', borderRadius: 5, padding: 7, cursor: 'pointer', width: 220, fontWeight: 'bold' }}>
                                        {"Upload " + resp.document}
                                        <input
                                          type="file"
                                          style={{ fontWeight: 'normal' }}
                                          id={resp.document + beneficiary.id}
                                          onChange={(event) => handleFileChange(event, index)}
                                        />
                                      </div>) : ''}

                                  </div>
                                )
                              })}
                            </div>
                            {beneficiary.documentuploaded == 1 ?
                              <PrimaryButton
                                label={"Submit"}
                                onClick={() => handleUpload(beneficiary.id)}
                                loading={uploading}
                              /> : ""
                            }
                          </> : ""}

                      </td>
                      <td className="px-4 py-4 font-bold">{beneficiary.status}</td>
                      <td className="px-4 py-4">
                        <button className="view-details-btn font-semibold rounded-full text-white px-4 py-2 whitespace-nowrap" onClick={() => { navigatetotransaction(beneficiary.payment_method, beneficiary.meta, new Date(beneficiary.created_at).getDate() + "-" + (new Date(beneficiary.created_at).getMonth() + 1) + "-" + new Date(beneficiary.created_at).getFullYear(), beneficiary.type, beneficiary.id, beneficiary.status) }}>View Details</button>
                      </td>
                      <td className="px-4 py-4">
                        <button className="border border-[#1152BE] text-[#1152BE] px-6 py-2 rounded-lg mx-2" onClick={() => { downloadReceipt(beneficiary.id) }}>

                          {downloadId == beneficiary.id ? 'Downloading...' : 'Download'}

                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </InfiniteScroll>
        {loading &&
          (<div className="w-full mt-6">
            <div className="flex justify-center items-center h-5 pb-6">
              <p>Loading transactions...</p>
            </div>
          </div>)}
        {!loading &&
          (<div className="w-full mt-6">
            <div className="flex justify-center items-center h-5 pb-6">
              <button onClick={() => getData(currentPage)}>Load More...</button>
            </div>
          </div>)}
      </div>
    </div>
  );
}

export default Transaction;