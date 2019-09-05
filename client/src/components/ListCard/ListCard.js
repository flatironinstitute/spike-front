import React, { Component } from "react";
import { Col } from "react-bootstrap";
import { isEmpty } from "../../utils";

class ListCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let loading = isEmpty(this.props.value);
    return (
      <Col lg={12} sm={12} xl={12}>
        {loading ? (
          <div className="listcard">
            <h3>...</h3>
          </div>
        ) : (
          <div className="listcard">
            <div className="listcard-content">
              <div className="listcard-section">
                <a href="/">
                  <p className="listcard-title">{this.props.value.raw_label}</p>{" "}
                </a>
                <p className="listcard-authors">
                  <span>By</span> {this.props.value.authors}
                </p>
              </div>
              <div className="listcard-section">
                <p className="listcard-copy">{this.props.value.markdown}</p>
              </div>
              <div className="listcard-section__bottom">
                <a className="listcard-env" href={this.props.value.env_link}>
                  {this.props.value.env_name}
                </a>
                <a
                  className="listcard-env"
                  href={this.props.value.wrapper_link}
                >
                  View Wrapper
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
