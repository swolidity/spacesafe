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
              UMSpaceSafe logs research space use for the purpose of mitigating
              and responding to potential COVID-19 exposure or other hazards. 
              All UM personnel and students conducting institutionally
              associated research are required to use this tool when accessing
              and departing research associated spaces, including 1) any
              research lab or meeting spaces occupied by others, 2) any research
              space you will access for more than 5 minutes, even when
              unoccupied by others, and 3) any off-campus field sites, farms, or
              non-UM facilities used in research.
            </Text>

            <Box p={6} mb={6}>
              <List spacing={2} mb={2} styleType="disc">
                <ListItem>
                  UMSpaceSafe does not passively track your activities and is
                  not intended for documenting space use outside of
                  institutionally authorized research activities.
                </ListItem>

                <ListItem>
                  UMSpaceSafe data is stored in a secure database and accessible
                  only to UMSafeSpace administrators for the purpose of
                  assessing and managing research safety (unless otherwise
                  anonymized).
                </ListItem>

                <ListItem>
                  Your identity and contact information may be shared with
                  institutional emergency personnel (e.g,. COVID-19 response
                  team) or state/federal emergency responders (e.g., Maine CDC,
                  law enforcement) where deemed necessary to facilitate UM
                  personnel and public safety (e.g., exposure tracing).
                </ListItem>

                <ListItem>
                  UMSafeSpace does not guarantee against infection by COVID-19
                  or other workplace hazards.
                </ListItem>

                <ListItem>
                  This tool does not take the place of other UM COVID-related
                  policies and procedures (UM COVID INFO SITE LINK) nor the
                  place of other institutional approvals required for research.
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
