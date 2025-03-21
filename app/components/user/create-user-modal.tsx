/* eslint-disable react/no-children-prop */
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { z } from "zod";

import { FormError } from "~/components/form/form-error";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Dialog } from "~/components/ui/dialog";
import { Modal, ModalHeading } from "~/components/ui/modal";
import { Select, SelectItem } from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import { TextField } from "~/components/ui/text-field";
import { getFieldErrorMessage } from "~/lib/error";
import { organizationsQueryOptions } from "~/lib/organization";
import { createUser } from "~/lib/user";

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  organizationId: z.string(),
  memberRole: z.string(),
});

export function CreateUserModal() {
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
      organizationId: "",
      memberRole: "member",
    },
    onSubmit: async ({ value }) => {
      await createUserMutation.mutateAsync(value);
    },
    validators: {
      onSubmit: createUserSchema,
    },
  });

  const onOpenChangeHandler = (open: boolean) => {
    setOpen(open);

    if (!open) {
      reset();
    }
  };

  const organizationsQuery = useQuery(organizationsQueryOptions());

  const organizations = organizationsQuery.data;

  return (
    <>
      <Button onPress={() => setOpen(true)}>Create user</Button>
      <Modal isDismissable isOpen={open} onOpenChange={onOpenChangeHandler}>
        <Dialog>
          <ModalHeading slot="title">Create user</ModalHeading>
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
              <Separator />
              <div className="flex items-center gap-2">
                <span className="text-lg font-medium">Organization</span>
                <Badge>optional</Badge>
              </div>
              <Field
                name="organizationId"
                children={(field) => {
                  return (
                    <Select
                      errorMessage={getFieldErrorMessage({ field })}
                      label="Add to organization"
                      name={field.name}
                      onSelectionChange={(key) =>
                        field.handleChange(key as string)
                      }
                      selectedKey={field.state.value}
                    >
                      {organizations?.map((organization) => (
                        <SelectItem key={organization.id} id={organization.id}>
                          {organization.name}
                        </SelectItem>
                      ))}
                    </Select>
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
                      onSelectionChange={(key) =>
                        field.handleChange(key as string)
                      }
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
                  <div className="flex justify-end gap-3">
                    <Button color="tertiary" slot="close">
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
