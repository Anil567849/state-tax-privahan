import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export const DatePickerComponent = ({title, date, setDate}: {title: string, date: Date, setDate: any}) => {
  return (
        <div className="sm:col-span-3">
            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-900">
                {title}
            </label>
            <div className="mt-2 ">
                <DatePicker 
                className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                id="start-date" 
                name="start-date" 
                selected={date} 
                showTimeSelect
                onChange={(date) => setDate(date)} />
            </div>
        </div>
  );
};