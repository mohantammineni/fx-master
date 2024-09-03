import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Constants } from '../lib/const/constants';

function Conversions() {
  const navigate = useNavigate();
  const [conversions, setConversions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const getData = async (pageNumber) => {
    const login_id = sessionStorage.getItem('login_id');
    const login_token = sessionStorage.getItem('login_token');
    const login_workspaces_id = sessionStorage.getItem('login_workspaces_id');

    if (!login_id || !login_token) {
      sessionStorage.clear();
      navigate('/Homepage');
      return;
    }

    setLoading(true);
    console.log(loading)

    const from = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + (new Date().getDate() - 100);
    const to = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();

    try {
      const response = await axios.get(`${Constants.BASE_URL}API-FX-180-CONVERSIONLIST/${login_workspaces_id}?page=${pageNumber}&from=${from}&to=${to}`, {
        headers: {
          Authorization: 'Bearer ' + JSON.parse(login_token),
          fx_key: Constants.SUBSCRIPTION_KEY,
        },
      });

      const newConversions = response.data.data;

      if (newConversions.length > 0) {
        setConversions(prevTransactions => [...prevTransactions, ...newConversions]);
        setCurrentPage(prevPage => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  return (
    <div className="my-2">
      <div className="flex items-center justify-between py-4 mb-4">
        <div className="flex items-center">
          <p className="text-2xl font-semibold">Conversions</p>
        </div>
      </div>

      <div className="relative overflow-x-auto rounded-3xl bg-white">
        <InfiniteScroll
          dataLength={conversions.length} // This is the length of the items array
          next={() => getData(currentPage)}
          hasMore={hasMore}
          loader={
            <div className="w-full mt-6">
              <div className="flex justify-center items-center h-5 pb-6">
                <p>Loading conversions...</p>
              </div>
            </div>
          }
          endMessage={
            <div className="w-full">
              <div className="flex justify-center items-center h-5 pb-6">
                <p>No more conversions to show</p>
              </div>
            </div>
          }
          scrollableTarget="scrollableDiv"
        >
          <table className="w-full text-sm text-left">
            <thead className="border-b-2">
            <tr>
              <th scope="col" className="px-4 py-6">Reference No</th>
              <th scope="col" className="px-4 py-6">Date & Time</th>
              <th scope="col" className="px-4 py-6">Settlement Date</th>
              {/* <th scope="col" className="px-4 py-6">Conversion Status</th> */}
              <th scope="col" className="px-4 py-6">Rate</th>
              <th scope="col" className="px-4 py-6">Sell Currency</th>
              <th scope="col" className="px-4 py-6">Sell</th>
              <th scope="col" className="px-4 py-6">Buy Currency</th>
              <th scope="col" className="px-4 py-6">Buy</th>
              {/* <th scope="col" className="px-4 py-6">Status</th> */}
            </tr>
            </thead>
            <tbody className="table-striped">
            {conversions.map((conversion) => {

              const meta = JSON.parse(conversion.meta);
              const reference = meta.conversion_short_reference ?? "N/A";
              // const conversionStatus = meta.conversion_status ?? "N/A";
              const clientRate = meta.conversion_client_rate ?? "N/A";
              const clientSell = meta.client_sell_amount ?? "N/A";
              const clientBuy = parseFloat(meta.client_buy_amount) ?? "N/A";
              // const status = meta.status ?? "N/A";
              const date = new Date(meta.conversion_settlement_date);
              const settlementDate = date.toISOString().split('T')[0];
              const createdDate = conversion.created_at.slice(0, 16);
              const clientSellCurrency = meta.client_sell_currency;
              const clientBuyCurrency = meta.client_buy_currency;

              return (
                <tr key={conversion.id}>
                  <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">{reference}</th>
                  <td className="px-4 py-6">{new Date(createdDate).getDate() + "-" + (new Date(createdDate).getMonth() + 1) + "-" + new Date(createdDate).getFullYear()}</td>
                  <td className="px-4 py-6">{settlementDate}</td>
                  {/* <td className="px-4 py-6">{conversionStatus}</td> */}
                  <td className="px-4 py-6">{clientRate}</td>
                  <td className="px-4 py-6">{clientSellCurrency}</td>
                  <td className="px-4 py-6">{clientSell}</td>
                  <td className="px-4 py-6">{clientBuyCurrency}</td>
                  <td className="px-4 py-6">{clientBuy.toFixed(4)}</td>
                  {/* <td className="px-4 py-6">{status}</td> */}
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

export default Conversions;