/* eslint-disable react/no-children-prop */
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { User } from "better-auth";
import { z } from "zod";

import { FormError } from "~/components/form/form-error";
import { Button } from "~/components/ui/button";
import { Dialog } from "~/components/ui/dialog";
import { Flex } from "~/components/ui/flex";
import { TextField } from "~/components/ui/text-field";
import { authClient, useSession } from "~/lib/auth-client";
import { getFieldErrorMessage } from "~/lib/error";

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
                  <TextField
                    defaultValue={field.state.value}
                    errorMessage={getFieldErrorMessage({ field })}
                    label="Name"
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(value) => field.handleChange(value)}
                  />
                );
              }}
            />
            {error ? <FormError error={error} /> : null}
            <Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Flex gap="3" justify="end">
                  <Dialog.Close>
                    <Button>Cancel</Button>
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
