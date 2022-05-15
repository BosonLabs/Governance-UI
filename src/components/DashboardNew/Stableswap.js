import React, { useState,useEffect } from 'react';
import { Button, Card, Form, InputGroup, Col, Container, Dropdown, Modal, OverlayTrigger,Accordion, Row, Tab, Tabs, Tooltip, Alert, Badge } from 'react-bootstrap';
import Layout from './LayoutT';

import USDC from '../../assets/images/usdc.jpg';
import { Link } from 'react-router-dom';
import ButtonLoad from 'react-bootstrap-button-loader';

import usdclogo from '../../assets/images/usdc-logo.png';
import taulogo from '../../assets/images/tau-original.png';
import elemlogo from '../../assets/images/elem-original.png';
import algologo from '../../assets/images/Algo.png';
import usdtlogo from '../../assets/images/usdtimg.png';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import selecttoken from '../../assets/images/selecttoken.png';

import axios from 'axios';

import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import { dualwalletconnect } from './walletconnection';
import algosdk, { Algod ,encodeUint64} from "algosdk";

import node from './nodeapi.json';
import einrlogo from '../../assets/images/EINR-original.png';
import { AppId,escrowProgram,escrowProgram2,elemToken } from '../swapConfig';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import { createstableswap,postdatastableswap } from '../../firedbstore';
import { greaterAsset,AppDetails,globalstate,getD,getY ,getvaluesfromnode} from '../StableswapConfig';
import {amount_out_with_slippage,minAlgoBalance,updatealgobalance,mintotrx,checkotp,swapinput,walletBalance,amount1_input,convert1,convert2,asset1_price,assert3Reserve,assert1Reserve,assert2Reserve,readingLocalstate,escrowdatacompile,checkassetin,escrowdata,asset2_price, find_balance_escrow,find_balance,priceOfCoin1,priceOfCoin2} from '../formula';
const algodClient = new algosdk.Algodv2('',node['algodclient'], '');
const myAlgoWallet = new MyAlgoConnect({ disableLedgerNano: false });
const indexerClient = new algosdk.Indexer('', node['indexerclient'], '');

const bridge = "https://bridge.walletconnect.org";

let appID_global = AppId;
let data = escrowProgram;
// let swapFee = 0.001;

