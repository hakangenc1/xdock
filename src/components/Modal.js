import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Button from "./Button";

export default function Modal({ isOpen, title, actions, close, children }) {
  if (!isOpen) return null;
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={close}>
        <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in duration-200' leaveFrom='opacity-100' leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-black bg-opacity-50' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-full text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-md px-6 py-3 overflow-hidden text-left align-middle transition-all transform bg-white rounded shadow-xl dark:bg-gray-700 dark:text-gray-300'>
                <Dialog.Title as='h4' className='mb-2 font-medium leading-6 text-center text-gray-900 dark:text-gray-300'>
                  {title}
                </Dialog.Title>
                <span className='text-sm'>{children}</span>

                <div className='flex justify-end mt-2'>
                  {actions && Object.keys(actions).length > 0 ? (
                    <>
                      <Button type='primary' text={actions.cancelText} onClick={actions.cancel} />
                      <Button type='primary' text={actions.confirmText} onClick={actions.confirm} />
                    </>
                  ) : (
                    <Button type='primary' text='Close' onClick={close} />
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
