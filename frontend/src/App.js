import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from './Component/Home';
import About from './Component/About';
import Shop from './Component/Shop';
import Services from './Component/Services';
import SignIn from './Component/SignIn';
import Blog from './Component/Blog';
import Contact from './Component/Contact';
import Cart from './Component/Cart';
import CreateAccount from './Component/CreateAccount';
import Checkout from './Component/CheackOut';
import ThankYou from './Component/ThankYou';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from './Component/PasswordReset';
import ResetPassword from './Component/ResetPassword';


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Layout/>}>
      <Route index element={<Home/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/shop' element={<Shop/>}></Route>
      <Route path='/services' element={<Services/>}></Route>
      <Route path='/Blog' element={<Blog/>}></Route>
      <Route path='/Contact' element={<Contact/>}></Route>
      <Route path='/signin' element={<SignIn/>}></Route>
      <Route path='/CreateAccount' element={<CreateAccount/>}></Route>
      <Route path='/Cart' element={<Cart/>}></Route>
      <Route path='/CheckOut' element={<Checkout/>}></Route>
      <Route path='/ThankYou' element={<ThankYou/>}></Route>
      <Route path='/ForgotPassword' element={<ForgotPassword/>}></Route>
      <Route path='/reset-password' element={<ResetPassword/>}></Route>
      </Route>
    </Routes>

    <ToastContainer/>
    </>
  )
}

export default App;
