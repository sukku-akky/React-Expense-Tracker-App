import React, { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteExpenseDataFromEnd } from "../../store/expense-actions";
import { expenseActions } from "../../store/expense-redux";
import "./ExpensesList.css";

const ExpensesList = () => {
  const dispatch = useDispatch();
  const expensesList=useSelector(state=>state.exp.expensesList)
  const totalAmount=useSelector(state=>state.exp.totalAmount)
  const loading=useSelector(state=>state.exp.loading);
  const error=useSelector(state=>state.exp.error)
  

  // Fetch expenses from the server when the component mounts
  const editHandler=(exp)=>{
    dispatch(expenseActions.editExpense(exp));
  
    dispatch(deleteExpenseDataFromEnd(exp));

  }

  const deleteHandler=(exp)=>{
    dispatch(deleteExpenseDataFromEnd(exp))
    

  }
  
  

  return (
    <div className="expenses-list">
      <h3>Added Expenses:</h3>
      <button className="btn">Total Amount:{totalAmount}</button>
      {totalAmount>10000 && <button className="btn-p">Activate Premium</button>}
      {loading && <p>Loading expenses...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && expensesList.length > 0 ? (
        <ul>
          {expensesList.map((exp, index) => (
            <li key={index}>
              <span>
                <strong>Amount:</strong> {exp.amount || 'N/A'}{" "}
              </span>
              <span>
                <strong>Description:</strong> {exp.description || 'no description'}{" "}
              </span>
              <span>
                <strong>Category:</strong> {exp.category || 'uncategorised'}{" "}
              </span>
              <span>
                <button onClick={() => deleteHandler(exp)} className="btn">Delete</button>
              </span>
              <span>
                <button onClick={()=>{editHandler(exp)}} className="btn">Edit</button>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No expenses added yet!</p>
      )}
    </div>
  );
};

export default ExpensesList;
