import React from "react";
import { useSession } from "next-auth/client";
import CheckInTabs from "../components/CheckInTabs";
import {
  Flex,
  Box,
  Avatar,
  Button,
  Link,
  Text,
  Stack,
  Heading,
  useToast,
  List,
  ListItem,
} from "@chakra-ui/core";
import useSWR, { mutate } from "swr";
import { format } from "date-fns";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default () => {
  const [session, loading] = useSession();
  const { data, error } = useSWR("/api/check/in", fetcher);
  const toast = useToast();

  const checkOut = async (checkInID, index) => {
    toast({
      title: "Successfully checked out.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });

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

  return (
    <div>
      <Box p={6} style={{ maxWidth: "800px", margin: "0 auto" }}>
        {!session && (
          <Box backgroundColor="white" borderRadius="sm" p={3}>
            <Heading>Welcome.</Heading>

            <Text mt={6} mb={6}>
              UMSpaceSafe is a tool to document research space use for the
              purpose of managing and mitigating hazards, including potential
              COVID-19 exposure.  All UMS personnel and students conducting
              institutionally associated research are required to use this tool
              when accessing and departing research associated spaces on and off
              campus, including campus labs, research common areas, field sites,
              farms, and non-UMS research centers.
            </Text>

            <Box p={6} mb={6}>
              <List spacing={2} mb={2} styleType="disc">
                <ListItem>
                  UMSpaceSafe does not passively track your activities and is
                  not intended for documenting space use outside of
                  institutionally authorized research activities.
                </ListItem>

                <ListItem>
                  UMSpaceSafe use data is stored in a secure database and
                  accessible only to UMSpaceSafe administrators for the purpose
                  of assessing and managing research safety, unless otherwise
                  anonymized.
                </ListItem>

                <ListItem>
                  Your identity and contact information may be shared with
                  institutional emergency responders (e.g,. COVID-19 response
                  teams) or state/federal emergency responders (e.g., Maine CDC,
                  law enforcement) where deemed necessary to ensure personnel
                  and public safety (e.g., exposure tracing).
                </ListItem>

                <ListItem>
                  UMSpaceSafe does not guarantee against infection by COVID-19
                  or other workplace hazards.
                </ListItem>
              </List>
            </Box>

            <Box textAlign="center">
              <Button size="lg" colorScheme="blue">
                <a href="/api/auth/signin">Sign in</a>
              </Button>
            </Box>
          </Box>
        )}

        <Box mb={4}>{session && <CheckInTabs />}</Box>

        {session && data && <Heading mb={3}>Check Ins</Heading>}

        {session && data && (
          <Stack spacing={3}>
            {data.checkIns.map((checkIn, index) => (
              <Flex
                key={checkIn.id}
                justify="space-between"
                align="center"
                shadow="sm"
                p={2}
                rounded="5px"
                backgroundColor="white"
              >
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
          </Stack>
        )}
      </Box>
    </div>
  );
};
