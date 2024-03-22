import prisma from "./prismaClient"
import 'dotenv/config'


export default async function handler(req, res) {
    const username = JSON.parse(req.body).username; //Opening a json object
    const password = JSON.parse(req.body).password; //Opening a json object
    const firstname = JSON.parse(req.body).firstname; //Opening a json object
    const surname = JSON.parse(req.body).surname; //Opening a json object
    const email = JSON.parse(req.body).email; //Opening a json object
    const location = JSON.parse(req.body).location; //Opening a json object
    const gender = JSON.parse(req.body).gender;
    const birthDate = JSON.parse(req.body).birthDate;

    try{
        console.log(password)
        const returning = await prisma.users.create({
            data: {
                Username: username,
                Firstname: firstname,
                Surname: surname,
                Password: password,
                Email: email,
                Location: location,
                Gender: gender,
                Birthday: birthDate,
                Bio: "",
                Role: "",
                Posts: {}
            }
        });
        console.log("Register was executed")
        return res.status(200).json(1)
    } catch (error){
        if (error.code === 'P2002'){
            //duplicate username or email
            console.log("Invalid Username")
           return res.status(501).json(2)
        }
        return res.status(500).json(0)
    }
}