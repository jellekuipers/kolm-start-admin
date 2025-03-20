import { Heading as AriaHeading, HeadingProps } from "react-aria-components";

export function Heading(props: HeadingProps) {
  return <AriaHeading {...props} className="text-3xl font-bold" />;
}
