import { createLink, type LinkComponent } from "@tanstack/react-router";
import { forwardRef } from "react";
import {
  type AriaLinkOptions,
  mergeProps,
  useFocusRing,
  useHover,
  useLink,
  useObjectRef,
} from "react-aria";
import { tv } from "tailwind-variants";

import { ring } from "@/components/ui/utils";

export interface AriaLinkProps extends Omit<AriaLinkOptions, "href"> {
  className?: string;
  children?: React.ReactNode;
}

const linkStyles = tv({
  extend: ring,
  base: ["flex items-center gap-2 text-primary text-sm", "hover:underline"],
});

const AriaLinkComponent = forwardRef<HTMLAnchorElement, AriaLinkProps>(
  ({ className, ...props }, forwardedRef) => {
    const ref = useObjectRef(forwardedRef);

    const { isPressed, linkProps } = useLink(props, ref);
    const { isHovered, hoverProps } = useHover(props);
    const { isFocusVisible, isFocused, focusProps } = useFocusRing(props);

    return (
      <a
        {...mergeProps(linkProps, hoverProps, focusProps, props)}
        className={linkStyles({ className })}
        data-focus-visible={isFocusVisible || undefined}
        data-focused={isFocused || undefined}
        data-hovered={isHovered || undefined}
        data-pressed={isPressed || undefined}
        ref={ref}
      />
    );
  },
);

AriaLinkComponent.displayName = "AriaLinkComponent";

const CreatedLinkComponent = createLink(AriaLinkComponent);

export const Link: LinkComponent<typeof AriaLinkComponent> = (props) => {
  return <CreatedLinkComponent preload="intent" {...props} />;
};
