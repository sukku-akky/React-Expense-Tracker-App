import React, { useState,useContext, useEffect } from 'react';
import './SignUpForm.css';
import { authActions } from '../store/auth-redux';
import { useDispatch,useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom";
import { signUptoDatabase,logIntoDatabase } from '../store/auth-actions';

const SignUpForm = () => {
   
    
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const isLoggedIn=useSelector(state=>state.auth.isLoggedIn);
    const token=useSelector(state=>state.auth.token)
    const[isLogin,setIsLogin]=useState(true);
    
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

  const handleChange =  async  (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const forgotPasswordHandler=()=>{
    navigate('/forgot-password')
  }

  const handleSubmit =async (e) => {
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

   
  try {
    if (isLogin) {

      // Dispatch the login action
      await dispatch(logIntoDatabase(formData));
    } else {
      // Dispatch the sign-up action
       await dispatch(signUptoDatabase({email:formData.email,password:formData.password}));
    }

    
  } catch (error) {
    setError('Failed to authenticate. Please try again.');
  }
 
  }
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]); 


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
