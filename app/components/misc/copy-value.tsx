import { CopyIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";

import { Code } from "~/components/ui/code";

interface CopyValueProps {
  value: string;
}

export function CopyValue({ value }: CopyValueProps) {
  return (
    <div className="flex items-center gap-2">
      <Code>{value}</Code>
      <IconButton
        color="gray"
        onClick={async () => await navigator.clipboard.writeText(value)}
        size="1"
        variant="ghost"
      >
        <CopyIcon />
      </IconButton>
    </div>
  );
}
