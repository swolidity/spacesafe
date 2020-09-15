import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function (req, res) {
  const session = await getSession({ req });

  if (req.method === "GET" && session) {
    const user = await prisma.user.findOne({
      where: {
        email: session.user.email,
      },
    });

    if (!user.isAdmin) {
      throw new Error();
    }

    const users = await prisma.user.findMany();
    return res.json(users);
  }

  if (req.method === "POST") {
    const { body } = req;

    let user;
    try {
      user = await prisma.user.upsert({
        create: {
          name: body.name,
          email: body.email,
          image: body.image,
        },
        update: {},
        where: {
          email: body.email,
        },
      });
    } catch (e) {
      // user already exists so just return true to log them in
      console.log(e.message);
      user = true;
    }

    return res.json(user);
  }
}
