/* eslint-disable react/no-children-prop */
import { useState } from "react";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { User } from "better-auth";
import { Label } from "radix-ui";
import { z } from "zod";

import { FormError } from "~/components/form/form-error";
import { FormFieldInfo } from "~/components/form/form-field-info";
import { authClient, useSession } from "~/lib/auth-client";

interface UpdateProfileModalProps {
  user: User;
}

const updateProfileSchema = z.object({
  name: z.string(),
});

export function UpdateProfileModal({ user }: UpdateProfileModalProps) {
  const [error, setError] = useState<Error | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const session = useSession();

  const onMutationError = async (error: unknown) => {
    console.error(error);

    if (error instanceof Error) {
      setError(error);
    }
  };

  const onMutationSuccess = async () => {
    await router.invalidate();

    session.refetch();

    reset();
    setOpen(false);
  };

  const updateProfileMutation = useMutation({
    mutationFn: async ({ name }: { name: string }) =>
      await authClient.updateUser({
        name,
      }),
    onError: onMutationError,
    onSuccess: onMutationSuccess,
  });

  const { Field, handleSubmit, reset, Subscribe } = useForm({
    defaultValues: {
      name: user.name,
    },
    onSubmit: async ({ value }) => {
      await updateProfileMutation.mutateAsync(value);
    },
    validators: {
      onSubmit: updateProfileSchema,
    },
  });

  const onOpenChangeHandler = (open: boolean) => {
    setOpen(open);

    if (!open) {
      reset();
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChangeHandler}>
      <Dialog.Trigger>
        <Button>Update profile</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Update profile</Dialog.Title>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            handleSubmit();
          }}
        >
          <Flex direction="column" gap="4">
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
