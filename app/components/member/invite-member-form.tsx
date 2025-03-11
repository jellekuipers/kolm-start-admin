/* eslint-disable react/no-children-prop */
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { Label } from "radix-ui";
import { z } from "zod";

import { FormError } from "~/components/form/form-error";
import { FormFieldInfo } from "~/components/form/form-field-info";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Dialog } from "~/components/ui/dialog";
import { Flex } from "~/components/ui/flex";
import { Select } from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import { Text } from "~/components/ui/text";
import { TextField } from "~/components/ui/text-field";
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
      <Flex direction="column" gap="4">
        <Field
          name="email"
          children={(field) => {
            return (
              <Flex direction="column" gap="1">
                <Label.Root asChild htmlFor="email">
                  <Text as="label" size="2" weight="medium">
                    Email
                  </Text>
                </Label.Root>
                <TextField.Root
                  defaultValue={field.state.value}
                  onBlur={field.handleBlur}
                  name={field.name}
                  onChange={(event) => field.handleChange(event.target.value)}
                />
                <FormFieldInfo field={field} />
              </Flex>
            );
          }}
        />
        <Field
          name="role"
          children={({ handleChange, name, state }) => {
            return (
              <Flex direction="column" gap="1">
                <Label.Root asChild htmlFor="role">
                  <Text as="label" size="2" weight="medium">
                    Role
                  </Text>
                </Label.Root>
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
              </Flex>
            );
          }}
        />
        <Separator size="4" />
        <Flex align="center" gap="2">
          <Text weight="medium">Team</Text>
          <Badge>optional</Badge>
        </Flex>
        <Field
          name="teamId"
          children={({ handleChange, name, state }) => {
            return (
              <Flex direction="column" gap="1">
                <Label.Root asChild htmlFor="teamId">
                  <Text as="label" size="2" weight="medium">
                    Add to team
                  </Text>
                </Label.Root>
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
              </Flex>
            );
          }}
        />
        {error ? <FormError error={error} /> : null}
        <Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Flex gap="3" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </Dialog.Close>
              <Button disabled={!canSubmit} loading={isSubmitting}>
                Save
              </Button>
            </Flex>
          )}
        />
      </Flex>
    </form>
  );
}
