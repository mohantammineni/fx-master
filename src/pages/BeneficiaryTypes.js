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
        <div className="flex items-center justify-center w-full h-full bg-white p-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)]">
          
          {/* Header with back arrow */}
          <div className="flex items-center space-x-3 mb-6">
            <img src="./arrow-left.png" alt="back" />
            <span className="text-lg font-semibold">Add Beneficiary</span>
          </div>
      
          {/* Beneficiary Options */}
          <div className="space-y-4">
            {/* Self Transaction */}
            <button
              onClick={() =>
                navigate('/SelfAccount', {
                  state: {
                    currency: currency,
                    transferflowamount: transferflowamount,
                    currencyid: currencyid,
                    balance: balance,
                    routeName: routeName,
                  },
                })
              }
              className="w-full flex items-center justify-between bg-white rounded-lg shadow-md px-4 py-3 hover:bg-gray-50"
            >
              <div className="flex items-center space-x-4">
                <img src="/self-round.png" alt="self" className="w-10 h-10" />
                <span className="text-base font-medium text-black">Self Transaction</span>
              </div>
              <img src="/arrow-right.png" alt="arrow" className="w-6 h-6" />
            </button>
      
            {/* Business / Welfare */}
            <button
              onClick={() =>
                navigate('/BusinessAccount', {
                  state: {
                    currency: currency,
                    transferflowamount: transferflowamount,
                    currencyid: currencyid,
                    balance: balance,
                    routeName: routeName,
                  },
                })
              }
              className="w-full flex items-center justify-between bg-white rounded-lg shadow-md px-4 py-3 hover:bg-gray-50"
            >
              <div className="flex items-center space-x-4">
                <img src="/buss-round.png" alt="business" className="w-10 h-10" />
                <span className="text-base font-medium text-black">Business / Welfare</span>
              </div>
              <img src="/arrow-right.png" alt="arrow" className="w-6 h-6" />
            </button>
      
            {/* Another Person */}
            <button
              onClick={() =>
                navigate('/SelfAccount', {
                  state: {
                    currency: currency,
                    transferflowamount: transferflowamount,
                    currencyid: currencyid,
                    balance: balance,
                    routeName: routeName,
                  },
                })
              }
              className="w-full flex items-center justify-between bg-white rounded-lg shadow-md px-4 py-3 hover:bg-gray-50"
            >
              <div className="flex items-center space-x-4">
                <img src="/group-round.png" alt="group" className="w-10 h-10" />
                <span className="text-base font-medium text-black">Another Person</span>
              </div>
              <img src="/arrow-right.png" alt="arrow" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      
    );
}

export default BeneficiaryTypes;