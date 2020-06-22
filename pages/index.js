import Head from "next/head";
import { PrismaClient } from "@prisma/client";

export default function Home({ users }) {
  console.log({ users });
  const parsedUsers = users.map((user) => JSON.parse(user));
  return (
    <div>
      <header>
        <h2>UM SafeSpace</h2>
      </header>

      {parsedUsers.map((user) => {
        return (
          <div key={user.id}>
            <div>{user.name}</div>
            <div>{user.email}</div>
          </div>
        );
      })}
    </div>
  );
}

export const getServerSideProps = async () => {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  const stringifiedUsers = users.map((user) => JSON.stringify(user));
  return { props: { users: stringifiedUsers } };
};
