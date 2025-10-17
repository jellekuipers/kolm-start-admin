import { CopyIcon } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

import { Code } from "@/components/ui/code";
import { IconButton } from "@/components/ui/icon-button";

interface CopyValueProps {
  value: string;
}

export function CopyValue({ value }: CopyValueProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2">
      <Code>{value}</Code>
      <IconButton
        aria-label={t("aria.copy_value_to_clipboard")}
        onPress={() => navigator.clipboard.writeText(value)}
      >
        <CopyIcon size={16} />
      </IconButton>
    </div>
  );
}
