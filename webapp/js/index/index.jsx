import React from 'react';

import Icon from './icon';

export default function Index() {
  return (
    <div>
      <h1>Widgets</h1>
      <div className="d-flex p-2 flex-wrap">
        <Icon url='/profile/' icon='bi-person-lines-fill' title='Edit Profile' backgroundColor='#0dcaf0'/>
        <Icon url='/users/' icon='bi-search' title='Users' backgroundColor='#6f42c1'/>
        <Icon url='/friends/' icon='bi-people' title='Friends' backgroundColor='#ffc107'/>
        <Icon url='/messaging/' icon='bi-chat' title='Messaging' backgroundColor='#0d6efd'/>
        <Icon url='/social/' icon='bi-hash' title='Social Media' backgroundColor='#dc3545'/>
        <Icon url='/email/' icon='bi-envelope' title='Email' backgroundColor='#20c997'/>
        <Icon url='/calendar/' icon='bi-calendar-date' title='Calendar' backgroundColor='#6610f2'/>
        <Icon url='/notes/' icon='bi-journal-text' title='Notes' backgroundColor='#d63384'/>
        <Icon url='/maps/' icon='bi-pin-map' title='Maps' backgroundColor='#fd7e14'/>
        <Icon url='/todo/' icon='bi-list-task' title='Todo List' backgroundColor='#198754'/>
      </div>
    </div>
  );
}
