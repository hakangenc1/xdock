import React from "react";

export default function Label({ htmlFor, required, children }) {
  return (
    <div className='mb-2 text-sm'>
      <label htmlFor={htmlFor} className={`${required && 'after:content-[""] before:content-["*"] before:text-red-500'} dark:text-gray-300 truncate`}>
        {children}
      </label>
    </div>
  );
}
