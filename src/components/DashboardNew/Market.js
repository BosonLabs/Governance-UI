import React from 'react';
import { Card, Col, Container, Row, ProgressBar, Tabs, Tab, Button, InputGroup, Form, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Layout from './LayoutT';

const Dashboard = () => {
    return (
        <Layout>
            <Container>
                <Row>
                    <Col md={6} className="mb-4">
                        <Card className='card-dash border-0 mb-4'>
                            <div className="text-md mb-20 font-semibold leading-7 text-purple">Total Deposited</div>

                            <div className='mb-20'>
                                <h2 className='mb-0'>$6,456,172.11</h2>
                            </div>
                            

                            <hr className='mb-20 mt-0' />

                            <div className='mb-0'>
                                <h6 className='sub-heading mb-0'>
                                    Top 4 Markets
                                </h6>
                                
                                <Row>
                                    <Col sm={6} className="d-flex align-items-start mt-3">
                                        <span className='me-3'><img style={{width: '20px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" /></span>
                                        <div className='flex-grow-1'>
                                            <div className="d-flex mb-2 justify-content-between align-items-center">
                                                <strong>gALGO3</strong>
                                                <span style={{opacity: '0.5'}}>38.23%</span>
                                            </div>
                                            <ProgressBar now={38.23} />
                                        </div>
                                    </Col>
                                    <Col sm={6} className="d-flex align-items-start mt-3">
                                        <span className='me-3'><img style={{width: '20px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" /></span>
                                        <div className='flex-grow-1'>
                                            <div className="d-flex mb-2 justify-content-between align-items-center">
                                                <strong>ALGO</strong>
                                                <span style={{opacity: '0.5'}}>30.35%</span>
                                            </div>
                                            <ProgressBar now={30.35} />
                                        </div>
                                    </Col>
                                    <Col sm={6} className="d-flex align-items-start mt-3">
                                        <span className='me-3'><img style={{width: '20px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" /></span>
                                        <div className='flex-grow-1'>
                                            <div className="d-flex mb-2 justify-content-between align-items-center">
                                                <strong>USDC</strong>
                                                <span style={{opacity: '0.5'}}>11.33%</span>
                                            </div>
                                            <ProgressBar now={11.33} />
                                        </div>
                                    </Col>
                                    <Col sm={6} className="d-flex align-items-start mt-3">
                                        <span className='me-3'><img style={{width: '20px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" /></span>
                                        <div className='flex-grow-1'>
                                            <div className="d-flex mb-2 justify-content-between align-items-center">
                                                <strong>USDt</strong>
                                                <span style={{opacity: '0.5'}}>8.77%</span>
                                            </div>
                                            <ProgressBar now={8.77} />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            
                        </Card>                                              
                    </Col>
                    <Col md={6} className="mb-4">
                        <Card className='card-dash border-0 mb-4'>
                            <div className="text-md mb-20 font-semibold leading-7 text-purple">Total Borrowed</div>

                            <div className='mb-20'>
                                <h2 className='mb-0'>$1,491,495.68</h2>
                            </div>
                            

                            <hr className='mb-20 mt-0' />

                            <div className='mb-0'>
                                <h6 className='sub-heading mb-0'>
                                    Top 4 Markets
                                </h6>
                                
                                <Row>
                                    <Col sm={6} className="d-flex align-items-start mt-3">
                                        <span className='me-3'><img style={{width: '20px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" /></span>
                                        <div className='flex-grow-1'>
                                            <div className="d-flex mb-2 justify-content-between align-items-center">
                                                <strong>gALGO3</strong>
                                                <span style={{opacity: '0.5'}}>38.23%</span>
                                            </div>
                                            <ProgressBar now={38.23} />
                                        </div>
                                    </Col>
                                    <Col sm={6} className="d-flex align-items-start mt-3">
                                        <span className='me-3'><img style={{width: '20px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" /></span>
                                        <div className='flex-grow-1'>
                                            <div className="d-flex mb-2 justify-content-between align-items-center">
                                                <strong>ALGO</strong>
                                                <span style={{opacity: '0.5'}}>30.35%</span>
                                            </div>
                                            <ProgressBar now={30.35} />
                                        </div>
                                    </Col>
                                    <Col sm={6} className="d-flex align-items-start mt-3">
                                        <span className='me-3'><img style={{width: '20px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" /></span>
                                        <div className='flex-grow-1'>
                                            <div className="d-flex mb-2 justify-content-between align-items-center">
                                                <strong>USDC</strong>
                                                <span style={{opacity: '0.5'}}>11.33%</span>
                                            </div>
                                            <ProgressBar now={11.33} />
                                        </div>
                                    </Col>
                                    <Col sm={6} className="d-flex align-items-start mt-3">
                                        <span className='me-3'><img style={{width: '20px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" /></span>
                                        <div className='flex-grow-1'>
                                            <div className="d-flex mb-2 justify-content-between align-items-center">
                                                <strong>USDt</strong>
                                                <span style={{opacity: '0.5'}}>8.77%</span>
                                            </div>
                                            <ProgressBar now={8.77} />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            
                        </Card>                                              
                    </Col>
                </Row>

                <Card className='card-dash d-block border-0 mb-4'>
                    <div className="nft-tabs float-md-end">
                        <InputGroup className="input-group-search">
                            <Form.Control placeholder="Search" />
                            <Button variant="outline-secondary" id="button-addon2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                            </Button>
                        </InputGroup>   
                    </div>
                    <Tabs defaultActiveKey="all" className='dashboard-tabs' id="tab-example-1">
                        <Tab eventKey="all" title="All">
                            <div className="mb-4">
                                <Table responsive hover className='dashboard-table'>
                                    <thead>
                                        <tr>
                                            <th>Asset</th>
                                            <th className='text-center'>Total Deposited</th>
                                            <th className='text-center'>Total Borrowed</th>
                                            <th className='text-end'>
                                                Deposit APR
                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                        </Tooltip>
                                                    }
                                                    >
                                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                </OverlayTrigger>
                                            </th>
                                            <th className='text-end'>
                                                Borrow APR
                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                        </Tooltip>
                                                    }
                                                    >
                                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                </OverlayTrigger>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <span className='me-lg-3 me-2'><img style={{width: '30px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" /></span>
                                                    <div className='text-nowrap' style={{lineHeight: '1.4'}}>
                                                        <span style={{fontWeight: '500'}}>ALGO</span> <br /><span style={{opacity: '0.5'}}>ALGO</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='text-center'>
                                                <strong>$1,950,056.27</strong>
                                            </td>
                                            <td className='text-center'>
                                                <strong>$763,617.17</strong>
                                            </td>
                                            <td className='text-end'>
                                                <strong style={{color : '#1eb76f'}}>2.39%</strong>
                                            </td>
                                            <td className='text-end'>
                                                <strong style={{color : '#613eeb'}}>6.66%</strong><br />
                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                        </Tooltip>
                                                    }
                                                    >
                                                    <div className="info-badge mt-1 d-inline-flex align-items-center">
                                                        + up to 4.39% <img style={{width: '20px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" />
                                                    </div>
                                                </OverlayTrigger>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <span className='me-lg-3 me-2'><img style={{width: '30px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" /></span>
                                                    <div className='text-nowrap' style={{lineHeight: '1.4'}}>
                                                        <span style={{fontWeight: '500'}}>ALGO</span> <br /><span style={{opacity: '0.5'}}>ALGO</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='text-center'>
                                                <strong>$1,950,056.27</strong>
                                            </td>
                                            <td className='text-center'>
                                                <strong>$763,617.17</strong>
                                            </td>
                                            <td className='text-end'>
                                                <strong style={{color : '#1eb76f'}}>2.39%</strong><br />
                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                        </Tooltip>
                                                    }
                                                    >
                                                    <div className="info-badge mt-1 d-inline-flex align-items-center">
                                                        + up to 4.39% <img style={{width: '20px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" />
                                                    </div>
                                                </OverlayTrigger>
                                            </td>
                                            <td className='text-end'>
                                                <strong style={{color : '#613eeb'}}>6.66%</strong><br />
                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                        </Tooltip>
                                                    }
                                                    >
                                                    <div className="info-badge mt-1 d-inline-flex align-items-center">
                                                        + up to 4.39% <img style={{width: '20px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" />
                                                    </div>
                                                </OverlayTrigger>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <span className='me-lg-3 me-2'><img style={{width: '30px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" /></span>
                                                    <div className='text-nowrap' style={{lineHeight: '1.4'}}>
                                                        <span style={{fontWeight: '500'}}>ALGO</span> <br /><span style={{opacity: '0.5'}}>ALGO</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='text-center'>
                                                <strong>$1,950,056.27</strong>
                                            </td>
                                            <td className='text-center'>
                                                <strong>$763,617.17</strong>
                                            </td>
                                            <td className='text-end'>
                                                <strong style={{color : '#1eb76f'}}>2.39%</strong><br />
                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                        </Tooltip>
                                                    }
                                                    >
                                                    <div className="info-badge mt-1 d-inline-flex align-items-center">
                                                        + up to 4.39% <img style={{width: '20px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" />
                                                    </div>
                                                </OverlayTrigger>
                                            </td>
                                            <td className='text-end'>
                                                <strong style={{color : '#613eeb'}}>6.66%</strong><br />
                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                        </Tooltip>
                                                    }
                                                    >
                                                    <div className="info-badge mt-1 d-inline-flex align-items-center">
                                                        + up to 4.39% <img style={{width: '20px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" />
                                                    </div>
                                                </OverlayTrigger>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <span className='me-lg-3 me-2'><img style={{width: '30px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" /></span>
                                                    <div className='text-nowrap' style={{lineHeight: '1.4'}}>
                                                        <span style={{fontWeight: '500'}}>ALGO</span> <br /><span style={{opacity: '0.5'}}>ALGO</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='text-center'>
                                                <strong>$1,950,056.27</strong>
                                            </td>
                                            <td className='text-center'>
                                                <strong>$763,617.17</strong>
                                            </td>
                                            <td className='text-end'>
                                                <strong style={{color : '#1eb76f'}}>2.39%</strong><br />
                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                        </Tooltip>
                                                    }
                                                    >
                                                    <div className="info-badge mt-1 d-inline-flex align-items-center">
                                                        + up to 4.39% <img style={{width: '20px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" />
                                                    </div>
                                                </OverlayTrigger>
                                            </td>
                                            <td className='text-end'>
                                                <strong style={{color : '#613eeb'}}>6.66%</strong><br />
                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                        </Tooltip>
                                                    }
                                                    >
                                                    <div className="info-badge mt-1 d-inline-flex align-items-center">
                                                        + up to 4.39% <img style={{width: '20px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" />
                                                    </div>
                                                </OverlayTrigger>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Tab>
                        <Tab eventKey="favorites" title="Favorites">
                            <div className="mb-4">
                                <Table responsive hover className='dashboard-table'>
                                    <thead>
                                        <tr>
                                            <th>Asset</th>
                                            <th className='text-center'>Total Deposited</th>
                                            <th className='text-center'>Total Borrowed</th>
                                            <th className='text-end'>
                                                Deposit APR
                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                        </Tooltip>
                                                    }
                                                    >
                                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                </OverlayTrigger>
                                            </th>
                                            <th className='text-end'>
                                                Borrow APR
                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                                        </Tooltip>
                                                    }
                                                    >
                                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                </OverlayTrigger>
                                            </th>
                                        </tr>
                                    </thead>
                                </Table>

                                <div className="empty-content mt-5 text-center">
                                    <h4 className='text-muted'>You have not added any assets to your favorites. <br />You can add them by clicking on the star icon  next to their name</h4>
                                    <Button variant='blue' className='py-3 px-5'>See all assets</Button>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </Card>
            </Container>
        </Layout>
    );
};

export default Dashboard;