import React, { Component } from "react";
import { Col } from "react-bootstrap";
import { isEmpty } from "../../utils";
const ReactMarkdown = require("react-markdown");

class ListCard extends Component {
  render() {
    let loading = isEmpty(this.props.value);
    return (
      <Col lg={12} sm={12} xl={12}>
        <div className="finder" id={this.props.value.raw_label} />
        {loading ? (
          <div className="listcard">
            <h3>...</h3>
          </div>
        ) : (
          <div className="listcard">
            <div className="listcard-content">
              <div className="listcard-section">
                <div className="listcard-top">
                  <a href={this.props.value.website}>
                    <p className="listcard-title">
                      {this.props.value.raw_label}
                    </p>{" "}
                  </a>
                  {this.props.value.env_link !== "/" ? (
                    <a
                      className="listcard-env"
                      href={this.props.value.env_link}
                    >
                      View {this.props.value.env_name}
                    </a>
                  ) : (
                    <span className="listcard-env">
                      {this.props.value.env_name}
                    </span>
                  )}
                </div>
                <p className="listcard-authors">
                  <span>By</span> {this.props.value.authors}
                </p>
              </div>
              <div className="listcard-section">
                <div className="listcard-copy">
                  <ReactMarkdown source={this.props.value.markdown} />
                </div>
              </div>
              <div className="listcard-section__bottom">
                <a
                  className="listcard-env"
                  href={this.props.value.wrapper_link}
                >
                  View Wrapper
                </a>
                <a className="listcard-env" href={this.props.value.website}>
                  View Algorithm Website
                </a>
              </div>
            </div>
          </div>
        )}
      </Col>
    );
  }
}
export default ListCard;
