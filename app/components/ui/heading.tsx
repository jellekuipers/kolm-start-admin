import { Heading as AriaHeading, HeadingProps } from "react-aria-components";

export function Heading(props: HeadingProps) {
  return <AriaHeading className="font-bold text-3xl" {...props} />;
}
