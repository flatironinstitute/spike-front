import React, { Component } from "react";
import ContactForm from "./ContactForm";
import { Container } from "react-bootstrap";

class Contact extends Component {
  render() {
    return (
      <div className="page__body contact__body">
        <div className="intro">
          <p className="big">Contact Us</p>
          <p className="subhead">
            We appreciate your feedback and look forward to hearing from you
            soon.
          </p>
          <p className="byline">
            Please use this
            <a
              href="https://github.com/flatironinstitute/spike-front/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github issues
            </a>{" "}
            page to report website problems.
          </p>
          <p className="byline">
            Please use this
            <a
              href="https://github.com/flatironinstitute/spikeforest"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github issues
            </a>{" "}
            page to report issues with the data analysis or reach out via the
            form below.
          </p>
        </div>
        <Container>
          <ContactForm {...this.props} />
        </Container>
      </div>
    );
  }
}
export default Contact;
