import React, { Component } from 'react';
import logo from './assets/logo.jpg';
import './App.css';
import { Redirect, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './components/Home';
import Product from './components/Product';
let greeting = '';
let productId;
class App extends Component {

  redirectToHomePage = () => {
    return(<Redirect to="/" />)
  }
  render() {
    var today = new Date()
    var curHr = today.getHours()

    if (curHr < 12) {
      greeting = 'Good Morning';
    } else if (curHr < 18) {
      greeting = 'Good Afternoon';
    } else {
      greeting = 'Good Evening';
    }
    return (
      <div>
        <div className="App-header">
          <a href="/">
          <h3 style={{ fontWeight: 'bold', color: 'darkred' }}>ShopBridge</h3>
          </a>
          <h5 style={{marginLeft: 1150}}>{greeting}</h5>
        </div>
        <hr style={{ backgroundColor: 'brown', height: 5, marginTop: '-5px' }} />
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/productdetail" component={Product} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
