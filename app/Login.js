import {TextBoxes,SignIn,RegisterText,RegisterButton,RegisterTextBelow} from "@/app/LoginFunctions";
import "./Login.css"

export default function LoginCompiled(){
    return(
        <div className="MainBox">
            <div className="LoginSide">
                <SignIn />
                <div className="TextAndBoxes">
                <TextBoxes values="Username"/>
                </div>
            </div>
            <div className="RegisterSide">
                <RegisterText />
                <RegisterTextBelow />
                <RegisterButton />
            </div>
        </div>
    );
}