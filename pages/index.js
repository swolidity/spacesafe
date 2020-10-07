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
  Image,
} from "@chakra-ui/core";
import useSWR, { mutate } from "swr";
import { format } from "date-fns";
import NextLink from "next/link";

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
            <Flex mb={2} justify="center">
              <Image
                src="/UMaine_fullcrest_logo4c.jpg"
                alt="Umaine Logo"
                height="80px"
                ignoreFallback
              />
            </Flex>

            <Heading>Welcome.</Heading>

            <Text mt={6} mb={3}>
              UMSpaceSafe logs research (and similar scholarship) space use for
              the purpose of mitigating and responding to potential COVID-19
              exposure. All UM/UMM faculty, staff, and students working on
              research are strongly encouraged to use this tool as means of
              meeting current requirements to log space use and limit space
              occupancy. The tool should be used whenever individuals will
              co-occupy research (or similar scholarship) spaces for more than
              15 minutes, whether planned or unplanned at the time of their
              entry, including:
            </Text>

            <Box p={6} mb={2}>
              <List spacing={2} styleType="disc">
                <ListItem>
                  UMaine/UMM, as well as Non-UMaine/UMM, facilities (e.g. labs
                  or meeting spaces)
                </ListItem>

                <ListItem>
                  Outdoor sites, vessels, or farms used for their research.
                </ListItem>
              </List>
            </Box>

            <Box p={6} mb={6}>
              <Heading size="sm" mb={2}>
                Additional Info
              </Heading>
              <List spacing={2} mb={2} styleType="disc">
                <ListItem>
                  UMSpaceSafe does not passively track your activities and is
                  not intended for documenting space use outside of
                  institutionally authorized research activities.
                </ListItem>

                <ListItem>
                  UMSpaceSafe data is stored in a secure database and accessible
                  only to UMSpaceSafe administrators for the purpose of
                  facilitating research safety (unless otherwise anonymized).
                </ListItem>

                <ListItem>
                  Your identity and contact information may be shared with
                  institutional emergency personnel (e.g. COVID-19 response
                  team) or state/federal emergency responders (e.g., Maine CDC,
                  law enforcement) where deemed necessary for public safety
                  (e.g. exposure tracing).
                </ListItem>

                <ListItem>
                  UMSpaceSafe does not guarantee against infection by COVID-19
                  or other workplace hazards.
                </ListItem>

                <ListItem>
                  This tool does not take the place of other UM COVID-related
                  policies and procedures (
                  <Link
                    color="blue"
                    href="https://umaine.edu/return"
                    isExternal
                  >
                    https://umaine.edu/return
                  </Link>
                  ) nor the place of other institutional approvals required for
                  research.
                </ListItem>

                <ListItem>
                  For more information or a reasonable accommodation, please
                  contact Tammy Crosby, 207.581.1618 or{" "}
                  <Link
                    style={{ color: "blue" }}
                    href="mailto:tammy.crosby@maine.edu"
                  >
                    tammy.crosby@maine.edu
                  </Link>
                  .
                </ListItem>
              </List>
            </Box>

            <Box textAlign="center">
              <Button
                as="a"
                size="lg"
                colorScheme="blue"
                href="/api/auth/signin/google"
              >
                Sign in
              </Button>
            </Box>
          </Box>
        )}

        <Box mb={4}>{session && <CheckInTabs />}</Box>

        {session && data && (
          <Flex justify="space-between" align="center">
            <Heading>Check Ins</Heading>
            <Box mb={3}>
              <NextLink href="/history" passHref>
                <Button as="a" colorScheme="blue">
                  See or edit my history
                </Button>
              </NextLink>
            </Box>
          </Flex>
        )}

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
                  <Text>
                    {checkIn.roomNumber} {checkIn.location.name}
                  </Text>
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
