import followers from './Followsug.js'
import styles from './Newfollow.module.css'
import { useState, useEffect } from 'react';
import ModalOpportunity from "@/app/homepage/Volunteer/VolunteerOppurtunityModal";

export default function NewFollow(){
    const FollowingList = followers();

    const [usernamesOfNonFollowers, setUsernamesOfNonFollowers] = useState([]);
    useEffect(() => {
        FollowingList.then((data) => {
            setUsernamesOfNonFollowers(data)
        })
    } , [])
    return (
    <div>
        {usernamesOfNonFollowers.map((value, index) => (

        <div key={index}>
            <h3>{value}</h3>
        </div>
    ))}
    </div>);
}
 
