import React, { useEffect, useState } from 'react';
import { Constants } from '../lib/const/constants';
import axios from 'axios';
import { PrimaryButton } from '../components/button';
import { useNavigate } from 'react-router-dom';

function SelectCurrencyForBeneficiary() {
    const navigate = useNavigate();
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currency, setcurrency] = useState('');
    const [currencyId, setcurrencyId] = useState('');
    const loadCountries = async () => {
        setLoading(true)
        const token = sessionStorage.getItem('login_token');
        await axios.get(Constants.BASE_URL + 'API-FX-162-CONVERTCOUNTRIES', {
            headers: {
                Authorization: "Bearer " + JSON.parse(token),
                fx_key: Constants.SUBSCRIPTION_KEY
            }
        }).then(resp => {
            setCountries(resp.data.buying_currencies);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        })
    }
    useEffect(() => {
        loadCountries()
    }, [])
    return (
        <div className="my-2">
            <span className="text-lg font-semibold">Select Currency</span>
            <div className='p-10 text-center'>
                {loading ? "loading..." :
                    <select
                        className="bg-white border border-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        onChange={(e)=>{
                            var data = (e.target.value).split("_");
                            setcurrency(data[0])
                            setcurrencyId(data[1]==184 ? 1 : data[1])
                        }}
                    >
                        <option key={0}
                            value={''}>
                            Select
                        </option>
                        {countries.map((countryRow) => {
                            return (

                                <option key={countryRow.id}
                                    value={countryRow.currency + '_' + countryRow.id}>
                                    {countryRow.currency}
                                </option>

                            );
                        })}
                    </select>
                }
                <PrimaryButton 
                label={'Proceed'}
                style={{width:"20%",marginTop:10}}
                onClick={()=>navigate('/BeneficiaryTypes',{state:{currency:currency,currencyid:currencyId,transferflowamount:0,balance:0,routeName:'ListBeneficiaries'}})}
                />
            </div>
        </div>
    );
}

export default SelectCurrencyForBeneficiary;