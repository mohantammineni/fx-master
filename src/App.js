import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/shared/Layout";
import Dashboard from "./pages/Dashboard";
import Beneficiary from "./pages/Beneficiaries/Beneficiary";
import Transaction from "./pages/Transactions/Transaction";
import Membership from "./pages/Memberships/Membership";
import Report from "./pages/Report";
import Configuration from "./pages/Configuration";
import ComplianceAlert from "./pages/ComplianceAlert";
import RolesAndPermission from "./pages/RolesAndPermission";
import GeneralSettings from "./pages/GeneralSettings";
import EditBeneficiary from './pages/Beneficiaries/EditBeneficiary';
import TransactionShow from './pages/Transactions/TrasnactionShow';
import MembershipShow from './pages/Memberships/MembershipShow';
import Login from './pages/Login';
import StaffLogin from './pages/staffLogin';
import CurrencyDashboard from "./pages/CurrencyDashboard";
import SendMoney from "./pages/SendMoney";
import PaymentConfirmation from "./pages/PaymentConfirmation";
import CurrencyConverterScreen from "./pages/CurrencyConverterScreen";
import PaymentSuccess from './pages/PaymentSuccess';
import AddBalance from "./pages/AddBalance";
import RenderUrl from "./pages/renderUrl";
import BeneficiaryTypes from "./pages/BeneficiaryTypes";
import SelfAccount from "./pages/SelfAccount";
import BeneficiaryOtpScreen from "./pages/BeneficiaryOtpScreen";
import BusinessAccount from "./pages/BusinessAccount";
import Register from "./pages/Register";
import VerifyPhone from "./pages/VerifyPhone";
import VerifyEmail from "./pages/VerifyEmail";
import SumSubRegister from "./pages/SumSubRegister";
import SumsubReKyc from "./pages/SumsubReKyc";
import ApplicationPreview from "./pages/ApplicationPreview";
import BusinessDetails from "./pages/BusinessDetails";
import AboutBusiness from "./pages/AboutBusiness";
import BusinessAddress from "./pages/BusinessAddress";
import SelectOfficer from "./pages/SelectOfficer";
import NotFound from './pages/not-found';
import Conversions from './pages/Conversions';
import ForgotPin from "./pages/forgotPin";
import CCTransCreditDetails from "./pages/Transactions/CCTransCreditDetails";
import CCTransDebitDetails from "./pages/Transactions/CCTransDebitDetails";
import CBTransCreditDetails from "./pages/Transactions/CBTransCreditDetails";
import TransDebitDetails from "./pages/Transactions/TransDebitDetails";
// import Homepage from "./pages/Homepage";
import FrontLayout from './components/shared/FrontLayout';
import BusinessPage from './pages/BusinessPage';
import FintechPage from './pages/FintechPage';
import DebitTransactions from "./pages/Transactions/DebitTransactions";
import CreditTransactions from "./pages/Transactions/CreditTransactions";
import BulkUpload from "./pages/BulkUpload";
import FilteredTransaction from "./pages/Transactions/FilteredTransactions";
import ListBeneficiaries from "./pages/ListBeneficiaries";
import SendMoneyByBeneficiary from "./pages/SendMoneyByBeneficiary";
import SelectCurrencyForBeneficiary from "./pages/SelectCurrencyForBeneficiary";
import Pay from "./pages/Pay";
import CurrencyConverterFormScreen from "./pages/CurrencyConverterFormScreen";
import ShowAccounts from "./pages/ShowAccounts";
import UserDetails from "./pages/userDetails";
import ListUsers from "./pages/ListUsers/ListUsers";
import Stats from "./pages/Stats";
import SetFees from "./pages/SetFees";

