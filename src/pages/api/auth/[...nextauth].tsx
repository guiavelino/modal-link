import NextAuth from 'next-auth';
import bcrypt from 'bcrypt';
import Credentials from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import jwt from "jsonwebtoken"
import jwtDecode from 'jwt-decode';
import { JWT } from 'next-auth/jwt';

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
    secret: process.env.NEXTAUTH_SECRET,
    encode: async ({ secret, token }) => {
      if (token) {
        const user = await prisma.user.findUnique({ where: { email: token.email ?? '' } });
        
        token.accessToken = jwt.sign({
          id: user?.id,
          name: user?.name, 
          lastName: user?.lastName,
          fullName: user?.fullName,
          email: user?.email,
          cpf: user?.cpf
        }, secret);
      }

      return jwt.sign({ ...token }, secret, { algorithm: 'HS256' });
    },
    decode: ({ secret, token }) => {
      return jwt.verify(token as string, secret, { algorithms: ['HS256'], maxAge: 24 * 60 * 60 }) as JWT;
    }
  },
  callbacks: {
    session({ session, token }) {
      session.user = jwtDecode(token.accessToken as string);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
    strategy: 'jwt',
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        secure: true,
        path: '/',
        sameSite: 'lax',
      }
    }
  }
});
