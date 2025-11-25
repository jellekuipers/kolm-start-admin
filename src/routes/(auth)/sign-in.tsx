import { useForm } from "@tanstack/react-form";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { FormError } from "@/components/form/form-error";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/field";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { TextField } from "@/components/ui/text-field";
import { toast } from "@/components/ui/toast";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { signIn } from "@/lib/auth-client";
import { getFieldErrorMessage } from "@/lib/error";
import { logger } from "@/utils/logger";

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
    onSubmit: ({ value }) =>
      signIn.email({
        email: value.email,
        password: value.password,
        fetchOptions: {
          onError({ error }) {
            logger({
              level: "error",
              message: "sign_in_error",
              data: error,
            });

            if (error instanceof Error) {
              setError(error);
            } else {
              setError({
                name: t("message.sign_in_error_title"),
                message: t("message.sign_in_error_description"),
              });
            }
          },
          onSuccess: () => {
            router.invalidate();

            toast.success({
              title: t("message.sign_in_success_title"),
              description: t("message.sign_in_success_description"),
            });
          },
        },
      }),
    validators: {
      onSubmit: signInSchema,
    },
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-muted p-4">
      <Logo size={40} />
      <Card className="w-96">
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
                      <TooltipTrigger delay={300}>
                        <Link className="font-medium" disabled to="/">
                          {t("auth.forgot_password")}
                        </Link>
                        <Tooltip>
                          {t("tooltip.forgot_password_disabled")}
                        </Tooltip>
                      </TooltipTrigger>
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
