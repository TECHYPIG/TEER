import prisma from "./prismaClient";
import 'dotenv/config';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    const { method, query } = req;

    switch (method) {
        case 'GET':
            try {
                const { username } = query;

                if (!username) {
                    return res.status(400).json({ error: 'Username is required' });
                }

                const user = await prisma.users.findUnique({
                    where: { Username: username },
                });

                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }

                res.status(200).json(user);
            } catch (error) {
                console.error('Error fetching user details:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
