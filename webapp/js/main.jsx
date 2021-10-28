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
import Friends from "./friends/friends";
import UserPage from "./users/userpage";

export default function App() {
  return (
    <div>
      <Router>
        <Switch location={location}>
          <Route exact path="/">
            <Index/>
          </Route>
          <Route exact path="/users/">
            <Users/>
          </Route>
          <Route path="/users/:username/" component={UserPage}/>
          <Route exact path="/profile/">
            <Profile/>
          </Route>
          <Route exact path="/friends/">
            <Friends/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

ReactDOM.render(<App/>, document.getElementById('root'));
