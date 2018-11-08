import React from "react";
import icon from "../active.svg";

const ActiveIcon = ({ row, accessor }) => {
  return (
    <a style={{ textDecoration: "none" }} href={row[accessor]}>
      <img
        src={icon}
        className="algos__icon"
        width="25"
        height="25"
        alt="active icon"
      />
    </a>
  );
};

export default ActiveIcon;
