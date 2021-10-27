import React, {useEffect, useState} from 'react';
import Icon from "../index/icon";

export default function Profile() {

  const [loaded, setLoaded] = useState(false);
  const [profile, setProfile] = useState({});

  const [about, setAbout] = useState('');
  const [file, setFile] = useState(null);

  const fetchProfile = () => {
    fetch(`/api/v1/users/profile/`)
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        setLoaded(true);
        setProfile(data);
        setAbout(data['about']);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (loaded) return;
    fetchProfile();
  })

  const updateProfile = (e) => {
    let formData = new FormData();

    console.log(file);
    console.log(file[0]);

    if (file != null) {
      formData.append('profile', file);
    }
    formData.append('about', about);

    fetch('/api/v1/users/profile/', {
      method: 'PUT',
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw Error(res.statusText);
      })
      .then((data) => {
        setLoaded(false);
      })
      .catch((err) => console.log(err));

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
      {!loaded ?
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        :
        <div>
          <div className="d-flex justify-content-start align-items-center mb-3">
            {profile.image != null &&
            <img src={'/uploads/' + profile.image}
                 alt={`${profile.username}'s profile picture`}
                 className="me-3 image-thumbnail border"
                 style={{width: '48px', height: '48px', objectFit: 'contain'}}
            />}
            {profile.image == null &&
            <i className="bi-person-fill me-3" style={{fontSize: '48px'}}/>}
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
              <label htmlFor="imageInput" className="form-label fw-bold">Upload a new profile picture (optional)</label>
              <input className="form-control" type="file" id="imageInput"
                     onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <button type="submit" className="btn btn-primary">Update Profile</button>
          </form>
        </div>
      }
    </div>
  )
}
