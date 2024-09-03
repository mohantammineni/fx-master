import React from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

const tabCss = 'py-2 px-8 flex-grow data-[selected]:bg-[#40DEFF] data-[hover]:bg-white/5 data-[selected]:text-slate-900 font-medium data-[selected]:outline-none rounded';
const nestedTabCss = 'px-4 py-2 text-sm border border-custom-neutral-900 font-semibold text-slate-900 rounded-2xl data-[selected]:bg-custom-blue-400 data-[selected]:outline-none';

export default function MembershipShow() {
  return (
    <div>
    <div className="flex items-center bg-custom-neutral-900 text-custom-ivory-500 rounded-2xl px-4 py-4">
      <div className="flex flex-col items-center mr-8">
        <img src="https://via.placeholder.com/48" alt="Avatar" className="w-12 h-12 rounded-full" />
        <span className="mt-2 text-sm font-medium">User Name</span>
      </div>

      <div className="border-r border-gray-300 h-16"></div>

      <div className="ml-8 flex-1">
        <div className="pb-2 mb-2">
        <span className="text-sm font-semibold border-b border-gray-400 inline-block">
          Membership Details
        </span>
        </div>
        <div className="flex text-sm justify-between text-sm">
          <span>Email: <span className="font-medium">xyz@email.com</span></span>
          <span>Phone: <span className="font-medium">12423</span></span>
          <span>ID: <span className="font-medium">12345</span></span>
          <span>Type: <span className="font-medium">Individual</span></span>
          <span>Status: <span className="font-medium text-red-500">Inactive</span></span>
        </div>
      </div>
    </div>

      <TabGroup>
        <div className="grid grid-cols-12 gap-4 my-6">
          <div className="col-span-12">
            <TabList className="flex rounded bg-custom-neutral-900 text-custom-ivory-500 text-sm">
              <Tab className={tabCss}>General Information</Tab>
              <Tab className={tabCss}>Document Details</Tab>
              <Tab className={tabCss}>Verification</Tab>
              <Tab className={tabCss}>Exchange Rates</Tab>
              <Tab className={tabCss}>Notes</Tab>
            </TabList>
          </div>
        </div>
        <TabPanels>
          <div className="mt-4 font-medium">
            <TabPanel>
              <TabGroup>
                <TabList className="flex gap-4">
                  <Tab className={nestedTabCss}>Personal Information</Tab>
                  <Tab className={nestedTabCss}>Personal Address</Tab>
                  <Tab className={nestedTabCss}>Company Information</Tab>
                  <Tab className={nestedTabCss}>Company Address</Tab>
                </TabList>
              </TabGroup>
            </TabPanel>
          </div>
          <div>
            <TabPanel className="my-6">
              <p>Document details</p>
            </TabPanel>
          </div>
          <div><TabPanel className="">Verifications</TabPanel></div>
          <div>
            <TabPanel className="">
              <p>Exchange rates</p>
            </TabPanel>
          </div>
          <div>
            <TabPanel className="">
              <p>Notes</p>
            </TabPanel>
          </div>
        </TabPanels>
      </TabGroup>
    </div>
  );
}