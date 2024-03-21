import "./VolunteerModal.css"
import {useState} from "react";
export default function Modal({open,close,usernameLoggedIn})
{
    const username = usernameLoggedIn;
    const [Role,changedRoleState] = useState("")
    const [Location,changedLocation] = useState("")
    const [Email,changedEmail] = useState("")
    const [Company,changedCompany] = useState("")
    const [Description,changedDescription] = useState("")
    const [errorText,setErrorText] = useState("")

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

                        <h3 className="ErrorText">ErrorText</h3>
                        <input type="submit" className="Submit" onClick={ async function inside (){

                            const value = volunteerPushing(Email,username,Location,Company,Description,Role)
                            switch(value){
                                case 20:
                                    setErrorText("Your company field is empty");
                                    break;
                                case 30:
                                    setErrorText("Your description is empty");
                                    break;
                                case 40:
                                    setErrorText("Your email is empty");
                                    break;
                                case 50:
                                    setErrorText("Your location is empty");
                                    break;
                                case 60:
                                    setErrorText("Your role is empty");
                                    break;
                                case 200:
                                    setErrorText("Your job has been added");
                                    break;
                            }
                        }

                    }

                        />
                    </div>
                    </div>
            </div>
        );
    }
function onChangeFunction(event, inputState){
    inputState(event.target.value)
}
async function volunteerPushing(email,username,location,company,description,role){
    if(company === ""){
        return 20;
    }
    if(description === ""){
        return 30;
    }
    if(email === ""){
        return 40;
    }
    if(location === ""){
        return 50;
    }
    if(role === ""){
        return 60;
    }
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
    if (response.status === 200){
        return 200;
    }else{

    }
}