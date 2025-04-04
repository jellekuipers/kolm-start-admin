/* eslint-disable react/no-children-prop */
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { z } from "zod";

import { FormError } from "~/components/form/form-error";
import { Button } from "~/components/ui/button";
import { Select, SelectItem } from "~/components/ui/select";
import { TextField } from "~/components/ui/text-field";
import { getFieldErrorMessage } from "~/lib/error";
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
      <div className="space-y-4">
        <Field
          name="email"
          children={(field) => {
            return (
              <TextField
                defaultValue={field.state.value}
                errorMessage={getFieldErrorMessage({ field })}
                label="Email"
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(value) => field.handleChange(value)}
              />
            );
          }}
        />
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
          name="memberRole"
          children={(field) => {
            return (
              <Select
                errorMessage={getFieldErrorMessage({ field })}
                label="Role"
                name={field.name}
                onSelectionChange={(key) => field.handleChange(key as string)}
                selectedKey={field.state.value}
              >
                <SelectItem id="admin">Admin</SelectItem>
                <SelectItem id="member">Member</SelectItem>
                <SelectItem id="owner">Owner</SelectItem>
              </Select>
            );
          }}
        />
        {error ? <FormError error={error} /> : null}
        <Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <div className="flex justify-end gap-2">
              <Button color="slate" slot="close" variant="light">Cancel</Button>
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
  );
}
