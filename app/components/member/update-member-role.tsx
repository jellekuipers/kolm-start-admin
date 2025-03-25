import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

import { Select, SelectItem } from "~/components/ui/select";
import { updateMemberRole } from "~/lib/member";
import { Member, OrganizationMember } from "~/types";

interface UpdateMemberRoleProps {
  member: Member | OrganizationMember;
}

export function UpdateMemberRole({ member }: UpdateMemberRoleProps) {
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

  const updateMemberRoleMutation = useMutation({
    mutationFn: async ({
      memberId,
      organizationId,
      role,
    }: {
      memberId: string;
      organizationId: string;
      role: string;
    }) => await updateMemberRole({ data: { memberId, organizationId, role } }),
    onError: onMutationError,
    onSuccess: onMutationSuccess,
  });

  return (
    <Select
      aria-label="Member role"
      isDisabled={updateMemberRoleMutation.isPending}
      onSelectionChange={async (key) =>
        await updateMemberRoleMutation.mutateAsync({
          memberId: member.id,
          organizationId: member.organizationId,
          role: key as string,
        })
      }
      selectedKey={member.role}
    >
      <SelectItem id="admin">Admin</SelectItem>
      <SelectItem id="member">Member</SelectItem>
      <SelectItem id="owner">Owner</SelectItem>
    </Select>
  );
}
