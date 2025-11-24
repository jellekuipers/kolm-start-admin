import { useTranslation } from "react-i18next";

import { Separator } from "@/components/ui/separator";

interface NotFoundProps {
  children?: React.ReactNode;
}

export function NotFoundComponent() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-4">
      <span className="text-2xl text-foreground">{t("error.404")}</span>
      <Separator className="min-h-8" orientation="vertical" />
      <span className="text-2xl text-foreground">{t("error.not_found")}</span>
    </div>
  );
}

export function NotFound({ children }: NotFoundProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-4">
      {children || <NotFoundComponent />}
    </div>
  );
}
