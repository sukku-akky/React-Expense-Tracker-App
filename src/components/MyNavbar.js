import React, { useContext ,useState,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import './MyNavbar.css';
import { useDispatch,useSelector } from 'react-redux';

import { authActions } from '../store/auth-redux';
const MyNavbar = () => {
  const dispatch=useDispatch();
  const expensesList=useSelector(state=>state.exp.expensesList);
  const[isDarkMode,setIsDarkMode]=useState(false);
  const isLoggedIn = useSelector(state=>state.auth.isLoggedIn)

  const logoutHandler = () => {
    dispatch(authActions.logout())
  };

  const toggleTheme=()=>{
    setIsDarkMode((prevMode)=>!prevMode)
  }

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const downloadFile=()=>{
    const csvRows = [];
    const headers = ['Amount', 'Description', 'Category'];
    csvRows.push(headers.join(',')); // Add headers

    expensesList.forEach(exp => {
      const values = [exp.amount, exp.description, exp.category];
      csvRows.push(values.join(',')); // Add each expense as a row
    });

    const csvString = csvRows.join('\n'); // Join rows with a newline
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'expenses.csv'; // Set the file name to .csv
    document.body.appendChild(a);
    a.click(); // Trigger the download
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Free up memory

  }

  return (
    <nav className="navbar">
      <ul>
        {isLoggedIn && (
          <li>
            <NavLink to="/"  activeClassName="active">
              Home
            </NavLink>
          </li>
        )}

        {!isLoggedIn && (
          
          <li>
            <NavLink to="/auth" activeClassName="active">
              Login
            </NavLink>
          </li>
        )}

        {isLoggedIn && (
          <>
            {/* <li>
                <NavLink to="/profile" >
                    Profile
                </NavLink>
            </li> */}
            <li>
              <button onClick={logoutHandler} className="logout-button">
                Logout
              </button>
            </li>
            <li>
            <button className="theme-toggle-button" onClick={toggleTheme}>
             {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button>
            </li>
            <li>
              <a id="a1"className='download-btn' onClick={downloadFile} >
                Download File
              </a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default MyNavbar;
