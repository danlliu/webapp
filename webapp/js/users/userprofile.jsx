import React from 'react';
import PropTypes from "prop-types";
import {DateTime} from "luxon";

// a <li> element that has everything
export default function UserProfile(props) {
  const { user } = props;
  const convertTime = (time, mode='dt') => {
    let dt = DateTime.fromSQL(time, { zone: 'UTC', setZone: true, }).setZone();
    if (mode === 'dt') return dt.toLocaleString();
    if (mode === 'rel') return dt.toRelative();
    return '';
  };

  return (
    <li className="list-group-item userprofile-link">
      <a href={`/users/${user.username}`}
         className="text-body text-decoration-none">
        <div className="d-flex align-items-center mb-3">
          {user.image != null &&
          <img src={'/uploads/' + user.image}
               alt={`${user.username}'s profile picture`}
               className="me-3 border"
               style={{width: '48px', height: '48px', objectFit: 'contain'}}
          />}
          {user.image == null &&
          <i className="bi-person-fill me-3" style={{fontSize: '48px'}}/>}

          <div className="d-flex flex-column justify-content-start align-items-start" role="img">
            {user.username}
            {user.about != null &&
            <span>
              <i className="bi-info-circle me-2" role="img"/>
              <small className="text-muted">{user.about}</small>
            </span>}
            {user.friendsSince !== '' &&
            <small>
              <i className="bi-people-fill me-2" role="img"/>
              Friends since {convertTime(user.friendsSince)}
            </small>
            }
          </div>
        </div>
      </a>
    </li>
  );
}

UserProfile.propTypes = {
  user: PropTypes.object,
}
