import React,{useContext} from "react";
import SignUpForm from "./components/SignUpForm";
import MyNavbar from "./components/MyNavbar";
import { BrowserRouter as Router, Route, Routes ,useLocation,Navigate}from 'react-router-dom';
import HomePage from "./pages/HomePage";
import { AuthContext } from "./store/auth-context";
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
      </Routes>
      

    </Router>

    </>

  )

}

export default App;