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
  const { data, error } = useSWR("/api/admin/activity", fetcher);
  const [session, loading] = useSession();

  if (loading) return null;

  if (!loading && !session?.user?.isAdmin)
    return <Box p={6}>Access Denied</Box>;

  if (!data) return <Box p={6}>loading...</Box>;

  return (
    <Box p={6}>
      <AdminNavbar />
      <Flex justify="space-between" align="center" mb={4}>
        <Heading>Activity Logs</Heading>
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
