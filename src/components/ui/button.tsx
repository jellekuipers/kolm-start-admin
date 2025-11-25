import { CircleNotchIcon } from "@phosphor-icons/react";
import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
  composeRenderProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { ring } from "@/components/ui/utils";

interface ButtonProps extends AriaButtonProps {
  color?: "primary" | "secondary" | "success" | "destructive";
  variant?: "default" | "light" | "outline";
}

const buttonStyles = tv({
  extend: ring,
  base: [
    "group flex h-8 items-center gap-2 rounded border px-2 font-medium text-sm",
    "disabled:border-muted disabled:bg-muted disabled:text-muted-foreground disabled:opacity-50",
    "hover:opacity-80",
    "pressed:opacity-75",
  ],
  variants: {
    variant: {
      default: "",
      light: "",
      outline: "bg-transparent",
    },
    color: {
      primary: "",
      secondary: "",
      success: "",
      destructive: "",
    },
  },
  compoundVariants: [
    {
      variant: "default",
      color: "primary",
      className: "border-primary bg-primary text-primary-foreground",
    },
    {
      variant: "default",
      color: "secondary",
      className: "border-secondary bg-secondary text-secondary-foreground",
    },
    {
      variant: "default",
      color: "success",
      className: "border-success bg-success text-success-foreground",
    },
    {
      variant: "default",
      color: "destructive",
      className:
        "border-destructive bg-destructive text-destructive-foreground",
    },
    {
      variant: "light",
      color: "primary",
      className:
        "border-primary-light bg-primary-light text-primary-light-foreground",
    },
    {
      variant: "light",
      color: "secondary",
      className:
        "border-secondary-light bg-secondary-light text-secondary-light-foreground",
    },
    {
      variant: "light",
      color: "success",
      className:
        "border-success-light bg-success-light text-success-light-foreground",
    },
    {
      variant: "light",
      color: "destructive",
      className:
        "border-destructive-light bg-destructive-light text-destructive-light-foreground",
    },
    {
      variant: "outline",
      color: "primary",
      className: "border-primary text-primary",
    },
    {
      variant: "outline",
      color: "secondary",
      className: "border-border text-foreground",
    },
    {
      variant: "outline",
      color: "success",
      className: "border-success text-success",
    },
    {
      variant: "outline",
      color: "destructive",
      className: "border-destructive text-destructive",
    },
  ],
  defaultVariants: {
    variant: "default",
    color: "primary",
  },
});

const spinnerStyles = tv({
  base: "animate-spin",
  variants: {
    variant: {
      default: [
        "fill-primary-foreground",
        "group-disabled:fill-muted-foreground",
      ],
      light: ["fill-current", "group-disabled:fill-muted-foreground"],
      outline: ["fill-current", "group-disabled:fill-muted-foreground"],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export function Button({
  children,
  color = "primary",
  variant = "default",
  ...props
}: ButtonProps) {
  return (
    <AriaButton {...props} className={buttonStyles({ variant, color })}>
      {composeRenderProps(children, (children, { isPending }) => (
        <>
          {isPending && (
            <CircleNotchIcon className={spinnerStyles({ variant })} size={16} />
          )}
          {children}
        </>
      ))}
    </AriaButton>
  );
}
