import prisma from "./prismaClient"
import 'dotenv/config'
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
    const { method, query } = req;

    switch (method) {
        // Search for users by username
        case 'GET':
            try {
                const { username } = query;
                //console.log('Query parameter:', username); 

                if (!username) {
                    return res.status(400).json({ error: 'Username is required' });
                }

                const users = await prisma.users.findMany({
                    where: {
                        Username: {
                            startsWith: username,
                            mode: 'insensitive' // Case-insensitive search
                        }
                    }
                });
                //console.log('Fetched users:', users);
                return res.status(200).json(users);
            } catch (error) {
                console.error('Error fetching users:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        default:
            return res.status(405).json({ error: `Method ${method} Not Allowed` });
    }
}