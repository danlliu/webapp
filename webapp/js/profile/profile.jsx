import React, {useEffect, useState} from 'react';
import Icon from "../index/icon";

export default function Profile() {

  const [loaded, setLoaded] = useState(true);
  const [profile, setProfile] = useState({});

  const [about, setAbout] = useState('');

  useEffect(() => {
    if (!loaded) return;
    fetch(`/api/v1/utils/logname/`)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        const logname = data['logname'];
        fetch(`/api/v1/users/${logname}/`)
          .then((response) => {
            if (!response.ok) throw new Error(response.statusText);
            return response.json();
          })
          .then((data) => {
            setProfile(data);
            setAbout(data['about']);
            setLoaded(false);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  })

  const updateProfile = (e) => {


    e.preventDefault();
  }

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
      {loaded ?
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        :
        <div>
          <div className="d-flex justify-content-start align-items-center">
            {profile.image != null &&
            <img src={profile.image}
                 alt={`${profile.username}'s profile picture`}
                 className="img-thumbnail px-3"
                 style={{maxWidth: '48px', maxHeight: '48px'}}
            />}
            {profile.image == null &&
            <i className="bi-person-fill px-3" style={{fontSize: '48px'}}/>}
            <p className="h5 mb-0">{profile.username}</p>
          </div>
          <form onSubmit={updateProfile}>
            <div className="mb-3">
              <label htmlFor="aboutTextArea" className="form-label fw-bold">About Me</label>
              <textarea
                className="form-control"
                id="aboutTextArea"
                rows="3"
                maxLength="255"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
              <small className="text-muted">{about.length} / 255</small>
            </div>
            <div className="mb-3">
              <label for="imageInput" className="form-label fw-bold">Upload a new profile picture (optional)</label>
              <input className="form-control" type="file" id="imageInput"/>
            </div>
            <button type="submit" className="btn btn-primary">Update Profile</button>
          </form>
        </div>
      }
    </div>
  )
}
