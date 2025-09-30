import {
    CaretDoubleLeftIcon,
    CaretDoubleRightIcon,
    CaretLeftIcon,
    CaretRightIcon,
} from "@phosphor-icons/react";
import type { Table } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { IconButton } from "~/components/ui/icon-button";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-1">
      <IconButton
        aria-label={t("table.go_to_first_page")}
        isDisabled={!table.getCanPreviousPage()}
        onPress={() => table.firstPage()}
      >
        <CaretDoubleLeftIcon size={16} />
      </IconButton>
      <IconButton
        aria-label={t("table.go_to_previous_page")}
        isDisabled={!table.getCanPreviousPage()}
        onPress={() => table.previousPage()}
      >
        <CaretLeftIcon size={16} />
      </IconButton>
      <span className="text-sm font-semibold tabular-nums px-2">
        {(table.getState().pagination.pageIndex + 1).toString()}{" "}
        {t("pagination.of")} {table.getPageCount().toString()}
      </span>
      <IconButton
        aria-label={t("table.go_to_next_page")}
        isDisabled={!table.getCanNextPage()}
        onPress={() => table.nextPage()}
      >
        <CaretRightIcon size={16} />
      </IconButton>
      <IconButton
        aria-label={t("table.go_to_last_page")}
        isDisabled={!table.getCanNextPage()}
        onPress={() => table.lastPage()}
      >
        <CaretDoubleRightIcon size={16} />
      </IconButton>
    </div>
  );
}
