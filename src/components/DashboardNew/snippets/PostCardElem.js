import React, { Component, useState, useEffect, useContext, useRef } from 'react';
import { Modal, Button, ProgressBar, Form, InputGroup, Card, FormControl, Row, Col } from 'react-bootstrap';

import Image from '../../../assets/images/element_banner_sale.png';
import Icon from '../../../assets/images/post-icon-1.png';
import Logo from '../../../assets/images/PlanetWatch.png';
import SLogo from '../../../assets/images/Algo.png';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import ReactDomServer from 'react-dom/server';
import ButtonLoad from 'react-bootstrap-button-loader'
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
// import {appOptinLaunchpad, assetOptinLaunchpad, donateLaunchpad} from '../apicallfunction';
import '../../toast-style-override.css'
import launchpadDetails from './launchpad.json';
import node from '../nodeapi.json';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import { updatealgobalance } from "../../formula";
import governance from "../governance.json";
import firebase from '../../../NFTFolder/firebase';
import axios from 'axios';  
// import url from '../../../../configurl';
import { Link } from 'react-router-dom';
const algosdk = require('algosdk');
const myAlgoWallet = new MyAlgoConnect();
const bridge = "https://bridge.walletconnect.org";
const PostCardElem = () => {

    const [show, setShow] = React.useState(false);
    const [showDonate, setShowDonate] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseDonate = () => setShowDonate(false);
    const handleShowDonate = () => setShowDonate(true);

    const[loaderAppOpt, setLoaderAppOpt] = useState(false);

    const handleShowLoadAppOpt = () => setLoaderAppOpt(true);
    const handleHideLoadAppOpt = () => setLoaderAppOpt(false);

    const[loaderAssetOpt, setLoaderAssetOpt] = useState(false);

    const handleShowLoadAssetOpt = () => setLoaderAssetOpt(true);
    const handleHideLoadAssetOpt = () => setLoaderAssetOpt(false);

    const[loaderParticipate, setLoaderParticipate] = useState(false);

    const handleShowLoadParticipate = () => setLoaderParticipate(true);
    const handleHideLoadParticipate = () => setLoaderParticipate(false);

    const [connector, setConnector] = useState("");
    let[startdt,setstartdt] = useState("");
    const[enddt,setenddt] = useState("");
    const[clsdt,setclsdt] = useState("");
    const[goal,setgoal] = useState("");
    const[total,settotal] = useState("");
    const[rec,setrec]= useState("");
    const[creator,setCreator]= useState("");
    const[escrow,setescrow]= useState("");
    const[appid,setappid]= useState("");
    const[percent,setPercent]= useState(parseFloat(""));
    const[date,setdate]= useState("");
    const[time,settime]= useState("");
    const[map1,setMap]= useState([]);
    const[day,setTime4]= useState("");
    const[hour,setTim1]= useState("");
    const[min,setTim2]= useState("");
    const[sec,setTim3]= useState("");
    const[lock,setlock]= useState(""); 
    const [appOpt,setToAppOpt] = useState(false);
    const [assetOpt,setToAssetOpt] = useState(false);
    // const [show, setShow] = useState(false);
    const [value, setValue] = React.useState('');
    const [algoBalance, setAlgoBalance] = useState("");
    const [elemBalance, setElemBalance] = useState("");
    const [algoCommited, setAlgoCommited] = useState("");
    const [commitamount,setcommitamount] = useState("");
    const [minAlgo, setMinAlgo] = useState("");
    const [votestatus,setvotestatus] = useState("");
    let appID_global = launchpadDetails['app1']['appID'];
    let escrow_global = "LMCGCWB7LOFIQBIKO663W4OOOQQCNWQGU23HCMLYXX3S35OXS47XLXLTXQ";
    let elementID_global = launchpadDetails['app1']['elemAssetID'];
    let whiteID_global = 56296602;
    let owner_global = "UTV3AUE6PTUDIBAT6EOP57IUJMW75MOXNP2XOZLMJX5CEBLDGTMYTR32CU";

//     const baseServer = 'https://testnet-algorand.api.purestake.io/ps2';
// const port = '';

// const token = {
//    'X-API-Key': 'pOD5BAUCxq7InVPjo0sO01B0Vq4d7pD1ask5Ix43'}

const algodClientGet = new algosdk.Algodv2('', node['algodclient'], '');

    const algodClient = new algosdk.Algodv2('', node['algodclient'], '');
    const indexClient = new algosdk.Indexer('', node['indexerclient'], '');

    const toastDiv = (txId) =>
    (
        <div>
            <p> Transaction is successful &nbsp;<a style={{color:'#133ac6'}} href={txId} target="_blank" rel="noreferrer"><br/><p style={{fontWeight: 'bold'}}>View in Algo Explorer <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M11.7176 3.97604L1.69366 14L0.046875 12.3532L10.0697 2.32926H1.23596V0H14.0469V12.8109H11.7176V3.97604Z" fill="#133ac6"/>
     </svg></p></a></p>  
        </div>
    );
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
                Vote:data.val().Vote
                
              })  
            //   setvotestatus(r[0]["Vote"]);                              
          }
          else{
            setcommitamount([""]);  
          }
        //   setcommitamount(r[0]["Amount"]); 
        //   setvotestatus(r[0]["Vote"]); 
         setcommitamount(r);
        //   setPlanetAmount(planetAmount);
               
        });                  
      } catch (error) {
        //console.log('error occured during search', error);    
      }                
    }
    useEffect(()=>{dbcallProfile()},[])
    const waitForConfirmation = async function (client, txId) {
        let status = (await client.status().do());
        let lastRound = status["last-round"];
          while (true) {
            const pendingInfo = await client.pendingTransactionInformation(txId).do();
            if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
              //Got the completed Transaction
              // //console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
            //   toast.success(`Transaction Successful with ${txId}`);
            let id = "https://testnet.algoexplorer.io/tx/" + txId;
            toast.success(toastDiv(id));
            handleHideLoadAssetOpt();
            handleHideLoadAppOpt();
            handleHideLoadParticipate();
            await updatealgobalance();
            // await sleep(5000);
            // reload();               
            break;
            }
            lastRound++;
            await client.statusAfterBlock(lastRound).do();
          }
        };  

        const AppOptIn = async () =>
        {
            handleShowLoadAppOpt();
            if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideLoadAppOpt();
        }
        else{
            if(parseFloat(minAlgo) < 101000 + 28500)
            {
                toast.error("Your Algo balance is low. Please get more Algos from dispenser.");
                handleHideLoadAppOpt();
            }
            else
            {
        //   let application = indexClient.searchForApplications(appID_global);
          // //console.log("Global State =", application);
        //   let appById = await algodClient.getApplicationByID(appID_global).do();
          // //console.log("Global State =", appById.params);
          let params = await algodClient.getTransactionParams().do();
        
          try {
        
            const txn = algosdk.makeApplicationOptInTxnFromObject({
                suggestedParams:params,
                from: localStorage.getItem("walletAddress"),
                appIndex: parseInt(governance["appID"]),
            });
        
            const signedTxn = await myAlgoWallet.signTransaction(txn.toByte());
            // //toast.info("Transaction in Progress");
            const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
           //API for Connect wallet  stored in /lpTracker
        //   await appOptinLaunchpad(localStorage.getItem("walletAddress"), "Opted in to Launchpad app");
          //API end
            await waitForConfirmation(algodClient, response.txId);
            setToAppOpt(true);
            await countAsset();
            await minBal();
            // toast.success(`Transaction Success ${response.txId}`);
        }
        catch (err) {
            let ev = err.toString()
            let present = ev.indexOf("Cannot read properties of undefined")
            if(present > 1)
            {
            
            }
            else
            {
            toast.error(`Transaction Failed due to ${err}`);
            }
            handleHideLoadAppOpt();
            console.error(err);
        }
    }
    }
        }

        const appOptInPera = async () =>
        {
          const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
          setConnector(connector);
          handleShowLoadAppOpt();
          if (localStorage.getItem("walletAddress") === "")
              {
                  toast.error("Connect your wallet");
                  handleHideLoadAppOpt();
              }
              else{
                  if(parseFloat(minAlgo) < 101000 + 85500)
                  {
                      toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
                      handleHideLoadAppOpt();
                  }
                  else
                  {
      //   let application = indexClient.searchForApplications(appID_global);
      //   console.log("Global State =", application);
      //   let appById = await algodClient.getApplicationByID(appID_global).do();
      //   console.log("Global State =", appById.params);
        let params = await algodClient.getTransactionParams().do();
      
        try {
      
          const txn = algosdk.makeApplicationOptInTxnFromObject({
              suggestedParams:params,
              from: localStorage.getItem("walletAddress"),
              appIndex: parseInt(appID_global),
          });
            let txId = txn.txID().toString();
        
            // time to sign . . . which we have to do with walletconnect
            const txns = [txn]
            const txnsToSign = txns.map(txn => {
              const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
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
            await algodClient.sendRawTransaction(decodedResult).do();
            await waitForConfirmation(algodClient, txId);
            setToAppOpt(true);
            await countAsset();
            await minBal();
          }catch(err) {
            let ev = err.toString()
            let present = ev.indexOf("reading '0'")
            if(present > 1)
            {
            
            }
            else
            {
            toast.error(`Transaction Failed due to ${err}`);
            }
              handleHideLoadAppOpt();
              console.error(err);
          }
          }
          }
        }

    const optinAsset = async () =>
    {
        handleShowLoadAssetOpt();
        if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideLoadAssetOpt();
        }
        else{
            if(parseFloat(minAlgo) < 101000)
            {
                toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
                handleHideLoadAssetOpt();
            }
            else
            {    
        let params = await algodClient.getTransactionParams().do();
        
        try {
      
          const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
              suggestedParams: params,
              from: localStorage.getItem("walletAddress"),
              to: localStorage.getItem("walletAddress"),
              amount: 0,
              assetIndex: elementID_global
          });
      
          const signedTxn = await myAlgoWallet.signTransaction(txn.toByte());
        //toast.info("Transaction in Progress");
          const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
          
          //API for Connect wallet  stored in /lpTracker
        //   await assetOptinLaunchpad(localStorage.getItem("walletAddress"), "Opted in to ELEM Asset");
          //API end

          await waitForConfirmation(algodClient, response.txId);
          setToAssetOpt(true);
          await countAsset();
          await minBal();
        //   toast.success(`Transaction Success ${response.txId}`);
      
      }
      catch (err) {
        let ev = err.toString()
        let present = ev.indexOf("Cannot read properties of undefined")
        if(present > 1)
        {
        
        }
        else
        {
          toast.error(`Transaction Failed due to ${err}`);
        }
          handleHideLoadAssetOpt();
          console.error(err);
      
      }
    }
    }
    }

    const assetOptInPera = async () =>
  {
    const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
    setConnector(connector);
    handleShowLoadAssetOpt();
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideLoadAssetOpt();
        }
        else{
            if(parseFloat(minAlgo) < 101000)
            {
                toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
                handleHideLoadAssetOpt();
            }
            else
            {
  
  let params = await algodClient.getTransactionParams().do();
  
  try {

    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        suggestedParams: params,
        from: localStorage.getItem("walletAddress"),
        to: localStorage.getItem("walletAddress"),
        amount: 0,
        assetIndex: elementID_global
    });
      let txId = txn.txID().toString();
  
      // time to sign . . . which we have to do with walletconnect
      const txns = [txn]
      const txnsToSign = txns.map(txn => {
        const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
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
      await algodClient.sendRawTransaction(decodedResult).do();
      await waitForConfirmation(algodClient, txId);
      setToAssetOpt(true);
      await countAsset();
      await minBal();
    }catch (err) {
        handleHideLoadAssetOpt();
        let ev = err.toString()
        let present = ev.indexOf("Cannot read properties of undefined")
        if(present > 1)
        {
        
        }
        else
        {
        toast.error(err.toString());
        }
        console.error(err);
    }
    }
    }
  }

    const algoVoteYes =async () => {
        handleShowLoadParticipate();
        handleCloseDonate();
        if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideLoadAssetOpt();
        }
        // else if(commitamount===""||commitamount===null ||commitamount===undefined){
        //     toast.warn("Loading..");
        //   }
        else{
            // if(commitamount[0]===""||commitamount[0]===null ||commitamount[0]===undefined){
            //     toast.warn("Loading..");
            // }
            // else{
            if(parseFloat(minAlgo) < parseInt(value) + (2000))
            {
                toast.error("Your Algo balance is low.")
                handleHideLoadParticipate();
            }
            else
            {
                if((value) < 0.01)
                {
                    console.log("valuecheck",value);
                    toast.error("...Minimum Algos to vote is 0.01 Algos. The vale entered is less than 0.01 Algos.")
                    handleHideLoadParticipate();
                }
                else
                {

    
        try {
        //   const accounts = await myAlgoWallet.connect();
          // const addresses = accounts.map(account => account.address);
          const params = await algodClient.getTransactionParams().do();
          let noteVote = "yes " + value; 
          let notefield = new Uint8Array(Buffer.from(noteVote.toString(), 'utf8'));            
          
          let transaction1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: localStorage.getItem("walletAddress"), 
            to: governance["yesAddress"], 
            amount: 0,
            note: notefield,
            suggestedParams: params
           });

          const signedTx1 = await myAlgoWallet.signTransaction(transaction1.toByte());

      const response = await algodClient.sendRawTransaction(signedTx1.blob).do();
      // //console.log("TxID", JSON.stringify(response, null, 1));
      //API for Connect wallet  stored in /lpTracker
    //   await donateLaunchpad(localStorage.getItem("walletAddress"), amount);
      //API end
      await waitForConfirmation(algodClient, response.txId);
    //   let ref2=firebase.database().ref(`Registeruser/${localStorage.getItem("walletAddress")}`);  
      //   let dateset=new Date().toDateString();  
      //   const db = ref2.push().key;                      
        // ref2.update({
        //     id:commitamount[0].id,
            
           
        //     WalletAddress:commitamount[0].WalletAddress,
        //     TimeStamp:commitamount[0].TimeStamp,
        //     Amount:commitamount[0].Amount,
        //     Eligibility:commitamount[0].Eligibility,
        //     Assettype:commitamount[0].Assettype,
        //     Vote:1
  
        //    })
        //     .then(()=>{ 
              
        //     }).catch((err) => {                                    
               
        //     }); 

        let ref2=firebase.database().ref(`Registeruser/${localStorage.getItem("walletAddress")}`);  
    let dateset=new Date().toDateString();  
    const db = ref2.push().key;                      
    ref2.set({
        id:db,
        WalletAddress:localStorage.getItem("walletAddress"),
        TimeStamp:dateset,Amount:value,Eligibility:1,Assettype:"Algos",Vote:1, Decision:"YES",
        transId:response.txId})
        .then(()=>{ 
            window.location.reload(false);
        }).catch((err) => {                                    
           
        });   
      await globalState();
      await countAsset();
    //   toast.success(`Transaction Successfully completed with ${response.txId}`);
    //   //toast.info(`Now you have obtained Element amount = ( ${(parseFloat(Pop_amount) * 2).toFixed(2)} ELEM )`);
        } catch (err) {
          toast.error(`Transaction Failed due to ${err}`);
          handleHideLoadParticipate();
          console.error(err);
        }
    // }
}
        }}
    }

    const algoVoteYesPera =async () => {
        const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
        setConnector(connector);
        handleShowLoadParticipate();
        handleCloseDonate();
        if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideLoadAssetOpt();
        }
        // else if(commitamount===""||commitamount===null ||commitamount===undefined){
        //     toast.warn("Loading..");
        //   }
        else{
            // if(commitamount[0]===""||commitamount[0]===null ||commitamount[0]===undefined){
            //     toast.warn("Loading..");
            // }
            // else{
            if(parseFloat(minAlgo) < parseInt(value) + (2000))
            {
                toast.error("Your Algo balance is low.")
                handleHideLoadParticipate();
            }
            else
            {
                if((value) < 0.01)
                {
                    toast.error("Minimum Algos to vote is 0.01 Algos. The vale entered is less than 0.01 Algos.")
                    handleHideLoadParticipate();
                }
                else
                {
    
        try {
        //   const accounts = await myAlgoWallet.connect();
          // const addresses = accounts.map(account => account.address);
          const params = await algodClient.getTransactionParams().do();
          let noteVote = "yes " + value; 
          let notefield = new Uint8Array(Buffer.from(noteVote.toString(), 'utf8'));            
          
          let transaction1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: localStorage.getItem("walletAddress"), 
            to: governance["yesAddress"], 
            amount: 0,
            note: notefield,
            suggestedParams: params
           });

          const signedTx1 = await myAlgoWallet.signTransaction(transaction1.toByte());

      const response = await algodClient.sendRawTransaction(signedTx1.blob).do();
      // //console.log("TxID", JSON.stringify(response, null, 1));
      //API for Connect wallet  stored in /lpTracker
    //   await donateLaunchpad(localStorage.getItem("walletAddress"), amount);
      //API end
      await waitForConfirmation(algodClient, response.txId);
    //   let ref2=firebase.database().ref(`Registeruser/${localStorage.getItem("walletAddress")}`);  
    //   //   let dateset=new Date().toDateString();  
    //   //   const db = ref2.push().key;                      
    //     ref2.update({
    //         id:commitamount[0].id,
            
           
    //         WalletAddress:commitamount[0].WalletAddress,
    //         TimeStamp:commitamount[0].TimeStamp,
    //         Amount:commitamount[0].Amount,
    //         Eligibility:commitamount[0].Eligibility,
    //         Assettype:commitamount[0].Assettype,
    //         Vote:1
  
    //        })
    //         .then(()=>{ 
              
    //         }).catch((err) => {                                    
               
    //         }); 

    let ref2=firebase.database().ref(`Registeruser/${localStorage.getItem("walletAddress")}`);  
    let dateset=new Date().toDateString();  
    const db = ref2.push().key;                      
    ref2.set({
        id:db,
        WalletAddress:localStorage.getItem("walletAddress"),
        TimeStamp:dateset,Amount:value,Eligibility:1,Assettype:"Algos",Vote:1, Decision:"YES",
        transId:response.txId})
        .then(()=>{ 
            window.location.reload(false);
        }).catch((err) => {                                    
           
        });     
      await globalState();
      await countAsset();
    //   toast.success(`Transaction Successfully completed with ${response.txId}`);
    //   //toast.info(`Now you have obtained Element amount = ( ${(parseFloat(Pop_amount) * 2).toFixed(2)} ELEM )`);
        } catch (err) {
          handleHideLoadParticipate();
          toast.error(`Transaction Failed due to ${err}`);
          console.error(err);
        }
    // }
}
}
        }
    }

    const algoVoteNo =async () => {
        handleShowLoadAssetOpt();
        handleCloseDonate();
        if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideLoadAssetOpt();
        }
        // else if(commitamount===""||commitamount===null ||commitamount===undefined){
        //     toast.warn("Loading..");
        //   }
        else{
            // if(commitamount[0]===""||commitamount[0]===null ||commitamount[0]===undefined){
            //     toast.warn("Loading..");
            // }
            // else{
            if(parseFloat(minAlgo) < parseInt(value) + (2000))
            {
                toast.error("Your Algo balance is low.")
                handleHideLoadParticipate();
            }
            else
            {
                if((value) < 0.01)
                {
                    toast.error("Minimum Algos to vote is 0.01 Algos. The value entered is less than 0.01 Algos.")
                    handleHideLoadParticipate();
                }
                else
                {
    
        try {
        //   const accounts = await myAlgoWallet.connect();
          // const addresses = accounts.map(account => account.address);
          const params = await algodClient.getTransactionParams().do();
          let noteVote = "no " + value; 
          let notefield = new Uint8Array(Buffer.from(noteVote.toString(), 'utf8'));            
          
          let transaction1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: localStorage.getItem("walletAddress"), 
            to: governance["noAddress"], 
            amount: 0,
            note: notefield,
            suggestedParams: params
           });

          const signedTx1 = await myAlgoWallet.signTransaction(transaction1.toByte());

      const response = await algodClient.sendRawTransaction(signedTx1.blob).do();
      // //console.log("TxID", JSON.stringify(response, null, 1));
      //API for Connect wallet  stored in /lpTracker
    //   await donateLaunchpad(localStorage.getItem("walletAddress"), amount);
      //API end
      await waitForConfirmation(algodClient, response.txId);
    //   let ref2=firebase.database().ref(`Registeruser/${localStorage.getItem("walletAddress")}`);  
    //   //   let dateset=new Date().toDateString();  
    //   //   const db = ref2.push().key;                      
    //     ref2.update({
    //         id:commitamount[0].id,
            
           
    //         WalletAddress:commitamount[0].WalletAddress,
    //         TimeStamp:commitamount[0].TimeStamp,
    //         Amount:commitamount[0].Amount,
    //         Eligibility:commitamount[0].Eligibility,
    //         Assettype:commitamount[0].Assettype,
    //         Vote:1
  
    //        })
    //         .then(()=>{ 
              
    //         }).catch((err) => {                                    
               
    //         }); 
    let ref2=firebase.database().ref(`Registeruser/${localStorage.getItem("walletAddress")}`);  
    let dateset=new Date().toDateString();  
    const db = ref2.push().key;                      
    ref2.set({
        id:db,
        WalletAddress:localStorage.getItem("walletAddress"),
        TimeStamp:dateset,Amount:value,Eligibility:1,Assettype:"Algos",Vote:1, Decision:"NO",
        transId:response.txId})
        .then(()=>{ 
            window.location.reload(false);
        }).catch((err) => {                                    
           
        });  
      await globalState();
      await countAsset();
    //   toast.success(`Transaction Successfully completed with ${response.txId}`);
    //   //toast.info(`Now you have obtained Element amount = ( ${(parseFloat(Pop_amount) * 2).toFixed(2)} ELEM )`);
        } catch (err) {
          toast.error(`Transaction Failed due to ${err}`);
          handleHideLoadAssetOpt();
          console.error(err);
        }
    // }
}
        }}
    }

    const algoVoteNoPera =async () => {
        const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
        setConnector(connector);
        handleShowLoadAssetOpt();
        handleCloseDonate();
        if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideLoadAssetOpt();
        }
        // else if(commitamount===""||commitamount===null ||commitamount===undefined){
        //     toast.warn("Loading..");
        //   }
        else{
            // if(commitamount[0]===""||commitamount[0]===null ||commitamount[0]===undefined){
            //     toast.warn("Loading..");
            // }
            // else{
            if(parseFloat(minAlgo) < parseInt(value) + (2000))
            {
                toast.error("Your Algo balance is low.")
                handleHideLoadParticipate();
            }
            else
            {
                if((value) < 0.01)
                {
                    toast.error("Minimum Algos to vote is 0.01 Algos. The vale entered is less than 0.01 Algos.")
                    handleHideLoadParticipate();
                }
                else
                {
    
        try {
        //   const accounts = await myAlgoWallet.connect();
          // const addresses = accounts.map(account => account.address);
          const params = await algodClient.getTransactionParams().do();
          let noteVote = "no " + value; 
          let notefield = new Uint8Array(Buffer.from(noteVote.toString(), 'utf8'));            
          
          let transaction1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: localStorage.getItem("walletAddress"), 
            to: governance["noAddress"], 
            amount: 0,
            note: notefield,
            suggestedParams: params
           });

          const signedTx1 = await myAlgoWallet.signTransaction(transaction1.toByte());

      const response = await algodClient.sendRawTransaction(signedTx1.blob).do();
      // //console.log("TxID", JSON.stringify(response, null, 1));
      //API for Connect wallet  stored in /lpTracker
    //   await donateLaunchpad(localStorage.getItem("walletAddress"), amount);
      //API end
      await waitForConfirmation(algodClient, response.txId);
    //   let ref2=firebase.database().ref(`Registeruser/${localStorage.getItem("walletAddress")}`);  
    //   //   let dateset=new Date().toDateString();  
    //   //   const db = ref2.push().key;                      
    //     ref2.update({
    //         id:commitamount[0].id,
            
           
    //         WalletAddress:commitamount[0].WalletAddress,
    //         TimeStamp:commitamount[0].TimeStamp,
    //         Amount:commitamount[0].Amount,
    //         Eligibility:commitamount[0].Eligibility,
    //         Assettype:commitamount[0].Assettype,
    //         Vote:1
  
    //        })
    //         .then(()=>{ 
              
    //         }).catch((err) => {                                    
               
    //         }); 
    let ref2=firebase.database().ref(`Registeruser/${localStorage.getItem("walletAddress")}`);  
    let dateset=new Date().toDateString();  
    const db = ref2.push().key;                      
    ref2.set({
        id:db,
        WalletAddress:localStorage.getItem("walletAddress"),
        TimeStamp:dateset,Amount:value,Eligibility:1,Assettype:"Algos",Vote:1, Decision:"NO",
        transId:response.txId})
        .then(()=>{ 
            window.location.reload(false);
        }).catch((err) => {                                    
           
        });  
      await globalState();
      await countAsset();
    //   toast.success(`Transaction Successfully completed with ${response.txId}`);
    //   //toast.info(`Now you have obtained Element amount = ( ${(parseFloat(Pop_amount) * 2).toFixed(2)} ELEM )`);
        } catch (err) {
          toast.error(`Transaction Failed due to ${err}`);
          handleHideLoadAssetOpt();
          console.error(err);
        }
    // }
}
        }}
    }

    const globalState = async (index) =>
{
      try {
        let appById = await indexClient.lookupApplications(launchpadDetails.app1.appID).do();
         //console.log("app", appById['application']['params']['global-state']);
        setMap(appById['application']['params']['global-state']);

         //console.log("length", appById['application']['params']['global-state']['length']);
let endCount = appById['application']['params']['global-state']['length'];
for(let i = 0; i < endCount; i++)
{
        if(appById['application']['params']['global-state'][i]['key'] == "RW5kRGF0ZQ=="){
            let endDate_c = JSON.stringify(await appById['application']['params']['global-state'][i]['value'][`uint`]);
             //console.log("endDate", endDate_c);
            setenddt(JSON.stringify(await appById['application']['params']['global-state'][i]['value'][`uint`]));
        }
    }

        //  //console.log("R value", r);

        // map1.map((a)=>{
        //      //console.log("map", a);
        // })

        // map1.forEach((element) => {
        //      //console.log("Element", element)
        // });

        let appArgsRet = [];
        appArgsRet.push(JSON.stringify(appById['application']['params']['global-state'][0]['key']));
        appArgsRet.push(JSON.stringify(appById['application']['params']['global-state'][1]['key']));
        appArgsRet.push(JSON.stringify(appById['application']['params']['global-state'][2]['key']));
        appArgsRet.push(JSON.stringify(appById['application']['params']['global-state'][3]['key']));
        appArgsRet.push(JSON.stringify(appById['application']['params']['global-state'][4]['key']));
        appArgsRet.push(JSON.stringify(appById['application']['params']['global-state'][5]['key']));
        appArgsRet.push(JSON.stringify(appById['application']['params']['global-state'][6]['key']));
        appArgsRet.push(JSON.stringify(appById['application']['params']['global-state'][7]['key']));
        appArgsRet.push(JSON.stringify(appById['application']['params']['global-state'][8]['key']));
        //  //console.log("array", appArgsRet);

        // setrec(JSON.stringify(r['application']['params']['global-state'][0]['value'][`bytes`]));
        // setstartdt(JSON.stringify(r['application']['params']['global-state'][1]['value'][`uint`]));
        // settotal(JSON.stringify(r['application']['params']['global-state'][2]['value'][`uint`]));
        // setCreator(JSON.stringify(r['application']['params']['global-state'][3]['value'][`bytes`]));
        // setenddt(JSON.stringify(r['application']['params']['global-state'][4]['value'][`uint`]));
        // setclsdt(JSON.stringify(r['application']['params']['global-state'][5]['value'][`uint`]));
        // setgoal(JSON.stringify(r['application']['params']['global-state'][6]['value'][`uint`]));
        // setescrow(JSON.stringify(r['application']['params']['global-state'][7]['value'][`bytes`]));

        for (let i = 0; i <= 8; i++) { 

                        if(appArgsRet[i] == '"Q3JlYXRvcg=="'){
                            let creatorAddress_c =  JSON.stringify(await appById['application']['params']['global-state'][i]['value'][`bytes`]);
                             //console.log("creator address", creatorAddress_c)
                            let dec = new Uint8Array(Buffer.from(creatorAddress_c, "base64"));
                            let addr = algosdk.encodeAddress(dec);
                            setCreator(addr);
                        }
                        else if(appArgsRet[i] == '"RnVuZENsb3NlRGF0ZQ=="'){
                            let closeDate_c = JSON.stringify(await appById['params']['global-state'][i]['value'][`uint`]);
                            setclsdt(JSON.stringify(await appById['application']['params']['global-state'][i]['value'][`uint`]));
                        }
                        else if(appArgsRet[i] == '"R29hbA=="'){
                            let goalAmount_c = JSON.stringify(await appById['application']['params']['global-state'][i]['value'][`uint`]);
                            setgoal(goalAmount_c);
                        }
                        else if(appArgsRet[i] == '"UmVjZWl2ZXI="'){
                            let recv_c = JSON.stringify(await appById['params']['global-state'][i]['value'][`bytes`]);
                            setrec(JSON.stringify(await appById['application']['params']['global-state'][i]['value'][`bytes`]));
                        }
                        else if(appArgsRet[i] == '"U3RhcnREYXRl"'){
                            let startDate_c = JSON.stringify(await appById['application']['params']['global-state'][i]['value'][`uint`]);
                            setstartdt(JSON.stringify(await appById['application']['params']['global-state'][i]['value'][`uint`]));
                        }
                        else if(appArgsRet[i] == '"VG90YWw="'){
                            let total_c = JSON.stringify(await appById['application']['params']['global-state'][i]['value'][`uint`]);
                            settotal(JSON.stringify(await appById['application']['params']['global-state'][i]['value'][`uint`]));
                        }
                        else if(appArgsRet[i] == '"RXNjcm93"'){
                            let escrow_c = JSON.stringify(await appById['application']['params']['global-state'][i]['value'][`bytes`]);
                            setescrow(JSON.stringify(await appById['application']['params']['global-state'][i]['value'][`bytes`]));
                        }
                        let j = i + 1;
                        //  //console.log("time =", j, "then", JSON.stringify(await r['application']['params']['global-state'][6]['value'][`uint`]));
                        //  //console.log("state", goal);
                        //  //console.log("state", JSON.stringify(await r['application']['params']['global-state'][1]['value'][`uint`]));
                        // //let start = JSON.stringify(await r['application']['params']['global-state'][1]['value'][`uint`]);
                        let per = parseFloat((parseFloat(total/1000000)/parseFloat(goal/1000000)) * 100);
                        //  //console.log("----------------total =", total);
                        //  //console.log("----------------per =", per);
                        setPercent(per);
                }


        //return JSON.stringify(r['application']['params']['global-state'][7]['value'][`bytes`], null, 2);
      } catch (e) {
        //console.error(e);
        return JSON.stringify(e, null, 2);
      }
}

