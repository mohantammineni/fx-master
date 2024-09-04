import axios from 'axios';
import React, { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { Constants } from '../../lib/const/constants';

function ContactInformation() {
  const [subject, setSubject] = useState()
  const [firstName, setfirstName] = useState()
  const [lastName, setlastName] = useState()
  const [email, setEmail] = useState()
  const [mobile, setmobile] = useState()
  const [message, setmessage] = useState()
  const sendEmail = async () => {
    if (subject != "" && subject != null && firstName != "" && firstName != null && lastName != "" && lastName != null && email != "" && email != null && mobile != "" && mobile != null && message != "" && message != null) {
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
    <div className="flex flex-col lg:flex-row gap-8 bg-white rounded-2xl">
      {/* Left Column: Contact Information */}
      <div className="lg:w-1/2 p-2">
        <div className="bg-[#FFC92E] rounded-2xl p-8 max-w-2xl w-full">
          <h2 className="text-3xl font-medium mb-6 text-[#1052BC]">Contact Information</h2>
          <p className="text-sm">
            Have questions or need assistance? Our friendly support team is here to help.
            Contact us via email, chat, or phone, and we’ll be happy to assist you.
          </p>
          <p className="text-sm mb-8">FX MASTER - Smart, Simple, and Affordable International Money Transfers.</p>

          {/* Phone Number */}
          <div className="flex items-center mb-8">
            <FaPhoneAlt className="text-gray-500 mr-3" size={15} />
            <p className="text-base">+44 20 8058 0967</p>
          </div>

          {/* Email Address */}
          <div className="flex items-center mb-8">
            <FaEnvelope className="text-gray-500 mr-3" size={15} />
            <p className="text-base">admin@fxmaster.co.uk</p>
          </div>

          {/* Physical Address */}
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-gray-500 mr-3" size={15} />
            <p className="text-base">30 Churchill Place, Canary Whart, E14 5RE London, United Kingdom</p>
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
          <input
            type="text"
            placeholder="First Name"
            className="w-full p-3 border rounded-md placeholder:text-sm"
            onChange={(e) => setfirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full p-3 border rounded-md placeholder:text-sm"
            onChange={(e) => setlastName(e.target.value)}
          />
        </div>

        {/* Second Row: Email and Phone Number */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-md placeholder:text-sm"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full p-3 border rounded-md placeholder:text-sm"
            onChange={(e) => setmobile(e.target.value)}
          />
        </div>

        {/* Third Row: Select Subject */}
        <div className="mb-4">
          <p className="mb-2 text-sm">Select Subject:</p>
          <div className="flex flex-col md:flex-row gap-4 text-sm">
            <label className="flex items-center">
              <input type="radio" onClick={() => setSubject('General Inquiry')} name="subject" className="mr-2" />
              General Inquiry
            </label>
            <label className="flex items-center">
              <input type="radio" onClick={() => setSubject('Support')} name="subject" className="mr-2" />
              Support
            </label>
            <label className="flex items-center">
              <input type="radio" onClick={() => setSubject('Billing')} name="subject" className="mr-2" />
              Billing
            </label>
            <label className="flex items-center">
              <input type="radio" onClick={() => setSubject('Feedback')} name="subject" className="mr-2" />
              Feedback
            </label>
          </div>
        </div>

        {/* Text Area */}
        <div className="mb-4">
          <textarea
            placeholder="Your Message"
            className="w-full p-3 border rounded-md h-32 placeholder:text-sm"
            onChange={(e) => setmessage(e.target.value)}
          />
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