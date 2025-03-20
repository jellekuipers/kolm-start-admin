interface CalloutProps {
  children: React.ReactNode;
}

export function Callout(props: CalloutProps) {
  return (
    <div
      {...props}
      className="flex items-center gap-4 rounded bg-indigo-50 p-4 text-indigo-700"
    />
  );
}

interface CalloutIconProps {
  children: React.ReactNode;
}

export function CalloutIcon(props: CalloutIconProps) {
  return <div {...props} />;
}

interface CalloutTextProps {
  children: React.ReactNode;
}

export function CalloutText(props: CalloutTextProps) {
  return <p {...props} />;
}
