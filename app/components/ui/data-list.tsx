import { twMerge } from "tailwind-merge";

interface DataListProps {
  children: React.ReactNode;
}

interface DataListItemProps {
  children: React.ReactNode;
}

interface DataListLabelProps {
  children: React.ReactNode;
}

interface DataListValueProps {
  children: React.ReactNode;
}

export function DataList(props: DataListProps) {
  return (
    <dl
      {...props}
      className={twMerge(
        "flex flex-col gap-4",
        "md:grid md:auto-rows-fr md:grid-cols-[auto_1fr]",
      )}
    />
  );
}

export function DataListItem(props: DataListItemProps) {
  return (
    <div
      {...props}
      className={twMerge(
        "align-center flex flex-col gap-2",
        "md:col-span-2 md:grid md:grid-cols-subgrid",
      )}
    />
  );
}

export function DataListLabel(props: DataListLabelProps) {
  return <dt {...props} className="min-w-32 text-slate-600" />;
}

export function DataListValue(props: DataListValueProps) {
  return <dd {...props} />;
}
