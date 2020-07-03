import React from "react";
import { useSession } from "next-auth/client";
import CheckInForm from "../components/CheckInForm";
import { Flex, Box, Avatar, Button, Link } from "@chakra-ui/core";
import { chakra } from "@chakra-ui/system";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default () => {
  const [session, loading] = useSession();
  const { data, error } = useSWR("/api/check/in", fetcher);

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

        {session && data && (
          <div>
            {data.checkIns.map((checkIn) => (
              <chakra.div key={checkIn.id}>
                {checkIn.id}

                <Button>Check Out</Button>
              </chakra.div>
            ))}
          </div>
        )}
      </Box>
    </div>
  );
};
