import { PrismaClient } from '@prisma/client'
import 'dotenv/config'
import Cookies from 'js-cookie';

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const { method, body } = req;

    switch (method) {
        //get logged in user posts and all post info
        case 'GET':
            try {
                const token = Cookies.get('accessToken'); // Retrieve access token from cookies
                if (!token) {
                    return res.status(401).json({ error: 'Unauthorized' });
                }

                const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN);
                if (!decodedToken) {
                    return res.status(401).json({ error: 'Unauthorized' });
                }

                const { userId } = decodedToken; // Assuming the decoded token contains userId

                const userPosts = await prisma.post.findMany({
                    where: {
                        userId: userId,
                    },
                });

                res.status(200).json(userPosts);
            } catch (error) {
                console.error('Error fetching user posts:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
            break;
            //update or add logged in user post
        case 'POST':
            try {
                const token = Cookies.get('accessToken'); // Retrieve access token from cookies
                if (!token) {
                    return res.status(401).json({ error: 'Unauthorized' });
                }

                const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN);
                if (!decodedToken) {
                    return res.status(401).json({ error: 'Unauthorized' });
                }

                const { userId } = decodedToken; // Assuming the decoded token contains userId

                const { title, content, published } = JSON.parse(body);

                const createdPost = await prisma.post.create({
                    data: {
                        title,
                        content,
                        published,
                        user: {
                            connect: { id: userId }, // Connect the post to the logged-in user
                        },
                    },
                });

                res.status(200).json(createdPost);
            } catch (error) {
                console.error('Error creating post:', error);
                res.status(500).json({ error: 'Failed to create post' });
            }
            break;

             // Update logged in user post
        case 'PUT':
            try {
                const token = Cookies.get('accessToken'); // Retrieve access token from cookies
                if (!token) {
                    return res.status(401).json({ error: 'Unauthorized' });
                }

                const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN);
                if (!decodedToken) {
                    return res.status(401).json({ error: 'Unauthorized' });
                }

                const { userId } = decodedToken; // Assuming the decoded token contains userId

                const { postId, title, content, published } = JSON.parse(body);

                const updatedPost = await prisma.post.update({
                    where: { id: postId, userId: userId },
                    data: { title, content, published },
                });

                res.status(200).json(updatedPost);
            } catch (error) {
                console.error('Error updating post:', error);
                res.status(500).json({ error: 'Failed to update post' });
            }
            break;
       default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
