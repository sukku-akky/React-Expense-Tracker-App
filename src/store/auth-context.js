import React,{useState} from "react";

const AuthContext=React.createContext({
    token:'',
    isLoggedIn:false,
    email:'',
    login:()=>{},
    logout:()=>{},
    
})

const AuthContextProvider=(props)=>{
    const initialToken=localStorage.getItem("token");
    const[token,setToken]=useState(initialToken);
    const[email,setEmail]=useState('');
    

    const userIsLoggedIn=!!token;

    const loginHandler=(token,email)=>{
        localStorage.setItem("token",token);
        setToken(localStorage.getItem("token"));
        setEmail(email);
    }

    const logoutHandler=()=>{
        setToken(localStorage.removeItem("token"));
        setEmail('');
    }

    const authContext={
        token:token,
        isLoggedIn:userIsLoggedIn,
        email:email,
        login:loginHandler,
        logout:logoutHandler,
        
    }
    return (
        <AuthContext.Provider value={authContext}>{props.children}</AuthContext.Provider>
    )

}

export {AuthContext,AuthContextProvider};