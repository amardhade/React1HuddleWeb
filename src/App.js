import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
import Games from './components/games/Games';
import Auth from './components/auth/Auth';
import GamePreview from './components/gamePreview/GamePreview';
import GameListItem from './components/games/GameListItem';

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
              <Route path='/' component={Auth} exact={true} />
            }
            {
              <Route path='/games' component={Games} exact={true}/>
            }
            {
              <Route path='/games/:game_id' component={Games} exact={true}/>
            }
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
