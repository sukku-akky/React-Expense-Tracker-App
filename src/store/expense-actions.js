import { expenseActions } from "./expense-redux";
import { useDispatch } from "react-redux";

export const addExpenseDataToEnd=(expenseData)=>{
    return async (dispatch,getState)=>{
        const sendExpenseToEnd=async ()=>{
            const currentTotalAmount=getState().exp.totalAmount;
            const updatedTotalAmount=currentTotalAmount+parseFloat(expenseData.amount)
            const response=await fetch("https://expensetracker-27a49-default-rtdb.firebaseio.com/expenses.json",{
                method:"POST",
                body:JSON.stringify({
                    ...expenseData,
                    totalAmount:updatedTotalAmount,
                }),
                headers:{
                    'Content-type':'application/json'
                },
            });
            if(!response.ok){
                throw new Error ('Failed to send expense data!')
            };

            const data=await response.json();
            return {id:data.name,updatedTotalAmount};
        }
        try{
            const {id,updatedTotalAmount}=await sendExpenseToEnd();

            dispatch(expenseActions.addExpense({
                ...expenseData,
                id:id,
            }));
            dispatch(expenseActions.setTotalAmount(updatedTotalAmount));

        } catch(e){
            console.log("Error adding expense:", e);

        }

    }
}

export const deleteExpenseDataFromEnd=(exp)=>{
    const{id}=exp;
    return async (dispatch,getState)=>{
        const deleteExpenseData=async ()=>{
            const currentTotalAmount=getState().exp.totalAmount;
            const updatedTotalAmount=currentTotalAmount-parseFloat(exp.amount)
        const response=await fetch(`https://expensetracker-27a49-default-rtdb.firebaseio.com/expenses/${id}.json`,
            {
                method:"DELETE"
            }
            
        )
        if(!response.ok){
           throw new Error('failed to delete expense')
        }
        return updatedTotalAmount;

    }
    try{
        const updatedTotalAmount=await deleteExpenseData();
        dispatch(expenseActions.deleteExpense(exp));
        dispatch(expenseActions.setTotalAmount(updatedTotalAmount));
    }catch(e){
        console.log(e.message)

    }


}
}



export const sendEmailVerificationToEnd=(token)=>{
    return async (dispatch)=>{
        const sendRequest =async()=>{
            const response=await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDB-LVwyV1VaSLT98Zaczb2xYKl7VsLy6c",{
                method: "POST",
                body: JSON.stringify({
                  requestType: "VERIFY-EMAIL",
                  idToken: token,
                }),
                headers: {
                  'Content-Type': 'application/json',
                },
              
            });
            if(!response.ok){
                throw new Error('failed to send verification request')
            }
        

        }
        try{
            
            await sendRequest();

        }catch(e){
            console.log(e.message);

        }

    }
}

export const checkEmailVerificationToEnd=(token)=>{
    
    return async (dispatch)=>{
        const sendRequestCheck=async ()=>{
            
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
                dispatch(expenseActions.setEmailVerified(userData.emailVerified || false));
              } else {
                console.log("No users found in the response.");
                dispatch(expenseActions.setEmailVerified(false)); // Handle case where no users are returned
              }
        }
        try{
            await sendRequestCheck();

        }catch(e){
            console.log(e.message)

        }

    }
}


export const fetchDataFromEnd=()=>{
    return async (dispatch)=>{
        const getDataFromEnd=async ()=>{
            const response=await fetch("https://expensetracker-27a49-default-rtdb.firebaseio.com/expenses.json");
            const data = await response.json();
            const loadedExpenses=Object.keys(data).map(key=>({
                id:key,
                ...data[key],
            }));
            const totalAmount = loadedExpenses.reduce((sum, exp) => {
                return sum + parseFloat(exp.amount);
              }, 0);
        
              return { loadedExpenses, totalAmount };
        }
        try{
           const {loadedExpenses,totalAmount}= await getDataFromEnd();
           dispatch(expenseActions.replaceExpenses(loadedExpenses));
           dispatch(expenseActions.setTotalAmount(totalAmount));

        }  catch(e){
            console.log('failed fetching')
        }

    }
}