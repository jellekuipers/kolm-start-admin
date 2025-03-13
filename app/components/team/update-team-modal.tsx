/* eslint-disable react/no-children-prop */
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { z } from "zod";

import { FormError } from "~/components/form/form-error";
import { Button } from "~/components/ui/button";
import { Dialog } from "~/components/ui/dialog";
import { TextField } from "~/components/ui/text-field";
import { updateTeam } from "~/lib/team";
import { Team } from "~/types";

interface UpdateTeamModalProps {
  open: boolean;
  team: Team;
  setOpen: (open: boolean) => void;
}

const updateTeamSchema = z.object({
  name: z.string(),
});

export function UpdateTeamModal({ open, team, setOpen }: UpdateTeamModalProps) {
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

  const updateTeamMutation = useMutation({
    mutationFn: async ({ name, teamId }: { name: string; teamId: string }) =>
      await updateTeam({ data: { name, teamId } }),
    onError: onMutationError,
    onSuccess: onMutationSuccess,
  });

  const { Field, handleSubmit, reset, Subscribe } = useForm({
    defaultValues: {
      name: team.name,
    },
    onSubmit: async ({ value }) => {
      await updateTeamMutation.mutateAsync({
        ...value,
        teamId: team.id,
      });
    },
    validators: {
      onSubmit: updateTeamSchema,
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
        <Dialog.Title>Update team</Dialog.Title>
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
      </Dialog.Content>
    </Dialog.Root>
  );
}
