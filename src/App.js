import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import './App.css';
import Login from './components/login/login';
import Registration from './components/login/registration';
import Navbar from "./components/navbar/navbar";
import ProductsPage from './components/pages/products';
import AddProductPage from './components/pages/addProduct';
import CartPage from './components/pages/cart';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
            <div className="container-md" style={{marginTop: "30px"}}>
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/registration" component={Registration}/>
                    <Route path="/products" component={ProductsPage}/>
                    <Route path="/add-product" component={AddProductPage}/>
                    <Route path="/cart" component={CartPage}/>
                </Switch>
            </BrowserRouter>
            </div>
      </div>
    );
  }
}

export default App;
