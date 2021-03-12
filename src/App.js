import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
import Games from './components/Games';
import Auth from './components/auth/Auth';

export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isPasswordVerified: false
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            {
              !this.isAuthentication() && <Route path='/' component={Auth} exact={true} />
            }
            {
              this.isAuthentication() && <Route path='/' component={Games} exact={true} />
            }
          </Switch>
        </div>
      </BrowserRouter>
    );
  }

  isAuthentication() {
    return localStorage.getItem("token");
  }
}
