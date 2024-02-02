import { Type } from "@sinclair/typebox";

// Schema for request GET /:user_id
export const getUserByIdSchema = {
  params: Type.Object({
    user_id: Type.Number(),
  }),
};

// Schema for request POST /createUser
// Note: password at least 1 uppercase, 1 lowercase, 1 number and 1 special character
export const createUserSchema = {
  body: Type.Object({
    email: Type.String({ format: "email" }),
    password: Type.String({
      pattern: "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\\W)(?!.* ).*$",
      minLength: 8,
      maxLength: 40,
    }),
    firstName: Type.String(),
    lastName: Type.String(),
  }),
};

// Schema for request PUT /:user_id
export const updateUserByIdSchema = {
  params: Type.Object({
    user_id: Type.Number(),
  }),
  body: Type.Object({
    firstName: Type.String(),
    lastName: Type.String(),
  }),
};

// Schema for controller hasAccessToUser
export const hasAccessToUserCheckerSchema = {
  params: Type.Object({
    user_id: Type.Number(),
  }),
};
