import React, {  useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { expenseActions } from "../../store/redux-store";
import ExpenseForm from "../expenseForm/ExpenseForm";
import ExpensesList from "../Expenses/ExpensesList";
import { sendEmailVerificationToEnd } from "../../store/expense-actions";
import { checkEmailVerificationToEnd } from "../../store/expense-actions";

const Home=()=>{
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const token=useSelector(state=>state.auth.token)
    const emailVerified=useSelector(state=>state.exp.emailVerified)
   
    useEffect(()=>{
        checkEmailVerificationToEnd();
    },[emailVerified])


    const handleClick=()=>{
        navigate('/profile')

    }
    const handleVerifyEmail=()=>{
        dispatch(sendEmailVerificationToEnd(token));
    }

    return (
        <>
        <div className="bt-p">
            <h1>Welcome to Expense Tracker</h1>
            <button className="profile-button" onClick={handleClick}>Your profile is incomplete.<span>Complete now</span></button>
            {!emailVerified && <button className="profile-button" onClick={handleVerifyEmail}>Verify your Email</button>}
            

        
        </div>
        <hr/>
        <ExpenseForm/>
       
        <ExpensesList/>

        
        </>
        
    )

}

export default Home;