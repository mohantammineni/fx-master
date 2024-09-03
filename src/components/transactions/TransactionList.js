import React from "react";
import {
  MdOutlineCurrencyExchange,
} from 'react-icons/md';
import PropTypes from "prop-types";
import { FiArrowDownLeft, FiArrowUpRight } from 'react-icons/fi';

export default function TransactionList({ transactionList }) {
  TransactionList.propTypes = {
    transactionList: PropTypes.array
  };

  return (
    <>
      {transactionList.map((item, index) => {
        const color = item.type === 'debit' ? 'bg-gray-400 text-black' : 'bg-green-100 text-green-500';
        return (
          <div key={index} className="rounded-3xl bg-white pb-4">
            <div className="flex justify-between items-center px-8 py-4">
              <div className="flex items-center space-x-4 text-white">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${color}`}>
                  {item.type=='debit' ?
                  <FiArrowUpRight fontSize="25px" />
                  :
                  item.type == null || item.type == "" || item.type == "individual" ?
                  <MdOutlineCurrencyExchange fontSize="25px" />
                  :
                  <FiArrowDownLeft fontSize="25px" />
                  }
                </div>
                <div>
                  <div className="text-base font-semibold text-black">
                  {item.type=='debit' ?
                    JSON.parse(item.meta).second_beneficiary_name
                    :
                    JSON.parse(item.meta).sender_name
                  }
                    
                    </div>
                  <div className="text-sm text-black">{item.type == null || item.type == "" ? 'Converted on' : item.type == 'debit' ? 'Sent on' : 'Received on'} {new Date(item.created_at).getDate() + "-" + (new Date(item.created_at).getMonth() + 1) + "-" + new Date(item.created_at).getFullYear()}</div>
                </div>
              </div>
              <div className="text-base font-semibold text-black">{item.settled_currency} {item.settled_amount}</div>
            </div>
          </div>
        )
      }
      )}
    </>
  )
}