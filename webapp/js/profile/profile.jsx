import React, {useEffect, useState} from 'react';
import Icon from "../index/icon";

export default function Profile() {

  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    
  })

  return (
    <div>
      <h1>Related Pages:</h1>
      <div className="d-flex p-2">
        <Icon url='/' icon='bi-house-fill' title='Homepage' backgroundColor='#6c757d'/>
        <Icon url='/social/' icon='bi-hash' title='Social Media' backgroundColor='#dc3545'/>
        <Icon url='/friends/' icon='bi-people' title='Friends' backgroundColor='#ffc107'/>
      </div>
      <hr/>
      <h1>Your Profile</h1>

    </div>
  )
}
