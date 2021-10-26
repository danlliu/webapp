import React from 'react';
import PropTypes from "prop-types";

// a <li> element that has everything
export default function UserProfile(props) {
  const { user } = props;
  return (
    <li className="list-group-item userprofile-link">
      <a href={`/users/${user.username}`}
         className="text-body text-decoration-none">
        <div className="d-flex align-items-center">
          {user.image != null &&
          <img src={user.image}
               alt={`${user.username}'s profile picture`}
               className="img-thumbnail px-3"
               style={{maxWidth: '48px', maxHeight: '48px'}}
          />}
          {user.image == null &&
          <i className="bi-person-fill px-3" style={{fontSize: '48px'}}/>}

          <div className="d-flex flex-column justify-content-start align-items-start" role="img">
            {user.username}
            {user.about != null &&
            <span>
              <i className="bi-info-circle me-2" role="img"/>
              <small className="text-muted">{user.about}</small>
            </span>}
          </div>
        </div>
      </a>
    </li>
  );
}

UserProfile.propTypes = {
  user: PropTypes.object,
}
