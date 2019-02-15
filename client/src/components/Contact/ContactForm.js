import React, { Component } from "react";
import { Form, InputGroup, Button, Col } from "react-bootstrap";

class ContactForm extends Component {
  constructor(...args) {
    super(...args);

    this.state = { validated: false };
  }

  handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({ validated: true });
  }

  render() {
    const { validated } = this.state;
    return (
      <Form
        noValidate
        validated={validated}
        onSubmit={e => this.handleSubmit(e)}
        className="contact__form"
      >
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Santiago"
              size="lg"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a first name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Ramón y Cajal"
              size="lg"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a last name.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="validationCustomEmail">
            <Form.Label>Email address</Form.Label>
            <InputGroup>
              <Form.Control
                type="email"
                placeholder="Email"
                aria-describedby="inputGroupPrepend"
                required
                size="lg"
              />
              <Form.Control.Feedback type="invalid">
                Please provide an email.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom04">
            <Form.Label>Affiliation</Form.Label>
            <Form.Control type="text" placeholder="(Optional)" size="lg" />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId="validationCustom05" as={Col} md="12">
            <Form.Label>Feedback</Form.Label>
            <Form.Control as="textarea" rows="10" size="lg" required />
            <Form.Control.Feedback type="invalid">
              Please provide feedback.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="6">
            <Form.Check
              required
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
            />
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Button type="submit">Submit form</Button>
          </Form.Group>
        </Form.Row>
      </Form>
    );
  }
}

export default ContactForm;
