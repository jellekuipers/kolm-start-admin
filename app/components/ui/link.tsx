import { forwardRef } from "react";
import { createLink, type LinkComponent } from "@tanstack/react-router";
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
        className={twMerge(
          "flex items-center gap-2 text-sm text-indigo-700",
          "outline-0 outline-offset-2 outline-indigo-700 focus-visible:outline-2",
          "hover:underline",
          className,
        )}
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
