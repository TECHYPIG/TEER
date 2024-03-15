import jwt from "jsonwebtoken";
import 'dotenv/config'
export default async function authorize(req,res){
    const tokenNotSplit = req.headers["cookie"]
    const token = tokenNotSplit.split("=")[1]
    console.log(token);
    if (!token) {
        console.log("No token")
        return res.status(401).json({decoded : 0});
    } else {
        await jwt.verify(token, process.env.ACCESS_TOKEN,  function(err, decoded) {
            res.status(200).json({decodedUsername : decoded.username})
        });
    }
}