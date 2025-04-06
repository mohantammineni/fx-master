import { Field, Input, Label, Radio, RadioGroup, Select } from '@headlessui/react';
import { useState } from 'react';
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import HeadingBarWithSearch from '../../components/HeadingBarWithSearch';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';


const plans = [
  { name: 'Individual' },
  { name: 'Business' },
];

const labelClassName = 'block font-semibold md:text-left mb-1 md:mb-0 pr-4 text-sm';
const inputClassName = 'bg-gray-200 text-sm border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500';

export default function EditBeneficiary() {
  let [selected, setSelected] = useState(plans[0]);
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="my-2">
      <HeadingBarWithSearch title="Edit Beneficiary" />

      <div className="flex gap-2 text-sm">
        <span className="font-semibold">Contact Type: </span>
        <div>
          <RadioGroup value={selected} onChange={setSelected} aria-label="Group" className="flex space-x-6 font-light">
            {plans.map((plan) => (
              <Field key={plan.name} className="flex items-center gap-2">
                <Radio
                  value={plan}
                  className="group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-blue-400 data-[disabled]:bg-gray-100"
                >
                  <FaCheckCircle
                    className="size-6 fill-[#012646] opacity-0 transition group-data-[checked]:opacity-100" />
                </Radio>
                <Label className="data-[disabled]:opacity-50">{plan.name}</Label>
              </Field>
            ))}
          </RadioGroup>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-5">
        <Field className="md:flex md:items-center mb-3">
          <div className="w-1/4">
            <Label className={labelClassName}>Company Name</Label>
          </div>

          <div className="md:w-2/3">
            <Input name="company_name" className={inputClassName} placeholder="Enter company name" />
          </div>
        </Field>

        <Field className="md:flex md:items-center mb-3">
          <div className="w-1/4">
            <Label className={labelClassName}>Company email</Label>
          </div>

          <div className="md:w-2/3">
            <Input name="company_name" className={inputClassName} placeholder="Enter company email" />
          </div>
        </Field>

        <Field className="md:flex md:items-center mb-3">
          <div className="w-1/4">
            <Label className={labelClassName}>Company Phone</Label>
          </div>

          <div className="md:w-2/3">
            <Input name="company_name" className={inputClassName} placeholder="Enter company phone" />
          </div>
        </Field>

        <Field className="md:flex md:items-center mb-3">
          <div className="w-1/4">
            <Label className={labelClassName}>Company Address</Label>
          </div>

          <div className="md:w-2/3">
            <Input name="company_name" className={inputClassName} placeholder="Enter company address" />
          </div>
        </Field>

        <Field className="md:flex md:items-center mb-3">
          <div className="w-1/4">
            <Label className={labelClassName}>Default Date format</Label>
          </div>

          <div className="md:w-2/3">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="w-full bg-gray-200 text-sm px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              dateFormat="MMMM d, yyyy"
              placeholderText="Choose a date"
              wrapperClassName="w-full"
            />
          </div>
        </Field>

        <Field className="md:flex md:items-center mb-3">
          <div className="w-1/4">
            <Label className={labelClassName}>Default Country</Label>
          </div>
          <div className="md:w-2/3">
            <Select name="country" className={inputClassName}>
              <option value="india">India</option>
              <option value="usa">USA</option>
              <option value="uk">UK</option>
            </Select>
          </div>
        </Field>

        <Field className="md:flex md:items-center mb-3">
          <div className="w-1/4">
            <Label className={labelClassName}>Max Threshold</Label>
          </div>

          <div className="md:w-2/3">
            <div className="relative">
              <Input
                name="company_name"
                className="w-full bg-gray-200 py-2 text-sm px-4 pr-16 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
              <span
                className="absolute right-4 top-1/2 transform text-sm -translate-y-1/2 bg-custom-neutral-900 text-custom-ivory-500 px-3 py-1 rounded">per year</span>
            </div>

          </div>
        </Field>
      </div>

      <div className="text-center mt-12 flex justify-center gap-4">
        <button className="py-2 border rounded-full px-32 border-custom-neutral-900">Cancel</button>
        <button className="py-2 px-32 bg-custom-neutral-900 text-custom-ivory-500 rounded-full">Save</button>
      </div>
    </div>
  );
}