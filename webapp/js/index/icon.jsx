import React from 'react';
import PropTypes from 'prop-types';
import {
  Link
} from 'react-router-dom';

export default function Icon(props) {

  let {url, icon, title, backgroundColor} = props;

  return (
    <Link className="icon-link text-decoration-none m-4 text-body" to={url}>
      <div className="icon-color" style={{backgroundColor: backgroundColor}}/>
      <div className="d-flex flex-column justify-content-between align-items-center p-3"
           style={{height: '120px', width: '120px'}}>
        <i className={icon} style={{fontSize: '2rem'}} role="img"/>
        <small className="mb-0">{title}</small>
      </div>
    </Link>
  )
}

Icon.propTypes = {
  url: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
}
