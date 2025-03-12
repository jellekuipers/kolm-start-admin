import { useState } from "react";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";

import { InvitationStatus } from "~/components/invitation/invitation-status";
import { MemberRole } from "~/components/member/member-role";
import { Button } from "~/components/ui/button";
import { Callout } from "~/components/ui/callout";
import { DataList } from "~/components/ui/data-list";
import { Flex } from "~/components/ui/flex";
import { Separator } from "~/components/ui/separator";
import { acceptInvitation, rejectInvitation } from "~/lib/invitation";
import { Invitation } from "~/types";

interface InvitationCardProps {
  invitation: Invitation;
}

export function InvitationCard({ invitation }: InvitationCardProps) {
  const [error, setError] = useState<Error | undefined>(undefined);
  const navigate = useNavigate();
  const router = useRouter();

  const onMutationError = async (error: unknown) => {
    console.error(error);

    if (error instanceof Error) {
      setError(error);
    }
  };

  const onMutationSuccess = async () => {
    await router.invalidate();

    navigate({
      to: "/organizations",
    });
  };

  const acceptInvitationMutation = useMutation({
    mutationFn: async ({ invitationId }: { invitationId: string }) =>
      await acceptInvitation({
        data: {
          invitationId,
        },
      }),
    onError: onMutationError,
    onSuccess: onMutationSuccess,
  });

  const rejectInvitationMutation = useMutation({
    mutationFn: async ({ invitationId }: { invitationId: string }) =>
      await rejectInvitation({
        data: {
          invitationId,
        },
      }),
    onError: onMutationError,
    onSuccess: onMutationSuccess,
  });

  return (
    <Flex direction="column" gap="4">
      <DataList.Root orientation={{ initial: "vertical", md: "horizontal" }}>
        <DataList.Item>
          <DataList.Label>Organization</DataList.Label>
          <DataList.Value>{invitation.organizationName}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Inviter email</DataList.Label>
          <DataList.Value>{invitation.inviterEmail}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Role</DataList.Label>
          <DataList.Value>
            <MemberRole role={invitation.role} />
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Expires</DataList.Label>
          <DataList.Value>
            {invitation.expiresAt.toLocaleString()}
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Status</DataList.Label>
          <DataList.Value>
            <InvitationStatus status={invitation.status} />
          </DataList.Value>
        </DataList.Item>
      </DataList.Root>
      <Separator />
      {error ? (
        <Callout.Root color="red">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>{error.message}</Callout.Text>
        </Callout.Root>
      ) : null}
      {invitation.status === "pending" ? (
        <Flex align="center" gap="4" justify="end" wrap="wrap">
          <Button
            color="red"
            disabled={rejectInvitationMutation.isPending}
            loading={rejectInvitationMutation.isPending}
            onClick={async () =>
              await rejectInvitationMutation.mutateAsync({
                invitationId: invitation.id,
              })
            }
            variant="outline"
          >
            Reject
          </Button>
          <Button
            disabled={acceptInvitationMutation.isPending}
            loading={acceptInvitationMutation.isPending}
            onClick={async () =>
              await acceptInvitationMutation.mutateAsync({
                invitationId: invitation.id,
              })
            }
          >
            Accept
          </Button>
        </Flex>
      ) : null}
    </Flex>
  );
}
