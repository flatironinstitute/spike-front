import React, { Component } from 'react';
import CopyHeader from '../CopyHeader/CopyHeader';
import StudiesList from '../StudiesList';

class Studies extends Component {
  render() {
    return (
      <div>
        <div className="container container__body">
          <CopyHeader headerCopy={this.props.header} />
        </div>
        <StudiesList studies={this.props.studies} />
      </div>
    );
  }
}
export default Studies;
