import "./VolunteerModal.css"
import {useState} from "react";
export default function Modal({open,close,username})
{
    const [RoleState,changedRoleState] = useState("")
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
                                <input type="text" className="Input" value={RoleState}
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
                        <input type="submit" className="Submit"/>
                    </div>
                    </div>
            </div>
        );
    }
function onChangeFunction(event, inputState){
    inputState(event.target.value)
}