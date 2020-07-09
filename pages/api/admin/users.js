import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function (req, res) {
  if (req.method === "GET") {
    const users = await prisma.user.findMany();
    res.json({ users });
  }
}
