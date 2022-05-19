import React from 'react';
import {Button, Col, Container, Form, Modal, Row} from 'react-bootstrap';
import {
    NavLink as Link
  } from "react-router-dom";
  import Cartoon from '../../assets/images/cartoon_light.png';
//   import ModalImage from '../../assets/images/desktop_light.png';
  import Logo from '../../assets/images/logo-d.svg'
  import Icon1 from '../../assets/images/social-icon-1.png';
  import Icon2 from '../../assets/images/social-icon-2.png';
  import Icon3 from '../../assets/images/social-icon-3.png';
  import Icon4 from '../../assets/images/social-icon-4.png';
  import Icon5 from '../../assets/images/social-icon-5.png';
  import Icon6 from '../../assets/images/social-icon-6.png';
  import Icon7 from '../../assets/images/social-icon-7.png';
  import Icon8 from '../../assets/images/social-icon-8.png';
const Footer = () => {
    // const [Cartoonshow, setCartoonShow] = React.useState(false);
    // const handle = () => {setCartoonShow(!Cartoonshow); localStorage.setItem('elemCartn', true);};

    // const [show, setShow] = React.useState(false);

    // const handleClose = () => {setShow(false); localStorage.setItem('elemCartn', true);}

    // React.useEffect(() => {
    //     if(!localStorage.getItem('elemCartn')){
    //         setTimeout(() => {
    //             setCartoonShow(true);
    //         }, 1000);
    //         setTimeout(() => {
    //             setShow(true);
    //         }, 2000);
    //     }
    // }, [])
    return (
        <>
            <footer className="footer-gv py-5">
                <Container>
                    <Row>
                        <Col xs={6} sm={4} md={2} className="mb-3">
                            <h4 className='mb-2'>Contact Us</h4>
                            <ul className='list-unstyled'>
                                <li>
                                    <a href="mailto:marketing@planetwatch.io">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi me-2 bi-envelope-fill" viewBox="0 0 16 16">
                                            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                                        </svg>
                                        Marketing
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:marketing@planetwatch.io">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi me-2 bi-envelope-fill" viewBox="0 0 16 16">
                                            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                                        </svg>
                                        Business
                                    </a>
                                </li>
                            </ul>
                        </Col> 
                        <Col xs={6} sm={4} md={2} className="mb-3">
                            <h4 className='mb-2'>Blockchain</h4>
                            <ul className='list-unstyled'>
                                <li>
                                    < a href="https://www.algorand.com/" target="_blank" rel="noreferer">Algorand</a>
                                </li>
                                <li>
                                   < a href="https://www.planetwatch.us/our-token-model/" target="_blank" rel="noreferer">Token Model</a>
                                    
                                </li>
                            </ul>
                        </Col> 
                        <Col xs={6} sm={4} md={2} className="mb-3">
                            <h4 className='mb-2'>Legal</h4>
                            <ul className='list-unstyled'>
                                <li>
                                < a href="https://www.planetwatch.us/legal-terms-and-conditions/" target="_blank" rel="noreferer">Terms and Conditions</a>
                                </li>
                                <li>
                                < a href="https://www.planetwatch.us/general-terms-of-sale-and-delivery/" target="_blank" rel="noreferer">General Terms of sale and delivery</a>
                                </li>
                                <li>
                                < a href="https://www.iubenda.com/privacy-policy/13390372" target="_blank" rel="noreferer">Privacy Policy</a>
                                </li>
                                <li>
                                < a href="https://www.iubenda.com/privacy-policy/13390372/cookie-policy" target="_blank" rel="noreferer">Cookie Policy</a>
                                </li>
                                <li>
                                < a href="https://www.planetwatch.us/license-agreement/" target="_blank" rel="noreferer">License agreement</a>
                                </li>
                            </ul>
                        </Col> 

                        <Col xs={12} sm={12} md={5} className="mb-3 mt-md-0 mt-4">
                            <div className="social_icons flex-wrap justify-content-center d-flex align-items-center">
                                <a href="https://www.facebook.com/PlanetWatch-106206814422901/"  target="_blank" rel="noreferer"><img src={Icon1} alt="icon" /></a>
                                <a href="https://www.linkedin.com/company/planetwatch/" target="_blank" rel="noreferer"> <img src={Icon2} alt="icon" /></a>
                                <a href="https://t.me/planetwatch/" target="_blank" rel="noreferer"> <img src={Icon3} alt="icon" /></a>
                                <a href="https://twitter.com/planetwatchsas/" target="_blank" rel="noreferer"> <img src={Icon4} alt="icon" /></a>
                                <a href="https://discord.com/invite/2DQF6UYdRC/" target="_blank" rel="noreferer"><img src={Icon5} alt="icon" /></a>
                                <a href="https://medium.com/planet-watch/" target="_blank" rel="noreferer"><img src={Icon6} alt="icon" /></a>
                                <a href="https://www.instagram.com/planetwatchsas/" target="_blank" rel="noreferer"><img src={Icon7} alt="icon" /></a>
                                <a href="https://www.youtube.com/channel/UCe5uT64o7nugWNzSgPoktQw/" target="_blank" rel="noreferer"><img src={Icon8} alt="icon" /></a>
                            </div>
                        </Col>
                    </Row>

                    <hr />

                    <Row className='align-items-center'>
                        <Col lg={3} md={4} xs={6}>
                            <p>
                                Planetwatch S.A.S. <br />
                                Société Par Actions Simplifiée <br />
                                50 rue Gustave Eiffel, <br />
                                01630 St. Genis-Pouilly, France
                            </p>
                        </Col>
                        <Col lg={3} md={4} xs={6}>
                            <p>
                                SIREN 880 415 724 <br />
                                R.C.S. Bourg-En-Bresse <br />
                                VAT number <br />
                                FR40880415724
                            </p>
                        </Col>
                        <Col lg={5} md={4} xs={6} className="d-none ms-auto text-center d-md-block">
                            <img width={150} src="https://www.planetwatch.us/wp-content/themes/Planetwatchre/images/PlanetWatch_logo_new_bianco1.png" alt="logo" />
                        </Col>
                    </Row>
                </Container>
            </footer>
            {/* <Modal show={show} size="lg" centered className="modal-dashboard" onHide={handleClose}>
                <Modal.Header closeButton className='align-items-start'>
                    <Modal.Title><h2 className='m-0'>Welcome to Element</h2></Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-0'>
                    <Row className='mb-3 align-items-center'>
                        <Col md={12} className="mb-md-0 mb-0">
                            <p>ELEMENT is a multi-dimensional crypto platform built using the latest web3 framework on the Algorand blockchain to issue CPI pegged capital-efficient algorithmic stablecoins. The platform leverages a new standard to combat price stability called TAU — A DEFI STABLECOIN PROTOCOL that maintains its buying power irrespective of the market’s direction. Element also offers other decentralized finance services like crypto loans, stable swaps, farms, crowdfunding, and NFT services as a one-stop-shop.</p>
                            <p>TAU is the first non-dilutive Algorithmic Fractional Stablecoin DeFi 2.0 Protocol on Algorand to solve the so-called ‘Stablecoin Trilemma’ through its novel stabilization algorithm called Autonomous Demand Supply Balancer (ADSB). The price stability is orthogonally regulated through elastic supply adjustments, burn, and bonding mechanics powered by an ecosystem of optimized interconnected DeFi 2.0 Apps. In addition, the protocol adds more value to the token holders through yield benefits and arbitrage opportunities.</p>
                        </Col>
                        <Col md={4} className="text-center">
                            <img src={Logo} alt="image" className='img-fluid w-75 rounded' /> 
                        </Col>
                    </Row>
                    <Row className='text-center mb-sm-0 my-md-2 mb-3'>
                        <Col sm="4" className='py-sm-4 py-2'>
                        <a href="https://docs.elementfi.io" target="_blank" rel="noopener noreferrer">
                        <Button variant="primary" >TestNet Guide</Button></a>
                        </Col>
                        <Col sm="4" className='py-sm-4 py-2'>
                        <a href="https://discord.com/invite/urquv6EWYs" target="_blank" rel="noopener noreferrer"><Button variant="primary">Discord</Button></a>
                        </Col>
                        <Col sm="4" className='py-sm-4 py-2'>
                        <a href="https://t.me/ElementDeFi" target="_blank" rel="noopener noreferrer"><Button variant="primary">Telegram</Button></a>
                        </Col>
                    </Row>

                    <hr className='mb-3' />

                    <Row className='align-items-center text-sm-start text-center'>
                        <Col sm={6}>
                            {/* <div className='d-inline-block'>
                                <Form.Check 
                                    type={'checkbox'}
                                    id={`dnot-show`}
                                    label={`Don't show again`}
                                />
                            </div> 
                            <div>Copyright © 2022 ELEMENT</div>
                        </Col>
                        <Col sm={6} className="d-none d-md-block text-end">
                            <img src={Logo} alt="image" className='img-fluid' /> 
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal> */}

            {/* <img src={Cartoon} onClick={handle} alt="Cartoon" className={`footer-cartoon ${Cartoonshow ? '' : 'c-hide'}`} /> */}
            {/* <div className='footer-dashboard'>
                <Link to="/dashboard" activeClassName='active'>Analytics</Link>
                <Link to="https://bridge.harmony.one/" target="_blank" rel='noopener noreferrer'>Harmony Bridge</Link>
            </div> */}
        </>
    );
};

export default Footer;