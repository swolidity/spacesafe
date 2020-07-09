import { Flex, Box, Heading, Button } from "@chakra-ui/core";
import useSWR from "swr";
import AdminNavbar from "../../components/AdminNavbar";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function AdminLocationsPage() {
  const { data, error } = useSWR("/api/admin/locations", fetcher);

  if (!data) return <Box p={6}>loading...</Box>;

  return (
    <Box p={6}>
      <AdminNavbar />

      <Flex justify="space-between" align="center">
        <Heading>Locations</Heading>

        <Button colorScheme="blue">Add Location</Button>
      </Flex>

      {data.locations.map((location) => (
        <Box mb={2}>{location.name}</Box>
      ))}
    </Box>
  );
}
