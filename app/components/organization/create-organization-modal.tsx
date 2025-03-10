/* eslint-disable react/no-children-prop */
import { useState } from "react";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { Label } from "radix-ui";
import { z } from "zod";

import { FormError } from "~/components/form/form-error";
import { FormFieldInfo } from "~/components/form/form-field-info";
import { createOrganization } from "~/lib/organization";

const createOrganizationSchema = z.object({
  name: z.string(),
  slug: z.string(),
});

export function CreateOrganizationModal() {
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

  const createOrganizationMutation = useMutation({
    mutationFn: async ({ name, slug }: { name: string; slug: string }) =>
      await createOrganization({ data: { name, slug } }),
    onError: onMutationError,
    onSuccess: onMutationSuccess,
  });

  const { Field, handleSubmit, reset, Subscribe } = useForm({
    defaultValues: {
      name: "",
      slug: "",
    },
    onSubmit: async ({ value }) => {
      await createOrganizationMutation.mutateAsync(value);
    },
    validators: {
      onSubmit: createOrganizationSchema,
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
        <Button>Create organization</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Create organization</Dialog.Title>
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
            <Field
              name="slug"
              children={(field) => {
                return (
                  <Flex direction="column" gap="1">
                    <Label.Root asChild htmlFor="slug">
                      <Text as="label" size="2" weight="medium">
                        Slug
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
