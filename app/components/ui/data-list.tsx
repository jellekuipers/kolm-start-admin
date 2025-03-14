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
      className="flex flex-col gap-4 md:grid md:grid-cols-[auto_1fr]"
      {...props}
    />
  );
}

export function DataListItem(props: DataListItemProps) {
  return (
    <div
      className="flex flex-col gap-2 md:grid md:grid-cols-subgrid md:col-span-2 align-baseline"
      {...props}
    />
  );
}

export function DataListLabel(props: DataListLabelProps) {
  return <dt className="min-w-32 text-gray-600" {...props} />;
}

export function DataListValue(props: DataListValueProps) {
  return <dd {...props} />;
}
