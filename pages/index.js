import React from "react";
import { useSession } from "next-auth/client";
import CheckInForm from "../components/CheckInForm";
import { Flex, Box, Avatar, Button, Link } from "@chakra-ui/core";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default () => {
  const [session, loading] = useSession();
  const { data, error } = useSWR("/api/check/in", fetcher);

  const checkOut = async (checkInID) => {
    const res = await fetch("/api/check/out", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        checkInID,
      }),
    });
  };

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

      <Box
        p={6}
        background="#f8f8f8"
        height="100%"
        style={{ maxWidth: "800px", margin: "0 auto" }}
      >
        {!session && (
          <Box>
            <a href="/api/auth/signin">Sign in</a>
          </Box>
        )}

        <Box mb={4}>{session && <CheckInForm />}</Box>

        {session && data && (
          <div>
            {data.checkIns.map((checkIn) => (
              <Flex key={checkIn.id} justify="space-between">
                <Box>{checkIn.id}</Box>

                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    checkOut(checkIn.id);
                  }}
                >
                  Check Out
                </Button>
              </Flex>
            ))}
          </div>
        )}
      </Box>
    </div>
  );
};
