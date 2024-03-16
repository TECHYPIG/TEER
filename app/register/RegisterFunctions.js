'use client'
import "./RegisterFunctions.css"
import {useState} from "react";
import crypto from "crypto"
import {locations} from "./countries"

export function RegisterSign(){
    return(
        <div>
            <h1 className="RegisterSign">Register Here</h1>
        </div>
    );
}

export function RegisterInputs(){
    const [username,changedUsername] = useState("")
    const [password,changedPassword] = useState("")
    const [email,changedEmail] = useState("")
    const [fullName,changedFullname] = useState("")
    const [confirmPassword,changedConfirmPassword] = useState("")
    const [location,changedLocation] = useState("")
    const [gender,changedGender] = useState("")
    const [birthDate,changedBirthDate] = useState("")
    const [dontMatch, ChangedDontMatch] = useState("")

    return(
        <div className="MainFlex">
            <div className="InnerFlex">

             <div className="Left">
                <div className="Flex">
                    <label>Username</label>
                    <input type="text" className="Input" value={username}
                           onChange ={event => onChangeFunctionUsername(event,changedUsername)}/>
                </div>
                 <div className="Flex">
                     <label>Email</label>
                     <input type="text" className="Input" value={email}
                            onChange ={event => onChangeFunction(event,changedEmail)}/>
                 </div>
                 <div className="Flex">
                     <label>Location</label>
                     <select  className="Input" onChange ={event => onChangeFunction(event,changedLocation)}>
                         {locations}
                     </select>
                 </div>
                 <div className="Flex">
                     <label>Password</label>
                     <input type="text" className="Input" value={password}
                            onChange ={event => onChangeFunction(event,changedPassword)}/>

                 </div>
            </div>

            <div className="Right">
                <div className="Flex">
                    <label>Full Name</label>
                    <input type="text" className="Input" value={fullName}
                           onChange ={event => onChangeFunction(event,changedFullname)}/>
                </div>
                <div className="Flex">
                    <label>Birth Date</label>
                    <input type="date" className="Input" onChange ={event => onChangeFunction(event,changedBirthDate)}/>
                </div>
                    <div className="Flex">
                        <label>Gender</label>
                        <select className="Input" value={gender} onChange ={event => onChangeFunction(event,changedGender)}>
                            <option key="Male">Male</option>
                            <option key="Female">Female</option>
                            <option key="Others">Others</option>
                            <option key="PreferNotToSay">Prefer Not To Say</option>
                        </select>
                    </div>
                <div className="Flex">
                    <label>Confirm Password</label>
                    <input type="text" className="Input" value={confirmPassword}
                           onChange ={event => onChangeFunction(event,changedConfirmPassword)}/>
                </div>
                </div>
            </div>
            <div className="passwordsDontMatch"><h5>{dontMatch}</h5></div>
       <input type="submit" onClick={async function inside (){
           let value = await registerInformation(username,location, password,confirmPassword,birthDate,fullName,gender,email,ChangedDontMatch);
           switch (value) {
               case 0:
                   ChangedDontMatch("Your passwords do not match")
                   break;
               case 10:
                   ChangedDontMatch("Username is empty");
                   break;
               case 20:
                   ChangedDontMatch("Password is empty");
                   break;
               case 30:
                   ChangedDontMatch("Your Confirmed Password is empty");
                   break;
               case 40:
                   ChangedDontMatch("Birth Date is empty");
                   break;
               case 50:
                   ChangedDontMatch("Your name is empty");
                   break;
               case 60:
                   ChangedDontMatch("Location is empty");
                   break;
               case 70:
                   ChangedDontMatch("Gender is empty");
                   break;
               case 80:
                   ChangedDontMatch("Email is empty");
                   break;
           }
       }}
              className="Submit" value="Submit"/>
    </div>
    );
}

function onChangeFunction(event, inputState){
    inputState(event.target.value)
}
function onChangeFunctionUsername(event, inputState){
    let x = event.target.value
    inputState(x)
}
async function registerInformation(username,location, password,confirmPassword,birthDate,fullName,gender,email,ChangedDontMatch){
    console.log("Working")
    if(username === ""){
        return 10
    }
    if(password === ""){
        return 20
    }
    if(confirmPassword === ""){
        return 30
    }
    // if(birthDate === ){
    //     return 40
    // }
    if(fullName === ""){
        return 50
    }
    if(location === "Select One"){
        return 60
    }
    if(gender === ""){
        return 70
    }
    if(email === ""){
        return 80
    }
    var firstname
    var surname
    let nameSplit = fullName.split(" ");
    if(nameSplit[1] === undefined){
        return 100
    } else{
       firstname = nameSplit[0];
        surname = nameSplit[1];
    }

    var response;
    if (password !== confirmPassword){
        return 0;
    } else{
        console.log("testing")
        ChangedDontMatch("")
        let hashedPassword = crypto.createHash("sha256").update(password).digest('hex')

            try{
                response =  await fetch('/api/register', {
                    method: 'POST', // Adjust the method as needed (GET, POST, etc.)
                    'Content-Type': 'application/json',
                    body: JSON.stringify({username : username,
                                                password : hashedPassword,
                                                firstname : firstname,
                                                surname : surname,
                                                email : email,
                                                birthDate : birthDate,
                                                gender : gender,
                                                location : location})
                });
                console.log("returnedValue")
                console.log(response)
            }
            catch (error){
                console.log(error);
            }
        }
    }