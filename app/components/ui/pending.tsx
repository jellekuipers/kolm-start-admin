import { Flex } from "~/components/ui/flex";
import { Spinner } from "~/components/ui/spinner";

export function Pending() {
  return (
    <Flex align="center" justify="center" p="4">
      <Spinner size="3" />
    </Flex>
  );
}
