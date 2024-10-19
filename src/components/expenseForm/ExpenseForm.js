import React, { useContext, useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import "./ExpenseForm.css";
import { addExpenseDataToEnd } from "../../store/expense-actions";
import { expenseActions } from "../../store/expense-redux";
const ExpenseForm = () => {
  const dispatch = useDispatch();
  const selectedExpense=useSelector(state=>state.exp.selectedExpense)
  const isEditing=useSelector(state=>state.exp.isEditing)
  
  // Local state to manage form inputs
  const [expense, setExpense] = useState({
    amount: "",
    description: "",
    category: "Food",
  });

  // When editing, populate the form with the selected expense's details
  useEffect(() => {
    if (isEditing && selectedExpense) {
      setExpense({
        amount: selectedExpense.amount,
        description: selectedExpense.description,
        category: selectedExpense.category,
      });
    } else {
      setExpense({
        amount: "",
        description: "",
        category: "Food",
      });
    }
  }, [isEditing, selectedExpense]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addExpenseDataToEnd(expense));
    if(isEditing){
      dispatch(expenseActions.setEditing());
    }
    
    

    // Reset the form and context
    setExpense({ amount: "", description: "", category: "Food" });
  
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Amount Spent:</label>
        <input
          type="number"
          name="amount"
          value={expense.amount}
          onChange={handleInputChange}
          placeholder="Enter amount"
          required
        />
      </div>

      <div className="form-group">
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={expense.description}
          onChange={handleInputChange}
          placeholder="Description of expense"
          required
        />
      </div>

      <div className="form-group">
        <label>Category:</label>
        <select
          name="category"
          value={expense.category}
          onChange={handleInputChange}
        >
          <option value="Food">Food</option>
          <option value="Petrol">Petrol</option>
          <option value="Salary">Salary</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <button type="submit" className="submit-btn">
        {isEditing ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default ExpenseForm;
