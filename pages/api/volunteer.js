import prisma from "./prismaClient"
import 'dotenv/config'


export default async function handler(req, res) {
    const username = JSON.parse(req.body).username; //Opening a json object
    const email = JSON.parse(req.body).email; //Opening a json object
    const location = JSON.parse(req.body).location; //Opening a json object
    const description = JSON.parse(req.body).description; //Opening a json object
    const company = JSON.parse(req.body).company; //Opening a json object
    const role = JSON.parse(req.body).role; //Opening a json object

    try{
        const returning = await prisma.volunteer.create({
            data: {
                username : username,
                email : email,
                location : location,
                description : description,
                company : company,
                role: role
            }
        });
    } catch (error){
        console.log("Error in putting in a volunteer")

    }
}