import React from 'react';
import './Workshops.scss';

export default function Workshops({ stand }) {
  return (
    <div className="content-container">
      <h2>Talleres</h2>
      <div className="workshops-container">
        {stand.workshops.length > 0 ? (
          <>
            {stand.workshops.map((workshop) => {
              return (
                <a
                  key={workshop.link}
                  target="_blank"
                  rel="noreferrer"
                  href={workshop.link}
                >
                  {workshop.name}
                </a>
              );
            })}
          </>
        ) : (
          <p>No hay talleres </p>
        )}
      </div>
    </div>
  );
}
