import {
  Separator as AriaSeparator,
  type SeparatorProps as AriaSeparatorProps,
} from "react-aria-components";

export function Separator(props: AriaSeparatorProps) {
  return <AriaSeparator {...props} className="border-slate-300" />;
}