const Stablecoin = () => {
  useEffect(() => {
    document.title = "ELEMENT | Stableswap"
}, [])
    const [show, setShow] = useState(false);
    // const [switchState, setSwitchState] = useState(false);
    const [showMode, setShowMode] = useState(false);
    const [showAlert, setShowAlert] = useState(true);
    const [val, setVal] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleChange = () => {
        setShowMode(true); 
        // setSwitchState(true);
    }
    const handleCloseMode = () => {
        setShowMode(false); 
        // setSwitchState(true);
    }
    const btnhandleCloseMode = () => {
        setShowMode(false); 
        // setSwitchState(true);
    }

    const [key, setKey] = useState();
    const [show1, setShow1] = useState(false);

    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const[tokId1,setTokId1] = useState(78045387)  //TokId1
    const[tokId2,setTokId2] = useState()  //TokId2
    const[tokName1,setTokName1] = useState("USDC")  //Tok Name 1
    const[tokName2,setTokName2] = useState()  //Tok Name 2

    const[tokLogo1,setTokLogo1] = useState(usdclogo)  //Tok logo 1
    const[tokLogo2,setTokLogo2] = useState() //Tok logo 2

    const[tokBalance1,setTokBalance1] = useState()  //Tok Balance 1
    const[tokBalance2,setTokBalance2] = useState() //Tok Balance 2

    const[assetoptin1,setAssetOptin1] = useState(false);
    const[assetoptin2,setAssetOptin2] = useState(false);
    const[assetoptin3,setAssetOptin3] = useState(false);
    const[showliq,showliquidity] = useState(false);
    const[sout1,setsout1] = useState("");
    const[sout2,setsout2] = useState("");
    const[rs1value,setrsvalue1] = useState("")
    const[rs2value,setrsvalue2] = useState("")
    const[rs3value,setrsvalue3] = useState("")
    const[fee,setfees] = useState(0.05);
    
    const[decl1,setdeclaring1]=useState("");
    const[decl2,setdeclaring2] = useState("");
    const[samount1,setsamount1] = useState("");
    const[samount2,setsamount2] = useState("");
    const[AssWithFee,setasswithfee] = useState("");
    const[swf,setswf] = useState("");
    const[assetBalance,setassetBalance] = useState("");
    const[minbalance,setminbalance]= useState("");
    const [enoughbalance, setenoughbalance] = useState(false);
    const[swapdetail,setswapdetail]= useState(false);
    const[sufficient,setsufficient]= useState(false);
    const[nolPair,setNoLPair]= useState(false);
    const[balanceid1,setbamalanceid1]= useState("");
    const[appOpted,setOpted] = useState(false);
    const[showdetails,setshowdetails] = useState(false);
    const[as3Id,setas3Id] = useState("");
    const[slippage,setslippage] = useState()
    const[liq1,setliq1] = useState("");
    const[liq2,setliq2] = useState("");
    const[LpAssetOptin,setLpAssetOptin] = useState("");
    const[minimumbalance,setminimumBalance] = useState("")
    const[LpassetBlance,setLpassetBlance] = useState("");
    const[liquidityamount,setliquidityamount]=useState("");
    const[amount1Out,setamount1Out]= useState([]);
    const[amount2Out,setamount2Out]= useState([]);
    const[id,setid]= React.useState("");
    const[seem,setseem]= useState([]);
    const[smore,sets]= useState(false);
    const[smore1,sets1] = useState(false);
    const[assetdetails,setAssetdetails] = useState([]);
    const[insuuficient,showinsuuficient] = useState(false);
    const[sname1,setsName1] = useState("");
    const[slogo1,setSlogo] = useState("");
    const[sunitname1,setSunitname1] = useState("");
    const[sid,setSid1] = useState("");
 const[loader, setLoader] = useState(false);
 const[simage,setsimage] = useState([]);
 const[mintotranser,setmintotransfer] = useState("");


//  new code
const[globalStatevalue,setglobalstate] = useState([]);
const[assets,setassets] = useState([]);
const[appiddetails,setappiddetails] = useState([]);
const[addliqvalues,setaddliqvalues] = useState([]);
const[lpbalance,setlpbalance] = useState("");
const[optinlp, setoptinlp] = useState(true);
const[swapFee,setswapFee] = useState(0.0001);
//new code
console.log("globalstate",globalStatevalue)

    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false);

   
    useEffect(()=>{checkbalan()},[])
    const checkbalan = async()=>{

    
    
    // example
    ////console.log("trauncated",truncate(1234.56789, 3));
      
     
        let [s1,opt] = await walletBalance(78045387);
        // setbamalanceid1(s1);
        setTokBalance1(s1);
        let [ss,op2t] = await walletBalance(0);
        setbamalanceid1(ss);
        let k = await mintotrx();
        ////console.log("kval",k)
        setmintotransfer(k);
        let mn = await minAlgoBalance();
        ////console.log("minimum",mn)
        setminbalance(mn);
        let [s2,opt1] = await walletBalance(88067314);
        setAssetOptin3(opt1)
        let [s3,opt3] = await walletBalance(78045387);
        let [s4,opt4] = await walletBalance(78043454);
        

      let  s=[
          {index:78045387,image:usdclogo,name:"USDC",bal:s3},
          {index:78043454,image:taulogo,name:"TAU",bal:s4},
          {index:88067314,image:usdtlogo,name:"USDT",bal:s2},
          // {index:78044898,image:einrlogo,name:"EINR",bal:s5}
         
      ]
      setsimage(s);
      let gv = await getvaluesfromnode(node['algodclient']);
     //console.log("gv",gv)
      setaddliqvalues(gv);

       
      }
      ////console.log("truncate",truncate(1.3699))
      function truncate(number, index = 3) {
        // cutting the number
        return +number.toString().slice(0, (number.toString().indexOf(".")) + (index + 1));
    }
    const settingfee = (a)=>{
      if(a < 0.0006){
        setswapFee(a)
      }
      else{
        setswapFee(0.0005)
      }
      
    } 
    
    const choose1 =async(id,logo,name)=>{
        setsamount1("")
        setsamount2("")
   setshowdetails(false)
        setliq1("")
        setliq2("")
        setTokId1(id);
        setTokName1(name)
        setTokLogo1(logo)
        let [value,optin] = await walletBalance(parseInt(id));
        setTokBalance1(value)
        setAssetOptin1(optin)
        // callval(id,tokId2) 
       callv(id,tokId2);
        handleClose()
       
        
        
    }

    const callv = async(id1,id2) =>{
      let[asid1,asid2] = greaterAsset(id1,id2)
      setassets([asid1,asid2]);
      let[lpassetid,Managerappid,pairAppid,pairAddress] = AppDetails(asid1,asid2);
      setappiddetails([lpassetid,Managerappid,pairAppid,pairAddress])
     //console.log("choose",lpassetid,Managerappid,pairAppid,pairAddress)
      let [value2,optin2] = await walletBalance(parseInt(lpassetid));
      let gs = pairAppid ? await globalstate(algodClient,pairAppid) : 0 ;
     
      setoptinlp(optin2)
      setglobalstate(gs);
      setlpbalance(value2)
      gs ? setNoLPair(false) : setNoLPair(true)
      callval(gs.AssetId1,gs.balance1,gs.balance2)
    }

    const choose2 =async(id,logo,name)=>{
        setsamount1("")
        setsamount2("")
        setliq1("")
        setliq2("")
        setshowdetails(false)
        setTokId2(id);
        setTokName2(name)
        setTokLogo2(logo)
        let [value,optin] = await walletBalance(parseInt(id));
        setTokBalance2(value);
        ////console.log("opted",optin)
        setAssetOptin2(optin)
        // callval(tokId1,id)
        callv(tokId1,id)
        handleClose1()
       
        
    }
   //console.log("decl",decl1)
    // useEffect(()=>{callval()
    // },[tokId1,tokId2])
    const callval=async(a1,b1,b2)=>{
      let swapInAmountLessFees = 1000000;
      let swapOutAmount = 0
      let numIter = 0

      // let p = b2/b1;
      // let p2 = b1/b2;
      // setdeclaring1(p)
      // setdeclaring2(p2)
      if (tokId1 === a1) {
        
        let p = b2/b1;
      //     //  let [D, numIterD] = getD([b1, b2], 50000000)
      //     // //console.log("D",D)
       
      //     //  let [y, numIterY] = getY(0, 1, b1 + parseInt(swapInAmountLessFees), [b1, b2],parseInt(D), 50000000)
      //     //  swapOutAmount = b2 - Number(y);
           setdeclaring1(p)
      //     //  let outwithslippage = swapOutAmount - (swapOutAmount * swapFee)
      //     //  setasswithfee((outwithslippage))
      //     //  numIter = numIterD + numIterY
      //  //console.log("swapOutAmount",swapOutAmount,b2,y)
      //   // return new BalanceDelta( -1 * swapInAmount, swapOutAmount, 0, numIter)
      } else {
       
      //   //  let [D, numIterD] = getD([b1, b2], 50000000)
      //   //  let [y, numIterY] = getY(1, 0, b2 + parseInt(swapInAmountLessFees), [b1, b2], parseInt(D), 50000000)
      //   //  swapOutAmount = b1 - y ;
      //   //  setdeclaring1((swapOutAmount)/1000000)
      //   //  let outwithslippage = swapOutAmount - (swapOutAmount * swapFee)
        let p = b1/b2;
        setdeclaring1(p)
      //   //  setasswithfee(outwithslippage)
      //   //  numIter = numIterD + numIterY
      //   //console.log("swapOutAmount2",swapOutAmount)
      //   //  let l = new BalanceDelta(swapOutAmount, -1 * swapInAmount, 0, numIter);
      //   // //console.log("lvalue",l)
      //   // return l;
      }
        }
    const regainstate = async(id1,id2)=>{
      setsamount1("");
      setsamount2("");
      setliq1("");
      setliq2("");
      setliquidityamount("");
      setamount1Out("");
      setamount2Out("");
      setshowdetails(false);
      let [value1,optin1] = await walletBalance(parseInt(id1));
      let [value,optin] = await walletBalance(parseInt(id2));
      let [ss,op2t] = await walletBalance(0);
      setbamalanceid1(ss);
    
      let k = await mintotrx();
      ////console.log("kval",k)
      setmintotransfer(k);
     //console.log("value",value1,value)
        setTokBalance1(value1)
        setTokBalance2(value)
        // setTokBalance2(value);
        await callv(id1,id2);

        // let[asid1,asid2] = greaterAsset(id1,id2)
        // setassets([asid1,asid2]);
        // let[lpassetid,Managerappid,pairAppid,pairAddress] = AppDetails(asid1,asid2);
        // setappiddetails([lpassetid,Managerappid,pairAppid,pairAddress])
        ////console.log("choose",lpassetid,Managerappid,pairAppid,pairAddress)
        // let [value2,optin2] = await walletBalance(parseInt(lpassetid));
        // let gs = pairAppid ? await globalstate(algodClient,pairAppid) : 0 ;
        // setoptinlp(optin2)
        // setglobalstate(gs);
        // setlpbalance(value2)
        // gs ? setNoLPair(false) : setNoLPair(true)
        // callval(gs.AssetId1,gs.balance1,gs.balance2)

        let [s2,opt1] = await walletBalance(88067314);
        setAssetOptin3(opt1)
        let [s3,opt3] = await walletBalance(78045387);
        let [s4,opt4] = await walletBalance(78043454);
        

      let  s=[
          {index:78045387,image:usdclogo,name:"USDC",bal:s3},
          {index:78043454,image:taulogo,name:"TAU",bal:s4},
          {index:88067314,image:usdtlogo,name:"USDT",bal:s2},
          // {index:78044898,image:einrlogo,name:"EINR",bal:s5}
         
      ]
      setsimage(s);
    } 
        
      const swap1 = async(in_Amount) => {
        let swapInAmount;
        setsamount1(in_Amount)
       //console.log("in_amount",in_Amount)
      
        
       if(Math.sign(in_Amount )=== -1){
        swapInAmount = 0;
       }else{
        swapInAmount = in_Amount * 1000000;
        // swapInAmount > tokBalance1 ? setenoughbalance(true): setenoughbalance(false);
        
       }
       let swapOutAmount = 0;
       if(in_Amount === 0 || in_Amount === undefined || in_Amount === "" || in_Amount === null){
       //console.log("in_amount",in_Amount)
        setsamount2("");
     }
   
     else{
      let swapInAmountLessFees = swapInAmount;
      
      let numIter = 0
      if (tokId1 === globalStatevalue.AssetId1) {

        let p = globalStatevalue.balance2/globalStatevalue.balance1;
        console.log("pvalue",p)
        let inamount = swapInAmount - (swapInAmount * 0.0001);
        swapOutAmount = inamount * p ;
        swapInAmount ? setsamount2(truncate((swapOutAmount)/1000000)) : setsamount2()
        let asoutwithfees = swapOutAmount - (swapOutAmount * swapFee);
        setasswithfee(asoutwithfees)
       rsvaluecheck((swapInAmount/1000000),(swapOutAmount/1000000),globalStatevalue.balance1,globalStatevalue.balance2)

          //  let [D, numIterD] = getD([globalStatevalue.balance1, globalStatevalue.balance2], 50000000)
          // //console.log("D",D)
       
          //  let [y, numIterY] = getY(0, 1, globalStatevalue.balance1 + parseInt(swapInAmountLessFees), [globalStatevalue.balance1, globalStatevalue.balance2],parseInt(D), 50000000)
          //  swapOutAmount = globalStatevalue.balance2 - Number(y);
          //  swapInAmount ? setsamount2(truncate((swapOutAmount)/1000000)) : setsamount2()
          //  let outwithslippage = swapOutAmount - (swapOutAmount * swapFee)
          //  setasswithfee((outwithslippage))
          //  rsvaluecheck((swapInAmountLessFees/1000000),(swapOutAmount/1000000),globalStatevalue.balance1,globalStatevalue.balance2)
          //  numIter = numIterD + numIterY
       //console.log("swapOutAmount",swapOutAmount,globalStatevalue.balance2,y)
        // return new BalanceDelta( -1 * swapInAmount, swapOutAmount, 0, numIter)
      } else {
       

        let p = globalStatevalue.balance1/globalStatevalue.balance2;
        let inamount = swapInAmount - (swapInAmount * 0.0001);
        swapOutAmount = inamount * p ;
        swapInAmount ? setsamount2(truncate((swapOutAmount)/1000000)) : setsamount2()
        let asoutwithfees = swapOutAmount - (swapOutAmount * swapFee);
        setasswithfee(asoutwithfees)
       rsvaluecheck((swapInAmount/1000000),(swapOutAmount/1000000),globalStatevalue.balance1,globalStatevalue.balance2)

        //  let [D, numIterD] = getD([globalStatevalue.balance1, globalStatevalue.balance2], 50000000)
        //  let [y, numIterY] = getY(1, 0, globalStatevalue.balance2 + parseInt(swapInAmountLessFees), [globalStatevalue.balance1, globalStatevalue.balance2], parseInt(D), 50000000)
        //  swapOutAmount = globalStatevalue.balance1 - y ;
        //  swapInAmount ? setsamount2(truncate((swapOutAmount)/1000000)) : setsamount2()
        //  let outwithslippage = swapOutAmount - (swapOutAmount * swapFee)
    
        //  setasswithfee(outwithslippage)
        //  rsvaluecheck((swapInAmountLessFees/1000000),(swapOutAmount/1000000),globalStatevalue.balance2,globalStatevalue.balance1)

        //  numIter = numIterD + numIterY
        //console.log("swapOutAmount2",swapOutAmount)
        //  let l = new BalanceDelta(swapOutAmount, -1 * swapInAmount, 0, numIter);
        // //console.log("lvalue",l)
        // return l;
      }
      checkwallet(swapInAmountLessFees,0);
     }
    
      // swapInAmount = swapInAmount * 1000000   
  // let swapInAmountLessFees = swapInAmount - (Math.floor(swapInAmount * swapFee) + 1)
  // let swapInAmountLessFees = swapInAmount - Math.ceil(swapInAmount * swapFee);
  
 
    swapOutAmount ?  setshowdetails(true) :  setshowdetails(false)   
          
      
      }
      const swap2 = async(out_Amount) =>{
        setsamount2(out_Amount);
        let swapInAmount;
        if(Math.sign(out_Amount) === -1){
          swapInAmount = 0;
          }
          else{
            swapInAmount = out_Amount * 1000000
          }
          let a1,a2;
          // let swapInAmountLessFees = swapInAmount - Math.ceil(swapInAmount * swapFee);
          let swapInAmountLessFees = swapInAmount;
          let outwithslippage = swapInAmountLessFees - (swapInAmountLessFees * swapFee)

          setasswithfee((outwithslippage))
          let swapOutAmount = 0
  let numIter = 0
  if(out_Amount === 0 || out_Amount === undefined || out_Amount === "" || out_Amount === null){
  
    setsamount1("");
 }
 else{
  if (tokId2 === globalStatevalue.AssetId1) {

    let p = globalStatevalue.balance2/globalStatevalue.balance1;
    console.log("pvalue",p)
    
    let asoutwithfees = swapInAmount - (swapInAmount * swapFee);
    swapOutAmount = asoutwithfees * p ;
    swapOutAmount > tokBalance1 ? setenoughbalance(true): setenoughbalance(false);
    
    let inamount = swapOutAmount - (swapOutAmount * 0.0001);
    swapInAmount ? setsamount1(truncate((inamount)/1000000)) : setsamount1()

    rsvaluecheck((swapInAmount/1000000),(asoutwithfees/1000000),globalStatevalue.balance2,globalStatevalue.balance1)


  //   let [D, numIterD] = getD([globalStatevalue.balance1, globalStatevalue.balance2], 50000000)
  //  //console.log("D",D)

  //   let [y, numIterY] = getY(0, 1, globalStatevalue.balance1 + parseInt(swapInAmountLessFees), [globalStatevalue.balance1, globalStatevalue.balance2], parseInt(D), 50000000)
  //   swapOutAmount = globalStatevalue.balance2 - Number(y);
  //   swapOutAmount > tokBalance1 ? setenoughbalance(true): setenoughbalance(false);
  //   swapInAmount ? setsamount1(truncate(swapOutAmount/1000000)) : setsamount1()
  //   rsvaluecheck((swapInAmountLessFees/1000000),(swapOutAmount/1000000),globalStatevalue.balance2,globalStatevalue.balance1)

   //  numIter = numIterD + numIterY
//console.log("swapOutAmount",swapOutAmount,globalStatevalue.balance2,y)
 // return new BalanceDelta( -1 * swapInAmount, swapOutAmount, 0, numIter)
} else {

//   let [D, numIterD] = getD([globalStatevalue.balance1, globalStatevalue.balance2], 50000000)
//   let [y, numIterY] = getY(1, 0, globalStatevalue.balance2 + parseInt(swapInAmountLessFees), [globalStatevalue.balance1, globalStatevalue.balance2], parseInt(D), 50000000)
//   swapOutAmount = globalStatevalue.balance1 - y ;
//   swapOutAmount > tokBalance1 ? setenoughbalance(true): setenoughbalance(false);

//   swapInAmount ? setsamount1(truncate(swapOutAmount/1000000)) : setsamount1()
//  //  numIter = numIterD + numIterY
//  let outwithslippage = swapOutAmount - (swapOutAmount * swapFee)
//  rsvaluecheck((swapInAmountLessFees/1000000),(swapOutAmount/1000000),globalStatevalue.balance1,globalStatevalue.balance2)

let p = globalStatevalue.balance1/globalStatevalue.balance2;
    console.log("pvalue",p)
    
    let asoutwithfees = swapInAmount - (swapInAmount * swapFee);
    swapOutAmount = asoutwithfees * p ;
    swapOutAmount > tokBalance1 ? setenoughbalance(true): setenoughbalance(false);
    
    let inamount = swapOutAmount - (swapOutAmount * 0.0001);
    swapInAmount ? setsamount1(truncate((inamount)/1000000)) : setsamount1()

    rsvaluecheck((swapInAmount/1000000),(asoutwithfees/1000000),globalStatevalue.balance2,globalStatevalue.balance1)


 // setasswithfee(outwithslippage)
 //console.log("swapOutAmount",swapOutAmount)
 //  let l = new BalanceDelta(swapOutAmount, -1 * swapInAmount, 0, numIter);
 // //console.log("lvalue",l)
 // return l;
}
checkwallet(swapOutAmount,0);
 }

 
  swapOutAmount ?  setshowdetails(true) :  setshowdetails(false)    
      }

      const checkwallet = (a,b) =>{
        if(a > tokBalance1 || b > tokBalance2){
          setenoughbalance(true)
        }
        else{
          setenoughbalance(false)
        }
      }
      const conectWallet = async () => {
        try {
            let settings = {
                shouldSelectOneAccount: true,
                openManager: true
            }
            const accounts = await myAlgoWallet.connect(settings);
            const addresses = accounts.map((account) => account.address);
            
            localStorage.setItem("walletAddress", addresses[0]);
            window.location.reload();
            } catch (err) {
            //console.error(err);
            }

       };
    const appOptIn = async () =>
    {
      handleShowLoad()
   //console.log("minb",mintotranser ,balanceid1)
    if(balanceid1 >= mintotranser + 557000){
    // const algodClient = new algosdk.Algodv2('', 'https://api.testnet.algoexplorer.io', '');



    let index = parseInt(appID_global);
    ////console.log("appId inside donate", index)
    try {

    const params = await algodClient.getTransactionParams().do();

    let optinTranscation = algosdk.makeApplicationOptInTxnFromObject({
    from:localStorage.getItem("walletAddress"),
    suggestedParams:params,
    appIndex:index
    });

    let transid=await dualwalletconnect(optinTranscation);
    await waitForConfirmation(algodClient, transid,"App Opt-In is completed successfully");
    await updatealgobalance()
    // const signedTx1 = await myAlgoWallet.signTransaction(optinTranscation.toByte());

    // //toast.info("Transaction in Progress");
    // const response = await algodClient.sendRawTransaction(signedTx1.blob).do();
    // ////console.log("TxID", JSON.stringify(response, null, 1));
    // await waitForConfirmation(algodClient, response.txId,"App Opt-In");
    

    // await postusertx(localStorage.getItem("walletAddress"),response.txId,0,"Opt-In App",0,0,"","",0);

    // await postusertx("-",response.txId,"App Opt-In","-","-")

    setOpted(true)
    }catch (err) {
      handleHideLoad()
   //console.log("err",err.toString())
    let ev = err.toString()
    let present = ev.indexOf("balance")   
    let present4 = ev.indexOf("already")
    let present5 = ev.indexOf("blocked")
    //console.log("err",ev)
    if(present > 1){
    toast.error(`Your Algo balance is low. Please get more Algos from dispenser`);
    }
    else if(present4 > 1){
    toast.error(`Already opted the App `);
    }
    else if(present5 > 1){
    toast.error(`Allow the pop up window and try again`);
    }
    else{
      toast.error(`err`);
    }
   



    //console.error(err);
    }
    }
    else{
handleHideLoad()
    toast.error("You are not having enough Algo to do Transaction");
    }

    }

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
 } 
    const waitForConfirmation = async function (algodclient, txId,type) {
        let status = await algodclient.status().do();
        let lastRound = status["last-round"];
        while (true) {
          const pendingInfo = await algodclient
            .pendingTransactionInformation(txId)
            .do();
          if (
            pendingInfo["confirmed-round"] !== null &&
            pendingInfo["confirmed-round"] > 0
          ) {
            let id = "https://testnet.algoexplorer.io/tx/" + txId;
            toast.success(toastDiv(id,type));
            
            handleHideLoad();
            break;
          }
          lastRound++;
          await algodclient.statusAfterBlock(lastRound).do();
        }
      };
      const toastDiv = (txId,type) =>
      (
          <div>
             <p> {type} &nbsp;<a style={{color:'blue'}} href={txId} target="_blank" rel="noreferrer">View in algoexplorer <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.7176 3.97604L1.69366 14L0.046875 12.3532L10.0697 2.32926H1.23596V0H14.0469V12.8109H11.7176V3.97604Z" fill="blue"/>
      </svg></a></p> 
          </div>
      );
    const checkassetOptin = async()=>{
      handleShowLoad()
    
        if(parseInt(tokId2) === parseInt(elemToken)){
            if(balanceid1 >= (mintotranser + 101000)){
                assetoptincall(1);
            }
            
            else{
              handleHideLoad()
              toast.error("Not having sufficient Algo")
            }
        }
        else if(assetoptin2 && assetoptin3){
            if(balanceid1 >= (mintotranser + 202000)){
                assetoptincall(2);
            }
            
            else{
              handleHideLoad()
              toast.error("Not having sufficient Algo")

            }
        }
        else if(assetoptin2){
            if(balanceid1 >= (mintotranser + 101000)){
                assetoptincall(1);
            }
            
            else{
              handleHideLoad()
              toast.error("Not having sufficient Algo")

            }
        }
        else if(assetoptin3){
            if(balanceid1 >= (mintotranser + 101000)){
                assetoptincall(1);
            }
            
            else{
              handleHideLoad()
              toast.error("Not having sufficient Algo")

            }
        }
    }  

    const rsvaluecheck = (a,b,c,d)=>{
      let k ;
      if(c > (a * 1000000) && d > (b*1000000)){
        k =  0;
        showinsuuficient(false)
      }
      else{
        k = 1;
        showinsuuficient(true)
      }
    }

    const assetoptincall = async(a)=>{
        const params = await algodClient.getTransactionParams().do();
        let optinTranscation1 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                from:localStorage.getItem("walletAddress"),
                to :localStorage.getItem("walletAddress"),
                assetIndex: parseInt(tokId2),
                amount: 0,
                suggestedParams:params
              });
        let optinTranscation2 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from:localStorage.getItem("walletAddress"),
            to :localStorage.getItem("walletAddress"),
            assetIndex: parseInt(elemToken) ,
            amount: 0,
            suggestedParams:params
            });
        if(a === 1)
        {           
            // const signedTx11 = await myAlgoWallet.signTransaction(optinTranscation1.toByte());
            //   //toast.info("Transaction in Progress");
              
            //   const response1 = await algodClient.sendRawTransaction(signedTx11.blob).do();
              // await waitForConfirmation(algodClient, response1.txId,"Asset Opt-In");
              let transid=await dualwalletconnect(optinTranscation1);
              await waitForConfirmation(algodClient, transid,"Asset Opt-In is completed successfully");
              await updatealgobalance()
              setAssetOptin2(false)
              setAssetOptin3(false)
        }else{
            const groupID = algosdk.computeGroupID([ optinTranscation1, optinTranscation2]);
            const txs = [ optinTranscation1, optinTranscation2];
            for (let i = 0; i <= 1; i++) txs[i].group = groupID;
            if(localStorage.getItem("walletName") === "myAlgoWallet"){
              const signedTx11 = await myAlgoWallet.signTransaction([txs[0].toByte(),txs[1].toByte()]);
              // //toast.info("Transaction in Progress");
  
              const response1 = await algodClient.sendRawTransaction([signedTx11[0].blob,signedTx11[1].blob]).do();
              await waitForConfirmation(algodClient, response1.txId,"Opt-In is completed successfully");
              await updatealgobalance()
              setAssetOptin2(false)
              setAssetOptin3(false)
            }
            else if(localStorage.getItem("walletName") === "PeraWallet"){
              const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
              const txns = [txs[0], txs[1]]
              const txnsToSign = txns.map(txn => {
                const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
               //console.log(encodedTxn);
                return {
                  txn: encodedTxn,
              };
            });
        
            const requestParams = [ txnsToSign ];
            const request = formatJsonRpcRequest("algo_signTxn", requestParams);
            const result = await connector.sendCustomRequest(request);
            const decodedResult = result.map(element => {
              return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
            });
              // send and await
        
              let response = await algodClient.sendRawTransaction(decodedResult).do();
              await waitForConfirmation(algodClient, response.txId,"Opt-In is completed successfully");
              await updatealgobalance()
        
        
           // localStorage.setItem("Staked","stakedbalance");
           
    
    
            }


            
        }
    } 
    const zeroinput = (a,b)=>{
      let k ;
     //console.log("zeroinput",a,b)
      if(a === 0 || a === "" || (a*1000000) === 0|| (b*1000000) === 0|| a === undefined || b === undefined || a === null || b === null || b === 0 || b === ""){
        toast.error("Please enter the input values")
        handleHideLoad();
        k = 1;
      }
      else{
        k = 0;
      }
      return k;
    }

    const swapcheck = async(appid,asset_in_amount,assetout_amount) =>{


      // const params = await algodClient.getTransactionParams().do();            
      // let sender = localStorage.getItem("walletAddress");
      // // const encoded = algosdk.encodeUint64(val)

      // const txn0 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      //   from: sender,
      //   to: sender,
      //   amount: 0,
      //   assetIndex: parseInt(tokId2),
      //   suggestedParams: params,
      //   rekeyTo: undefined,
      //   revocationTarget: undefined
      //   });
      // // send swap in asset
      // const txn1 =algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      //   from: sender,
      //   to: appiddetails[3],
      //   amount: parseInt(samount1 * 1000000),
      //   assetIndex: parseInt(tokId1),
      //   suggestedParams: params,
      //   rekeyTo: undefined,
      //   revocationTarget: undefined
      //   });
      //  //console.log("fees",appiddetails[2],tokId2)
      //   let aparg =[];
      //   aparg.push(new Uint8Array(Buffer.from("sfe")));
      //   aparg.push(algosdk.encodeUint64(1000000 * swapFee))
      // // swap for exact
      // const params1 = await algodClient.getTransactionParams().do();
      // params1.flatFee = true;
      // params1.fee = 4000;
      // // params.fee = 2000
      // const txn2 = algosdk.makeApplicationNoOpTxnFromObject({
      //   from: sender,
      //   appIndex: appiddetails[2],
      //   appArgs: aparg,
      //   suggestedParams: params1,
      //   accounts: undefined,
      //   foreignApps: [appiddetails[1]],
      //   foreignAssets: [tokId2],
      //   rekeyTo: undefined
      // })
  
      // // redeem unused swap in asset
      // // params.fee = 2000
      // const txn3 = algosdk.makeApplicationNoOpTxnFromObject({
      //   from: sender,
      //   appIndex: appiddetails[2],
      //   appArgs: [new Uint8Array(Buffer.from("rsr"))],
      //   suggestedParams: params1,
      //   accounts: undefined,
      //   foreignApps: undefined,
      //   foreignAssets: [tokId1],
      //   rekeyTo: undefined
      // })
      // const groupID =  algosdk.computeGroupID([txn1,txn2,txn3])  ;
      // const txs =  [txn1,txn2,txn3]  ;
      // for (let i = 0; i <= 2; i++) txs[i].group = groupID;
      // const signedTx1 = await myAlgoWallet.signTransaction([txs[0].toByte(),txs[1].toByte(),txs[2].toByte()]);
          
      // const response =  await algodClient.sendRawTransaction([signedTx1[0].blob,signedTx1[1].blob,signedTx1[2].blob]).do();
      ////console.log("txid",response.txId)
      // await waitForConfirmation(algodClient, response.txId,"Swapping is Completed successfully");

      handleShowLoad();
        let s;
       !assetoptin2? s = 7000 : s = 8000
            if(balanceid1 >= ( s + mintotranser) ){
                let s = await zeroinput(samount1,samount2);
                if(s === 0){
                  await swap(appid);
                } 
                else{
                  handleHideLoad();
                }               
           }
           else{
            toast.error("Not having sufficient Algo")
            handleHideLoad();

           } 
       
    }
    const swap = async (appid) => {

       
            
  
        let  tokenid1 = tokId1;   
        let tokenid2 = tokId2;
          let index = parseInt(appid);
        
         let r1,r2;
         let t1 ,t2;
  
       
          let tt1;
            let tt2;
          if(tokenid1 > tokenid2){
            r1 = rs1value;
            r2 = rs2value;
            tt1 =tokenid1;
            tt2 = tokenid2;
  
            
        }
        else{
          r2 = rs1value;
          r1 = rs2value;
            tt1 =tokenid2;
            tt2 = tokenid1;
            // t1 = tokenid1;
            // t2 = tokenid2;
        }
     
           {
    
            const params = await algodClient.getTransactionParams().do();            
            let sender = localStorage.getItem("walletAddress");
            const swap1 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: sender,
            to: sender,
            amount: 0,
            assetIndex: parseInt(tokId2),
            suggestedParams: params,
            rekeyTo: undefined,
            revocationTarget: undefined
            });
