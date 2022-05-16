import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Dropdown,DropdownButton } from 'react-bootstrap';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';

import Icon1 from '../../assets/images/icon1.png';
import Icon2 from '../../assets/images/icon2.png';
import elem from '../../assets/images/elem-original.png';
import tau from '../../assets/images/tau-original.png';
import logo from '../../assets/images/logoasset.png';
import planetlogo from '../../assets/images/planet.png';
import taulogo from '../../assets/images/tau-original.png';
import elemlogo from '../../assets/images/elem-original.png';
import algologo from '../../assets/images/Algo.png';
import fireDb from '../../NFTFolder/firebase';
import einrlogo from '../../assets/images/EINR-original.png';
import selecttoken from '../../assets/images/selecttoken.png';

import usdclogo from '../../assets/images/usdc-logo.png';


import { useHistory } from "react-router-dom";
import {calltokenForUsers,callapiforuserslist,numberofpairs} from '../apicallfunction';
import moment from 'moment';
import MyAlgoConnect from "@randlabs/myalgo-connect";
import algosdk, { Algod,base64 } from "algosdk";
import {postusertx,postuserdetail,updateusedetails} from '../apicallfunction';
import { Button, Col, Container, Modal, Row, Breadcrumb } from 'react-bootstrap';
import { AppId,escrowProgram } from '../swapConfig';
import { getpostdataall } from '../../firedbstore';
// import { createtxhash ,updatepairhistory,getmethod} from '../apicallfunction';
import { priceofalgoperusdc,priceOfCoin2,find_balance,checkassetin,checkotp,convert1,convert2,readingLocalstate,assetName,decodLocalState } from '../formula';
import firebase from '../../NFTFolder/firebase';
import { assert2Reserve, assert1Reserve } from '../formula';
import node from '../DashboardNew/nodeapi.json';
// import AlgodClient from 'algosdk/dist/types/src/client/v2/algod/algod';
// const baseServer = 'https://testnet-algorand.api.purestake.io/ps2';
// const port = '';

// const token = {
//    'X-API-Key': 'pOD5BAUCxq7InVPjo0sO01B0Vq4d7pD1ask5Ix43'
// }

// const algodClientGet = new algosdk.Algodv2(token, baseServer, port);
const indexerClient = new algosdk.Indexer('', node['indexerclient'], '');
const algodClient = new algosdk.Algodv2('',node['algodclient'], '');

const myAlgoWallet = new MyAlgoConnect();
let data = escrowProgram;
const TopLiquidity = () => {
  useEffect(() => {
    document.title = "PLANET WATCH | ANALYTICS"
}, [])
    let history=useHistory();
    const[dbvalues,setdbvalue] = useState([])
    const [dt,setdt] = useState([]);
    const[ar1,setar1] = useState([]);
    const[ar2,setar2] = useState([]);
    const[ar3,setar3] = useState([]);
    const [s1, sets1] = useState("");
    const [s2, sets2] = useState("");
    const [ilt, setilt] = useState("");
    const[unclaimed_protocol_fees,setunclaimed_protocol_fees]= useState("");
    const[outstanding_asset1_amount,setoutstanding_asset1_amount]= useState("")
    const[outstanding_asset2_amount,setoutstanding_asset2_amount]= useState("")
    const[outstanding_liquidity_amount,setoutstanding_liquidity_amount]= useState("")
    const[shownvalue,setshownalue] = useState(false);
    const[a,seta] = useState([]);
    const [liquidity, setLiquidity] = React.useState(false);
    const [pair, setPair] = React.useState(false);
    const[aprice,setaprice]= useState([]);
    const handleClose = () => setShow(false);
    const [show, setShow] = React.useState(false);
    const [appId,setAppId] = useState("");
    const[b,setb] = useState([]);
    const [algoPrice, setAlgoPrice] = useState("");
    const [usdcPrice, setUsdcPrice] = useState("");
    const[c,setc] = useState([]);
    const[pageSize,setPageSize]=useState(0); 
   const[getasset,setAsset]=useState("Commited");
    const[startingpage,setstap ] = useState(0);
    const[spvalue,setpvalue] = useState("");
  //console.log("avalue",a);
    const[amount2Value,setamount2] = useState("");
    const[amount1Value,setamount1] = useState("");
    // const handleLiquidiy = () => {setLiquidity(!liquidity); setPair(false)};
    const [handleLiquidiyopen,sethandleLiquidiyopen] = useState(false);
    const [handleLiquidiyclose,sethandleLiquidiyclose] = useState(false);
    const handlelopen =() =>{sethandleLiquidiyopen(true)}
    const handlelclose =() =>{sethandleLiquidiyopen(false)}
    const[a1balance,setas1balance]=useState("");
    const[a2balance,setas2balance]=useState("");
    const[samount1,setsAmount1] = useState("");
    const[samount2,setsAmount2] = useState("");
    const[rstate,setrstate]= useState([]);
    const[lofPar,setlengthOfPair] = useState("");
    const[pageoffset,setpageoffset] = useState("0");
    const[appOpted,setOpted] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage,setpostperpage] = useState(4);
    let appID_global = AppId;

    let currentPosts;
    // Get current posts
   
    const dateOptions = ["Newest", "Oldest"];
    const [value, setValue] = React.useState('fruit');
    const [drink, setDrink] = React.useState('water');
    const handleChange = (event) => {
      setAsset(event.target.value);
    };
    
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
  //console.log("bva",startingpage, indexOfLastPost)
    currentPosts = b.slice(startingpage, indexOfLastPost);
