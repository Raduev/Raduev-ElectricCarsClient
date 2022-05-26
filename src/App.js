import React from "react";
import Main from "./Pages/Main";
import Layout from "./Layout";
import "./App.css"
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ByCar from "./Pages/ByCar";

const App = () => {
  return (
    <div className="AppDiv">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path='/' element={<Main />}/>
        <Route path='/ByCar/:id' element={<ByCar/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
