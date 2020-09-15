import { Flex, Box } from "@chakra-ui/core";
import AdminNavbar from "../../components/AdminNavbar";
import { useSession } from "next-auth/client";

export default function AdminIndexPage() {
  const [session, loading] = useSession();

  if (loading) return null;

  if (!loading && !session?.user?.isAdmin)
    return <Box p={6}>Access Denied</Box>;

  return (
    <Box p={6}>
      <AdminNavbar />
    </Box>
  );
}
