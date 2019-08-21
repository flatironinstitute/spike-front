import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
const ReactMarkdown = require("react-markdown");

class News extends Component {
  render() {
    let posts = this.props.newsPosts || [
      {
        title: "loading...",
        date: "",
        author: ""
      }
    ];
    let latest = this.props.newsPosts
      ? this.props.newsPosts[0].date
      : "2019/08/21";

    return (
      <div className="page__body">
        <Container className="container__heatmap">
          <Row className="justify-content-md-center">
            <Col lg={12} sm={12} xl={10}>
              <div className="intro">
                <p className="big">News</p>
              </div>
            </Col>
          </Row>
          {posts.map(post => (
            <Row
              key={`${post.title}--${post.date}`}
              className="container__sorter--row justify-content-md-center"
            >
              <Col lg={12} sm={12} xl={10}>
                <div className="card card--stats">
                  <div className="content">
                    <div className="card__label">
                      <p>
                        <strong>
                          {post.title} <em>{post.date}</em>
                        </strong>
                      </p>
                    </div>
                    <div className="card__footer">
                      <hr />
                      <div style={{ height: 400, overflow: "auto" }}>
                        <ReactMarkdown
                          source={preparePostMarkdown(post)}
                          renderers={{ link: renderLink }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          ))}
        </Container>
      </div>
    );
  }
}

function renderLink(props) {
  return (
    <a href={props.href} rel="noopener noreferrer" target="_blank">
      {props.children}
    </a>
  );
}

function preparePostMarkdown(post) {
  return `# ${post.title}\n\n## ${post.date}\n\nby ${post.author}\n\n${
    post.markdown
  }`;
}

export default News;
