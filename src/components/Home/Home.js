import React from "react";
import "./Home.css"
import { useNavigate } from "react-router-dom";

const Home=()=>{
    const navigate=useNavigate();

    const handleClick=()=>{
        navigate('/profile')

    }

    return (
        <div className="bt-p">
            <h1>Welcome to Expense Tracker</h1>
            <button className="profile-button" onClick={handleClick}>Your profile is incomplete.<span>Complete now</span></button>
        
        </div>
        
    )

}

export default Home;