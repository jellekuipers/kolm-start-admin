interface CalloutIconProps {
  children: React.ReactNode;
}
interface CalloutRootProps {
  children: React.ReactNode;
}
interface CalloutTextProps {
  children: React.ReactNode;
}

export function Icon(props: CalloutIconProps) {
  return <div {...props} />;
}

export function Root(props: CalloutRootProps) {
  return <div {...props} />;
}

export function Text(props: CalloutTextProps) {
  return <div {...props} />;
}

export const Callout = {
  Icon,
  Root,
  Text,
};
