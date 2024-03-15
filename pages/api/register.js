import prisma from "./prismaClient"
import 'dotenv/config'



export default async function handler(req, res) {
    const username = JSON.parse(req.body).username; //Opening a json object
    const password = JSON.parse(req.body).password; //Opening a json object
    var age = JSON.parse(req.body).age; //Opening a json object
    age = parseInt(age)
    const firstname = JSON.parse(req.body).firstName; //Opening a json object
    const email = JSON.parse(req.body).email; //Opening a json object
    console.log(firstname)

     await prisma.users.create({
         data: {
             Username: username,
             Firstname: firstname,
             Password: password,
             Email: email,
             Age: age
         }
    });
}