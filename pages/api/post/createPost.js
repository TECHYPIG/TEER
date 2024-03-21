import prisma from "../prismaClient";
import "dotenv/config";
import jwt from "jsonwebtoken";
import multer from "multer";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

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
  console.log(req.headers.authorization);
  const username = await getUsername(req.headers, res);
  if (!username) {
    res.status(401).json("error fetching username");
    return;
  }
  await runMiddleware(req, res, myUploadMiddleware);
  let uploadResponse = null;
  console.log(req.files);

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
      console.log("Image uploaded:", uploadResponse.Location);
      console.log("Username:" + username);
      console.log("Content:" + req.body.content); 
      const post = await sendPostDB(username, req.body.content, uploadResponse.Location);
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json("Error creating post");
      return;
    }

    res.status(200).json({ message: "Upload successfull", files: req.files });
  }
}
export const config = {
  api: {
    bodyParser: false,
  },
};

// export default async function createPost(req, res) {
//   //   const s3 = new AWS.S3({
//   //     endpoint: process.env.SPACES_ENDPOINT,
//   //   });
//   const { method, body, headers } = req;

//   switch (method) {
//     case "POST":
//       try {
//         const uploadResult = await new Promise((resolve, reject) => {
//           upload.single("image")(req, res, (err) => {
//             if (err) reject(err);
//             resolve({ file: req.file, body: req.body });
//           });
//         });
//         console.log(uploadResult.file);
//         // const uploadResult = await new Promise((resolve, reject) => {
//         //   upload.single("image")(req, res, (err) => {
//         //     if (err) reject(err);
//         //     resolve({ file: req.file, body: req.body });
//         //   });
//         // });
//         // const { file, body } = uploadResult;
//         // if (!file) {
//         //   return res.status(400).json({ error: "Image file is required" });
//         // }
//         // const uniqueFilename = `${username}/${uuidv4()}.jpg`;

//         const username = await getUsername(headers, res);

//         // const uploadParams = {
//         //   Bucket: process.env.SPACES_BUCKET_NAME,
//         //   Key: `posts/${uniqueFilename}`,
//         //   Body: file.buffer,
//         //   ACL: "public-read",
//         //   ContentType: file.mimetype,
//         // };
//         // const uploadResponse = await s3.upload(uploadParams).promise();
//         // console.log("Image uploaded:", uploadResponse.Location);
//         // const imageUrl = uploadResponse.Location;
//         // console.log("Image URL:", imageUrl);

//         // const userId = await getUserId(username);
//         //  const post = await sendPostDB(username, content, imageUrl);
//         res.status(201).json(post);
//       } catch (error) {
//         console.error("Error creating post:", error);
//         res.status(500).json({
//           content: "Could not create post",
//           error: "Internal Server Error",
//         });
//       }
//       break;

//     default:
//       res.setHeader("Allow", ["POST"]);
//       res.status(405).end(`Method ${method} Not Allowed`);
//   }
// }

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
      title: "title",
      content: content,
      published: true,
      picture_url: imageUrl,
      user: {
        connect: {
          Username: username,
        },
      },
    },
  });
  return post;
}
