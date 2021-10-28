import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {DateTime} from "luxon";

export default function FriendProfile(props) {
  const { username, time, pending, incoming, reload } = props;

  const [image, setImage] = useState(null);

  const convertTime = (time, mode='dt') => {
    let dt = DateTime.fromSQL(time, { zone: 'UTC', setZone: true, }).setZone();
    if (mode === 'dt') return dt.toLocaleString();
    if (mode === 'rel') return dt.toRelative();
    return '';
  };

  const acceptRequest = (username) => {
    fetch('/api/v1/friends/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username
      }),
    })
      .then((res) => {
        if (!res.ok) throw Error(res.statusText);
        reload();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log(username);
    fetch('/api/v1/users/' + username + '/')
      .then((res) => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      })
      .then((data) => setImage(data['image']))
      .catch((err) => console.log(err));
  }, []);

  return (
    <li className="list-group-item userprofile-link mb-3 d-flex justify-content-between align-items-center">
      <a href={`/users/${username}`}
         className="text-body text-decoration-none">
        <div className="d-flex align-items-center">
          {image != null &&
          <img src={'/uploads/' + image}
               alt={`${username}'s profile picture`}
               className="me-3 border"
               style={{width: '48px', height: '48px', objectFit: 'contain'}}
          />}
          {image == null &&
          <i className="bi-person-fill me-3" style={{fontSize: '48px'}}/>}

          <div className="d-flex flex-column justify-content-start align-items-start" role="img">
            {username}
            {pending ?
            <span>
              <i className="bi-question me-2" role="img"/>
              <small className="text-muted">friend request pending (sent {convertTime(time, 'rel')})</small>
            </span> :
            <span>
              <i className="bi-people-fill me-2" role="img"/>
              <small className="text-muted">friends since {convertTime(time)}</small>
            </span>
            }
          </div>
        </div>
      </a>
      {incoming &&
        <button className="btn btn-success" onClick={() => acceptRequest(username)}>Accept friend request</button>
      }
    </li>
  );
}

FriendProfile.propTypes = {
  username: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  pending: PropTypes.bool.isRequired,
  incoming: PropTypes.bool.isRequired,
  reload: PropTypes.func.isRequired,
}
