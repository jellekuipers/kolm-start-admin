import { forwardRef } from "react";
import { LinkProps, Link as RadixLink } from "@radix-ui/themes";
import { createLink, LinkComponent } from "@tanstack/react-router";

const BasicLinkComponent = forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => {
    return <RadixLink ref={ref} {...props} />;
  },
);

BasicLinkComponent.displayName = "BasicLinkComponent";

const CreatedLinkComponent = createLink(BasicLinkComponent);

export const Link: LinkComponent<typeof BasicLinkComponent> = (props) => {
  return <CreatedLinkComponent preload="intent" {...props} />;
};
