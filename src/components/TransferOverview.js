import React from 'react';
import { RxDownload } from 'react-icons/rx';

export default function TransferOverview() {
  return (
    <>
      <div className="grid grid-cols-12 border border-custom-neutral-900 rounded-xl items-center">
        <div
          className="col-span-7 flex items-center py-3 gap-12 text-sm px-2 border-r border-r-custom-neutral-900">
          <div className="flex items-center gap-4">
            <img
              className="w-16 h-16 rounded-full"
              src="https://avataaars.io/?avatarStyle=Circle&topType=Eyepatch&facialHairType=MoustacheFancy&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Wink&eyebrowType=Default&mouthType=Default&skinColor=Light"
            />
            <div>
              <div className="mb-1">Arianna Craigg</div>
              <div>084847293823</div>
            </div>
          </div>
          <div>
            <div className="mb-1">Total Completed Transaction Amount:</div>
            <div>&#163; 2.00</div>
          </div>
        </div>
        <div className="col-span-5 px-2">
          <div className="flex justify-around text-sm">
            <div className="">
              <div>Total Completed Transaction Amount:</div>
              <div>&#163; 2.00</div>
            </div>
            <div>
              <RxDownload
                className="cursor-pointer rounded-full w-10 h-10 bg-custom-neutral-900 text-sm p-2 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 my-4 gap-4">
        <div className="col-span-4 px-4 py-4 border-2 rounded-xl border-custom-neutral-900">
          <div className="mb-4">
            <div className="text-sm font-semibold">Send Account</div>
            <div className="flex justify-between py-2">
              <div className="font-light text-sm text-gray-700">Sender Name</div>
              <div className="font-semibold text-sm text-right">John Smith</div>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-sm font-semibold">Manual Bank Account Details</div>
            <div className="flex justify-between py-2">
              <div className="font-light text-sm text-gray-700">Account Name</div>
              <div className="font-semibold text-sm text-right">John Smith</div>
            </div>
            <div className="flex justify-between py-2">
              <div className="font-light text-sm text-gray-700">Account Number</div>
              <div className="font-semibold text-sm text-right">63013282</div>
            </div>
            <div className="flex justify-between py-2">
              <div className="font-light text-sm text-gray-700">Sort Code</div>
              <div className="font-semibold text-sm text-right">040344</div>
            </div>
            <div className="flex justify-between py-2">
              <div className="font-light text-sm text-gray-700">Reference Number</div>
              <div className="font-semibold text-sm text-right">080743248924204</div>
            </div>
          </div>
          <div className="mb-4">
            <div className="text-sm font-semibold">Receiver Account</div>
            <div className="flex justify-between py-2">
              <div className="font-light text-sm text-gray-700">Beneficiary Name</div>
              <div className="font-semibold text-sm text-right">Aditya Kumar</div>
            </div>
            <div className="flex justify-between py-2">
              <div className="font-light text-sm text-gray-700">Beneficiary Account No</div>
              <div className="font-semibold text-sm text-right">63013282</div>
            </div>
            <div className="flex justify-between py-2">
              <div className="font-light text-sm text-gray-700">IFSC Code/IBan</div>
              <div className="font-semibold text-sm text-right">040344318</div>
            </div>
          </div>

        </div>

        <div className="col-span-8">

          <div className="border-2 rounded-xl border-custom-neutral-900 px-4 py-4">
            <div className="flex gap-4 items-center">
              <div className="text-[#F00D11] text-lg font-semibold">&#163; 0.00</div>
              <span className="text-xs font-semibold">Paid out/Draft</span>
            </div>

            <div className="grid grid-cols-3 my-6">
              <div className="col-span-1">
                <div className="font-light text-sm pb-2">Created At</div>
                <div className="font-semibold text-sm">08-07-2024 13:12</div>
              </div>
              <div className="col-span-1">
                <div className="font-light text-sm pb-2">Transfer Type</div>
                <div className="font-semibold text-sm">Money Transfer</div>
              </div>
              <div className="col-span-1">
                <div className="font-light text-sm pb-2">Sending Currency</div>
                <div className="font-semibold text-sm">GBP</div>
              </div>
            </div>
            <div className="grid grid-cols-3 my-6">
              <div className="col-span-1">
                <div className="font-light text-sm pb-2">Created At</div>
                <div className="font-semibold text-sm">08-07-2024 13:12</div>
              </div>
              <div className="col-span-1">
                <div className="font-light text-sm pb-2">Transfer Type</div>
                <div className="font-semibold text-sm">Money Transfer</div>
              </div>
              <div className="col-span-1">
                <div className="font-light text-sm pb-2">Sending Currency</div>
                <div className="font-semibold text-sm">GBP</div>
              </div>
            </div>
            <div className="grid grid-cols-3 my-6">
              <div className="col-span-1">
                <div className="font-light text-sm pb-2">Exchange Rate</div>
                <div className="font-semibold text-sm">&#163; 0.5</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}