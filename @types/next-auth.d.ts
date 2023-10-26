import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    interface User {
        id: number;
        name: string;
        lastName: string;
        fullName: string;
        email: string;
        cpf: string;
    }

    interface Session {
        user: User;
    }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string | unknown;
  }
}
