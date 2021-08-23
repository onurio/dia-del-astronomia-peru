import React from 'react';
import './Loader.scss';
import logo from '../../images/logo.png';

export default function Loader({ progress }) {
  return (
    <div className="container">
      <img
        src={logo}
        style={{ maxWidth: '60%', marginBottom: 20 }}
        width="300px"
        alt="Astrodia"
      />
      <div className="progressbar-container">
        <div className="progressbar-complete" style={{ width: `${progress}%` }}>
          <div className="progressbar-liquid"></div>
        </div>
        <span className="progress">{progress}%</span>
      </div>
    </div>
  );
}
