import React, {useState, useEffect} from 'react';
import { Card, Col, Container, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import Layout from './LayoutT';
import AreaChart from './snippets/AreaChart';
import AreaChartTau from './snippets/AreaChartTau';
import AreaChartasaswap from './snippets/AreaChartASAswap';
import AreaChartMintFeeTau from './snippets/AreaChartMintFeeTau';
import AreaChartEinr from './snippets/AreaChartEinr';
import AreaChartElemReserve from './snippets/AreaChartElemReserve';
import AreaChartMintFeeEinr from './snippets/AreaChartMintFeeEinr';
import AreaChartRedeemFee from './snippets/AreaChartRedeemFee';
import AreaChartTauCollateral from './snippets/AreaChartTauCollateral';
import AreaChartEinrCollateral from './snippets/AreaChartEinrCollateral';
import LineChart from './snippets/LineChart';
import PieChartElem from './snippets/PieChart';
import PieChartTau from './snippets/PieChart';
import PieChartEinr from './snippets/PieChart';
import node from './nodeapi.json';
import dashboardDetails from '../Dashboard/stablecoin.json';
import config from '../../NFTFolder/config.json'
import axios from 'axios';
import { elemToken } from '../swapConfig';
import AreaChartNFT from './snippets/AreaChartNFT'
import Logo from '../../assets/images/algorand-logo.png';

const algosdk = require('algosdk');
const VoteStatus = () => {

    useEffect(() => {
        document.title = "PLANET WATCH | VOTESTATUS"
    }, [])

    const [einrCir, setEinrCir] = useState("");
    const [elemCir, setElemCir] = useState("");
    const [tauCir, setTauCir] = useState("");
    const [usdcFee, setUsdcFee] = useState("");
    const [tauFee, setTauFee] = useState("");
    const [einrFee, setEinrFee] = useState("");
    const [elemBalance, setElemBalance] = useState("");
    const [elemReserveBalance, setElemReserveBalance] = useState("");
    const [tauBalance, setTauBalance] = useState("");
    const [usdcTauBalance, setUsdcTauBalance] = useState("");
    const [einrBalance, setEinrBalance] = useState("");
    const [usdcEinrBalance, setUsdcEinrBalance] = useState("");
    const [nftBalance, setnftBalance] = useState("");
    const[asaswapelembalance,setasaswapelembalance] = useState("");

    const algodClientGet = new algosdk.Algodv2('', node['algodclient'], '');
    
        const algodClient = new algosdk.Algodv2('', node['algodclient'], '');
        const indexClient = new algosdk.Indexer('', node['indexerclient'], '');

        const tauID = dashboardDetails.tauID;
        const einrID = dashboardDetails.einrID;
        const elemID = dashboardDetails.elemID;
        const usdcID = dashboardDetails.usdcID;
        const tauTotalSupply = 18446744073709.551615;
        const elemTotalSupply = 18446744073709.551615;
        const einrTotalSupply = 18446744073709.551615;

    useEffect(async() => {
        await cir();
    }, [tauCir, einrCir, elemCir, usdcFee]);

    const cir =async () =>
    {
        let escrow = await indexClient.lookupAccountByID(dashboardDetails.dynamicStablecoinEscrowAddressEinr).do(); 
        let tauFeeAddress = await indexClient.lookupAccountByID(dashboardDetails.owner).do();
        let einrFeeAddress = await indexClient.lookupAccountByID(dashboardDetails.owner).do();  
        let usdcFeeAddress = await indexClient.lookupAccountByID(dashboardDetails.owner).do(); 
        let elemReserve = await indexClient.lookupAccountByID(dashboardDetails.elemReserveAddress).do();
        let tauReserve = await indexClient.lookupAccountByID(dashboardDetails.dynamicStablecoinEscrowAddress).do();   
        let usdcTreasuryTau = await indexClient.lookupAccountByID(dashboardDetails.dynamicStablecoinEscrowAddress).do(); 
        let usdcTreasuryEinr = await indexClient.lookupAccountByID(dashboardDetails.dynamicStablecoinEscrowAddressEinr).do();       
    let eL = escrow['account']['assets']['length'];
    let elemL = elemReserve['account']['assets']['length'];
    let tauFeeL = tauFeeAddress['account']['assets']['length'];
    let einrFeeL = einrFeeAddress['account']['assets']['length'];
    let usdcFeeL = usdcFeeAddress['account']['assets']['length'];
    let tauL = tauReserve['account']['assets']['length'];
    let usdcTreasuryTauL = usdcTreasuryTau['account']['assets']['length'];
    let usdcTreasuryEinrL = usdcTreasuryEinr['account']['assets']['length'];
    // console.log(l);
    for(let k = 0; k < tauL; k++)
    {
        if(tauReserve['account']['assets'][k]['asset-id'] === tauID)
        {
            setTauCir(tauReserve['account']['assets'][k]['amount']);
            break;
        }
    }
    for(let k = 0; k < eL; k++)
    {
        if(escrow['account']['assets'][k]['asset-id'] === einrID)
        {
            setEinrCir(escrow['account']['assets'][k]['amount']);
            break;
        }
    }
    for(let k = 0; k < elemL; k++)
    {
        if(elemReserve['account']['assets'][k]['asset-id'] === elemID)
        {
            setElemCir(elemReserve['account']['assets'][k]['amount']);
            break;
        }
    }  
    for(let k = 0; k < tauFeeL; k++)
    {
        if(tauFeeAddress['account']['assets'][k]['asset-id'] === tauID)
        {
            setTauFee(tauFeeAddress['account']['assets'][k]['amount']);
            break;
        }
    }     
    for(let k = 0; k < einrFeeL; k++)
    {
        if(einrFeeAddress['account']['assets'][k]['asset-id'] === einrID)
        {
            setEinrFee(einrFeeAddress['account']['assets'][k]['amount']);
            break;
        }
    }    
    for(let k = 0; k < usdcFeeL; k++)
    {
        if(usdcFeeAddress['account']['assets'][k]['asset-id'] === usdcID)
        {
            setUsdcFee(usdcFeeAddress['account']['assets'][k]['amount']);
            break;
        }
    } 
    for(let i = 0; i < usdcTreasuryTauL; i++)
    {
        if(usdcTreasuryTau['account']['assets'][i]['asset-id'] === usdcID)
        {
    setUsdcTauBalance(parseFloat(usdcTreasuryTau['account']['assets'][i]['amount'])/1000000);
    break;
        }
    }
    for(let i = 0; i < usdcTreasuryEinrL; i++)
    {
        if(usdcTreasuryEinr['account']['assets'][i]['asset-id'] === usdcID)
        {
    setUsdcEinrBalance(parseFloat(usdcTreasuryEinr['account']['assets'][i]['amount'])/1000000);
    break;
        }
    }
    }

    useEffect(async() => {
        await Balance()
		let ln = await axios.get(`${node['algodclient']}/v2/accounts/K44D26OSBNXR4DOYT4E6X7NLUOWRVJYYHDKWCBRGUNTL3VF3TLZZSCVXQU/assets/${elemToken}`);
        setasaswapelembalance(ln.data['asset-holding'].amount);
    }, [elemBalance, tauBalance, einrBalance]);        
    
    const Balance = async () =>{
    let balance = await indexClient.lookupAccountByID(dashboardDetails.rebaseElemTreasury).do();
    let elemReservebalance = await indexClient.lookupAccountByID(dashboardDetails.elemReserveAddress).do();
    let taubalance = await indexClient.lookupAccountByID(dashboardDetails.dynamicStablecoinEscrowAddress).do();
    let einrbalance = await indexClient.lookupAccountByID(dashboardDetails.dynamicStablecoinEscrowAddressEinr).do();
    // console.log(balance);
    // console.log(taubalance);
    // console.log(einrbalance);
    let assetCount = balance['account']['assets']['length'];
    let assetCountElemReserve = balance['account']['assets']['length'];
    let assetCountTau = taubalance['account']['assets']['length'];
    let assetCountEinr = einrbalance['account']['assets']['length'];
    // console.log(l);
    for(let i = 0; i < assetCount; i++)
    {
        if(balance['account']['assets'][i]['asset-id'] === elemID)
        {
    setElemBalance(parseFloat(balance['account']['assets'][i]['amount'])/1000000);
    break;
        }
    }
    for(let i = 0; i < assetCountElemReserve; i++)
    {
        if(elemReservebalance['account']['assets'][i]['asset-id'] === elemID)
        {
    setElemReserveBalance(parseFloat(elemReservebalance['account']['assets'][i]['amount'])/1000000);
    break;
        }
    }
    for(let i = 0; i < assetCountTau; i++)
    {
        if(taubalance['account']['assets'][i]['asset-id'] === tauID)
        {
    setTauBalance(parseFloat(taubalance['account']['assets'][i]['amount'])/1000000);
    break;
        }
    }
    for(let i = 0; i < assetCountEinr; i++)
    {
        if(einrbalance['account']['assets'][i]['asset-id'] === einrID)
        {
    setEinrBalance(parseFloat(einrbalance['account']['assets'][i]['amount'])/1000000);
    break;
        }
    }
    }   
    
    useEffect(async() => {
        await NFTBalance()
    }, [nftBalance]);        

    const NFTBalance = async () =>{
        let ln = await axios.get(`${node['algodclient']}/v2/accounts/${config.feesescrow}`);                
        let k = ln.data.amount;        
        //console.log("lndata",k);
        setnftBalance(parseFloat(k/1000000));
        //let balance = await indexClient.lookupAccountByID(config.elemescrow).do();
        
        //let assetCount = balance['account']['assets']['length']
        //sconsole.log("Ass",k)  
        // console.log(l);
        // for(let i = 0; i < assetCount; i++)
        // {
        //     if(balance['account']['assets'][i]['asset-id'] === "76802389")
        //     {
        // setnftBalance(parseFloat(balance['account']['assets'][i]['amount'])/1000000);
        // break;
        //     }
        // }
        }    

    return (
        <Layout>
            <Container>
                <Row>
                    <Col md={6} className="mb-4">                
                        <Card className='card-dash border-0 mb-4'>
                            <Row>
                                <Col>
                            <div className="text-md mb-20 font-semibold leading-7 text-purple">VOTES  
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                       Total No of Votes casted
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger>
                            </div>
                            </Col>
                           
                            </Row>
                            


                            <hr className='mb-20 mt-0' />
                            <div className='mb-0'>
                                

                                <Row className='justify-content-center'>
                                    <Col xs={12} sm={6} className="mb-sm-0 text-center mb-3">
                                        <PieChartTau />
                                    </Col>
                                    <Col xs={'auto'} sm={6}>
                                        <div className='mb-20 pt-sm-3'>
                                            <div className="text-sm d-flex align-items-center mb-1  ">
                                                <svg className="d-inline-block me-2" style={{width: '16px', height: '16px', borderRadius: '4px'}}><rect fill="#2C3862" x="0" y="0" width="16" height="16"></rect></svg>
                                                YES

                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            No of Voters vote Yes
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger>
                                            </div>
                                            <h6>{parseInt((tauTotalSupply - parseFloat(tauCir)/1000000)) ? (parseInt((tauTotalSupply - parseFloat(tauCir)/1000000).toFixed(0))).toLocaleString() : "0"} TAU</h6>
                                        </div>
                                        <div className='mb-20'>
                                            <div className="text-sm d-flex align-items-center mb-1  ">
                                                <svg className="d-inline-block me-2" style={{width: '16px', height: '16px', borderRadius: '4px'}}><rect fill="#55689E" x="0" y="0" width="16" height="16"></rect></svg>
                                                NO

                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            No of Voters vote NO
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger>
                                            </div>
                                            <h6>{(parseInt((parseFloat(tauCir)/1000000))) ? (parseInt((parseFloat(tauCir)/1000000).toFixed(0))).toLocaleString() : "0"} TAU</h6>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                    <Col md={6}>
                    <Card className='card-dash border-0 mb-4'>
                            <Row>
                                <Col>
                            <div className="text-md mb-20 font-semibold leading-7 text-purple">VOTES  
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                       Total No of Votes casted
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger>
                            </div>
                            </Col>
                           
                            </Row>
                            


                            <hr className='mb-20 mt-0' />
                            <div className='mb-0'>
                                

                                <Row className='justify-content-center'>
                                    <Col xs={12} sm={6} className="mb-sm-0 text-center mb-3">
                                        <PieChartTau />
                                    </Col>
                                    <Col xs={'auto'} sm={6}>
                                        <div className='mb-20 pt-sm-3'>
                                            <div className="text-sm d-flex align-items-center mb-1  ">
                                                <svg className="d-inline-block me-2" style={{width: '16px', height: '16px', borderRadius: '4px'}}><rect fill="#2C3862" x="0" y="0" width="16" height="16"></rect></svg>
                                                YES

                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            No of Voters vote Yes
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger>
                                            </div>
                                            <h6>{parseInt((tauTotalSupply - parseFloat(tauCir)/1000000)) ? (parseInt((tauTotalSupply - parseFloat(tauCir)/1000000).toFixed(0))).toLocaleString() : "0"} TAU</h6>
                                        </div>
                                        <div className='mb-20'>
                                            <div className="text-sm d-flex align-items-center mb-1  ">
                                                <svg className="d-inline-block me-2" style={{width: '16px', height: '16px', borderRadius: '4px'}}><rect fill="#55689E" x="0" y="0" width="16" height="16"></rect></svg>
                                                NO

                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            No of Voters vote NO
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger>
                                            </div>
                                            <h6>{(parseInt((parseFloat(tauCir)/1000000))) ? (parseInt((parseFloat(tauCir)/1000000).toFixed(0))).toLocaleString() : "0"} TAU</h6>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col> 
                </Row>
            </Container>
        </Layout>
    );
};

export default VoteStatus;