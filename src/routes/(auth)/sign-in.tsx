import { useForm } from "@tanstack/react-form";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
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
  const { t } = useTranslation();
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
    <div
      className={twMerge(
        "flex min-h-screen flex-col items-center justify-center gap-6 p-4 bg-gray-50",
        "dark:bg-gray-950",
      )}
    >
      <Logo size={40} />
      <Card className="w-96 p-4">
        <div className="space-y-4">
          <Heading level={2}>{t("auth.sign_in")}</Heading>
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
                    label={t("common.email")}
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
                      <Label>{t("common.password")}</Label>
                      <Link className="font-medium" to="/">
                        {t("auth.forgot_password")}
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
                      color="indigo"
                      isDisabled={!canSubmit}
                      isPending={isSubmitting}
                      type="submit"
                    >
                      {t("auth.sign_in")}
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
