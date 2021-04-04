import React from 'react';
import './Social.scss';
import fb from '../../images/facebook.svg';
import yb from '../../images/youtube.svg';
import ig from '../../images/instagram.svg';
import mail from '../../images/mail.svg';

export default function Social({ stand }) {
  return (
    <div className="social-container">
      <h2>REDES SOCIALES Y CONTACTO</h2>

      <div className="links">
        {stand.youtubeLink !== '' && (
          <a
            href={stand.youtubeLink}
            target="_blank"
            rel="noreferrer"
            className="icon-button"
          >
            <img src={yb} alt="youtube" />
          </a>
        )}
        {stand.facebookLink !== '' && (
          <a
            href={stand.facebookLink}
            target="_blank"
            rel="noreferrer"
            className="icon-button"
          >
            <img src={fb} alt="youtube" />
          </a>
        )}
        {stand.instagramLink !== '' && (
          <a
            href={stand.instagramLink}
            target="_blank"
            rel="noreferrer"
            className="icon-button"
          >
            <img src={ig} alt="youtube" />
          </a>
        )}
        {stand.email !== '' && (
          <a
            href={`mailto:${stand.email}`}
            target="_blank"
            rel="noreferrer"
            className="icon-button"
          >
            <img src={mail} alt="youtube" />
          </a>
        )}
      </div>
    </div>
  );
}
