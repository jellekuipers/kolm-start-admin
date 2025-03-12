import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button, DialogTrigger } from "react-aria-components";

// import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Popover } from "~/components/ui/popover";

interface DataTableColumnFilterProps<TData> {
  table: Table<TData>;
}

export function DataTableColumnFilter<TData>({
  table,
}: DataTableColumnFilterProps<TData>) {
  return (
    <>
      <DialogTrigger>
        <Button>
          Column visibility <ChevronDownIcon />
        </Button>
        <Popover>
          <div className="flex flex-col gap-2">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <Checkbox
                    key={column.id}
                    id={column.id}
                    isSelected={column.getIsVisible()}
                    onChange={(checked) => column.toggleVisibility(!!checked)}
                  >
                    {column.columnDef.header?.toString()}
                  </Checkbox>
                );
              })}
          </div>
        </Popover>
      </DialogTrigger>
    </>
  );
}
