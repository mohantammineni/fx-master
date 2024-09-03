import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Constants } from '../../lib/const/constants';

function CCTransDebitDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const paramsdata = location.state;
    const [refId, setRefId] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [beneName, setBeneName] = useState("");
    const [beneBankName, setBeneBankName] = useState("");
    const [beneBankNumber, setBeneBankNumber] = useState("");
    const [beneBankCodeType, setBeneBankCodeType] = useState("");
    const [beneBankCodeValue, setBeneBankCodeValue] = useState("");
    const [transtatus, settranstatus] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        setLoading(true)
        var uu_id = paramsdata.uuid + ",";
        var uui = uu_id.split(",")[0];
        console.log(Constants.BASE_URL + 'API-FX-179-CC-TRANS-DETAILS/' + uui);
        await axios.get(Constants.BASE_URL + 'API-FX-179-CC-TRANS-DETAILS/' + uui, {
            headers: {
                fx_key: Constants.SUBSCRIPTION_KEY
            }
        }).then(resp => {
            // console.log(JSON.parse(resp.data.payment_data).id);
            console.log(resp.data);
            if (Object.keys(resp.data).length > 0) {
                setRefId(JSON.parse(resp.data.payment_data).reference)
                settranstatus(JSON.parse(resp.data.payment_data).status);
                setAmount(JSON.parse(resp.data.payment_data).currency + " " + JSON.parse(resp.data.payment_data).amount)
                setDate(JSON.parse(resp.data.payment_data).payment_date)
                setBeneName(JSON.parse(resp.data.bene_data).bank_account_holder_name)
                setBeneBankName(JSON.parse(resp.data.bene_data).bank_name)
                setBeneBankNumber(JSON.parse(resp.data.bene_data).account_number)
                setBeneBankCodeType(JSON.parse(resp.data.bene_data).routing_code_type_1)
                setBeneBankCodeValue(JSON.parse(resp.data.bene_data).routing_code_value_1)
            }
            else {
                alert('Details not found.')
                navigate('/transactions');
            }
            setLoading(false)
        }).catch(err => {
            var msg = "";
            if (err.response.data.message == 'Server Error')
                msg = "No data found";
            else
                msg = err.response.data;
            alert(msg);
            navigate('/transactions');
            setLoading(false);
        })
    };


    return (
        <div className="my-2">
            <div className="flex items-center justify-between py-4 mb-4">
                <div className="flex items-center">
                    <p className="text-2xl font-semibold">Transactions Details</p>
                </div>
                <div className="flex space-x-4">
                    <button onClick={() => navigate("/transactions")}
                        className="bg-[#1152BE] border border-[#1152BE] text-white px-6 py-2 rounded-lg flex items-center text-base">
                        Go Back
                    </button>
                </div>
            </div>

            <div className="relative overflow-x-auto rounded-3xl bg-white">

                <table className="w-full text-sm text-left">
                    <thead className="border-b-2">
                        <tr>
                            <th scope="col" className="px-4 py-6">Reference Id</th>
                            <th scope="col" className="px-4 py-6">Send Amount</th>
                            <th scope="col" className="px-4 py-6">Date</th>
                            <th scope="col" className="px-4 py-6">Beneficiary Name</th>
                            <th scope="col" className="px-4 py-6">Beneficiary Bank Name</th>
                            <th scope="col" className="px-4 py-6">Beneficiary Account Number</th>
                            <th scope="col" className="px-4 py-6">Bank Routing Code Type</th>
                            <th scope="col" className="px-4 py-6">Bank Routing Code Value</th>
                            <th scope="col" className="px-4 py-6">Status</th>
                        </tr>
                    </thead>
                    <tbody className="table-striped">
                        {loading ?
                            <tr aria-colspan={3}>
                                <td scope="col" className="px-4 py-6">loading...</td>
                            </tr>
                            :
                            <tr>
                                <td scope="col" className="px-4 py-6">{refId}</td>
                                <td scope="col" className="px-4 py-6">{amount}</td>
                                <td scope="col" className="px-4 py-6">{date}</td>
                                <td scope="col" className="px-4 py-6">{beneName}</td>
                                <td scope="col" className="px-4 py-6">{beneBankName}</td>
                                <td scope="col" className="px-4 py-6">{beneBankNumber}</td>
                                <td scope="col" className="px-4 py-6">{beneBankCodeType}</td>
                                <td scope="col" className="px-4 py-6">{beneBankCodeValue}</td>
                                <td scope="col" className="px-4 py-6">{transtatus}</td>
                            </tr>}
                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default CCTransDebitDetails;