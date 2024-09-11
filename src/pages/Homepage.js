import React, { useEffect, useRef, useState } from 'react';
import ChooseUs from '../components/homepage/choose-us';
import Services from '../components/homepage/services';
import CustomerStoriesComponent from '../components/homepage/CustomerStoriesComponent';
import ContactInformation from '../components/homepage/ContactInformation';
// import { Link } from 'react-router-dom';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const countries = [
  {
    code: 'US',
    name: 'United States',
    currency: 'USD',
    flag: 'https://flagcdn.com/us.svg',
  },
  {
    code: 'IN',
    name: 'India',
    currency: 'INR',
    flag: 'https://flagcdn.com/in.svg',
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    currency: 'GBP',
    flag: 'https://flagcdn.com/gb.svg',
  },
  {
    code: 'CA',
    name: 'Canada',
    currency: 'CAD',
    flag: 'https://flagcdn.com/ca.svg',
  },
  {
    code: 'AU',
    name: 'Australia',
    currency: 'AUD',
    flag: 'https://flagcdn.com/au.svg',
  },
  {
    code: 'JP',
    name: 'Japan',
    currency: 'JPY',
    flag: 'https://flagcdn.com/jp.svg',
  },
  {
    code: 'DE',
    name: 'Germany',
    currency: 'EUR',
    flag: 'https://flagcdn.com/de.svg',
  },
  {
    code: 'FR',
    name: 'France',
    currency: 'EUR',
    flag: 'https://flagcdn.com/fr.svg',
  },
  {
    code: 'BR',
    name: 'Brazil',
    currency: 'BRL',
    flag: 'https://flagcdn.com/br.svg',
  },
  {
    code: 'ZA',
    name: 'South Africa',
    currency: 'ZAR',
    flag: 'https://flagcdn.com/za.svg',
  },
  {
    code: 'CN',
    name: 'China',
    currency: 'CNY',
    flag: 'https://flagcdn.com/cn.svg',
  },
  {
    code: 'RU',
    name: 'Russia',
    currency: 'RUB',
    flag: 'https://flagcdn.com/ru.svg',
  },
  {
    code: 'MX',
    name: 'Mexico',
    currency: 'MXN',
    flag: 'https://flagcdn.com/mx.svg',
  },
  {
    code: 'IT',
    name: 'Italy',
    currency: 'EUR',
    flag: 'https://flagcdn.com/it.svg',
  },
  {
    code: 'ES',
    name: 'Spain',
    currency: 'EUR',
    flag: 'https://flagcdn.com/es.svg',
  },
  {
    code: 'KR',
    name: 'South Korea',
    currency: 'KRW',
    flag: 'https://flagcdn.com/kr.svg',
  },
  {
    code: 'AR',
    name: 'Argentina',
    currency: 'ARS',
    flag: 'https://flagcdn.com/ar.svg',
  },
  {
    code: 'SA',
    name: 'Saudi Arabia',
    currency: 'SAR',
    flag: 'https://flagcdn.com/sa.svg',
  },
  {
    code: 'NG',
    name: 'Nigeria',
    currency: 'NGN',
    flag: 'https://flagcdn.com/ng.svg',
  },
  {
    code: 'EG',
    name: 'Egypt',
    currency: 'EGP',
    flag: 'https://flagcdn.com/eg.svg',
  },
];

