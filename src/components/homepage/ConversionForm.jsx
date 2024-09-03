import React, { useState } from 'react';

function ConversionForm() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const handleCountryChange = (e) => {
    const country = countries.find(c => c.code === e.target.value);
    setSelectedCountry(country);
  };

  return (
    <div className="col-span-1 bg-white rounded-2xl p-4">
      <span className="text-[10px] text-gray-500">You send exactly</span>
      <div className="flex items-center pt-1 text-xs">
        <input
          type="number"
          placeholder="Amount"
          className="border-r-0 border border-gray-300 rounded-l-md p-2 w-full outline-0"
        />
        <div className="relative flex items-center border border-l-0 border-gray-300 rounded-r-md">
          <img
            src={selectedCountry.flag}
            alt={selectedCountry.name}
            className="w-6 h-4 ml-2"
          />
          <select
            value={selectedCountry.code}
            onChange={handleCountryChange}
            className="appearance-none bg-transparent py-2 pl-2 pr-6 rounded-r-md cursor-pointer outline-0"
          >
            {countries.map(country => (
              <option key={country.code} value={country.code}>
                {country.currency}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="text-[10px]">
        <div className="flex justify-between pt-4">
          <div className="flex gap-2 items-center">
            <div className="rounded-full w-2 h-2 bg-gray-200"></div>
            <span className="font-medium">2.79 USD</span>
          </div>
          <span className="text-blue-700 underline">Connect bank account (ACH) fee</span>
        </div>
        <div className="flex justify-between pt-2">
          <div className="flex gap-2 items-center">
            <div className="rounded-full w-2 h-2 bg-gray-200"></div>
            <span className="font-medium">4.86 USD</span>
          </div>
          <span className="text-gray-500">Our fees</span>
        </div>
        <div className="flex justify-between pt-2 border-b pb-2">
          <div className="flex gap-2 items-center">
            <div className="rounded-full w-2 h-2 bg-gray-200 flex items-center text-center"><span>-</span></div>
            <span className="font-medium">4.86 USD</span>
          </div>
          <span className="text-gray-500">Our fees</span>
        </div>
        <div className="flex justify-between pt-2">
          <div className="flex gap-2 items-center">
            <div className="rounded-full w-2 h-2 bg-gray-200 flex items-center text-xs">=</div>
            <span className="font-medium">4.86 USD</span>
          </div>
          <span className="text-gray-500">Our fees</span>
        </div>
        <div className="flex justify-between pt-2">
          <div className="flex gap-2 items-center">
            <div className="rounded-full w-2 h-2 bg-gray-200 flex items-center text-xs">x</div>
            <span className="font-medium underline">4.86 USD</span>
          </div>
          <span className="text-blue-700 underline">Connect bank account (ACH) fee</span>
        </div>

        <div className="pt-6">
          <span className="text-[10px] text-gray-500">Recipient gets</span>
          <div className="flex items-center pt-1">
            <input
              type="number"
              placeholder="Amount"
              className="border-r-0 border border-gray-300 rounded-l-md p-2 w-full outline-0"
            />
            <div className="relative flex items-center border border-l-0 border-gray-300 rounded-r-md">
              <img
                src={selectedCountry.flag}
                alt={selectedCountry.name}
                className="w-6 h-4 ml-2"
              />
              <select
                value={selectedCountry.code}
                onChange={handleCountryChange}
                className="appearance-none bg-transparent py-2 pl-2 pr-6 rounded-r-md cursor-pointer outline-0"
              >
                {countries.map(country => (
                  <option key={country.code} value={country.code}>
                    {country.currency}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="pt-4 text-slate-600 text-[10px] font-light">
          <p className="">You could save up to <span className="font-medium">39.16 USD</span></p>
          <p>Should arrive <span className="font-semibold">in 4 hours</span></p>
        </div>

        <div className="pt-4 flex justify-around">
          <button className="border px-6 py-1 text-blue-700 border-blue-700 text-[10px] rounded-4xl">Compare price
          </button>
          <button className="px-6 py-1 text-slate-900 font-medium bg-yellow-500 text-[10px] rounded-4xl">Send money
            now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConversionForm;