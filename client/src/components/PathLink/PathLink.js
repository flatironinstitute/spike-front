import React, { Component } from "react";
import "./PathLink.css";
const axios = require("axios");
const stable_stringify = require("json-stable-stringify");
const crypto = require("crypto");

class PathLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      downloadUrl: null
    };
  }

  componentDidMount() {}

  handleClick = () => {
    this.setState({ clicked: true });
  };

  handleUnclick = () => {
    this.setState({ clicked: false });
  };

  handleDownload = async path => {
    this.setState({ downloadUrl: "checking" });
    let url = await findFile(path);
    if (url) {
      this.setState({ downloadUrl: url });
    } else {
      this.setState({ downloadUrl: "not-found" });
    }
  };

  render() {
    let abbreviate = this.props.abbreviate || false;
    let canCopy = this.props.canCopy || true;
    let canDownload = this.props.canDownload || false;
    let path = this.props.path || this.props.row.path;

    let downloadButton = <span />;
    if (canDownload) {
      if (
        this.state.downloadUrl === null ||
        this.state.downloadUrl === "not-found"
      ) {
        let txt = "prepare-download";
        if (this.state.downloadUrl === "not-found") txt = "not found";
        downloadButton = (
          <button
            className="path-link-button"
            onClick={this.handleDownload(path)}
          >
            {txt}
          </button>
        );
      } else if (this.state.downloadUrl === "checking") {
        return <span>checking...</span>;
      } else {
        downloadButton = <a href={this.state.downloadUrl}>download</a>;
      }
    }

    let link0 = <span />;
    if (this.state.clicked) {
      if (canCopy) {
        let style0 = {
          width: abbreviate ? 150 : 350
        };
        link0 = (
          <input
            type={"text"}
            value={path}
            readOnly={true}
            onFocus={e => e.target.select()}
            onBlur={this.handleUnclick}
            autoFocus={true}
            style={style0}
          />
        );
      } else {
        link0 = <span>{path}</span>;
      }
    } else {
      let text = this.props.label || path;
      if (abbreviate) {
        let list0 = path.split("/");
        text = `${list0[0]}//${(list0[2] || "").slice(0, 4)}.../${
          list0[list0.length - 1]
        }`;
      }

      if (canCopy) {
        link0 = (
          <span title={`Click for more options for ${path}`}>
            <button className="path-link-button" onClick={this.handleClick}>
              {text}
            </button>
          </span>
        );
      } else {
        link0 = <span title={`${path}`}>{text}</span>;
      }
    }
    return (
      <span>
        {link0} {downloadButton}
      </span>
    );
  }
}

async function findFile(path, opts) {
  if (!path) {
    if (opts.key && opts.collection) {
      path = `key://pairio/${opts.collection}/~${hash_of_key(opts.key)}`;
    }
  }
  let response;
  try {
    response = await axios.get(
      `/api/findFile?path=${encodeURIComponent(path)}`
    );
  } catch (err) {
    return null;
  }
  let rr = response.data;
  if (rr.success) {
    return rr.url;
  } else return null;
}

function hash_of_string(key) {
  // creating hash object
  let hash = crypto.createHash("sha1");
  let data = hash.update(key, "utf-8");
  return data.digest("hex");
}

function hash_of_key(key) {
  if (typeof key == "string") {
    return hash_of_string(key);
  } else {
    return hash_of_string(stable_stringify(key));
  }
}

export default PathLink;
