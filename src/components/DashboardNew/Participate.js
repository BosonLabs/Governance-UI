import React, {useEffect} from 'react';
import { Col, Container, Row, Form, InputGroup, Button} from 'react-bootstrap';
import Layout from './LayoutT';
import {
    Link
  } from "react-router-dom";

import PostCard from './snippets/PostCard';
import PostCardNew from './snippets/PostCardNew';
import PostCardElem from './snippets/PostCardElem';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import '../toast-style-override.css'
function Participate() {
    useEffect(() => {
        document.title = "PLANET WATCH | PARTICIPATE"
    }, [])
    return (
        <Layout>
            <Container>
                <Row className='mb-5'>
                    <Col lg={4} className='mb-4'>
                        <PostCard />
                    </Col>
                    <Col lg={4} className='mb-4'>
                        <PostCardElem />
                    </Col>
                    {/* <Col lg={4} className='mb-4'>
                        <PostCardNew />
                    </Col> */}
                    {/* <Col lg={4} className='mb-4'>
                        <PostCard />
                    </Col>
                    <Col lg={4} className='mb-4'>
                        <PostCard />
                    </Col> */}
                </Row>
            </Container>
        </Layout>
    );
}

export default Participate;