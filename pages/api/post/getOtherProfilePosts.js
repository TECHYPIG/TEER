import prisma from "../prismaClient";
import 'dotenv/config';

export default async function handler(req, res) {
    const { method, query } = req;

    switch (method) {
        // Get posts by username
        case 'GET':
            try {
                const { username } = query;

                if (!username) {
                    return res.status(400).json({ error: 'Username is required' });
                }

                // Find the user by username
                const user = await prisma.users.findUnique({
                    where: {
                        Username: username
                    },
                    include: {
                        Posts: true // Include the posts related to the user
                    }
                });

                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }

                return res.status(200).json(user.Posts);
            } catch (error) {
                console.error('Error fetching user posts:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        default:
            return res.status(405).json({ error: `Method ${method} Not Allowed` });
    }
}
