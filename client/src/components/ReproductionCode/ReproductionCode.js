import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import MarkdownCodeBlock from "./MarkdownCodeBlock";
import Preloader from "../Preloader/Preloader";
import markdownPath from "./reproducing_sorting_result.md";
import { isEmpty } from "../../utils";

class ReproductionCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markdownTemplate: null
    };
  }

  componentDidMount() {
    this._asyncrequest = fetch(markdownPath)
      .then(response => response.text())
      .then(text => {
        this.setState({ markdownTemplate: text });
      });
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  replaceAll(str, mapObj) {
    let ret = str;
    for (let key in mapObj) {
      ret = ret.split(`{${key}}`).join(mapObj[key]);
    }
    return ret;
  }

  render() {
    let markdownSource = this.state.markdownTemplate || "";
    markdownSource = this.replaceAll(markdownSource, {
      recordingDirectory: this.props.sortingResult.recordingDirectory,
      processorName: this.props.sorter.processorName,
      studyName: this.props.sortingResult.studyName,
      recordingName: this.props.sortingResult.recordingName,
      sorterName: this.props.sortingResult.sorterName,
      params: JSON.stringify(this.props.sorter.sortingParameters, null, 4),
      spikeforestVersion: this.props.general.packageVersions.spikeforest,
      mountaintoolsVersion: this.props.general.packageVersions.mountaintools,
      container: this.props.sortingResult.container
        ? `'${this.props.sortingResult.container}'`
        : "None"
    });
    let loading = isEmpty(this.state.markdownTemplate);
    return (
      <div className="reproduction-code">
        {loading ? (
          <Preloader />
        ) : (
          <ReactMarkdown
            source={markdownSource}
            renderers={{ code: MarkdownCodeBlock }}
          />
        )}
      </div>
    );
  }
}

export default ReproductionCode;
