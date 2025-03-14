/* eslint-disable react/no-children-prop */
import { useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { z } from "zod";

import { FormError } from "~/components/form/form-error";
import { Button } from "~/components/ui/button";
import { Dialog } from "~/components/ui/dialog";
import { Heading } from "~/components/ui/heading";
import { Modal } from "~/components/ui/modal";
import { Select, SelectItem } from "~/components/ui/select";
import { addMember } from "~/lib/member";
import { organizationsQueryOptions } from "~/lib/organization";

interface AddUserToOrganizationModalProps {
  userId: string;
}

const addMemberSchema = z.object({
  memberRole: z.string(),
  organizationId: z.string(),
  userId: z.string(),
});

export function AddUserToOrganizationModal({
  userId,
}: AddUserToOrganizationModalProps) {
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
      organizationId: "",
      userId,
    },
    onSubmit: async ({ value }) => {
      await addMemberMutation.mutateAsync(value);
    },
    validators: {
      onSubmit: addMemberSchema,
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
      <Button onPress={() => setOpen(true)}>
        <PlusIcon />
        Add to organization
      </Button>
      <Modal isDismissable isOpen={open} onOpenChange={onOpenChangeHandler}>
        <Dialog>
          <Heading slot="title">Add to organization</Heading>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              handleSubmit();
            }}
          >
            <div className="space-y-4">
              <Field
                name="organizationId"
                children={(field) => {
                  return (
                    <Select
                      label="Organization"
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
                      label="Member role"
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
                  <div className="flex gap-3 justify-end">
                    <Button slot="close">Cancel</Button>
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
