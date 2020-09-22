import { Flex, Box } from "@chakra-ui/core";
import AdminNavbar from "../../components/AdminNavbar";
import { useSession } from "next-auth/client";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function AdminIndexPage() {
  const [session, loading] = useSession();
  const { data, error } = useSWR("/api/admin/user", fetcher, {
    revalidateOnMount: true,
  });

  if (loading) return null;

  if ((!loading && !session) || !data?.user.isAdmin)
    return <Box p={6}>Access Denied</Box>;

  return (
    <Box p={6}>
      <AdminNavbar />
    </Box>
  );
}
