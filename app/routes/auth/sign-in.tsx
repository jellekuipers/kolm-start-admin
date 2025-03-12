/* eslint-disable react/no-children-prop */
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { z } from "zod";

import { FormError } from "~/components/form/form-error";
import { Logo } from "~/components/logo";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Label } from "~/components/ui/field";
import { Flex } from "~/components/ui/flex";
import { Heading } from "~/components/ui/heading";
import { Link } from "~/components/ui/link";
import { TextField } from "~/components/ui/text-field";
import { signIn } from "~/lib/auth-client";
import { getFieldErrorMessage } from "~/lib/error";

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
      <Card>
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
                    <TextField
                      defaultValue={field.state.value}
                      errorMessage={getFieldErrorMessage({ field })}
                      label="Email"
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(value) => field.handleChange(value)}
                      type="email"
                    />
                  );
                }}
              />
              <Field
                name="password"
                children={(field) => {
                  return (
                    <Flex direction="column" gap="1">
                      <Flex align="baseline" justify="between" mb="1">
                        <Label htmlFor="password">Password</Label>
                        <Link to="/">Forgot password?</Link>
                      </Flex>
                      <TextField
                        defaultValue={field.state.value}
                        errorMessage={getFieldErrorMessage({ field })}
                        label="Password"
                        name={field.name}
                        onBlur={field.handleBlur}
                        onChange={(value) => field.handleChange(value)}
                        type="password"
                      />
                    </Flex>
                  );
                }}
              />
              {error ? <FormError error={error} /> : null}
              <Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Flex justify="end">
                    <Button isDisabled={!canSubmit} isPending={isSubmitting}>
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