//console.log("current",currentPosts,indexOfLastPost);
// alert("entereing")
// console.log("statevalue",dbvalues)
  const readfirebasedata = async()=>{
    // let k =[];
    // k = await getpostdataall();
    // console.log("kvalue",k)
    let r=[];
    let rv =[];
    fireDb.auth().signInAnonymously().then(async(response)=>{       
      // console.log("data")  
      try {         
        // firebase.database().ref(`Registeruser/${localStorage.getItem("walletAddress")}`);
        fireDb.database().ref("Registeruser").on("value", (data) => {          
        if (data) { 
        //console.log("valuedata",data.val())
          r = (data.val())
        //console.log("rv",r)
          // rv.forEach((r)=>{
          // //console.log("mapvalues",r)
          // })
          Object.keys(r).map(async(k)=>{
          //console.log("mapvalues",r[k])
            rv.push(r[k])
          })
        //   data.forEach((d) => { 
        //     //console.log("value",d.val())                
        //       let value=d.val();  
        //        Object.keys(value).map(async(k)=>{
        //           // console.log("value",value)                                                       
        //               r.push({
        //                   id:value[k].id,
        //                   AssetId1:value[k].AssetId1,AssetId2:value[k].AssetId2,AssetId3:value[k].AssetId3,
        //                   AssetName1:value[k].AssetName1,AssetName2:value[k].AssetName2,escrow:value[k].escrow,tvl:value[k].tvl,
        //                   volume:value[k].volume,fees:value[k].fees,address:value[k].address,multipleusers:value[k].multipleusers
        //                 }) 
        //                 //  rv = r.reverse()
        //                 rv = (r.reverse())
        //               //console.log("reverser",rv)  
                        
        //       // console.log("rdatafinal",r) 
        //       })                          
        // })
        // console.log("val",rv)  

        setdbvalue(rv) 
        setb(rv);
        // return rv        
      }         
      });  
                   
    } catch (error) {
      //console.log('error occured during search', error);    
    } 
  // //console.log("data",r[0],r) 
   
  })
    // setdbvalue(k)
    // setb(k);
  }
  useEffect(()=>{readfirebasedata()},[])




    const setpostcall = async()=>{
  //     if(pageoffset === 0){

  //     }
  //     else{
  //       setpageoffset(pageoffset - 1)
  //       let k = await callapiforuserslist(pageoffset - 1);
  // // console.log("K",k)
  //   setb(k);
  //     }
     
      //console.log("postperpage",postsPerPage)
      //   if(postsPerPage <= 4){
            
      //   }
      //   else{
        // setstap(indexOfLastPost-4)
        if(postsPerPage >=8){
        //console.log("indexval",startingpage,postsPerPage)
          setpostperpage(postsPerPage-4)
          // console.log("indexval1",startingpage,postsPerPage)
          setstap(startingpage - 4)
          // console.log("indexval2",startingpage,postsPerPage)
        //console.log("postperpage",currentPosts)
        }
        
      //   }
    
       
    }
   
  
    

   
   const setincrm= async()=>{
     if(postsPerPage < (dbvalues.length)){
      setstap(indexOfLastPost)
      setpostperpage(postsPerPage+4)
     }
   }
   
 


