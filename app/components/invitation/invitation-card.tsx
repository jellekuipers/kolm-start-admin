import { useState } from "react";
import { Info as InfoIcon } from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";

import { InvitationStatus } from "~/components/invitation/invitation-status";
import { MemberRole } from "~/components/member/member-role";
import { Button } from "~/components/ui/button";
import { Callout, CalloutIcon, CalloutText } from "~/components/ui/callout";
import {
  DataList,
  DataListItem,
  DataListLabel,
  DataListValue,
} from "~/components/ui/data-list";
import { Separator } from "~/components/ui/separator";
import { acceptInvitation, rejectInvitation } from "~/lib/invitation";
import type { Invitation } from "~/types";

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
    <div className="space-y-4">
      <DataList className="gap-4">
        <DataListItem>
          <DataListLabel>Organization</DataListLabel>
          <DataListValue>{invitation.organizationName}</DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListLabel>Inviter email</DataListLabel>
          <DataListValue>{invitation.inviterEmail}</DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListLabel>Role</DataListLabel>
          <DataListValue>
            <MemberRole role={invitation.role} />
          </DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListLabel>Expires</DataListLabel>
          <DataListValue>{invitation.expiresAt.toDateString()}</DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListLabel>Status</DataListLabel>
          <DataListValue>
            <InvitationStatus status={invitation.status} />
          </DataListValue>
        </DataListItem>
      </DataList>
      {error ? (
        <Callout>
          <CalloutIcon>
            <InfoIcon size={16} />
          </CalloutIcon>
          <CalloutText>{error.message}</CalloutText>
        </Callout>
      ) : null}
      {invitation.status === "pending" ? (
        <div className="flex flex-col gap-4">
          <Separator />
          <div className="flex justify-end gap-2">
            <Button
              color="red"
              isDisabled={rejectInvitationMutation.isPending}
              isPending={rejectInvitationMutation.isPending}
              onPress={async () =>
                await rejectInvitationMutation.mutateAsync({
                  invitationId: invitation.id,
                })
              }
              variant="outline"
            >
              Reject invitation
            </Button>
            <Button
              isDisabled={acceptInvitationMutation.isPending}
              isPending={acceptInvitationMutation.isPending}
              onPress={async () =>
                await acceptInvitationMutation.mutateAsync({
                  invitationId: invitation.id,
                })
              }
            >
              Accept invitation
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
