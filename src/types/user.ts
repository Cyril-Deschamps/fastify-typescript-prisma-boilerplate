import { User, Prisma } from "@prisma/client";

export interface UserSended extends Omit<User, "password"> {
  xsrfToken: string;
}

export const FIELDS_PUBLIC_USER: Prisma.UserSelect = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
};
