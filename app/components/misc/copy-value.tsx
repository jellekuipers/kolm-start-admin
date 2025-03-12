import { CopyIcon } from "@radix-ui/react-icons";
import { Code, Flex, IconButton } from "@radix-ui/themes";

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
