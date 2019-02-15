import React, { Component } from "react";
import { Form, InputGroup, Button, Col } from "react-bootstrap";

class ContactForm extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      validated: false,
      firstName: "",
      lastName: "",
      email: "",
      affiliation: "",
      feedback: ""
    };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({ validated: true });
    this.props.sendContact(this.state);
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
              value={this.state.firstName}
              onChange={this.handleInputChange}
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
              value={this.state.lastName}
              onChange={this.handleInputChange}
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
                value={this.state.email}
                onChange={this.handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide an email.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom04">
            <Form.Label>Affiliation</Form.Label>
            <Form.Control
              type="text"
              placeholder="(Optional)"
              size="lg"
              value={this.state.affiliation}
              onChange={this.handleInputChange}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId="validationCustom05" as={Col} md="12">
            <Form.Label>Feedback</Form.Label>
            <Form.Control
              as="textarea"
              rows="10"
              size="lg"
              required
              value={this.state.feedback}
              onChange={this.handleInputChange}
            />
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
