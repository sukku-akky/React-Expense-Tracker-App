import React, { useState,useContext, useEffect } from "react";
import "./Home.css"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";

const Home=()=>{
    const navigate=useNavigate();
    const authCtx=useContext(AuthContext);
    const token=authCtx.token;
    const[emailVerified,setEmailVerified]=useState(false);

    const checkEmailVerification=async()=>{

        const response=await fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDB-LVwyV1VaSLT98Zaczb2xYKl7VsLy6c",{
            method:"POST",
            body:JSON.stringify({
                idToken:token,
            }),
            headers:{
                'Content-Type':'application/json',
            }
        })
        const data=await response.json();
        const userData=data.users[0];
        setEmailVerified(userData.emailVerified || false)
    }

    const sendEmailVerification=async()=>{
        try{
            const response=await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDB-LVwyV1VaSLT98Zaczb2xYKl7VsLy6c",{
                method:"POST",
                body:JSON.stringify({
                    requestType:"VERIFY-EMAIL",
                    idToken:token

                }),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            if (!response.ok) {
                const data = await response.json();
                let errorMessage = "Failed to send verification email";
                if (data && data.error && data.error.message) {
                  errorMessage = data.error.message;
                }
                throw new Error(errorMessage);
              }
        
              alert("Check your email, you might have received a verification link. Click on it to verify.");

        } catch(e){
            console.log(e.message)

        }

    }

    useEffect(()=>{
        checkEmailVerification();
    },[emailVerified])


    const handleClick=()=>{
        navigate('/profile')

    }

    return (
        <div className="bt-p">
            <h1>Welcome to Expense Tracker</h1>
            <button className="profile-button" onClick={handleClick}>Your profile is incomplete.<span>Complete now</span></button>
            {!emailVerified && <button className="profile-button" onClick={sendEmailVerification}>Verify your Email</button>}

        
        </div>
        
    )

}

export default Home;