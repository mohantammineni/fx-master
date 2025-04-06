import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Constants } from '../../lib/const/constants';
import getCurrencySymbol from '../../lib/currenyUtils';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FiArrowDownLeft, FiArrowUpRight } from 'react-icons/fi';
import { MdOutlineCurrencyExchange } from 'react-icons/md';

function ApproveTransactions() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true); // start with true

  const getData = async (pageNumber) => {
    const login_token = sessionStorage.getItem('login_token');
    setLoading(true); // Start loading
    console.log(loading)
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/getAllTransactions/${pageNumber}`, {
        headers: {
          Authorization: 'Bearer ' + JSON.parse(login_token),
          fx_key: Constants.SUBSCRIPTION_KEY,
        },
      });

      const newTransactions = response.data;

      if (newTransactions.length > 0) {
        setTransactions(prevTransactions => [...prevTransactions, ...newTransactions]);
        setCurrentPage(prevPage => prevPage + 1);
      } else {
        setHasMore(false); // No more data to load
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setHasMore(false); // Stop infinite scroll if error occurs
    } finally {
      setLoading(false); // Stop loading
    }
  };


  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);


  const loadtransactiondetails = async (uuid, inbound) => {
    if (inbound == 'credit') {
      navigate('/CCTransCreditDetails', { state: { id: uuid } })
    }
    else {
      navigate('/CCTransDebitDetails', { state: { uuid: uuid } })
    }
  }
  const loadCBTransdetails = async (amount, date, beneName) => {
    navigate('/CBTransCreditDetails', { state: { amount: amount, date: date, beneName: beneName } })
  }
  async function loadTransdetails(ref, amount, paymentDate, beneName, beneAccount, card_fees) {
    navigate('/TransDebitDetails', { state: { ref: ref, amt: amount, paymentDate: paymentDate, benename: beneName, beneAccount: beneAccount, status: 'pending', card_fees: card_fees } })
  }
  const navigatetotransaction = async (paymentMethod, metaDetails, date, send) => {

    paymentMethod == "manual_transfer" && JSON.parse(metaDetails).city != "CB" ?
      Object.prototype.hasOwnProperty.call(JSON.parse(metaDetails), 'currency_cloud_payment_id') ?

        loadtransactiondetails(JSON.parse(metaDetails).currency_cloud_payment_id, send) :

        loadTransdetails(JSON.parse(metaDetails).reference_no, JSON.parse(metaDetails).exchange_currency + " " + JSON.parse(metaDetails).recipient_amount, date, JSON.parse(metaDetails).second_beneficiary_name, JSON.parse(metaDetails).second_beneficiary_bank_account_number, JSON.parse(metaDetails).card_fees) :
      JSON.parse(metaDetails).city == "CB" ?
        loadCBTransdetails(JSON.parse(metaDetails).recipient_amount, date, JSON.parse(metaDetails).second_beneficiary_name)
        :
        loadTransdetails(JSON.parse(metaDetails).reference_no, JSON.parse(metaDetails).exchange_currency + " " + JSON.parse(metaDetails).recipient_amount, date, JSON.parse(metaDetails).second_beneficiary_name, JSON.parse(metaDetails).second_beneficiary_bank_account_number, JSON.parse(metaDetails).card_fees)
  }
  return (
    <div className="my-2">
      <div className="flex items-center justify-between py-4 mb-4">
        <div className="flex items-center">
          <p className="text-2xl font-semibold">Transactions</p>
        </div>
        <div className="flex space-x-4">
          {/* <Link to="/send" className="border border-[#1152BE] text-[#1152BE] px-6 py-2 rounded-lg">Send</Link>
          <Link to="/convert" className="border border-[#1152BE] text-[#1152BE] px-6 py-2 rounded-lg">Filters</Link> */}
        </div>
      </div>

      <div className="relative overflow-x-auto rounded-3xl bg-white">
        <InfiniteScroll
          dataLength={transactions.length} // This is the length of the items array
          next={() => getData(currentPage)}
          hasMore={hasMore}
          loader={
            <div className="w-full mt-6">
              <div className="flex justify-center items-center h-5 pb-6">
                <p>Loading transactions...</p>
              </div>
            </div>
          }
          endMessage={
            <div className="w-full">
              <div className="flex justify-center items-center h-5 pb-6">
                <p>No more transactions to show</p>
              </div>
            </div>
          }
          scrollableTarget="scrollableDiv"
        >
          <table className="w-full text-sm text-left">
            <thead className="border-b-2">
              <tr>
                <th scope="col" className="px-4 py-6"></th>
                <th scope="col" className="px-4 py-6">Transaction ID</th>
                <th scope="col" className="px-4 py-6">Date & Time</th>
                <th scope="col" className="px-4 py-6">Receiver Name</th>
                <th scope="col" className="px-4 py-6">Sending Amount</th>
                <th scope="col" className="px-4 py-6">Receiving Amount</th>
                {/* <th scope="col" className="px-4 py-6">Payment Method</th> */}
                <th scope="col" className="px-4 py-6">Details</th>
              </tr>
            </thead>
            <tbody className="table-striped">
              {transactions.map((beneficiary) => {
                const meta = JSON.parse(beneficiary.meta);
                const senderName = meta.sender_name || 'N/A';
                const receivingAmount = meta.recipient_amount || "N/A";
                const receivingCurrency = meta.exchange_currency || "N/A";
                const color = beneficiary.type === 'debit' ? 'bg-gray-400 text-black' : 'bg-green-100 text-green-500';
                return (
                  <tr key={beneficiary.id}>
                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full ${color}`}>
                        {beneficiary.type == 'debit' ?
                          <FiArrowUpRight fontSize="25px" />
                          :
                          beneficiary.type == null || beneficiary.type == "" || beneficiary.type == "individual" ?
                            <MdOutlineCurrencyExchange fontSize="25px" />
                            :
                            <FiArrowDownLeft fontSize="25px" />
                        }
                      </div>
                    </th>
                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap flex">
                      {beneficiary.urn}</th>
                    <td className="px-4 py-6">{new Date(beneficiary.created_at).getDate() + "-" + (new Date(beneficiary.created_at).getMonth() + 1) + "-" + new Date(beneficiary.created_at).getFullYear()}</td>
                    <td className="px-4 py-6">{senderName}</td>
                    <td className="px-4 py-6">{getCurrencySymbol(beneficiary.settled_currency)} {beneficiary.amount}</td>
                    <td
                      className="px-4 py-6">{receivingAmount && getCurrencySymbol(receivingCurrency)} {receivingAmount}</td>
                    {/* <td className="px-4 py-6">{beneficiary.payment_method}</td> */}
                    <td className="px-4 py-6">
                      <button onClick={() => { navigatetotransaction(beneficiary.payment_method, beneficiary.meta, new Date(beneficiary.created_at).getDate() + "-" + (new Date(beneficiary.created_at).getMonth() + 1) + "-" + new Date(beneficiary.created_at).getFullYear(), beneficiary.type) }}>View Details</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default ApproveTransactions;