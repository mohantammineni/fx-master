import axios from 'axios';
import React, { useState } from 'react';
import { FaDiscord, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Constants } from '../../lib/const/constants';

function ContactInformation() {
  const [subject, setSubject] = useState('General Inquiry')
  const [firstName, setfirstName] = useState()
  const [lastName, setlastName] = useState()
  const [email, setEmail] = useState()
  const [mobile, setmobile] = useState()
  const [message, setmessage] = useState()
  const sendEmail = async () => {
    if (firstName != "" && firstName != null && lastName != "" && lastName != null && email != "" && email != null && mobile != "" && mobile != null && message != "" && message != null) {
      await axios.post(Constants.BASE_URL + 'API-FX-193-CONTACTUS', {
        "subject": subject,
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
    <div className="flex flex-col lg:flex-row gap-8 bg-white rounded-2xl overflow-hidden">
      {/* Left Column: Contact Information */}
      <div className="lg:w-2/5 p-2 relative"> 
        <div className="bg-[#FFC92E] rounded-2xl p-8 w-full relative overflow-hidden"> 
          <h2 className="text-3xl font-poppins font-semibold mb-6 text-[#1052BC]">Contact Information</h2>
          <p className="text-sm font-openSans text-black">
            Have questions or need assistance? Our friendly support team is here to help.
            Contact us via email, chat, or phone, and we’ll be happy to assist you.
          </p>
          <p className="text-sm mb-8 font-openSans text-black">FX MASTER - Smart, Simple, and Affordable International Money Transfers.</p>

          {/* Phone Number */}
          <div className="flex items-center mb-8">
            <img className="w-8 h-8" src="/business/phone-icon.png" />
            <p className="text-base font-poppins ml-4">+44 20 8058 0967</p>
          </div>

          {/* Email Address */}
          <div className="flex items-center mb-8">
            <img className="w-8 h-8" src="/business/email-icon.png" />
            <p className="text-base font-poppins ml-4">admin@fxmaster.co.uk</p>
          </div>

          {/* Physical Address */}
          <div className="flex mb-12">
           <img className="w-8 h-8" src="/business/location-icon.png" />
            <p className="text-base font-poppins ml-4">30 Churchill Place, Canary Wharf, <br /> E14 5RE London,<br /> United Kingdom</p>
          </div>

          {/* Social Icons */}
          <div className="mt-6 flex space-x-4 pt-12 relative z-10"> {/* Added z-10 to ensure it's above circles */}
            <FaTwitter className="bg-custom-dark-blue text-custom-yellow p-2 rounded-full" size={40} />
            <FaInstagram className="bg-custom-dark-blue text-custom-yellow p-2 rounded-full" size={40} />
            <FaDiscord className="bg-custom-dark-blue text-custom-yellow p-2 rounded-full" size={40} />
          </div>

          <div className="absolute bottom-0 right-0 z-0">
            <img className="w-44" src="/business/circles.png" />
          </div>


        </div>
      </div>

      {/* Right Column: Contact Form */}
      <div className="lg:w-3/5 py-12 px-4 relative">
        {/* First Row: First Name and Last Name */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative w-full">
            <input
              type="text"
              id="firstName"
              placeholder=" "
              className="w-full pl-0 p-3 border-b-2 border-gray-300 hover:border-black focus:outline-none placeholder-transparent"
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
              className="w-full pl-0 p-3 border-b-2 border-gray-300 hover:border-black focus:outline-none placeholder-transparent"
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
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative w-full">
            <input
              type="email"
              id="email"
              placeholder=" "
              className="w-full pl-0 p-3 border-b-2 border-gray-300 hover:border-black focus:outline-none placeholder-transparent"
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
              className="w-full pl-0 p-3 border-b-2 border-gray-300 hover:border-black focus:outline-none placeholder-transparent"
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

        {/* Select Subject */}
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2 text-custom-richblack" htmlFor="subject">Select Subject?</label>
          <div className="flex gap-4">
            {/* First Radio Button */}
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="subject"
                value="General Inquiry"
                className="hidden"
                onChange={(e) => setSubject(e.target.value)}
                checked={subject === 'General Inquiry'}
              />
              <div className={`w-6 h-6 rounded-full flex items-center justify-center 
                              ${subject === 'General Inquiry' ? 'bg-custom-richblack' : 'bg-custom-lightgray'}`}>
                {subject === 'General Inquiry' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className="ml-2 text-gray-900">General Inquiry</span>
            </label>

            {/* Second Radio Button */}
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="subject"
                value="Support"
                className="hidden"
                onChange={(e) => setSubject(e.target.value)}
                checked={subject === 'Support'}
              />
              <div className={`w-6 h-6 rounded-full flex items-center justify-center 
                              ${subject === 'Support' ? 'bg-custom-richblack' : 'bg-custom-lightgray'}`}>
                {subject === 'Support' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className="ml-2 text-gray-900">Support</span>
            </label>

            {/* Third Radio Button */}
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="subject"
                value="Feedback"
                className="hidden"
                onChange={(e) => setSubject(e.target.value)}
                checked={subject === 'Feedback'}
              />
              <div className={`w-6 h-6 rounded-full flex items-center justify-center 
                              ${subject === 'Feedback' ? 'bg-custom-richblack' : 'bg-custom-lightgray'}`}>
                {subject === 'Feedback' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className="ml-2 text-gray-900">Feedback</span>
            </label>

            {/* Fourth Radio Button */}
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="subject"
                value="Other"
                className="hidden"
                onChange={(e) => setSubject(e.target.value)}
                checked={subject === 'Other'}
              />
              <div className={`w-6 h-6 rounded-full flex items-center justify-center 
                              ${subject === 'Other' ? 'bg-custom-richblack' : 'bg-custom-lightgray'}`}>
                {subject === 'Other' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className="ml-2 text-gray-900">Other</span>
            </label>
          </div>
        </div>

        {/* Text Area */}
        <div className="relative mb-4 mt-10"> 
          <textarea
            id="message"
            placeholder="Write your message..." 
            className="w-full pl-0 p-3 border-b-2 border-gray-300 hover:border-black focus:outline-none h-14 placeholder-gray-500" 
            onChange={(e) => setmessage(e.target.value)}
            value={message}
          />
          <label
            htmlFor="message"
            className={`absolute left-0 -top-3.5 text-gray-500 transition-all transform scale-90 origin-[0] pointer-events-none
                        ${message ? 'text-black' : 'text-gray-500'}`}>
            Message
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

        <img
        src="/business/send-message-arrow.png"  
        alt="Paper Plane Arrow"
        className="absolute -bottom-16 right-36 w-56 h-56 z-10"  
      />
      </div>
    </div>
  );
}

export default ContactInformation;