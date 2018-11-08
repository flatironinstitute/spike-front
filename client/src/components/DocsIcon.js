import React from "react";
import icon from "../docs.png";

const DocsIcon = ({ row, accessor }) => {
  return (
    <a style={{ textDecoration: "none" }} href={row[accessor]}>
      <img
        src={icon}
        className="algos__icon"
        width="50"
        height="50"
        alt="docs icon"
      />
    </a>
  );
};

export default DocsIcon;
