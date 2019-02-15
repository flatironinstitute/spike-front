import React, { Component } from "react";
import ContactForm from "./ContactForm";
import { Container } from "react-bootstrap";

import "./contact.css";

class Contact extends Component {
  render() {
    return (
      <div className="page__body contact__body">
        <div className="intro">
          <p className="big">Contact Us</p>
          <p className="subhead">
            Look for me in the struggle, hustlin 'til other brothers bubble.
            Holla if ya hear me.
          </p>
          <p className="byline">
            Please use the
            <a
              href="https://github.com/elovero/spike-front/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github issues
            </a>{" "}
            page to report website problems or contact us directly below.
          </p>
          <div className="dividerthick" />
        </div>
        <Container>
          <ContactForm {...this.props} />
        </Container>
      </div>
    );
  }
}
export default Contact;
