import { Card } from "~/components/ui/card";
import { Flex } from "~/components/ui/flex";
import { Text } from "~/components/ui/text";

interface StatCardProps {
  count: number;
  title: string;
}

export function StatCard({ count, title }: StatCardProps) {
  return (
    <Card>
      <Flex direction="column" gap="4">
        <Text
          as="div"
          color="gray"
          size="1"
          style={{ textTransform: "uppercase" }}
          weight="medium"
        >
          {title}
        </Text>
        <Text as="div" weight="bold" size="6">
          {count}
        </Text>
      </Flex>
    </Card>
  );
}
