import React,{useContext} from "react";
import { ExpenseContext } from "../../store/expense-context";
import "./ExpenseForm.css";
const ExpenseForm=()=>{
    const expenseCtx=useContext(ExpenseContext);

    const{expense,setExpense,isEditing,edit,selectedExpense,add}=expenseCtx;

    const handleSubmit=(e)=>{
        e.preventDefault();
        if (isEditing && selectedExpense) {
          
          edit(selectedExpense.id, expense);
          
      } else {
          add(expense);
          
          
      }
      setExpense({amount:'',description:'',category:'food'});


    }
  

    const handleInputChange=(e)=>{
        setExpense({
            ...expense,
            [e.target.name]:e.target.value,
        })
    }

   

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

            <button type="submit" className="submit-btn">{isEditing ? "update" :"add"}</button>
          </form>
    )

}

export default ExpenseForm;