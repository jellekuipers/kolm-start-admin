/* eslint-disable react/no-children-prop */
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { z } from "zod";

import { FormError } from "~/components/form/form-error";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Dialog } from "~/components/ui/dialog";
import { Label } from "~/components/ui/field";
import { Select } from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import { Text } from "~/components/ui/text";
import { TextField } from "~/components/ui/text-field";
import { getFieldErrorMessage } from "~/lib/error";
import { createInvitation } from "~/lib/invitation";
import { teamsQueryOptions } from "~/lib/team";

interface InviteMemberFormProps {
  onSuccess: () => void;
  organizationId: string;
}

const createInvitationSchema = z.object({
  email: z.string().email(),
  organizationId: z.string(),
  role: z.string(),
  teamId: z.string(),
});

export function InviteMemberForm({
  onSuccess,
  organizationId,
}: InviteMemberFormProps) {
  const [error, setError] = useState<Error | undefined>(undefined);
  const router = useRouter();

  const onMutationError = async (error: unknown) => {
    console.error(error);

    if (error instanceof Error) {
      setError(error);
    }
  };

  const onMutationSuccess = async () => {
    await router.invalidate();

    reset();
    onSuccess();
  };

  const createInvitationMutation = useMutation({
    mutationFn: async ({
      email,
      organizationId,
      role,
      teamId,
    }: {
      email: string;
      organizationId: string;
      role: string;
      teamId: string | undefined;
    }) =>
      await createInvitation({
        data: {
          email,
          organizationId,
          role,
          teamId,
        },
      }),
    onError: onMutationError,
    onSuccess: onMutationSuccess,
  });

  const { Field, handleSubmit, reset, Subscribe } = useForm({
    defaultValues: {
      email: "",
      organizationId,
      role: "member",
      teamId: "",
    },
    onSubmit: async ({ value }) => {
      await createInvitationMutation.mutateAsync(value);
    },
    validators: {
      onSubmit: createInvitationSchema,
    },
  });

  const teamsQuery = useQuery(teamsQueryOptions({ organizationId }));

  const teams = teamsQuery.data;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        handleSubmit();
      }}
    >
      <div className="space-y-4">
        <Field
          name="email"
          children={(field) => {
            return (
              <TextField
                defaultValue={field.state.value}
                errorMessage={getFieldErrorMessage({ field })}
                label="Email"
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(value) => field.handleChange(value)}
              />
            );
          }}
        />
        <Field
          name="role"
          children={({ handleChange, name, state }) => {
            return (
              <div className="space-y-1">
                <Label htmlFor="role">Role</Label>
                <Select.Root
                  defaultValue={state.value}
                  name={name}
                  onValueChange={handleChange}
                >
                  <Select.Trigger />
                  <Select.Content>
                    <Select.Item value="admin">Admin</Select.Item>
                    <Select.Item value="member">Member</Select.Item>
                    <Select.Item value="owner">Owner</Select.Item>
                  </Select.Content>
                </Select.Root>
              </div>
            );
          }}
        />
        <Separator />
        <div className="flex items-center gap-2">
          <Text weight="medium">Team</Text>
          <Badge>optional</Badge>
        </div>
        <Field
          name="teamId"
          children={({ handleChange, name, state }) => {
            return (
              <div className="space-y-1">
                <Label htmlFor="teamId">Add to team</Label>
                <Select.Root
                  defaultValue={state.value}
                  name={name}
                  onValueChange={handleChange}
                >
                  <Select.Trigger />
                  <Select.Content>
                    {teams?.map((team) => (
                      <Select.Item key={team.id} value={team.id}>
                        {team.name}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              </div>
            );
          }}
        />
        {error ? <FormError error={error} /> : null}
        <Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <div className="flex gap-3 justify-end">
              <Dialog.Close>
                <Button>Cancel</Button>
              </Dialog.Close>
              <Button
                isDisabled={!canSubmit}
                isPending={isSubmitting}
                type="submit"
              >
                Save
              </Button>
            </div>
          )}
        />
      </div>
    </form>
  );
}
