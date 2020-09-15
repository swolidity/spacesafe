import { useSession } from "next-auth/client";
import { Flex, Box, Avatar, Link, Button, Image } from "@chakra-ui/core";
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
          <Image
            src="/spacesafe@2x.png"
            alt="SpaceSafe"
            height="80px"
            ignoreFallback
          />
        </Link>
      </NextLink>

      {!session && (
        <Button as="a" colorScheme="blue" href="/api/auth/signin/google">
          Sign in
        </Button>
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
