import React, { Component } from "react";
import { Alert } from "react-bootstrap";

class ForumAlert extends Component {
  render() {
    return (
      <div className="alert__wrapper">
        <Alert dismissible variant={"primary"} className="alert__stats">
          <div className="alert__ticker--wrapper">
            <div className="alert__ticker">
              <div className="ticker__item">
                <b>** Check out our new Forum**</b>
              </div>
              <div className="ticker__item">
                Click to view{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://spikeforum.org"
                >
                  <b>SpikeForum,</b>
                </a>{" "}
                the online community supporting open source spike sorting
                software.
              </div>
            </div>
          </div>
        </Alert>
      </div>
    );
  }
}

export default ForumAlert;
