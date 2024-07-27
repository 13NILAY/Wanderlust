import './App.css';
import React from 'react';
import Navbar from './navbar';
import Footer from './footer';
import { ThemeProvider } from '@emotion/react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Theme from './Theme';
import Listings from './Listing/listings';
import Show from './Listing/show';
import Edit from './Listing/Edit';
import New from './Listing/New';
import Signup from './User/Signup';
import Login from './User/Login';


const App = () => {

  return (
    <div className='App'>
        
        <Router>
        <Navbar/>
          <Routes>
             {/*Listing routes*/}
             <Route path='/' element={<Listings/>}/>
             <Route path='/new' element={<New/>}/>
             <Route path='/Signup' element={<Signup/>} />
             <Route path='/Login' element={<Login/>}/>
             <Route path='/:id' element={<Show/>}/>
             <Route path='/:id/edit' element={<Edit/>}/>
          </Routes>
          <Footer/>
        </Router>
        
    </div>
  )
}

export default App
