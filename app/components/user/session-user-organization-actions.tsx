import {
  ArrowRightIcon,
  CardStackIcon,
  DotsVerticalIcon,
  DrawingPinIcon,
} from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";

import { DropdownMenu } from "~/components/ui/dropdown-menu";
import { IconButton } from "~/components/ui/icon-button";
import { authClient, useSession } from "~/lib/auth-client";

interface OrganizationActionsProps {
  organizationId: string;
}

export function SessionUserOrganizationActions({
  organizationId,
}: OrganizationActionsProps) {
  const navigate = useNavigate();
  const router = useRouter();
  const session = useSession();

  const onMutationError = async (error: unknown) => {
    console.error(error);

    if (error instanceof Error) {
      alert(error.message);
    }
  };

  const onMutationSuccess = async () => {
    await router.invalidate();

    session.refetch();
  };

  const setActiveOrganizationMutation = useMutation({
    mutationFn: async ({ organizationId }: { organizationId: string }) =>
      await authClient.organization.setActive({
        organizationId,
      }),
    onError: onMutationError,
    onSuccess: onMutationSuccess,
  });

  const leaveOrganizationMutation = useMutation({
    mutationFn: async ({ organizationId }: { organizationId: string }) =>
      await authClient.organization.leave({
        organizationId,
      }),
    onError: onMutationError,
    onSuccess: onMutationSuccess,
  });

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton variant="ghost">
          <DotsVerticalIcon />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        <DropdownMenu.Item
          onClick={() =>
            navigate({
              params: { organizationId },
              to: "/organizations/$organizationId",
            })
          }
        >
          <CardStackIcon />
          View organization
        </DropdownMenu.Item>
        <DropdownMenu.Item
          onClick={async () =>
            await setActiveOrganizationMutation.mutateAsync({
              organizationId,
            })
          }
        >
          <DrawingPinIcon />
          Set active organization
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item
          color="red"
          disabled={leaveOrganizationMutation.isPending}
          onClick={async () =>
            await leaveOrganizationMutation.mutateAsync({
              organizationId,
            })
          }
        >
          <ArrowRightIcon />
          Leave organization
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
