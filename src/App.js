import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, RefreshIcon, PlusIcon, TrashIcon, ArrowLeftIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";

function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        return res.json();
      })
      .then((data) => setList(data));
  }, []);
  return (
    <div className='flex w-full min-h-screen'>
      <div className='sticky top-0 flex w-full min-h-screen'>
        {/* Left side bar starts*/}
        <div className='flex flex-col w-1/4 p-2'>
          <div className='p-3 mb-2 text-sm text-center'>Order List</div>
          <input className='w-full px-3 py-2 border border-gray-300 outline-none' type='text' placeholder='Search' />

          <div className='flex flex-col flex-1 h-screen'>
            <div className='w-full'>
              <div className='sticky w-full h-screen max-w-md p-2 mx-auto overflow-auto'>
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className='flex justify-between w-full py-2 text-left border-b focus:outline-none'>
                        <span>Draft</span>
                        <ChevronUpIcon className={`${open ? "rotate-180 transform" : "rotate-90 transform"} h-5 w-5 text-black`} />
                      </Disclosure.Button>
                      {list.length > 0 &&
                        list.map((e) => {
                          return (
                            <Disclosure.Panel key={e.id} className='p-2 pt-4 pb-2 mb-1 text-gray-500 border-l-4 cursor-pointer border-l-green-700 hover:bg-gray-100 hover:text-gray-700'>
                              <div className='font-bold'>{e.id} </div>
                              {e.body}
                            </Disclosure.Panel>
                          );
                        })}
                    </>
                  )}
                </Disclosure>
                <Disclosure as='div' className='mt-2'>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className='flex justify-between w-full py-2 text-left border-b focus:outline-none'>
                        <span>Confirmed</span>
                        <ChevronUpIcon className={`${open ? "rotate-180 transform" : "rotate-90 transform"} h-5 w-5 text-black`} />
                      </Disclosure.Button>
                      <Disclosure.Panel className='pt-4 pb-2 text-gray-500'>No.</Disclosure.Panel>
                    </>
                  )}
                </Disclosure>

                <Disclosure as='div' className='mt-2'>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className='flex justify-between w-full py-2 text-left border-b focus:outline-none'>
                        <span>Template</span>
                        <ChevronUpIcon className={`${open ? "rotate-180 transform" : "rotate-90 transform"} h-5 w-5 text-black`} />
                      </Disclosure.Button>
                      <Disclosure.Panel className='pt-4 pb-2 text-gray-500'>No.</Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            </div>
          </div>

          <div className='sticky flex justify-between p-2 bottom-2 bg-slate-600'>
            <button className='inline-flex items-center px-5 py-2 text-center text-white bg-green-700 rounded outline-none space-x-11 hover:bg-green-500'>
              <PlusIcon className='w-5 h-5 mr-2 -ml-1' /> Create new
            </button>
            <button className='px-2 py-2 text-white bg-green-700 rounded outline-none hover:bg-green-500'>
              <RefreshIcon className='w-5 h-5' />
            </button>
          </div>
        </div>
        {/* Left side bar ends */}

        <div className='w-full'>
          <div className='sticky top-0 flex items-center justify-between w-full p-2 border'>
            <button className='px-2 py-2 text-black rounded outline-none'>
              <ArrowLeftIcon className='w-5 h-5' />
            </button>

            <div className='text-sm'>Trailer capacity booking</div>

            <button className='inline-flex items-center px-5 py-2 text-center text-white bg-red-700 rounded outline-none space-x-11 hover:bg-red-500'>
              <TrashIcon className='w-5 h-5 mr-2 -ml-1' /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
