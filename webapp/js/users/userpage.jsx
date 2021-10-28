import React, {useEffect, useState} from 'react';
import Icon from "../index/icon";
import {DateTime} from "luxon";

export default function UserPage(props) {
  const username = props.match.params.username;

  const [res, setRes] = useState({
    username: '',
    image: null,
    about: '',
    friending: false,
    friendingTime: '',
    friended: false,
    friendedTime: '',
  });

  const convertTime = (time, mode='dt') => {
    let dt = DateTime.fromSQL(time, { zone: 'UTC', setZone: true, }).setZone();
    if (mode === 'dt') return dt.toLocaleString();
    if (mode === 'rel') return dt.toRelative();
    return '';
  }

  useEffect(() => {
    fetch('/api/v1/users/' + username + '/')
      .then((res) => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      })
      .then((data) => setRes(data))
      .catch((err) => console.log(err));
  }, [])

  return (
    <div>
      <h1>Related Pages:</h1>
      <div className="d-flex p-2">
        <Icon url='/' icon='bi-house-fill' title='Homepage' backgroundColor='#6c757d'/>
        <Icon url='/users/' icon='bi-search' title='Users' backgroundColor='#6f42c1'/>
        <Icon url='/friends/' icon='bi-people' title='Friends' backgroundColor='#ffc107'/>
        <Icon url='/messaging/' icon='bi-chat' title='Messaging' backgroundColor='#0d6efd'/>
        <Icon url='/social/' icon='bi-hash' title='Social Media' backgroundColor='#dc3545'/>
      </div>
      <hr/>
      <div className="mb-3 d-flex justify-content-start align-items-center">
        {res.image == null
          ?
          <i className="bi-person-fill" style={{fontSize: '48px'}} role="img"/>
          :
          <img className="img-thumbnail" src={'/uploads/' + res.image}
               alt={username + "'s profile picture"}
               style={{maxWidth: '48px', maxHeight: '48px'}}/>
        }
        <h1 className="ms-3 mb-0">{username}</h1>
      </div>
      <div className="mb-3 p-1">
        {!res.friending && !res.friended &&
          <button className="btn btn-primary">Send friend request</button>
        }
        {!res.friending && res.friended &&
          <button className="btn btn-success">
            Accept friend request (sent {convertTime(res.friendedTime, 'rel')})
          </button>
        }
        {res.friending && !res.friended &&
          <p>Pending (friend request sent {convertTime(res.friendingTime, 'rel')})</p>
        }
        {res.friending && res.friended &&
          <p>Friends since {convertTime(res.friendingTime)}</p>
        }
      </div>
      <div className="mb-3">
        <h2>About Me</h2>
        <p>{res.about}</p>
      </div>
    </div>
  )
}
