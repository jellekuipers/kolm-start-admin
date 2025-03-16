import {
  Separator as AriaSeparator,
  type SeparatorProps,
} from "react-aria-components";

export function Separator(props: SeparatorProps) {
  return <AriaSeparator {...props} className="border-slate-200" />;
}
