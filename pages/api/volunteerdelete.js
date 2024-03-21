import prisma from "@/pages/api/prismaClient";

export default async function handler(req, res) {
    const id = JSON.parse(req.body).id; //Opening a json object
    try {
        let x =  await prisma.volunteer.delete({
            where : {

                id : id
            }
        });
        console.log()
        return res.status(200).json(x)
    }
    catch (error) {
        console.log("Theres been a problem" + error)
    }
}