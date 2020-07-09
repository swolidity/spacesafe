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

export default function AdminUsersPage() {
  const { data, error } = useSWR("/api/admin/users", fetcher);

  if (!data) return <Box p={6}>loading...</Box>;

  return (
    <Box p={6}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading>Users</Heading>

        <Button colorScheme="blue">Add Location</Button>
      </Flex>

      <Stack spacing={3}>
        {data.users.map((user) => (
          <Box>
            <Flex align="center">
              <Avatar src={user.image} alt={user.name} mr={3} />
              <Box>
                <Text>{user.name}</Text>
                <Text>{user.email}</Text>
              </Box>
            </Flex>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
