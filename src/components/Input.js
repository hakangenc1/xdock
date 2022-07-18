import React from "react";

export default function Input({ id, button, type, name, placeholder, value, onChange, ...restProps }) {
  return (
    <div className='relative'>
      {button && (
        <span className='absolute inset-y-0 right-0 flex items-center p-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 active:bg-gray-300 dark:active:bg-gray-700' onClick={button.action}>
          {button.icon}
        </span>
      )}
      <input
        {...restProps}
        id={id}
        autoComplete='off'
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 text-sm border outline-none dark:bg-gray-900 ${button && "pr-12"} disabled:bg-gray-100 dark:text-gray-300 dark:border-gray-700 hover:border-volvo-blue`}
      />
    </div>
  );
}
