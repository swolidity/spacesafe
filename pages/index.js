import React from "react";
import { useSession } from "next-auth/client";
import CheckInForm from "../components/CheckInForm";

export default () => {
  const [session, loading] = useSession();

  return (
    <div>
      {!session && (
        <>
          Not signed in <br />
          <a href="/api/auth/signin">Sign in</a>
        </>
      )}
      {session && (
        <>
          <img
            src={session.user.image}
            alt={session.user.name}
            height="80px"
            style={{ borderRadius: "50%" }}
          />
          Signed in as {session.user.email} <br />
          <a href="/api/auth/signout">Sign out</a>
          <CheckInForm />
        </>
      )}
    </div>
  );
};
