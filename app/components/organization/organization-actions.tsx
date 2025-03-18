import { useState } from "react";
import {
  CaretDown as CaretDownIcon,
  DotsThreeVertical as DotsThreeVerticalIcon,
  Network as NetworkIcon,
  PencilSimple as PencilSimpleIcon,
  TrashSimple as TrashSimpleIcon,
} from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";

import { UpdateOrganizationModal } from "~/components/organization/update-organization-modal";
import { Button } from "~/components/ui/button";
import { IconButton } from "~/components/ui/icon-button";
import {
  Menu,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from "~/components/ui/menu";
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
      <MenuTrigger>
        {variant === "overview" ? (
          <IconButton>
            <DotsThreeVerticalIcon size={20} />
          </IconButton>
        ) : (
          <Button color="secondary">
            Actions <CaretDownIcon size={16} />
          </Button>
        )}
        <Menu>
          {variant === "overview" ? (
            <MenuItem
              onAction={() =>
                navigate({
                  params: { organizationId: organization.id },
                  to: "/organizations/$organizationId",
                })
              }
            >
              <NetworkIcon size={16} />
              View organization
            </MenuItem>
          ) : null}
          <MenuItem onAction={() => setOpen(true)}>
            <PencilSimpleIcon size={16} />
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
            <TrashSimpleIcon size={16} />
            Delete organization
          </MenuItem>
        </Menu>
      </MenuTrigger>
    </>
  );
}
