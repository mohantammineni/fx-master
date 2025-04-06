import React from 'react';
import CaFlag from '../components/flags/ca-flag';
import UsFlag from '../components/flags/us-flag';
import InFlag from '../components/flags/in-flag';
import GbFlag from '../components/flags/gb-flag';
import AuFlag from '../components/flags/au-flag';
import EuFlag from '../components/flags/eu-flag';
import AedFlag from '../components/flags/aed-flag';
import ChfFlag from '../components/flags/chf-flag';
import JpyFlag from '../components/flags/jpy-flag';

const currencySymbols = {
  USD: '$ ',
  EUR: '€ ',
  GBP: '£ ',
  INR: '₹ ',
  JPY: '¥ ',
  AUD: '$ ',
  CAD: '$ ',
  CHF: 'SFr ',
  CNY: '¥ ',
  SEK: 'kr ',
  NZD: '$ ',
  AED: 'د.إ ',
  KWD: 'ك ',
  HKD: 'HK$ ',
  HUF: 'Ft ',
  KES: 'KSh ',
  SGD: 'S$ ',
  PHP: '₱ ',
  BGN: 'лв ',
};

export const countryData = [
  { code: 'GBP', name: 'United Kingdom', flag: { component: GbFlag, defaultClassName: 'w-10 h-10', defaultWidth: 10, defaultHeight: 10 } },
  { code: 'AUD', name: 'Australia', flag: { component: AuFlag, defaultClassName: 'w-10 h-10', defaultWidth: 10, defaultHeight: 10 } },
  { code: 'EUR', name: 'Europe', flag: { component: EuFlag, defaultClassName: 'w-10 h-10', defaultWidth: 10, defaultHeight: 10 } },
  { code: 'INR', name: 'India', flag: { component: InFlag, defaultClassName: 'w-10 h-10', defaultWidth: 10, defaultHeight: 10 } },
  { code: 'USD', name: 'United States', flag: { component: UsFlag, defaultClassName: 'w-10 h-10', defaultWidth: 10, defaultHeight: 10 } },
  { code: 'CAD', name: 'Canada', flag: { component: CaFlag, defaultClassName: 'w-10 h-10', defaultWidth: 10, defaultHeight: 10 } },
  { code: 'AED', name: 'UAE', flag: { component: AedFlag, defaultClassName: 'w-10 h-10', defaultWidth: 10, defaultHeight: 10 } },
  { code: 'CHF', name: 'CHF', flag: { component: ChfFlag, defaultClassName: 'w-10 h-10', defaultWidth: 10, defaultHeight: 10 } },
  { code: 'JPY', name: 'JPY', flag: { component: JpyFlag, defaultClassName: 'w-10 h-10', defaultWidth: 10, defaultHeight: 10 } },
  { code: 'KWD', name: 'KWD', flag: { component: 'kwd.png', defaultClassName: 'w-10 h-10', defaultWidth: 40, defaultHeight: 10, type: 'image' } },
  { code: 'HKD', name: 'HKD', flag: { component: 'hkd.png', defaultClassName: 'w-10 h-10', defaultWidth: 40, defaultHeight: 10, type: 'image' } },
  { code: 'HUF', name: 'HUF', flag: { component: 'huf.png', defaultClassName: 'w-10 h-10', defaultWidth: 40, defaultHeight: 10, type: 'image' } },
  { code: 'KES', name: 'KES', flag: { component: 'kes.png', defaultClassName: 'w-10 h-10', defaultWidth: 40, defaultHeight: 10, type: 'image' } },
  { code: 'SGD', name: 'SGD', flag: { component: 'sgd.png', defaultClassName: 'w-10 h-10', defaultWidth: 40, defaultHeight: 10, type: 'image' } },
  { code: 'PHP', name: 'PHP', flag: { component: 'php.png', defaultClassName: 'w-10 h-10', defaultWidth: 40, defaultHeight: 10, type: 'image' } },
  { code: 'BGN', name: 'BGN', flag: { component: 'bgn.png', defaultClassName: 'w-10 h-10', defaultWidth: 40, defaultHeight: 10, type: 'image' } },
];

export const getCountryInfo = (countryCode, flagConfig = {}) => {
  const country = countryData.find((c) => c.code === countryCode.toUpperCase());

  if (country) {
    if (country.flag.component) {
      const FlagComponent = country.flag.component;
      const className = flagConfig.className || country.flag.defaultClassName;
      const width = flagConfig.width || country.flag.defaultWidth;
      const height = flagConfig.height || country.flag.defaultHeight;
      const type = flagConfig.type || country.flag.type;

      return {
        ...country,
        flag: (
          <>
            {type == 'image' ?
              <img src={"flags/"+FlagComponent} style={{width:width,maxWidth:width}}/>
              :
              <FlagComponent
                className={className}
                width={width}
                height={height}
              />
            }
          </>
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
