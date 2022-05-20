import React, {useState, useEffect} from 'react';
import { Card, Col, Container, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import Layout from './LayoutT';

import governance from './governance.json';

import node from './nodeapi.json';


const algosdk = require('algosdk');
const Dashboard = () => {

    useEffect(() => {
        document.title = "PLANET WATCH | HOME"
    }, [])



    return (
        <Layout>
            <Container>

            </Container>
        </Layout>
    );
};

export default Dashboard;