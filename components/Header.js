import { useSession } from "next-auth/client";
import { Flex, Box, Avatar, Link, Heading, Button } from "@chakra-ui/core";
import NextLink from "next/link";

export default function Header() {
  const [session, loading] = useSession();

  return (
    <Flex
      justify="space-between"
      align="center"
      px={6}
      py={3}
      backgroundColor="white"
    >
      <NextLink href="/" passHref>
        <Link>
          <Heading>UMSpaceSafe</Heading>
        </Link>
      </NextLink>

      {!session && (
        <Button colorSchem="blue">
          <a href="/api/auth/signin">Sign in</a>
        </Button>
      )}
      {session && (
        <Box>
          <Flex align="center">
            <NextLink href="/admin">
              <Link mr={6}>Admin</Link>
            </NextLink>

            <Avatar src={session.user.image} alt={session.user.name} mr={3} />

            <Box>
              <NextLink href="/api/auth/signout" passHref>
                <Link>Sign out</Link>
              </NextLink>
            </Box>
          </Flex>
        </Box>
      )}
    </Flex>
  );
}
