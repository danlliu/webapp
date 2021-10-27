import React, { useState } from 'react';
import Icon from "../index/icon";

export default function Friends() {

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
      <h1>Friends</h1>
    </div>
  )
}
