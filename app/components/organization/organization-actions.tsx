import { useState } from "react";
import {
  CardStackIcon,
  ChevronDownIcon,
  DotsVerticalIcon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";

import { UpdateOrganizationModal } from "~/components/organization/update-organization-modal";
import { Button } from "~/components/ui/button";
import { DropdownMenu } from "~/components/ui/dropdown-menu";
import { IconButton } from "~/components/ui/icon-button";
import { deleteOrganization } from "~/lib/organization";
import { AuthOrganization, ORMOrganization } from "~/types";

interface OrganizationActionsProps {
  organization: AuthOrganization | ORMOrganization;
  variant: "overview" | "profile";
}

export function OrganizationActions({
  organization,
  variant,
}: OrganizationActionsProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const router = useRouter();

  const onMutationError = async (error: unknown) => {
    console.error(error);

    if (error instanceof Error) {
      alert(error.message);
    }
  };

  const onMutationSuccess = async () => {
    await router.invalidate();
  };

  const deleteOrganizationMutation = useMutation({
    mutationFn: async ({ organizationId }: { organizationId: string }) =>
      await deleteOrganization({ data: { organizationId } }),
    onError: onMutationError,
    onSuccess: onMutationSuccess,
  });

  return (
    <>
      <UpdateOrganizationModal
        open={open}
        setOpen={setOpen}
        organization={organization}
      />
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          {variant === "overview" ? (
            <IconButton variant="ghost">
              <DotsVerticalIcon />
            </IconButton>
          ) : (
            <Button>
              Actions <ChevronDownIcon />
            </Button>
          )}
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end">
          {variant === "overview" ? (
            <DropdownMenu.Item
              onClick={() =>
                navigate({
                  params: { organizationId: organization.id },
                  to: "/organizations/$organizationId",
                })
              }
            >
              <CardStackIcon />
              View organization
            </DropdownMenu.Item>
          ) : null}
          <DropdownMenu.Item onClick={() => setOpen(true)}>
            <Pencil1Icon />
            Update organization
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item
            color="red"
            disabled={deleteOrganizationMutation.isPending}
            onClick={async () =>
              await deleteOrganizationMutation.mutateAsync({
                organizationId: organization.id,
              })
            }
          >
            <TrashIcon />
            Delete organization
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  );
}
