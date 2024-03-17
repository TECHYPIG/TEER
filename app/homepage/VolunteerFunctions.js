import "./VolunteerFunctions.css"

export function Name(){
    return(
        <h2 className="Name">Volunteering Opportunities</h2>
    );
}
export function DynamicData(Company, Date,Location,Role){
    return(
        <div className="Opportunities">
            <div className="CompanyDateLoc">
            <p>{Company}</p>
            <p>{Date}</p>
            <p>{Location}</p>
            </div>
            <p>{Role}</p>
        </div>

    );
}