import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Index from './index/index';
import Users from './users/users';
import Profile from './profile/profile';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Index/>
        </Route>
        <Route exact path="/users/">
          <Users/>
        </Route>
        <Route exact path="/profile/">
          <Profile/>
        </Route>
      </Switch>
    </Router>
  );
}

ReactDOM.render(<App/>, document.getElementById('root'));
