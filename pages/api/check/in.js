import { getSession } from "next-auth/client";
import { PrismaClient } from "@prisma/client";

export default async function (req, res) {
  const session = await getSession({ req });

  if (session) {
    const { body } = req;

    res.json(body);
    return;
  }
}
