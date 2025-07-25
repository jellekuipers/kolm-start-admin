import { CopyIcon } from '@phosphor-icons/react';

import { Code } from '~/components/ui/code';
import { IconButton } from '~/components/ui/icon-button';

interface CopyValueProps {
  value: string;
}

export function CopyValue({ value }: CopyValueProps) {
  return (
    <div className="flex items-center gap-2">
      <Code>{value}</Code>
      <IconButton
        onPress={async () => await navigator.clipboard.writeText(value)}
      >
        <CopyIcon size={16} />
      </IconButton>
    </div>
  );
}
