/* eslint-disable react/no-children-prop */
import { useState } from "react";
import {
  Badge,
  Button,
  Dialog,
  Flex,
  Select,
  Separator,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useForm, useStore } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { Label } from "radix-ui";
import { z } from "zod";

import { FormError } from "~/components/form/form-error";
import { FormFieldInfo } from "~/components/form/form-field-info";
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
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                    />
                    <FormFieldInfo field={field} />
                  </Flex>
                );
              }}
            />
            <Field
              name="organizationId"
              children={({ handleChange, name, state }) => {
                return (
                  <Flex direction="column" gap="1">
                    <Label.Root asChild htmlFor="organizationId">
                      <Text as="label" size="2" weight="medium">
                        Organization
                      </Text>
                    </Label.Root>
                    <Select.Root
                      defaultValue={state.value}
                      name={name}
                      onValueChange={handleChange}
                    >
                      <Select.Trigger />
                      <Select.Content>
                        {organizations?.map((organization) => (
                          <Select.Item
                            key={organization.id}
                            value={organization.id}
                          >
                            {organization.name}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Root>
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
                      disabled={!teams?.length || teamsQuery.isPending}
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
      </Dialog.Content>
    </Dialog.Root>
  );
}
