import { CaretDownIcon } from "@phosphor-icons/react";
import type { Table } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { GridList, GridListItem } from "@/components/ui/grid-list";
import { Popover } from "@/components/ui/popover";

interface DataTableColumnFilterProps<TData> {
  table: Table<TData>;
}

export function DataTableColumnFilter<TData>({
  table,
}: DataTableColumnFilterProps<TData>) {
  const { t } = useTranslation();
  const columns = table.getAllColumns().filter((column) => column.getCanHide());

  return (
    <DialogTrigger>
      <Button variant="light">
        {t("table.column_visibility")} <CaretDownIcon />
      </Button>
      <Popover>
        <Dialog>
          <GridList
            aria-label={t("aria.toggle_column_visibility")}
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
              <GridListItem textValue={column.id}>
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
