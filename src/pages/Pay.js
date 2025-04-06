import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Constants } from "../lib/const/constants";
import { PrimaryButton } from "../components/button";
import { CURRENCIES } from "../lib/currencies";
import { FaAngleDown, FaAngleUp, FaSearch } from "react-icons/fa";

function Pay() {
  const navigate = useNavigate();
  const [balances, setBalances] = useState([]);
  const [accountNumber, setAccountNumber] = useState("");
  const [sortcode, setSortcode] = useState("");
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [usedBalances, setUsedBalances] = useState([]);
  const [selectedValues, setSelectedValues] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDataLoading, setIsDataLoading] = useState(true); // ✅ State for handling loading UI

  useEffect(() => {
    getData();
    getBalances();
  }, []);

  const getData = async () => {
    const workspace = sessionStorage.getItem("login_workspaces");
    if (workspace) {
      const parsedWorkspace = JSON.parse(workspace);
      setAccountNumber(parsedWorkspace[0]?.accounts?.meta?.account_number || "");
      setSortcode(parsedWorkspace[0]?.accounts?.meta?.routing_code || "");
    }
  };

  const getBalances = async () => {
    if (balanceLoading) return;
    setBalanceLoading(true);
    setIsDataLoading(true); // ✅ Show loading state initially

    const login_workspaces_id = sessionStorage.getItem("login_workspaces_id");
    if (!login_workspaces_id) {
      setBalanceLoading(false);
      setIsDataLoading(false);
      return;
    }

    try {
      const resp = await axios.get(
        `${Constants.BASE_URL}API-FX-161-BALANCES/${login_workspaces_id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("login_token")}`,
            fx_key: Constants.SUBSCRIPTION_KEY
          }
        }
      );

      const balArray = Object.values(resp.data);
      setUsedBalances(resp.data.used_balances);
      balArray.pop();
      setBalances(balArray);
    } catch (err) {
      console.error(err.response?.data);
    } finally {
      setBalanceLoading(false);
      setIsDataLoading(false); // ✅ Hide loading state after fetching
    }
  };

  const setSelectedValue = (val) => {
    setSelectedValues(val);
    setIsOpen(false);
  };

  const navigateToScreen = () => {
    if (selectedValues) {
      navigate("/SendMoney", { state: selectedValues });
    }
  };

  // ✅ Filter currencies based on search input
  const filteredBalances = balances.filter((resp) =>
    CURRENCIES[resp.currency]?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex items-center justify-center w-full h-full bg-white p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)]">
        <h2 className="text-center font-semibold text-lg mb-4">Select Currency</h2>

        {/* Custom Dropdown */}
        <div className="relative">
          <div
            className="bg-[#EAEAEA] border border-gray-300 text-gray-900 text-sm rounded-lg px-4 py-2 cursor-pointer flex justify-between items-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedValues ? (
              <div className="flex items-center">
                <img
                  src={selectedValues?.flag}
                  alt="flag"
                  className="w-5 h-5 mr-2 rounded-full"
                />
                {selectedValues.currency} - {CURRENCIES[selectedValues.currency]}
              </div>
            ) : (
              <span className="text-[#707070]">Select Currency</span>
            )}
            <span className="ml-auto">
              {isOpen ? <FaAngleUp /> : <FaAngleDown />}
            </span>
          </div>

          {/* Dropdown Options */}
          {isOpen && (
            <div className="absolute top-full left-0 z-50 border border-[#707070] mt-2 bg-white shadow-lg rounded-md w-full max-h-[300px] overflow-y-auto">
              
              {/* ✅ Show Loading State */}
              {isDataLoading ? (
                <div className="p-4 text-gray-500 text-center">Loading data...</div>
              ) : (
                <>
                  {/* ✅ Search Input */}
                  <div className="flex items-center px-4 py-1 border-b border-[#707070] bg-white">
                    <FaSearch className="text-gray-500 mr-2" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full p-2 outline-none bg-transparent text-gray-900"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {/* ✅ Filtered Currencies */}
                  {filteredBalances.length > 0 ? (
                    filteredBalances.map((resp, index) => {
                      const flagUrl = `${Constants.FXMASTER_BASE_URL}flags/${resp?.meta?.flag?.split("/").pop()}`;
                      const data = {
                        currency: resp?.currency,
                        balance: resp.currency && usedBalances[resp?.currency]
                          ? parseFloat(
                              (resp?.balance - usedBalances[resp?.currency]) < 0 ? "0" : resp?.balance - usedBalances[resp?.currency]
                            ).toFixed(2)
                          : parseFloat(resp?.balance).toFixed(2),
                        flag: flagUrl,
                        currencyid: resp?.meta?.country_id,
                        accountNumber,
                        sortcode
                      };

                      return (
                        <div
                          key={index}
                          className="flex items-center px-4 py-2 text-[#707070] hover:bg-gray-100 cursor-pointer"
                          onClick={() => setSelectedValue(data)}
                        >
                          <img src={flagUrl} alt="flag" className="w-5 h-5 mr-2 rounded-full" />
                          {resp.currency} - {CURRENCIES[resp.currency]}
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-4 text-gray-500 text-center">No data found</div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Proceed Button */}
        <PrimaryButton
          label="Proceed"
          onClick={navigateToScreen}
          disabled={!selectedValues}
          style={{
            width: "100%",
            backgroundColor: selectedValues ? "#4F46E5" : "#A5B4FC",
            color: "white",
            padding: "12px",
            borderRadius: "6px",
            cursor: selectedValues ? "pointer" : "not-allowed",
            transition: "background-color 0.3s ease",
            marginTop: "20px"
          }}
        />
      </div>
    </div>
  );
}

export default Pay;
