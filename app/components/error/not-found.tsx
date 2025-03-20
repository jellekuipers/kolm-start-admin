import { ArrowLeft as ArrowLeftIcon } from "@phosphor-icons/react";

import { Heading } from "~/components/ui/heading";
import { Link } from "~/components/ui/link";

interface NotFoundProps {
  children?: React.ReactNode;
}

export function NotFound({ children }: NotFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 bg-slate-50 p-4">
      {children || (
        <div className="flex flex-col items-center justify-center gap-4">
          <Heading>404</Heading>
          <Link className="flex items-center gap-2" to="/">
            <ArrowLeftIcon size={16} />
            Home
          </Link>
        </div>
      )}
    </div>
  );
}
