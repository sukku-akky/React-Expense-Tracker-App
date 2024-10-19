import React,{useContext, useEffect} from "react";
import Profile from "./components/Profile";
import SignUpForm from "./components/SignUpForm";
import MyNavbar from "./components/MyNavbar";
import { BrowserRouter as Router, Route, Routes ,useLocation,Navigate}from 'react-router-dom';
import HomePage from "./pages/HomePage";
import { useDispatch,useSelector } from "react-redux";
import { authActions } from "./store/auth-redux";
import ForgotPassword from "./pages/ForgotPassword";
import ProfilePage from "./pages/ProfilePage";
import { fetchDataFromEnd } from "./store/expense-actions";
import userEvent from "@testing-library/user-event";
function App(){
  const dispatch=useDispatch();
  const isLoggedIn=useSelector(state=>state.auth.isLoggedIn);
  useEffect(()=>{
    dispatch(fetchDataFromEnd());

  },[])
 
  return (
    <>
    <Router>
      <MyNavbar/>
      
      <Routes>
        <Route path="/" element={isLoggedIn ? <HomePage/>: <Navigate to="/auth"/>}/>
        <Route path="/auth" element={<SignUpForm/>}/>
        <Route path="/profile" element={isLoggedIn ? <ProfilePage/> :<Navigate to="/auth"/>}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
      

    </Router>

    </>

  )

}

export default App;