import prisma from "../prismaClient";
import "dotenv/config";
import jwt from "jsonwebtoken";

export default async function createLike(req, res) {
 const { method, body, headers } = req;

 switch (method) {
   case "POST":
     try {
       const { postId } = body;
       const username = await getUsername(headers, res);

       if (!username) {
         return;
       }

       const newLike = await sendLikeDB(username, postId);
       res.status(201).json(newLike);
     } catch (error) {
       console.error("Error liking post:", error);
       res.status(500).json({
         content: "Could not like post",
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

// send like to database
async function sendLikeDB(username, postId) {
    const newLike = await prisma.like.create({
      data: {
        user: {
          connect: { Username: username },
        },
        post: {
          connect: { id: postId },
        },
      },
    });
    return newLike;
  }