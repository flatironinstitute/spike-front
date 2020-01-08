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
    let sr = this.props.sortingResult;
    markdownSource = this.replaceAll(markdownSource, {
      recordingDirectory: sr.recordingDirectory,
      sortingTruePath: sr.firingsTrue,
      processorName: sr.processorName,
      processorVersion: sr.processorVersion,
      studyName: sr.studyName,
      recordingName: sr.recordingName,
      sorterName: sr.sorterName,
      params: JSON.stringify(sr.sortingParameters || {}, null, 4),
      container: sr.container
        ? sr.container
        : ''
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
