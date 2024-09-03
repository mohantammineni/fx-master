import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function CBTransCreditDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const paramsdata = location.state;

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
                        <tr>
                            <td scope="col" className="px-4 py-6">{paramsdata.amount}</td>
                            <td scope="col" className="px-4 py-6">{paramsdata.date}</td>
                            <td scope="col" className="px-4 py-6">{paramsdata.beneName}</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default CBTransCreditDetails;