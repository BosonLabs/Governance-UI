import React, {useState, useEffect} from 'react';
import { Card, Col, Container, OverlayTrigger, Row, Tooltip, ProgressBar } from 'react-bootstrap';
import Layout from './LayoutT';

import node from './nodeapi.json';
import governance from './governance.json';
import ReactDomServer from 'react-dom/server';
import firebase from '../../NFTFolder/firebase';
import PieChartYesNo from './snippets/PieChartYesNo';
const algosdk = require('algosdk');
const VoteStatus = () => {

    useEffect(() => {
        document.title = "PLANET WATCH | VOTESTATUS"
    }, [])

    const algodClientGet = new algosdk.Algodv2('', node['algodclient'], '');

    const algodClient = new algosdk.Algodv2('', node['algodclient'], '');
    const indexClient = new algosdk.Indexer('', node['indexerclient'], '');

    const[totalYes,setTotalYes]= useState();
    const[totalNo,setTotalNo]= useState();
    const[voteYes,setVoteYes]= useState();
    const[voteNo,setVoteNo]= useState();
    const[result,setResult]= useState();
    const[yesPercent,setYesPercent]= useState();
    const[noPercent,setNoPercent]= useState();
    const[totalVotePercent,setTotalVotePercent]= useState();
    const[yesPercentValue,setYesPercentValue]= useState();
    const[noPercentValue,setNoPercentValue]= useState();
    const[totalVotePercentValue,setTotalVotePercentValue]= useState();
    const [commitamount,setcommitamount] = useState("");
    const [planetamount,setPlanetAmount] = useState(0);
    const [algoAmount,setAlgoAmount] = useState(0);
    const [count,setCount] = useState(0);
    const [eligible,setEligible] = useState(0);
    const [noteligible,setNotEligible] = useState(0);
    
    //console.log("noteligible",noteligible);


    const dbcallProfile=async()=>{            
        let r=[];
        try { 
            let TPA=0;   
            let TALA=0;  
            let Totalcount=0; 
            let Totaleligible=0;
            let Totalnoteligible=0;
            let totalYesCount=0;
            let totalNoCount=0;
            let Decision=0;
        firebase.database().ref("Registeruser").on("value", (data) => {     
        // firebase.database().ref(`Registeruser/${localStorage.getItem("walletAddress")}`).on("value", (data) => {          
                                   
                if (data) {
                    data.forEach((d) => { 
                      Totalcount=Totalcount +1;
                      let value=d.val();
                    //   console.log("valuecheck",value);
                      if(d.val().Assettype==="Planet"){
                                TPA= TPA + parseFloat(d.val().Amount) ;
                      }
                      else if(d.val().Assettype==="Algos"){
                        TALA=TALA + parseFloat(d.val().Amount);
                      }
                      if(d.val().Eligibility==="1"||d.val().Eligibility=== 1){
                        Totaleligible=Totaleligible + 1;
                      }
                      else if(d.val().Eligibility==="0"||d.val().Eligibility=== 0){
                        Totalnoteligible=Totalnoteligible + 1;
                    }
                    if(d.val().Decision === "YES" && (d.val().Eligibility==="1"||d.val().Eligibility=== 1))
                    {
                      totalYesCount++;
                    }
                    else if(d.val().Decision === "NO" && (d.val().Eligibility==="1"||d.val().Eligibility=== 1))
                    {
                      totalNoCount++;
                    }
                    

                    //   r.push({
                                    
    
                    //     id:d.val().id,
                    //     WalletAddress:d.val().WalletAddress,
                    //     TimeStamp:d.val().TimeStamp,
                    //     Amount:d.val().Amount,
                    //     Eligibility:d.val().Eligibility,
                    //     Assettype:d.val().Assettype,
                    //     Vote:d.val().Vote
                        
                    // })  
                    let countEligible = parseInt(count) - parseInt(noteligible);

                    setYesPercent(((parseInt(totalYes) / (parseInt(countEligible))) * 100).toFixed(0));
                    setNoPercent(((parseInt(totalNo) / (parseInt(countEligible))) * 100).toFixed(0));
                
                //console.log("count", parseInt(countEligible));
                
                    setYesPercentValue(((parseInt(totalYes) / (parseInt(countEligible))) * 100).toFixed(2));
                    setNoPercentValue(((parseInt(totalNo) / (parseInt(countEligible))) * 100).toFixed(2));
                
                    //console.log("totalYes", parseInt(totalYes), "totalNo", parseInt(totalNo));
             
                    setTotalVotePercent((((parseFloat(parseInt(totalYes) + parseInt(totalNo)) / parseInt(count)) * 100).toFixed(0)));
             
                    setTotalVotePercentValue(((parseFloat(parseInt(totalYes) + parseInt(totalNo)) / parseInt(count)) * 100).toFixed(2));  
                    let nowInMs = Date.now();
                    let nowInSecond = Math.round(nowInMs/1000);
                    
                    console.log("date", nowInSecond);
                    if((totalYesCount > totalNoCount) && (nowInSecond >= governance["endTimeVote"]))
                    {
                        setResult(1);  
                    }
                    else if((totalYesCount < totalNoCount) && (nowInSecond >= governance["endTimeVote"])) {
                        setResult(0);  
                    }
                    else{
                        setResult(2);
                    }
                      
      })
      setPlanetAmount(TPA);
       setAlgoAmount(TALA); 
       setCount(Totalcount);
       setEligible(Totaleligible);
       setNotEligible(Totalnoteligible); 
       setTotalYes(totalYesCount);
       setTotalNo(totalNoCount);                   
          }
          else{
            setcommitamount([""]);  
          }
          setcommitamount(r);
        //   setPlanetAmount(planetAmount);
               
        });                  
      } catch (error) {
        //console.log('error occured during search', error);    
      }                
    }
    useEffect(()=>{dbcallProfile()},[totalYes, totalNo, planetamount, algoAmount, count, eligible, noteligible, yesPercent, noPercent, yesPercentValue, noPercentValue, result])

    return (
        <Layout>
            <Container>
                <Row>
                    <Col md={6} className="mb-4">                
                    <Card className='card-dash border-0 mb-4'>
                            <Row>
                                <Col>
                            <div className="text-md mb-10 font-semibold leading-7 text-purple">VOTES  
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
                            <div className='mb-20 pt-sm-3'>
                                            {/* <div className="p d-flex align-items-center mb-1  "> */}
                                                {/* <svg className="d-inline-block me-2" style={{width: '16px', height: '16px', borderRadius: '4px'}}><rect fill="#2C3862" x="0" y="0" width="16" height="16"></rect></svg> */}
                                                {/* Measure */}

                                                {/* <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Start Date for Voting and Timer
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger> */}
                                            {/* </div> */}
                                            <div className="h4 mb-0">Question goes here?</div>
                                            </div>                               
                                    {/* Progress bar Yes */}
                                    {/* <div className="mb-10">
                                        <div className="d-flex justify-content-between">
                                        <div className='pt-sm-3'>
                                            <div className="text-sm d-flex align-items-center mb-1  ">
                                                <svg className="d-inline-block me-2" style={{width: '16px', height: '16px', borderRadius: '4px'}}><rect fill="green" x="0" y="0" width="16" height="16"></rect></svg>
                                                YES

                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Percentage of Voters voted Yes
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger>
                                            </div>
                                        </div>
                                        </div>
                                        <ProgressBar className='no-shadow' now={yesPercent} variant="success"/>
                                        <div className="d-flex justify-content-between">
                                            <strong>{yesPercentValue}%</strong>
                                        </div>
                                    </div> */}
                                    {/* Progress bar */}
                                    
                                    {/* Progress bar No */}
                                    {/* <div className="mb-10">
                                        <div className="d-flex justify-content-between">
                                        <div className='pt-sm-3'>
                                            <div className="text-sm d-flex align-items-center mb-1  ">
                                                <svg className="d-inline-block me-2" style={{width: '16px', height: '16px', borderRadius: '4px'}}><rect fill="red" x="0" y="0" width="16" height="16"></rect></svg>
                                                NO

                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Percentage of Voters voted No
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger>
                                            </div>
                                        </div>
                                        </div>
                                        <ProgressBar className='no-shadow' now={noPercent} variant="danger"/>
                                        <div className="d-flex justify-content-between">
                                            <strong>{noPercentValue}%</strong>
                                        </div>
                                    </div> */}

                                        <div className="mb-10">
                                        <Row>    
                                        <Col sm={6} className="order-sm-2">
                                            <div className="text-sm d-flex align-items-center mb-1  ">
                                            <svg className="d-inline-block me-2" style={{width: '16px', height: '16px', borderRadius: '4px'}}><rect fill='#9aea3b' x="0" y="0" width="16" height="16"></rect></svg>
                                                YES

                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Percentage of Voters voted Yes
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger>
                                                    </div>

                                                     <div className="text-sm d-flex align-items-center mb-1">
                                            <svg className="d-inline-block me-2" style={{width: '16px', height: '16px', borderRadius: '4px'}}><rect fill="red" x="0" y="0" width="16" height="16"></rect></svg>
                                                NO

                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Percentage of Voters voted No
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger>
                                                    </div>
                                                    </Col>
                                            <Col sm={6}>    
                                                <PieChartYesNo />
                                            </Col>
                                                </Row>
                                        </div>

                                    {/* Progress bar */}
                                    <div className="mb-20">
                                        <div className="d-flex justify-content-between">
                                        <div className='pt-sm-3'>
                                            <div className="text-sm d-flex align-items-center mb-1  ">
                                                <svg className="d-inline-block me-2" style={{width: '16px', height: '16px', borderRadius: '4px'}}><rect fill="blue" x="0" y="0" width="16" height="16"></rect></svg>
                                                Participants Voted

                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Percentage of Voted participants
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger>
                                            </div>
                                            {/* <h6>{(parseInt((parseFloat(tauCir)/1000000))) ? (parseInt((parseFloat(tauCir)/1000000).toFixed(0))).toLocaleString() : "0"} TAU</h6> */}
                                        </div>
                                        </div>
                                        <ProgressBar className='no-shadow' now={totalVotePercent} />
                                        <div className="d-flex justify-content-between">
                                            <strong>{totalVotePercentValue}%</strong>
                                            {/* <strong>{50} / {50} ALGO</strong> */}
                                        </div>
                                    </div>
                                    <div className="h4 mb-1">Result</div>
                                    {result === 2 ? <div className="h5 mb-0">To Be Announced</div> : result === 1 ? <div className="h5 mb-0">Yes statement</div> : <div className="h5 mb-0">No statement</div>}
                                    
                            </div>
                        </Card>
                        <Card className='card-dash border-0 mb-4'>
                            <Row>
                                <Col>
                            <div className="text-md mb-20 font-semibold leading-7 text-purple">Total Qualified Participants 
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                        Total participants registered and Qualified
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger>
                            </div>
                            </Col>
                            {/* <Col>
                            <a className='mb-3 text-white d-flex align-items-center btn-link' href={"https://testnet.algoexplorer.io/address/" + dashboardDetails.owner} target="_blank" rel="noreferer">
                            <svg class="white me-2" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                            View on explorer
                            </a>
                            </Col> */}
                            </Row>

                            <div className='mb-20'>
                                {/* <h6 className='sub-heading mb-0'>
                                    Percentage per Redeem
                                </h6> */}
                                {eligible===""||eligible===null||eligible===undefined ?( <h4 className='mb-2'>0 Participants</h4>):( <h4 className='mb-2'> {eligible} Participants</h4>)}
                            </div>
                        </Card> 
                    </Col>
                    <Col md={6}>
                    <Card className='card-dash border-0 mb-4'>
                            <Row>
                                <Col>
                            <div className="text-md mb-20 font-semibold leading-7 text-purple">Planets Commited 
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                        Total planets asset commited by participants
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger>
                            </div>
                            </Col>
                            {/* <Col>
                            <a className='mb-3 text-white d-flex align-items-center btn-link' href={"https://testnet.algoexplorer.io/address/" + dashboardDetails.owner} target="_blank" rel="noreferer">
                            <svg class="white me-2" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                            View on explorer
                            </a>
                            </Col> */}
                            </Row>

                            <div className='mb-20'>
                                <h6 className='sub-heading mb-0'>
                                    
                                </h6>
                                {planetamount===""||planetamount===null||planetamount===undefined ?( <h4 className='mb-2'>0 Planets</h4>):( <h4 className='mb-2'> {planetamount.toFixed(2)} Planets</h4>)}
                               
                            </div>
                        </Card> 

                        <Card className='card-dash border-0 mb-4'>
                            <Row>
                                <Col>
                            <div className="text-md mb-20 font-semibold leading-7 text-purple">Algos Commited 
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                        Total Algos commited by participants
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger>
                            </div>
                            </Col>
                            {/* <Col>
                            <a className='mb-3 text-white d-flex align-items-center btn-link' href={"https://testnet.algoexplorer.io/address/" + dashboardDetails.owner} target="_blank" rel="noreferer">
                            <svg class="white me-2" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                            View on explorer
                            </a>
                            </Col> */}
                            </Row>

                            <div className='mb-20'>
                                {/* <h6 className='sub-heading mb-0'>
                                    Percentage per Redeem
                                </h6> */}
                               {algoAmount===""||algoAmount===null||algoAmount===undefined ?( <h4 className='mb-2'>0 Algo</h4>):( <h4 className='mb-2'> {algoAmount.toFixed(2)} Algo</h4>)}
                            </div>
                        </Card> 

                        <Card className='card-dash border-0 mb-4'>
                            <Row>
                                <Col>
                            <div className="text-md mb-20 font-semibold leading-7 text-purple">Total Participants 
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                        Total participants registered
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger>
                            </div>
                            </Col>
                            {/* <Col>
                            <a className='mb-3 text-white d-flex align-items-center btn-link' href={"https://testnet.algoexplorer.io/address/" + dashboardDetails.owner} target="_blank" rel="noreferer">
                            <svg class="white me-2" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                            View on explorer
                            </a>
                            </Col> */}
                            </Row>

                            <div className='mb-20'>
                                {/* <h6 className='sub-heading mb-0'>
                                    Percentage per Redeem
                                </h6> */}
                                 {count===""||count===null||count===undefined ?( <h4 className='mb-2'>0 Participants</h4>):( <h4 className='mb-2'> {count} Participants</h4>)}
                               
                            </div>
                        </Card> 

                        <Card className='card-dash border-0 mb-4'>
                            <Row>
                                <Col>
                            <div className="text-md mb-20 font-semibold leading-7 text-purple">Total Disqualified Participants 
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                        Total participants registered and Disqualified
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger>
                            </div>
                            </Col>
                            {/* <Col>
                            <a className='mb-3 text-white d-flex align-items-center btn-link' href={"https://testnet.algoexplorer.io/address/" + dashboardDetails.owner} target="_blank" rel="noreferer">
                            <svg class="white me-2" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                            View on explorer
                            </a>
                            </Col> */}
                            </Row>

                            <div className='mb-20'>
                                {/* <h6 className='sub-heading mb-0'>
                                    Percentage per Redeem
                                </h6> */}
                                 {noteligible===""||noteligible===null||noteligible===undefined ?( <h4 className='mb-2'>0 Participants</h4>):( <h4 className='mb-2'> {noteligible} Participants</h4>)}
                               
                            </div>
                        </Card> 
                    </Col> 
                </Row>
            </Container>
        </Layout>
    );
};

export default VoteStatus;