import React from 'react';
import './App.css';
import {Route,BrowserRouter} from "react-router-dom";
import Home from "./components/Home";
import Update from "./components/Update";
import Delete from "./components/Delete";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path ="/" exact  component = {Home}/>
        <Route path = "/updatemovie/:id" exact render = {(props) => <Update {...props}/>}></Route>
        <Route path = "/deletemovie/:id" exact render = {(props) => <Delete {...props}/>}></Route>
      </BrowserRouter>
    </div>
  );
}
export default App;
