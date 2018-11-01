import React, { Component } from "react";
import { Link } from "react-router-dom";

class About extends Component {
  render() {
    return (
      <div className="App">
        <h1>About SpikeForest</h1>
        {/* Link to List.js */}
        <Link to={"./datasets"}>
          <button>The Datasets</button>
        </Link>
      </div>
    );
  }
}
export default About;
