import React, { Component } from "react";
import { HashLink } from "react-router-hash-link";

class Sidebar extends Component {
  render() {
    let url = window.location.hash.substr(1);
    const listItemsWithKeys = this.props.listItems.map((item, index) => ({
      ...item,
      id: index
    }));
    const listItems = listItemsWithKeys.map(item => (
      <li key={item.id}>
        <HashLink
          to={"/about#" + item.value}
          className={
            item.value === url
              ? "sidebar-link sidebar-selected"
              : "sidebar-link"
          }
        >
          {item.name}
        </HashLink>
      </li>
    ));
    return (
      <div className="card card__sidebar">
        <div className="content">
          <h5 className="listcard-title">About</h5>
          <ul className="sidebar-list">{listItems}</ul>
        </div>
      </div>
    );
  }
}
export default Sidebar;
