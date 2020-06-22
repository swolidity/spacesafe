import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function (req, res) {
  if (req.method === "GET") {
    return await prisma.user.findMany();
  }

  if (req.method === "POST") {
    const { body } = req;
    console.log(body.email);
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
      },
    });
    res.json(user);
  }
}
