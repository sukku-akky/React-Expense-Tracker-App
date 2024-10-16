import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    // Firebase password reset API
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDB-LVwyV1VaSLT98Zaczb2xYKl7VsLy6c", {
      method: "POST",
      body: JSON.stringify({
        requestType: "PASSWORD_RESET",
        email
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then(data => {
            let errorMessage = "Failed to send reset email";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then(() => {
        setMessage("A password reset link has been sent to your email!");
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  };

  return (
    <div className="forgot-password-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleChange}
          required
        />
        <button type="submit" className="button" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </button>
        {message && <p className="message">{message}</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
