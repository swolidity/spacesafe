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
          <Flex align="center" justify="space-between">
            <Box>
              <Flex align="center">
                <Avatar src={log.user.image} alt={log.user.name} mr={3} />
                <Box>
                  <Text>{log.user.name}</Text>
                </Box>
              </Flex>
            </Box>

            <Box>
              {log.roomNumber} {log.location.name}
            </Box>

            <Box>{log.checkIn}</Box>

            <Box>{log.checkOut}</Box>
          </Flex>
        ))}
      </Stack>
    </Box>
  );
}
