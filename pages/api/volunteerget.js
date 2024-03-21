import prisma from "@/pages/api/prismaClient";

export default async function handler(req, res) {
    try {
        let x =  await prisma.volunteer.findMany();
        return res.status(200).json(x)
    }
    catch (error) {
        console.log("Theres been a problem" + error)
    }
}