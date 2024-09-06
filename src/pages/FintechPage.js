import React from 'react';
import { FiCheck } from 'react-icons/fi';
import CustomerStoriesComponent from '../components/homepage/CustomerStoriesComponent';

const FintechPage = () => {
  return (
    <>
      <section className="relative w-full py-8 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 text-left">
          <h1 className="text-4xl md:text-4xl font-openSans leading-tight tracking-wide mt-4">
            <span className="font-bold text-custom-dark-blue">
              White label banking <br />
              Solutions:
            </span>{' '}
            <span className="font-normal text-black">
              When complicated becomes simple
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-lg text-black leading-relaxed">
            We understand, like no one else, how hard it can be to develop and
            launch your own banking and payment systems. At the same time, we
            believe in businesses without limits and offer our white-label
            banking solutions to help business owners save their time and
            resources and focus on development, sales, and speed to the market.
          </p>
          <button className="mt-6 bg-custom-dark-blue text-white py-3 px-6 rounded-full text-lg font-inter font-normal">
            Request Now
          </button>
        </div>

        <div className="md:w-1/2 flex justify-end mt-8 md:mt-0">
          <img
            src="/fintech/fintech-hero.png"
            alt="Globe with Currency Symbols"
            className="w-full max-w-xs md:max-w-sm lg:max-w-md h-auto"
          />
        </div>
      </section>
      <section className="relative w-full py-12 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between">
        <div className="hidden md:flex md:w-1/4 justify-center">
          <img
            src="/fintech/boy.png"
            alt="Person with Megaphone"
            className="w-full max-w-[75%] h-auto"
          />
        </div>

        <div className="md:w-1/2 bg-blue-700 text-white rounded-xl p-6 md:p-10 text-center">
          <h2 className="bg-yellow-400 text-black text-lg font-semibold py-2 px-20 rounded-lg inline-block mb-6">
            White Label Solutions
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold w-2/3 text-left">
                Time to launch
              </span>
              <div className="flex items-center justify-start w-1/3">
                <FiCheck className="text-yellow-400 w-5 h-5 mr-2" />
                <span>1-2 months</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold w-2/3 text-left">Compliance</span>
              <div className="flex items-center justify-start w-1/3">
                <FiCheck className="text-yellow-400 w-5 h-5 mr-2" />
                <span>Provided</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold w-2/3 text-left">IT</span>
              <div className="flex items-center justify-start w-1/3">
                <FiCheck className="text-yellow-400 w-5 h-5 mr-2" />
                <span>Provided</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold w-2/3 text-left">License</span>
              <div className="flex items-center justify-start w-1/3">
                <FiCheck className="text-yellow-400 w-5 h-5 mr-2" />
                <span>Provided</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold w-2/3 text-left">
                Minimum team
              </span>
              <div className="flex items-center justify-start w-1/3">
                <FiCheck className="text-yellow-400 w-5 h-5 mr-2" />
                <span>1-2</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex md:w-1/4 justify-center">
          <img
            src="/fintech/girl.png"
            alt="Person with Megaphone"
            className="w-full max-w-[75%] h-auto"
          />
        </div>
      </section>
      <section className="px-12 py-6 mt-6">
        <h2 className="text-4xl font-openSans font-bold text-custom-dark-blue tracking-wide">
          All-in-one solution for fintech
        </h2>

        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center mt-10">
          <div>
            <img
              src="/fintech/internet-banking.png"
              alt="Internet banking"
              className="mx-auto mb-4 w-20 h-20"
            />
            <p className="text-lg font-medium font-openSanse">
              Internet banking
            </p>
          </div>

          <div>
            <img
              src="/fintech/ios-android-apps.png"
              alt="iOS and Android apps"
              className="mx-auto mb-4 w-20 h-20"
            />
            <p className="text-lg font-medium font-openSanse">
              iOS and Android apps
            </p>
          </div>

          <div>
            <img
              src="/fintech/multi-currency.png"
              alt="Multi-currency accounts"
              className="mx-auto mb-4 w-20 h-20"
            />
            <p className="text-lg font-medium font-openSanse">
              Multi-currency accounts
            </p>
          </div>

          <div>
            <img
              src="/fintech/dedicated-ibans.png"
              alt="Dedicated IBANs"
              className="mx-auto mb-4 w-20 h-20"
            />
            <p className="text-lg font-medium font-openSanse">
              Dedicated IBANs
            </p>
          </div>

          <div>
            <img
              src="/fintech/swift-payments.png"
              alt="SWIFT payments"
              className="mx-auto mb-4 w-20 h-20"
            />
            <p className="text-lg font-medium font-openSanse">SWIFT payments</p>
          </div>

          <div>
            <img
              src="/fintech/sepa-instant-payments.png"
              alt="SEPA Instant payments"
              className="mx-auto mb-4 w-20 h-20"
            />
            <p className="text-lg font-medium font-openSanse">
              SEPA Instant payments
            </p>
          </div>

          <div>
            <img
              src="/fintech/apis.png"
              alt="APIs"
              className="mx-auto mb-4 w-20 h-20"
            />
            <p className="text-lg font-medium font-openSanse">APIs</p>
          </div>

          <div>
            <img
              src="/fintech/strong-customer.png"
              alt="Strong customer"
              className="mx-auto mb-4 w-20 h-20"
            />
            <p className="text-lg font-medium font-openSanse">
              Strong customer authentication
            </p>
          </div>
          <div>
            <img
              src="/fintech/kyb-onboarding.png"
              alt="KYC/KYB Onboarding"
              className="mx-auto mb-4 w-20 h-20"
            />
            <p className="text-lg font-medium font-openSanse">
              KYC/KYB onboarding
            </p>
          </div>
          <div>
            <img
              src="/fintech/open-banking.png"
              alt="Open Bank"
              className="mx-auto mb-4 w-20 h-20"
            />
            <p className="text-lg font-medium font-openSanse">Open banking</p>
          </div>
        </div>
      </section>
      <section className="px-12 py-6 mt-6">
        <h2 className="text-4xl font-openSans font-bold text-custom-dark-blue tracking-wide">
          Benifits
        </h2>

        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center mt-10">
          <div>
            <img
              src="/fintech/aml.png"
              alt="AML and compliance coverage"
              className="mx-auto mb-4 w-20 h-20"
            />
            <p className="text-lg font-medium font-openSanse">
              AML and compliance coverage
            </p>
          </div>

          <div>
            <img
              src="/fintech/it-infra.png"
              alt="Full IT infrastructure"
              className="mx-auto mb-4 w-20 h-20"
            />
            <p className="text-lg font-medium font-openSanse">
              Full IT infrastructure
            </p>
          </div>

          <div>
            <img
              src="/fintech/customisable-pricing.png"
              alt="Custamisable pricing"
              className="mx-auto mb-4 w-20 h-20"
            />
            <p className="text-lg font-medium font-openSanse">
              Custamisable pricing
            </p>
          </div>

          <div>
            <img
              src="/fintech/tailor-made.png"
              alt="tailor made features on demand"
              className="mx-auto mb-4 w-20 h-20"
            />
            <p className="text-lg font-medium font-openSanse">
              tailor made features on demand
            </p>
          </div>
        </div>
      </section>
      <section className="px-12 py-6 mt-6">
        <h2 className="text-4xl font-openSans font-bold text-custom-dark-blue tracking-wide">
          Our Customers Stories
        </h2>
        <div className="w-full overflow-x-auto">
          <div className="flex justify-around py-4">
            <CustomerStoriesComponent />
          </div>
        </div>
      </section>
      <section className="py-12 flex justify-center">
        <div className="bg-custom-dark-blue rounded-2xl p-6 md:p-12 flex items-center justify-between max-w-5xl w-full">
          <h2 className="text-lg md:text-2xl font-openSans font-bold text-custom-yellow">
            Interested to learn more about the <br /> white-label banking
            solution?
          </h2>
          <button className="bg-yellow-400 text-custom-dark-blue font-semibold py-2 px-6 md:px-8 rounded-full hover:bg-yellow-300">
            Contact Us
          </button>
        </div>
      </section>
    </>
  );
};

export default FintechPage;
