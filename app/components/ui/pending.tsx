import { Flex, Spinner } from "@radix-ui/themes";

export function Pending() {
  return (
    <Flex align="center" justify="center" p="4">
      <Spinner size="3" />
    </Flex>
  );
}
