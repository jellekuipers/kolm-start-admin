import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import { Separator } from "@/components/ui/separator";

interface NotFoundProps {
  children?: React.ReactNode;
}

export function NotFound({ children }: NotFoundProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-4 min-h-screen">
      {children || (
        <div className="gap-4 flex items-center">
          <span
            className={twMerge("text-2xl text-gray-900", "dark:text-white")}
          >
            {t("error.404")}
          </span>
          <Separator className="min-h-8" orientation="vertical" />
          <span
            className={twMerge("text-2xl text-gray-800", "dark:text-white")}
          >
            {t("error.not_found")}
          </span>
        </div>
      )}
    </div>
  );
}
