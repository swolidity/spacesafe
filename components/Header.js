import { useSession } from "next-auth/client";
import { Flex, Box, Avatar, Link } from "@chakra-ui/core";
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
        <Link>SafeSpace</Link>
      </NextLink>

      {!session && (
        <Box>
          <a href="/api/auth/signin">Sign in</a>
        </Box>
      )}
      {session && (
        <Box>
          <Flex align="center">
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
