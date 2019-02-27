import React from "react";
import icon from "./docs.svg";

const DocsIcon = ({ row, accessor }) => {
  return (
    <a className="icon__link" href={row[accessor]}>
      <img
        src={icon}
        className="algos__icon"
        width="35"
        height="35"
        alt="docs icon"
      />
    </a>
  );
};

export default DocsIcon;
