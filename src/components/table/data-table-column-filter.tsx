import { CaretDownIcon } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { GridList, GridListItem } from "@/components/ui/grid-list";
import { Popover } from "@/components/ui/popover";

interface ColumnVisibilityTable {
  getAllColumns(): Array<{
    columnDef: {
      header?: unknown;
    };
    getCanHide(): boolean;
    id: string;
  }>;
  getVisibleLeafColumns(): Array<{
    id: string;
  }>;
  setColumnVisibility(visibilityState: Record<string, boolean>): void;
}

interface DataTableColumnFilterProps {
  table: ColumnVisibilityTable;
}

export function DataTableColumnFilter({ table }: DataTableColumnFilterProps) {
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
                  {String(column.columnDef.header ?? "")}
                </Checkbox>
              </GridListItem>
            )}
          </GridList>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}
