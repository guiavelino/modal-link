import NextAuth from 'next-auth';
import bcrypt from 'bcrypt';
import Credentials from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import jwt from "jsonwebtoken"

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password",  type: "password" }
      },
      authorize: async (credentials) => {
        if (!credentials) return Promise.resolve(null);

        const user = await prisma.user.findUnique({ where: { email: credentials.email } });

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return Promise.resolve(user);
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
    jwt: {
        maxAge: 60 * 60 * 24 * 30,
        async encode({ secret, token }) {
            return jwt.sign(token, secret)
        },
        async decode({ secret, token }) {
            return jwt.verify(token, secret)
        },
    },    
});
