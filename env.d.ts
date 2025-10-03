import { resources } from "@/lib/i18n";
import "i18next";

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: typeof resources['en'];
  }
}

