import React, { Component } from "react";

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
        <div className="header">
          <h2 className="header__title">Datasets</h2>
          <div className="header__copy">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              cursus purus quis pharetra aliquet. Orci varius natoque penatibus
              et magnis.
            </p>
          </div>
        </div>
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
// TODO: Refactor out the headers to be reusable.
