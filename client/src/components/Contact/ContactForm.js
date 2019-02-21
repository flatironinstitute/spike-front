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
    let value = event.target.value;
    let name = event.target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log("🥚 Search");
    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }
    // this.setState({ validated: true });
  };

  render() {
    console.log("🍕", this.props);
    return (
      <Form
        noValidate
        validated={this.state.validated}
        onSubmit={this.handleSubmit}
        className="contact__form"
      >
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="formGroupFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleInputChange.bind(this)}
              placeholder="Asami"
              size="lg"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a first name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="formGroupLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="lastName"
              placeholder="Sato"
              value={this.state.lastName}
              onChange={this.handleInputChange.bind(this)}
              size="lg"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a last name.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="formGroupEmail">
            <Form.Label>Email</Form.Label>
            <InputGroup>
              <Form.Control
                type="email"
                name="email"
                placeholder="asami@futureindustries.rc"
                aria-describedby="inputGroupPrepend"
                required
                size="lg"
                value={this.state.email}
                onChange={this.handleInputChange.bind(this)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide an email.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="formGroupAffiliation">
            <Form.Label>Affiliation</Form.Label>
            <Form.Control
              type="text"
              placeholder="(Optional)"
              name="affiliation"
              size="lg"
              value={this.state.affiliation}
              onChange={this.handleInputChange.bind(this)}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId="formGroupFeedback" as={Col} md="12">
            <Form.Label>Feedback</Form.Label>
            <Form.Control
              as="textarea"
              rows="10"
              size="lg"
              name="feedback"
              required
              value={this.state.feedback}
              onChange={this.handleInputChange.bind(this)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide feedback.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          {/* TODO: Add recaptcha here */}
          <Button type="submit">Submit form</Button>
        </Form.Row>
      </Form>
    );
  }
}

export default ContactForm;
