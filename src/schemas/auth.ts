import { Type } from "@sinclair/typebox";

// Schema for request GET authenticated
// Note : need to be reused inside all other authenticated request
export const isAuthenticatedCheckerSchema = {
  headers: Type.Object({
    authorization: Type.String(),
  }),
};

// Schema for request POST /login
export const loginSchema = {
  body: Type.Object({
    email: Type.String({ format: "email" }),
    password: Type.String(),
  }),
};
