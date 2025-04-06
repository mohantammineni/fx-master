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
        <div className="flex items-center justify-center w-full h-full bg-white p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)]">
            <h2 className="text-center font-semibold text-lg mb-4">Select Country</h2>
            <div className='text-center'>
                {loading ? "loading..." :
                    <select
                        className="bg-[#EAEAEA] w-full border-none text-gray-900 text-sm rounded-lg px-4 py-2 cursor-pointer flex justify-between items-center focus:outline-none focus:ring-0 focus:border-none"
                        onChange={(e)=>{
                            var data = (e.target.value).split("_");
                            setcurrency(data[0])
                            setcurrencyId(data[1]==184 ? 1 : data[1])
                        }}
                    >
                        <option key={0}
                            value={''}>
                            Select Country
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
  className="w-full "
  label={'Proceed'}
  disabled={!currency}
  style={{
    width: "100%",
    backgroundColor: currency ? "#4F46E5" : "#A5B4FC",
    color: "white",
    padding: "12px",
    borderRadius: "6px",
    cursor: currency ? "pointer" : "not-allowed",
    transition: "background-color 0.3s ease",
    marginTop: "20px"
  }}
  onClick={() => navigate('/BeneficiaryTypes', {
    state: {
      currency: currency,
      currencyid: currencyId,
      transferflowamount: 0,
      balance: 0,
      routeName: 'ListBeneficiaries'
    }
  })}
/>

            </div>
            </div>
        </div>
    );
}

export default SelectCurrencyForBeneficiary;