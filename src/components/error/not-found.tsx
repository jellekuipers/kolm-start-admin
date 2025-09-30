import { ArrowLeftIcon } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

import { Heading } from "~/components/ui/heading";
import { Link } from "~/components/ui/link";

interface NotFoundProps {
  children?: React.ReactNode;
}

export function NotFound({ children }: NotFoundProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-4 min-h-screen">
      {children || (
        <div className="flex flex-col items-center justify-center gap-4">
          <Heading level={1}>{t("error.not_found")}</Heading>
          <Link className="flex items-center gap-2" to="/">
            <ArrowLeftIcon size={16} />
            {t("common.home")}
          </Link>
        </div>
      )}
    </div>
  );
}
