import "./Volunteer.css"
import {Name,DynamicData} from "./VolunteerFunctions"
export default function Volunteer() {
    return (
        <div className="MainDiv">
        <Name />
            <div className="InnerDiv">
                <div className="AddingMarginForDynamicData">
                    {opportunitiesDisplay()}
                    {opportunitiesDisplay()}
                </div>
            </div>
        </div>
    );
}

function opportunitiesDisplay(){
    return DynamicData("Hello","10th March", "Newcastle", "Assistant Worker")
}