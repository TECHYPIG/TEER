import prisma from "../prismaClient";
import "dotenv/config";
import jwt from "jsonwebtoken";

export default async function deleteLike(req, res) {
  const { method, body, headers } = req;

  switch (method) {
    case "DELETE":
      try {
        const { postId } = body;
        const username = await getUsername(headers, res);

        if (!username) {
          return;
        }


        const deletedLike = await deleteLikeDB(postId, username);

        if (!deletedLike) {
          return res.status(404).json({ error: "Like not found" });
        }

        res.status(200).json({ message: "Unliked successfully" });
      } catch (error) {
        console.error("Error unliking post:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;
    default:
      res.setHeader("Allow", ["DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function getUsername(headers, res) {
  let username = null;
  try {
    const token = headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN);
    if (!decodedToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    username = decodedToken.username;
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  return username;
}

// Delete like from database
async function deleteLikeDB(postId, userId) {
  const deletedLike = await prisma.like.deleteMany({
    where: {
      postId: postId,
      Username: userId,
    },
  });

  return deletedLike.count > 0;
}