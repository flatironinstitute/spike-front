import React, { Component } from "react";

class Error extends Component {
  closeErrors() {
    console.log("Close errors");
  }
  render() {
    return (
      <div className="container container__error">
        {this.props.errors.map((err, i) => (
          <div className="errors" key={i.toString + "errors"}>
            <p className="errors__message" key={i}>
              {err}
            </p>
            <p className="errors__close" onClick={this.closeErrors}>
              X
            </p>
          </div>
        ))}
      </div>
    );
  }
}
export default Error;
// TODO: Make close errors function that clears array on App.js.
