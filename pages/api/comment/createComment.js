import prisma from "../prismaClient";
import "dotenv/config";
import jwt from "jsonwebtoken";

export default async function createComment(req, res) {
 const { method, body, headers } = req;

 switch (method) {
   case "POST":
     try {
       const { postId, content } = body;
       const username = await getUsername(headers, res);

       if (!username) {
         return;
       }

       const newComment = await sendCommentDB(username, postId, content);
       res.status(201).json(newComment);
     } catch (error) {
       console.error("Error creating comment:", error);
       res.status(500).json({
         content: "Could not create comment",
         error: "Internal Server Error",
       });
     }
     break;
   default:
     res.setHeader("Allow", ["POST"]);
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

// send comment to database
async function sendCommentDB(username, postId, content) {
    const newComment = await prisma.comment.create({
      data: {
        content: "COMMENT CONTENT",
        user: {
          connect: { Username: username },
        },
        post: {
          connect: { id: postId },
        },
      },
    });
    return newComment;
  }