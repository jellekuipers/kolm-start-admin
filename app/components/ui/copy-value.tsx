import { CopyIcon } from "@radix-ui/react-icons";

import { Code } from "~/components/ui/code";
import { Flex } from "~/components/ui/flex";
import { IconButton } from "~/components/ui/icon-button";

interface CopyValueProps {
  value: string;
}

export function CopyValue({ value }: CopyValueProps) {
  return (
    <Flex align="center" gap="2">
      <Code color="gray">{value}</Code>
      <IconButton
        color="gray"
        onClick={async () => await navigator.clipboard.writeText(value)}
        size="1"
        variant="ghost"
      >
        <CopyIcon />
      </IconButton>
    </Flex>
  );
}