export default function App() {
  useEffect(() => {
    // OneSignal.init({
    //   appId: "69c7aa9b-1409-4db5-b02f-f8941d1c876f"
    // });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />}></Route>
        <Route path="beneficiaries" element={<Beneficiary />}></Route>
        <Route path="Pay" element={<Pay />}></Route>
        <Route path="beneficiaries/edit" element={<EditBeneficiary />}></Route>
        <Route path="transactions" element={<Transaction />}></Route>
        <Route path="conversions" element={<Conversions />}></Route>
        <Route path="transactions/show" element={<TransactionShow />}></Route>
        <Route path="memberships" element={<Membership />}></Route>
        <Route path="userDetails" element={<UserDetails />}></Route>
        <Route path="SetFees" element={<SetFees />}></Route>
        <Route path="ListUsers" element={<ListUsers />}></Route>
        <Route path="memberships/show" element={<MembershipShow />}></Route>
        <Route path="reports" element={<Report />}></Route>
        <Route path="configurations" element={<Configuration />}></Route>
        <Route path="compliance-alerts" element={<ComplianceAlert />}></Route>
        <Route path="roles-and-permissions" element={<RolesAndPermission />}></Route>
        <Route path="general-settings" element={<GeneralSettings />}></Route>
        <Route path="currencyDashboard" element={<CurrencyDashboard />}></Route>
        <Route path="sendMoney" element={<SendMoney />}></Route>
        <Route path="SendMoneyByBeneficiary" element={<SendMoneyByBeneficiary />}></Route>
        <Route path="SelectCurrencyForBeneficiary" element={<SelectCurrencyForBeneficiary />}></Route>
        <Route path="CurrencyConverterFormScreen" element={<CurrencyConverterFormScreen />}></Route>
        <Route path="PaymentConfirmation" element={<PaymentConfirmation />}></Route>
        <Route path="CurrencyConverterScreen" element={<CurrencyConverterScreen />}></Route>
        <Route path="PaymentSuccess" element={<PaymentSuccess />}></Route>
        <Route path="AddBalance" element={<AddBalance />}></Route>
        <Route path="ShowAccounts" element={<ShowAccounts />}></Route>
        <Route path="RenderUrl" element={<RenderUrl />}></Route>
        <Route path="BeneficiaryTypes" element={<BeneficiaryTypes />}></Route>
        <Route path="SelfAccount" element={<SelfAccount />}></Route>
        <Route path="BeneficiaryOtpScreen" element={<BeneficiaryOtpScreen />}></Route>
        <Route path="BusinessAccount" element={<BusinessAccount />}></Route>
        <Route path="CCTransCreditDetails" element={<CCTransCreditDetails />}></Route>
        <Route path="CCTransDebitDetails" element={<CCTransDebitDetails />}></Route>
        <Route path="CBTransCreditDetails" element={<CBTransCreditDetails />}></Route>
        <Route path="TransDebitDetails" element={<TransDebitDetails />}></Route>
        <Route path="DebitTransactions" element={<DebitTransactions />}></Route>
        <Route path="CreditTransactions" element={<CreditTransactions />}></Route>
        <Route path="bulkupload" element={<BulkUpload />}></Route>
        <Route path="FilteredTransaction" element={<FilteredTransaction />}></Route>
        <Route path="ListBeneficiaries" element={<ListBeneficiaries />}></Route>
      </Route>
      <Route path="/" element={<FrontLayout />}>
        {/* <Route path="Homepage" element={<Homepage />}></Route> */}
        <Route path="business" element={<BusinessPage />}></Route>
        <Route path="fintech" element={<FintechPage />}></Route>
      </Route>
      <Route path="stats" element={<Stats />}></Route>
      <Route path="login" element={<Login />}></Route>
      <Route path="stafflogin" element={<StaffLogin />}></Route>
      <Route path="Register" element={<Register />}></Route>
      <Route path="VerifyPhone" element={<VerifyPhone />}></Route>
      <Route path="VerifyEmail" element={<VerifyEmail />}></Route>
      <Route path="SumSubRegister" element={<SumSubRegister />}></Route>
      <Route path="SumsubReKyc" element={<SumsubReKyc />}></Route>
      <Route path="ApplicationPreview" element={<ApplicationPreview />}></Route>
      <Route path="BusinessDetails" element={<BusinessDetails />}></Route>
      <Route path="AboutBusiness" element={<AboutBusiness />}></Route>
      <Route path="BusinessAddress" element={<BusinessAddress />}></Route>
      <Route path="SelectOfficer" element={<SelectOfficer />}></Route>
      <Route path="*" element={<NotFound />}></Route>
      <Route path="ForgotPin" element={<ForgotPin />}></Route>
    </Routes>
  )
}