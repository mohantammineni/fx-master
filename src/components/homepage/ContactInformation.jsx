import axios from 'axios';
import React, { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { Constants } from '../../lib/const/constants';

function ContactInformation() {
  // const [subject, setSubject] = useState()
  const [firstName, setfirstName] = useState()
  const [lastName, setlastName] = useState()
  const [email, setEmail] = useState()
  const [mobile, setmobile] = useState()
  const [message, setmessage] = useState()
  const sendEmail = async () => {
    if (firstName != "" && firstName != null && lastName != "" && lastName != null && email != "" && email != null && mobile != "" && mobile != null && message != "" && message != null) {
      await axios.post(Constants.BASE_URL + 'API-FX-193-CONTACTUS', {
        // "subject": subject,
        "first_name": firstName,
        "last_name": lastName,
        "email": email,
        "mobile": mobile,
        "message": message
      }, {
        headers: {
          fx_key: Constants.SUBSCRIPTION_KEY
        }
      }).then(resp => {
        resp
        alert('Request sent successfull.')
      }).catch(err => {
        err
        alert('Something went wrong. Please try again later.')
      })
    }
    else {
      alert('Please fill all the fields.')
    }
  }
  return (
    <div className="flex flex-col lg:flex-row gap-8 bg-white rounded-2xl">
      {/* Left Column: Contact Information */}
      <div className="lg:w-1/2 p-2">
        <div className="bg-[#FFC92E] rounded-2xl p-8 max-w-2xl w-full">
          <h2 className="text-3xl font-poppins font-semibold mb-6 text-[#1052BC]">Contact Information</h2>
          <p className="text-sm font-openSans text-black">
            Have questions or need assistance? Our friendly support team is here to help.
            Contact us via email, chat, or phone, and we’ll be happy to assist you.
          </p>
          <p className="text-sm mb-8 font-openSans text-black">FX MASTER - Smart, Simple, and Affordable International Money Transfers.</p>

          {/* Phone Number */}
          <div className="flex items-center mb-8">
            <FaPhoneAlt className="text-black mr-3" size={15} />
            <p className="text-base font-poppins">+44 20 8058 0967</p>
          </div>

          {/* Email Address */}
          <div className="flex items-center mb-8">
            <FaEnvelope className="text-black mr-3" size={15} />
            <p className="text-base font-poppins">admin@fxmaster.co.uk</p>
          </div>

          {/* Physical Address */}
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-black mr-3" size={15} />
            <p className="text-base font-poppins">30 Churchill Place, Canary Whart, E14 5RE London, United Kingdom</p>
          </div>

          <div className="mt-6 flex space-x-4 pt-12">
            {/* <FaTwitter className="text-blue-400" size={24} />
            <FaInstagram className="text-pink-500" size={24} />
            <FaReddit className="text-orange-500" size={24} /> */}
          </div>
        </div>
      </div>

      {/* Right Column: Contact Form */}
      <div className="lg:w-1/2 py-12 px-4">
    {/* First Row: First Name and Last Name */}
  <div className="flex flex-col md:flex-row gap-4 mb-4">
    <div className="relative w-full">
      <input
        type="text"
        id="firstName"
        placeholder=" "
        className="w-full p-3 border-b-2 border-gray-300 hover:border-black focus:outline-none placeholder-transparent"
        onChange={(e) => setfirstName(e.target.value)}
        value={firstName}
      />
      <label
        htmlFor="firstName"
        className={`absolute left-0 -top-3.5 transition-all transform scale-90 origin-[0] pointer-events-none ${firstName ? 'text-black' : 'text-gray-500'}`}>
        First Name
      </label>
    </div>

    <div className="relative w-full">
      <input
        type="text"
        id="lastName"
        placeholder=" "
        className="w-full p-3 border-b-2 border-gray-300 hover:border-black focus:outline-none placeholder-transparent"
        onChange={(e) => setlastName(e.target.value)}
        value={lastName}
      />
      <label
        htmlFor="lastName"
        className={`absolute left-0 -top-3.5 transition-all transform scale-90 origin-[0] pointer-events-none 
                    ${lastName ? 'text-black' : 'text-gray-500'}`}>
        Last Name
      </label>
    </div>
  </div>

  {/* Second Row: Email and Phone Number */}
  <div className="flex flex-col md:flex-row gap-4 mb-4">
    <div className="relative w-full">
      <input
        type="email"
        id="email"
        placeholder=" "
        className="w-full p-3 border-b-2 border-gray-300 hover:border-black focus:outline-none placeholder-transparent"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label
        htmlFor="email"
        className={`absolute left-0 -top-3.5 transition-all transform scale-90 origin-[0] pointer-events-none 
                    ${email ? 'text-black' : 'text-gray-500'}`}>
        Email
      </label>
    </div>

    <div className="relative w-full">
      <input
        type="tel"
        id="phone"
        placeholder=" "
        className="w-full p-3 border-b-2 border-gray-300 hover:border-black focus:outline-none placeholder-transparent"
        onChange={(e) => setmobile(e.target.value)}
        value={mobile}
      />
      <label
        htmlFor="phone"
        className={`absolute left-0 -top-3.5 transition-all transform scale-90 origin-[0] pointer-events-none 
                    ${mobile ? 'text-black' : 'text-gray-500'}`}>
        Phone Number
      </label>
    </div>
  </div>

  {/* Text Area */}
  <div className="relative mb-4">
    <textarea
      id="message"
      placeholder=" "
      className="w-full p-3 border-b-2 border-gray-300 hover:border-black focus:outline-none placeholder-transparent h-32"
      onChange={(e) => setmessage(e.target.value)}
      value={message}
    />
    <label
      htmlFor="message"
      className={`absolute left-0 -top-3.5 transition-all transform scale-90 origin-[0] pointer-events-none 
                  ${message ? 'text-black' : 'text-gray-500'}`}>
      Your Message
    </label>
  </div>

  {/* Submit Button */}
  <div className="text-right">
    <button
      type="submit"
      className="bg-[#0F51BC] text-[#FEC82E] px-6 py-2 rounded-lg hover:bg-blue-700"
      onClick={sendEmail}
    >
      Send Message
    </button>
  </div>  
  
      </div>
    </div>
  );
}

export default ContactInformation;