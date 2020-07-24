import React from "react";
import { useSession } from "next-auth/client";
import CheckInTabs from "../components/CheckInTabs";
import { Flex, Box, Avatar, Button, Link, Text } from "@chakra-ui/core";
import useSWR, { mutate } from "swr";
import { format } from "date-fns";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default () => {
  const [session, loading] = useSession();
  const { data, error } = useSWR("/api/check/in", fetcher);

  const checkOut = async (checkInID, index) => {
    mutate(
      "/api/check/in",
      {
        checkIns: [
          ...data.checkIns.slice(0, index),
          ...data.checkIns.slice(index + 1),
        ],
      },
      false
    );

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

  console.log({ data });

  return (
    <div>
      <Box p={6} style={{ maxWidth: "800px", margin: "0 auto" }}>
        {!session && (
          <Box textAlign="center" mt={6}>
            <Button size="lg" colorScheme="blue">
              <a href="/api/auth/signin">Sign in</a>
            </Button>
          </Box>
        )}

        <Box mb={4}>{session && <CheckInTabs />}</Box>

        {session && data && (
          <div>
            {data.checkIns.map((checkIn, index) => (
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
                    checkOut(checkIn.id, index);
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