function Homepage() {
  const scrollContainerRef = useRef(null);
  const [senderCountry, setSenderCountry] = useState(countries[0]);
  const [recipientCountry, setRecipientCountry] = useState(countries[6]);
  const [recipientAmount, setRecipientAmount] = useState('916.78');
  const [showACHFee, setShowACHFee] = useState(false);

  const toggleACHFee = () => {
    setShowACHFee(!showACHFee);
  };
  const calculateRecipientAmount = (baseAmount, currency) => {
    switch (currency) {
      case 'USD':
        return (baseAmount * 1.1).toFixed(2);
      case 'INR':
        return (baseAmount * 80).toFixed(2);
      case 'GBP':
        return (baseAmount * 0.85).toFixed(2);
      default:
        return baseAmount.toFixed(2);
    }
  };

  const handleRecipientCurrencyChange = (e) => {
    const selectedCurrency = e.target.value;
    const country = countries.find(
      (country) => country.currency === selectedCurrency,
    );
    setRecipientCountry(country);

    // Calculate the new recipient amount based on the selected currency
    const newAmount = calculateRecipientAmount(1000, selectedCurrency); // Assuming base amount is 1000
    setRecipientAmount(newAmount);
  };
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const scrollInterval = setInterval(() => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += 1;

        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
    }, 20);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] px-12 py-4 mt-16 gap-8 items-start">
        <div className="flex flex-col font-openSans justify-center mt-4">
          <h1 className="text-5xl font-bold text-custom-dark-blue leading-100 tracking-wide">
            Your Trusted Partner in Foreign Exchange
          </h1>
          <p className="text-lg mt-6 leading-relaxed text-black">
            At FX MASTER, we understand the importance of getting the best value
            for your money when dealing with foreign exchange. Whether
            you&apos;re traveling, studying abroad, or managing international
            investments, our personal foreign exchange services are designed to
            meet your needs with ease and efficiency.
          </p>
          <div className="flex gap-4 mt-6 justify-start">
            <a href="https://apps.apple.com/in/app/fxmaster-money-transfer/id6472921073">
              <img
                src="/app-store.png"
                alt="App Store"
                className="w-[170px] h-[50px]"
              />
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.fxmaster&hl=en-IN">
              <img
                src="/google-play.png"
                alt="Google Play"
                className="w-[170px] h-[50px]"
              />
            </a>
          </div>
        </div>

        <div className="bg-white p-4 mt-4 rounded-2xl shadow-md">
          <h3 className="mb-1 font-inter text-[14.85px]">You send exactly</h3>
          <div className="relative flex items-center">
            <input
              type="text"
              value="1000"
              className="w-full px-3 py-2 border border-custom-neutral-900 rounded-lg focus:outline-none pr-20"
            />
            <div className="absolute inset-y-0 right-0 flex items-center space-x-2 pr-3">
              <img
                src={senderCountry.flag}
                alt={senderCountry.currency}
                className="h-5 w-5 rounded-full"
              />
              <select
                value={senderCountry.currency}
                onChange={(e) =>
                  setSenderCountry(
                    countries.find(
                      (country) => country.currency === e.target.value,
                    ),
                  )
                }
                className="font-bold text-custom-neutral-900 bg-transparent focus:outline-none"
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.currency}>
                    {country.currency}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between mt-5 font-inter font-semibold text-base">
              <span>2.79 USD</span>
              <span
                className="flex items-center text-custom-dark-blue underline cursor-pointer font-inter font-semibold text-base"
                onClick={toggleACHFee}
              >
                Connected bank account (ACH) fee
                {showACHFee ? (
                  <FiChevronUp className="ml-2" />
                ) : (
                  <FiChevronDown className="ml-2" />
                )}
              </span>
            </div>

            {showACHFee && (
              <div className="space-y-2 font-inter">
                <div className="flex justify-between">
                  <span className="font-semibold text-base">4.86 USD</span>
                  <span>Our fee</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-base">7.65 USD</span>
                  <span>Total fees</span>
                </div>
                <div className="border-b border-gray-200 my-2"></div>
              </div>
            )}
          </div>
          <div className="mt-4 flex justify-between items-center font-inter">
            <span className="font-semibold text-base">992.35 USD</span>
            <span>Total amount we&apos;ll convert</span>
          </div>
          <div className="mt-2 font-inter flex justify-between font-semibold text-base">
            <span className="text-custom-dark-blue underline">0.9239</span>
            <span className="text-custom-dark-blue underline">
              Guaranteed rate (14h)
            </span>
          </div>
          <div className="mt-7">
            <h3 className="mb-1 font-inter text-[14.85px]">Recipient gets</h3>
            <div className="relative flex items-center">
              <input
                type="text"
                value={recipientAmount}
                readOnly
                className="w-full px-3 py-2 border border-custom-neutral-900 rounded-lg focus:outline-none pr-20"
              />
              <div className="absolute inset-y-0 right-0 flex items-center space-x-2 pr-3">
                <img
                  src={recipientCountry.flag}
                  alt={recipientCountry.currency}
                  className="h-5 w-5 rounded-full"
                />
                <select
                  value={recipientCountry.currency}
                  onChange={handleRecipientCurrencyChange}
                  className="font-bold text-custom-neutral-900 bg-transparent focus:outline-none"
                >
                  {countries.map((country) => (
                    <option key={country.code} value={country.currency}>
                      {country.currency}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-2 font-inter text-base">
            You could save up to{' '}
            <span className="font-semibold">39.16 USD</span>
          </div>
          <div className="mt-1 font-inter text-base">
            Should arrive <span className="font-semibold">in 4 hours</span>
          </div>
          <div className="flex justify-between mt-4">
            <button className="font-semibold text-custom-dark-blue border border-custom-dark-blue text-base px-6 py-2 rounded-full">
              Compare price
            </button>
            <button className="font-semibold bg-yellow-400 text-custom-neutral-900 text-base px-6 py-2 rounded-full">
              Send money now
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="w-full overflow-x-auto whitespace-nowrap"
      >
        <div className="flex space-x-4 py-2">
          {countries.concat(countries).map((country, index) => (
            <div key={index} className="flex-none">
              <img
                src={country.flag}
                alt={country.name}
                className="w-16 h-12 object-contain"
                title={country.name}
              />
            </div>
          ))}
        </div>
      </div>

      <section className="px-12 py-6 mt-6">
        <h2 className="text-4xl font-openSans font-bold text-custom-dark-blue tracking-wide">
          Why Choose Us?
        </h2>
        <div className="w-full overflow-x-auto">
          <div className="flex space-x-4 py-4">
            <ChooseUs
              heading="Real Exchange Rates"
              content="We use the mid-market exchange rate, just like you see on Google, ensuring you get the best value for your money."
              image="/fast-transfer.png"
              isCompact={true}
            />
            <ChooseUs
              heading="Fast Transfers"
              content="Most of our transfers are completed within 24hours, so your money gets where it needs to go, quickly and efficiently."
              image="/low-transparent-fees.png"
              isCompact={true}
            />
            <ChooseUs
              heading="Secure and Reliable"
              content="We use state-of-the-art-security measures to ensure your money and personal information and protected."
              image="/real-exchange-fee.png"
              isCompact={true}
            />
            <ChooseUs
              heading="Low Transparent Fees"
              content="Our fees are clearly displayed upfront. No surpises, no hidden charges-just fair transparent pricing."
              image="/secure-and-reliable.png"
              isCompact={true}
            />
          </div>
        </div>
      </section>

      <section className="px-12 py-6">
        <h2 className="text-4xl font-openSans font-bold text-custom-dark-blue tracking-wide">
          Our Services
        </h2>
        <div className="w-full overflow-x-auto">
          <div className="flex justify-around py-4">
            <Services
              title="Send Money Abroad"
              content="Transfer money internationally to over 70 countries at the real exchange rate. Whether it’s for family, friends, or business, we’ve got you covered."
              image="/services/send-money-abroad.png"
            />
            <Services
              title="Multi-Currency Accounts"
              content="Hold and manage money in multiple currencies. Convert between them whenever you need, at the real exchange rate."
              image="/services/multi-currency.png"
            />
            <Services
              title="Business Solutions"
              content="Simplify your international business payments. Pay invoices, manage payroll, and receive payments from abroad with ease."
              image="/services/business-solution.png"
            />
            <Services
              title="Red Alerts"
              content="Stay updated with our rate alert service. Get notified when your desired exchange rate is available."
              image="/services/red-alerts.png"
            />
          </div>
        </div>
      </section>

      <section className="px-12 py-6">
        <h2 className="text-4xl font-openSans font-bold text-custom-dark-blue tracking-wide">
          How it works?
        </h2>
        <div className="w-full">
          <div className="flex justify-between py-4 space-x-4">
            <div className="w-full px-6 py-4 bg-white rounded-2xl">
              <div className="flex flex-col md:flex-row items-center md:items-start">
                <div className="flex-1 text-center md:text-left">
                  <div className="rounded-full bg-[#FFC92E] w-12 h-12 flex items-center justify-center mb-4 font-bold text-2xl mx-auto md:mx-0">
                    1
                  </div>
                  <h3 className="text-xl font-bold font-openSans mb-4">
                    Create Your Account
                  </h3>
                  <p className="text-base font-bold font-openSans">
                    Sign up online or via our mobile app in minutes.
                  </p>
                </div>
                <div className="flex-shrink-0 mt-4 md:mt-0 md:ml-4 w-full md:w-auto">
                  <img
                    src="/how-it-works/create-your-account.png"
                    alt="create your account"
                    className="w-full md:w-80 h-auto"
                  />
                </div>
              </div>
            </div>

            <div className="w-full px-6 py-4 bg-white rounded-2xl">
              <div className="flex flex-col md:flex-row items-center md:items-start">
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4 w-full md:w-auto">
                  <img
                    src="/how-it-works/pay-your-transfer.png"
                    alt="pay your transfer"
                    className="w-full md:w-60 h-auto"
                  />
                </div>
                <div className="flex-1 text-center md:text-right flex flex-col items-center md:items-end">
                  <div className="rounded-full bg-[#FFC92E] w-12 h-12 flex items-center justify-center mb-4 font-bold text-2xl">
                    2
                  </div>
                  <h3 className="text-xl font-bold font-openSans mb-4">
                    Pay for Your Transfer
                  </h3>
                  <p className="text-base font-bold font-openSans">
                    Choose from a range of payment options, including bank
                    transfer, credit card, or debit card.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between py-4 space-x-4">
            <div className="w-full px-6 py-4 bg-white rounded-2xl">
              <div className="flex flex-col md:flex-row items-center md:items-start">
                <div className="flex-1 text-center md:text-left">
                  <div className="rounded-full bg-[#FFC92E] w-12 h-12 flex items-center justify-center mb-4 font-bold text-2xl mx-auto md:mx-0">
                    3
                  </div>
                  <h3 className="text-xl font-bold font-openSans mb-4">
                    Enter Transfer Details
                  </h3>
                  <p className="text-base font-bold font-openSans">
                    Input how much money you want to send, where to, and the
                    recipient’s details.
                  </p>
                </div>
                <div className="flex-shrink-0 mt-4 md:mt-0 md:ml-4 w-full md:w-auto">
                  <img
                    src="/how-it-works/enter-transfer-details.png"
                    alt="enter transfer details"
                    className="w-full md:w-60 h-auto"
                  />
                </div>
              </div>
            </div>

            <div className="w-full px-6 py-4 bg-white rounded-2xl">
              <div className="flex flex-col md:flex-row items-center md:items-start">
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4 w-full md:w-auto">
                  <img
                    src="/how-it-works/track-your-transfer.png"
                    alt="track your transfer"
                    className="w-full md:w-60 h-auto"
                  />
                </div>
                <div className="flex-1 text-center md:text-right flex flex-col items-center md:items-end">
                  <div className="rounded-full bg-[#FFC92E] w-12 h-12 flex items-center justify-center mb-4 font-bold text-2xl">
                    4
                  </div>
                  <h3 className="text-xl font-bold font-openSans mb-4">
                    Track Your Transfer
                  </h3>
                  <p className="text-base font-bold font-openSans">
                    Stay updated with real-time notifications on your transfer
                    status until it reaches its destination.
                  </p>
                </div>
              </div>
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
}

export default Homepage;
