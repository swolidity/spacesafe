import { Flex, Box, Link } from "@chakra-ui/core";
import NextLink from "next/link";

export default function AdminNavbar() {
  return (
    <Box>
      <Flex align="center">
        <NextLink href="/admin/activity" passHref>
          <Link mr={3}>Activity Log</Link>
        </NextLink>

        <NextLink href="/admin/users" passHref>
          <Link mr={3}>Users</Link>
        </NextLink>

        <NextLink href="/admin/locations" passHref>
          <Link>Locations</Link>
        </NextLink>
      </Flex>
    </Box>
  );
}
