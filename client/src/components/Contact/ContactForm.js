import React, { Component } from "react";
import { Form, InputGroup, Button, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { isEmpty } from "../../utils.js";

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  affiliation: yup.string().notRequired(),
  feedback: yup.string().required()
});

class ContactForm extends Component {
  render() {
    return (
      <Formik
        validationSchema={schema}
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          affiliation: "",
          feedback: ""
        }}
        onSubmit={(values, { setSubmitting }) => {
          // setTimeout(() => {
          //   alert(JSON.stringify(values, null, 2));
          //   setSubmitting(false);
          // }, 500);
          console.log("🏓 sending contact", values);
          this.props.sendContact(values);
          setSubmitting(false);
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          isSubmitting,
          isInvalid,
          errors
        }) => (
          <Form noValidate onSubmit={handleSubmit} className="contact__form">
            <Form.Row>
              <Form.Group as={Col} md="6" controlId="formGroupFirstName">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  size="lg"
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={errors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  Required
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="formGroupLastName">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={errors.lastName}
                  size="lg"
                />
                <Form.Control.Feedback type="invalid">
                  Required
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
                    size="lg"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    Required
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="formGroupAffiliation">
                <Form.Label>Affiliation</Form.Label>
                <Form.Control
                  type="text"
                  name="affiliation"
                  size="lg"
                  placeholder="optional"
                  value={values.affiliation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={errors.affiliation}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group controlId="formGroupFeedback" as={Col} md="12">
                <Form.Label>Feedback</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="7"
                  size="lg"
                  name="feedback"
                  value={values.feedback}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  isInvalid={errors.feedback}
                />
                <Form.Control.Feedback type="invalid">
                  Required
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Button type="submit" disabled={!isEmpty(errors)}>
              Submit form
            </Button>
          </Form>
        )}
      </Formik>
    );
  }
}

export default ContactForm;
