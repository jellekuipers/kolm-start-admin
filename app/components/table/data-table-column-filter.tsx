import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Label } from "radix-ui";

import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Flex } from "~/components/ui/flex";
import { Popover } from "~/components/ui/popover";
import { Text } from "~/components/ui/text";

interface DataTableColumnFilterProps<TData> {
  table: Table<TData>;
}

export function DataTableColumnFilter<TData>({
  table,
}: DataTableColumnFilterProps<TData>) {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button variant="soft">
          Column visibility <ChevronDownIcon />
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <Flex direction="column" gap="2">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <Flex
                  key={column.id}
                  align="center"
                  style={{ cursor: "var(--cursor-button)" }}
                >
                  <Checkbox
                    checked={column.getIsVisible()}
                    id={column.id}
                    onCheckedChange={(checked) =>
                      column.toggleVisibility(!!checked)
                    }
                  />
                  <Label.Root
                    asChild
                    htmlFor={column.id}
                    style={{ paddingLeft: "var(--space-2)" }}
                  >
                    <Text as="label" size="2" weight="medium">
                      {column.columnDef.header?.toString()}
                    </Text>
                  </Label.Root>
                </Flex>
              );
            })}
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
}
