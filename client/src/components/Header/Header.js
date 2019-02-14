import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from './logo-no-icon.svg';
import BurgerWrap from './BurgerWrap';

import './Header.css';

class Header extends Component {
  render() {
    return (
      <Nav className="justify-content-center navbar__white">
        <Navbar.Brand href="/">
          <img
            alt="spikeforest logo"
            src={logo}
            height="48"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <BurgerWrap />
      </Nav>
    );
  }
}
export default Header;
