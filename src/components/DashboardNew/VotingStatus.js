import React, {useState, useEffect} from 'react';
import { Card, Col, Container, OverlayTrigger, Row, Tooltip, ProgressBar } from 'react-bootstrap';
import Layout from './LayoutT';

import node from './nodeapi.json';
import governance from './governance.json';
import ReactDomServer from 'react-dom/server';
import firebase from '../../NFTFolder/firebase';
import PieChartYesNo from './snippets/PieChartYesNo';
import PieChart from './snippets/PieChart';
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
    const[countEligibleValue,setCountEligibile]= useState();
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
                    setCountEligibile(countEligible);
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
                            <div className="h3 mb-20 font-semibold leading-7 text-blue">REGISTRATION WINDOW  
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
                            


                            <hr className='mb-10 mt-0' />
                            <div className='mb-0'>
                                

                                <Row className='justify-content-center'>
                                    {/* <Col xs={12} sm={6} className="mb-sm-0 text-center mb-3">
                                        <PieChartTau />
                                    </Col> */}
                                    <Col xs={'auto'} sm={12}>
                                        <div className='mb-20 pt-sm-3'>
                                        {lock2 == true ? <div className="h4 d-flex align-items-center mb-1">Registration window will begin in</div> : <></>}
                                            <div className="p d-flex align-items-center mb-1  ">
                                                <svg className="d-inline-block me-2" style={{width: '16px', height: '16px', borderRadius: '4px'}}><rect fill="#2C3862" x="0" y="0" width="16" height="16"></rect></svg>
                                                Mon, May 30th 9:30 AM EST

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
                                            <div className="h1 mb-0">{lock2 == true ? (<>{day2}d : {hour2}h : {min2}m : {sec2}s</>):(<>Registration has begun</>)}</div>
                                        </div>
                                        <div className='mb-20'>
                                        {lock13 == true ? <div className="h4 d-flex align-items-center mb-1">Registration window will ends in</div> : <></>}
                                            <div className="p d-flex align-items-center mb-1  ">
                                                <svg className="d-inline-block me-2" style={{width: '16px', height: '16px', borderRadius: '4px'}}><rect fill="#55689E" x="0" y="0" width="16" height="16"></rect></svg>
                                                Mon, Jun 13th 9:00 AM EST

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
                        {/* <Card className='card-dash border-0 mb-4'>
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
                             <Col>
                            <a className='mb-3 text-white d-flex align-items-center btn-link' href={"https://testnet.algoexplorer.io/address/" + dashboardDetails.owner} target="_blank" rel="noreferer">
                            <svg class="white me-2" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                            View on explorer
                            </a>
                            </Col>
                            </Row>

                            <div className='mb-20'>
                                 <h6 className='sub-heading mb-0'>
                                    Percentage per Redeem
                                </h6> 
                                {eligible===""||eligible===null||eligible===undefined ?( <h4 className='mb-2'>0 Participants</h4>):( <h4 className='mb-2'> {eligible} Participants</h4>)}
                            </div>
                        </Card> */}
                        <Card className='card-dash border-0 mb-4'>
                            <Row>
                                <Col>
                            <div className="h3 mb-20 font-semibold leading-7 text-blue">PLANET Commited 
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                        Total PLANET asset commited by participants
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
                                {planetamount===""||planetamount===null||planetamount===undefined ?( <h4 className='mb-2'>0</h4>):( <h4 className='mb-2'> {planetamount.toFixed(2)}</h4>)}
                               
                            </div>
                        </Card> 

                        {/* <Card className='card-dash border-0 mb-4'>
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
                            </Col> 
                            </Row>

                            <div className='mb-20'>
                               {algoAmount===""||algoAmount===null||algoAmount===undefined ?( <h4 className='mb-2'>0 Algo</h4>):( <h4 className='mb-2'> {algoAmount.toFixed(2)} Algo</h4>)}
                            </div>
                        </Card>  */}

                        <Card className='card-dash border-0 mb-4'>
                            <Row>
                                <Col>
                            <div className="h3 mb-20 font-semibold leading-7 text-blue">Registered Participants 
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
                                 {count===""||count===null||count===undefined ?( <h4 className='mb-2'>0</h4>):( <h4 className='mb-2'> {count}</h4>)}
                               
                            </div>
                        </Card> 

                        <Card className='card-dash border-0 mb-4'>
                            <Row>
                                <Col>
                            <div className="h3 mb-20 font-semibold leading-7 text-blue">Participants 
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                        Total participants registered and Qualified or Disqualified
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger>
                            </div>
                            {/* {eligible===""||eligible===null||eligible===undefined ?( <h4 className='mb-2'>0 Qualified</h4>):( <h4 className='mb-2'> {eligible} Qualified</h4>)} */}
                            </Col>
                            <Col>
                            {/* <div className="h6 mb-20 font-semibold leading-7 text-blue">Disqualified Participants 
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
                            </div> */}
                            {/* {noteligible===""||noteligible===null||noteligible===undefined ?( <h4 className='mb-2'>0 Disqualified</h4>):( <h4 className='mb-2'> {noteligible} Disqualified</h4>)} */}
                            </Col>
                            {/* <Col>
                            <a className='mb-3 text-white d-flex align-items-center btn-link' href={"https://testnet.algoexplorer.io/address/" + dashboardDetails.owner} target="_blank" rel="noreferer">
                            <svg class="white me-2" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                            View on explorer
                            </a>
                            </Col> */}

                            <Row>
                                <Col>
                                {eligible===""||eligible===null||eligible===undefined ?( <h4 className='mb-2'>0 Qualified</h4>):( <h4 className='mb-2'> {eligible} Qualified</h4>)}
                                </Col>
                                <Col>
                                {noteligible===""||noteligible===null||noteligible===undefined ?( <h4 className='mb-2'>0 Disqualified</h4>):( <h4 className='mb-2'> {noteligible} Disqualified</h4>)}
                                </Col>
                            </Row>

                            </Row>

                            <div className='mb-20'>
                                {/* <h6 className='sub-heading mb-0'>
                                    Percentage per Redeem
                                </h6> */}
                            </div>
                        </Card>  
                    </Col>
                    <Col md={6}>
                    <Card className='card-dash border-0 mb-4'>
                            <Row>
                                <Col>
                            <div className="h3 mb-20 font-semibold leading-7 text-blue">VOTING WINDOW  
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
                            


                            <hr className='mb-10 mt-0' />
                            <div className='mb-0'>
                                

                                <Row className='justify-content-center'>
                                    {/* <Col xs={12} sm={6} className="mb-sm-0 text-center mb-3">
                                        <PieChartTau />
                                    </Col> */}
                                    <Col xs={'auto'} sm={12}>
                                        <div className='mb-20 pt-sm-3'>
                                        {lock == true ? <div className="h4 d-flex align-items-center mb-1">Voting window will begin in</div> : <></>}
                                            <div className="p d-flex align-items-center mb-1  ">
                                                <svg className="d-inline-block me-2" style={{width: '16px', height: '16px', borderRadius: '4px'}}><rect fill="#2C3862" x="0" y="0" width="16" height="16"></rect></svg>
                                                Mon, Jun 13th 9:00 AM EST

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
                                            <div className="h1 mb-0">{lock == true ? (<>{day}d : {hour}h : {min}m : {sec}s</>):(<>Voting Started</>)}</div>
                                            {/* <div className="h1 mb-0"> Scheduled to Release </div> */}
                                        </div>
                                        <div className='mb-20'>
                                        {lock1 == true ? <div className="h4 d-flex align-items-center mb-1">Voting window will ends in</div> : <></>}
                                            <div className="p d-flex align-items-center mb-1  ">
                                                <svg className="d-inline-block me-2" style={{width: '16px', height: '16px', borderRadius: '4px'}}><rect fill="#55689E" x="0" y="0" width="16" height="16"></rect></svg>
                                                Fri, Jun 24th 12:00 AM EST

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
                                            <div className="h1 mb-0">{lock1 == true ? (<>{day1}d : {hour1}h : {min1}m : {sec1}s</>):(<>Voting Ended</>)}</div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                        <Card className='card-dash border-0 mb-4'>
                            <Row>
                                <Col>
                            <div className="h3 mb-10 font-semibold leading-7 text-blue">VOTES  
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
                            <Col>
                            <a className='h4 mb-3 text-white d-flex align-items-center btn-link' href={"https://testnet.algoexplorer.io/address/" + governance["yesAddress"]} target="_blank" rel="noreferer">
                            <svg class="me-2" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z" fill="currentColor"></path></svg>
                            <strong>Yes Address</strong>
                            </a>
                            <a className='h4 mb-3 text-white d-flex align-items-center btn-link' href={"https://testnet.algoexplorer.io/address/" + governance["noAddress"]} target="_blank" rel="noreferer">
                            <svg class="me-2" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z" fill="currentColor"></path></svg>
                            <strong>No Address</strong>
                            </a>
                            </Col> 
                            </Row>
                            


                            <hr className='mb-10 mt-0' />
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
                                            {/* <div className="h4 mb-0">Question goes here?</div> */}
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
                                                    <h6>{(parseInt(totalYes)) ? (parseInt(totalYes)) : "0 "}</h6>
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
                                                    <h6>{(parseInt(totalNo)) ? (parseInt(totalNo)) : "0"}</h6>
                                                    <div className="text-sm d-flex align-items-center mb-1">
                                            <svg className="d-inline-block me-2" style={{width: '16px', height: '16px', borderRadius: '4px'}}><rect fill="#0042ac" x="0" y="0" width="16" height="16"></rect></svg>
                                                NOT VOTED

                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Percentage of Voters not voted or Disqualified
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger>
                                                    </div>
                                                    <h6>{countEligibleValue - (parseInt(((parseInt(totalYes) + parseInt(totalNo))))) ? countEligibleValue - (parseInt(((parseInt(totalYes) + parseInt(totalNo))))) : "0"}</h6>
                                                    </Col>
                                            <Col sm={6}>    
                                                <PieChartYesNo />
                                                {/* <PieChart /> */}
                                            </Col>
                                                </Row>
                                        </div>
                                         
                                    {/* Progress bar */}
                                    {/* <div className="mb-20">
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
                                        </div>
                                        </div>
                                        <ProgressBar className='no-shadow' now={totalVotePercent} />
                                        <div className="d-flex justify-content-between">
                                            <strong>{totalVotePercentValue}%</strong>
                                        </div>
                                    </div>*/}
                            <div className="h3 mb-10 font-semibold leading-7 text-blue">Result  
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                       Result will be displayed once the voting time ends
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger>
                            </div>
                                    {result === 2 ? <div className="h5 mb-0">To Be Announced</div> : result === 1 ? <div className="h5 mb-0">Yes statement</div> : <div className="h5 mb-0">No statement</div>} 
                                    
                            </div>
                        </Card>
                    </Col> 
                </Row>
            </Container>
        </Layout>
    );
};

export default VoteStatus;