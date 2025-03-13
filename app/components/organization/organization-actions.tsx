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
import { IconButton } from "~/components/ui/icon-button";
import { MenuButton, MenuItem, MenuSeparator } from "~/components/ui/menu";
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
      <MenuButton
        label={
          variant === "overview" ? (
            <IconButton>
              <DotsVerticalIcon />
            </IconButton>
          ) : (
            <Button>
              Actions <ChevronDownIcon />
            </Button>
          )
        }
      >
        {variant === "overview" ? (
          <MenuItem
            onAction={() =>
              navigate({
                params: { organizationId: organization.id },
                to: "/organizations/$organizationId",
              })
            }
          >
            <CardStackIcon />
            View organization
          </MenuItem>
        ) : null}
        <MenuItem onAction={() => setOpen(true)}>
          <Pencil1Icon />
          Update organization
        </MenuItem>
        <MenuSeparator />
        <MenuItem
          isDisabled={deleteOrganizationMutation.isPending}
          onAction={async () =>
            await deleteOrganizationMutation.mutateAsync({
              organizationId: organization.id,
            })
          }
        >
          <TrashIcon />
          Delete organization
        </MenuItem>
      </MenuButton>
    </>
  );
}
