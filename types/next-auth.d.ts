import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        id: number;
        name: string;
        lastName: string;
        fullName: string;
        email: string;
        cpf: string;
    }
}