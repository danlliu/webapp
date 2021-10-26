import React, { useState } from 'react';
import {Link} from "react-router-dom";

import Icon from "../index/icon";
import UserProfile from "./userprofile";

export default function Users() {

  const [searchQuery, setQuery] = useState('');
  const [users, setUsers] = useState([]);

  // helper function
  let fetchUsers = (e) => {
    const query = e.target.value;
    if (query === '') {
      setUsers([]);
      return;
    }
    fetch(`/api/v1/users/?search=${query}`)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <h1>Related Pages:</h1>
      <div className="d-flex p-2">
        <Icon url='/' icon='bi-house-fill' title='Homepage' backgroundColor='#6c757d'/>
        <Icon url='/messaging/' icon='bi-chat' title='Messaging' backgroundColor='#0d6efd'/>
        <Icon url='/social/' icon='bi-hash' title='Social Media' backgroundColor='#dc3545'/>
        <Icon url='/friends/' icon='bi-people' title='Friends' backgroundColor='#ffc107'/>
        <Icon url='/email/' icon='bi-envelope' title='Email' backgroundColor='#20c997'/>
      </div>
      <hr/>
      <h1>Search Users</h1>

      <form onSubmit={e => e.preventDefault()}>
        <div className="mb-3 row">
          <div className="col-auto">
            <label htmlFor="searchLabel" className="col-form-label"><i className="bi-search" role="img"/></label>
          </div>
          <div className="col-auto">
            <input id="searchLabel"
                   className="form-control col-6"
                   type="text"
                   name="search"
                   value={searchQuery}
                   onChange={e => {setQuery(e.target.value); fetchUsers(e)}} />
          </div>
        </div>
      </form>

      <ul className="list-group list-group-flush">
        {users.map((obj) => <UserProfile user={obj} key={obj.username}/>)}
      </ul>

    </div>
  )
}
