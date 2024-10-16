import React, { useState,useContext } from 'react';
import './SignUpForm.css';
import { AuthContext } from '../store/auth-context';
import {useNavigate} from "react-router-dom";
const SignUpForm = () => {
    const authCtx=useContext(AuthContext);
    const[isLogin,setIsLogin]=useState(true);
    const navigate=useNavigate();
    
    const[isLoading,setIsLoading]=useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');

  const switchAuthModeHandler=()=>{
    setIsLogin((prevState)=>{
         return !prevState
    })
}

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const forgotPasswordHandler=()=>{
    navigate('/forgot-password')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = formData;

    if (!email || !password) {
      setError('Please fill out all fields.'); // Updated to only check email and password
      return;
    }

  if (!isLogin && !confirmPassword) {
    setError('Please fill out all fields.'); // Check confirmPassword only when not logging in
    return;
  }

  if (!isLogin && password !== confirmPassword) {
    setError('Passwords do not match.');
    return;
  }

   
    let url;

    if(isLogin){
        url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDB-LVwyV1VaSLT98Zaczb2xYKl7VsLy6c"

    } else{
        url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDB-LVwyV1VaSLT98Zaczb2xYKl7VsLy6c"

    }

    fetch(url,
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
    
    .then(res=>{
        setIsLoading(false);
        if(res.ok){
            return res.json();

        } else{
            return res.json().then(data=>{
                let errorMessage="Authentication failed";

                if(data && data.error && data.error.message){
                    errorMessage=data.error.message;
                }
                alert(errorMessage);
            })
        }
    }).then(data=>{
        authCtx.login(data.idToken,formData.email);
        navigate('/');
        setTimeout(() => {
            authCtx.logout();
        }, 300000);
        
        
    }) .catch((error)=>{
        alert(error.message)
    })



    // Handle form submission
    alert('Sign up successful!');
    setError(''); // Clear error message
  };


  return (
    <div className="signup-container">
      <div className="signup-form">
        {<h1>{isLogin? "Login":"Sign up"}</h1>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {!isLogin && <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />}
          {error && <p className="error">{error}</p>}
          <button type="submit" className='button'>{isLogin ? "Login":"Sign up"}</button>
          {isLogin && <a href="#" onClick={forgotPasswordHandler}>Forgot password?</a>}

        </form>

      </div>
      <button
        type="button"
        onClick={switchAuthModeHandler}
        className='login-box'>
        {isLogin?"Create new account":"Login with existing account"}
      </button>


    </div>
  );
};

export default SignUpForm;
