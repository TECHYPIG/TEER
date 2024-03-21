import {Name, InsideVolunteer} from "./VolunteerFunctions"
import "./Volunteer.css"


export default function Volunteer({user}){
    return(
        <div className="MainDiv">
            <Name username={user} />
            <InsideVolunteer username ={user}/>
        </div>
    )
}