let t1;
            if(tokId1 === 1){
               t1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                from: sender,
                to: appiddetails[3],
                // assetIndex:parseInt(tokId1), 
                note: undefined,
                amount: parseInt(samount1 * 1000000),
                suggestedParams: params,
                rekeyTo: undefined,
                revocationTarget:undefined
                
              })
            }
            else{
               t1 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                from: sender,
                to: appiddetails[3],
                assetIndex:parseInt(tokId1), 
                note: undefined,
                amount: parseInt(samount1 * 1000000),
                suggestedParams: params,
                rekeyTo: undefined,
                revocationTarget:undefined
                
              })
            }
            
            const val = 1000000 * swapFee;
            // console.log("swapees",val)
            // const val = 100;
  
            const encoded = algosdk.encodeUint64(val)
            
            const params1 = await algodClient.getTransactionParams().do();
            params1.flatFee = true;
            params1.fee = 3000;
            let appArgs1 =[]
            appArgs1.push(new Uint8Array(Buffer.from("swap")));
            appArgs1.push(encoded);
          const swap2 = algosdk.makeApplicationNoOpTxnFromObject({
            from: sender,
            appIndex: parseInt(appiddetails[2]),
            appArgs: appArgs1,
            suggestedParams: params1,
            accounts: undefined,
            // foreignApps: [parseInt(appiddetails[1])],
            foreignAssets: [parseInt(tokId2),parseInt(tokId1)],
            rekeyTo: undefined,
            // onComplete: OnApplicationComplete.NoOpOC,
          })
          const groupID = assetoptin2 ? algosdk.computeGroupID([t1,swap1,swap2]) : algosdk.computeGroupID([t1,swap2]) ;
          const txs = assetoptin2 ? [t1,swap1,swap2] : [t1,swap2] ;
          let k = assetoptin2 ? 2 : 1;
          for (let i = 0; i <= k; i++) txs[i].group = groupID;
          try{
          if(localStorage.getItem("walletName") === "myAlgoWallet"){
            const signedTx1 = !assetoptin2 ? await myAlgoWallet.signTransaction([txs[0].toByte(),txs[1].toByte()]): await myAlgoWallet.signTransaction([txs[0].toByte(),txs[1].toByte(),txs[2].toByte()]);
          
            const response = !assetoptin2 ? await algodClient.sendRawTransaction([signedTx1[0].blob,signedTx1[1].blob]).do():  await algodClient.sendRawTransaction([signedTx1[0].blob,signedTx1[1].blob,signedTx1[2].blob]).do();
                 ////console.log("TxID", JSON.stringify(response, null, 1));
      //   setTxId(response.txId);
      //   setShow(true);
      // toast.success(`Swapping Completed Successfully ${response.txId}`);    
      // toast.info("Swapping Completed"); 
      // let an = tokName1 +"/"+tokName2;
        //  await  getpostdatafilter(parseInt(tt1),parseInt(tt2),(r1+ r2),(r1+ r2 + rs3value),swap_fees)
        await waitForConfirmation(algodClient, response.txId,"Swapping completed successfully");
        await updatealgobalance();
        regainstate(tokId1,tokId2);
        await postdatastableswap(appiddetails[2],(globalStatevalue.balance1 +globalStatevalue.balance2),(globalStatevalue.balance1 + globalStatevalue.balance2 + globalStatevalue.issuedLP)
        ,params1.fee)
       
        // window.location.reload();
        // await regainstate(t1,t2);
       
            }
            else if(localStorage.getItem("walletName") === "PeraWallet"){
              const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
              const txns = !assetoptin2 ?  [txs[0],txs[1]] : [txs[0],txs[1],txs[2]];
              const txnsToSign = txns.map(txn => {
                const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
               //console.log(encodedTxn);
                return {
                  txn: encodedTxn,
              };
            });
              // const signedTx3 = algosdk.signLogicSigTransaction(txs[1], lsig);
              // const signedTx4 = algosdk.signLogicSigTransaction(txs[3], lsig);
              // const signedTx5 = algosdk.signLogicSigTransaction(txs[4], lsig);
              const requestParams = [ txnsToSign ];
              const request = formatJsonRpcRequest("algo_signTxn", requestParams);
              const result = await connector.sendCustomRequest(request);
              const decodedResult = result.map(element => {
                return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
              });
             //console.log(result);
              // decodedResult[1] = signedTx3.blob;
              // decodedResult[3] = signedTx4.blob;
              // decodedResult[4] = signedTx5.blob;
             let response = await algodClient.sendRawTransaction(decodedResult).do()
             let an = tokName1 +"/"+tokName2;
            //  await  getpostdatafilter(parseInt(tt1),parseInt(tt2),(r1+ r2),(r1+ r2 + rs3value),swap_fees)
            await waitForConfirmation(algodClient, response.txId,"Swapping completed successfully");
            await updatealgobalance();
            regainstate(tokId1,tokId2);
            await postdatastableswap(appiddetails[2],(globalStatevalue.balance1 +globalStatevalue.balance2),(globalStatevalue.balance1 + globalStatevalue.balance2 + globalStatevalue.issuedLP)
            ,params1.fee)
            // window.location.reload();
           
            
    }
  }catch (err) {
        
    //console.log(err)
     handleHideLoad();
    //console.log("err",err.toString())
     let ev = err.toString()
     let present = ev.indexOf("balance")
     let present1 = ev.indexOf("exceeds")
     let present2 = ev.indexOf("underflow")
     let present3 = ev.indexOf("negative")
     // let present4 = ev.indexOf("asset_holding")
     let present5 = ev.indexOf("Operation cancelled");
     let present6 = ev.indexOf("blocked")
     ////console.log("err",ev)
     if(present > 1){
       toast.error(`Your Algo balance is low. Please get more Algos from dispenser`);
     }
     else if(present1 > 1){
       toast.error(`No pair is there,Please Create a pair and try again`);
     }
     else if(present2 > 1){
       toast.error(`Your Asset balance is low`);
     }
     else if(present3 > 1){
       toast.error(`Please Add liquidity and try again`);
     }
     // else if(present4 > 1){
     //   toast.error(`No Pair for these assets,don't try to Swap these asset`);
     // }
     else if(present5 > 1){
       toast.error(`Operation Cancelled`);
     }
     else if(present6 > 1){
       toast.error(`Please allow the pop up window and try again`);
     }
     else{
       toast.error(err);
     }


         
       //console.error(err);
       }
            
        // await postusertx(localStorage.getItem("walletAddress"),response.txId,recv_escrow,"Swap",tvl,asset_in_amount,tk1,tk2,amount);
        // await createtxhash(recv_escrow,response.txId,"SWAP",asset_in_amount,an)
        // await updatepairhistory(tokenid1,tokenid2,amount,tvl,vl);
        
        // {
        //   setsamount1(0)
        //   setsamount2(0)
        // }
        // else{
        //   setdvalue(true)
        //   setsamount1(0)
        //   setsamount2(0)
        // }
        
    //    await sleep(8000);
       
    //     window.location.reload();
       
          
  
        
      } 
        
       

    }; 
        const changetokens =()=>{
            // setSwapv(!swapv)
            setsamount1("")
            setsamount2("")
            let a = tokId1;
            let b = tokId2;
            let aname1 = tokName1;
            let aname2 = tokName2;
            let logo11 = tokLogo1;
            let logo12 = tokLogo2;
            let balan1 = tokBalance1;
            let balan2 = tokBalance2;
            let de1 = decl1;
            let de2 = decl2;
            
            setTokId1(b);
            setTokId2(a);
            setTokName1(aname2);
            setTokName2(aname1);
            setTokLogo1(logo12)
            setTokLogo2(logo11);
            setTokBalance1(balan2)
            setTokBalance2(balan1)
            // let de1 = decl1;
            // let de2 = decl2;
            // setdeclaring1(de2);
            // setdeclaring2(de1)
            callval(globalStatevalue.AssetId1,globalStatevalue.balance1,globalStatevalue.balance2)
            
          
          }
          const callingmax1 =async()=>{
            
              await swap1(parseFloat(tokBalance1/1000000))
            
           
          }
          const callingmax2 =async()=>{
          
              await swap2(parseFloat(tokBalance2/1000000))
            
          
          }

          const liqValue1 = async(v1,check,whatIfDelta1= 0, whatIfDelta2= 0) =>{
            if(v1 === 0 || v1 === undefined || v1 === "" || v1 === null){
              setliq1("");
              setliq2("")
           }
           else{
             setliq1(v1)
            let asset1PooledAmount = 0
            let asset2PooledAmount = 0
            let lpsIssued = 0
            let numIter = 0
            let assetAmount = v1 * 1000000;
            if (tokId1 === globalStatevalue.AssetId1) {
              asset1PooledAmount = assetAmount
              asset2PooledAmount = Math.floor(
                (asset1PooledAmount * (globalStatevalue.balance2 + whatIfDelta2)) / (globalStatevalue.balance1 + whatIfDelta1)
              )
              assetAmount ? setliq2(truncate(asset2PooledAmount/1000000)) : setliq2("")
             //console.log("asset2PooledAmount",asset2PooledAmount)
            } else {
              asset2PooledAmount = assetAmount
              asset1PooledAmount = Math.ceil(
                (asset2PooledAmount * (globalStatevalue.balance1 + whatIfDelta1)) / (globalStatevalue.balance2 + whatIfDelta2)
              )
              assetAmount ?  setliq2(truncate(asset1PooledAmount/1000000)) : setliq2("")
            }
            
           
              let [D0, numIterD0] = getD([globalStatevalue.balance1, globalStatevalue.balance2],50000000)
              let [D1, numIterD1] = getD([asset1PooledAmount + globalStatevalue.balance1, asset2PooledAmount + globalStatevalue.balance2], 50000000)
              lpsIssued = Math.floor(globalStatevalue.issuedLP * Number((D1 - D0) / D0))
             
              numIter = numIterD0 + numIterD1
             //console.log("lpsIssued",lpsIssued)  
              checkwallet(assetAmount,asset1PooledAmount) 
              setshowdetails(true) 
           }
           
            
          }
          
          const liqValue2 = async(v1,check,whatIfDelta1= 0, whatIfDelta2= 0)=>{
            
            if(v1 === 0 || v1 === undefined || v1 === "" || v1 === null){
              setliq1("");
              setliq2("")
           }
           else{
           
              setliq2(v1);
              
            let asset1PooledAmount = 0
            let asset2PooledAmount = 0
            let lpsIssued = 0
            let numIter = 0
            let assetAmount = v1 * 1000000;
            if (tokId2 === globalStatevalue.AssetId1) {
              asset1PooledAmount = assetAmount
              asset2PooledAmount = Math.floor(
                (asset1PooledAmount * (globalStatevalue.balance2 + whatIfDelta2)) / (globalStatevalue.balance1 + whatIfDelta1)
              )
              setliq1(truncate(asset2PooledAmount/1000000))
             //console.log("asset2PooledAmount",asset2PooledAmount)
            } else {
              asset2PooledAmount = assetAmount
              asset1PooledAmount = Math.ceil(
                (asset2PooledAmount * (globalStatevalue.balance1 + whatIfDelta1)) / (globalStatevalue.balance2 + whatIfDelta2)
              )
              setliq1(truncate(asset1PooledAmount/1000000))
            }
            
           
              let [D0, numIterD0] = getD([globalStatevalue.balance1, globalStatevalue.balance2],50000000)
              let [D1, numIterD1] = getD([asset1PooledAmount + globalStatevalue.balance1, asset2PooledAmount + globalStatevalue.balance2], 50000000)
              lpsIssued = Math.floor(globalStatevalue.issuedLP * Number((D1 - D0) / D0))
              // setliq1(lpsIssued/1000000)
              numIter = numIterD0 + numIterD1
             //console.log("lpsIssued",lpsIssued) 
              checkwallet(asset1PooledAmount,assetAmount) 
              setshowdetails(true) 
               
            }
           
            
          }
         
          const callingmaxliq1 =async()=>{
            if(tokName1 === "ALGO"){
              let mn = minbalance - 6000;
              if(Math.sign(mn) === -1){
                await liqValue1(0,0)
               //console.log("enter")
              }
              else{
               //console.log("enter",mn/1000000)
                await liqValue1(mn/1000000,1)
              }}
          
            else{
              await liqValue1(tokBalance1/1000000,1)
            }
           
          }
          const callingmaxliq2 =async()=>{
            if(tokName2 === "ALGO"){
              let mn = minbalance - 6000;
              if(Math.sign(mn) === -1){
                await liqValue2(0,0)
              }
              else{
              await liqValue2(mn/1000000,1)
              }
            }
            else{
              await liqValue2(tokBalance2/1000000,1)
            }
           
          }

    const liqassetOptin = async()=>{
      handleShowLoad()
      let s ;
      !optinlp ? s = 7000 : s = 11000;
      if(balanceid1 >= ( s + mintotranser)){
          let k = await zeroinput(liq1,liq2);
          if(k === 0 ){
            mint21call()
          }
          else{
            handleHideLoad();
          }
       
      }
      else{
        toast.error("You don't have sufficient Algo to do the transaction");
        handleHideLoad();
      }
    }    
    const mint21call = async () => {
      {
  
        const params = await algodClient.getTransactionParams().do();
        
        let sender = localStorage.getItem("walletAddress");
        const enc = new TextEncoder();
        let tk1,tk2,l1,l2;
        if(tokId1 < tokId2){
          tk1 = tokId1;
          tk2 = tokId2;
          l1 = liq1;
          l2 = liq2;
        }
        else{
          tk2 = tokId1;
          tk1 = tokId2;
          l2 = liq1;
          l1 = liq2;
        }
         const t1 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
          from: sender,
          to: sender,
          amount: 0,
          assetIndex: parseInt(appiddetails[0]),
          suggestedParams: params,
          rekeyTo: undefined,
          revocationTarget: undefined
        });
        let t2;
        if(tk1 === 1){
           t2 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: sender,
            to: appiddetails[3],
            amount: parseInt(l1 * 1000000),
            // assetIndex: parseInt(tk1),
            suggestedParams: params,
            rekeyTo: undefined,
            revocationTarget: undefined
            });
        }
        else{
           t2 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: sender,
            to: appiddetails[3],
            amount: parseInt(l1 * 1000000),
            assetIndex: parseInt(tk1),
            suggestedParams: params,
            rekeyTo: undefined,
            revocationTarget: undefined
            });
        }
        const t3 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: sender,
        to: appiddetails[3],
        amount: parseInt(l2 * 1000000),
        assetIndex: parseInt(tk2),
        suggestedParams: params,
        rekeyTo: undefined,
        revocationTarget: undefined
        });
        
        const params1 = await algodClient.getTransactionParams().do();
        params1.flatFee = true;
        params1.fee =  !optinlp ?4000 : 6000;
       console.log("fees",params1.fee)
        const txn3 = algosdk.makeApplicationNoOpTxnFromObject({
            from: sender,
            appIndex: parseInt(appiddetails[2]),
            appArgs: [enc.encode("LP"), encodeUint64(100)],
            suggestedParams: params1,
            accounts: undefined,
            // foreignApps: [parseInt(appiddetails[1])],
            foreignAssets: [parseInt(appiddetails[0])],
            rekeyTo: undefined
        });
       
        // redeem asset1 residual
        // params.fee = 1000;
        const txn4 = algosdk.makeApplicationNoOpTxnFromObject({
            from: sender,
            appIndex: parseInt(appiddetails[2]),
            appArgs: [enc.encode("asset1Residual")],
            suggestedParams: params,
            accounts: undefined,
            foreignApps: undefined,
            foreignAssets: [parseInt(tk1)],
            rekeyTo: undefined
        });
        // redeem asset2 residual
       
        // params.fee = 1000;
        const txn5 = algosdk.makeApplicationNoOpTxnFromObject({
            from: sender,
            appIndex: parseInt(appiddetails[2]),
            appArgs: [enc.encode("asset2Residual")],
            suggestedParams: params,
            accounts: undefined,
            foreignApps: undefined,
            foreignAssets: [parseInt(tk2)],
            rekeyTo: undefined
        });
  
        const groupID = !optinlp ? algosdk.computeGroupID([t2,t3,txn3,txn4,txn5]) : algosdk.computeGroupID([t1,t2,t3,txn3,txn4,txn5]) 
        const txs = !optinlp ? [t2,t3,txn3,txn4,txn5] : [t1,t2,t3,txn3,txn4,txn5] ;
        let k = !optinlp ? 4 : 5
        for (let i = 0; i <= k; i++) txs[i].group = groupID;
        try{
        if(localStorage.getItem("walletName") === "myAlgoWallet"){
        const signedTx1 = !optinlp? await myAlgoWallet.signTransaction([txs[0].toByte(),txs[1].toByte(),txs[2].toByte(),txs[3].toByte(),txs[4].toByte()]) :
        await myAlgoWallet.signTransaction([txs[0].toByte(),txs[1].toByte(),txs[2].toByte(),txs[3].toByte(),txs[4].toByte(),txs[5].toByte()]);     
        const response = !optinlp ? await algodClient.sendRawTransaction([signedTx1[0].blob,signedTx1[1].blob,signedTx1[2].blob,signedTx1[3].blob,signedTx1[4].blob]).do() :
        await algodClient.sendRawTransaction([signedTx1[0].blob,signedTx1[1].blob,signedTx1[2].blob,signedTx1[3].blob,signedTx1[4].blob,signedTx1[5].blob]).do();
        console.log("TxID", response.txId);
        await waitForConfirmation(algodClient, response.txId,"Liquidity is added successfully");
        await updatealgobalance();
        regainstate(tk1,tk2);
        await postdatastableswap(appiddetails[2],(globalStatevalue.balance1 +globalStatevalue.balance2),(globalStatevalue.balance1 + globalStatevalue.balance2 + globalStatevalue.issuedLP)
        ,params1.fee)

        let gv = await getvaluesfromnode(node['algodclient']);
        //console.log("gv",gv)
         setaddliqvalues(gv);
        
        }
        else if(localStorage.getItem("walletName") === "PeraWallet"){
          const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
          const txns = !optinlp ? [txs[0], txs[1], txs[2], txs[3], txs[4]] : [txs[0], txs[1], txs[2], txs[3], txs[4],txs[5]];
          const txnsToSign = txns.map(txn => {
            const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
           //console.log(encodedTxn);
            return {
              txn: encodedTxn,
          };
        });
    
        const requestParams = [ txnsToSign ];
        const request = formatJsonRpcRequest("algo_signTxn", requestParams);
        const result = await connector.sendCustomRequest(request);
        const decodedResult = result.map(element => {
          return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
        });
          // send and await
    
          let response = await algodClient.sendRawTransaction(decodedResult).do();
          await waitForConfirmation(algodClient, response.txId,"Liquidity is added successfully");
          await updatealgobalance();
          regainstate(tokId1,tokId2);
          await postdatastableswap(appiddetails[2],(globalStatevalue.balance1 +globalStatevalue.balance2),(globalStatevalue.balance1 + globalStatevalue.balance2 + globalStatevalue.issuedLP)
          ,params1.fee)
          
          let gv = await getvaluesfromnode(node['algodclient']);
          //console.log("gv",gv)
           setaddliqvalues(gv);
    
       // localStorage.setItem("Staked","stakedbalance");
       
  
  
        }
      } catch(err){
        toast.error(`err`);
        handleHideLoad();
      }
      }
     
    
   
     };  
      const percent = async(entered_percent) =>{
        
        let liquidity_asset_in = (lpbalance * entered_percent) / 100;
        setliquidityamount(liquidity_asset_in);
        // //console.log("v",removeLi) 
        let asset1Amount = Math.floor((liquidity_asset_in * globalStatevalue.balance1) / globalStatevalue.issuedLP)
        let asset2Amount = Math.floor((liquidity_asset_in * globalStatevalue.balance2) / globalStatevalue.issuedLP)
        //  let asset1_amount = (liquidity_asset_in * rs1value) / rs3value ;
        // // //console.log(asset1_amount)
        //  let asset2_amount = (liquidity_asset_in * rs2value) / rs3value ;
        //  let asset1_amount_out = asset1_amount - (asset1_amount * 0.5)
        
        //  let asset2_amount_out = asset2_amount - (asset2_amount * 0.5)
         
         if(tokId1 < tokId2){
            setamount1Out(asset1Amount)
            setamount2Out(asset2Amount)
         }
         else{
            setamount2Out(asset1Amount)
            setamount1Out(asset2Amount)  
         }
      
        //console.log("asset1_amount_out",asset1Amount)
         
        //console.log("asset2_amount_out",asset2Amount)
      
      }
      const checkremoveLiquidity = async()=>{
        handleShowLoad()
          if(balanceid1 > (mintotranser + 4000)){
            let k = await zeroinput(amount1Out,amount2Out);
            if(k === 0){
              await removeliquidity()
            }
            else{
              handleHideLoad();
            }
            
          }
          else{
            toast.error("Not having sufficient Algo ")
            handleHideLoad()
            
          }
      }
      const removeliquidity = async () => {
        try{
          const params = await algodClient.getTransactionParams().do();
          let[asid1,asid2] = greaterAsset(tokId1,tokId2)
          let sender = localStorage.getItem("walletAddress");
          const enc = new TextEncoder();
          const t1 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: sender,
            to: appiddetails[3],
            amount:parseInt(liquidityamount) ,
            assetIndex: parseInt(appiddetails[0]),
            suggestedParams: params,
            rekeyTo: undefined,
            revocationTarget: undefined
          });
          const params1 = await algodClient.getTransactionParams().do();
          params1.flatFee = true;
          params1.fee = 2000;
          const txn2 = algosdk.makeApplicationNoOpTxnFromObject({
            from: sender,
            appIndex: parseInt(appiddetails[2]),
            appArgs: [enc.encode("RemoveAs1")],
            suggestedParams: params1,
            accounts: undefined,
            foreignApps: undefined,
            foreignAssets: [parseInt(asid1)],
            rekeyTo: undefined
        });
      
        const txn3 = algosdk.makeApplicationNoOpTxnFromObject({
            from: sender,
            appIndex: parseInt(appiddetails[2]),
            appArgs: [enc.encode("RemoveAs2")],
            suggestedParams: params1,
            accounts: undefined,
            foreignApps: undefined,
            foreignAssets: [parseInt(asid2)],
            rekeyTo: undefined
        });
        const groupID = algosdk.computeGroupID([t1,txn2,txn3])
        const txs = [t1,txn2,txn3];
        for (let i = 0; i <= 2; i++) txs[i].group = groupID;
        if(localStorage.getItem("walletName") === "myAlgoWallet"){
        const signedTx1 = await myAlgoWallet.signTransaction([txs[0].toByte(),txs[1].toByte(),txs[2].toByte()]);     
        const response = await algodClient.sendRawTransaction([signedTx1[0].blob,signedTx1[1].blob,signedTx1[2].blob]).do();
       //console.log("TxID", response.txId);
        await waitForConfirmation(algodClient, response.txId,"Liquidity is removed successfully");
        await updatealgobalance();
        regainstate(tokId1,tokId2)
        await postdatastableswap(appiddetails[2],(globalStatevalue.balance1 +globalStatevalue.balance2),(globalStatevalue.balance1 + globalStatevalue.balance2 + globalStatevalue.issuedLP)
        ,params1.fee)
        
      }
      else if(localStorage.getItem("walletName") === "PeraWallet"){
        const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
        const txns = [txs[0], txs[1],txs[2]]
        const txnsToSign = txns.map(txn => {
          const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
         //console.log(encodedTxn);
          return {
            txn: encodedTxn,
        };
      });
  
      const requestParams = [ txnsToSign ];
      const request = formatJsonRpcRequest("algo_signTxn", requestParams);
      const result = await connector.sendCustomRequest(request);
      const decodedResult = result.map(element => {
        return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
      });
        // send and await
  
        let response = await algodClient.sendRawTransaction(decodedResult).do();
        await waitForConfirmation(algodClient, response.txId,"Liquidity is removed successfully");
        await updatealgobalance();
        regainstate(tokId1,tokId2)
        await postdatastableswap(appiddetails[2],(globalStatevalue.balance1 + globalStatevalue.balance2),(globalStatevalue.balance1 + globalStatevalue.balance2 + globalStatevalue.issuedLP)
        ,params1.fee)
    
  
     // localStorage.setItem("Staked","stakedbalance");
     
  
  
      }
        }
        catch(err){
          toast.error(err);
          handleHideLoad();
        }
       
    };
      
      function valuestfunction(a){
        call(a);
    }
    const checklogo = (name,id)=>{
      if(name === "ALGO" && id === 0){
          return algologo;
      }
      else if(name === "USDC" && id === 78045387){
          return usdclogo;
      }
      else if(name === "ELEM"  && id === 78044331){
          return elemlogo;
      }
      else if(name === "TAU"  && id === 78043454){
          return taulogo;
      }
      else if(name === "EINR"  && id === 78044898){
          return einrlogo;
      }
  } 
  const searchassets = async(v)=>{
    let ln = await axios.get(`${node['indexerclient']}/v2/assets?name=${v}&limit=10`);
    let asn=[];
    ln.data.assets.map((r,i)=>{
      let nm = r['params']['unit-name'].toUpperCase();
      let unname = checklogo(nm,r['index'])
      let k ={
        "assetname" : r['params']['name'],
        "assetunitname":r['params']['unit-name'],
        "assetindex":r['index'],
        "aslogo":unname
      }
      asn.push(k);
    })
   setAssetdetails(asn)

  }
    const call =async(v)=>{
  if(v === 0 || v === undefined || v === ""){
    sets(false)
    sets1(false)
  }
      //console.log("working",typeof parseInt(value))
      if(!isNaN(v)){
          let ln = await axios.get(`${node['algodclient']}/v2/assets/${v}`);

          ////console.log("unitanem",unitname,name,id,ln.data['params']['unit-name'])
          let asnamw =(ln.data['params']['unit-name']).toUpperCase();
         //console.log("upercase",asnamw)
          setsName1(ln.data['params']['name'])
          setSid1(v)
          setSunitname1(ln.data['params']['unit-name'])
          setSlogo(checklogo(asnamw,v))
          let [b,s] = await walletBalance(v);
          ////console.log("bvalue",b)
          setassetBalance(b);
          
          // setassetsname(asnamw);
     
          sets1(true)
          sets(false)
          //console.log("assets",assets)
      }
      else{
        //console.log("string")
          let assetInfo = await indexerClient.searchForAssets().name(v).limit(10).do();
          await searchassets(v)

          let [b,s] = await walletBalance(v);
          setassetBalance(b);
          sets(true)
          sets1(false)
          // setseem(assetInfo.assets)
      }

    
      
     
  }
  const manage =async(r)=>{
    await regainstate(r[2],r[3])
    showliquidity(false);
    
  }
  
    return (
        <Layout>
   <><ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/></>
{showliq ? (<>
  <Container>
                <Row className='justify-content-center'>
                    <Col md={10} lg={7} className="mb-4">
                        <Link className='mb-3 text-text-FF d-flex align-items-center btn-link'>
                          <Button onClick={()=>showliquidity(false)}>Go Back</Button>
                            
                        </Link>

                        {/* <Link to={{
                  pathname: 'swap'}}   onClick={()=>localStorage.setItem("liqvalue","liquidity")}>
                 
                            <svg xmlns="http://www.w3.org/2000/svg" className='me-2' width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                            Go Back2
                        </Link> */}

                        <h4>My Liquidity Positions</h4>

                      

                        {/* { 
                            showAlert? 
                            <Alert variant="grad" className='mb-4' onClose={() => setShowAlert(false)} dismissible>
                                <h4 className='mb-3'>Liquidity Provider Rewards</h4>
                                <p>Liquidity providers earn a 0.15% fee on all trades proportional to their share of the pool. Fees are added to the pool, accrue in real time and can be claimed by withdrawing your liquidity.</p>
                            </Alert>
                            : null
                        } */}

 <Accordion className='accordion-list'>
 {localStorage.getItem("walletAddress") ?
                        (<>
                         {addliqvalues.length > 0 ? 
                            (<>{addliqvalues.map((r,i)=>{
                             //console.log("balance",r)
                                return(<>{
                                  (r[0]/1000000) > 0.001 ? 

                                  (<>
                          <Accordion.Item className='mb-24'>
                            <Accordion.Header>
                              <div className="acc-title me-2 d-flex align-items-center">
                                {/* <img src={USDC} alt="logo" /> */}
                                <span className='ms-3'>{r[1]}</span>
                              </div>

                              <div className="ms-sm-auto justify-content-between flex-grow-1 d-flex align-items-center">
                                <div>
                                  <h6 className='sub-heading text-xs mb-0'>
                                      Your pool share
                                  </h6>
                                  <h5 className='mb-0 d-flex align-items-center'>
                                  {truncate(r[0]/1000000)}
                                      <OverlayTrigger
                                          key="left"
                                          placement="left"
                                          overlay={
                                              <Tooltip id={`tooltip-left`}>
                                                 Your LP asset balance
                                              </Tooltip>
                                          }
                                          >
                                              <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                          </OverlayTrigger>
                                  </h5>
                                </div>
                                <div className='ms-3'>
                                  <Button variant='primary'onClick={()=>manage(r)} >Manage</Button>
                                </div>
                              </div>
                            </Accordion.Header>
                          </Accordion.Item>
                          </>):
                                  (<></>)
                                }
                               
                                </>)
                            })}
                          
                            </>):
                            (<><center><h4>No Liquidity</h4></center></>)}
                        </>):
                        (<>
                        <Button className='btn btn-blue w-100' onClick={()=>conectWallet()}>
<svg width="20" height="20" className='me-2 ms-0' viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"><path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z"></path></svg>
Connect wallet
</Button>
                        </>)}
                        </Accordion>
                     
                    </Col>
                </Row>
            </Container>
</>):
(<>
 <Container>
                <Row className='justify-content-center'>
                    <Col md={10} lg={7} className="mb-4">
                        {key ? 
                            <>
                                <Link className='mb-3 text-white d-flex align-items-center btn-link'>
                                  <Button onClick={()=>showliquidity(true)}> View Liquidity Positions</Button>
                                   
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                                </Link>
                            </>

                            : null
                        }

                        {key && key !== "remove" ? 
                            showAlert? 
                            <Alert variant="grad" className='mb-4' onClose={() => setShowAlert(false)} dismissible>
                                <p><strong>Tip:</strong> By adding liquidity you'll earn 0.15% of all trades for this pair proportional to your share of the pool. Fees are added to the pool, accrue in real time and can be claimed by withdrawing your liquidity.</p>
                            </Alert>
                            : null

                            : null
                        }

                        <Card className='card-dash d-block border-0 mb-4'>
                            
                            <div className="d-flex align-items-center float-end mt-1 acc-h-links">
                            <Dropdown>
                                <Dropdown.Toggle variant="reset" className='noarrow p-0' id="dropdown-basic">
                                    <svg class="blue-dark-theme-white-10" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10.4903 2C10.0113 2 9.60183 2.33859 9.50983 2.80859L9.17585 4.52344C8.35509 4.8338 7.59617 5.2674 6.92975 5.81445L5.28522 5.24805C4.83222 5.09205 4.33382 5.27936 4.09382 5.69336L2.586 8.30664C2.347 8.72164 2.43399 9.2485 2.79499 9.5625L4.11335 10.709C4.04478 11.1303 4.00007 11.5593 4.00007 12C4.00007 12.4407 4.04478 12.8697 4.11335 13.291L2.79499 14.4375C2.43399 14.7515 2.347 15.2784 2.586 15.6934L4.09382 18.3066C4.33282 18.7216 4.83222 18.9089 5.28522 18.7539L6.92975 18.1875C7.59595 18.7342 8.35546 19.1663 9.17585 19.4766L9.50983 21.1914C9.60183 21.6614 10.0113 22 10.4903 22H13.5098C13.9888 22 14.3983 21.6614 14.4903 21.1914L14.8243 19.4766C15.645 19.1662 16.404 18.7326 17.0704 18.1855L18.7149 18.752C19.1679 18.908 19.6663 18.7216 19.9063 18.3066L21.4141 15.6914C21.6531 15.2764 21.5661 14.7515 21.2051 14.4375L19.8868 13.291C19.9553 12.8697 20.0001 12.4407 20.0001 12C20.0001 11.5593 19.9553 11.1303 19.8868 10.709L21.2051 9.5625C21.5661 9.2485 21.6531 8.72164 21.4141 8.30664L19.9063 5.69336C19.6673 5.27836 19.1679 5.09109 18.7149 5.24609L17.0704 5.8125C16.4042 5.26579 15.6447 4.83366 14.8243 4.52344L14.4903 2.80859C14.3983 2.33859 13.9888 2 13.5098 2H10.4903ZM12.0001 8C14.2091 8 16.0001 9.791 16.0001 12C16.0001 14.209 14.2091 16 12.0001 16C9.79107 16 8.00007 14.209 8.00007 12C8.00007 9.791 9.79107 8 12.0001 8Z"></path></svg>
                                </Dropdown.Toggle>

                                <Dropdown.Menu align="end" className='dropdown-menu-lg'>
                                    <h5 className='font-semibold'>Transaction Settings</h5>

                                    <h6 className='font-normal d-flex'>
                                        Slippage tolerance
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                   During transaction some amount is deducted,This fees should be less than or equal to 0.0005.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h6>
                                    
                                    <Row className='flex-nowrap mb-3 gx-2'>
                                        <Col>
                                            <InputGroup className='input-group-max'>
                                                <Form.Control
                                                    placeholder="0.0001"
                                                    aria-label="Recipient's username"
                                                    aria-describedby="basic-addon2"
                                                    value ={swapFee}
                                                    onChange={event => settingfee((event.target.value))}
                                                />
                                                <InputGroup.Text className='p-0 border-0' id="basic-addon2">%</InputGroup.Text>
                                            </InputGroup>
                                        </Col>
                                        <Col xs="auto">
                                            <Button variant='blue' onClick={()=>settingfee(0.0001)}>Auto</Button>
                                        </Col>
                                    </Row>
{/* 
                                    <h6 className='font-normal d-flex'>
                                        Transaction deadline
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
                                    </h6>
                                    <InputGroup className='input-group-max mb-4'>
                                        <Form.Control
                                            placeholder="30"
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                        />
                                        <InputGroup.Text className='p-0 border-0' id="basic-addon2">minutes</InputGroup.Text>
                                    </InputGroup>

                                    <h5 className='font-semibold mb-3'>Interface Settings</h5>

                                    <div className="d-flex mb-2 align-items-center justify-content-between">
                                        <h6 className='font-normal mb-0 d-flex'>
                                            Toggle Expert Mode
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
                                        </h6>
                                        <Form.Check 
                                            type="switch"
                                            className='p-0'
                                            defaultChecked={false}
                                            id="custom-switch-3"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="d-flex mb-2 align-items-center justify-content-between">
                                        <h6 className='font-normal mb-0 d-flex'>
                                            Disable Multihops
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
                                        </h6>
                                        <Form.Check 
                                            type="switch"
                                            className='p-0'
                                            id="custom-switch-2"
                                        />
                                    </div> */}

                                </Dropdown.Menu>
                            </Dropdown>
                            </div>
                            <Tabs defaultActiveKey="swap" onSelect={(k) => setKey(k === 'liquidity' ? 'add' : '')} className='dashboard-tabs' id="tab-example-1">
                                <Tab eventKey="swap" title="Stableswap">
                                    <div className="mb-4">
                                        <div className="group-row">
                                            <Row>
                                                <Col sm={5} className="mb-sm-0 mb-3">
                                                    <Button variant='link' onClick={handleShow} className='btn-currency p-0'>
                                                    {tokLogo1 ? (<><img src={ tokLogo1 }  /></>):(<><img src={ selecttoken }  /></>)}

                                                        <div className="ms-3 text-start">
                                                            <h6 className='sub-heading text-xs mb-0'>Swap From:</h6>
                                                            <h5 className='mb-0 font-semibold'>
                                                                {tokName1}
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16" class="ml-2 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                                            </h5>
                                                        </div>
                                                    </Button>
                                                </Col>
                                                <Col sm={7}>
                                                    <div className="input-group-max d-flex align-items-center text-nowrap px-3 input-group-max-lg w-100">
                                                        <input type="number" placeholder='0.00' className='form-control'value={ samount1 } onChange={event => swap1((event.target.value))}  />
 <span className='text-xs' style={{opacity: '0.5'}}>Balance <strong>{tokBalance1 ? truncate(tokBalance1/1000000) : '0.00'} {tokName1}</strong></span>
                     &nbsp;<Button variant="outline-purple" className='btn-xs-d' style={{height: '20px'}}  onClick={()=>callingmax1()}>Max</Button>                
                                  

                                                     </div>

                                                    <div className="text-end">
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="py-2 px-sm-4 px-2">
                                        <Button variant='blue' className='rounded-circle py-3' onClick={()=>changetokens()}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi m-0 bi-arrow-down-up" viewBox="0 0 16 16" >
                                            <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
                                            </svg></Button>                                        </div>
                                        <div className="group-row">
                                            <Row>
                                                <Col sm={5} className="mb-sm-0 mb-3">
                                                    <Button variant='link' onClick={handleShow1} className='btn-currency p-0'>
                                                    {tokLogo2 ? (<><img src={ tokLogo2 }  /></>):(<><img src={ selecttoken }  /></>)}
                                                        <div className="ms-3 text-start">
                                                            <h6 className='sub-heading text-xs mb-0'>Swap To (est.):</h6>
                                                            <h5 className='mb-0 font-semibold'>
                                                                {tokName2 ? tokName2 : <Badge bg="purple">Select Token</Badge>}
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16" class="ml-2 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                                            </h5>
                                                        </div>
                                                    </Button>
                                                </Col>
                                                <Col sm={7}>
                                                    <div className="input-group-max d-flex align-items-center text-nowrap px-3 input-group-max-lg w-100">
                                                        <input type="number" placeholder='0.00' className='form-control' value={((samount2))} onChange={event => swap2((event.target.value))} />
                                                       { tokName2 === "ALGO" ?
                                                       (<> <span className='text-xs' style={{opacity: '0.5'}}>Balance <strong>{truncate(balanceid1/1000000)} {tokName2}</strong></span>
                                                      &nbsp;<Button variant="outline-purple" className='btn-xs-d' style={{height: '20px'}}  onClick={()=>callingmax2()}>Max</Button> </>):
                                                       tokName2 ?  (<> <span className='text-xs' style={{opacity: '0.5'}}>Balance <strong>{ tokBalance2 ? truncate(tokBalance2/1000000) : '0.00'} {tokName2}</strong></span>
                                                       &nbsp;<Button variant="outline-purple" className='btn-xs-d' style={{height: '20px'}}  onClick={()=>callingmax2()}>Max</Button></>)

                                               :(<></>)}
                                                    
                                                    </div>
                                                    <div className="text-end">
                                                        {/* <Button variant="outline-purple" className='btn-xs-d' style={{height: '20px'}}  onClick={()=>callingmax2()}>Max</Button> */}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        
                                        
                                        {showdetails ? 
                                        (<>
                                        <br/>
                                           <label className='d-flex align-items-center justify-content-between'>
                                            
                                            <h6>Price</h6>                          <h6> 1 {tokName1} = { decl1  ? truncate(decl1)  : "0"} {tokName2}  </h6>  

                                       </label>
                                       <br></br>
                                       <label className='d-flex align-items-center justify-content-between'>                                            
                                            <h6>Minimum Received</h6><h6> {truncate(AssWithFee/1000000)} {tokName2}  </h6>  
                                        </label>
                                        <br></br>
                                       {/* <label className='d-flex align-items-center justify-content-between'>                                            
                                            <h6>Swap Rewards</h6><h6>{swf > 0 ? parseFloat(swf).toFixed(3) : "0" } ELEM</h6>  
                                        </label> */}
                                        </>):
                                        (<></>)}
                                        <br/>
                                     
                                    </div>
{localStorage.getItem("walletAddress") ?
 (<>{nolPair ?
  (<>
<Button className='btn btn-blue w-100'>
{/* <svg width="20" height="20" className='me-2 ms-0' viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"><path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z"></path></svg> */}
No Pair
</Button>
  </>):
  (<>
  
 {enoughbalance ? (<>
    <Button className='btn btn-blue w-100' >
{/* <svg width="20" height="20" className='me-2 ms-0' viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"><path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z"></path></svg> */}
You don't have sufficient balance to swap
</Button>
 </>):
 (<>{tokName2 ? (<>
 {insuuficient ? (<>
  <ButtonLoad  className='btn btn-blue w-100' >
Insufficient Liquidity
</ButtonLoad>
 </>):
 (<>
  <ButtonLoad loading={loader} className='btn btn-blue w-100' onClick={()=>swapcheck(appID_global,(samount1 * 1000000),(samount2*1000000))}>
Swap
</ButtonLoad>
</>)}

</>):(<>
  <ButtonLoad  className='btn btn-blue w-100' >
Select Asset
</ButtonLoad>
</>)}
  
 </>)}
 
  </>)}



 </>):
(<>
<Button className='btn btn-blue w-100' onClick={()=>conectWallet()}>
<svg width="20" height="20" className='me-2 ms-0' viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"><path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z"></path></svg>
Connect wallet
</Button>
</>)}
                                   
                                </Tab>
                                <Tab eventKey="liquidity" title="Liquidity">
                                    
                                    <Tabs
                                        id="controlled-tab-example"
                                        activeKey={key}
                                        className='dashboard-tabs'
                                        onSelect={(k) => setKey(k)}
                                    >
                                        <Tab eventKey="add" title="Add">
                                        <div className="mb-4">
                                        <div className="group-row">
                                            <Row>
                                                <Col sm={5} className="mb-sm-0 mb-3">
                                                    <Button variant='link' onClick={handleShow} className='btn-currency p-0'>
                                                        <img src= { tokLogo1 } alt="algo" />
                                                        <div className="ms-3 text-start">
                                                            {/* <h6 className='sub-heading text-xs mb-0'>Input1:</h6> */}
                                                            <h5 className='mb-0 font-semibold'>
                                                                {tokName1}
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16" class="ml-2 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                                            </h5>
                                                        </div>
                                                    </Button>
                                                </Col>
                                                <Col sm={7}>
                                                    <div className="input-group-max d-flex align-items-center text-nowrap px-3 input-group-max-lg w-100">
                                                        <input type="number" placeholder='0.00' className='form-control' value = {liq1}  onChange={(e) => liqValue1((e.target.value),0)}  />
{tokName1 === "ALGO" ?(<> <span className='text-xs' style={{opacity: '0.5'}}>Balance <strong>{truncate(balanceid1/1000000)} {tokName1}</strong></span>
&nbsp;     <Button variant="outline-purple" className='btn-xs-d' style={{height: '20px'}}  onClick={()=>callingmaxliq1()}>Max</Button></>):
									   (<> <span className='text-xs' style={{opacity: '0.5'}}>Balance <strong>{truncate(tokBalance1/1000000)} {tokName1} </strong></span>
                      &nbsp;     <Button variant="outline-purple" className='btn-xs-d' style={{height: '20px'}}  onClick={()=>callingmaxliq1()}>Max</Button></>)  }     
                                                   

                                                                  </div>
                                                    <div className="text-end">
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="py-2 px-sm-4 px-2">
                                        <Button variant='blue' className='rounded-circle py-3'><svg width="20" class="ms-0" height="20" className='ms-0' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 12C19 12.5523 18.5523 13 18 13H13V18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18V13H6C5.44772 13 5 12.5523 5 12C5 11.4477 5.44772 11 6 11H11V6C11 5.44772 11.4477 5 12 5C12.5523 5 13 5.44772 13 6V11H18C18.5523 11 19 11.4477 19 12Z" fill="#ffffff"></path></svg></Button>
                                     </div>
                                        <div className="group-row">
                                            <Row>
                                                <Col sm={5} className="mb-sm-0 mb-3">
                                                    <Button variant='link' onClick={handleShow1} className='btn-currency p-0'>
                                                    {tokLogo2 ? (<><img src={ tokLogo2 }  /></>):(<><img src={ selecttoken }  /></>)}
                                                        <div className="ms-3 text-start">
                                                            {/* <h6 className='sub-heading text-xs mb-0'>Input2:</h6> */}
                                                            <h5 className='mb-0 font-semibold'>
                                                                {tokName2 ? tokName2 : <Badge bg="purple">Select Token</Badge>}
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16" class="ml-2 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                                            </h5>
                                                        </div>
                                                    </Button>
                                                </Col>
                                                <Col sm={7}>
                                                    <div className="input-group-max d-flex align-items-center text-nowrap px-3 input-group-max-lg w-100">
                                                        <input type="number" placeholder='0.00' className='form-control' value = {liq2}  onChange={(e) => liqValue2((e.target.value),0)} />
                                                       { tokName2 === "ALGO" ?
                                                       (<> <span className='text-xs' style={{opacity: '0.5'}}>Balance <strong>{truncate(balanceid1/1000000)} {tokName2}</strong></span>
                                                        &nbsp; <Button variant="outline-purple" className='btn-xs-d' style={{height: '20px'}}  onClick={()=>callingmaxliq2()}>Max</Button>
                                                   </>):
                                                       tokName2 ?  (<> <span className='text-xs' style={{opacity: '0.5'}}>Balance <strong>{tokBalance2 ? truncate(tokBalance2/1000000): '0.00'} {tokName2}</strong></span>
                                                       &nbsp; <Button variant="outline-purple" className='btn-xs-d' style={{height: '20px'}}  onClick={()=>callingmaxliq2()}>Max</Button>
                                                   
                                                       </>)
                                                :(<></>)}
                                               
                                                    </div>
                                                    <div className="text-end">
                                                        </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        
                                        
                                        {showdetails ? 
                                        (<>
                                        <br/>
                                        {/* <br/>
                                           <label className='d-flex align-items-center justify-content-between'>
                                            
                                            <h6>Price</h6>                          <h6> 1 {tokName1} = { decl1  ? parseFloat(decl1/1000000).toFixed(2) : "0"} {tokName2}  </h6>  
                                           
                                       </label>
                                       <br></br>
                                       <label className='d-flex align-items-center justify-content-between'>                                            
                                            <h6>Minimum Received</h6><h6> {parseFloat(AssWithFee/1000000).toFixed(4)} {tokName2}  </h6>  
                                        </label>
                                        <br></br>
                                       <label className='d-flex align-items-center justify-content-between'>                                            
                                            <h6>Swap Rewards</h6><h6>{swf > 0 ? parseFloat(swf).toFixed(3) : "0" } ELEM</h6>  
                                        </label> */}
                                        <div className="mb-20">
                                                <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                                    <span><strong></strong>{tokName2} per {tokName1}</span>
                                                    <strong className='font-semibold'>{truncate(decl1)}</strong>
                                                </div>
                                                <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                                    <span><strong></strong>Share of Pool</span>
                                                    <strong className='font-semibold'>{((globalStatevalue.issuedLP/1000000))}</strong>
                                                </div>
                                            </div>
                                        </>):
                                        (<></>)}
                                        <br/>
                                       
                                     
                                    </div>

                                    {localStorage.getItem("walletAddress") ?
                                    (<>
                                    {nolPair ? 
                                    (<>
                                    <Button className='btn btn-blue w-100'>
                                    No Pair
                                    </Button>
                                   </>):
                                    (<> 
                                     {LpAssetOptin ? 
                                    (<>
                                     <ButtonLoad loading={loader} className='btn btn-blue w-100' onClick={()=>liqassetOptin(as3Id)}>
                                    Asset Opt-In
                                    </ButtonLoad>  
                                    </>):
                                    (<>
                                    {enoughbalance ? 
                                    (<>
                                    <Button className='btn btn-blue w-100' >
                                    You don't have sufficient balance to Add liquidity
                                    </Button></>):
                                    (<>{tokName2 ? 
                                    (<>
                                     <ButtonLoad loading={loader} className='btn btn-blue w-100' onClick={()=>liqassetOptin()}>
                                    Add Liquidity
                                    </ButtonLoad>
                                    </>):
                                    (<>
                                     <ButtonLoad  className='btn btn-blue w-100'>
                                    Select Asset
                                    </ButtonLoad>
                                    </>)}
                                   
                                    </>)}
                                       
                                    </>)}
                                   
                                   
                                                                      
                                     </>)}
                                    </>):                                   
                                    (<>
                                    <Button className='btn btn-blue w-100' onClick={()=>conectWallet()}>
                                    <svg width="20" height="20" className='me-2 ms-0' viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"><path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z"></path></svg>
                                    Connect wallet
                                    </Button>
                                    </>)}

                                          
                                        </Tab>
                                        <Tab eventKey="remove" title="Remove">
                                            
                                       {nolPair ? (<></>):(<>
                                        <div className="group-row mb-3">
                                                <Row className='align-items-center flex-sm-nowrap'>
                                                    <Col sm="auto" className="mb-sm-0 mb-2">
                                                        <h6 className='sub-heading'>Amount to Remove</h6>
                                                    </Col>
                                                    <Col xs="auto" className='flex-grow-1'>
                                                        <div className="input-group-max d-flex justify-content-end align-items-center px-3 input-group-max-lg w-100">
                                                            <input type="number" placeholder='0.00' value={truncate(liquidityamount/1000000)} style={{width: '80px'}}  className='form-control text-end' />
                                                            <Button variant="outline-purple" className='btn-xs-d ms-3' onClick={() => percent(25)} style={{height: '20px'}}>25%</Button>
                                                            <Button variant="outline-purple" className='btn-xs-d ms-2' onClick={() => percent(50)} style={{height: '20px'}}>50%</Button>
                                                            <Button variant="outline-purple" className='btn-xs-d ms-2' onClick={() => percent(75)} style={{height: '20px'}}>75%</Button>
                                                            <Button variant="outline-purple" className='btn-xs-d ms-2' onClick={() => percent(100)} style={{height: '20px'}}>Max</Button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div></>)}
                                            <div className="group-row mb-3">
                                                <Row className='align-items-center flex-sm-nowrap'>
                                                    <Col sm="auto" className="mb-sm-0 mb-2">
                                                        <h6 className='sub-heading'>You'll Receive:</h6>
                                                    </Col>
                                                    <Col xs="auto" className='flex-grow-1 d-flex align-items-center justify-content-sm-end'>
                                                        <div className="input-group-max input-group-max-img d-flex align-items-center px-3">
                                                            <span className='h3 mb-1'>{amount1Out ? truncate(amount1Out/1000000) : '0.00'}</span>
                                                            <span className='text-xs px-2'>{tokName1}</span>
                                                            <img src={tokLogo1} alt="USDC" />
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16" class="ml-2 stroke-current" onClick={()=>handleShow()}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>

                                                        </div>
                                                        <div className="input-group-max ms-3 input-group-max-img d-flex align-items-center px-3">
                                                            <span className='h3 mb-1'>{amount2Out ? truncate(amount2Out/1000000) : '0.00'}</span>
                                                           {tokName2 ?
                                                            (<>
                                                             <span className='text-xs px-2'>{tokName2}</span>
                                                            <img src={tokLogo2}  /></>):
                                                            (<>
                                                            <Badge bg="purple">Select token</Badge>
                                                            </>)}
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16" class="ml-2 stroke-current" onClick={()=>handleShow1()}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>

                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                            {localStorage.getItem("walletAddress") ? 
                                            (<>
                                            {nolPair ?
                                            (<>
                                            <Button className='btn btn-blue w-100'>
                                            {/* <svg width="20" height="20" className='me-2 ms-0' viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"><path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z"></path></svg> */}
                                            NO Pair
                                            </Button>
                                            </>):
                                            (<>
                                            {lpbalance > 0.0000000001 ? (<>
                                                <ButtonLoad loading={loader} className='btn btn-blue w-100' onClick={()=>checkremoveLiquidity()}>
                                            Remove Liquidity
                                            </ButtonLoad>
                                            </>):(<>
                                                <Button className='btn btn-blue w-100' >
                                           Liquidity not available
                                            </Button>
                                            </>)}
                                           
                                            </>)}
                                                                                        
                                            </>):
                                            (<>
                                            <Button className='btn btn-blue w-100' onClick={()=>conectWallet()}>
                                            <svg width="20" height="20" className='me-2 ms-0' viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"><path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z"></path></svg>
                                            Connect wallet
                                            </Button>
                                            </>)}
                                            
                                            

                                            {/* <div className="text-center">
                                                <Link className='text-text-FF' to="/find">Don't see your pool? Import it.</Link>
                                            </div> */}
                                        </Tab>
                                    </Tabs>
                                </Tab>
                            </Tabs>
                        </Card>
                    </Col>
                </Row>
            </Container>
            </>)}
           
           
            <Modal show={show} className="modal-dashboard " centered onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Select token</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <div className="mb-4">
                        <div className="text-md mb-2">Search</div>
                        <input type="text" placeholder='Search by Name,or paste Asset Id' onChange={(e) => valuestfunction(e.target.value)}  className='form-control form-control-field border-0' />
                    </div> */}
                    <div className="mb-4">
                        <h5 className='mb-3 font-semibold'>
                            Common bases
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                        Verified Assets
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger>
                        </h5>

                        <div className="d-flex flex-wrap justify-content-center">
                            {/* <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={algologo} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold' onClick={()=>choose1(1,algologo,"ALGO")}>ALGO</h6>
                     </Button> */}
                     <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={usdclogo} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold' onClick={()=>choose1(78045387,usdclogo,"USDC")}>USDC</h6>
                     </Button>
                     <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={taulogo} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold'onClick={()=>choose1(78043454,taulogo,"TAU")}>TAU</h6>
                     </Button>
                     <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={usdtlogo} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold'onClick={()=>choose1(88067314,usdtlogo,"USDT")}>USDT</h6>
                     </Button>
                     {/* <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={einrlogo} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold'onClick={()=>choose1(78044898,einrlogo,"EINR")} >EINR</h6>
                            </Button> */}
                     {/* <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={USDC} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold'>DAI</h6>
                     </Button>
                            <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                                <img src={USDC} alt="USDC" />
                                <h6 className='mb-0 ms-2 font-semibold'>DAI</h6>
                            </Button>
                            <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                                <img src={USDC} alt="USDC" />
                                <h6 className='mb-0 ms-2 font-semibold'>USDC</h6>
                            </Button>
                            <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                                <img src={USDC} alt="USDC" />
                                <h6 className='mb-0 ms-2 font-semibold'>USDT</h6>
                     </Button> */}
                        </div>
                    </div>

                    <hr className='mb-4' />

                    <div className="currency-list py-1">
                      {/* {!smore1 && ! smore (<></>)} */}
                      {smore1 ?
                       (<>
                        <Button variant='link' onClick={()=>choose1(sid,selecttoken,sunitname1)} className='btn-currency mb-2 w-100 justify-content-start align-items-center btn-currency-md p-1'>
                            <img src={ selecttoken }  />
                            <div className="ms-3 flex-grow-1 d-flex align-items-center text-start">
                          <div className='flex-grow-1'>
                            <h5 className='mb-0 font-semibold text-white'>{sunitname1}</h5>
                            <h7 className='mb-0 sub-heading text-sm mb-0'>{sid}</h7>
                          </div>
                          <div className='text-end'>
                            <h7 className='mb-0 sub-heading text-sm mb-0'>Balance <br />{assetBalance ? truncate(assetBalance/1000000) : '0.00'}</h7>
                          </div>
                        </div>
                            {/* <div className="ms-3 text-start">
                                <h5 className='mb-0 font-semibold text-white'>{sunitname1}</h5>
                                <h7 className='mb-0 sub-heading text-sm mb-0'>{sid}</h7>
                            </div> */}
                        </Button>
                       </>):
                       smore ? (<>
                       {assetdetails.map((r,i)=>{
                         return(<>
                          <Button variant='link'  onClick={()=>choose1(r.assetindex,selecttoken,r.assetunitname)} className='btn-currency mb-2 w-100 justify-content-start align-items-center btn-currency-md p-1'>
                            <img src={selecttoken}  />
                            <div className="ms-3 flex-grow-1 d-flex align-items-center text-start">
                          <div className='flex-grow-1'>
                            <h5 className='mb-0 font-semibold text-white'>{r.assetunitname}</h5>
                            <h7 className='mb-0 sub-heading text-sm mb-0'>{r.assetindex}</h7>
                          </div>
                          <div className='text-end'>
                            {/* <h7 className='mb-0 sub-heading text-sm mb-0'>Balance <br />{ assetBalance ? parseFloat(assetBalance/1000000).toFixed(3) : '0.00'}</h7> */}
                          </div>
                        </div>
                            {/* <div className="ms-3 text-start">
                                <h5 className='mb-0 font-semibold text-white'>{r.assetunitname}</h5>
                                <h7 className='mb-0 sub-heading text-sm mb-0'>{r.assetindex}</h7>
                            </div> */}
                        </Button>
                         </>)
                       })}
                       </>):(<>
                        {simage.map((r,i)=>{
                         return(<>
                          <Button variant='link'  onClick={()=>choose1(r.index,r.image,r.name)} className='btn-currency mb-2 w-100 justify-content-start align-items-center btn-currency-md p-1'>
                            <img src={r.image}  />
                            <div className="ms-3 flex-grow-1 d-flex align-items-center text-start">
                          <div className='flex-grow-1'>
                            <h5 className='mb-0 font-semibold text-white'>{r.name}</h5>
                            <h7 className='mb-0 sub-heading text-sm mb-0'>{r.index}</h7>
                          </div>
                          <div className='text-end'>
                            <h7 className='mb-0 sub-heading text-sm mb-0'>Balance <br />{truncate(r.bal/1000000)}</h7>
                          </div>
                        </div>
                            {/* <div className="ms-3 text-start">
                                <h5 className='mb-0 font-semibold text-white'>{r.name}</h5>
                                <h7 className='mb-0 sub-heading text-sm mb-0'>{r.index}</h7>
                            </div> */}
                        </Button>
                         </>)
                       })}
                       </>)}
                       
                      
                    </div>
                </Modal.Body>
            </Modal>
            <Modal show={show1} className="modal-dashboard" centered onHide={handleClose1}>
                <Modal.Header closeButton>
                    <Modal.Title>Select token</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <div className="mb-4">
                        <div className="text-md mb-2">Search</div>
                        <input type="text" placeholder='Search by Name,or paste Asset Id' onChange={(e) => valuestfunction(e.target.value)}  className='form-control form-control-field border-0' />
                    </div> */}
                    <div className="mb-4">
                        <h5 className='mb-3 font-semibold'>
                            Common bases
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                       Verified Assets
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger>
                        </h5>

                        <div className="d-flex flex-wrap justify-content-center">
                     
                     {/* <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={algologo} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold' onClick={()=>choose2(1,algologo,"ALGO")}>ALGO</h6>
                     </Button> */}
                     <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={usdclogo} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold' onClick={()=>choose2(78045387,usdclogo,"USDC")}>USDC</h6>
                     </Button>
                     <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={taulogo} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold'onClick={()=>choose2(78043454,taulogo,"TAU")}>TAU</h6>
                     </Button>
                     <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={usdtlogo} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold'onClick={()=>choose2(88067314,usdtlogo,"USDT")}>USDT</h6>
                     </Button>
                     {/* <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={einrlogo} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold'onClick={()=>choose2(78044898,einrlogo,"EINR")} >EINR</h6>
                     </Button> */}
                     {/* <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={USDC} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold'>DAI</h6>
                     </Button>
                     <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={USDC} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold'>USDC</h6>
                     </Button>
                     <Button className='p-0  btn-currency-sm text-white mb-3 me-4' variant='link'>
                         <img src={USDC} alt="USDC" />
                         <h6 className='mb-0 ms-2 font-semibold'>USDT</h6>
                     </Button> */}
                 </div>
                    </div>

                    <hr className='mb-4' />

                    <div className="currency-list py-1">
                      <Button variant='link' onClick={()=>choose2(sid,selecttoken,sunitname1)} className='btn-currency mb-2 w-100 justify-content-start align-items-center btn-currency-md p-0'>
                        {/* <img src={ selecttoken }  /> */}
                        {/* <div className="ms-3 flex-grow-1 d-flex align-items-center text-start">
                          <div className='flex-grow-1'>
                            <h5 className='mb-0 font-semibold text-white'>fsdfds</h5>
                            <h7 className='mb-0 sub-heading text-sm mb-0'>ccdscds</h7>
                          </div>
                          <div className='text-end'>
                            <h7 className='mb-0 sub-heading text-sm mb-0'>Balance <br />Amount</h7>
                          </div>
                        </div> */}
                    </Button>
                      {smore1 ?
                       (<>
                        <Button variant='link' onClick={()=>choose2(sid,selecttoken,sunitname1)} className='btn-currency mb-2 w-100 justify-content-start align-items-center btn-currency-md p-1'>
                            <img src={ selecttoken }  />
                            <div className="ms-3 flex-grow-1 d-flex align-items-center text-start">
                          <div className='flex-grow-1'>
                            <h5 className='mb-0 font-semibold text-white'>{sunitname1}</h5>
                            <h7 className='mb-0 sub-heading text-sm mb-0'>{sid}</h7>
                          </div>
                          <div className='text-end'>
                            <h7 className='mb-0 sub-heading text-sm mb-0'>Balance <br />{ assetBalance ? truncate(assetBalance/1000000): '0.00'}</h7>
                          </div>
                        </div>
                           
                        </Button>
                       </>):smore ? (<>
                       {assetdetails.map((r,i)=>{
                         return(<>
                          <Button variant='link'  onClick={()=>choose2(r.assetindex,selecttoken,r.assetunitname)} className='btn-currency mb-2 w-100 justify-content-start align-items-center btn-currency-md p-1'>
                            <img src={selecttoken}  />
                            <div className="ms-3 flex-grow-1 d-flex align-items-center text-start">
                          <div className='flex-grow-1'>
                            <h5 className='mb-0 font-semibold text-white'>{r.assetunitname}</h5>
                            <h7 className='mb-0 sub-heading text-sm mb-0'>{r.assetindex}</h7>
                          </div>
                          <div className='text-end'>
                            {/* <h7 className='mb-0 sub-heading text-sm mb-0'>Balance <br />{ assetBalance ? parseFloat(assetBalance/1000000).toFixed(3) : '0.00'}</h7> */}
                          </div>
                        </div>
                           
                        </Button>
                         </>)
                       })}
                       </>):(<>{simage.map((r,i)=>{
                         return(<>
                          <Button variant='link'  onClick={()=>choose2(r.index,r.image,r.name)} className='btn-currency mb-2 w-100 justify-content-start align-items-center btn-currency-md p-1'>
                            <img src={r.image}  />
                            <div className="ms-3 flex-grow-1 d-flex align-items-center text-start">
                          <div className='flex-grow-1'>
                            <h5 className='mb-0 font-semibold text-white'>{r.name}</h5>
                            <h7 className='mb-0 sub-heading text-sm mb-0'>{r.index}</h7>
                          </div>
                          <div className='text-end'>
                            <h7 className='mb-0 sub-heading text-sm mb-0'>Balance <br />{truncate(r.bal/1000000)}</h7>
                          </div>
                        </div>
                            
                        </Button>
                        </>)})}
                       </>)}
                       
                      
                    </div>
                </Modal.Body>
                </Modal>
            <Modal show={showMode} className="modal-dashboard" centered onHide={handleCloseMode}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Expert mode turns off the confirm transaction prompt and allows high slippage trades that often result in bad rates and lost funds.</p>
                    <p>ONLY USE THIS MODE IF YOU KNOW WHAT YOU ARE DOING.</p>
                    <Button variant='danger' onClick={btnhandleCloseMode} className='w-100'>Turn On Expert Mode</Button>
                </Modal.Body>
            </Modal>
        </Layout>
    );
};

export default Stablecoin;