import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loadUserProfile } from './redux/slices/authSlice';
import { Box } from '@mui/material';
import { Navigate } from "react-router-dom";
import Header from './components/Header';
import Home from './pages/Home'
import Login from './pages/Login'
import ProductDetail from './pages/ProductDetail'
import RegisterPage from './pages/Register';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Footer from './components/Footer';
import ShippingAddresses from './pages/ShippingAddress';
import Checkout from './pages/Checkout';
import Purchases from './pages/Purchases';
import SearchResultsPage from './pages/SearchResult';

const App = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(loadUserProfile());
    }
  }, [token, dispatch]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<RegisterPage />}></Route>
        <Route path='/wishlist'element={<Wishlist />}></Route>
        <Route path='/productdetail/:id' element={<ProductDetail />} />
        <Route path='/shippingaddress' element={<ShippingAddresses />}/>
        <Route path='/checkout' element={<Checkout />}/>
        <Route path='/purchases' element={<Purchases />}/>
        <Route path="/productlist" element={<SearchResultsPage/>}/>
      </Routes>
        
      <Footer/>
    </Router>

    
  );
};

export default App;
