import './App.css';
import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Theme from './Theme';
import Listings from './Listing/listings';
import Show from './Listing/show';
import Edit from './Listing/Edit';
import New from './Listing/New';


const App = () => {

  return (
    <div className='App'>
        <Router>
          <Routes>
             {/*Listing routes*/}
             <Route path='/listing/' element={<Listings/>}/>
             <Route path='/listing/new' element={<New/>}/>

             <Route path='/listing/:id' element={<Show/>}/>
             <Route path='/listing/:id/edit' element={<Edit/>}/>
          </Routes>
        </Router>
    </div>
  )
}

export default App
