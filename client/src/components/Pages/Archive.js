import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PathLink from "../PathLink/PathLink";
const axios = require("axios");
const stable_stringify = require('json-stable-stringify');
const crypto = require('crypto');

class Archive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            analysisHistory: null,
            status: 'loading'
        };
    }

    async componentDidMount() {
        let obj = await this.loadObject('key://pairio/spikeforest/spike-front-analysis-history.json');
        if (!obj) {
            this.setState({ status: 'download-failed' });
            return;
        }
        if (!obj.analyses) {
            this.setState({ status: 'error' });
            return;
        }
        this.setState({ analysisHistory: obj });
        this.setState({ status: 'loaded' });
    }

    async componentDidUpdate(prevProps, prevState) {
    }

    async loadObject(path, opts) {
        if (!path) {
            if ((opts.key) && (opts.collection)) {
                path = `key://pairio/${opts.collection}/~${hash_of_key(opts.key)}`;
            }
        }
        let response;
        try {
            response = await axios.get(`/api/loadObject?path=${encodeURIComponent(path)}`);
        }
        catch (err) {
            return null;
        }
        let rr = response.data;
        if (rr.success) {
            return rr.object;
        }
        else return null;
    }

    render() {
        let header = (
            <tr>
                <th>Analysis date</th>
                <th>Snapshot</th>
            </tr>
        )
        let rows = [];

        if (this.state.status === 'loaded') {
            let analyses = this.state.analysisHistory.analyses;
            for (let i = analyses.length-1; i >= 0; i--) {
                let a = analyses[i];
                let datestr = new Date(a.General.dateUpdated).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })
                rows.push(
                    <tr key={i}>
                        <td key='date'>{datestr}</td>
                        <td key='path'><PathLink path={a.path} abbreviate={false} canCopy={true} canDownload={false}></PathLink></td>
                    </tr>
                )
            }
        }
        else {
            let message = '';
            if (this.state.status === 'loading') {
                message = 'Loading analysis history...';
            }
            else if (this.state.status === 'download-failed') {
                message = 'Failed to download analysis history.'
            }
            else if (this.state.status === 'error') {
                message = 'Error in analysis history.';
            }
            rows.push(
                <tr key={0}>
                    <td key='date'>{message}</td>
                    <td key='path'></td>
                </tr>
            )
        }
        return (
            <div className="page__body">
                <Container className="container__heatmap">
                    <Row className="container__sorter--row justify-content-md-center">
                        <Col lg={12} sm={12} xl={10}>
                            <div className="card card--stats">
                                <div className="content">
                                    <div className="card__label">
                                        <p>
                                            <strong>Analysis archive</strong>
                                        </p>
                                    </div>
                                    <div className="card__footer">
                                        <p>
                                            Below is the SpikeForest analysis archive with the current analysis at the top.
                                            These results may be loaded into Python using the MountainTools and SpikeForest
                                            packages.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="container__sorter--row justify-content-md-center">
                        <Col lg={12} sm={12} xl={10}>
                            <div className="card card--stats">
                                <div className="content">
                                    <table className="table" style={{ width: 'auto' }}>
                                        <thead>
                                            {header}
                                        </thead>
                                        <tbody>
                                            {rows}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

function hash_of_string(key) {
    // creating hash object 
    let hash = crypto.createHash('sha1');
    let data = hash.update(key, 'utf-8');
    return data.digest('hex');
}

function hash_of_key(key) {
    if (typeof (key) == "string") {
        return hash_of_string(key);
    }
    else {
        return hash_of_string(stable_stringify(key));
    }
}

export default Archive;
