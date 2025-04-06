import { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import React from 'react';
import axios from 'axios';
import { Constants } from '../../../lib/const/constants';
import toast from 'react-hot-toast';

export default function ChangeStatusDialog({ isOpen, onClose, transactionId, workspaceId }) {
  const [transactionStatus, setTransactionStatus] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  async function handleChangeStatus(event) {
    event.preventDefault();
    setIsProcessing(true);
    const data = {
      'transaction_id': transactionId,
      'workspace_id': workspaceId,
      'status': transactionStatus
    };

    try {
      const response = await axios.post(Constants.BASE_URL+'API-FX-219-CHANGE-TRANSACTION-STATUS', data, {
        headers: {
          fx_key: Constants.SUBSCRIPTION_KEY,
        },
      });
      console.log(response.data);
      setIsProcessing(false);
      document.getElementById('changeStatus').reset();
      toast.success('Transaction Status changed successfully.');
      onClose();
      setTimeout(function () {
          window.location.reload();
      }, 3000);
    } catch (error) {
      console.error('Error adding funds:', error);
      setIsProcessing(false);
    }
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-[60]">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/20 transition-opacity" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <DialogTitle className="text-lg font-medium leading-6 text-gray-900 mb-5">
                Change Transaction Status
              </DialogTitle>
              <form id="changeStatus">
                <div className="mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Payment Status</label>
                    <select
                      value={transactionStatus}
                      onChange={(e) => setTransactionStatus(e.target.value)}
                      className="w-full p-2 border rounded-lg mt-2"
                    >
                      <option value="">Select Payment Status</option>
                      <option value="settled">Settled</option>
                      <option value="failed">Failed</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={handleChangeStatus}
                disabled={isProcessing}
                className={`inline-flex w-full justify-center rounded-md border border-transparent ${
                  isProcessing ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                } px-4 py-2 text-white shadow-sm sm:ml-3 sm:w-auto sm:text-sm`}
              >
                Change Status
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

ChangeStatusDialog.propTypes = {
  transactionId: PropTypes.number,
  workspaceId: PropTypes.number,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
}