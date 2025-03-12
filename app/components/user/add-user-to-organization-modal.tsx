/* eslint-disable react/no-children-prop */
import { useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { z } from "zod";

import { FormError } from "~/components/form/form-error";
import { FormFieldInfo } from "~/components/form/form-field-info";
import { FormFieldLabel } from "~/components/form/form-field-label";
import { Button } from "~/components/ui/button";
import { Dialog } from "~/components/ui/dialog";
import { Flex } from "~/components/ui/flex";
import { Select } from "~/components/ui/select";
import { addMember } from "~/lib/member";
import { organizationsQueryOptions } from "~/lib/organization";

interface AddUserToOrganizationModalProps {
  userId: string;
}

const addMemberSchema = z.object({
  memberRole: z.string(),
  organizationId: z.string(),
  userId: z.string(),
});

export function AddUserToOrganizationModal({
  userId,
}: AddUserToOrganizationModalProps) {
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

  const addMemberMutation = useMutation({
    mutationFn: async ({
      memberRole,
      organizationId,
      userId,
    }: {
      organizationId: string;
      memberRole: string;
      userId: string;
    }) => await addMember({ data: { memberRole, organizationId, userId } }),
    onError: onMutationError,
    onSuccess: onMutationSuccess,
  });

  const { Field, handleSubmit, reset, Subscribe } = useForm({
    defaultValues: {
      memberRole: "member",
      organizationId: "",
      userId,
    },
    onSubmit: async ({ value }) => {
      await addMemberMutation.mutateAsync(value);
    },
    validators: {
      onSubmit: addMemberSchema,
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
        <Button>
          <PlusIcon /> Add organization
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Add organization</Dialog.Title>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            handleSubmit();
          }}
        >
          <Flex direction="column" gap="4">
            <Field
              name="organizationId"
              children={(field) => {
                return (
                  <Flex direction="column" gap="1">
                    <FormFieldLabel htmlFor="organizationId" text="Organization" />
                    <Select.Root
                      defaultValue={field.state.value}
                      name={field.name}
                      onValueChange={field.handleChange}
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
                    <FormFieldInfo field={field} />
                  </Flex>
                );
              }}
            />
            <Field
              name="memberRole"
              children={(field) => {
                return (
                  <Flex direction="column" gap="1">
                    <FormFieldLabel htmlFor="memberRole" text="Member role" />
                    <Select.Root
                      defaultValue={field.state.value}
                      name={field.name}
                      onValueChange={field.handleChange}
                    >
                      <Select.Trigger />
                      <Select.Content>
                        <Select.Item value="admin">Admin</Select.Item>
                        <Select.Item value="member">Member</Select.Item>
                        <Select.Item value="owner">Owner</Select.Item>
                      </Select.Content>
                    </Select.Root>
                    <FormFieldInfo field={field} />
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
      </Dialog.Content>
    </Dialog.Root>
  );
}
