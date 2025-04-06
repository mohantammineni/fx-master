import React, { useEffect, useState } from 'react';
import { PrimaryButton } from '../components/button';
import axios from 'axios';
import { Constants } from '../lib/const/constants';

const Stats = () => {
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const [loading, setLoading] = useState(false);
    const [showData, setShowData] = useState(false);
    const [data, setData] = useState([]);
    const [currency,setCurrency] = useState("GBP");
    const loadData = async () => {
        setLoading(true)
        await axios.get(Constants.BASE_URL + 'API-FX-220-GET-CHARGES-STATS?from_date=' + fromDate + '&to_date=' + toDate+'&currency='+currency, {
            headers: {
                fx_key: Constants.SUBSCRIPTION_KEY
            }
        }).then(resp => {
            console.log(resp.data);
            setData(resp.data);
            setLoading(false)
        }).catch(err => {
            console.log(err.response.data);
            setLoading(false)
        })
    }
    const askPassword = async () => {
        var password = prompt('Please enter the password');
        if (password == 'sharat@fxmaster') {
            setShowData(true)
        }
        else {
            setShowData(false)
        }
    }
    useEffect(() => {
        askPassword()
    },[])
    return (
        <>
            {showData &&
                <section className="relative w-full min-h-screen text-center p-10">
                    From Date: <input type='date' className='border-solid border-2 border-indigo-600 rounded-lg mx-5' onChange={(e) => setFromDate(e.target.value)} />
                    To Date: <input type='date' className='border-solid border-2 border-indigo-600 rounded-lg mx-5' onChange={(e) => setToDate(e.target.value)} />
                    <select onChange={(e)=>setCurrency(e.target.value)}>
                        <option>GBP</option>
                        <option>EUR</option>
                        <option>USD</option>
                        <option>AUD</option>
                        <option>HKD</option>
                        <option>INR</option>
                        <option>JPY</option>
                        
                    </select>
                    <PrimaryButton
                        label={'Search'}
                        onClick={loadData}
                        style={{ width: "10%" }}
                        loading={loading}
                    />
                    {Object.keys(data).length > 0 &&
                        <table className='w-full my-20' cellPadding={10} cellSpacing={10}>
                            <tr><th>Membership No</th><th>Name</th><th>Joining Date</th><th>Outbound Charges</th><th>Inbound Charges</th><th>Conversion Charges</th></tr>
                            {
                                Object.keys(data).map(function (key) {
                                    return <tr key={key}><td>{data[key].membership_no}</td><td>{data[key].name}</td><td>{data[key].joining_date}</td><td>{parseFloat(data[key].outbound_charges).toFixed(4)}</td><td>{parseFloat(data[key].inbound_charges).toFixed(4)}</td><td>{parseFloat(data[key].conversion_charges).toFixed(4)}</td></tr>
                                })

                            }
                        </table>
                    }
                </section>
            }
        </>
    );
};

export default Stats;