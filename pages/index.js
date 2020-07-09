import React from "react";
import { useSession } from "next-auth/client";
import CheckInForm from "../components/CheckInForm";
import { Flex, Box, Avatar, Button, Link, Text } from "@chakra-ui/core";
import useSWR from "swr";
import { format } from "date-fns";

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
      <Box
        p={6}
        background="#f8f8f8"
        height="100%"
        style={{ maxWidth: "800px", margin: "0 auto" }}
      >
        {!session && (
          <Box textAlign="center" mt={6}>
            <Button size="lg" colorScheme="blue">
              <a href="/api/auth/signin">Sign in</a>
            </Button>
          </Box>
        )}

        <Box mb={4}>{session && <CheckInForm />}</Box>

        {session && data && (
          <div>
            {data.checkIns.map((checkIn) => (
              <Flex key={checkIn.id} justify="space-between" align="center">
                <Box>
                  <Text>{checkIn.location.name}</Text>
                  <Box>
                    {format(new Date(checkIn.checkIn), "MM/dd/yyyy HH:mm:ss")}
                  </Box>
                </Box>

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
