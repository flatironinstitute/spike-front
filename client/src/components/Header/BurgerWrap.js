import React, { Component } from 'react';
import Menu from 'react-burger-menu/lib/menus/slide';
import Form from 'react-bootstrap/Form';

import './Burger.css';

class BurgerWrap extends Component {
  render() {
    return (
      <Menu right width={500}>
        <p className="menu__tagline">
          <a href="/" target="_blank" rel="noopener noreferrer">
            SpikeForest
          </a>{' '}
          compares spike-sorting algorithms against electrophysiology datasets
          with groundtruth.
        </p>
        <a id="home" className="menu-item" href="/">
          Home
        </a>
        <a id="recordings" className="menu-item" href="/recordings">
          Recordings
        </a>
        <a id="studies" className="menu-item" href="/sorters">
          Sorters
        </a>
        <a id="metrics" className="menu-item" href="/metrics">
          Metrics
        </a>
        <a id="studies" className="menu-item" href="/internals">
          Internals
        </a>
        <Form className="menu__form">
          <Form.Group className="menu__formgroup">
            <Form.Control
              size="lg"
              type="text"
              placeholder="Search..."
              className="menu__input"
            />
          </Form.Group>
        </Form>
        <a id="about" className="menu-item-sm" href="/about">
          About
        </a>
        <a
          id="about"
          className="menu-item-sm"
          href="mailto=elovero@flatironinstitute.org?Subject=Spikeforest%20Contact"
        >
          Contact
        </a>
        <p className="menu__tagline">
          Project of the{'  '}
          <a
            href="https://www.simonsfoundation.org/flatiron/center-for-computational-mathematics/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Center for Computational Mathematics,
          </a>
          {'   '}
          <a
            href="https://flatironinstitute.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Flatiron Institute
          </a>
        </p>
        <p className="menu__tagline">
          <a href="/" target="_blank" rel="noopener noreferrer">
            Other
          </a>
          {'  '}
          useful information{'  '}
          <span role="img" aria-label="alembic">
            ⚗️
          </span>{' '}
          or{' '}
          <span role="img" aria-label="ghost">
            👻
          </span>
          krimskrams{' '}
          <span role="img" aria-label="cheeseburger">
            🍔
          </span>{' '}
          here?
        </p>
      </Menu>
    );
  }
}
export default BurgerWrap;

// About
// Simons Foundation
// Flatiron Institute
// SpikeForest Analysis Framework
// Contact
