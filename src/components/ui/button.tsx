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
      class: [
        "border-primary bg-primary text-primary-foreground",
        "hover:bg-primary/90 hover:border-primary/90",
        "pressed:bg-primary/90 pressed:border-primary/90",
      ],
    },
    {
      variant: "default",
      color: "secondary",
      class: [
        "border-secondary bg-secondary text-secondary-foreground",
        "hover:bg-secondary/80 hover:border-secondary/80",
        "pressed:bg-secondary/80 pressed:border-secondary/80",
      ],
    },
    {
      variant: "default",
      color: "success",
      class: [
        "border-success bg-success text-success-foreground",
        "hover:bg-success/90 hover:border-success/90",
        "pressed:bg-success/90 pressed:border-success/90",
      ],
    },
    {
      variant: "default",
      color: "destructive",
      class: [
        "border-destructive bg-destructive text-destructive-foreground",
        "hover:bg-destructive/90 hover:border-destructive/90",
        "pressed:bg-destructive/90 pressed:border-destructive/90",
      ],
    },
    {
      variant: "light",
      color: "primary",
      class: [
        "border-primary/10 bg-primary/10 text-primary",
        "hover:bg-primary/20 hover:border-primary/20",
        "pressed:bg-primary/20 pressed:border-primary/20",
      ],
    },
    {
      variant: "light",
      color: "secondary",
      class: [
        "border-secondary bg-secondary text-secondary-foreground",
        "hover:bg-secondary/80 hover:border-secondary/80",
        "pressed:bg-secondary/80 pressed:border-secondary/80",
      ],
    },
    {
      variant: "light",
      color: "success",
      class: [
        "border-success/10 bg-success/10 text-success",
        "hover:bg-success/20 hover:border-success/20",
        "pressed:bg-success/20 pressed:border-success/20",
      ],
    },
    {
      variant: "light",
      color: "destructive",
      class: [
        "border-destructive/10 bg-destructive/10 text-destructive",
        "hover:bg-destructive/20 hover:border-destructive/20",
        "pressed:bg-destructive/20 pressed:border-destructive/20",
      ],
    },
    {
      variant: "outline",
      color: "primary",
      class: [
        "border-primary text-primary",
        "hover:bg-primary/10",
        "pressed:bg-primary/10",
      ],
    },
    {
      variant: "outline",
      color: "secondary",
      class: [
        "border-border text-foreground",
        "hover:bg-secondary",
        "pressed:bg-secondary",
      ],
    },
    {
      variant: "outline",
      color: "success",
      class: [
        "border-success text-success",
        "hover:bg-success/10",
        "pressed:bg-success/10",
      ],
    },
    {
      variant: "outline",
      color: "destructive",
      class: [
        "border-destructive text-destructive",
        "hover:bg-destructive/10",
        "pressed:bg-destructive/10",
      ],
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
