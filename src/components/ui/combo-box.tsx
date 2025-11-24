import { CaretDownIcon } from "@phosphor-icons/react";
import {
  Button as AriaButton,
  ComboBox as AriaComboBox,
  type ComboBoxProps as AriaComboBoxProps,
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  type ListBoxItemProps as AriaListBoxItemProps,
  type ValidationResult as AriaValidationResult,
} from "react-aria-components";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import {
  Description,
  FieldError,
  FieldGroup,
  Input,
  Label,
} from "@/components/ui/field";
import { Popover } from "@/components/ui/popover";

export interface ComboBoxProps<T extends object>
  extends Omit<AriaComboBoxProps<T>, "children" | "className"> {
  children: React.ReactNode | ((item: T) => React.ReactNode);
  className?: string;
  description?: string | null;
  errorMessage?: string | ((validation: AriaValidationResult) => string);
  label?: string;
}

export function ComboBox<T extends object>({
  children,
  className,
  description,
  errorMessage,
  onInputChange,
  items,
  label,
  ...props
}: ComboBoxProps<T>) {
  const { t } = useTranslation();

  return (
    <AriaComboBox
      {...props}
      className={twMerge("flex flex-col gap-2", className)}
      onInputChange={onInputChange}
    >
      {label ? <Label>{label}</Label> : null}
      <FieldGroup className="relative">
        <Input className="flex-1 outline-none" />
        <AriaButton
          aria-label={t("aria.show_options")}
          className="absolute right-0 h-8 px-2"
        >
          <CaretDownIcon aria-hidden size={16} />
        </AriaButton>
      </FieldGroup>
      {description ? <Description>{description}</Description> : null}
      <FieldError>{errorMessage}</FieldError>
      <Popover className="h-60 w-(--trigger-width) overflow-y-auto" isNonModal>
        <AriaListBox className="outline-0" items={items}>
          {children}
        </AriaListBox>
      </Popover>
    </AriaComboBox>
  );
}

export function ComboBoxItem(props: AriaListBoxItemProps) {
  return (
    <AriaListBoxItem
      {...props}
      className={twMerge(
        "flex h-8 cursor-default items-center gap-2 rounded px-2 text-sm",
        "outline-0 outline-ring outline-offset-2 focus-visible:outline-2",
        "hover:bg-primary hover:text-primary-foreground",
        "disabled:bg-muted disabled:text-muted-foreground",
      )}
    />
  );
}
