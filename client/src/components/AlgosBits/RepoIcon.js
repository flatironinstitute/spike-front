import React from 'react';
import icon from './github.png';

const RepoIcon = ({ row, accessor }) => {
  return (
    <a style={{ textDecoration: 'none' }} href={row[accessor]}>
      <img
        src={icon}
        className="algos__icon"
        width="35"
        height="35"
        alt="github icon"
      />
    </a>
  );
};

export default RepoIcon;
