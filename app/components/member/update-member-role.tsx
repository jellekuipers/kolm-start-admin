import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

import { MemberRole } from "~/components/member/member-role";
import { Select } from "~/components/ui/select";
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
    <Select.Root
      defaultValue={member.role}
      disabled={updateMemberRoleMutation.isPending}
      onValueChange={async (role) =>
        await updateMemberRoleMutation.mutateAsync({
          memberId: member.id,
          organizationId: member.organizationId,
          role,
        })
      }
    >
      <Select.Trigger color="gray" variant="ghost">
        <MemberRole role={member.role} />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="admin">Admin</Select.Item>
        <Select.Item value="member">Member</Select.Item>
        <Select.Item value="owner">Owner</Select.Item>
      </Select.Content>
    </Select.Root>
  );
}
