import { useForm } from "@tanstack/react-form";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";

import { FormError } from "~/components/form/form-error";
import { Logo } from "~/components/logo";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Label } from "~/components/ui/field";
import { Heading } from "~/components/ui/heading";
import { Link } from "~/components/ui/link";
import { TextField } from "~/components/ui/text-field";
import { signIn } from "~/lib/auth-client";
import { getFieldErrorMessage } from "~/lib/error";

const signInSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const Route = createFileRoute("/(auth)/sign-in")({
  component: RouteComponent,
});

function RouteComponent() {
  const [error, setError] = useState<Error | undefined>(undefined);
  const router = useRouter();

  const { Field, handleSubmit, Subscribe } = useForm({
    defaultValues: {
      email: "admin@kolm.start",
      password: "password1234",
    },
    onSubmit: async ({ value }) => {
      await signIn.email({
        email: value.email,
        password: value.password,
        fetchOptions: {
          onError({ error }) {
            console.error(error);

            setError(error);
          },
          onSuccess: () => {
            router.invalidate();
          },
        },
      });
    },
    validators: {
      onSubmit: signInSchema,
    },
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-50 p-4">
      <Logo size={40} />
      <Card className="w-96 p-4">
        <div className="space-y-4">
          <Heading level={2}>Sign in</Heading>
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
                    label="Email"
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(value) => field.handleChange(value)}
                    type="email"
                  />
                )}
              </Field>
              <Field name="password">
                {(field) => (
                  <div className="space-y-1">
                    <div className="mb-1 flex items-baseline justify-between">
                      <Label>Password</Label>
                      <Link className="font-medium" to="/">
                        Forgot password?
                      </Link>
                    </div>
                    <TextField
                      defaultValue={field.state.value}
                      errorMessage={getFieldErrorMessage({ field })}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(value) => field.handleChange(value)}
                      type="password"
                    />
                  </div>
                )}
              </Field>
              {error ? <FormError error={error} /> : null}
              <Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <div className="flex justify-end">
                    <Button
                      isDisabled={!canSubmit}
                      isPending={isSubmitting}
                      type="submit"
                    >
                      Sign in
                    </Button>
                  </div>
                )}
              </Subscribe>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