useEffect(async() =>{await fetch()},[goal, startdt, enddt, total])

useEffect(async() => {
    await first()
}, [day, hour, min, sec, lock]);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

const first = async () => {

    var us= enddt;
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

const fetch = async () => {
let index = parseInt(appID_global); //current app id need to be entered
setappid(index);
// await readLocalState(algodClient, localStorage.getItem("walletAddress"), index);
await globalState(index);
}

const reload = () => {
    sessionStorage.setItem("reloading", "true");
    window.location.reload(false); 
};

    window.onload = () => {
        let reloading = sessionStorage.getItem("reloading");
        if (reloading) {
            sessionStorage.removeItem("reloading");
            popShow();
        }
    }

const popShow = async () => {
    handleShow();
}

useEffect(async() => {
    await optCheck();
}, [assetOpt, appOpt]);

const optCheck = async () =>
{
let accountInfo = await indexClient.lookupAccountByID(localStorage.getItem("walletAddress")).do();
 //console.log(accountInfo);
let assetCount = accountInfo['account']['assets']['length']
//  //console.log(l);
for(let i = 0; i < assetCount; i++)
{
    if(accountInfo['account']['assets'][i]['asset-id'] === elementID_global)
    {
        setToAssetOpt(true);
        break;
    }
}

const apps = accountInfo['account']['apps-local-state'];
 //console.log("app", apps['length']);
// setAssets(bal['assets']);
let appCount = apps['length'];
//  //console.log(l);
for(let j = 0; j < appCount; j++)
{ 
    if(accountInfo['account']['apps-local-state'][j]['id'] === governance["appID"])
    {
        setToAppOpt(true);
        break;
    }
}

}

useEffect(async() => {
    await countAsset()
}, [algoBalance, elemBalance]);

  const countAsset = async () =>
  {
    let accountInfo = await indexClient.lookupAccountByID(localStorage.getItem("walletAddress")).do();             
    //console.log(accountInfo);
        setAlgoBalance(accountInfo['account']['amount']);
        let l = accountInfo['account']['assets']['length'];

        for(let j = 0; j < l; j++)
        {
            if(accountInfo['account']['assets'][j]['asset-id'] === elementID_global)
            {
                setElemBalance(accountInfo['account']['assets'][j]['amount']);
                break;
            }
        }
        
        const apps = accountInfo['account']['apps-local-state'];
        console.log("inside localstate", apps);
        let appCount = apps['length'];

        for(let j = 0; j < appCount; j++)
        { 
            if(accountInfo['account']['apps-local-state'][j]['id'] === governance["appID"])
            {   // console.log("inside localstate");
            let keyLen = accountInfo['account']['apps-local-state'][j]['key-value']['length'];
            for(let i = 0; i < keyLen; i++)
            {
                if (accountInfo['account']['apps-local-state'][j]['key-value'][i]['key'] === null){
                    // console.log("local-state")
                }
                else if (accountInfo['account']['apps-local-state'][j]['key-value'][i]['key'] === 'YWxnb3NDb21taXQ='){
                    setAlgoCommited(accountInfo['account']['apps-local-state'][j]['key-value'][i]['value']['uint']);
                }
            }
            }
        }        
}

        useEffect(async() => {
            await minBal();
        }, [minAlgo]);

        const minBal = async () =>
        {
            let min = await algodClientGet.accountInformation(localStorage.getItem("walletAddress")).do();
            // console.log("minBalanceApi", min['min-balance']);
            setMinAlgo(min['amount'] - min['min-balance']);
            console.log("minBalance", minAlgo);
            
        }
        
        const voteYesWalletCheck = async () =>
        {
            if(localStorage.getItem("walletName") === "myAlgoWallet")
            {
                await algoVoteYes();
            }
            else if(localStorage.getItem("walletName") === "PeraWallet")
            {
                await algoVoteYesPera(value);
            }
        }
        
        const voteNoWalletCheck = async () =>
        {
            if(localStorage.getItem("walletName") === "myAlgoWallet")
            {
                await algoVoteNo();
            }
            else if(localStorage.getItem("walletName") === "PeraWallet")
            {
                await algoVoteNoPera(value);
            }
        }   

const max = () =>
{
    setValue((parseFloat(minAlgo)/1000000));
}

    return (
        
        <>
        <><ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/></>

            <Card className='card-dash border-0 d-block'>
                <div className="mb-3">
                    <img src={Image} className="w-100 img-fluid rounded-16" alt="post img" />
                </div>

                <div className="post-card-title mb-2 w-100 d-flex align-items-center">
                    <img src={SLogo} width="50" height="50" alt="icon" />
                    <div>
                        <h6 className='m-0'>ALGOS</h6>
                        <span className='d-block'>Algos</span>
                    </div>
                </div>

                <div className="post-card-body mb-3">
                    {/* <div className="d-flex align-items-start justify-content-between">
                        <span>Total Sale</span>
                        <div className="h6 text-end">{totalElem} ELEM</div>
                    </div> */}
                    <div className="d-flex align-items-start justify-content-between">
                        <span>Starts On <br/> Ends On </span>
                        {/* <div className="h6 text-end">{mapStartDate} <small className='d-block'>≈</small></div> */}
                        <strong className="text-end">1-June-2022<br/> 6-June-2022</strong>
                    </div>
                </div>

                <div className="post-card-footer">
                {commitamount === null||commitamount===undefined||commitamount===""  ?(<>
                  
                  <div>
                  <Button className='w-100' onClick={handleShow}>Vote</Button>      
                  </div>
                  
                 
                
                </>):(<>
                  {commitamount[0]===null||commitamount[0]===undefined||commitamount[0]===""  ?(

                    <div>
                  <Button className='w-100' onClick={handleShow}>Vote</Button>      
                  </div>
                ):(
<>
                  {commitamount[0].Vote ==1  ?(
                    <>
                    <div>
                    <Button className='w-100' disabled onClick={handleShow}>Already Voted</Button>      
                    </div>
                    <div className="d-flex align-items-start justify-content-between"> Commited Amount <strong className="text-end"> {commitamount[0].Amount}</strong></div>

                    </> ):(
<div>
<Button className='w-100'  onClick={handleShow}> Vote</Button>      
</div>
                  )}
</>
                )
                  
                }



                  </>)}
                  </div>
            </Card>
            
            <Modal
                show={show}
                size={'md'}
                centered={true}
                onHide={handleClose}
                className="modal-dashboard"
                keyboard={false}
            >
                {/* <><ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/></> */}
                <Modal.Header className='align-items-start mb-0' closeButton>
                    <div className="d-flex flex-wrap align-items-start justify-content-between">
                        <div className="d-flex align-items-center flex-wrap modal-head">
                            

                            {/* {appOpt === false ? <><ButtonLoad loading={loaderAppOpt} variant="primary" className='py-1' onClick={()=>appOptinWalletCheck()} style={{textTransform:"capitalize"}}>App Opt-in</ButtonLoad><p style={{color:"red"}}>(Please Opt-In App to Participate)</p></> : <></>} */}
                    
                            {/* <span>(Opt-in only one time)</span> */}
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body className='mt-0 p-0'>
                    <center>
                        <div className="text-center mb-20">
                        <img src={Logo} width="120" alt="logo" />
                        </div>                   
                    <div className="d-flex align-items-start justify-content-between">
                        <div className='d-flex flex-column'>
                        {/* <strong className="p">Exchange Rate</strong>
                            <div className="h6 mb-10">1 ALGO = 2 ELEM</div> */}
                            <strong className="p mb-10">Question goes here?</strong>
                        </div>

                        </div>

                        <div className='mb-20'>
                        <InputGroup>
                                <FormControl
                                    // disabled={true}
                                    value={value}
                                    type='number'
                                    placeholder="0.00"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    onChange={(e) => setValue(e.target.value)}
                                />
                            </InputGroup>

                        </div>

                    <div className="">

                    <div className="mb-10">
                        <Row>
                            <Col xs="6">
                                <ButtonLoad loading={loaderParticipate} variant="primary" className='mb-10 btn-blue w-100 py-1' onClick={()=>voteYesWalletCheck()} style={{textTransform:"capitalize"}}>YES</ButtonLoad>
                            </Col>
                            <Col xs="6">
                                <ButtonLoad loading={loaderAssetOpt} variant="primary" className='mb-10 btn-blue w-100 py-1' onClick={()=>voteNoWalletCheck()} style={{textTransform:"capitalize"}}>NO</ButtonLoad>
                            </Col>
                        </Row>
                    </div>
                    </div>

                    <div className='d-flex align-items-center justify-content-between'>
                        {/* <strong className="mb-0">Total Allocation</strong> */}
                        <strong className="p">Commited Algos</strong>
                        <div className="h6 mb-0">{(parseFloat(algoCommited)/1000000).toFixed(2) === 'NaN' ?<>0.00</> :(parseFloat(algoCommited)/1000000).toFixed(2)}&nbsp; Algos</div>
                        {/* <div className="h6 mb-0">{totalElem} ELEM</div> */}
                        {/* <strong>ELEM</strong> */}
                    </div>
                    </center>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default PostCardElem;