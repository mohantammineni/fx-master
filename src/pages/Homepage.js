import React, { useEffect, useRef } from 'react';
import ChooseUs from '../components/homepage/choose-us';
import Services from '../components/homepage/services';
// import CustomerStoriesComponent from '../components/homepage/CustomerStoriesComponent';
import ContactInformation from '../components/homepage/ContactInformation';
import { Link } from 'react-router-dom';
import FrontFooter from '../components/shared/FrontFooter';

const countries = [
  { code: 'US', name: 'United States', currency: 'USD', flag: 'https://flagcdn.com/us.svg' },
  { code: 'IN', name: 'India', currency: 'INR', flag: 'https://flagcdn.com/in.svg' },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP', flag: 'https://flagcdn.com/gb.svg' },
  { code: 'CA', name: 'Canada', currency: 'CAD', flag: 'https://flagcdn.com/ca.svg' },
  { code: 'AU', name: 'Australia', currency: 'AUD', flag: 'https://flagcdn.com/au.svg' },
  { code: 'JP', name: 'Japan', currency: 'JPY', flag: 'https://flagcdn.com/jp.svg' },
  { code: 'DE', name: 'Germany', currency: 'EUR', flag: 'https://flagcdn.com/de.svg' },
  { code: 'FR', name: 'France', currency: 'EUR', flag: 'https://flagcdn.com/fr.svg' },
  { code: 'BR', name: 'Brazil', currency: 'BRL', flag: 'https://flagcdn.com/br.svg' },
  { code: 'ZA', name: 'South Africa', currency: 'ZAR', flag: 'https://flagcdn.com/za.svg' },
  { code: 'CN', name: 'China', currency: 'CNY', flag: 'https://flagcdn.com/cn.svg' },
  { code: 'RU', name: 'Russia', currency: 'RUB', flag: 'https://flagcdn.com/ru.svg' },
  { code: 'MX', name: 'Mexico', currency: 'MXN', flag: 'https://flagcdn.com/mx.svg' },
  { code: 'IT', name: 'Italy', currency: 'EUR', flag: 'https://flagcdn.com/it.svg' },
  { code: 'ES', name: 'Spain', currency: 'EUR', flag: 'https://flagcdn.com/es.svg' },
  { code: 'KR', name: 'South Korea', currency: 'KRW', flag: 'https://flagcdn.com/kr.svg' },
  { code: 'AR', name: 'Argentina', currency: 'ARS', flag: 'https://flagcdn.com/ar.svg' },
  { code: 'SA', name: 'Saudi Arabia', currency: 'SAR', flag: 'https://flagcdn.com/sa.svg' },
  { code: 'NG', name: 'Nigeria', currency: 'NGN', flag: 'https://flagcdn.com/ng.svg' },
  { code: 'EG', name: 'Egypt', currency: 'EGP', flag: 'https://flagcdn.com/eg.svg' },
];

