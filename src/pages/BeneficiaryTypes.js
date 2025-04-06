import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function BeneficiaryTypes() {
    const navigate = useNavigate();
    const location = useLocation();
    const paramsdata = location.state;
    const currency = paramsdata.currency;
    const transferflowamount = paramsdata.transferflowamount;
    const currencyid = paramsdata.currencyid;
    const balance = paramsdata.balance;
    const routeName = paramsdata.routeName!='' && paramsdata.routeName!=null ? paramsdata.routeName : '';
    return (
        <div className="my-2">
            <span className="text-lg font-semibold">Add Beneficiary</span>
            <div className='flex p-10'>
                    <button className='m-8 p-8 flex bg-[#205FFF] rounded-2xl font-bold text-white' onClick={()=>navigate('/SelfAccount',{state:{currency:currency,transferflowamount:transferflowamount,currencyid:currencyid,balance:balance,routeName:routeName}})}>
                        Self Transaction
                    </button>
                
                    <button className='m-8 p-8 flex bg-[#205FFF] rounded-2xl font-bold text-white' onClick={()=>navigate('/BusinessAccount',{state:{currency:currency,transferflowamount:transferflowamount,currencyid:currencyid,balance:balance,routeName:routeName}})}>
                        Business / Welfare
                    </button>
                
                    <button className='m-8 p-8 flex bg-[#205FFF] rounded-2xl font-bold text-white' onClick={()=>navigate('/SelfAccount',{state:{currency:currency,transferflowamount:transferflowamount,currencyid:currencyid,balance:balance,routeName:routeName}})}>
                        Another Person
                    </button>
            </div>
        </div>
    );
}

export default BeneficiaryTypes;