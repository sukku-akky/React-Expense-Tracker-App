import React, { useState } from 'react';
import './SignUpForm.css';

const SignUpForm = () => {
    const[isLogin,setIsLogin]=useState(false);
    const[isLoading,setIsLoading]=useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = formData;

    if (!email || !password || !confirmPassword) {
      setError('Please fill out all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if(isLogin){

    } else{
        fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBCTNjpWdm0Uxm3FMVxPa-mgrzjJ3LVkrQ",
        {
            method:"POST",
            body:JSON.stringify(formData),
            headers:{
                'Content-Type':'application/json'
            }
        }
        )
        
        .then(res=>{
            setIsLoading(false);
            if(res.ok){
                console.log("user has successfully signedup")
            } else{
                return res.json().then(data=>{
                    let errorMessage="Authentication failed";
                    if(data && data.error && data.error.message){
                        errorMessage=data.error.message;
                    }
                    alert(errorMessage);
                })
            }
        }). catch(error=>{
            console.log(error.message)
        })
    }

    // Handle form submission
    alert('Sign up successful!');
    setError(''); // Clear error message
  };


  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1>Sign up</h1>
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" className='button'>Sign Up</button>
        </form>

      </div>
      <div className="login-box">
        <p>Have an account? Login</p>
      </div>

    </div>
  );
};

export default SignUpForm;
