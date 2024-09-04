import React from 'react';
import { FaApple,  FaGooglePlay } from 'react-icons/fa';

function FrontFooter() {
  return (
    <footer className="py-10 px-16">
      <div className="container mx-auto flex flex-wrap justify-center items-start">
        {/* Left: Logo */}
        {/* <div className="w-full md:w-1/4 mb-6 md:mb-0 flex justify-center items-center">
          <img src="/fx_logo.png" alt="Logo" className="h-40" />
        </div> */}
        {/* Right: Columns with subheadings and links */}
        <div className="w-full md:w-3/4 flex flex-wrap justify-between md:pl-16">
          {/* Column 1 */}
          {/* <div className="w-full sm:w-1/3 mb-6">
            <h5 className="font-semibold text-base mb-4 text-[#0F51BC]">Company</h5>
            <ul>
              <li><a href="#products" className="text-sm mb-4">Products</a></li>
              <li><a href="#services" className="text-sm mb-4">Services</a></li>
              <li><a href="#about-us" className="text-sm mb-4">About Us</a></li>
              <li><a href="#contact-us" className="text-sm mb-4">Contact Us</a></li>
            </ul>
          </div> */}
          {/* Column 2 */}
          {/* <div className="w-full sm:w-1/3 mb-6">
            <h5 className="font-semibold text-base mb-4 text-[#0F51BC]">Products</h5>
            <ul>
              <li><a href="#open-banking" className="text-sm mb-4">Open Banking</a></li>
              <li><a href="#money-transfer" className="text-sm mb-4">Money Transfer</a></li>
              <li><a href="#banking-as-a-service" className="text-sm mb-4">Banking as a Service</a></li>
              <li><a href="#terms-conditions" className="text-sm mb-4">Terms & Conditions</a></li>
              <li><a href="#fraud-awareness" className="text-sm mb-4">Fraud Awareness</a></li>
            </ul>
          </div> */}
          {/* Column 3 */}
          {/* <div className="w-full sm:w-1/3 mb-6">
            <h5 className="font-semibold text-base mb-4 text-[#0F51BC]">Services</h5>
            <ul>
              <li><a href="#business-banking" className="text-sm mb-4">Business Banking & Corporate Banking</a></li>
              <li><a href="#international-payment" className="text-sm mb-4">International Payment</a></li>
              <li><a href="#white-label-banking" className="text-sm mb-4">White Label Banking</a></li>
              <li><a href="#merchant-services" className="text-sm mb-4">Merchant Services</a></li>
              <li><a href="#business-finance" className="text-sm mb-4">Business Finance</a></li>
            </ul>
          </div> */}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-start w-full mt-12">
        <div className="w-full sm:w-2/3 mb-6 sm:mb-0 px-16">
          <h5 className="font-semibold text-base mb-4 text-[#0F51BC]">Privacy Policy</h5>
          <p className="text-sm mb-4">
            FX Master Limited, trading as FXMaster, is a company registered in England
            (registration number 05248673). Registered address: 30 Churchill Place,
            Canary Wharf, E14 5RE London, United Kingdom.
          </p>
        </div>

        <div className="w-full sm:w-1/3 flex flex-col sm:flex-row justify-between pt-6">
          <div className="flex flex-col items-start mb-6 sm:mb-0">
            <h6 className="font-semibold text-base mb-4 text-[#0F51BC]">Download the App</h6>
            <div className="flex">
              <a href="#gplay" className="mr-4">
                <FaGooglePlay className="text-xl" />
              </a>
              <a href="#appstore">
                <FaApple className="text-xl" />
              </a>
            </div>
          </div>

          {/* <div className="flex flex-col items-start sm:items-end mt-auto">
            <h6 className="font-semibold text-base mb-4 text-[#0F51BC]">Follow Us On</h6>
            <div className="flex space-x-4">
              <a href="#twitter">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#facebook">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#linkedin">
                <FaLinkedin className="text-xl" />
              </a>
              <a href="#instagram">
                <FaInstagram className="text-xl" />
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </footer>
  );
}

export default FrontFooter;