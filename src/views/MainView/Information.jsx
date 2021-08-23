import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import './Information.scss';

export default function Information({ stand }) {
  return (
    <div className="content-container">
      <h2>{stand.name}</h2>
      <div className="info">{ReactHtmlParser(stand.info)}</div>
    </div>
  );
}
