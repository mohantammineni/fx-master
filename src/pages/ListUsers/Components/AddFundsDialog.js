import React, { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { ucFirst } from '../../../lib/utils';
import { Constants } from '../../../lib/const/constants';
import { ToastContainer,toast } from "react-toastify";

export default function AddFundsDialog({ isOpen, onClose, selectedWorkspace, type, creditor, debitor = '' }) {
  const [amount, setAmount] = React.useState();
  const [paymentMethod, setPaymentMethod] = React.useState('');
  const [paymentStatus, setPaymentStatus] = React.useState('');
  const [addFundsLoading, setAddFundsLoading] = useState(false);
  const [reason, setReason] = useState('');
  const [fileData, setFileData] = React.useState(null);
  const [fileExtension, setFileExtension] = React.useState('');

  function handleFileChange(event) {
    const file = event.target.files[0];
    const extension = file.name.split('.').pop().toLowerCase();

    if (extension === 'pdf') {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFileData(reader.result);
        };
        reader.readAsDataURL(file);
      }

      const extension = file.name.split('.').pop();
      setFileExtension(extension);
      setAddFundsLoading(false);
    } else {
      setAddFundsLoading(true);
      toast.error('Please upload pdf file only');
      setFileData(null);
      setFileExtension('');
    }
  }

  async function handleAddFunds() {
    setAddFundsLoading(true);
    const data = {
      'creditor': creditor,
      'debitor': debitor,
      'amount': amount,
      'payment_method': paymentMethod,
      'status': paymentMethod=='manual' ? 'settled' : paymentStatus,
      'reason': reason,
      'type': type,
      'document': fileData,
      'fileExtension': fileExtension,
    };

    try {
      const response = await axios.post(Constants.BASE_URL + 'API-FX-218-ADD-FUNDS-COMPLIANCE', data, {
        headers: {
          fx_key: Constants.SUBSCRIPTION_KEY,
        },
      });
      console.log(response.data);
      setAddFundsLoading(false);
      document.getElementById('addFunds').reset();
      toast.success('Fund added successfully');
      setTimeout(function(){
        location.reload();
      },3000)
      onClose();
    } catch (error) {
      console.error('Error adding funds:', error);
      setAddFundsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <ToastContainer />
      <DialogBackdrop className="fixed inset-0 bg-gray-500/20 transition-opacity" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <DialogTitle className="text-lg font-medium leading-6 text-gray-900 mb-5">
                Add Funds to {ucFirst(selectedWorkspace)}
              </DialogTitle>
              <form id="addFunds">
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Enter Amount</label>
                  <input
                    type="text"
                    placeholder="Eg: 100"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-2 border rounded-lg mb-4"
                  />
                </div>

                <div className="">
                  <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full p-2 border rounded-lg mt-2"
                  >
                    <option value="">Select Payment Method</option>
                    <option value="card">Card Payment</option>
                    <option value="manual">Manual Transfer</option>
                    <option value="cash">Cash Payment</option>
                  </select>
                </div>

                {(paymentMethod === 'card' || paymentMethod === 'cash') && (
                  <div className="mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Payment Status</label>
                      <select
                        value={paymentStatus}
                        onChange={(e) => {setPaymentStatus(e.target.value);console.log(e.target.value);
                        }}
                        className="w-full p-2 border rounded-lg mt-2"
                      >
                        <option value="">Select Payment Status</option>
                        <option value="settled">Settled</option>
                        <option value="failed">Failed</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">Upload document</label>
                      <input
                        type="file"
                        placeholder="upload file"
                        onChange={handleFileChange}
                        className="w-full p-2 border rounded-lg mb-4"
                      />
                    </div>
                  </div>
                )}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Reason</label>
                  <input
                    type="text"
                    placeholder="Enter reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full p-2 border rounded-lg mb-4"
                  />
                </div>
              </form>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={handleAddFunds}
                disabled={addFundsLoading}
                className={`inline-flex w-full justify-center rounded-md border border-transparent ${
                  addFundsLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                } px-4 py-2 text-white shadow-sm sm:ml-3 sm:w-auto sm:text-sm`}
              >
                Add Funds
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-100 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

AddFundsDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedWorkspace: PropTypes.string,
  type: PropTypes.string.isRequired,
  creditor: PropTypes.string,
  debitor: PropTypes.string.isRequired,
};