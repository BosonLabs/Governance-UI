import React from 'react';
import { Card, Col, Container, Row, Tabs, Tab, Button, InputGroup, Form, Table, OverlayTrigger, Tooltip, Modal } from 'react-bootstrap';
import Layout from './LayoutT';
import PieChart from './snippets/PieChart';
import Slider from './snippets/ReactRange';

const Deposit = () => {
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Layout>
            <Container>
                <Row>
                    <Col md={6} className="mb-4">
                        <h4 className='mb-3'>Available To Deposit</h4>
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
                                    <div className="mb-0">
                                        <Table responsive hover className='dashboard-table mb-0'>
                                            <thead>
                                                <tr>
                                                    <th>Asset</th>
                                                    <th className='text-end'>Your Wallet Balance</th>
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
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className='cursor-pointer' onClick={handleShow}>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <span className='me-lg-3 me-2'><img style={{width: '30px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" /></span>
                                                            <div className='text-nowrap' style={{lineHeight: '1.4'}}>
                                                                <span style={{fontWeight: '500'}}>ALGO</span> <br /><span style={{opacity: '0.5'}}>ALGO</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='text-end'>
                                                        <div className='text-nowrap' style={{lineHeight: '1.4'}}>
                                                            <span style={{fontWeight: '500'}}>0 ALGO</span> <br /><span style={{opacity: '0.5'}}>$0</span>
                                                        </div>
                                                    </td>
                                                    <td className='text-end'>
                                                        <strong style={{color : '#1eb76f'}}>2.4%</strong>
                                                    </td>
                                                </tr>
                                                <tr className='cursor-pointer' onClick={handleShow}>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <span className='me-lg-3 me-2'><img style={{width: '30px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" /></span>
                                                            <div className='text-nowrap' style={{lineHeight: '1.4'}}>
                                                                <span style={{fontWeight: '500'}}>ALGO</span> <br /><span style={{opacity: '0.5'}}>ALGO</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='text-end'>
                                                        <div className='text-nowrap' style={{lineHeight: '1.4'}}>
                                                            <span style={{fontWeight: '500'}}>0 ALGO</span> <br /><span style={{opacity: '0.5'}}>$0</span>
                                                        </div>
                                                    </td>
                                                    <td className='text-end'>
                                                        <strong style={{color : '#1eb76f'}}>2.4%</strong>
                                                    </td>
                                                </tr>
                                                <tr className='cursor-pointer' onClick={handleShow}>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <span className='me-lg-3 me-2'><img style={{width: '30px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" /></span>
                                                            <div className='text-nowrap' style={{lineHeight: '1.4'}}>
                                                                <span style={{fontWeight: '500'}}>ALGO</span> <br /><span style={{opacity: '0.5'}}>ALGO</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='text-end'>
                                                        <div className='text-nowrap' style={{lineHeight: '1.4'}}>
                                                            <span style={{fontWeight: '500'}}>0 ALGO</span> <br /><span style={{opacity: '0.5'}}>$0</span>
                                                        </div>
                                                    </td>
                                                    <td className='text-end'>
                                                        <strong style={{color : '#1eb76f'}}>2.4%</strong>
                                                    </td>
                                                </tr>
                                                <tr className='cursor-pointer' onClick={handleShow}>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <span className='me-lg-3 me-2'><img style={{width: '30px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" /></span>
                                                            <div className='text-nowrap' style={{lineHeight: '1.4'}}>
                                                                <span style={{fontWeight: '500'}}>ALGO</span> <br /><span style={{opacity: '0.5'}}>ALGO</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='text-end'>
                                                        <div className='text-nowrap' style={{lineHeight: '1.4'}}>
                                                            <span style={{fontWeight: '500'}}>0 ALGO</span> <br /><span style={{opacity: '0.5'}}>$0</span>
                                                        </div>
                                                    </td>
                                                    <td className='text-end'>
                                                        <strong style={{color : '#1eb76f'}}>2.4%</strong>
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
                                                    <th className='text-end'>Your Wallet Balance</th>
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
                                                </tr>
                                            </thead>
                                        </Table>

                                        <div className="empty-content mt-2 text-center">
                                            <h4 className='text-muted'>You have not added any assets to your favorites. <br />You can add them by clicking on the star icon  next to their name</h4>
                                            <Button variant='blue' className='py-3 px-5'>See all assets</Button>
                                        </div>
                                    </div>
                                </Tab>
                            </Tabs>
                        </Card>                                              
                    </Col>
                    <Col md={6} className="mb-4">
                        <h4 className='mb-3'>My Deposit Information</h4>
                        <Card className='card-dash text-center border-0 mb-4'>
                            <div className="mb-4">
                                <div className="deposit-chart">
                                    <PieChart />
                                    <span>No Deposits</span>
                                </div>
                            </div>
                            
                            <div className="deposit-content">
                                <h4 className='mb-0' style={{color: '#1eb76f'}}>Deposit APR 
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
                                </h4>
                                <h2 className='mb-0'>0%</h2>
                                <hr />
                                <h4 className='mb-3'>Deposit Balance <span style={{color: '#1eb76f'}}>$0</span></h4>
                                <hr />
                                <h6 className='subheading mb-0 p-0'>Used As Collateral $0</h6>
                            </div>
                        </Card>  

                        <h4 className='mb-3'>My Deposits</h4>
                        <Card className='card-dash text-center border-0 mb-4'>
                            <div className="mb-4">
                                <Table responsive hover className='dashboard-table'>
                                    <thead>
                                        <tr>
                                            <th>Asset</th>
                                            <th className='text-end'>
                                                Deposit APR	
                                            </th>
                                            <th className='text-center'>Available Balance</th>
                                            <th className='text-center'>Collateral Balance</th>
                                        </tr>
                                    </thead>
                                </Table>

                                <div className="empty-content mt-4 text-center">
                                    <h4 className='text-muted'>No deposits yet</h4>
                                </div>
                            </div>
                        </Card>                                              
                    </Col>
                </Row>
            </Container>

            <Modal show={show} className="modal-dashboard" centered onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>DEPOSIT</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="d-flex justify-content-center mb-3 align-items-center">
                        <span className='me-lg-3 me-2'><img style={{width: '30px'}} src="https://app.folks.finance/usdc.svg" alt="usdc" /></span>
                        <div className='text-white' style={{lineHeight: '1.4'}}>
                            <span style={{fontWeight: '500', fontSize: '22px'}}>ALGO</span>
                        </div>
                    </div>
                    <input type="text" style={{fontWeight: '600', fontSize: '20px !important'}} placeholder='ALGO' className='form-control text-center form-control-field' />
                    <p className='text-center text-gray'>$0</p>

                    <div className="text-end text-white"><small>Available to deposit: 0 ALGO</small></div>
                    <div className="mb-3 py-1">
                        <Slider />
                    </div>
                    <p className='d-flex align-items-center justify-content-between mb-0'>
                        <span>
                            Deposit APR
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                    </Tooltip>
                                }
                                >
                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                            </OverlayTrigger>
                        </span>
                        <strong style={{color: '#1eb76f'}}>2.36%</strong>
                    </p>
                    <hr />
                    <p className='d-flex align-items-center justify-content-between'>
                        <span>
                            Deposit Token
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                    </Tooltip>
                                }
                                >
                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                            </OverlayTrigger>
                        </span>
                        <strong style={{color: '#808191'}}>0 fALGO</strong>
                    </p>

                    <div className="mt-4 text-center">
                        <Button variant='primary' className='btn-blue' disabled>Insufficient balance to pay gas fees</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </Layout>
    );
};

export default Deposit;