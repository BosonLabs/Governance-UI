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

    //start time vote
    const[date,setdate]= useState("");
    const[time,settime]= useState("");
    const[day,setTime4]= useState("");
    const[hour,setTim1]= useState("");
    const[min,setTim2]= useState("");
    const[sec,setTim3]= useState("");
    const[lock,setlock]= useState(""); 

    //end time vote
    const[date1,setdate1]= useState("");
    const[time1,settime1]= useState("");
    const[day1,setTime41]= useState("");
    const[hour1,setTim11]= useState("");
    const[min1,setTim21]= useState("");
    const[sec1,setTim31]= useState("");
    const[lock1,setlock1]= useState(""); 

    //start time commit
    const[date2,setdate2]= useState("");
    const[time2,settime2]= useState("");
    const[day2,setTime42]= useState("");
    const[hour2,setTim12]= useState("");
    const[min2,setTim22]= useState("");
    const[sec2,setTim32]= useState("");
    const[lock2,setlock2]= useState(""); 

    //end time commit
    const[date13,setdate13]= useState("");
    const[time13,settime13]= useState("");
    const[day13,setTime413]= useState("");
    const[hour13,setTim113]= useState("");
    const[min13,setTim213]= useState("");
    const[sec13,setTim313]= useState("");
    const[lock13,setlock13]= useState("");

    useEffect(async() => {
        await starttime()
    }, [day, hour, min, sec, lock]);
    
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
     }
    
    const starttime = async () => {
    
        var us= governance['startTimeVote'];
        var ff=new Date(us);
    setdate(ff.toDateString());
    var hours = ff.getHours();
      var minutes = ff.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      settime( hours + ':' + minutes + ' ' + ampm);
    //settime(lock);
    var countDowndate   =us * 1000;
    // //console.log(countDowndate);
    // var countDownDate = new Date().getTime() + (lock * 1000) ;
    //alert(time);
        var x = setInterval(function() {
           var now = new Date().getTime();
          var distance = countDowndate - now ;
        //    //console.log("-------------------now", distance);
         //  //console.log(now);
          // Time calculations for days, hours, minutes and seconds
         var days = Math.floor(distance / (1000 * 60 * 60 * 24));
          var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
        //    //console.log("date e", day);
        //    //console.log("hour e", hour);
        //    //console.log("min e", minutes);
        //    //console.log("sec e", seconds);
    
          // Output the result in an element with id="demo"
         // document.getElementById("demo").innerHTML = hours + "h "
         // + minutes + "m " + seconds + "s ";
        setTime4(days);
        setTim1(hours);
        setTim2(minutes);
        setTim3(seconds);
    
    
        
        
        
        
          // If the count down is over, write some text 
          if (distance < 0) {
                clearInterval(x);
                setlock(false);
    
               //  //console.log('CountDown Finished');
            }
            else{
             setlock(true);
            }
    
        
          
        }, 1000);
       
    
    }

    useEffect(async() => {
        await endtime()
    }, [day1, hour1, min1, sec1, lock1]);
    
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
     }
    
    const endtime = async () => {
    
        var us= governance['endTimeVote'];
        var ff=new Date(us);
    setdate(ff.toDateString());
    var hours = ff.getHours();
      var minutes = ff.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      settime( hours + ':' + minutes + ' ' + ampm);
    //settime(lock);
    var countDowndate   =us * 1000;
    // //console.log(countDowndate);
    // var countDownDate = new Date().getTime() + (lock * 1000) ;
    //alert(time);
        var x = setInterval(function() {
           var now = new Date().getTime();
          var distance = countDowndate - now ;
        //    //console.log("-------------------now", distance);
         //  //console.log(now);
          // Time calculations for days, hours, minutes and seconds
         var days = Math.floor(distance / (1000 * 60 * 60 * 24));
          var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
        //    //console.log("date e", day);
        //    //console.log("hour e", hour);
        //    //console.log("min e", minutes);
        //    //console.log("sec e", seconds);
    
          // Output the result in an element with id="demo"
         // document.getElementById("demo").innerHTML = hours + "h "
         // + minutes + "m " + seconds + "s ";
        setTime41(days);
        setTim11(hours);
        setTim21(minutes);
        setTim31(seconds);
    
    
        
        
        
        
          // If the count down is over, write some text 
          if (distance < 0) {
                clearInterval(x);
                setlock1(false);
    
               //  //console.log('CountDown Finished');
            }
            else{
             setlock1(true);
            }
    
        
          
        }, 1000);
       
    
    }

    useEffect(async() => {
        await starttimeCommit()
    }, [day2, hour2, min2, sec2, lock2]);
    
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
     }
    
    const starttimeCommit = async () => {
    
        var us= governance['startTimeCommit'];
        var ff=new Date(us);
    setdate(ff.toDateString());
    var hours = ff.getHours();
      var minutes = ff.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      settime( hours + ':' + minutes + ' ' + ampm);
    //settime(lock);
    var countDowndate   =us * 1000;
    // //console.log(countDowndate);
    // var countDownDate = new Date().getTime() + (lock * 1000) ;
    //alert(time);
        var x = setInterval(function() {
           var now = new Date().getTime();
          var distance = countDowndate - now ;
        //    //console.log("-------------------now", distance);
         //  //console.log(now);
          // Time calculations for days, hours, minutes and seconds
         var days = Math.floor(distance / (1000 * 60 * 60 * 24));
          var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
        //    //console.log("date e", day);
        //    //console.log("hour e", hour);
        //    //console.log("min e", minutes);
        //    //console.log("sec e", seconds);
    
          // Output the result in an element with id="demo"
         // document.getElementById("demo").innerHTML = hours + "h "
         // + minutes + "m " + seconds + "s ";
        setTime42(days);
        setTim12(hours);
        setTim22(minutes);
        setTim32(seconds);
    
    
        
        
        
        
          // If the count down is over, write some text 
          if (distance < 0) {
                clearInterval(x);
                setlock2(false);
    
               //  //console.log('CountDown Finished');
            }
            else{
             setlock2(true);
            }
    
        
          
        }, 1000);
       
    
    }

    useEffect(async() => {
        await endtimeCommit()
    }, [day13, hour13, min13, sec13, lock13]);
    
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
     }
    
    const endtimeCommit = async () => {
    
        var us= governance['endTimeCommit'];
        var ff=new Date(us);
    setdate(ff.toDateString());
    var hours = ff.getHours();
      var minutes = ff.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      settime( hours + ':' + minutes + ' ' + ampm);
    //settime(lock);
    var countDowndate   =us * 1000;
    // //console.log(countDowndate);
    // var countDownDate = new Date().getTime() + (lock * 1000) ;
    //alert(time);
        var x = setInterval(function() {
           var now = new Date().getTime();
          var distance = countDowndate - now ;
        //    //console.log("-------------------now", distance);
         //  //console.log(now);
          // Time calculations for days, hours, minutes and seconds
         var days = Math.floor(distance / (1000 * 60 * 60 * 24));
          var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
        //    //console.log("date e", day);
        //    //console.log("hour e", hour);
        //    //console.log("min e", minutes);
        //    //console.log("sec e", seconds);
    
          // Output the result in an element with id="demo"
         // document.getElementById("demo").innerHTML = hours + "h "
         // + minutes + "m " + seconds + "s ";
        setTime413(days);
        setTim113(hours);
        setTim213(minutes);
        setTim313(seconds);
    
    
        
        
        
        
          // If the count down is over, write some text 
          if (distance < 0) {
                clearInterval(x);
                setlock13(false);
    
               //  //console.log('CountDown Finished');
            }
            else{
             setlock13(true);
            }
    
        
          
        }, 1000);
       
    
    }

    return (
        <Layout>
            <Container>
                <Row>
                    <Col md={6} className="mb-4">
                        
                        <Card className='card-dash border-0 mb-4'>
                        <Row>
                                <Col>
                            <div className="text-md mb-20 font-semibold leading-7 text-purple">REGISTRATION TIME  
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                       Registration Timer Details
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
                                    {/* <Col xs={12} sm={6} className="mb-sm-0 text-center mb-3">
                                        <PieChartTau />
                                    </Col> */}
                                    <Col xs={'auto'} sm={12}>
                                        <div className='mb-20 pt-sm-3'>
                                            <div className="p d-flex align-items-center mb-1  ">
                                                <svg className="d-inline-block me-2" style={{width: '16px', height: '16px', borderRadius: '4px'}}><rect fill="#2C3862" x="0" y="0" width="16" height="16"></rect></svg>
                                                Thu, May 19th 11:30 PM EST

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
                                            </div>
                                            <div className="h1 mb-0">{lock2 == true ? (<>{day2}d : {hour2}h : {min2}m : {sec2}s</>):(<>Registration Started</>)}</div>
                                        </div>
                                        <div className='mb-20'>
                                            <div className="p d-flex align-items-center mb-1  ">
                                                <svg className="d-inline-block me-2" style={{width: '16px', height: '16px', borderRadius: '4px'}}><rect fill="#55689E" x="0" y="0" width="16" height="16"></rect></svg>
                                                Wed, May 25th 11:30 AM EST

                                                {/* <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            No of Voters vote NO
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger> */}
                                            </div>
                                            <div className="h1 mb-0">{lock13 == true ? (<>{day13}d : {hour13}h : {min13}m : {sec13}s</>):(<>Registration Ended</>)}</div>
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
                            <div className="text-md mb-20 font-semibold leading-7 text-purple">VOTE TIME  
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                       Voting Timer Details
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
                                    {/* <Col xs={12} sm={6} className="mb-sm-0 text-center mb-3">
                                        <PieChartTau />
                                    </Col> */}
                                    <Col xs={'auto'} sm={12}>
                                        <div className='mb-20 pt-sm-3'>
                                            <div className="p d-flex align-items-center mb-1  ">
                                                {/* <svg className="d-inline-block me-2" style={{width: '16px', height: '16px', borderRadius: '4px'}}><rect fill="#2C3862" x="0" y="0" width="16" height="16"></rect></svg> */}
                                                {/* Sun, June 1st 00:00 AM EST */}

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
                                            </div>
                                            {/* <div className="h1 mb-0">{lock == true ? (<>{day}d : {hour}h : {min}m : {sec}s</>):(<>Voting Started</>)}</div> */}
                                            <div className="h1 mb-0"> Scheduled to Release </div>
                                        </div>
                                        <div className='mb-20'>
                                            <div className="p d-flex align-items-center mb-1  ">
                                                {/* <svg className="d-inline-block me-2" style={{width: '16px', height: '16px', borderRadius: '4px'}}><rect fill="#55689E" x="0" y="0" width="16" height="16"></rect></svg>
                                                Mon, June 6th 11:59 PM EST */}

                                                {/* <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            No of Voters vote NO
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger> */}
                                            </div>
                                            {/* <div className="h1 mb-0">{lock1 == true ? (<>{day1}d : {hour1}h : {min1}m : {sec1}s</>):(<>Voting Ended</>)}</div> */}
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

export default Dashboard;