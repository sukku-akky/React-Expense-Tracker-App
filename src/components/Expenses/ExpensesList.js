import React,{useContext, useEffect} from "react";
import {ExpenseContext} from "../../store/expense-context"
import "./ExpensesList.css"
const ExpensesList=()=>{
    const expenseCtx=useContext(ExpenseContext);
    console.log(expenseCtx);

    

    return (
        <>
          <div className="expenses-list">
            <h3>Added Expenses:</h3>
            {expenseCtx.expensesList.length > 0 ? (
              <ul>
                {expenseCtx.expensesList.map((exp, index) => (
                  <li key={index}>
                    <span><strong>Amount:</strong> {exp.amount} </span>
                    <span><strong>Description:</strong> {exp.description} </span>
                    <span><strong>Category:</strong> {exp.category} </span>
                    <span><button onClick={()=>expenseCtx.delete(exp.id)}>Delete</button></span>
                    <span><button onClick={()=>expenseCtx.selectExpense(exp.id)}>Edit</button></span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No expenses added yet!</p>
            )}
          </div>
        </>
    )

}

export default ExpensesList;