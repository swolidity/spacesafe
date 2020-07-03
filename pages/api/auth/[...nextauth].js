import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import fetch from "isomorphic-unfetch";

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.VERCEL_URL;

const signin = async (profile, account, metadata) => {
  try {
    const res = await fetch(`${url}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...profile,
      }),
    });

    const data = await res.json();
  } catch (e) {
    console.log("ERROR", e.message);
  }

  return true;
};

const options = {
  site: url,

  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    signin,
  },
};

export default (req, res) => NextAuth(req, res, options);
