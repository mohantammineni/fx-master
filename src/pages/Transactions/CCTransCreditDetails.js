import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Constants } from '../../lib/const/constants';

function CCTransCreditDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const paramsdata = location.state;
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [beneName, setBeneName] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        setLoading(true)
        console.log(Constants.BASE_URL + 'API-FX-166-INBOUND-SENDER-DETAILS/' + paramsdata.id);
        console.log(Constants.SUBSCRIPTION_KEY);
        await axios.get(Constants.BASE_URL + 'API-FX-166-INBOUND-SENDER-DETAILS/' + paramsdata.id, {
            headers: {
                fx_key: Constants.SUBSCRIPTION_KEY
            }
        }).then(resp => {
            // console.log(JSON.parse(resp.data.payment_data).id);
            console.log(resp.data.data);
            if (Object.keys(resp.data.data).length > 0) {
                var senderdetails = (resp.data.data.sender).split(";");
                setAmount(resp.data.data.currency + " " + resp.data.data.amount)
                var creditdate = (resp.data.data.value_date).split(" ");
                if (creditdate.length > 1)
                    creditdate = new Date(resp.data.data.value_date).split(" ")[0];
                else
                    creditdate = new Date(resp.data.data.value_date);
                setDate(creditdate.getDate() + "-" + (+creditdate.getMonth() + 1) + "-" + creditdate.getFullYear())
                setBeneName(senderdetails[0])
            }
            else {
                alert('Sender details not found.')
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
                            <th scope="col" className="px-4 py-6">Receiving Amount</th>
                            <th scope="col" className="px-4 py-6">Date</th>
                            <th scope="col" className="px-4 py-6">Sender Name</th>
                        </tr>
                    </thead>
                    <tbody className="table-striped">
                        {loading ?
                            <tr aria-colspan={3}>
                                <td scope="col" className="px-4 py-6">loading...</td>
                            </tr>
                            :
                            <tr>
                                <td scope="col" className="px-4 py-6">{amount}</td>
                                <td scope="col" className="px-4 py-6">{date}</td>
                                <td scope="col" className="px-4 py-6">{beneName}</td>
                            </tr>}
                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default CCTransCreditDetails;