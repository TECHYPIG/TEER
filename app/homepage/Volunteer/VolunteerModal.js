import "./VolunteerModal.css"
import {useState} from "react";
export default function Modal({open,close})
{
    const username = "woody"
    const [Role,changedRoleState] = useState("")
    const [Location,changedLocation] = useState("")
    const [Email,changedEmail] = useState("")
    const [Company,changedCompany] = useState("")
    const [Description,changedDescription] = useState("")

    if (open === false) {
        return null
    }
        return (
            <div className="Background">
                <div className="Content">

                    <div className="Flex">
                    <button className="Close" onClick={close}>Close</button>
                        <div className="Row">
                                <div className="Column">
                                <label>Role</label>
                                <input type="text" className="Input" value={Role}
                                       onChange ={event => onChangeFunction(event,changedRoleState)}/>
                                </div>

                                <div className="Column MarginLeft">
                                <label>Email</label>
                                <input type="text" value={Email} className="Input"
                                       onChange ={event => onChangeFunction(event,changedEmail)}/>
                                 </div>
                        </div>
                        <div className="Row">
                            <div className="Column">
                                <label>Location</label>
                                <input type="text" value={Location} className="Input"
                                       onChange ={event => onChangeFunction(event,changedLocation)}/>
                            </div>

                            <div className="Column MarginLeft">
                                <label>Company</label>
                                <input type="text" value={Company} className="Input"
                                       onChange ={event => onChangeFunction(event,changedCompany)}/>
                            </div>
                        </div>
                            <label>Description</label>
                            <textarea value={Description} className="Input"
                                      onChange ={event => onChangeFunction(event,changedDescription)}/>
                        <input type="submit" className="Submit" onClick={() => volunteerPushing(Email,username,Location,Company,Description,Role)}/>
                    </div>
                    </div>
            </div>
        );
    }
function onChangeFunction(event, inputState){
    inputState(event.target.value)
}
async function volunteerPushing(email,username,location,company,description,role){
    let response = await fetch('/api/volunteer', {
        method: 'POST', // Adjust the method as needed (GET, POST, etc.)
        'Content-Type': 'application/json',
        body: JSON.stringify({
            username : username,
            company : company,
            description : description,
            email : email,
            location : location,
            role : role})
    });
}