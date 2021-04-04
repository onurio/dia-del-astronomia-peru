import React from 'react';
import './Downloads.scss';

export default function Downloads({ stand }) {
  if (stand.downloads?.length > 0) {
    return (
      <div className="content-container">
        <h2>Descargas</h2>
        <div className="d-links">
          {stand.downloads.map((file) => (
            <a
              className="download-link"
              rel="noreferrer"
              href={file.url}
              target="_blank"
              key={file.url}
            >
              {file.title}
            </a>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="content-container">
        <h2>No hay descargas</h2>;
      </div>
    );
  }
}
