import React,{useContext} from "react";
import Profile from "./components/Profile";
import SignUpForm from "./components/SignUpForm";
import MyNavbar from "./components/MyNavbar";
import { BrowserRouter as Router, Route, Routes ,useLocation,Navigate}from 'react-router-dom';
import HomePage from "./pages/HomePage";
import { AuthContext } from "./store/auth-context";
import ForgotPassword from "./pages/ForgotPassword";
import ProfilePage from "./pages/ProfilePage";
function App(){

  const authCtx=useContext(AuthContext);
  const isLoggedIn=authCtx.isLoggedIn;
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