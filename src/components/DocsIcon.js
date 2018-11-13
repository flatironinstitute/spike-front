import React from "react";
import icon from "../images/docs.svg";

const DocsIcon = ({ row, accessor }) => {
  return (
    <a style={{ textDecoration: "none" }} href={row[accessor]}>
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
