import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import icon from "./active.svg";

const ActiveIcon = ({ row, accessor }) => {
  let isActive = row[accessor];
  return (
    <div>
      {isActive ? (
        <LinkContainer exact to="/">
          <a className="icon__link">
            <img
              src={icon}
              className="algos__icon"
              width="25"
              height="25"
              alt="active icon"
            />
          </a>
        </LinkContainer>
      ) : (
          <div />
        )}
    </div>
  );
};

export default ActiveIcon;
