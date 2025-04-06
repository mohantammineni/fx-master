import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Constants } from '../lib/const/constants';
import { PrimaryButton } from '../components/button';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from 'react-paginate';
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import getCurrencySymbol from '../lib/currenyUtils';

function BulkUpload() {
    const navigate = useNavigate();
    const [file, setFile] = useState()
    const [uploading, setUploading] = useState(false);
    const [fileName, setfileName] = useState("");
    // const [loading, setLoading] = useState(false);
    const [transactions, settransactions] = useState([]);
    const [showOverView, setshowOverView] = useState(false);
    const [totalRecords, settotalRecords] = useState();
    const [totalPayment, settotalPayment] = useState();
    const [uniqueId, setuniqueId] = useState();
    const reference = useRef(null);
    const [balanceLoading, setBalanceLoading] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [downloadLoading, setDownloadLoading] = useState(false);
    const [downloadId, setDownloadId] = useState();
    const [usedBalances, setUsedBalances] = useState([]);
    const [clearBankBalance, setclearBankBalance] = useState(0.00);
    const [currencyCloudBalance, setcurrencyCloudBalance] = useState(0.00);
    const [bulkUploadDocuments, setBulkUploadDocuments] = useState([]);
    const [availableBalances, setAvailableBalances] = useState(0);
    const [isUploadProceedDisabled, setIsUploadProceedDisabled] = useState(false);
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [dropDownStatus,setDropDownStatus] = useState('All');
    const [clearBankConfiguration, setclearBankConfiguration] = useState();

    const getBalances = async () => {
        console.log("loaded");
        console.log(balanceLoading)
        if (balanceLoading) return;
        setBalanceLoading(true);
        const login_workspaces_id = sessionStorage.getItem('login_workspaces_id');
        const login_token = sessionStorage.getItem('login_token');
        if (!login_workspaces_id) {
            const staff_login_id = sessionStorage.getItem('staff_login_id');
            if (staff_login_id === '' || staff_login_id == null) {
                navigate('/business');
            }
            else {
                navigate('/DebitTransactions')
            }
        } else {
            try {
                var balanceUrl = Constants.BASE_URL + 'API-FX-161-BALANCES/' + login_workspaces_id + '?currency=GBP';
                const resp = await axios.get(balanceUrl, {
                    headers: {
                        Authorization: "Bearer " + JSON.parse(login_token),
                        fx_key: Constants.SUBSCRIPTION_KEY
                    }
                });
                const balArray = Object.values(resp.data);
                setUsedBalances(resp.data.used_balances)
                usedBalances
                balArray.pop();

                setcurrencyCloudBalance(resp.data.currency_cloud_account_balance)
                setclearBankBalance(resp.data.clear_bank_account_balance)
                setclearBankConfiguration(resp.data.fees_configuration)
                balArray.pop();
                balArray.pop();
                balArray.pop();
                console.log("clearbank"+clearBankBalance);
                console.log("currency"+currencyCloudBalance);
                console.log("clearBankConfiguration"+clearBankConfiguration);
                
                const gbpBalance = balArray.find(balance => balance.currency === 'GBP');
                let mainBalance;
                if (gbpBalance) {
                    mainBalance = gbpBalance.balance;
                } else {
                    mainBalance = 0;
                }

                setAvailableBalances(
                    parseFloat(mainBalance).toFixed(2) - parseFloat(resp.data.used_balances.GBP ? resp.data.used_balances.GBP : 0).toFixed(2) < 0
                        ? 0.00
                        : parseFloat(mainBalance - (resp.data.used_balances.GBP ? resp.data.used_balances.GBP : 0)).toFixed(2)
                )
                console.log("avail bal" + parseFloat(mainBalance).toFixed(2) - parseFloat(resp.data.used_balances.GBP ? resp.data.used_balances.GBP : 0).toFixed(2) < 0
                    ? 0.00
                    : parseFloat(mainBalance - (resp.data.used_balances.GBP ? resp.data.used_balances.GBP : 0)).toFixed(2));
            } catch (err) {
                console.log(err.response.data);
            } finally {
                setBalanceLoading(false);
            }
        }
    };
    useEffect(() => {
        getBalances();
    }, []);


    const handleSingleFileChange = (event) => {
        setFile(event.target.files[0])
        setfileName(event.target.files[0].name);
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
    function Items({ currentItems }) {
        Items.propTypes = {
            currentItems: PropTypes.any,
        };
        return (
            <>
                <div className='mt-10 mb-5 w-full align-center'>Uploaded Data</div>
                <table cellPadding={10} cellSpacing={10} className='w-full bg-[#ffffff]' >
                    {currentItems &&
                        currentItems.map((item, index) => {
                            return (
                                <>
                                    {index == 0 &&
                                        <tr style={{ borderWidth: 2, borderColor: '#1152BE', fontSize: 12, borderRadius: 10 }} key={index} className='text-sm'><td>Type</td><td>First Name</td><td>Last Name</td><td>Reason</td><td>Amount</td><td>Mobile</td><td>Country Name</td><td>Code Type</td><td>Account Name</td><td>Code</td><td>Account Number</td><td>Address</td><td>Company Name</td><td>Currency</td><td>DOB</td></tr>}
                                    <tr className='font-light text-sm' style={{ borderWidth: 2, borderColor: '#1152BE', fontSize: 12, borderRadius: 10 }} key={index + 1}>
                                        {item.map((row, rowindex) => {

                                            return (
                                                <td key={'row' + rowindex}>
                                                    {row}
                                                </td>
                                            )
                                        })}

                                    </tr>
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
        const currentItems = transactions.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(transactions.length / itemsPerPage);

        // Invoke when user click to request another page.
        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % transactions.length;
            console.log(
                `User requested page number ${event.selected}, which is offset ${newOffset}`
            );
            setItemOffset(newOffset);
        };
        return (
            <>
                <div className='flex w-full text-center' style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <h3 style={{ fontWeight: 'bold', fontSize: 20, marginRight: 40 }}>
                        Available Balance: {getCurrencySymbol('GBP')} {availableBalances}
                    </h3>
                    <h3 style={{ fontWeight: 'bold', fontSize: 20 }}>
                        Uploaded Amount: {getCurrencySymbol('GBP')} {parseFloat(totalPayment).toFixed(2)}
                    </h3>
                </div>
                <PrimaryButton
                    label={'Back'}
                    style={{ width: 100, position: 'absolute', right: 15, }}
                    onClick={navigateBack}
                />
                <Items currentItems={currentItems} />
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    className='flex w-full my-5'
                    pageLinkClassName='mx-10'
                    activeClassName='text-lg text-[#ffffff] bg-[#1152BE] rounded-lg'
                />
            </>
        );
    }
    const navigateBack = async () => {
        settransactions([]);
        setshowOverView(false);
    }

    const uploadSingleDocument = async (document) => {
        const token = sessionStorage.getItem('login_token');
        const staff_login_id = sessionStorage.getItem('staff_login_id');
        await axios.post(Constants.BASE_URL + 'API-FX-195-BULK-UPLOAD-DOCUMENTS-TRANSACTIONS', {
            file: document,
            fileName: fileName,
            staff_login_id: staff_login_id,
            currency_cloud_balance: currencyCloudBalance,
            clear_bank_balance: clearBankBalance,
            total_balance: availableBalances
        }, {
            headers: {
                Authorization: "Bearer " + JSON.parse(token),
                fx_key: Constants.SUBSCRIPTION_KEY
            }
        }).then((response) => {
            console.log(response.data);
            if (response.data.status == 200) {
                settransactions(response.data.uploaded_transactions)
                settotalRecords(response.data.totalTransactions)
                settotalPayment(response.data.totalAmount)
                setuniqueId(response.data.uniqueId)
                if (response.data.totalAmount > availableBalances) {
                    setIsUploadProceedDisabled(true);
                    toast.error("Insufficient funds to complete the bulk upload. Please add funds to proceed.");
                }
            }
            else {
                toast.error(response.data.message)
            }
            // toast.success('Uploaded Successfully.')
            setUploading(false)
            reference.current.value = "";
        }).catch(err => {
            err
            toast.error('Something went wrong.Please try again later.')
            setUploading(false)
        });
    }
    function OverView() {
        return (
            <>
                <PrimaryButton
                    label={'Back'}
                    style={{ width: 100, float: 'right', marginBottom: 10 }}
                    onClick={navigateBack}
                />
                <table className='w-full bg-[#ffffff] my-10 rounded-lg' cellPadding={10} cellSpacing={10}>
                    <tr><td>Total Payments: </td><td>{totalRecords}</td></tr>
                    <tr><td>Total Amount: </td><td>{totalPayment}</td></tr>
                </table>
            </>
        )
    }
    const confirmUpload = async () => {
        setUploading(true)
        const token = sessionStorage.getItem('login_token');
        await axios.post(Constants.BASE_URL + 'API-FX-212-BULK-UPLOAD-CONFIRM', {
            uniqueId: uniqueId,
            fileName: fileName
        }, {
            headers: {
                Authorization: "Bearer " + JSON.parse(token),
                fx_key: Constants.SUBSCRIPTION_KEY
            }
        }).then(resp => {
            if (resp.data.status == '200') {
                toast.success(resp.data.message)
                setTimeout(function () {
                    navigate('/');
                }, 2000);
            }
            else
                toast.error(resp.data.message)
            setUploading(false)
        }).catch(err => {
            err
            toast.error('Something went wrong.Please try again later.')
            setUploading(false)
        })
    }
    const searchBulkUploadDocs = async () => {
        setSearchLoading(true)
        const login_token = sessionStorage.getItem('login_token');
        const login_workspaces_id = sessionStorage.getItem('login_workspaces_id');
        await axios.get(Constants.BASE_URL + 'API-FX-224-GET-BULK-UPLOAD-DOCUMENTS/' + login_workspaces_id+'?from_date='+fromDate+'&to_date='+toDate, {
            headers: {
                fx_key: Constants.SUBSCRIPTION_KEY,
                Authorization: "Bearer " + JSON.parse(login_token),
            }
        }).then(resp => {
            setBulkUploadDocuments(resp.data)
            setSearchLoading(false)
        }).catch(err => {
            console.log(err.response);
            setSearchLoading(false)
        })
    }
    const downloadDocument = async(id) =>{
        setDownloadLoading(true)
        setDownloadId(id)
        const login_token = sessionStorage.getItem('login_token');
        const login_workspaces_id = sessionStorage.getItem('login_workspaces_id');
        await axios.post(Constants.BASE_URL + 'API-FX-225-BULK-UPLOAD-TRANSACTION-DOWNLOAD/' + login_workspaces_id,{
            id:id,
            status:dropDownStatus
        }, {
            headers: {
                fx_key: Constants.SUBSCRIPTION_KEY,
                Authorization: "Bearer " + JSON.parse(login_token),
            }
        }).then(resp => {
            console.log(resp.data);
            setBulkUploadDocuments([])
            searchBulkUploadDocs()
            window.open(Constants.FXMASTER_BASE_URL+resp.data.path)
            setDownloadLoading(false)
        }).catch(err => {
            console.log(err.response);
            toast.error("No Data Found");
            setDownloadLoading(false)
        })
    }
    return (
        <div className="my-2">
            <ToastContainer />
            {transactions.length == 0 &&
                <div className="flex items-center justify-between py-4 mb-4">
                    <div className="flex items-center ml-7">
                        <span
                            className="font-medium text-lg border-l-4 border-l-[#F4CE14] pl-3">Bulk Upload</span>
                    </div>
                    <div className="flex space-x-4">
                        <a href='/testUpload.csv'>Download Test File</a>
                    </div>
                </div>}
            {transactions.length == 0 ?
                <div className="flex relative overflow-x-auto rounded-3xl bg-white p-5">
                    {balanceLoading ?
                        <>
                            <div className='w-full text-center'>loading....</div>
                        </>
                        :
                        <>
                            <div>
                                <input type='file' accept='.csv' ref={reference} onChange={(event) => handleSingleFileChange(event)} />
                            </div>
                            <div style={{ width: '10%' }}>
                                <PrimaryButton
                                    label={"Upload"}
                                    onClick={() => handleSubmit()}
                                    loading={uploading}
                                />
                            </div>
                        </>
                    }
                </div>
                :
                showOverView ?
                    <>
                        <OverView />
                    </>
                    :
                    <>
                        <PaginatedItems itemsPerPage={10} />
                    </>
            }
            <div className='w-full align-center text-center'>
                {transactions.length > 0 && (
                    showOverView ?
                        <PrimaryButton
                            label={'Confirm to upload'}
                            style={{ width: 200 }}
                            onClick={confirmUpload}
                            loading={uploading}
                        />
                        :
                        <PrimaryButton
                            label={'Proceed'}
                            isDisabled={isUploadProceedDisabled}
                            style={{ width: 100 }}
                            onClick={() => setshowOverView(true)}
                        />
                )}
            </div>



            {transactions.length == 0 &&
                <div className="relative overflow-x-auto rounded-3xl bg-white p-5 my-10">
                    <div className="flex items-center ml-7 my-10">
                        <span
                            className="font-medium text-lg border-l-4 border-l-[#F4CE14] pl-3">Download Bulk Upload Report</span>
                    </div>

                    <div className="flex items-center ml-7">
                        <span className="font-medium text-lg">
                            From Date:
                            <input
                                type='date'
                                onChange={(text) => setFromDate(text.target.value)}
                                value={fromDate}
                                className="p-2 outline-none rounded-2xl bg-custom-gray-light placeholder:text-custom-neutral-900 placeholder:text-sm mx-3"
                            />
                        </span>

                        <span className="font-medium text-lg">
                            To Date:
                            <input
                                type='date'
                                onChange={(text) => setToDate(text.target.value)}
                                value={toDate}
                                className="p-2 outline-none rounded-2xl bg-custom-gray-light placeholder:text-custom-neutral-900 placeholder:text-sm mx-3"
                            />
                        </span>

                        <PrimaryButton
                            label={'Search'}
                            style={{ width: 100 }}
                            loading={searchLoading}
                            onClick={searchBulkUploadDocs}
                        />
                    </div>

                    {bulkUploadDocuments.length > 0 &&
                        <table className="w-full text-sm text-center rounded-lg border-2 border-gray-200 my-10">
                            <thead className="border-b-2">
                            <tr>
                                <th scope="col" className="px-4 py-6">Sno</th>
                                <th scope="col" className="px-4 py-6">Document Name</th>
                                <th scope="col" className="px-4 py-6">Date</th>
                                <th scope="col" className="px-4 py-6">Action</th>
                            </tr>
                            </thead>
                            {bulkUploadDocuments.map((document, index) => {
                                return (
                                    <tr scope="row" className="px-6 py-4 font-bold whitespace-nowrap" key={index}>
                                        <td>{index + 1}</td>
                                        <td>{document.document}</td>
                                        <td>{new Date(document.created_at).getDate() + "-" + (new Date(document.created_at).getMonth()+1) + "-" + new Date(document.created_at).getFullYear()}</td>
                                        <td>
                                        <select className="p-2 outline-none rounded-2xl bg-custom-gray-light placeholder:text-custom-neutral-900 placeholder:text-sm mx-3" onChange={(e)=>setDropDownStatus(e.target.value)}>
                                        <option value={'all'}>All</option>
                                            {Constants.BULK_UPLOAD_TRANSACTION_STATUS.map((status,index)=>{
                                                return(<option key={index} value={status}>{status}</option>)
                                            })}
                                        </select>
                                        <PrimaryButton
                                        label={'Download'}
                                        style={{width:100}}
                                        loading={downloadId==document.id && downloadLoading}
                                        onClick={()=>downloadDocument(document.id)}
                                        />
                                    </td>
                                    </tr>
                                )
                            })}
                        </table>
                    }
                </div>
            }
        </div>
    );
}

export default BulkUpload;