import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import {
  Dialog,
  DialogTrigger,
  GridList,
  GridListItem,
} from "react-aria-components";

import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Popover } from "~/components/ui/popover";

interface DataTableColumnFilterProps<TData> {
  table: Table<TData>;
}

export function DataTableColumnFilter<TData>({
  table,
}: DataTableColumnFilterProps<TData>) {
  const columns = table.getAllColumns().filter((column) => column.getCanHide());

  return (
    <DialogTrigger>
      <Button>
        Column visibility <ChevronDownIcon />
      </Button>
      <Popover>
        <Dialog>
          <GridList
            aria-label="Column filter"
            items={columns}
            onSelectionChange={(column) => console.log(column)}
            selectionMode="multiple"
          >
            {(column) => (
              <GridListItem
                key={column.id}
                textValue={column.columnDef.header?.toString()}
              >
                <Checkbox slot="selection">
                  {column.columnDef.header?.toString()}
                </Checkbox>
              </GridListItem>
            )}
          </GridList>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}