function Homepage() {
  const scrollContainerRef = useRef(null);

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
      <div className="grid grid-cols-3 px-12 py-4 mt-6">
        <div className="col-span-3 justify-center text-center">
          <div className="pb-6">
            <h1 className="text-5xl font-semibold text-blue-700 leading-tight tracking-wide">
              Your Trusted Partner in International Money Transfer
            </h1>
            <p className="text-lg mt-6 tracking-wide font-lightbold leading-relaxed">At FX MASTER, we understand the
              importance of getting the best value for your money when dealing with international money transfer. Wheather you are
              travelling, studying abroad, or managing international
              investments, our personal international money transfer services are designed to meet your needs with ease and
              efficiency.</p>
          </div>
          <div className="flex gap-4 mt-6 justify-center my-8">
            <Link to="https://play.google.com/store/apps/details?id=com.fxmaster&hl=en-IN">
              <img src="/google-play.png" alt="Google Play" className="w-[170px] h-[50px]" />
            </Link>
            <Link to="https://apps.apple.com/in/app/fxmaster-money-transfer/id6472921073">
              <img src="/app-store.png" alt="App Store" className="w-[170px] h-[50px]" />
            </Link>
          </div>
        </div>
        {/* use ConversionComponent here */}
      </div>

      <div ref={scrollContainerRef} className="w-full overflow-x-auto whitespace-nowrap">
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
        <h2 className="text-4xl font-semibold text-blue-700">Why Choose Us?</h2>
        <div className="w-full overflow-x-auto">
          <div className="flex space-x-4 py-4">
            <ChooseUs heading="Real Exchange Rates" content="We use the mid-market exchange rate, just like you see on Google, ensuring you get the best value for your money." image="/fast-transfer.png" />
            <ChooseUs heading="Fast Transfers" content="Most of our transfers are completed within 24hours, so your money gets where it needs to go, quickly and efficiently." image="/low-transparent-fees.png" />
            <ChooseUs heading="Secure and Reliable" content="We use state-of-the-art-security measures to ensure your money and personal information and protected." image="/real-exchange-fee.png" />
            <ChooseUs heading="Low Transparent Fees" content="Our fees are clearly displayed upfront. No surpises, no hidden charges-just fair transparent pricing." image="/secure-and-reliable.png" />
          </div>
        </div>
      </section>

      <section className="px-12 py-6">
        <h2 className="text-4xl font-semibold text-blue-700">Our Services</h2>
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
        <h2 className="text-4xl font-semibold text-blue-700">How it works?</h2>
        <div className="w-full">
          <div className="flex justify-between py-4 space-x-4">
            <div className="w-full px-6 py-4 bg-white rounded-2xl">
              <div className="flex">
                <div className="flex-1">
                  <div
                    className="rounded-full bg-[#FFC92E] w-12 h-12 flex items-center justify-center mb-4 font-bold text-2xl">
                    1
                  </div>
                  <h3 className="text-xl font-medium mb-4">Create Your Account</h3>
                  <p className="text-base font-lightbold">Sign up online or via our mobile app in minutes.</p>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <img src="/how-it-works/create-your-account.png" alt="create your account" className="w-80 h-auto" />
                </div>
              </div>
            </div>
            <div className="w-full px-6 py-4 bg-white rounded-2xl">
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <img src="/how-it-works/pay-your-transfer.png" alt="create your account" className="w-60 h-auto" />
                </div>
                <div className="flex-1 text-right flex flex-col items-end">
                  <div
                    className="rounded-full bg-[#FFC92E] w-12 h-12 flex items-center justify-center mb-4 font-bold text-2xl">
                    2
                  </div>
                  <h3 className="text-xl font-medium mb-4">Pay for Your Transfer</h3>
                  <p className="text-base font-lightbold">Choose from a range of payment options, including bank transfer, credit card,
                    or debit card.</p>
                </div>
              </div>
            </div>

          </div>

          <div className="flex justify-between py-4 space-x-4">
            <div className="w-full px-6 py-4 bg-white rounded-2xl">
              <div className="flex">
                <div className="flex-1">
                  <div
                    className="rounded-full bg-[#FFC92E] w-12 h-12 flex items-center justify-center mb-4 font-bold text-2xl">
                    3
                  </div>
                  <h3 className="text-xl font-medium mb-4">Enter Transfer Details</h3>
                  <p className="text-base font-lightbold">Input how much money you want to send, where to, and the recipient’s
                    details.</p>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <img src="/how-it-works/enter-transfer-details.png" alt="create your account"
                       className="w-60 h-auto" />
                </div>
              </div>
            </div>
            <div className="w-full px-6 py-4 bg-white rounded-2xl">
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <img src="/how-it-works/track-your-transfer.png" alt="create your account" className="w-60 h-auto" />
                </div>
                <div className="flex-1 text-right flex flex-col items-end">
                  <div
                    className="rounded-full bg-[#FFC92E] w-12 h-12 flex items-center justify-center mb-4 font-bold text-2xl">
                    4
                  </div>
                  <h3 className="text-xl font-medium mb-4">Track Your Transfer</h3>
                  <p className="text-base font-lightbold">Stay updated with real-time notifications on your transfer status until it
                    reaches its destination.</p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* <section className="px-12 py-6">
        <h2 className="text-4xl font-semibold text-blue-700">Our Customers Stories</h2>
        <div className="w-full overflow-x-auto">
          <div className="flex justify-around py-4">
            <CustomerStoriesComponent />
          </div>
        </div>
      </section> */}

      <section
        className="relative w-full h-[50vh] bg-cover bg-center"
        style={{ backgroundImage: 'url(\'/get-started-today.png\')' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex justify-center items-center h-full px-4">
          <div className="bg-white bg-opacity-90 rounded-2xl p-8 max-w-2xl w-full text-center">
            <h1 className="text-3xl font-bold text-gray-1000 mb-4">Get Started Today</h1>
            <p className="text-lg text-[#1152BE]">Sign up for FX MASTER today and start saving on your international
              money transfers. Experience the convenience, speed, and transparency that millions of satisfied customers
              enjoy.</p>
          </div>
        </div>
      </section>

      <section className="container mx-auto rounded-2xl mt-12 px-12">
        <ContactInformation />
      </section>

      <section className="mt-12">
        <FrontFooter />
      </section>
    </>
  );
}

export default Homepage;