import { BrowserRouter as Router, Route, Routes ,useLocation,Navigate}from 'react-router-dom';
import HomePage from "./pages/HomePage";
import SignUpForm from './components/SignUpForm';
import ForgotPassword from "./pages/ForgotPassword";
import ProfilePage from "./pages/ProfilePage";
import { useSelector,useDispatch } from 'react-redux';
import { authActions } from './store/auth-redux';
import MyNavbar from './components/MyNavbar';
function App(){
  const isLoggedIn=useSelector(state=>state.auth.isLoggedIn)
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