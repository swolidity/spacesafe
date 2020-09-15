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
import AdminNavbar from "../../components/AdminNavbar";
import { useSession } from "next-auth/client";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function AdminUsersPage() {
  const [session, loading] = useSession();
  const { data, error } = useSWR("/api/admin/users", fetcher);

  if (loading) return null;

  if (!loading && !session?.user?.isAdmin)
    return <Box p={6}>Access Denied</Box>;

  if (!data) return <Box p={6}>loading...</Box>;

  return (
    <Box p={6}>
      <AdminNavbar />
      <Flex justify="space-between" align="center" mb={4}>
        <Heading>Users</Heading>
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
