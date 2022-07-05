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
import { useTheme } from "./theme/useTheme";

import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

import common_en from "../translations/en/en.json";
import common_pl from "../translations/pl/pl.json";
import common_se from "../translations/se/se.json";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        common: common_en,
      },
      pl: {
        common: common_pl,
      },
      se: {
        common: common_se,
      },
    },
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

export default function Layout() {
  const [list, setList] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [isDarkMode, toggleDarkMode] = useTheme();

  const { t, i18n } = useTranslation("common");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        return res.json();
      })
      .then((data) => setList(data));
  }, []);

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
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
                        <Menu.Item>
                          {({ active }) => (
                            <div
                              onClick={() => handleLanguageChange("en")}
                              className={`${
                                active ? "bg-gray-100 dark:bg-gray-800 text-gray-900" : "text-gray-700"
                              } flex items-center dark:text-gray-300 gap-1 w-full px-3 py-2 text-sm leading-5 text-center cursor-pointer`}
                            >
                              English
                            </div>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <div
                              onClick={() => handleLanguageChange("pl")}
                              className={`${
                                active ? "bg-gray-100 dark:bg-gray-800 text-gray-900" : "text-gray-700"
                              } flex items-center dark:text-gray-300 gap-1 w-full px-3 py-2 text-sm leading-5 text-center cursor-pointer`}
                            >
                              Polish
                            </div>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <div
                              onClick={() => handleLanguageChange("se")}
                              className={`${
                                active ? "bg-gray-100 dark:bg-gray-800 text-gray-900" : "text-gray-700"
                              } flex items-center dark:text-gray-300 gap-1 w-full px-3 py-2 text-sm leading-5 text-center cursor-pointer`}
                            >
                              Swedish
                            </div>
                          )}
                        </Menu.Item>
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
        <div className={`flex-col border-r ${isOpen ? "md:flex" : "hidden"} dark:border-r-gray-900`}>
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
          <div className='w-full text-sm text-center bg-[#EFF4F9] border-b-4 border-[#427cac] flex items-center justify-between dark:bg-gray-800 dark:border-b-gray-900 dark:text-gray-300'>
            <span className=''>
              <MenuIcon className='w-5 h-5 ml-4 cursor-pointer' onClick={() => setIsOpen(!isOpen)} />
            </span>
            <span className='p-3 truncate'>{t("TRAILER_CAPACITY_BOOKING")}</span>
            <button className='select-none active:relative active:top-0.5 inline-flex items-center px-2 py-1 mr-2 text-sm text-red-500 border border-red-600 rounded hover:bg-red-500 hover:text-white'>
              <TrashIcon className='w-5 h-5 mr-1' />
              {t("DELETE")}
            </button>
          </div>

          <div className='grid grid-cols-1 gap-6 px-8 py-6 lg:grid-cols-4'>
            <div className='w-full'>
              <div className='mb-2 text-sm'>
                <span className='after:content-[""] before:content-["*"] before:text-red-500 dark:text-gray-300 truncate'>{t("SHIP_FROM")}</span>
              </div>
              <input
                type='text'
                className='w-full px-3 py-2 text-sm border outline-none hover:border-volvo-blue dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300'
                placeholder={t("SHIP_FROM")}
              />
            </div>

            <div className='w-full'>
              <div className='mb-2 text-sm'>
                <span className='after:content-[""] before:content-["*"] before:text-red-500 dark:text-gray-300 truncate'>{t("UNLOAD_POINT")}</span>
              </div>
              <input
                type='text'
                className='w-full px-3 py-2 text-sm border outline-none hover:border-volvo-blue dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300'
                placeholder={t("UNLOAD_POINT")}
              />
            </div>

            <div className='w-full'>
              <div className='mb-2 text-sm'>
                <span className='after:content-[""] before:content-["*"] before:text-red-500 dark:text-gray-300 truncate'>{t("LAST_CONSIGNEE")}</span>
              </div>
              <input
                type='text'
                className='w-full px-3 py-2 text-sm border outline-none hover:border-volvo-blue dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300'
                placeholder={t("LAST_CONSIGNEE")}
              />
            </div>

            <div className='w-full'>
              <div className='mb-2 text-sm truncate dark:text-gray-300'>{t("SERVICE_PROVIDER")}</div>
              <input
                type='text'
                className='w-full px-3 py-2 text-sm border outline-none hover:border-volvo-blue dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300'
                placeholder={t("SERVICE_PROVIDER")}
              />
            </div>
          </div>

          <div className='grid grid-cols-1 gap-6 px-8 py-6 lg:grid-cols-4'>
            <div className='w-full'>
              <div className='mb-2 text-sm truncate dark:text-gray-300'>{t("PICKUP_REFERENCE")}</div>
              <input
                type='text'
                className='w-full px-3 py-2 text-sm border outline-none hover:border-volvo-blue dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300'
                placeholder={t("PICKUP_REFERENCE")}
              />
            </div>

            <div className='w-full'>
              <div className='mb-2 text-sm truncate dark:text-gray-300'>{t("MESSAGE_TO_CARRIER")}</div>
              <input
                type='text'
                className='w-full px-3 py-2 text-sm border outline-none hover:border-volvo-blue dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300'
                placeholder={t("MESSAGE_TO_CARRIER")}
              />
            </div>
          </div>

          <div className='px-8'>
            <button className='inline-flex items-center select-none px-3 py-2 hover:bg-[#EEE] text-sm border rounded active:relative active:top-0.5 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700'>
              <PlusIcon className='w-5 h-5 mr-1' />
              <span className='whitespace-nowrap'>{t("ADD_ROW")}</span>
            </button>

            <table className='w-full p-2 mt-2 mb-10 border table-fixed dark:border-gray-700'>
              <thead>
                <tr>
                  <td className='p-2 text-sm truncate border dark:border-gray-700 dark:text-gray-300'>{t("TRAILER_COUNT")}</td>
                  <td className='p-2 text-sm truncate border dark:border-gray-700 dark:text-gray-300'>{t("SLOT_START_TIME")} (Europe/Stockholm)</td>
                  <td className='p-2 text-sm truncate border dark:border-gray-700 dark:text-gray-300'>{t("SLOT_END_TIME")} (Europe/Stockholm)</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='p-1'>
                    <input
                      className='w-full p-2 text-sm border outline-none hover:border-volvo-blue dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300'
                      type='text'
                      value='10'
                      onChange={() => {}}
                    />
                  </td>
                  <td className='p-1'>
                    <input
                      className='w-full p-2 text-sm border outline-none hover:border-volvo-blue dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300'
                      type='text'
                      value='2022-07-05 10:57'
                      onChange={() => {}}
                    />
                  </td>
                  <td className='p-1'>
                    <input
                      className='w-full p-2 text-sm border outline-none hover:border-volvo-blue dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300'
                      type='text'
                      value='2022-07-05 10:57'
                      onChange={() => {}}
                    />
                  </td>
                </tr>
                <tr>
                  <td className='p-1'>
                    <input
                      className='w-full p-2 text-sm border outline-none hover:border-volvo-blue dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300'
                      type='text'
                      value='10'
                      onChange={() => {}}
                    />
                  </td>
                  <td className='p-1'>
                    <input
                      className='w-full p-2 text-sm border outline-none hover:border-volvo-blue dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300'
                      type='text'
                      value='2022-07-05 10:57'
                      onChange={() => {}}
                    />
                  </td>
                  <td className='p-1'>
                    <input
                      className='w-full p-2 text-sm border outline-none hover:border-volvo-blue dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300'
                      type='text'
                      value='2022-07-05 10:57'
                      onChange={() => {}}
                    />
                  </td>
                </tr>
                <tr>
                  <td className='p-1'>
                    <input
                      className='w-full p-2 text-sm border outline-none hover:border-volvo-blue dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300'
                      type='text'
                      value='10'
                      onChange={() => {}}
                    />
                  </td>
                  <td className='p-1'>
                    <input
                      className='w-full p-2 text-sm border outline-none hover:border-volvo-blue dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300'
                      type='text'
                      value='2022-07-05 10:57'
                      onChange={() => {}}
                    />
                  </td>
                  <td className='p-1'>
                    <input
                      className='w-full p-2 text-sm border outline-none hover:border-volvo-blue dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300'
                      type='text'
                      value='2022-07-05 10:57'
                      onChange={() => {}}
                    />
                  </td>
                </tr>
                <tr>
                  <td className='p-1'>
                    <input
                      className='w-full p-2 text-sm border outline-none hover:border-volvo-blue dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300'
                      type='text'
                      value='10'
                      onChange={() => {}}
                    />
                  </td>
                  <td className='p-1'>
                    <input
                      className='w-full p-2 text-sm border outline-none hover:border-volvo-blue dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300'
                      type='text'
                      value='2022-07-05 10:57'
                      onChange={() => {}}
                    />
                  </td>
                  <td className='p-1'>
                    <input
                      className='w-full p-2 text-sm border outline-none hover:border-volvo-blue dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300'
                      type='text'
                      value='2022-07-05 10:57'
                      onChange={() => {}}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className='z-10 text-white bg-volvo-dark-blue'>
        <div className='flex justify-between'>
          {isOpen ? (
            <div className='flex justify-between p-1 w-320'>
              <button className='active:relative active:top-0.5 inline-flex items-center px-2 py-1 text-sm border rounded select-none dark:border-gray-800 dark:hover:bg-gray-900 dark:bg-gray-800 border-volvo-success-button-border text-volvo-success hover:bg-volvo-success-button-background-hover bg-volvo-success-button-background'>
                <PlusIcon className='w-5 h-5 mr-2' />
                {t("CREATE_NEW")}
              </button>

              <button className='select-none active:relative active:top-0.5 items-center px-2 py-2 dark:border-gray-800 dark:hover:bg-gray-900 dark:bg-gray-800 text-sm rounded hover:bg-volvo-success-button-background-hover'>
                <RefreshIcon className='w-5 h-5' />
              </button>
            </div>
          ) : (
            <div></div>
          )}

          <div className='relative z-10'>
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
                            <div
                              className={`${
                                active ? "bg-gray-100 dark:bg-gray-800 text-gray-900" : "text-gray-700"
                              } flex items-center dark:text-gray-300 gap-1 w-full px-3 py-2 text-sm leading-5 text-center cursor-pointer`}
                            >
                              <FastForwardIcon className='w-5 h-5' />
                              {t("SAVE_AND_SEND_TO_ATLAS")}
                            </div>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <div
                              className={`${
                                active ? "bg-gray-100 dark:bg-gray-800 text-gray-900" : "text-gray-700"
                              } flex items-center dark:text-gray-300 gap-1 w-full px-3 py-2 text-sm leading-5 text-center cursor-pointer`}
                            >
                              <ClipboardListIcon className='w-5 h-5' />
                              {t("SAVE_AS_TEMPLATE")}
                            </div>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <div
                              className={`${
                                active ? "bg-gray-100 dark:bg-gray-800 text-gray-900" : "text-gray-700"
                              } flex items-center dark:text-gray-300 gap-1 w-full px-3 py-2 text-sm leading-5 text-center cursor-pointer`}
                            >
                              <NewspaperIcon className='w-5 h-5' />
                              {t("SAVE_AS_DRAFT")}
                            </div>
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
    </div>
  );
}
