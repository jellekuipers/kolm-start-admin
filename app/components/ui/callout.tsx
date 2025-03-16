interface CalloutProps {
  children: React.ReactNode;
}

interface CalloutIconProps {
  children: React.ReactNode;
}

interface CalloutTextProps {
  children: React.ReactNode;
}

export function Callout(props: CalloutProps) {
  return (
    <div
      {...props}
      className="bg-gray-900 rounded p-4 text-white flex gap-4 items-center"
    />
  );
}

export function CalloutIcon(props: CalloutIconProps) {
  return <div {...props} />;
}

export function CalloutText(props: CalloutTextProps) {
  return <p {...props} />;
}
