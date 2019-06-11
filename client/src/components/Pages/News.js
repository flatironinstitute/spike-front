import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
const ReactMarkdown = require('react-markdown')

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
    }

    render() {
        let posts = this.props.newsPosts || [{
            title:'loading...',
            date: '',
            author: ''
        }];

        return (
            <div className="page__body">
                <Container className="container__heatmap">
                    {posts.map(post => (
                        <Row key={`${post.title}--${post.date}`} className="container__sorter--row justify-content-md-center">
                            <Col lg={6} sm={12} xl={6}>
                                <div className="card card--stats">
                                    <div className="content">
                                        <div className="card__footer">
                                            <ReactMarkdown source={prepare_post_markdown(post)} />
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

function prepare_post_markdown(post) {
    return `# ${post.title}\n\nby ${post.author} (${post.date})\n\n${post.markdown}`;
}

export default News;
