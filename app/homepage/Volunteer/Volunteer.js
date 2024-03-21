import {Name, DynamicData} from "./VolunteerFunctions"
import "./Volunteer.css"


export default function Volunteer({user}){
    console.log("Vol" + user.Username)
    return(
        <div className="MainDiv">
            <Name />
            <DynamicData />
        </div>
    )
}