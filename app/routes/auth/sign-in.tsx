/* eslint-disable react/no-children-prop */
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { z } from "zod";

import { FormError } from "~/components/form/form-error";
import { FormFieldInfo } from "~/components/form/form-field-info";
import { FormFieldLabel } from "~/components/form/form-field-label";
import { Logo } from "~/components/logo";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Flex } from "~/components/ui/flex";
import { Heading } from "~/components/ui/heading";
import { Link } from "~/components/ui/link";
import { TextField } from "~/components/ui/text-field";
import { signIn } from "~/lib/auth-client";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const Route = createFileRoute("/auth/sign-in")({
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
    <Flex
      align="center"
      direction="column"
      gap="6"
      justify="center"
      p="4"
      style={{ backgroundColor: "var(--gray-1)", minHeight: "inherit" }}
    >
      <Logo size={48} />
      <Card size="4" style={{ width: 400 }}>
        <Flex direction="column" gap="5">
          <Heading as="h3" size="6">
            Sign in
          </Heading>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              handleSubmit();
            }}
          >
            <Flex direction="column" gap="5">
              <Field
                name="email"
                children={(field) => {
                  return (
                    <Flex direction="column" gap="1">
                      <FormFieldLabel htmlFor="email" text="Email" />
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
                name="password"
                children={(field) => {
                  return (
                    <Flex direction="column" gap="1">
                      <Flex align="baseline" justify="between" mb="1">
                        <FormFieldLabel htmlFor="password" text="password" />
                        <Link to="/">Forgot password?</Link>
                      </Flex>
                      <TextField.Root
                        defaultValue={field.state.value}
                        onBlur={field.handleBlur}
                        name={field.name}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        type="password"
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
                  <Flex justify="end">
                    <Button disabled={!canSubmit} loading={isSubmitting}>
                      Sign in
                    </Button>
                  </Flex>
                )}
              />
            </Flex>
          </form>
        </Flex>
      </Card>
    </Flex>
  );
}
