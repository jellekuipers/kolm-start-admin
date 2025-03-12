/* eslint-disable react/no-children-prop */
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { z } from "zod";

import { FormError } from "~/components/form/form-error";
import { Button } from "~/components/ui/button";
import { Dialog } from "~/components/ui/dialog";
import { Label } from "~/components/ui/field";
import { Select } from "~/components/ui/select";
import { addMember } from "~/lib/member";
import { usersQueryOptions } from "~/lib/user";

interface AddMemberFormProps {
  onSuccess: () => void;
  organizationId: string;
}

const addMemberSchema = z.object({
  memberRole: z.string(),
  organizationId: z.string(),
  userId: z.string(),
});

export function AddMemberForm({
  onSuccess,
  organizationId,
}: AddMemberFormProps) {
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
      organizationId,
      userId: "",
    },
    onSubmit: async ({ value }) => {
      await addMemberMutation.mutateAsync(value);
    },
    validators: {
      onSubmit: addMemberSchema,
    },
  });

  const usersQuery = useQuery(usersQueryOptions());

  const users = usersQuery.data;

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
          name="userId"
          children={(field) => {
            return (
              <div className="space-y-1">
                <Label htmlFor="userId">User</Label>
                <Select.Root
                  defaultValue={field.state.value}
                  name={field.name}
                  onValueChange={field.handleChange}
                >
                  <Select.Trigger />
                  <Select.Content>
                    {users?.map((user) => (
                      <Select.Item key={user.id} value={user.id}>
                        {user.email}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              </div>
            );
          }}
        />
        <Field
          name="memberRole"
          children={(field) => {
            return (
              <div className="space-y-1">
                <Label htmlFor="memberRole">Member role</Label>
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
              </div>
            );
          }}
        />
        {error ? <FormError error={error} /> : null}
        <Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <div className="flex gap-3 justify-end">
              <Dialog.Close>
                <Button>Cancel</Button>
              </Dialog.Close>
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
