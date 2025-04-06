import React from 'react';
import HeadingBarWithSearch from '../../components/HeadingBarWithSearch';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { Link } from 'react-router-dom';
import TransferOverview from '../../components/TransferOverview';
import { FaCircleCheck } from 'react-icons/fa6';
import { IconContext } from 'react-icons';

const tabCss = 'py-2 px-8 flex-grow data-[selected]:bg-[#40DEFF] data-[hover]:bg-white/5 data-[selected]:text-slate-900 font-medium data-[selected]:outline-none rounded';

export default function TransactionShow() {
  return (
    <div className="my-2">
      <HeadingBarWithSearch title="Transfer Details" />
      <div>
        <TabGroup>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-8">
              <TabList className="flex rounded bg-custom-neutral-900 text-custom-ivory-500 text-sm">
                <Tab className={tabCss}>Overview</Tab>
                <Tab className={tabCss}>Kyc Documents</Tab>
                <Tab className={tabCss}>Notes & Attachment</Tab>
                <Tab className={tabCss}>Payouts</Tab>
              </TabList>
            </div>
            <div className="col-span-4 ml-auto flex items-center">
              <Link to="/" className="px-8 py-2 bg-[#40DEFF] rounded text-slate-900 text-sm font-semibold">Back</Link>
            </div>
          </div>
          <TabPanels>
            <div className="mt-4 font-medium">
              <TabPanel>
                <TransferOverview />
              </TabPanel>
            </div>
            <div>
              <TabPanel className="my-6">
                <div>
                  <Link
                    to={"/"}
                    className="px-4 py-2 text-sm border border-custom-neutral-900 font-semibold bg-custom-blue-400 text-slate-900 rounded-2xl"
                  >View Membership Details</Link>

                  <div className="grid grid-cols-3 my-6 gap-6">
                    <div className="bg-custom-neutral-900 col-span-1 rounded-2xl">
                      <img src="/d-1.jpg" alt="" className="h-32 object-cover w-full rounded-2xl" />
                      <div className="text-white text-center py-2 text-sm font-semibold">Address Proof</div>
                    </div>
                    <div className="bg-custom-neutral-900 col-span-1 rounded-2xl">
                      <img src="/d-1.jpg" alt="" className="h-32 object-cover w-full rounded-2xl" />
                      <div className="text-white text-center py-2 text-sm font-semibold">Identity Proof</div>
                    </div>
                    <div className="bg-custom-neutral-900 col-span-1 rounded-2xl">
                      <img src="/d-1.jpg" alt="" className="h-32 object-cover w-full rounded-2xl" />
                      <div className="text-white text-center py-2 text-sm font-semibold">Identity Proof Front</div>
                    </div>
                  </div>

                </div>
              </TabPanel>
            </div>
            <div><TabPanel className="">Notes & Attachment</TabPanel></div>
            <div>
              <TabPanel className="">
                <section
                  className="relative py-32 flex items-center justify-center overflow-hidden">
                  <div className="relative z-10 text-center">
                    <div className="text-xl font-bold mb-4 flex items-center gap-4">
                      <IconContext.Provider value={{ color: '012646', size: '40px' }}>
                          <FaCircleCheck />
                      </IconContext.Provider>

                      <span className="text-2xl text-slate-900">Yes Bank Payment</span>
                    </div>
                    <div className="mt-12">
                      <Link to={"/"} className="bg-custom-neutral-900 text-custom-sky-blue-500 px-20 py-2 rounded-full ">Submit</Link>
                    </div>
                  </div>
                </section>
              </TabPanel>
            </div>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
}