import {
  CaretDoubleLeftIcon,
  CaretDoubleRightIcon,
  CaretLeftIcon,
  CaretRightIcon,
} from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

import { IconButton } from "@/components/ui/icon-button";

interface PaginationTable {
  getCanNextPage(): boolean;
  getCanPreviousPage(): boolean;
  getPageCount(): number;
  firstPage(): void;
  lastPage(): void;
  nextPage(): void;
  previousPage(): void;
  state: {
    pagination: {
      pageIndex: number;
    };
  };
}

interface DataTablePaginationProps {
  table: PaginationTable;
}

export function DataTablePagination({ table }: DataTablePaginationProps) {
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
      <span className="px-2 font-semibold text-sm tabular-nums">
        {(table.state.pagination.pageIndex + 1).toString()} {t("pagination.of")}{" "}
        {table.getPageCount().toString()}
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
