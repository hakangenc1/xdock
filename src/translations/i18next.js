import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import common_en from "../translations/en/en.json";
import common_pl from "../translations/pl/pl.json";
import common_se from "../translations/se/se.json";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
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
    fallbackLng: [
      { language: "en", name: "English" },
      { language: "pl", name: "Polish" },
      { language: "se", name: "Swedish" },
    ],

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });
