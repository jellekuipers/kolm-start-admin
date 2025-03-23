import { forwardRef } from "react";
import { createLink, LinkComponent } from "@tanstack/react-router";
import {
  mergeProps,
  useFocusRing,
  useHover,
  useLink,
  useObjectRef,
  type AriaLinkOptions,
} from "react-aria";
import { twMerge } from "tailwind-merge";

export interface AriaLinkProps extends Omit<AriaLinkOptions, "href"> {
  className?: string;
  children?: React.ReactNode;
}

const AriaLinkComponent = forwardRef<HTMLAnchorElement, AriaLinkProps>(
  ({ className, ...props }, forwardedRef) => {
    const ref = useObjectRef(forwardedRef);

    const { isPressed, linkProps } = useLink(props, ref);
    const { isHovered, hoverProps } = useHover(props);
    const { isFocusVisible, isFocused, focusProps } = useFocusRing(props);

    return (
      <a
        {...mergeProps(linkProps, hoverProps, focusProps, props)}
        ref={ref}
        data-hovered={isHovered || undefined}
        data-pressed={isPressed || undefined}
        data-focus-visible={isFocusVisible || undefined}
        data-focused={isFocused || undefined}
        className={twMerge(
          "flex items-center gap-2 text-sm text-indigo-700",
          "hover:underline",
          className,
        )}
      />
    );
  },
);

AriaLinkComponent.displayName = "AriaLinkComponent";

const CreatedLinkComponent = createLink(AriaLinkComponent);

export const Link: LinkComponent<typeof AriaLinkComponent> = (props) => {
  return <CreatedLinkComponent preload="intent" {...props} />;
};
