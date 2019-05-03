import React, { Component } from "react";
import Menu from "react-burger-menu/lib/menus/slide";

import InfoPanelContent from "./InfoPanelContent";

import "./infopanel.css";
import icon from "./infoicon.svg";

class InfoPanel extends Component {
  render() {
    return (
      <Menu
        right
        width={this.props.width}
        customBurgerIcon={<img src={icon} alt="icon" />}
      >
        <InfoPanelContent sidebar={true} />
      </Menu>
    );
  }
}
export default InfoPanel;
