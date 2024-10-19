
import { authActions } from "./auth-redux";


export const logIntoDatabase=(formData)=>{
    
    return async (dispatch)=>{
        const sendLoginRequest=async ()=>{
            const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDB-LVwyV1VaSLT98Zaczb2xYKl7VsLy6c',
                {
                    method:"POST",
                    body:JSON.stringify({
                        ...formData,
                        returnSecureToken:true
                    }),
                    headers:{
                        'Content-Type':'application/json'
                    }
                }

            )
            if(!response.ok){
                throw new Error('failed to login')
            }
            const data=await response.json();
            dispatch(authActions.login({email:formData.email,token:data.idToken}));
        
        setTimeout(() => {
            dispatch(authActions.logout());
        }, 300000);
        
        }
        try{
            const result=await sendLoginRequest();

        }catch(e){
            console.log(e.message)
        }
    }
    

}

export const signUptoDatabase=(formData)=>{
    return async (dispatch)=>{
        console.log("Sending request with data:", formData); 
        const sendSignUpRequest=async()=>{
            const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDB-LVwyV1VaSLT98Zaczb2xYKl7VsLy6c',
                {
                    method:"POST",
                    body:JSON.stringify({
                        ...formData,
                        returnSecureToken:true
                    }),
                    headers:{
                        'Content-Type':'application/json'
                    }
                }

            )
            if (!response.ok) {
                const errorData = await response.json(); // Log the error response
                console.error("Error response from Firebase:", errorData);
                throw new Error(errorData.error.message || 'Failed to sign up');
            }
            const data=await response.json();
            dispatch(authActions.login({email:formData.email,token:data.idToken}));
        
        setTimeout(() => {
            dispatch(authActions.logout());
        }, 300000);
        
        }
        try{
            const result=await sendSignUpRequest();
            

        }catch(e){
            console.log(e.message)

        }
    }
}