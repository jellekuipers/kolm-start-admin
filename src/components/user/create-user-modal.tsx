import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { FormError } from "@/components/form/form-error";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Modal, ModalHeading } from "@/components/ui/modal";
import { TextField } from "@/components/ui/text-field";
import { toastQueue } from "@/components/ui/toast";
import { getFieldErrorMessage } from "@/lib/error";
import { listUsersQueryOptions } from "@/queries/user";
import { createUser } from "@/server/user";
import { logger } from "@/utils/logger";

const createUserSchema = z.object({
  email: z.email(),
  name: z.string(),
});

type CreateUserInput = z.infer<typeof createUserSchema>;

export function CreateUserModal() {
  const { t } = useTranslation();
  const [error, setError] = useState<Error | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationFn: (data: CreateUserInput) => createUser({ data }),
    onError: (error: unknown) => {
      logger({
        level: "error",
        message: "user_create_error",
        data: error,
      });

      if (error instanceof Error) {
        setError(error);
      } else {
        setError({
          name: t("message.user_create_error_title"),
          message: t("message.user_create_error_description"),
        });
      }
    },
    onSuccess: async () => {
      reset();

      await router.invalidate({ sync: true });
      await queryClient.refetchQueries(listUsersQueryOptions());

      setOpen(false);

      toastQueue.add({
        title: t("message.user_create_success_title"),
        description: t("message.user_create_success_description"),
        color: "success",
      });
    },
  });

  const { Field, handleSubmit, reset, Subscribe } = useForm({
    defaultValues: {
      email: "",
      name: "",
    },
    onSubmit: ({ value }) => createUserMutation.mutateAsync(value),
    validators: {
      onSubmit: createUserSchema,
    },
  });

  const onOpenChangeHandler = (open: boolean) => {
    setOpen(open);

    if (!open) {
      reset();
      setError(undefined);
    }
  };

  return (
    <>
      <Button color="indigo" onPress={() => setOpen(true)}>
        {t("user.create_user")}
      </Button>
      <Modal isDismissable isOpen={open} onOpenChange={onOpenChangeHandler}>
        <Dialog>
          <ModalHeading slot="title">{t("user.create_user")}</ModalHeading>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              handleSubmit();
            }}
          >
            <div className="space-y-4">
              <Field name="email">
                {(field) => (
                  <TextField
                    defaultValue={field.state.value}
                    errorMessage={getFieldErrorMessage({ field })}
                    label={t("common.email")}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(value) => field.handleChange(value)}
                  />
                )}
              </Field>
              <Field name="name">
                {(field) => (
                  <TextField
                    defaultValue={field.state.value}
                    errorMessage={getFieldErrorMessage({ field })}
                    label={t("common.name")}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(value) => field.handleChange(value)}
                  />
                )}
              </Field>
              {error ? <FormError error={error} /> : null}
              <Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <div className="flex justify-end gap-2">
                    <Button color="gray" slot="close" variant="light">
                      {t("common.cancel")}
                    </Button>
                    <Button
                      color="indigo"
                      isDisabled={!canSubmit}
                      isPending={isSubmitting}
                      type="submit"
                    >
                      {t("common.save")}
                    </Button>
                  </div>
                )}
              </Subscribe>
            </div>
          </form>
        </Dialog>
      </Modal>
    </>
  );
}
