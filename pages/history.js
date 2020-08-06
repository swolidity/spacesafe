import {
  Flex,
  Box,
  Heading,
  Button,
  Stack,
  Avatar,
  Text,
} from "@chakra-ui/core";
import useSWR from "swr";
import { format } from "date-fns";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function History() {
  const { data, error } = useSWR("/api/history", fetcher);

  if (!data) return <Box p={6}>loading...</Box>;

  return (
    <Box p={6}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading>My History</Heading>
      </Flex>

      <Stack spacing={3}>
        {data.logs.map((log) => (
          <Box boxShadow="sm" background="white" p={3} borderRadius="5px">
            <Box mb={2}>
              <Flex align="center">
                <Avatar src={log.user.image} alt={log.user.name} mr={3} />
                <Box>
                  <Text>{log.user.name}</Text>
                </Box>
              </Flex>
            </Box>
            <Heading size="sm" mb={2}>
              {log.roomNumber} {log.location.name}
            </Heading>
            <Box>
              <Heading size="sm">Check In</Heading>
              {format(new Date(log.checkIn), "MM/dd/yyyy HH:mm:ss")}
            </Box>
            <Box>
              <Heading size="sm">Check Out</Heading>
              {format(new Date(log.checkOut), "MM/dd/yyyy HH:mm:ss")}
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
