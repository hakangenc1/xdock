import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Button from "./Button";
import Input from "./Input";

export default function ModalList({ title, isOpen, toggleModal, action }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={toggleModal}>
        <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in duration-200' leaveFrom='opacity-100' leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-full p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-[320px] max-w-md py-3 overflow-hidden text-left align-middle transition-all transform bg-white rounded shadow-xl dark:bg-gray-700 dark:text-gray-300'>
                <Dialog.Title as='h3' className='py-2 mb-2 font-medium leading-6 text-center text-gray-900 dark:text-gray-300'>
                  {title}
                </Dialog.Title>
                <Dialog.Description className='px-2'>
                  <Input id='searchLocation' name='searchLocation' onChange={() => {}} placeholder='Search' type='text' />
                </Dialog.Description>
                <div className='overflow-auto max-h-96 scrollbar dark:scrollbar-dark'>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                    <div className='mt-1'>
                      <p className='px-4 py-3 text-sm border-b border-l-4 border-green-600 cursor-pointer dark:hover:bg-gray-600 hover:bg-gray-200 dark:text-gray-300 border-b-gray-200 dark:border-b-gray-800'>
                        07A
                      </p>
                    </div>
                  ))}
                </div>
                <div className='flex justify-end mt-4 mr-2'>
                  <Button type='primary' text={action.buttonText} onClick={toggleModal} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
