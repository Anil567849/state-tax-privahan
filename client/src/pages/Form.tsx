


import React, { useState } from 'react'
import {DatePickerComponent} from '../components/DatePicker'
import { postTax } from '../https';
import {formatDate} from '../utils/formatDate'


function Form() {

    const [name, setName] = useState<string>("Ram Prasad");
    const [phone, setPhone] = useState<string>("8745896547");
    const [chassis, setChassis] = useState<string>("MDBDILSINSELEK~125S");
    const [cabNo, setCabNo] = useState<string>("HP01K0001");
    const [state, setState] = useState<string>("Punjab");
    const [barrier, setBarrier] = useState<string>("Ghanhouli");
    const [price, setPrice] = useState<string>("240");
    const [startingDate, setStartingDate] = useState<Date>(new Date());
    const [endingDate, setEndingDate] = useState<Date>(new Date());

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const sDate = formatDate(startingDate);
        const eDate = formatDate(endingDate);
        const data1 = {
            name,
            cab: cabNo,
            chassis, 
            phone,
            state,
            barrier,
            price,
            date: sDate,
            endDate: eDate,
        }

        try {
            const {data} = await postTax(JSON.stringify(data1));
            // console.log(data);
            // Create a URL for the blob
            const url = window.URL.createObjectURL(new Blob([data], { type: 'application/pdf' }));
            const link = document.createElement('a');

            // Set the download attribute with a default filename
            link.href = url;
            link.setAttribute('download', 'canvas-output.pdf'); // Filename for the download

            // Append the link to the body (not visible on the page)
            document.body.appendChild(link);

            // Programmatically click the link to trigger the download
            link.click();

            // Clean up: remove the link and revoke the object URL
            link?.parentNode?.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            alert("something is wrong")
        }
        
        
    }
  return (
    <form className='flex justify-center' onSubmit={handleSubmit}>
      <div className="w-[60vw] my-[2rem] border border-gray-200 p-2">

        <div>
            <h1 className="font-bold text-center text-4xl">
                Tax
            </h1>
        </div>

        <div className="border-b border-gray-900/10 pb-12">

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="sm:col-span-3">
              <label htmlFor="owner-name" className="block text-sm font-medium leading-6 text-gray-900">
                Owner Name
              </label>
              <div className="mt-2">
                <input
                  id="owner-name"
                  name="owner-name"
                  type="text"
                  autoComplete="given-name"
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="owner-phone" className="block text-sm font-medium leading-6 text-gray-900">
                Owner Phone
              </label>
              <div className="mt-2">
                <input
                  id="owner-phone"
                  name="owner-phone"
                  type="number"
                  autoComplete="given-name"
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
              </div>
            </div>
            
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Cab No.
              </label>
              <div className="mt-2">
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  autoComplete="given-name"
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setCabNo(e.target.value)}
                  value={cabNo}
                />
              </div>
            </div>

            <DatePickerComponent title="Starting Date" date={startingDate} setDate={setStartingDate} />

            <DatePickerComponent title="Ending Date" date={endingDate} setDate={setEndingDate} />

            <div className="sm:col-span-3">
              <label htmlFor="chassis-number" className="block text-sm font-medium leading-6 text-gray-900">
                Chassis No.
              </label>
              <div className="mt-2">
                <input
                  id="chassis-number"
                  name="chassis-number"
                  type="text"
                  autoComplete="family-name"
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setChassis(e.target.value)}
                  value={chassis}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                State
              </label>
              <div className="mt-2">
                <select
                  id="state"
                  name="state"
                  autoComplete="state-name"
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={(e) => setState(e.target.value)}
                  value={state}
                >
                  <option defaultValue="Punjab">Punjab</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="barrier" className="block text-sm font-medium leading-6 text-gray-900">
                Barrier
              </label>
              <div className="mt-2">
                <select
                  id="barrier"
                  name="barrier"
                  autoComplete="barrier-name"
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={(e) => setBarrier(e.target.value)}
                  value={barrier}
                >
                  <option defaultValue="Ghanhouli">Ghanhouli</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                Price
              </label>
              <div className="mt-2">
                <input
                  id="price"
                  name="price"
                  type="number"
                  autoComplete="given-name"
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
              </div>
            </div>

          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
            Get Tax
            </button>
        </div>

      </div>

    </form>
  )
}

export default Form