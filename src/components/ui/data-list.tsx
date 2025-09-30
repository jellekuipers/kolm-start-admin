import { twMerge } from "tailwind-merge";

interface DataListProps {
  children: React.ReactNode;
  className?: string;
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

export function DataList({ className, ...props }: DataListProps) {
  return (
    <dl
      {...props}
      className={twMerge(
        "flex flex-col gap-2 text-sm",
        "lg:grid lg:auto-rows-fr lg:grid-cols-[auto_1fr]",
        className,
      )}
    />
  );
}

export function DataListItem(props: DataListItemProps) {
  return (
    <div
      {...props}
      className={twMerge(
        "flex flex-col gap-2",
        "lg:col-span-2 lg:grid lg:grid-cols-subgrid lg:items-center",
      )}
    />
  );
}

export function DataListLabel(props: DataListLabelProps) {
  return (
    <dt
      {...props}
      className={twMerge("min-w-22 text-gray-600", "dark:text-gray-300")}
    />
  );
}

export function DataListValue(props: DataListValueProps) {
  return <dd {...props} />;
}
