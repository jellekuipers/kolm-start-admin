import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import type { User } from "better-auth";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { FormError } from "@/components/form/form-error";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Modal, ModalHeading } from "@/components/ui/modal";
import { TextField } from "@/components/ui/text-field";
import { toast } from "@/components/ui/toast";
import { authClient, useSession } from "@/lib/auth-client";
import { getFieldErrorMessage } from "@/lib/error";
import { logger } from "@/utils/logger";

interface UpdateProfileModalProps {
  user: User;
}

const updateProfileSchema = z.object({
  name: z.string(),
});

type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

export function UpdateProfileModal({ user }: UpdateProfileModalProps) {
  const { t } = useTranslation();
  const [error, setError] = useState<Error | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const session = useSession();

  const updateProfileMutation = useMutation({
    mutationFn: (data: UpdateProfileInput) => authClient.updateUser(data),
    onError: (error: unknown) => {
      logger({
        level: "error",
        message: "profile_update_error",
        data: error,
      });

      if (error instanceof Error) {
        setError(error);
      } else {
        setError({
          name: t("message.profile_update_error_title"),
          message: t("message.profile_update_error_description"),
        });
      }
    },
    onSuccess: async () => {
      reset();

      await router.invalidate({ sync: true });

      session.refetch();

      setOpen(false);

      toast.success({
        title: t("message.profile_update_success_title"),
        description: t("message.profile_update_success_description"),
      });
    },
  });

  const { Field, handleSubmit, reset, Subscribe } = useForm({
    defaultValues: {
      name: user.name,
    },
    onSubmit: ({ value }) => updateProfileMutation.mutateAsync(value),
    validators: {
      onSubmit: updateProfileSchema,
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
      <Button onPress={() => setOpen(true)}>{t("user.update_profile")}</Button>
      <Modal isDismissable isOpen={open} onOpenChange={onOpenChangeHandler}>
        <Dialog>
          <ModalHeading slot="title">{t("user.update_profile")}</ModalHeading>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              handleSubmit();
            }}
          >
            <div className="space-y-4">
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
                    <Button color="secondary" slot="close" variant="light">
                      {t("common.cancel")}
                    </Button>
                    <Button
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
