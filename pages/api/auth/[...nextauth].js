import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import fetch from "isomorphic-unfetch";

const signin = async (profile, account, metadata) => {
  try {
    const res = await fetch("http://localhost:3000/api/users", {
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
  site: process.env.SITE || "http://localhost:3000",

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

  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,
};

export default (req, res) => NextAuth(req, res, options);
