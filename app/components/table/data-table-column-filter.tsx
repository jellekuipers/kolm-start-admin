import { CaretDown as CaretDownIcon } from "@phosphor-icons/react";
import { Table } from "@tanstack/react-table";
import {
  DialogTrigger as AriaDialogTrigger,
  Dialog,
  GridList,
  GridListItem,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

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
      <Button color="indigo" variant="light">
        Column visibility <CaretDownIcon />
      </Button>
      <Popover>
        <Dialog>
          <GridList
            className="space-y-[1px]"
            items={columns}
            onSelectionChange={(selectedIds) => {
              const visibilityState: Record<string, boolean> = {};

              for (const column of columns) {
                if (selectedIds === "all") {
                  visibilityState[column.id] = true;
                } else if (typeof selectedIds?.has === "function") {
                  visibilityState[column.id] = selectedIds.has(column.id);
                }
              }

              table.setColumnVisibility(visibilityState);
            }}
            selectedKeys={table.getVisibleLeafColumns().map(({ id }) => id)}
            selectionMode="multiple"
          >
            {(column) => (
              <GridListItem
                className={twMerge(
                  "flex h-8 items-center gap-2 rounded border border-transparent px-2 text-sm font-medium",
                  "hover:bg-indigo-50",
                  "selected:bg-indigo-50",
                )}
                textValue={column.id}
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
