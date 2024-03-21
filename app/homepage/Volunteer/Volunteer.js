import {Name, DynamicData} from "./VolunteerFunctions"
import "./Volunteer.css"


export default function Volunteer({user}){
    return(
        <div className="MainDiv">
            <Name />
            <DynamicData />
        </div>
    )
}