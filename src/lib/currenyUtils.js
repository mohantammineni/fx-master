import React from 'react';
import CaFlag from '../components/flags/ca-flag';
import UsFlag from '../components/flags/us-flag';
import InFlag from '../components/flags/in-flag';
import GbFlag from '../components/flags/gb-flag';
import AuFlag from '../components/flags/au-flag';
import EuFlag from '../components/flags/eu-flag';

const currencySymbols = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  INR: '₹',
  JPY: '¥',
  AUD: '$',
  CAD: '$',
  CHF: 'CHF',
  CNY: '¥',
  SEK: 'kr',
  NZD: '$',
};

export const countryData = [
  { code: 'GBP', name: 'United Kingdom', flag: { component: GbFlag, defaultClassName: 'w-10 h-10', defaultWidth: 10, defaultHeight: 10 } },
  { code: 'AUD', name: 'Australia', flag: { component: AuFlag, defaultClassName: 'w-10 h-10', defaultWidth: 10, defaultHeight: 10 } },
  { code: 'EUR', name: 'Europe', flag: { component: EuFlag, defaultClassName: 'w-10 h-10', defaultWidth: 10, defaultHeight: 10 } },
  { code: 'INR', name: 'India', flag: { component: InFlag, defaultClassName: 'w-10 h-10', defaultWidth: 10, defaultHeight: 10 } },
  { code: 'USD', name: 'United States', flag: { component: UsFlag, defaultClassName: 'w-10 h-10', defaultWidth: 10, defaultHeight: 10 } },
  { code: 'CAD', name: 'Canada', flag: { component: CaFlag, defaultClassName: 'w-10 h-10', defaultWidth: 10, defaultHeight: 10 } },
];

export const getCountryInfo = (countryCode, flagConfig = {}) => {
  const country = countryData.find((c) => c.code === countryCode.toUpperCase());

  if (country) {
    if (country.flag.component) {
      const FlagComponent = country.flag.component;
      const className = flagConfig.className || country.flag.defaultClassName;
      const width = flagConfig.width || country.flag.defaultWidth;
      const height = flagConfig.height || country.flag.defaultHeight;

      return {
        ...country,
        flag: (
          <FlagComponent
            className={className}
            width={width}
            height={height}
          />
        ),
      };
    }

    return {
      ...country,
      flag: country.flag,
    };
  }

  return {
    code: '',
    name: 'Unknown',
    flag: '',
  };
};


export function getCurrencySymbol(currencyCode) {
  return currencySymbols[currencyCode] || currencyCode;
}

export default getCurrencySymbol;
