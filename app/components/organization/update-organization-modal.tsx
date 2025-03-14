/* eslint-disable react/no-children-prop */
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { z } from "zod";

import { FormError } from "~/components/form/form-error";
import { FormFieldLabel } from "~/components/form/form-field-label";
import { Button } from "~/components/ui/button";
import { Dialog } from "~/components/ui/dialog";
import { Flex } from "~/components/ui/flex";
import { TextField } from "~/components/ui/text-field";
import { updateOrganization } from "~/lib/organization";
import { AuthOrganization, ORMOrganization } from "~/types";

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
    <Dialog.Root open={open} onOpenChange={onOpenChangeHandler}>
      <Dialog.Content>
        <Dialog.Title>Update organization</Dialog.Title>
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
              children={({ handleBlur, handleChange, name, state }) => {
                return (
                  <Flex direction="column" gap="1">
                    <FormFieldLabel htmlFor="name" text="Name" />
                    <TextField.Root
                      defaultValue={state.value}
                      onBlur={handleBlur}
                      name={name}
                      onChange={(event) => handleChange(event.target.value)}
                    />
                  </Flex>
                );
              }}
            />
            <Field
              name="slug"
              children={({ handleBlur, handleChange, name, state }) => {
                return (
                  <Flex direction="column" gap="1">
                    <FormFieldLabel htmlFor="slug" text="Slug" />
                    <TextField.Root
                      defaultValue={state.value}
                      onBlur={handleBlur}
                      name={name}
                      onChange={(event) => handleChange(event.target.value)}
                    />
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
