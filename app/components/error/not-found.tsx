import { ArrowLeftIcon } from "@radix-ui/react-icons";

import { Heading } from "~/components/ui/heading";
import { Link } from "~/components/ui/link";

interface NotFoundProps {
  children?: React.ReactNode;
}

export function NotFound({ children }: NotFoundProps) {
  return (
    <div className="flex items-center justify-center p-4 flex-col gap-6 bg-gray-50">
      {children || (
        <div className="flex items-center flex-col gap-4 justify-center">
          <Heading>404</Heading>
          <Link className="flex items-center gap-2" to="/">
            <ArrowLeftIcon />
            Home
          </Link>
        </div>
      )}
    </div>
  );
}
