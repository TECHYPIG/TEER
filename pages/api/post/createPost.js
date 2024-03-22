import prisma from "../prismaClient";
import "dotenv/config";
import jwt from "jsonwebtoken";
import multer from "multer";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import { ConstructionOutlined } from "@mui/icons-material";

AWS.config.update({
  accessKeyId: process.env.SPACES_ACCESS_KEY_ID,
  secretAccessKey: process.env.SPACES_SECRET_ACCESS_KEY,
  region: process.env.SPACES_REGION,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });
const myUploadMiddleware = upload.array("file");

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  const s3 = new AWS.S3({
    endpoint: process.env.SPACES_ENDPOINT,
  });
  const username = await getUsername(req.headers, res);
  if (!username) {
    res.status(401).json("error fetching username");
    return;
  }
  await runMiddleware(req, res, myUploadMiddleware);
  let uploadResponse = null;

  for (const file of req.files) {
    try {
      const uniqueFilename = uuidv4() + "-" + file.originalname;

      const uploadParams = {
        Bucket: process.env.SPACES_BUCKET_NAME,
        Key: `posts/${uniqueFilename}`,
        Body: file.buffer,
        ACL: "public-read",
        ContentType: file.mimetype,
      };
      const uploadResponse = await s3.upload(uploadParams).promise();
      const post = await sendPostDB(
        username,
        req.body.content,
        uploadResponse.Location
      );
      console.log(post);
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json("Error creating post");
      return;
    }
  }
}
export const config = {
  api: {
    bodyParser: false,
  },
};

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

// send post to database
async function sendPostDB(username, content, imageUrl) {
  const post = await prisma.post.create({
    data: {
      title: "DEPRECATED",
      content: content,
      published: true,
      picture_url: imageUrl,
      user: {
        connect: {
          Username: username,
        },
      },
    },
    include: {
      user: true,
      Comments: {
        include: {
          user: true,
        },
      }, // Add this closing brace
      likes: true,
    },
  });
  console.log(post);
  return post;
}
