import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "@/i18n/en/translation.json";
import nl from "@/i18n/nl/translation.json";

export const resources = {
  en: {
    translation: en,
  },
  nl: {
    translation: nl,
  },
} as const;

i18next.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "nl",
  resources,
});

export default i18next;
