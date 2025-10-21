import { CheckIcon, CopyIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Code } from "@/components/ui/code";
import { IconButton } from "@/components/ui/icon-button";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { logger } from "@/utils/logger";

interface CopyValueProps {
  value: string;
}

export function CopyValue({ value }: CopyValueProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const onPress = async () => {
    try {
      await navigator.clipboard.writeText(value);

      setCopied(true);
    } catch (error) {
      logger({
        level: "error",
        message: "CopyValue",
        data: error,
      });
    }
  };

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [copied]);

  return (
    <div className="flex items-center gap-2">
      <Code>{value}</Code>
      <TooltipTrigger delay={300}>
        <IconButton
          aria-label={
            copied
              ? t("aria.copied_to_clipboard")
              : t("aria.copy_value_to_clipboard")
          }
          onPress={onPress}
        >
          {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
        </IconButton>
        <Tooltip>{t("aria.copy_value_to_clipboard")}</Tooltip>
      </TooltipTrigger>
    </div>
  );
}
