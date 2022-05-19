import React, {useEffect,useState} from 'react';
import { Col, Container, Row, Form, InputGroup, Button,Card,Modal} from 'react-bootstrap';
import Layout from './LayoutT';
import {
    Link
  } from "react-router-dom";
import governance from './governance.json';
import PostCard from './snippets/PostCard';
import PostCardNew from './snippets/PostCardNew';
import PostCardElem from './snippets/PostCardElem';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import firebase from '../../NFTFolder/firebase';
import '../toast-style-override.css'
import { walletAsset } from '../formula';
function Participate() {
    useEffect(() => {
        document.title = "PLANET WATCH | PARTICIPATE"
    }, [])
    const [commitamount,setcommitamount] = useState("");
    const [Assettype,setAssettype] = useState("");
    const [votestatus,setvotestatus] = useState("");
    const [Decisionstatus,setDecisionstatus] = useState("");
   
     //end time commit
     const[Eligibility,setEligibility]= useState("");
     const[time13,settime13]= useState("");
     const[day13,setTime413]= useState("");
     const[hour13,setTim113]= useState("");
     const[min13,setTim213]= useState("");
     const[sec13,setTim313]= useState("");
     const[lock13,setlock13]= useState("");
     const[date,setdate]= useState("");
     const[time,settime]= useState("");

    //end time vote
    const[date1,setdate1]= useState("");
    const[time1,settime1]= useState("");
    const[day1,setTime41]= useState("");
    const[hour1,setTim11]= useState("");
    const[min1,setTim21]= useState("");
    const[sec1,setTim31]= useState("");
    const[lock1,setlock1]= useState(""); 

    const dbcallProfile=async()=>{            
        let r=[];
        try {     
        firebase.database().ref("Registeruser").child(localStorage.getItem('walletAddress')).on("value", (data) => {     
        // firebase.database().ref(`Registeruser/${localStorage.getItem("walletAddress")}`).on("value", (data) => {          
            if (data) {                        
       
              r.push({
              

                id:data.val().id,
                WalletAddress:data.val().WalletAddress,
                TimeStamp:data.val().TimeStamp,
                Amount:data.val().Amount,
                Eligibility:data.val().Eligibility,
                Assettype:data.val().Assettype,
                Vote:data.val().Vote,
                Decision:data.val().Decision

                
              })  
              setAssettype(r[0]["Assettype"]);  
              setvotestatus(r[0]["Vote"]);    
              setcommitamount(r[0]["Amount"]);
              setEligibility(r[0]["Eligibility"]);   
                           
          }
          else{
            setcommitamount([""]);  
            setAssettype([""]);  
          }
          //setcommitamount(r);
          setcommitamount(r[0]["Amount"]); 
          setDecisionstatus(r[0]["Decision"]);    
          console.log("Assettype",data);
        //   setPlanetAmount(planetAmount);
               
        });                  
      } catch (error) {
        //console.log('error occured during search', error);    
      }                
    }
    useEffect(()=>{dbcallProfile()},[])

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

    useEffect(async() => {
        await endtime()
    }, [day1, hour1, min1, sec1, lock1]);
    
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

    return (
        <Layout>
            <Container>
                <Row className='mb-5'>
                    {!localStorage.getItem("walletAddress")?(<>
                        <Row className='justify-content-center'>
                    <Col md={10} lg={7} className="mb-4">

                        <Card className='card-dash d-block border-0 mb-4'>
                        <center><div className="h3 mb-0" >Please connect your wallet</div></center>
                        </Card>
                        </Col>
                </Row>
                    
                    </>):(<>
                    {lock1 === true ? (<>
                        {Eligibility === 1 || Eligibility === undefined || Eligibility === null || Eligibility === "" || Eligibility === "NaN" ? (<>
                            {lock13 == true ?(<>
                            <Row className='justify-content-center'>
                    <Col md={10} lg={7} className="mb-4">

                        <Card className='card-dash d-block border-0 mb-4'>                  
                   <div className="pt-xl-0 pt-4">   
                       <Link className='text-white mb-20' to="/register"><span className='text-blue'>Go to Register &nbsp;</span>
                       <svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                           <path d="M18.6389 8.36952L18.8028 8.2H18.567H0.967033C0.700676 8.2 0.486002 8.10872 0.33782 7.95548C0.189347 7.80195 0.1 7.57826 0.1 7.3C0.1 7.02174 0.189347 6.79805 0.33782 6.64452C0.486002 6.49128 0.700676 6.4 0.967033 6.4H18.567H18.8064L18.6382 6.22972L14.0939 1.63048C14.0937 1.63036 14.0936 1.63023 14.0935 1.63011C13.7445 1.26887 13.7447 0.730627 14.0939 0.369516C14.4414 0.0101614 14.9564 0.0101614 15.3039 0.369516L21.7831 7.06952C21.939 7.23075 21.939 7.46925 21.7831 7.63048L15.3039 14.3305C14.9564 14.6898 14.4414 14.6898 14.0939 14.3305C13.7445 13.9692 13.7445 13.4308 14.0939 13.0695L18.6389 8.36952Z" fill="blue" stroke="currentColor" strokeWidth="0.2"/>
                                       </svg>
                       </Link>
                       </div><br/>
                       <div className="h3 mb-0" >Voting will start after </div>
                       <div className="h3 mb-0" style={{color:"red"}}>{lock13 == true ? (<>{day13}d : {hour13}h : {min13}m : {sec13}s</>):(<>Registration Ended</>)}</div> 
                       </Card>
                        </Col>
                </Row>
                       </>):(<>
                           { Assettype ==="Planet" ?(<>
                            {Assettype ==="Planet" && votestatus == 1 ? (<>
                                <Col lg={4} className='mb-4'>
                                        <PostCard />
                                </Col>

                                </>):(<>

                                <Col lg={4} className='mb-4'>
                                    <PostCard />
                                </Col>

                            </>)}
                          
                           
                           
                           </>):(<>
                            {Assettype ==="Algos" && votestatus == 1 ?(<>
                         {/* <center>   <div className="h3 mb-0"> You have already participated in voting, You have committed {commitamount} ALGOS</div> </center> */}
                         <Col lg={4} className='mb-4'>
                               <PostCardElem />
                           </Col>
                           
                           
                           </>):(<>
                            <Col lg={4} className='mb-4'>
                               <PostCardElem />
                           </Col>
                           
                           </>)}
                           </>)}
                           </>)}                        
                        </>) : (<>
                            <Row className='justify-content-center'>
                    <Col md={10} lg={7} className="mb-4">

                        <Card className='card-dash d-block border-0 mb-4'>    
                            <center><div className='h3'>You're are Disqualified</div></center>
                            </Card>
                        </Col>
                </Row>
                        </>)}
                    </>) : (<>
                        <Row className='justify-content-center'>
                    <Col md={10} lg={7} className="mb-4">

                        <Card className='card-dash d-block border-0 mb-4'>    
                            <center><div className='h3'>Voting time Ended</div></center>
                            </Card>
                        </Col>
                </Row>
                    </>)}                  
                    </>)}
                
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