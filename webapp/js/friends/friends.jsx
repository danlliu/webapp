import React, {useEffect, useState} from 'react';
import { DateTime } from 'luxon';
import Icon from "../index/icon";

import FriendProfile from "./friend_profile";

export default function Friends() {

  const [res, setRes] = useState({
    friends: [],
    pending: [],
    incoming: [],
  });

  const fetchFriends = () => {
    fetch('/api/v1/friends/')
      .then((res) => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      })
      .then((data) => setRes(data))
      .catch((err) => console.log(err));
  }

  useEffect(fetchFriends, []);

  return (
    <div>
      <h1>Related Pages:</h1>
      <div className="d-flex p-2">
        <Icon url='/' icon='bi-house-fill' title='Homepage' backgroundColor='#6c757d'/>
        <Icon url='/users/' icon='bi-search' title='Users' backgroundColor='#6f42c1'/>
        <Icon url='/messaging/' icon='bi-chat' title='Messaging' backgroundColor='#0d6efd'/>
        <Icon url='/social/' icon='bi-hash' title='Social Media' backgroundColor='#dc3545'/>
      </div>
      <hr/>
      {res.incoming.length > 0 &&
      (
        <div>
        <h1>Incoming Friend Requests</h1>
        <ul className='list-group list-group-flush'>
          {res['incoming'].map((obj) => (
            <FriendProfile key={obj.username}
                           username={obj.username}
                           time={obj.time}
                           pending={true}
                           incoming={true}
                           reload={fetchFriends}
            />
          ))}
        </ul>
        </div>
        )
      }
      <h1 className="mt-3">Friends</h1>
      <ul className='list-group list-group-flush'>
        {res['friends'].map((obj) => (
          <FriendProfile key={obj.username}
                         username={obj.username}
                         time={obj.time}
                         pending={obj.pending}
                         incoming={false}
                         reload={fetchFriends}
          />
        ))}
      </ul>
      <h1 className="mt-3">Pending Friend Requests</h1>
      <ul className="list-group list-group-flush">
        {res['pending'].map((obj) => (
          <FriendProfile key={obj.username}
                         username={obj.username}
                         time={obj.time}
                         pending={obj.pending}
                         incoming={false}
                         reload={fetchFriends}
          />
        ))}
      </ul>
    </div>
  )
}

// {res.friends.map((friend) => (
//   <p>{friend.username} (since {DateTime.fromISO(friend.time).toString()})</p>
// ))}
