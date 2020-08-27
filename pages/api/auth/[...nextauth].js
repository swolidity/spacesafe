import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import fetch from "isomorphic-unfetch";
import { PrismaClient } from "@prisma/client";

const site = process.env.NEXT_PUBLIC_SITE;

const prisma = new PrismaClient();

const signIn = async (user, account, profile) => {
  let findOrCreateUser;
  try {
    findOrCreateUser = await prisma.user.upsert({
      create: {
        name: user.name,
        email: user.email,
        image: user.image,
      },
      update: {},
      where: {
        email: user.email,
      },
    });
  } catch (e) {
    // user already exists so just return true to log them in
    console.log(e.message);
    findOrCreateUser = true;
  }

  return findOrCreateUser;
};

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    signIn,
  },
};

export default (req, res) => NextAuth(req, res, options);
