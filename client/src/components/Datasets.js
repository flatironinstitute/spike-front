import React, { Component } from "react";
import Header from "./Header";

class Datasets extends Component {
  // Initialize the state
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  // Fetch the datasets on first mount
  componentDidMount() {
    this.getList();
  }

  // Retrieves the list of datasets from the Express app
  getList = () => {
    fetch("/api/getDatasets")
      .then(res => res.json())
      .then(list => this.setState({ list }));
  };

  render() {
    const { list } = this.state;

    return (
      <div className="container container--body">
        <Header headerCopy={this.props.header} />
        {/* Check to see if any items are found*/}
        {list.length ? (
          <div>
            {/* Render the list of items */}
            {list.map(item => {
              return <div>{item}</div>;
            })}
          </div>
        ) : (
          <div>
            <h2>No Datasets Found</h2>
          </div>
        )}
      </div>
    );
  }
}
export default Datasets;
