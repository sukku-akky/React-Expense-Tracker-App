import React, { createContext, useState, useEffect } from "react";

// Create the ExpenseContext with default values
export const ExpenseContext = createContext({
  expense: {
    amount: '',
    description: '',
    category: 'Food',
  },
  expensesList: [],
  add:()=>{},
  delete:()=>{},
  edit:()=>{},
  emailVerified: false,
  ssEditing:false,
  setExpense: () => {},
  selectedExpense:{},
  setExpensesList: () => {},
  selectExpense:()=>{},
  sendEmailVerification: () => {},
  checkEmailVerification: () => {},
});

// ExpenseProvider component to provide context to children components
const ExpenseProvider = (props) => {
  const [expense, setExpense] = useState({
    amount: '',
    description: '',
    category: 'Food',
  });
  const[selectedExpense,setSelectedExpense]=useState(null);
  const[isEditing,setisEditing]=useState(false)
  const [expensesList, setExpensesList] = useState([]);
  const [emailVerified, setEmailVerified] = useState(false);
  const token = props.token; // Assuming the token is passed as a prop

  const addExpenseHandler=(expense)=>{
    fetch("https://expensetracker-27a49-default-rtdb.firebaseio.com/expenses.json",{
        method:"POST",
        body:JSON.stringify({
            expense
        }),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(res=>{
        if(res.ok){
            setExpensesList([...expensesList,expense]);
            setExpense({amount:'',description:'',category:'food'});

        } else{
            const data=res.json();
            console.log(data)
        }
    }) .catch((e)=>{
        console.log(e);
    })


  }

  const deleteExpenseHandler=(id)=>{
    fetch(`https://expensetracker-27a49-default-rtdb.firebaseio.com/expenses/${id}.json`, {
        method: "DELETE",
      }).then(res => {
        if (res.ok) {
          // Remove the deleted expense from the list
          setExpensesList(expensesList.filter(exp => exp.id !== id));
          
        }
      }).catch((e) => {
        console.log(e);
      });

  }

  const editExpenseHandler=(id,updatedExpense)=>{
    fetch(`https://expensetracker-27a49-default-rtdb.firebaseio.com/expenses/${id}.json`, {
        method: "PUT",
        body: JSON.stringify({ expense: updatedExpense }),
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(res => {
        if (res.ok) {
          // Update the expense in the list
          setExpensesList(expensesList.map(exp => (exp.id === id ? { ...updatedExpense, id } : exp)));
          setSelectedExpense(null);
          setisEditing(false)
        }
      }).catch((e) => {
        console.log(e);
      });

  }

  const selectExpenseHandler=(id)=>{
    const toBeSelectedExpense=expensesList.find(exp=>exp.id===id);
    
    if (toBeSelectedExpense) {
        setSelectedExpense(toBeSelectedExpense);
        setExpense({
            amount: toBeSelectedExpense.amount,
            description: toBeSelectedExpense.description,
            category: toBeSelectedExpense.category,
        });
    }
    setisEditing(true);
  }

  // Fetch expenses from the API
  const fetchExpenses = async () => {
    try {
      const response = await fetch("https://expensetracker-27a49-default-rtdb.firebaseio.com/expenses.json");
      const data = await response.json();
      const loadedExpenses = Object.keys(data).map(key => ({
        id: key,
        ...data[key].expense,
      }));
      setExpensesList(loadedExpenses);
    } catch (e) {
      console.log(e);
    }
  };

  // Check email verification status
  const checkEmailVerification = async () => {
    const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDB-LVwyV1VaSLT98Zaczb2xYKl7VsLy6c", {
      method: "POST",
      body: JSON.stringify({ idToken: token }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
   
    if (data.users && data.users.length > 0) {
        const userData = data.users[0];
        setEmailVerified(userData.emailVerified || false);
      } else {
        console.log("No users found in the response.");
        setEmailVerified(false); // Handle case where no users are returned
      }
  };

  // Send email verification
  const sendEmailVerification = async () => {
    try {
      const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDB-LVwyV1VaSLT98Zaczb2xYKl7VsLy6c", {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY-EMAIL",
          idToken: token,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const data = await response.json();
        let errorMessage = "Failed to send verification email";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }
      alert("Check your email for the verification link.");
    } catch (e) {
      console.log(e.message);
    }
  };

  // Fetch expenses when component mounts
  useEffect(() => {
    fetchExpenses();
  }, []);

  
  const expenseContextValue = {
    expense:expense,
    setExpense:setExpense,
    expensesList:expensesList,
    add:addExpenseHandler,
    delete:deleteExpenseHandler,
    selectedExpense:selectedExpense,
    isEditing:isEditing,
    edit:editExpenseHandler,
    setExpensesList:setExpensesList,
    selectExpense:selectExpenseHandler,
    emailVerified:emailVerified,
    sendEmailVerification:sendEmailVerification,
    checkEmailVerification:checkEmailVerification,
  };

  
  return (
    <ExpenseContext.Provider value={expenseContextValue}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;
