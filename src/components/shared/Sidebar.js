import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BOTTOM_LINKS, NAVIGATION_LINKS, ADMIN_NAVIGATION_LINKS, ADMIN_USER_NAVIGATION_LINKS } from '../../lib/const/navbar-links';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Constants } from '../../lib/const/constants';

const linkClass =
  'flex items-center gap-2 py-3 px-4 hover:no-underline text-sm font-normal text-slate-900 mb-1';
const activeClass = 'bg-[#205FFF] rounded text-white w-full';
const activeRevertClass = 'bg-[#0a38ad] rounded text-white w-full';

const Sidebar = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [showconvertTab, setshowconvertTab] = useState(false);
  const [navlink, setnavlink] = useState([]);
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    sessionStorage.clear();
    navigate('/business');
  };

  const setAsyncData = async (key, value) => {
    sessionStorage.setItem(key, value);
  };

  const loadData = async () => {
    const re_kyc = sessionStorage.getItem('re_kyc');
        if(JSON.parse(re_kyc)==1)
          navigate('/sumsubReKyc')
        
    const login_workspaces_id = sessionStorage.getItem('login_workspaces_id');
    const login_token = sessionStorage.getItem('login_token');
    setAsyncData('balances', "");
    setAsyncData('conversions', "");

    await axios.get(Constants.BASE_URL + 'API-FX-165-CCTRANSACTIONS/' + login_workspaces_id + '?page=1&from=1970-01-01&to=1970-02-01', {
      headers: {
        Authorization: "Bearer " + JSON.parse(login_token),
        fx_key: Constants.SUBSCRIPTION_KEY
      }
    }).then(resp => {
      if (resp.data.menu.length > 0) {
        resp.data.menu.forEach((menu) => {
          if (menu.tab_id === 2) {
            setAsyncData('balances', JSON.stringify(menu.tab_id));
          }
          if (menu.tab_id === 1) {
            setAsyncData('conversions', JSON.stringify(menu.tab_id));
          }
        });
        setLoading(false);
      } else {
        setLoading(false);
        setAsyncData('balances', "");
        setAsyncData('conversions', "");
      }
    }).catch(err => {
      console.log(err);
      setLoading(false);
    });

    const conversionstab = sessionStorage.getItem('conversions');
    const admin_login = sessionStorage.getItem('admin_login');
    if (admin_login === '1') {
      {
        const staff_login_token = sessionStorage.getItem('staff_login_token');
        const login_token = sessionStorage.getItem('login_token');
        if (staff_login_token != "" && staff_login_token != null && login_token != "" && login_token != null)
          setnavlink(ADMIN_USER_NAVIGATION_LINKS);
        else
          setnavlink(ADMIN_NAVIGATION_LINKS);
      }
    } else {
      setnavlink(NAVIGATION_LINKS);
    }
    if (conversionstab) {
      setshowconvertTab(true);
    }
  };

  const removeData = async (key) => {
    sessionStorage.removeItem(key)
  }
  const revertToSelf = async () => {
    removeData("login_id")
    removeData("login_full_name")
    removeData("login_email")
    removeData("login_phone")
    removeData("login_date_of_birth")
    removeData("login_country_code")
    removeData("login_country_id")
    removeData("login_country_name")
    removeData("login_nationality")
    removeData("login_registration_step")
    removeData("login_is_banking_user")
    removeData("login_status")
    removeData("login_yoti_status")
    removeData("login_workspaces")
    removeData("login_workspaces_id")
    removeData("login_token")
    removeData("login_address")
    removeData("login_postcode")
    removeData("login_city")
    removeData("login_currency_code_iso")
    removeData("defaultBank")
    removeData("clearBankCustomerId")
    removeData("clearBankCustomerBankCode")
    removeData("clearBankCustomerIBAN")
    removeData("clearBankCustomerWalletId")
    removeData("clearBankCustomerSWIFTCode")
    removeData("clearBankCustomerAccountName")
    removeData("clearBankCustomerWalletNumber")
    removeData("clearBankCustomerSortCode")
    removeData("clearBankCustomerServiceProviderAccountId")
    removeData("clearBankCustomerContactId")
    removeData("defaultBank")
    removeData("clearBankCustomerId")
    removeData("kyc_submitted");
    removeData("login_id")

    setAsyncData("staff_login_id", sessionStorage.getItem('staff_login_id'))
    setAsyncData("login_id", sessionStorage.getItem('staff_login_id'))
    setAsyncData("login_full_name", sessionStorage.getItem('staff_login_full_name'))
    setAsyncData("login_email", sessionStorage.getItem('staff_login_email'))
    setAsyncData("login_phone", sessionStorage.getItem('staff_login_phone'))
    setAsyncData("login_date_of_birth", sessionStorage.getItem('staff_login_date_of_birth'))
    setAsyncData("login_country_code", sessionStorage.getItem('staff_login_country_code'))
    setAsyncData("login_country_id", sessionStorage.getItem('staff_login_country_id'))
    setAsyncData("login_country_name", sessionStorage.getItem('staff_login_country_name'))
    setAsyncData("login_nationality", sessionStorage.getItem('staff_login_nationality'))
    setAsyncData("staff_login_token", sessionStorage.getItem('staff_login_token'))
    setAsyncData("admin_login", '1');
    setAsyncData("kyc_submitted", sessionStorage.getItem('staff_kyc_submitted'));
    navigate('/DebitTransactions')
  }
  useEffect(() => {
    loadData();
  });

  return (
    <div
      className={classNames(
        'fixed top-0 left-0 h-full z-40 bg-white w-64 shadow-lg transition-transform transform',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'sm:relative sm:translate-x-0 sm:shadow-none'
      )}
    >
      <div className="flex-1 px-4 pt-8">
        {!loading && (
          navlink.map((item) => (
            <div key={item.key}>
              {item.key === 'logout' ? (
                <button
                  onClick={logout}
                  className={classNames(
                    pathname === item.path ? activeClass : '',
                    linkClass
                  )}
                >
                  <span className="text-xl">{item.icon}</span>
                  {item.label}
                </button>
              ) : (
                <>
                  {item.key === 'convert' && showconvertTab ? (
                    <button
                      onClick={() => navigate(item.path)}
                      className={classNames(
                        pathname === item.path ? activeClass : '',
                        linkClass
                      )}
                    >
                      <span className="text-xl">{item.icon}</span>
                      {item.label}
                    </button>
                  ) : item.key !== 'convert' ? (

                    item.key == 'reverttoself' ?
                      <button
                        onClick={revertToSelf}
                        className={classNames(
                          activeRevertClass,linkClass
                        )}
                      >
                        <span className="text-xl">{item.icon}</span>
                        {item.label}
                      </button>
                      :
                      <button
                        onClick={() => navigate(item.path)}
                        className={classNames(
                          pathname === item.path ? activeClass : '',
                          linkClass
                        )}
                      >
                        <span className="text-xl">{item.icon}</span>
                        {item.label}
                      </button>
                  ) : (
                    ''
                  )}
                </>
              )}
            </div>
          ))
        )}
      </div>
      <div className="px-4">
        {BOTTOM_LINKS.map((item) => (
          <div key={item.key}>
            {item.key === 'logout' ? (
              <button
                onClick={logout}
                className={linkClass}
              >
                <span className="text-xl">{item.icon}</span>
                {item.label}
              </button>
            ) : (
              <button
                onClick={() => navigate(item.path)}
                className={linkClass}
              >
                <span className="text-xl">{item.icon}</span>
                {item.label}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
};

export default Sidebar;
