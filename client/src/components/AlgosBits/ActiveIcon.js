import React from 'react';
import icon from './active.svg';

const ActiveIcon = ({ row, accessor }) => {
  let isActive = row[accessor];
  return (
    <div>
      {isActive ? (
        <a style={{ textDecoration: 'none' }} href={'./home'}>
          <img
            src={icon}
            className="algos__icon"
            width="25"
            height="25"
            alt="active icon"
          />
        </a>
      ) : (
        <div />
      )}
    </div>
  );
};

export default ActiveIcon;
