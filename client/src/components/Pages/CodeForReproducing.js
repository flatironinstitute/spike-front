import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import markdownPath from "./reproducing_sorting_result.md";

class CodeForReproducing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markdownTemplate: null
        };
    }

    componentWillMount() {
        fetch(markdownPath).then((response) => response.text()).then((text) => {
            this.setState({ markdownTemplate: text })
        })
    }

    async componentDidMount() {
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.sortingResult !== prevProps.sortingResult) {
        }
    }

    render() {
        let markdownSource = this.state.markdownTemplate || '';
        markdownSource = replaceAll(markdownSource, {
            recordingDirectory: this.props.sortingResult.recordingDirectory,
            processorName: this.props.sorter.processorName,
            studyName: this.props.sortingResult.studyName,
            recordingName: this.props.sortingResult.recordingName,
            sorterName: this.props.sortingResult.sorterName,
            params: JSON.stringify(this.props.sorter.sortingParameters, null, 4),
            spikeforestVersion: this.props.general.packageVersions.spikeforest,
            mountaintoolsVersion: this.props.general.packageVersions.mountaintools,
            container: this.props.sortingResult.container ? `'${this.props.sortingResult.container}'` : 'None'
        });

        return <span>
            <ReactMarkdown source={markdownSource} />
        </span>;
    }
}

function replaceAll(str, mapObj) {
    let ret = str;
    for (let key in mapObj) {
        ret = ret.split(`{${key}}`).join(mapObj[key]);
    }
    return ret;
}

export default CodeForReproducing;
