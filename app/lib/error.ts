import { AnyFieldApi } from "@tanstack/react-form";

interface GetFieldErrorMessagePayload {
  field: AnyFieldApi;
}

export const getFieldErrorMessage = ({ field }: GetFieldErrorMessagePayload) =>
  field.state.meta.isTouched && field.state.meta.errors.length
    ? field.state.meta.errors.map(({ message }) => message).join(", ")
    : undefined;
