import React, { useState,useEffect } from 'react';
//import Layout from '../components/Layouts/Layout';
//import Layout from '../components/Dashboard/Layout';
import Layout from '../components/DashboardNew/LayoutT';
import Action1 from '../assets/images/kyc/action-1-white.png';
import Action2 from '../assets/images/kyc/action-2-white.png';
import Action5 from '../assets/images/kyc/action-5-white.png';
import fireDb from '../NFTFolder/firebase'
const DashboardKyc = () => {
    const[Current,setCurrent]=useState("");
    const[Approve,setApprove]=useState("");
    const[Asset,setAsset]=useState("");
    const [CurrentExit,setCurrentExit] = useState([]);    
    console.log("Curr",CurrentExit)  
    // useEffect(() => {
    //     document.getElementById("header-title").innerText = "VIEW D-ID";
    // } )           
    const dbcallalgo=async()=>{
        //console.log("inside dbcallalgo function")  
        let req = [];
        if(localStorage.getItem("walletAddress")  === null || localStorage.getItem("walletAddress")  === "" || localStorage.getItem("walletAddress")  === " " || localStorage.getItem("walletAddress") === undefined || localStorage.getItem("walletAddress") === ''){
        }
        else{      
          try{        
          fireDb.auth().signInAnonymously().then((response)=>{      
          fireDb.database().ref("kycplainjson").child(localStorage.getItem("walletAddress")).on("value", (data) => {
            if (data) {            
              data.forEach((d) => {                
                let value=d.val();              
                req.push(            
                  {
                  "dbkey":value.dbkey,
                  "createdDate": value.createdDate,"Name": value.Name,
                  "proofType": value.proofType,"algoAddress": value.algoAddress,
                  "ProofNumber": value.ProofNumber,"selfiePath": value.selfiePath,            
                  "kycStatus":value.kycStatus,"reviewedBy": value.reviewedBy,"approvedBy": value.approvedBy,"submittedDate": value.submittedDate,
                  "reviewedDate": value.reviewedDate,"approvedDate": value.approvedDate,"identity":value.identity,            
                  "citizenship": value.citizenship,
                  "base64Image": value.base64Image,
                  "assetId": value.assetId,
                  "address": value.address,
                  "dob":value.dob,
                  "email": value.email,
                  "phoneNumber":value.phoneNumber,
                })                
                setCurrentExit(req);               
                });        
              }              
              //setCurrentExit(false);
          });
          })
          }catch{          
          }                  
          }        
      }      
      useEffect(()=>{dbcallalgo()},[])
    
return(
<Layout>
        <div className="page-content">
        {/* <h4>status</h4> */}
        <br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <div className="py-50 mb-4">
                    <div className="steps_wrapper">
                        {CurrentExit ===  null || CurrentExit === undefined || CurrentExit === "" ? (
                            <>

                            </>
                        ):(
                            <>
                            {CurrentExit[0] ===  null || CurrentExit[0] === undefined || CurrentExit[0] === "" ? (
                                <>
    
                                </>
                            ):(
                        <div className="steps">                                                    
                        {CurrentExit[0].approvedBy === "create" ? (
                            <div className="step" style={{color:"#2a7cda"}}>
                                <div className="step-icon-wrapper">
                                    <div className="highlight">
                                        <img src={Action1} alt="icon" />
                                    </div>
                                </div>
                                <div className="step-text">
                                    <h4 style={{color:"#2a7cda"}} className="title">CREATE USERS</h4>
                                    {/* <p className="date">Nov 2nd 2021</p>
                                    <p className="time">20:30 </p> */}
                                </div>
                            </div>
                        ):(                            
                            <>
                            {CurrentExit[0].approvedBy === "approved" ? (
                                <>
                                <div className="step" style={{color:"#2a7cda"}}>
                                <div className="step-icon-wrapper">
                                    <div className="highlight">
                                        <img src={Action1} alt="icon" />
                                    </div>
                                </div>
                                <div className="step-text">
                                    <h4 style={{color:"#2a7cda"}} className="title">CREATE USERS</h4>
                                    {/* <p className="date">Nov 2nd 2021</p>
                                    <p className="time">20:30 </p> */}
                                </div>
                            </div>
                            <div className="step" style={{color:"#2a7cda"}}>
                                <div className="step-icon-wrapper" >
                                    <div className="highlight">
                                        <img src={Action2} alt="icon" />
                                    </div>
                                </div>
                                <div className="step-text">
                                    <h4 style={{color:"#2a7cda"}} class="title">APPROVED</h4>
                                    {/* <p class="date">Nov 2nd 2021</p>
                                    <p class="time">20:30 </p> */}
                                </div>
                            </div>
                            <div className="step" style={{color:"rgba(6, 10, 13, 0.5)"}}>
                                <div className="step-icon-wrapper">
                                    <div className="highlight">
                                        <img src={Action2} alt="icon" />
                                    </div>
                                </div>
                                <div className="step-text">
                                    <h4 className="title">CREATE D-ID</h4>
                                    {/* <p className="date">Nov 2nd 2021</p>
                                    <p className="time">20:30 </p> */}
                                </div>
                            </div>
                            <div className="step" style={{color:"rgba(6, 10, 13, 0.5)"}}>
                            <div className="step-icon-wrapper">
                                <div className="highlight">
                                    <img src={Action5} alt="icon" />
                                </div>
                            </div>
                            <div className="step-text">
                                <h4 className="title">COMPLETED</h4>
                                {/* <p className="date">Nov 2nd 2021</p>
                                <p className="time">20:30 </p> */}
                            </div>
                        </div>
                                </>
                            ):(
                                <>
                                {CurrentExit[0].assetId === "" || CurrentExit[0].assetId === null || CurrentExit[0].assetId === undefined ? (
                                    <>
                                <div className="step" style={{color:"#2a7cda"}}>
                                <div className="step-icon-wrapper">
                                    <div className="highlight">
                                        <img src={Action1} alt="icon" />
                                    </div>
                                </div>
                                <div className="step-text">
                                    <h4 style={{color:"#2a7cda"}} className="title">CREATE USERS</h4>
                                    {/* <p className="date">Nov 2nd 2021</p>
                                    <p className="time">20:30 </p> */}
                                </div>
                            </div>
                            <div className="step" style={{color:"#2a7cda"}}>
                                <div className="step-icon-wrapper" >
                                    <div className="highlight">
                                        <img src={Action2} alt="icon" />
                                    </div>
                                </div>
                                <div className="step-text">
                                    <h4 style={{color:"#2a7cda"}} class="title">APPROVED</h4>
                                    {/* <p class="date">Nov 2nd 2021</p>
                                    <p class="time">20:30 </p> */}
                                </div>
                            </div>
                            <div className="step" style={{color:"rgba(6, 10, 13, 0.5)"}}>
                                <div className="step-icon-wrapper">
                                    <div className="highlight">
                                        <img src={Action2} alt="icon" />
                                    </div>
                                </div>
                                <div className="step-text">
                                    <h4 className="title">CREATE D-ID</h4>
                                    {/* <p className="date">Nov 2nd 2021</p>
                                    <p className="time">20:30 </p> */}
                                </div>
                            </div>
                            <div className="step" style={{color:"rgba(6, 10, 13, 0.5)"}}>
                            <div className="step-icon-wrapper">
                                <div className="highlight">
                                    <img src={Action5} alt="icon" />
                                </div>
                            </div>
                            <div className="step-text">
                                <h4 className="title">COMPLETED</h4>
                                {/* <p className="date">Nov 2nd 2021</p>
                                <p className="time">20:30 </p> */}
                            </div>
                        </div>
                                    </>
                                ):(
                                <>
                                 <div className="step" style={{color:"#2a7cda"}}>
                                <div className="step-icon-wrapper">
                                    <div className="highlight">
                                        <img src={Action1} alt="icon" />
                                    </div>
                                </div>
                                <div className="step-text">
                                    <h4 style={{color:"#2a7cda"}} className="title">CREATE USERS</h4>
                                    {/* <p className="date">Nov 2nd 2021</p>
                                    <p className="time">20:30 </p> */}
                                </div>
                            </div>
                                <div className="step" style={{color:"#2a7cda"}}>
                                <div className="step-icon-wrapper" >
                                    <div className="highlight">
                                        <img src={Action2} alt="icon" />
                                    </div>
                                </div>
                                <div className="step-text">
                                    <h4 style={{color:"#2a7cda"}} class="title">APPROVED</h4>
                                    {/* <p class="date">Nov 2nd 2021</p>
                                    <p class="time">20:30 </p> */}
                                </div>
                            </div>
                            <div className="step" style={{color:"#2a7cda"}}>
                            <div className="step-icon-wrapper">
                             <div className="highlight">
                                      <img src={Action2} alt="icon" />
                             </div>
                              </div>
                              <div className="step-text">
                              <h4 style={{color:"#2a7cda"}} className="title">CREATE D-ID</h4>
                              {/* <p className="date">Nov 2nd 2021</p>
                              <p className="time">20:30 </p> */}
                              </div>
                             </div>
                             <div className="step" style={{color:"#2a7cda"}}>
                             <div className="step-icon-wrapper">
                                 <div className="highlight">
                                     <img src={Action5} alt="icon" />
                                 </div>
                             </div>
                             <div className="step-text">
                                 <h4 style={{color:"#2a7cda"}} className="title">COMPLETED</h4>
                                 {/* <p className="date">Nov 2nd 2021</p>
                                 <p className="time">20:30 </p> */}
                             </div>
                         </div>
                                </>    
                                )}
                                </>
                            )}
                            </>
                        )}
                        <div className="horizontal-line"></div>
                        </div>
                        
                        )}
                        </>
                        )}
                        </div>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>                
 </div>
 </div> 
 </Layout>
)
}

export default DashboardKyc;