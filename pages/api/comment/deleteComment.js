import prisma from "../prismaClient";
import "dotenv/config";
import jwt from "jsonwebtoken";

export default async function deleteComment(req, res) {
  const { method, body, headers } = req;

  switch (method) {
    case "DELETE":
      try {
        const { commentId } = body;
        const username = await getUsername(headers, res);

        if (!username) {
          return;
        }


        const deletedComment = await deleteCommentDB(commentId, username);

        if (!deletedComment) {
          return res.status(404).json({ error: "Comment not found" });
        }

        res.status(200).json({ message: "Comment deleted successfully" });
      } catch (error) {
        console.error("Error deleting comment:", error);
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

// Delete comment from database
async function deleteCommentDB(commentId, userId) {
  const deletedComment = await prisma.comment.deleteMany({
    where: {
      id: commentId,
      Username: userId,
    },
  });

  return deletedComment.count > 0;
}