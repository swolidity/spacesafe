import React from "react";
import { useSession } from "next-auth/client";
import CheckInForm from "../components/CheckInForm";
import { Flex, Box, Avatar, Link } from "@chakra-ui/core";

export default ({ data }) => {
  const [session, loading] = useSession();

  return (
    <div>
      <Flex justify="space-between" align="center" px={6} py={3}>
        SafeSpace
        {!session && (
          <Box>
            <a href="/api/auth/signin">Sign in</a>
          </Box>
        )}
        {session && (
          <Box>
            <Flex align="center">
              <Avatar src={session.user.image} alt={session.user.name} mr={3} />

              <Box>
                <a href="/api/auth/signout">Sign out</a>
              </Box>
            </Flex>
          </Box>
        )}
      </Flex>

      <Box p={6} background="#f8f8f8" height="100%">
        {!session && (
          <Box>
            <a href="/api/auth/signin">Sign in</a>
          </Box>
        )}
        {session && <CheckInForm />}
      </Box>
    </div>
  );
};
