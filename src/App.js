//import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Booking from './pages/Booking';
import Home from './pages/Home';
import '@ant-design/v5-patch-for-react-19';
import UserBooking from './pages/UserBooking';
import AddCar from './pages/AddCar';
import AdminHome from './pages/AdminHome';
import EditCar from './pages/EditCar';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element= { <ProtectedRoute element={<Home/>} /> } />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/booking/:carid' element= { <ProtectedRoute element={<Booking/>} /> } />
        <Route path='/userbooking' element= { <ProtectedRoute element={<UserBooking/>} /> } />
        <Route path='/addcar' element= { <ProtectedRoute element={<AddCar/>} /> } />
        <Route path='/editcar/:carid' element= { <ProtectedRoute element={<EditCar/>} /> } />
        <Route path='/admin' element= { <ProtectedRoute element={<AdminHome/>} /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export function ProtectedRoute({element}) 
{
  const user = localStorage.getItem('user');

  return user ? element : <Navigate to="/login" replace />
}