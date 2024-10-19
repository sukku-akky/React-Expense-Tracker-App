import { createSlice } from "@reduxjs/toolkit"

const initialExpenseState={
    expense:{
        amount:'',
        description:'',
        category:'food',
    },
    totalAmount:0,
    expensesList:[],
    emailVerified:false,
    isEditing:false,
    selectedExpense:{},
    loading:'',
    error:''
}

 export const expenseSlice=createSlice({
    name:'expense',
    initialState:initialExpenseState,
    reducers:{
        addExpense(state,action){
            const {amount}=action.payload;
            state.expensesList.push(action.payload);
            
        },
        deleteExpense(state,action){
            
            const {id}=action.payload;
            state.expensesList=state.expensesList.filter(exp=>exp.id!==id)
            
        },
        editExpense(state,action){
            const{id,amount,description,category}=action.payload;
            state.selectedExpense = {
                id:id,
                amount:amount,
                description:description,
                category:category,
            };
            state.expensesList=state.expensesList.filter(exp=>exp.id!==id)
            state.isEditing = true
        
        
        
        },
        setEmailVerified(state,action){
            state.emailVerified=action.payload;

        },
        setEditing(state){
            state.isEditing=!state.isEditing
        },
        replaceExpenses(state,action){
            state.expensesList=action.payload

        },
        setTotalAmount(state,action){
            state.totalAmount=action.payload

        }

        
           
        }


    }
)

export const expenseActions=expenseSlice.actions;