const filterdata=()=>{
       
  if(getasset === "Algos"){        
      let data=b.filter((val)=> {return (val.Assettype ==="Algos")})
  //   console.log("filtercall12",data)
    return data;        
  }
  else if(getasset==="Planet"){
    let data=b.filter((val)=> {return (val.Assettype ==="Planet")})
    //   console.log("filtercall12",data)
      return data;  
  }
  else{
    
    //   console.log("filtercall12",data)
      return b;  
  }
                 
  return b
}

    return (
        <div className='mb-5'>


          {/* <center><h6>Before Add Liquidity go to Swap Page and do App Opt-In</h6></center> */}
          {/* <br></br> */}
            <h2 className="h3 text-uppercase mb-40">Governors</h2>
           
               
            <ToastContainer position='top-center' draggable = {false} transition={Zoom} autoClose={8000} closeOnClick = {false}/>

            <div className="table-group-outer table-group-lg">
                <div className="table-group-head">
                    <div className="table-group-tr">
                        <div className="table-group-th">Address</div>
                        <div className="table-group-th"></div>
                        {/* <div className="table-group-th"></div> */}
                        <div className="table-group-th">
                       
                            {/* <Dropdown>
                                <Dropdown.Toggle variant="reset" id="dropdown-basic">
                                   {getasset}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1" onChange={()=>{setAsset("PlanetToken")}} value="PlanetToken">Planet</Dropdown.Item>
                                    
                                   
                                </Dropdown.Menu>
                                <Dropdown.Menu>
                                    
                                    <Dropdown.Item href="#/action-2" onChange={()=>{setAsset("Algos")}} value="Algos">Algos</Dropdown.Item>
                                    
                                </Dropdown.Menu>
                            </Dropdown> */}
                            <select className="table-group-th" value={getasset} onChange={handleChange}>
          <option   value="Commited">Commited </option>
          <option  value= "Planet">Planet</option>
          <option   value="Algos">Algos</option>

        
        </select>
             
                        </div>
                        
                        <div className="table-group-th">Registered</div>
                        <div className="table-group-th">Votes </div>
                        <div className="table-group-th">Status</div>
                    
                    </div>
                </div>
                

                    {dbvalues ===null || dbvalues ==="" || dbvalues ===undefined || dbvalues.length == 0?(<>
                      
                        <div className="table-group-body text-gray-AA">
         
               <span className="d-block text-center">
                  <svg version="1.1" id="L9" width="80" height="80" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                      viewBox="0 0 100 100" enable-background="new 0 0 0 0">
                        <path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                          <animateTransform 
                            attributeName="transform" 
                            attributeType="XML" 
                            type="rotate"
                            dur="1s" 
                            from="0 50 50"
                            to="360 50 50" 
                            repeatCount="indefinite" />
                      </path>
                    </svg>
                </span>
               <div className="table-group-body text-gray-AA" >

           
                    </div>
</div>
                    </>):(<>
                    
                        {filterdata().map((pageSize)=>{
                        //    if(i<pageSize)
// console.log("pagesize",(pageSize.fees/1000000)* algoPrice)
                            return(<>
                            <div className=" text-gray-AA" >
                            {/* <img src="https://c.tenor.com/FBeNVFjn-EkAAAAS/ben-redblock-loading.gif"/> */}
                            
<div className="table-group-tr">
<div className="table-group-td">
    <div className="d-flex align-items-center td-cell">
    {/* {(localStorage.getItem("walletAddress")).substring(0, 4)}...{(localStorage.getItem("walletAddress")).substring((localStorage.getItem("walletAddress")).length -4, (localStorage.getItem("walletAddress")).length)} */}
        <div className="table-group-td">{(pageSize.WalletAddress).substring(0, 8)}...{(pageSize.WalletAddress).substring((pageSize.WalletAddress).length -4,(pageSize.WalletAddress).length)} </div>
       
    </div>
</div>
<div className="table-group-td"></div>

{/* <div className="table-group-td"></div> */}
{(pageSize.Amount=== " " || pageSize.Amount === null || pageSize.Amount === undefined ) ? 
(<>
<div className="table-group-td">0</div>
</>) :
 
 (<>
 <div className="table-group-td">
   
   {pageSize.Assettype==="Algos"?(<>
    <img src={algologo} alt="logo" style={{width:'10%',height:'8%'}} className='me-2 avatar-pic' />
   </>):(<>
    <img src={planetlogo} alt="logo" style={{width:'10%',height:'8%'}} className='me-2 avatar-pic' />
   </>)}
   {parseFloat(pageSize.Amount)} {(pageSize.Assettype)}</div>
 </>)}

<div className="table-group-td">{pageSize.TimeStamp}</div>
{(pageSize.Vote=== " " || pageSize.Vote === null || pageSize.Vote === undefined ) ?(<> 0 </>):(<> <div className="table-group-td">{pageSize.Vote}</div></>) }
{(pageSize.Eligibility=== " " || pageSize.Eligibility === null || pageSize.Eligibility === undefined || pageSize.Eligibility === "0" ||pageSize.Eligibility === 0) ?(<><div className="table-group-td" style={{color:"red"}}>Not Eligible </div></>):(<> <div className="table-group-td" style={{color:"green"}}>Eligible </div></>) }


</div>
</div></>)
 
})}</>)}
                    
                
            </div>

            <div className="pagination-footer d-flex align-items-center justify-content-between">
                <p>showing {startingpage+1}-{startingpage + 4} from {parseFloat(dbvalues.length/4).toFixed(0)} Page</p>

                <div className="d-flex pagination align-items-center">
                  

                    <Button variant='page' onClick={()=>{setpostcall()}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                        </svg>
                    </Button>
                    <Button variant='page' onClick={()=>{setincrm()}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </Button>
                </div>
            </div>
         
           


        </div>
    );
};

export default TopLiquidity;
