import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import type { User } from "better-auth";
import { useState } from "react";
import { z } from "zod";

import { FormError } from "~/components/form/form-error";
import { Button } from "~/components/ui/button";
import { Dialog } from "~/components/ui/dialog";
import { Modal, ModalHeading } from "~/components/ui/modal";
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
    <>
      <Button onPress={() => setOpen(true)}>Update profile</Button>
      <Modal isDismissable isOpen={open} onOpenChange={onOpenChangeHandler}>
        <Dialog>
          <ModalHeading slot="title">Update profile</ModalHeading>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              handleSubmit();
            }}
          >
            <div className="space-y-4">
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
                  <div className="flex justify-end gap-2">
                    <Button color="slate" slot="close" variant="light">
                      Cancel
                    </Button>
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
        </Dialog>
      </Modal>
    </>
  );
}
