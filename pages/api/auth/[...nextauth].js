import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import fetch from "isomorphic-unfetch";

const site = process.env.NEXT_PUBLIC_SITE;

const signIn = async (profile, account, metadata) => {
  try {
    const res = await fetch(`${site}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...profile,
      }),
    });

    const data = await res.json();
    console.log({ data });
  } catch (e) {
    console.log("ERROR", e.message);
  }

  return true;
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
