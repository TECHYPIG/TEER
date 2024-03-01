import {TextBoxes,SignIn,Submit,Google,RegisterText,RegisterButton,RegisterTextBelow} from "@/app/login/LoginFunctions";
import "./Login.css"

export default function LoginCompiled(){
    return(
        <div className="MainBox">
            <div className="LoginSide">
                <SignIn />
                <div className="TextAndBoxes">
                <TextBoxes values="Username"/>
                <TextBoxes values="Password"/>
                </div>
                <Google />
                <Submit />
            </div>
            <div className="RegisterSide">
                <RegisterText />
                <RegisterTextBelow />
                <RegisterButton />
            </div>
        </div>
    );
}