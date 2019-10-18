import React, { Component } from "react";
import { HashLink } from "react-router-hash-link";
import Scrollspy from "react-scrollspy";

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }
  scrollToTop() {
    window.scrollTo(0, 0);
  }
  render() {
    let path = window.location.pathname + "#";
    let listItemsWithKeys = [];
    let scrollSpyItems = [];
    this.props.listItems.forEach((item, index) => {
      listItemsWithKeys.push({ ...item, id: index });
      scrollSpyItems.push(item.value);
    });
    const listItems = listItemsWithKeys.map(item => (
      <li key={item.id}>
        <HashLink to={path + item.value} className={"sidebar-link"}>
          {item.name}
        </HashLink>
      </li>
    ));
    return (
      <div className="card card__sidebar">
        <div className="content">
          <h5 className="listcard-title" onClick={this.scrollToTop}>
            {this.props.listTitle}
          </h5>
          <Scrollspy
            items={scrollSpyItems}
            currentClassName="sidebar-selected"
            className="sidebar-list"
          >
            {listItems}
          </Scrollspy>
        </div>
      </div>
    );
  }
}
export default Sidebar;
