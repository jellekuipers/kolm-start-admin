import { CaretDown as CaretDownIcon } from "@phosphor-icons/react";
import { Table } from "@tanstack/react-table";
import {
  DialogTrigger as AriaDialogTrigger,
  Dialog,
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
    <AriaDialogTrigger>
      <Button variant="secondary">
        Column visibility <CaretDownIcon />
      </Button>
      <Popover className="w-48 p-4">
        <Dialog className="outline-hidden relative">
          <GridList
            className="space-y-1"
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
    </AriaDialogTrigger>
  );
}
