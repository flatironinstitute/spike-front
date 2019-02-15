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
          <div className="dividerthick" />
        </div>
        <Container>
          <ContactForm />
        </Container>
      </div>
    );
  }
}
export default Contact;
