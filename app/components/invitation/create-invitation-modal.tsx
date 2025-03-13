/* eslint-disable react/no-children-prop */
import { useState } from "react";
import { useForm, useStore } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { z } from "zod";

import { FormError } from "~/components/form/form-error";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Dialog } from "~/components/ui/dialog";
import { Label } from "~/components/ui/field";
import { Select, SelectItem } from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import { Text } from "~/components/ui/text";
import { TextField } from "~/components/ui/text-field";
import { getFieldErrorMessage } from "~/lib/error";
import { createInvitation } from "~/lib/invitation";
import { organizationsQueryOptions } from "~/lib/organization";
import { teamsQueryOptions } from "~/lib/team";

const createInvitationSchema = z.object({
  email: z.string().email(),
  organizationId: z.string(),
  role: z.string(),
  teamId: z.string(),
});

export function CreateInvitationModal() {
  const [error, setError] = useState<Error | undefined>(undefined);
  const [open, setOpen] = useState(false);
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
    setOpen(false);
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

  const { Field, handleSubmit, reset, store, Subscribe } = useForm({
    defaultValues: {
      email: "",
      organizationId: "",
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

  const onOpenChangeHandler = (open: boolean) => {
    setOpen(open);

    if (!open) {
      reset();
    }
  };

  const organizationsQuery = useQuery(organizationsQueryOptions());

  const organizations = organizationsQuery.data;

  const organizationId = useStore(
    store,
    (state) => state.values.organizationId,
  );

  const teamsQuery = useQuery(
    teamsQueryOptions({
      enabled: !!organizationId,
      organizationId,
    }),
  );

  const teams = teamsQuery.data;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChangeHandler}>
      <Dialog.Trigger>
        <Button>Create invitation</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Create invitation</Dialog.Title>
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
              name="organizationId"
              children={(field) => {
                return (
                  <div className="space-y-1">
                    <Label htmlFor="organizationId">Organization</Label>
                    <Select
                      name={field.name}
                      onSelectionChange={(key) =>
                        field.handleChange(key as string)
                      }
                      selectedKey={field.state.value}
                    >
                      {organizations?.map((organization) => (
                        <SelectItem key={organization.id} id={organization.id}>
                          {organization.name}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                );
              }}
            />
            <Field
              name="role"
              children={(field) => {
                return (
                  <div className="space-y-1">
                    <Label htmlFor="role">Role</Label>
                    <Select
                      name={field.name}
                      onSelectionChange={(key) =>
                        field.handleChange(key as string)
                      }
                      selectedKey={field.state.value}
                    >
                      <SelectItem id="admin">Admin</SelectItem>
                      <SelectItem id="member">Member</SelectItem>
                      <SelectItem id="owner">Owner</SelectItem>
                    </Select>
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
              children={(field) => {
                return (
                  <div className="space-y-1">
                    <Label htmlFor="teamId">Add to team</Label>
                    <Select
                      isDisabled={!teams?.length || teamsQuery.isPending}
                      name={field.name}
                      onSelectionChange={(key) =>
                        field.handleChange(key as string)
                      }
                      selectedKey={field.state.value}
                    >
                      {teams?.map((team) => (
                        <SelectItem key={team.id} id={team.id}>
                          {team.name}
                        </SelectItem>
                      ))}
                    </Select>
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
      </Dialog.Content>
    </Dialog.Root>
  );
}
