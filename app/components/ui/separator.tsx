import {
  Separator as AriaSeparator,
  SeparatorProps,
} from "react-aria-components";

export function Separator(props: SeparatorProps) {
  return <AriaSeparator className="border-gray-300" {...props} />;
}
