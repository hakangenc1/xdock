import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  ChevronLeftIcon,
  ChevronUpIcon,
  ClipboardListIcon,
  FastForwardIcon,
  MenuIcon,
  MoonIcon,
  NewspaperIcon,
  PlusIcon,
  RefreshIcon,
  SearchIcon,
  SunIcon,
  TranslateIcon,
  TrashIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import { useForm, Controller, useFieldArray } from "react-hook-form";

import { useTranslation } from "react-i18next";
import "../translations/i18next";

import { useTheme } from "./theme/useTheme";

import Button from "./Button";
import Modal from "./Modal";
import Spinner from "./Spinner";
import moment from "moment";

export default function Layout() {
  const { t, i18n } = useTranslation("common");

  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      shipFrom: "",
      unloadPoint: "",
      lastConsignee: "",
      serviceProvider: "",
      pickupReference: "",
      messageToCarrier: "",
      xbrList: [
        {
          trailerCount: "",
          slotStartTime: "",
          slotEndTime: "",
        },
      ],
    },
  });

  useEffect(() => {
    i18n.on("languageChanged", () => {
      setError("shipFrom", { message: t("THIS_FIELD_CANNOT_BE_EMPTY") });
      setError("unloadPoint", { message: t("THIS_FIELD_CANNOT_BE_EMPTY") });
      setError("lastConsignee", { message: t("THIS_FIELD_CANNOT_BE_EMPTY") });
    });
  }, [i18n, setError, t]);

  const [isDarkMode, toggleDarkMode] = useTheme();

  const { fields, append, remove } = useFieldArray({ name: "xbrList", control });

  const [list, setList] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isSavedAsTemplate, setIsSavedAsTemplate] = useState(false);

  const handleXBRLoad = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
        setList(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    }, 1000);
  };
  useEffect(() => {
    handleXBRLoad();
  }, []);

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const toggleTemplateModal = () => {
    setIsTemplateOpen(!isTemplateOpen);
  };

  const handleAddRow = () => {
    append({ trailerCount: "", slotStartTime: "", slotEndTime: "" });
  };

  const handleDeleteRow = (id) => {
    remove(id);
  };

  const handleRefresh = () => {
    handleXBRLoad();
  };

  const handleDeleteXBR = () => {
    setIsDeleted(true);
    setIsOpen(false);
    setTimeout(() => {
      setIsDeleted(false);
    }, 1000);
  };

  const handleSaveAsTemplate = () => {
    setIsSavedAsTemplate(true);
    setIsTemplateOpen(false);
    setTimeout(() => {
      setIsSavedAsTemplate(false);
    }, 1000);
  };

  const handleSaveAndSendToAtlas = (data) => {
    console.log("data", data);
  };

  return (
    <>
      {isLoading && (
        <div className='absolute z-50 w-full'>
          <Spinner text={t("LOADING")} />
        </div>
      )}
      {isDeleted && (
        <div className='absolute z-50 w-full'>
          <Spinner text={t("DELETING")} />
        </div>
      )}

      {isSavedAsTemplate && (
        <div className='absolute z-50 w-full'>
          <Spinner text={t("SAVED_AS_TEMPLATE")} />
        </div>
      )}

      <div className='flex flex-col h-screen overflow-hidden'>
        <div className='flex justify-between gap-2 text-sm border-b-4 border-gray-300 select-none bg-volvo-gray dark:bg-gray-800 dark:text-gray-300 dark:border-b-gray-900 dark:border-b-4'>
          <div className='flex gap-2'>
            <div className="cursor-pointer bg-[url('./assets/img/volvo_icon.png')] h-10 w-11 bg-contain mt-1 ml-2"></div>
            <div className='p-3 cursor-pointer hover:bg-volvo-gray-hover dark:text-gray-300 dark:hover:bg-gray-900'>
              <ChevronLeftIcon className='w-5 h-5' />
            </div>
            <div className='flex md:hidden'>
              <div className='p-3 font-semibold border-b-4 cursor-pointer border-volvo-gray hover:border-b-4 hover:border-volvo-border hover:bg-volvo-gray-hover text-volvo-blue dark:text-gray-300 dark:hover:bg-gray-900 dark:border-b-gray-500'>
                {t("APPLICATIONS")}
              </div>
            </div>
            <div className='hidden md:flex'>
              <div className='p-3 font-semibold border-b-4 cursor-pointer border-volvo-gray hover:border-b-4 hover:border-volvo-border hover:bg-volvo-gray-hover text-volvo-blue dark:text-gray-300 dark:hover:bg-gray-900 dark:border-b-gray-500 border-b-volvo-blue'>
                XDock ShipIT
              </div>
              <div className='p-3 font-semibold cursor-pointer border-volvo-gray hover:border-b-4 hover:border-volvo-border hover:bg-volvo-gray-hover text-volvo-blue dark:text-gray-300 dark:hover:bg-gray-900 dark:border-b-gray-500'>
                Master Data
              </div>
              <div className='p-3 font-semibold cursor-pointer border-volvo-gray hover:border-b-4 hover:border-volvo-border hover:bg-volvo-gray-hover text-volvo-blue dark:text-gray-300 dark:hover:bg-gray-900 dark:border-b-gray-500'>
                Training Data
              </div>
            </div>
          </div>

          <div className='flex items-center gap-1'>
            {isDarkMode === false ? (
              <MoonIcon onClick={() => toggleDarkMode()} className='p-2 rounded cursor-pointer w-9 h-9 hover:bg-volvo-gray-hover dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900' />
            ) : (
              <SunIcon onClick={() => toggleDarkMode()} className='p-2 rounded cursor-pointer w-9 h-9 hover:bg-volvo-gray-hover dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900' />
            )}

            <div className='relative z-10'>
              <Menu>
                {({ open }) => (
                  <>
                    <Menu.Button>
                      <div className='flex items-center p-2 rounded cursor-pointer hover:bg-volvo-gray-hover dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900'>
                        <TranslateIcon className='w-5 h-5 mr-1 hover:bg-volvo-gray-hover dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900' />
                        <span className='text-sm uppercase'>{i18n.language}</span>
                      </div>
                    </Menu.Button>
                    <Transition
                      show={open}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'
                    >
                      <Menu.Items
                        static
                        className='absolute w-24 mt-2 truncate origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none dark:divide-gray-900 dark:border-gray-900 dark:bg-gray-900 -right-2'
                      >
                        <div className='py-1'>
                          {i18n.languages.length > 0 &&
                            i18n.languages.map(
                              (lng, i) =>
                                typeof lng === "object" &&
                                Object.keys(lng).length > 0 && (
                                  <Menu.Item key={i}>
                                    {({ active }) => (
                                      <div
                                        onClick={() => handleLanguageChange(lng.language)}
                                        className={`${
                                          active ? "bg-gray-100 dark:bg-gray-800 text-gray-900" : "text-gray-700"
                                        } flex items-center dark:text-gray-300 gap-1 w-full px-3 py-2 text-sm leading-5 text-center cursor-pointer`}
                                      >
                                        {lng.name}
                                      </div>
                                    )}
                                  </Menu.Item>
                                )
                            )}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </>
                )}
              </Menu>
            </div>

            <div className='relative z-10'>
              <Menu>
                {({ open }) => (
                  <>
                    <Menu.Button className='inline-flex items-center px-2 py-2 mr-2 text-sm rounded select-none hover:bg-volvo-gray-hover dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900'>
                      <UserIcon className='w-5 h-5' />
                      <span className='px-1'>Hakan Genc</span>
                    </Menu.Button>
                    <Transition
                      show={open}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'
                    >
                      <Menu.Items
                        static
                        className='absolute w-48 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none dark:divide-gray-900 dark:border-gray-900 dark:bg-gray-900 right-3'
                      >
                        <div className='px-4 py-3'>
                          <p className='text-sm leading-5 dark:text-gray-300'>{t("SIGNED_IN_AS")}</p>
                          <p className='text-sm font-medium leading-5 text-gray-900 truncate dark:text-gray-300'>hakan.genc@volvo.com</p>
                        </div>

                        <div className='z-10 py-1'>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href='#support'
                                className={`${
                                  active ? "bg-gray-100 dark:bg-gray-800 text-gray-900" : "text-gray-700"
                                } flex items-center dark:text-gray-300 gap-1 w-full px-3 py-2 text-sm leading-5 text-left`}
                              >
                                {t("LOGOUT")}
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </>
                )}
              </Menu>
            </div>
          </div>
        </div>

        <div className='flex min-h-0 grow dark:bg-gray-800 dark:text-gray-300'>
          <div className={`flex-col border-r ${isMenuOpen ? "md:flex" : "hidden"} dark:border-r-gray-900`}>
            <div className='p-2'>
              <div className='p-3 text-sm text-center'>{t("ORDER_LIST")}</div>
              <div className='relative'>
                <SearchIcon className='absolute w-4 h-4 cursor-pointer right-3 top-3' />
                <input
                  type='text'
                  className='w-full px-3 py-2 pl-3 pr-10 text-sm border border-gray-400 outline-none dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 hover:border-volvo-blue'
                  autoComplete='off'
                  placeholder={t("SEARCH")}
                />
              </div>
            </div>
            <div className='overflow-auto h-[80%] md:h-screen w-320 scrollbar dark:scrollbar-dark'>
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className='flex items-center w-full py-2 text-left border-b dark:border-b-gray-700 focus:outline-none'>
                      <ChevronUpIcon className={`${open ? "rotate-180 transform" : "rotate-90 transform"} h-5 w-5 text-black ml-2 dark:text-gray-300`} />
                      <span className='ml-2'>{t("DRAFT")}</span>
                    </Disclosure.Button>
                    {list.length > 0 &&
                      list.map((e) => {
                        return (
                          <Disclosure.Panel
                            key={e.id}
                            className='px-4 pt-4 pb-2 mb-1 text-gray-500 cursor-pointer border-l-6 border-l-volvo-warning-border hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-600'
                          >
                            <div className='w-full py-1 overflow-hidden text-sm truncate hover:text-clip dark:text-gray-300'>{t("ORDER_ID")}: 1231231231</div>
                            <div className='flex justify-between py-1'>
                              <div className='text-lg font-medium text-black truncate hover:text-clip dark:text-gray-300'>2314 DFDS</div>
                              <div className='text-lg font-medium text-black truncate hover:text-clip dark:text-gray-300'>1 TEST</div>
                            </div>
                            <div className='py-1 text-sm truncate hover:text-clip dark:text-gray-300'>{t("CUSTOMER_UNIT")}: 17TBECU 1TEST - test gate</div>
                            <div className='py-1 text-sm truncate hover:text-clip dark:text-gray-300'>{t("TRANSMISSION_NUMBER")}: 2324543232</div>
                            <div className='py-1 text-sm truncate hover:text-clip dark:text-gray-300'>{t("CREATED_AT")}: 4 weeks ago</div>
                          </Disclosure.Panel>
                        );
                      })}
                  </>
                )}
              </Disclosure>
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className='flex items-center w-full py-2 text-left border-b dark:border-b-gray-600 focus:outline-none'>
                      <ChevronUpIcon className={`${open ? "rotate-180 transform" : "rotate-90 transform"} h-5 w-5 text-black ml-2 dark:text-gray-300`} />
                      <span className='ml-2'>{t("CONFIRMED")}</span>
                    </Disclosure.Button>
                    {list.length > 0 &&
                      list.map((e) => {
                        return (
                          <Disclosure.Panel
                            key={e.id}
                            className='px-4 pt-4 pb-2 mb-1 text-gray-500 cursor-pointer border-l-6 border-l-volvo-success-border hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-600'
                          >
                            <div className='w-full py-1 overflow-hidden text-sm truncate hover:text-clip dark:text-gray-300'>{t("REFERENCE_ID")}: 1231231231</div>
                            <div className='flex justify-between py-1'>
                              <div className='text-lg font-medium text-black truncate hover:text-clip dark:text-gray-300'>2314 DFDS</div>
                              <div className='text-lg font-medium text-black truncate hover:text-clip dark:text-gray-300'>1 TEST</div>
                            </div>
                            <div className='py-1 text-sm truncate hover:text-clip dark:text-gray-300'>{t("CUSTOMER_UNIT")}: 17TBECU 1TEST - test gate</div>
                            <div className='py-1 text-sm truncate hover:text-clip dark:text-gray-300'>{t("TRANSMISSION_NUMBER")}: 2324543232</div>
                            <div className='py-1 text-sm truncate hover:text-clip dark:text-gray-300'>{t("CREATED_AT")}: 4 weeks ago</div>
                          </Disclosure.Panel>
                        );
                      })}
                  </>
                )}
              </Disclosure>
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className='flex items-center w-full py-2 text-left border-b dark:border-b-gray-600 focus:outline-none'>
                      <ChevronUpIcon className={`${open ? "rotate-180 transform" : "rotate-90 transform"} h-5 w-5 text-black ml-2 dark:text-gray-300`} />
                      <span className='ml-2'>{t("TEMPLATE")}</span>
                    </Disclosure.Button>
                    {list.length > 0 &&
                      list.map((e) => {
                        return (
                          <Disclosure.Panel
                            key={e.id}
                            className='px-4 pt-4 pb-2 mb-1 text-gray-500 cursor-pointer border-l-6 border-l-volvo-information-border hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-600'
                          >
                            <div className='w-full py-1 overflow-hidden text-sm truncate hover:text-clip dark:text-gray-300'>{t("TEMPLATE_REF_ID")}: 1231231231</div>
                            <div className='flex justify-between py-1'>
                              <div className='text-lg font-medium text-black truncate hover:text-clip dark:text-gray-300'>2314 DFDS</div>
                              <div className='text-lg font-medium text-black truncate hover:text-clip dark:text-gray-300'>1 TEST</div>
                            </div>
                            <div className='py-1 text-sm truncate hover:text-clip dark:text-gray-300'>{t("CUSTOMER_UNIT")}: 17TBECU 1TEST - test gate</div>
                            <div className='py-1 text-sm truncate hover:text-clip dark:text-gray-300'>{t("TRANSMISSION_NUMBER")}: 2324543232</div>
                            <div className='py-1 text-sm truncate hover:text-clip dark:text-gray-300'>{t("CREATED_AT")}: 4 weeks ago</div>
                          </Disclosure.Panel>
                        );
                      })}
                  </>
                )}
              </Disclosure>
            </div>
          </div>
          <div className='w-full overflow-auto bg-white dark:bg-gray-800 scrollbar dark:scrollbar-dark'>
            <div className='w-full text-sm text-center pr-2 bg-[#EFF4F9] border-b-4 border-[#427cac] flex items-center justify-between dark:bg-gray-800 dark:border-b-gray-900 dark:text-gray-300'>
              <span className=''>
                <MenuIcon className='w-5 h-5 ml-4 cursor-pointer' onClick={() => setIsMenuOpen(!isMenuOpen)} />
              </span>
              <span className='p-3 truncate'>{t("TRAILER_CAPACITY_BOOKING")}</span>
              <Button type='danger' text={t("DELETE")} onClick={toggleModal}>
                <TrashIcon />
              </Button>

              <Modal isOpen={isOpen} close={toggleModal} title={t("DELETE_XBR")} actions={{ cancelText: t("CANCEL"), cancel: toggleModal, confirmText: t("CONFIRM"), confirm: handleDeleteXBR }}>
                {t("ARE_YOU_SURE_YOU_WANT_TO_DELETE_IT")}
              </Modal>
            </div>
            <form id='xbr' autoComplete='off'>
              <div className='grid grid-cols-1 gap-6 px-8 py-6 lg:grid-cols-4'>
                <div className='w-full mb-4'>
                  <div className='mb-2 text-sm'>
                    <label htmlFor='shipFrom' className='after:content-[""] before:content-["*"] before:text-red-500 dark:text-gray-300 truncate'>
                      {t("SHIP_FROM")}
                    </label>
                  </div>
                  <div className='relative'>
                    <input
                      id='shipFrom'
                      type='text'
                      {...register("shipFrom", { required: t("THIS_FIELD_CANNOT_BE_EMPTY") })}
                      name='shipFrom'
                      className={`w-full px-3 py-2 text-sm border outline-none dark:bg-gray-900 dark:text-gray-300 ${errors.shipFrom ? "border-red-500" : "dark:border-gray-700"} ${
                        errors.shipFrom ? "border-red-500" : "hover:border-volvo-blue"
                      }`}
                      placeholder={t("SHIP_FROM")}
                    />
                    <div className='absolute w-full text-xs text-red-500 truncate top-11'>{errors.shipFrom && errors.shipFrom.message}</div>
                  </div>
                </div>

                <div className='w-full mb-4'>
                  <div className='mb-2 text-sm'>
                    <label htmlFor='unloadPoint' className='after:content-[""] before:content-["*"] before:text-red-500 dark:text-gray-300 truncate'>
                      {t("UNLOAD_POINT")}
                    </label>
                  </div>
                  <div className='relative'>
                    <input
                      id='unloadPoint'
                      type='text'
                      {...register("unloadPoint", { required: t("THIS_FIELD_CANNOT_BE_EMPTY") })}
                      name='unloadPoint'
                      className={`w-full px-3 py-2 text-sm border outline-none dark:bg-gray-900 dark:text-gray-300 ${errors.unloadPoint ? "border-red-500" : "dark:border-gray-700"} ${
                        errors.unloadPoint ? "border-red-500" : "hover:border-volvo-blue"
                      }`}
                      placeholder={t("UNLOAD_POINT")}
                    />
                    <div className='absolute w-full text-xs text-red-500 truncate top-11'>{errors.unloadPoint && errors.unloadPoint.message}</div>
                  </div>
                </div>

                <div className='w-full mb-4'>
                  <div className='mb-2 text-sm'>
                    <label htmlFor='lastConsignee' className='after:content-[""] before:content-["*"] before:text-red-500 dark:text-gray-300 truncate'>
                      {t("LAST_CONSIGNEE")}
                    </label>
                  </div>
                  <div className='relative'>
                    <input
                      type='text'
                      id='lastConsignee'
                      {...register("lastConsignee", { required: t("THIS_FIELD_CANNOT_BE_EMPTY") })}
                      name='lastConsignee'
                      className={`w-full px-3 py-2 text-sm border outline-none dark:bg-gray-900 dark:text-gray-300 ${errors.lastConsignee ? "border-red-500" : "dark:border-gray-700"} ${
                        errors.lastConsignee ? "border-red-500" : "hover:border-volvo-blue"
                      }`}
                      placeholder={t("LAST_CONSIGNEE")}
                    />
                    <div className='absolute w-full text-xs text-red-500 truncate top-11'>{errors.lastConsignee && errors.lastConsignee.message}</div>
                  </div>
                </div>

                <div className='w-full mb-4'>
                  <div className='mb-2 text-sm'>
                    <label htmlFor='serviceProvider' className='truncate before:text-red-500 dark:text-gray-300'>
                      {t("SERVICE_PROVIDER")}
                    </label>
                  </div>
                  <input
                    type='text'
                    id='serviceProvider'
                    {...register("serviceProvider")}
                    name='serviceProvider'
                    className='w-full px-3 py-2 text-sm border outline-none hover:border-volvo-blue dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300'
                    placeholder={t("SERVICE_PROVIDER")}
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 gap-6 px-8 py-6 lg:grid-cols-4'>
                <div className='w-full mb-4'>
                  <div className='mb-2 text-sm'>
                    <label htmlFor='pickupReference' className='truncate before:text-red-500 dark:text-gray-300'>
                      {t("PICKUP_REFERENCE")}
                    </label>
                  </div>
                  <input
                    type='text'
                    id='pickupReference'
                    {...register("pickupReference")}
                    name='pickupReference'
                    className='w-full px-3 py-2 text-sm border outline-none hover:border-volvo-blue dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300'
                    placeholder={t("PICKUP_REFERENCE")}
                  />
                </div>

                <div className='w-full mb-4'>
                  <div className='mb-2 text-sm'>
                    <label htmlFor='messageToCarrier' className='truncate before:text-red-500 dark:text-gray-300'>
                      {t("MESSAGE_TO_CARRIER")}
                    </label>
                  </div>
                  <input
                    type='text'
                    id='messageToCarrier'
                    {...register("messageToCarrier")}
                    name='messageToCarrier'
                    className='w-full px-3 py-2 text-sm border outline-none hover:border-volvo-blue dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300'
                    placeholder={t("MESSAGE_TO_CARRIER")}
                  />
                </div>
              </div>

              <div className='px-8'>
                <button
                  type='button'
                  onClick={handleAddRow}
                  className='inline-flex items-center select-none px-3 py-2 hover:bg-[#EEE] text-sm border rounded active:relative active:top-0.5 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700'
                >
                  <PlusIcon className='w-5 h-5 mr-1' />
                  <span className='whitespace-nowrap'>{t("ADD_ROW")}</span>
                </button>

                <table className='w-full p-2 mt-2 mb-10 border table-fixed select-none dark:border-gray-700'>
                  <thead>
                    <tr>
                      <td className='p-2 text-sm truncate border dark:border-gray-700 dark:text-gray-300 after:content-[""] before:content-["*"] before:text-red-500'>{t("TRAILER_COUNT")}</td>
                      <td className='p-2 text-sm truncate border dark:border-gray-700 dark:text-gray-300 after:content-[""] before:content-["*"] before:text-red-500'>
                        {t("SLOT_START_TIME")} (Europe/Stockholm)
                      </td>
                      <td className='p-2 text-sm truncate border dark:border-gray-700 dark:text-gray-300 after:content-[""] before:content-["*"] before:text-red-500'>
                        {t("SLOT_END_TIME")} (Europe/Stockholm)
                      </td>
                      <td className='w-12 p-2 text-sm truncate border dark:border-gray-700 dark:text-gray-300'></td>
                    </tr>
                  </thead>
                  <tbody>
                    {fields.length === 0 ? (
                      <tr>
                        <td colSpan={3}>
                          <div className='w-full p-3 text-sm italic text-center'>{t("NO_DATA")}</div>
                        </td>
                      </tr>
                    ) : (
                      fields.map((xbr, index) => (
                        <tr key={xbr.id}>
                          <td className='p-1'>
                            <input
                              className={`w-full p-2 text-sm border outline-none dark:bg-gray-900 dark:text-gray-300 ${
                                errors.xbrList?.[index]?.trailerCount ? "border-red-500" : "dark:border-gray-700"
                              } ${errors.xbrList?.[index]?.trailerCount ? "border-red-500" : "hover:border-volvo-blue"}`}
                              name={`xbrList[${index}]trailerCount`}
                              type='text'
                              {...register(`xbrList.${index}.trailerCount`, { required: t("THIS_FIELD_CANNOT_BE_EMPTY") })}
                              placeholder={t("TRAILER_COUNT")}
                            />
                          </td>
                          <td className='p-1'>
                            <Controller
                              control={control}
                              name={`xbrList.${index}.slotStartTime`}
                              rules={{ required: t("THIS_FIELD_CANNOT_BE_EMPTY") }}
                              render={({ field: { onChange, value, ref } }) => (
                                <DatePicker
                                  showTimeSelect
                                  timeFormat='HH:mm'
                                  timeIntervals={15}
                                  timeCaption='Time'
                                  dateFormat='yyyy-MM-dd HH:mm'
                                  selected={value}
                                  name={`xbrList.${index}.slotStartTime`}
                                  placeholderText={t("SLOT_START_TIME")}
                                  ref={ref}
                                  calendarStartDay={1}
                                  value={value}
                                  className={`w-full p-2 text-sm border outline-none dark:text-gray-300 dark:bg-gray-900 ${
                                    errors.xbrList?.[index]?.slotStartTime ? "border-red-500" : "dark:border-gray-700"
                                  } ${errors.xbrList?.[index]?.slotStartTime ? "border-red-500" : "hover:border-volvo-blue"}`}
                                  onChange={onChange}
                                  minDate={moment().toDate()}
                                />
                              )}
                            />
                          </td>
                          <td className='p-1'>
                            <Controller
                              control={control}
                              name={`xbrList.${index}.slotEndTime`}
                              rules={{ required: t("THIS_FIELD_CANNOT_BE_EMPTY") }}
                              render={({ field: { onChange, value, ref } }) => (
                                <DatePicker
                                  showTimeSelect
                                  name={`xbrList.${index}.slotEndTime`}
                                  timeFormat='HH:mm'
                                  timeIntervals={15}
                                  timeCaption='Time'
                                  placeholderText={t("SLOT_END_TIME")}
                                  selected={value}
                                  ref={ref}
                                  calendarStartDay={1}
                                  dateFormat='yyyy-MM-dd HH:mm'
                                  value={value}
                                  className={`w-full p-2 text-sm border outline-none dark:bg-gray-900 dark:text-gray-300 ${
                                    errors.xbrList?.[index]?.slotEndTime ? "border-red-500" : "dark:border-gray-700"
                                  } ${errors.xbrList?.[index]?.slotEndTime ? "border-red-500" : "hover:border-volvo-blue"}`}
                                  onChange={onChange}
                                  minDate={moment().toDate()}
                                />
                              )}
                            />
                          </td>
                          {fields.length > 1 && (
                            <td className='w-12 p-1'>
                              <TrashIcon
                                onClick={() => handleDeleteRow(index)}
                                className='w-5 h-5 mx-auto text-gray-500 cursor-pointer hover:text-red-500 dark:hover:text-red-500 dark:text-gray-300 '
                              />
                            </td>
                          )}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </form>
          </div>
        </div>

        <div className='z-10 text-white bg-volvo-dark-blue'>
          <div className='flex justify-between'>
            {isMenuOpen ? (
              <div className='flex justify-between p-1 w-320'>
                <button
                  type='button'
                  className='active:relative active:top-0.5 inline-flex items-center px-2 py-1 text-sm border rounded select-none dark:border-gray-800 dark:hover:bg-gray-900 dark:bg-gray-800 border-volvo-success-button-border text-volvo-success hover:bg-volvo-success-button-background-hover bg-volvo-success-button-background'
                >
                  <PlusIcon className='w-5 h-5 mr-2' />
                  {t("CREATE_NEW")}
                </button>

                <button
                  type='button'
                  onClick={handleRefresh}
                  className='select-none active:relative active:top-0.5 items-center px-2 py-2 dark:border-gray-800 dark:hover:bg-gray-900 dark:bg-gray-800 text-sm rounded hover:bg-volvo-success-button-background-hover'
                >
                  <RefreshIcon className='w-5 h-5' />
                </button>
              </div>
            ) : (
              <div></div>
            )}

            <div className='relative z-10 select-none'>
              <Menu>
                {({ open }) => (
                  <>
                    <Menu.Button>
                      <div className='p-1'>
                        <div className='active:relative active:top-0.5 inline-flex items-center px-2 py-2 text-sm border rounded select-none dark:border-gray-800 dark:hover:bg-gray-900 dark:bg-gray-800 border-volvo-success-button-border text-volvo-success hover:bg-volvo-success-button-background-hover bg-volvo-success-button-background'>
                          <NewspaperIcon className='w-5 h-5' />
                          <span className='px-2 border-r'>{t("SAVE")}</span>
                          <ChevronUpIcon className='w-5 h-5 ml-2' />
                        </div>
                      </div>
                    </Menu.Button>
                    <Transition
                      show={open}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'
                    >
                      <Menu.Items
                        static
                        className='absolute w-56 mt-2 truncate origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none bottom-12 dark:divide-gray-900 dark:border-gray-900 dark:bg-gray-900 right-2'
                      >
                        <div className='py-1'>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                form='xbr'
                                onClick={handleSubmit(handleSaveAndSendToAtlas)}
                                className={`${
                                  active ? "bg-gray-100 dark:bg-gray-800 text-gray-900" : "text-gray-700"
                                } flex items-center dark:text-gray-300 gap-1 w-full px-3 py-2 text-sm leading-5 text-center cursor-pointer`}
                              >
                                <FastForwardIcon className='w-5 h-5' />
                                {t("SAVE_AND_SEND_TO_ATLAS")}
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                form='form'
                                className={`${
                                  active ? "bg-gray-100 dark:bg-gray-800 text-gray-900" : "text-gray-700"
                                } flex items-center dark:text-gray-300 gap-1 w-full px-3 py-2 text-sm leading-5 text-center cursor-pointer`}
                                onClick={toggleTemplateModal}
                              >
                                <ClipboardListIcon className='w-5 h-5' />
                                {t("SAVE_AS_TEMPLATE")}
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                form='form'
                                className={`${
                                  active ? "bg-gray-100 dark:bg-gray-800 text-gray-900" : "text-gray-700"
                                } flex items-center dark:text-gray-300 gap-1 w-full px-3 py-2 text-sm leading-5 text-center cursor-pointer`}
                              >
                                <NewspaperIcon className='w-5 h-5' />
                                {t("SAVE_AS_DRAFT")}
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </>
                )}
              </Menu>
            </div>

            <Modal
              isOpen={isTemplateOpen}
              close={toggleTemplateModal}
              title={t("SAVE_AS_TEMPLATE")}
              actions={{ cancelText: t("CANCEL"), cancel: toggleTemplateModal, confirmText: t("CONFIRM"), confirm: handleSaveAsTemplate }}
            >
              <input
                className='w-full p-2 text-sm border outline-none hover:border-volvo-blue dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300'
                type='text'
                placeholder={t("TEMPLATE_NAME")}
                onChange={() => {}}
              />
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}
