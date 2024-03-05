import {PrismaClient} from '@prisma/client'
import {json} from "express";

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const name = req.body;
    console.log(name)
    const x = await prisma.users.findMany()
    console.log(x)
    res.status(200).json(x);
}