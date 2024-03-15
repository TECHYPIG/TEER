import { PrismaClient } from '@prisma/client'
import 'dotenv/config'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const { method, body } = req;

    switch (method) {
        case 'GET':
            try {
                const posts = await prisma.post.findMany();
                res.status(200).json(posts);
            } catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
            break;
        case 'POST':
            try {
                const { title, content, published } = JSON.parse(body);
                const createdPost = await prisma.post.create({
                    data: { title, content, published }
                });
                res.status(200).json(createdPost);
            } catch (error) {
                res.status(500).json({ error: error.stack });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
