import { ArrowLeftIcon } from "@radix-ui/react-icons";

import { Flex } from "~/components/ui/flex";
import { Link } from "~/components/ui/link";
import { Text } from "~/components/ui/text";

interface NotFoundProps {
  children?: React.ReactNode;
}

export function NotFound({ children }: NotFoundProps) {
  return (
    <Flex
      align="center"
      direction="column"
      gap="6"
      justify="center"
      p="4"
      style={{ backgroundColor: "var(--gray-1)", minHeight: "inherit" }}
    >
      {children || (
        <Flex align="center" direction="column" gap="4" justify="center">
          <Text size="9">404</Text>
          <Link to="/">
            <ArrowLeftIcon />
            Home
          </Link>
        </Flex>
      )}
    </Flex>
  );
}
