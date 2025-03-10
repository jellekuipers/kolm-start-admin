import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";

import { Link } from "~/components/ui/link";

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
          <Button asChild variant="outline">
            <Link to="/">
              <ArrowLeftIcon />
              Home
            </Link>
          </Button>
        </Flex>
      )}
    </Flex>
  );
}
