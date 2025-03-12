/* eslint-disable react/no-children-prop */
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { z } from "zod";

import { FormError } from "~/components/form/form-error";
import { FormFieldInfo } from "~/components/form/form-field-info";
import { FormFieldLabel } from "~/components/form/form-field-label";
import { Button } from "~/components/ui/button";
import { Dialog } from "~/components/ui/dialog";
import { Flex } from "~/components/ui/flex";
import { Select } from "~/components/ui/select";
import { TextField } from "~/components/ui/text-field";
import { createUser } from "~/lib/user";

interface CreateMemberFormProps {
  onSuccess: () => void;
  organizationId: string;
}

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  organizationId: z.string(),
  memberRole: z.string(),
});

export function CreateMemberForm({
  onSuccess,
  organizationId,
}: CreateMemberFormProps) {
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
      organizationId,
      memberRole: "member",
    },
    onSubmit: async ({ value }) => {
      await createUserMutation.mutateAsync(value);
    },
    validators: {
      onSubmit: createUserSchema,
    },
  });

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
                <FormFieldLabel htmlFor="email" text="Email" />
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
          name="name"
          children={(field) => {
            return (
              <Flex direction="column" gap="1">
                <FormFieldLabel htmlFor="name" text="Name" />
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
          name="memberRole"
          children={({ handleChange, name, state }) => {
            return (
              <Flex direction="column" gap="1">
                <FormFieldLabel htmlFor="memberRole" text="Role" />
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
                <Button>
                  Cancel
                </Button>
              </Dialog.Close>
              <Button isDisabled={!canSubmit} isPending={isSubmitting}>
                Save
              </Button>
            </Flex>
          )}
        />
      </Flex>
    </form>
  );
}
