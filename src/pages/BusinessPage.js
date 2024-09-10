import React from 'react';
import ChooseUs from '../components/homepage/choose-us';
import ContactInformation from '../components/homepage/ContactInformation';
import CustomerStoriesComponent from '../components/homepage/CustomerStoriesComponent';

const BusinessPage = () => {
  return (
    <>
      <section className="relative w-full min-h-screen">
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/business/business-hero-bg.png"
            alt="Blue Background"
            className="w-full h-full object-fill"
            style={{ objectPosition: 'top left' }}
          />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start justify-between h-full pt-4 md:pt-8">
          {/* Text Container */}
          <div className="max-w-lg md:max-w-none md:text-left md:w-1/2 font-openSans pl-6 pr-6 md:pl-10 md:pr-0 pt-12 text-white">
            <h1 className="text-4xl md:text-3xl font-bold tracking-wide">
              Your Partner in Global Business Transactions
            </h1>
            <div className="border-b-4 border-white w-24 mt-2"></div>
            <p className="mt-4 w-[72%] md:w-full text-sm md:text-lg font-bold">
              Navigating the complexities of international business has never
              been easier. At FXMaster, we offer a suite of services designed to
              simplify cross-border payments, streamline payment collections,
              and manage multi-currency accounts, all tailored to meet the
              unique needs of business customers.
            </p>
          </div>

          {/* Image Container */}
          <div className="relative md:w-1/2 flex justify-center mt-6 md:mt-0 px-6">
            <img
              src="/business/business-hero.png"
              alt="Woman with Flags"
              className="w-full max-w-xs md:max-w-md lg:max-w-lg h-auto"
            />
          </div>
        </div>
      </section>

      <section className="px-12 py-6 mt-6">
        <h2 className="text-4xl font-openSans font-bold text-custom-dark-blue tracking-wide">
          Why Choose Fx Master ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-5">
          <div className="bg-white rounded-2xl shadow-md p-4">
            <img
              src="/business/competitive-exchange-rates.png"
              alt="Competitive Exchange Rates"
              className="rounded-lg w-full h-40 object-cover mb-4"
            />
            <h3 className="text-lg font-bold font-openSans text-black mb-2">
              Competitive Exchange Rates:
            </h3>
            <p className="text-sm text-black font-bold">
              Rates: Maximize your savings with the best exchange rates
              available.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-4">
            <img
              src="/business/transparent-fees.png"
              alt="Transparent Fees"
              className="rounded-lg w-full h-40 object-cover mb-4"
            />
            <h3 className="text-lg font-bold font-openSans text-black mb-2">
              Transparent Fees:
            </h3>
            <p className="text-sm text-black font-bold">
              No hidden costs. Our pricing is straightforward, so you know
              exactly what you&apos;re paying.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-4">
            <img
              src="/business/secure-transactions.png"
              alt="Fast and Secure Transactions"
              className="rounded-lg w-full h-40 object-cover mb-4"
            />
            <h3 className="text-lg font-bold font-openSans text-black mb-2">
              Fast and Secure Transactions:
            </h3>
            <p className="text-sm text-black font-bold">
              Enjoy quick, reliable, and secure transactions, protecting your
              funds and data.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-4">
            <img
              src="/business/global-reach.png"
              alt="Global Reach"
              className="rounded-lg w-full h-40 object-cover mb-4"
            />
            <h3 className="text-lg font-bold font-openSans text-black mb-2">
              Global Reach:
            </h3>
            <p className="text-sm text-black font-bold">
              Conduct business seamlessly with partners, suppliers, and
              customers worldwide.
            </p>
          </div>
        </div>
      </section>
      <section className="px-12 py-6 mt-6">
        <h2 className="text-4xl font-openSans font-bold text-custom-dark-blue tracking-wide">
          Why Choose Us?
        </h2>
        <div className="w-full py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ChooseUs
              heading="Cross-Border Payments"
              content={
                <>
                  <p>
                    Efficiently manage your international transactions with our
                    cross-border payment solutions. Whether you&apos;re paying
                    suppliers, partners, or employees, we ensure your payments
                    are fast, secure, and cost-effective.
                  </p>
                  <ul className="list-disc list-inside space-y-1 mt-5 ml-3">
                    <li>
                      Real-Time Transfers: Reduce delays and improve cash flow
                      with real-time payment processing.
                    </li>
                    <li>
                      Multiple Payment Methods: Choose from a variety of payment
                      options tailored to your business needs.
                    </li>
                    <li>
                      Detailed Reporting: Keep track of your international
                      transactions with comprehensive reports and histories.
                    </li>
                  </ul>
                </>
              }
              image="/business/cross-border-payments.png"
              isCompact={false}
            />
            <ChooseUs
              heading="Payments Collection"
              content={
                <>
                  <p>
                    Simplify how you collect payments from customers globally.
                    Our payment collection solutions make it easy to receive
                    funds, no matter where your clients are located.
                  </p>
                  <ul className="list-disc list-inside space-y-1 mt-5 ml-3">
                    <li>
                      Secure Payment Gateways: Facilitate seamless and secure
                      transactions with our reliable payment gateways.
                    </li>
                  </ul>
                </>
              }
              image="/business/payments-collection.png"
              isCompact={false}
            />
            <ChooseUs
              heading="Multi-Currency Accounts"
              content={
                <>
                  <p>
                    Manage your finances more effectively with our
                    multi-currency accounts. Hold and convert multiple
                    currencies within a single account, giving you greater
                    control over your international transactions.
                  </p>
                  <ul className="list-disc list-inside space-y-1 mt-5 ml-3">
                    <li>
                      Hold Multiple Currencies: Avoid conversion fees and manage
                      exchange rate risks by holding balances in various
                      currencies.
                    </li>
                    <li>
                      Instant Currency Conversion: Convert currencies instantly
                      at the real exchange rate whenever needed.
                    </li>
                    <li>
                      Integrated Account Management: Manage all your currencies
                      in one place with our user-friendly platform, providing
                      real-time updates and detailed insights.
                    </li>
                  </ul>
                </>
              }
              image="/business/multi-currency.png"
              isCompact={false}
            />
          </div>
        </div>
      </section>
      <section className="px-12 py-6 mt-6">
        <div className="bg-custom-dark-blue text-white py-12 px-6 rounded-lg">
          <h2 className="text-center text-3xl font-bold font-openSans mb-8">
            Why Businesses Trust Us
          </h2>
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="bg-white p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-black"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 00-1.414 0L7 13.586 4.707 11.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l9-9a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="ml-4 text-lg font-bold font-openSans">
                Scalability For All Business
              </span>
            </div>
            <hr className="border-t border-gray-300" />
            <div className="flex items-center">
              <div className="bg-white p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-black"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 00-1.414 0L7 13.586 4.707 11.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l9-9a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="ml-4 text-lg font-bold font-openSans">
                Robust Governance Transaction Monitoring
              </span>
            </div>
            <hr className="border-t border-gray-300" />
            <div className="flex items-center">
              <div className="bg-white p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-black"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 00-1.414 0L7 13.586 4.707 11.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l9-9a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="ml-4 text-lg font-bold font-openSans text-white">
                Compliance Services: Navigate Regulations Easily
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="px-12 py-6">
        <h2 className="text-4xl font-semibold text-blue-700">
          Our Customers Stories
        </h2>
        <div className="w-full overflow-x-auto">
          <div className="flex justify-around py-4">
            <CustomerStoriesComponent />
          </div>
        </div>
      </section>
      <section
        className="relative w-full h-[50vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/get-started-today.png')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative flex justify-center items-center h-full px-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full text-center">
            <h1 className="text-3xl font-extrabold text-black font-openSans mb-4">
              Get Started Today
            </h1>
            <div className="mx-auto w-[75%]">
              <p className="text-base font-semibold font-openSans text-[#1152BE]">
                Sign up for FX MASTER today and start saving on your
                international money transfers. Experience the convenience,
                speed, and transparency that our customers enjoy.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto rounded-2xl mt-12 mb-12 px-12">
        <ContactInformation />
      </section>
    </>
  );
};

export default BusinessPage;
