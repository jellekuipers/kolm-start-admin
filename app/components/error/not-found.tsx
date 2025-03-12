import { ArrowLeftIcon } from "@radix-ui/react-icons";

import { Link } from "~/components/ui/link";
import { Text } from "~/components/ui/text";

interface NotFoundProps {
  children?: React.ReactNode;
}

export function NotFound({ children }: NotFoundProps) {
  return (
    <div className="flex items-center justify-center p-4 flex-col gap-6 bg-gray-50">
      {children || (
        <div className="flex items-center flex-col gap-4 justify-center">
          <Text size="9">404</Text>
          <Link to="/">
            <ArrowLeftIcon />
            Home
          </Link>
        </div>
      )}
    </div>
  );
}
