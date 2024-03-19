import {Name, DynamicData} from "./VolunteerFunctions"
import "./Volunteer.css"


export default function Volunteer(){
    return(
        <div className="MainDiv">
            <Name />
            <DynamicData />
        </div>
    )
}