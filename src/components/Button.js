import React from "react";

export default function Button({ type, text, children, ...props }) {
  return (
    <button
      {...props}
      className={`select-none active:relative rounded active:top-0.5 inline-flex ml-2 items-center px-2 py-2 text-sm ${
        type === "danger" && "text-red-500 border border-red-600  hover:bg-red-500 hover:text-white"
      } ${type === "success" && "text-green-500 border border-green-600 hover:bg-green-500 hover:text-white"} ${type === 'primary' && "hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 border dark:border-gray-600 dark:hover:bg-gray-900 dark:hover:text-white"}`}
    >
      {children && <span className='w-5 h-5 mr-1'>{children}</span>}
      {text}
    </button>
  );
}
