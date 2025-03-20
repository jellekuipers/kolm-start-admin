/* eslint-disable react/no-children-prop */
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { z } from "zod";

import { FormError } from "~/components/form/form-error";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Select, SelectItem } from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
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
          children={(field) => {
            return (
              <Select
                errorMessage={getFieldErrorMessage({ field })}
                label="Role"
                name={field.name}
                onSelectionChange={(key) => field.handleChange(key as string)}
                selectedKey={field.state.value}
              >
                <SelectItem id="admin">Admin</SelectItem>
                <SelectItem id="member">Member</SelectItem>
                <SelectItem id="owner">Owner</SelectItem>
              </Select>
            );
          }}
        />
        <Separator />
        <div className="flex items-center gap-2">
          <span className="font-medium">Team</span>
          <Badge>optional</Badge>
        </div>
        <Field
          name="teamId"
          children={(field) => {
            return (
              <Select
                errorMessage={getFieldErrorMessage({ field })}
                label="Add to team"
                name={field.name}
                onSelectionChange={(key) => field.handleChange(key as string)}
                selectedKey={field.state.value}
              >
                {teams?.map((team) => (
                  <SelectItem key={team.id} id={team.id}>
                    {team.name}
                  </SelectItem>
                ))}
              </Select>
            );
          }}
        />
        {error ? <FormError error={error} /> : null}
        <Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <div className="flex justify-end gap-3">
              <Button slot="close">Cancel</Button>
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
