import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Constants } from '../lib/const/constants';
import { useLocation } from 'react-router-dom';
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function ShowAccounts() {
    const location = useLocation();
    const paramsdata = location.state;
    const currency = paramsdata.currency;
    const accountName = paramsdata.accountName;

    const [loading, setLoading] = useState(false);
    const [accountDetails, setaccountDetails] = useState([]);
    const loadFundingAccountDetails = async () => {
        setLoading(true);
        const token = sessionStorage.getItem('login_token');
        const login_workspaces_id = sessionStorage.getItem('login_workspaces_id');
        await axios.get(Constants.BASE_URL + 'API-FX-213-GET-FUNDING-ACCOUNTS?currency=' + currency + '&workspace_id=' + login_workspaces_id, {
            headers: {
                fx_key: Constants.SUBSCRIPTION_KEY,
                Authorization: 'Bearer ' + JSON.parse(token),
            },
        }).then(resp => {
            console.log('preview response' + JSON.stringify(resp.data));
            setaccountDetails(resp.data);
            setLoading(false);
        }).catch(error => {
            console.log(error.response.data);
            toast.error(error.response.data.message);
            setLoading(false);
        });
    };
    useEffect(() => {
        loadFundingAccountDetails();
    }, []);
    return (
        <div className="my-2">
            <ToastContainer />
            <div className="bg-white rounded-3xl p-6 shadow-lg my-4">
                {
                    loading ?

                        <div className="text-center mt-4">
                            <p className="mb-2 font-semibold">loading...</p>
                        </div>
                        :
                        <>
                            <p className="mb-2 font-semibold text-center">Use the country of origin to choose the correct option for funding your account</p>

                            {accountDetails.length>0 && (accountDetails[0].account_meta).map((account, index) => {
                                return (
                                    <div className="text-left mt-4" key={index}>
                                        <p className="mb-2 font-semibold">{(account.payment_type).toUpperCase()} PAYMENT</p>
                                        <div className="bg-gray-100 rounded-lg mb-2">
                                            <div className='flex justify-between items-center p-4 '>
                                            <span className="font-semibold">Account Name:</span>
                                            <span>{accountName}</span>
                                            </div>

                                            <div className='flex justify-between items-center p-4 '>
                                            <span className="font-semibold">Currency:</span>
                                            <span>{currency}</span>
                                            </div>

                                            <div className='flex justify-between items-center p-4 '>
                                            <span className="font-semibold">{(((account.account_number_type).split("_")).join(" ")).toUpperCase()}:</span>
                                            <span>{account.account_number}</span>
                                            </div>

                                            <div className='flex justify-between items-center p-4 '>
                                            <span className="font-semibold">{(((account.routing_code_type).split("_")).join(" ")).toUpperCase()}:</span>
                                            <span>{account.routing_code}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </>

                }
            </div>
        </div>
    );
}

export default ShowAccounts;