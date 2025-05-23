import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { z } from "zod";

import { FormError } from "~/components/form/form-error";
import { Button } from "~/components/ui/button";
import { Dialog } from "~/components/ui/dialog";
import { Modal, ModalHeading } from "~/components/ui/modal";
import { TextField } from "~/components/ui/text-field";
import { getFieldErrorMessage } from "~/lib/error";
import { updateOrganization } from "~/lib/organization";
import type { AuthOrganization, ORMOrganization } from "~/types";

interface UpdateOrganizationModalProps {
  open: boolean;
  organization: AuthOrganization | ORMOrganization;
  setOpen: (open: boolean) => void;
}

const updateOrganizationSchema = z.object({
  name: z.string(),
  slug: z.string(),
});

export function UpdateOrganizationModal({
  open,
  organization,
  setOpen,
}: UpdateOrganizationModalProps) {
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
    setOpen(false);
  };

  const updateOrganizationMutation = useMutation({
    mutationFn: async ({
      name,
      organizationId,
      slug,
    }: {
      name: string;
      organizationId: string;
      slug: string;
    }) => await updateOrganization({ data: { name, organizationId, slug } }),
    onError: onMutationError,
    onSuccess: onMutationSuccess,
  });

  const { Field, handleSubmit, reset, Subscribe } = useForm({
    defaultValues: {
      name: organization.name,
      slug: organization.slug ?? "",
    },
    onSubmit: async ({ value }) => {
      await updateOrganizationMutation.mutateAsync({
        ...value,
        organizationId: organization.id,
      });
    },
    validators: {
      onSubmit: updateOrganizationSchema,
    },
  });

  const onOpenChangeHandler = (open: boolean) => {
    setOpen(open);

    if (!open) {
      reset();
    }
  };

  return (
    <Modal isDismissable isOpen={open} onOpenChange={onOpenChangeHandler}>
      <Dialog>
        <ModalHeading slot="title">Update organization</ModalHeading>
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
            <Field
              name="slug"
              children={(field) => {
                return (
                  <TextField
                    defaultValue={field.state.value}
                    errorMessage={getFieldErrorMessage({ field })}
                    label="Slug"
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
  );
}
