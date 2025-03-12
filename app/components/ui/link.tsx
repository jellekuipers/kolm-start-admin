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

interface RACLinkProps extends Omit<AriaLinkOptions, "href"> {
  children?: React.ReactNode;
}

const RACLinkComponent = forwardRef<HTMLAnchorElement, RACLinkProps>(
  (props, forwardedRef) => {
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
      />
    );
  },
);

RACLinkComponent.displayName = "RACLinkComponent";

const CreatedLinkComponent = createLink(RACLinkComponent);

export const Link: LinkComponent<typeof RACLinkComponent> = (props) => {
  return <CreatedLinkComponent preload={"intent"} {...props} />;
};
