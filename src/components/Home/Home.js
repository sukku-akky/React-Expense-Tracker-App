import React, { useState,useContext, useEffect } from "react";
import "./Home.css"
import { ExpenseContext } from "../../store/expense-context";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";
import ExpenseForm from "../expenseForm/ExpenseForm";
import ExpensesList from "../Expenses/ExpensesList";

const Home=()=>{
    const navigate=useNavigate();
    const authCtx=useContext(AuthContext);
    const expenseCtx=useContext(ExpenseContext);
   
  

    

  

  

    useEffect(()=>{
        expenseCtx.checkEmailVerification();
    },[expenseCtx.emailVerified])


    const handleClick=()=>{
        navigate('/profile')

    }

    return (
        <>
        <div className="bt-p">
            <h1>Welcome to Expense Tracker</h1>
            <button className="profile-button" onClick={handleClick}>Your profile is incomplete.<span>Complete now</span></button>
            {!expenseCtx.emailVerified && <button className="profile-button" onClick={expenseCtx.sendEmailVerification}>Verify your Email</button>}
            

        
        </div>
        <hr/>
        <ExpenseForm/>
       
        <ExpensesList/>

        
        </>
        
    )

}

export default Home;