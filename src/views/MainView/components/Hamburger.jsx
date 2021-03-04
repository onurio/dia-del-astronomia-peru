import React, { useState } from 'react';
import './Hamburger.scss';

export default function Hamburger({ onClick }) {
  return (
    <button onClick={onClick} className={`icon-button hamburger `}>
      <svg viewBox="0 0 100 80" width="40" height="40">
        <rect width="100" height="10"></rect>
        <rect y="30" width="100" height="10"></rect>
        <rect y="60" width="100" height="10"></rect>
      </svg>
    </button>
  );
}
