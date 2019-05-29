import React, { Component } from "react";
import axios from "axios";
import crypto from "crypto";
import stable_stringify from "json-stable-stringify";

class ConsoleOutput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            statusMessage: 'Waiting...',
            consoleOutText: null
        };
    }

    async componentDidMount() {
        await this.retrieveText();
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.consoleOutPath !== prevProps.consoleOutPath) {
            await this.retrieveText();
        }
    }

    async retrieveText() {
        if (!this.props.consoleOutPath) {
            this.setState({
                statusMessage: 'No console out path.'
            });
            return;
        }
        this.setState({
            statusMessage: 'Loading ...'
        });
        let txt = await loadText(this.props.consoleOutPath);
        if (txt) {
            this.setState({
                statusMessage: 'Found'
            }); 
        }
        else {
            this.setState({
                statusMessage: 'Not found: ' + this.props.consoleOutPath
            });
        }
        this.setState({consoleOutText: txt});
        
    }

    render() {
        if (!this.state.consoleOutText)
            return <span>{this.state.statusMessage}</span>

        return <pre>
            {this.state.consoleOutText}
        </pre>;
    }
}

async function loadText(path, opts) {
    opts = opts || {};
    if (!path) {
        if ((opts.key) && (opts.collection)) {
            path = `key://pairio/${opts.collection}/~${hash_of_key(opts.key)}`;
        }
    }
    let response;
    try {
        response = await axios.get(`/api/loadText?path=${encodeURIComponent(path)}`);
    }
    catch (err) {
        return null;
    }
    let rr = response.data;
    if (rr.success) {
        return rr.text;
    }
    else return null;
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

export default ConsoleOutput;
