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
                            <Col lg={8} sm={12} xl={8}>
                                <div className="card card--stats">
                                    <div className="content">
                                        <div className="card__footer">
                                            <div style={{height: 400, overflow: 'auto'}}>
                                                <ReactMarkdown
                                                    source={prepare_post_markdown(post)}
                                                    renderers={{link: LinkRenderer}}
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

function LinkRenderer(props) {
    return <a href={props.href} target="_blank">{props.children}</a>
}

function prepare_post_markdown(post) {
    return `# ${post.title}\n\n## ${post.date}\n\nby ${post.author}\n\n${post.markdown}`;
}

export default News;
