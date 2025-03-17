interface DataListProps {
  children: React.ReactNode;
}

export function DataList(props: DataListProps) {
  return (
    <dl
      {...props}
      className="flex flex-col gap-4 md:grid md:grid-cols-[auto_1fr] md:auto-rows-fr"
    />
  );
}

interface DataListItemProps {
  children: React.ReactNode;
}

export function DataListItem(props: DataListItemProps) {
  return (
    <div
      {...props}
      className="flex flex-col gap-2 md:grid md:grid-cols-subgrid md:col-span-2 align-center"
    />
  );
}

interface DataListLabelProps {
  children: React.ReactNode;
}

export function DataListLabel(props: DataListLabelProps) {
  return <dt {...props} className="min-w-32 text-slate-600" />;
}

interface DataListValueProps {
  children: React.ReactNode;
}

export function DataListValue(props: DataListValueProps) {
  return <dd {...props} />;
}
