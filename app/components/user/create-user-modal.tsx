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
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { Label } from "radix-ui";
import { z } from "zod";

import { FormError } from "~/components/form/form-error";
import { FormFieldInfo } from "~/components/form/form-field-info";
import { organizationsQueryOptions } from "~/lib/organization";
import { createUser } from "~/lib/user";

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  organizationId: z.string(),
  memberRole: z.string(),
});

export function CreateUserModal() {
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

  const createUserMutation = useMutation({
    mutationFn: async ({
      email,
      name,
      organizationId,
      memberRole,
    }: {
      email: string;
      name: string;
      organizationId: string;
      memberRole: string;
    }) =>
      await createUser({
        data: {
          email,
          name,
          organizationId,
          memberRole,
        },
      }),
    onError: onMutationError,
    onSuccess: onMutationSuccess,
  });

  const { Field, handleSubmit, reset, Subscribe } = useForm({
    defaultValues: {
      email: "",
      name: "",
      organizationId: "",
      memberRole: "member",
    },
    onSubmit: async ({ value }) => {
      await createUserMutation.mutateAsync(value);
    },
    validators: {
      onSubmit: createUserSchema,
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

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChangeHandler}>
      <Dialog.Trigger>
        <Button>Create user</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Create user</Dialog.Title>
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
              name="name"
              children={(field) => {
                return (
                  <Flex direction="column" gap="1">
                    <Label.Root asChild htmlFor="name">
                      <Text as="label" size="2" weight="medium">
                        Name
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
            <Separator size="4" />
            <Flex align="center" gap="2">
              <Text weight="medium">Organization</Text>
              <Badge>optional</Badge>
            </Flex>
            <Field
              name="organizationId"
              children={({ handleChange, name, state }) => {
                return (
                  <Flex direction="column" gap="1">
                    <Label.Root asChild htmlFor="organizationId">
                      <Text as="label" size="2" weight="medium">
                        Add to organization
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
              name="memberRole"
              children={({ handleChange, name, state }) => {
                return (
                  <Flex direction="column" gap="1">
                    <Label.Root asChild htmlFor="memberRole">
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
