import React, { Component, useState, useEffect, useContext, useRef } from 'react';
import { Modal, Button, ProgressBar, Form, InputGroup, Card, FormControl, Row, Col } from 'react-bootstrap';

import { useHistory } from "react-router-dom";
import Image from '../../../assets/images/element_banner_sale.png';
import Icon from '../../../assets/images/post-icon-1.png';
import Logo from '../../../assets/images/PlanetWatch.png';
import SLogo from '../../../assets/images/planet.png';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import ReactDomServer from 'react-dom/server';
import ButtonLoad from 'react-bootstrap-button-loader'
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
// import {appOptinLaunchpad, assetOptinLaunchpad, donateLaunchpad} from '../apicallfunction';
import '../../toast-style-override.css'
// import launchpadDetails from './launchpad.json';
import node from '../nodeapi.json';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import { updatealgobalance } from "../../formula";
import governance from "../governance.json";
import firebase from '../../../NFTFolder/firebase';
const algosdk = require('algosdk');
const myAlgoWallet = new MyAlgoConnect();
const bridge = "https://bridge.walletconnect.org";
const PostCard = () => {
    let history=useHistory();
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

    const [appOpt,setToAppOpt] = useState(false);
    const [assetOpt,setToAssetOpt] = useState(false);
    // const [show, setShow] = useState(false);
    const [value, setValue] = React.useState('');
    const [algoBalance, setAlgoBalance] = useState("");
    const [planetCommited, setPlanetCommited] = useState("");
    
    const [minAlgo, setMinAlgo] = useState("");
    const [commitamount,setcommitamount] = useState("");
    const [votestatus,setvotestatus] = useState("");
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
              // setvotestatus(r[0]["Vote"]);                               
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

    const planetVoteYes =async () => {
        handleShowLoadParticipate();
        handleCloseDonate();
        if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideLoadParticipate();
        }
        else if(commitamount===""||commitamount===null ||commitamount===undefined){
          toast.warn("Loading..");
        }
        else{
            if(commitamount[0]===""||commitamount[0]===null ||commitamount[0]===undefined){
                toast.warn("Loading..");
            }
            else{

            if(parseFloat(minAlgo) < (2000))
            {
                toast.error("Your Algo balance is low.")
                handleHideLoadParticipate();
            }
            else
            {

        let index = parseInt(governance['appID']);

    
        try {

          const params = await algodClient.getTransactionParams().do();
    
          let appArgs1 = [];
          appArgs1.push(new Uint8Array(Buffer.from("VotedYes")));

          let sender = localStorage.getItem("walletAddress");

          let transaction1 = algosdk.makeApplicationNoOpTxnFromObject({
            from:sender, 
            suggestedParams: params, 
            appIndex: index, 
            appArgs: appArgs1
          })                    
          
          
          let transaction2 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: sender, 
            to: governance["yesAddress"], 
            amount: 0,
            assetIndex: governance["planetID"], 
            suggestedParams: params
           });

          const groupID = algosdk.computeGroupID([ transaction1, transaction2 ]);
          const txs = [ transaction1, transaction2 ];
          txs[0].group = groupID;
          txs[1].group = groupID;

          const signedTx1 = await myAlgoWallet.signTransaction([txs[0].toByte(), txs[1].toByte()]);

      const response = await algodClient.sendRawTransaction([signedTx1[0].blob, signedTx1[1].blob]).do();
      // //console.log("TxID", JSON.stringify(response, null, 1));
      //API for Connect wallet  stored in /lpTracker
    //   await donateLaunchpad(localStorage.getItem("walletAddress"), amount);
      //API end
      await waitForConfirmation(algodClient, response.txId);
      let ref2=firebase.database().ref(`Registeruser/${localStorage.getItem("walletAddress")}`);  
    //   let dateset=new Date().toDateString();  
    //   const db = ref2.push().key;                      
      ref2.update({
          id:commitamount[0].id,
          
         
          WalletAddress:commitamount[0].WalletAddress,
          TimeStamp:commitamount[0].TimeStamp,
          Amount:commitamount[0].Amount,
          Eligibility:commitamount[0].Eligibility,
          Assettype:commitamount[0].Assettype,
          Vote:1,
          Decision:"YES",
          transId:response.txId
         })
          .then(()=>{ 
            window.location.reload(false);
          }).catch((err) => {                                    
             
          });         
      await countAsset();
        } catch (err) {
          toast.error(`Transaction Failed due to ${err}`);
          handleHideLoadParticipate();
          console.error(err);
        }
}
        }
    }
    }

    const planetVoteYesPera =async () => {
        const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
        setConnector(connector);
        handleShowLoadParticipate();
        handleCloseDonate();
        if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideLoadParticipate();
        }
        else if(commitamount===""||commitamount===null ||commitamount===undefined){
          toast.warn("Loading..");
        }
        else{
            if(commitamount[0]===""||commitamount[0]===null ||commitamount[0]===undefined){
                toast.warn("Loading..");
            }
            else{
            if(parseFloat(minAlgo) < (2000))
            {
                toast.error("Your Algo balance is low.")
                handleHideLoadParticipate();
            }
            else
            {
        let index = parseInt(governance['appID']);  
        try {

          const params = await algodClient.getTransactionParams().do();
    
          let appArgs1 = [];
          appArgs1.push(new Uint8Array(Buffer.from("VotedYes")));

          let sender = localStorage.getItem("walletAddress");

          let transaction1 = algosdk.makeApplicationNoOpTxnFromObject({
            from:sender, 
            suggestedParams: params, 
            appIndex: index, 
            appArgs: appArgs1
          })                    
          
          
          let transaction2 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: sender, 
            to: governance["yesAddress"], 
            amount: 0,
            assetIndex: governance["planetID"], 
            suggestedParams: params
           });

          const groupID = algosdk.computeGroupID([ transaction1, transaction2 ]);
          const txs = [ transaction1, transaction2 ];
          txs[0].group = groupID;
          txs[1].group = groupID;

        //   const signedTx4 = algosdk.signLogicSigTransaction(txs[3].toByte());
                      // time to sign . . . which we have to do with walletconnect
                      const txns = [txs[0], txs[1]]
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
                         let response = await algodClient.sendRawTransaction(decodedResult).do();
      await waitForConfirmation(algodClient, response.txId);
      let ref2=firebase.database().ref(`Registeruser/${localStorage.getItem("walletAddress")}`);  
    //   let dateset=new Date().toDateString();  
    //   const db = ref2.push().key;                      
      ref2.update({
          id:commitamount[0].id,
          
         
          WalletAddress:commitamount[0].WalletAddress,
          TimeStamp:commitamount[0].TimeStamp,
          Amount:commitamount[0].Amount,
          Eligibility:commitamount[0].Eligibility,
          Assettype:commitamount[0].Assettype,
          Vote:1,
          Decision:"YES",
          transId:response.txId

         })
          .then(()=>{ 
            window.location.reload(false);
          }).catch((err) => {                                    
             
          });         
      await countAsset();
        } catch (err) {
          handleHideLoadParticipate();
          toast.error(`Transaction Failed due to ${err}`);
          console.error(err);
        }
}
}
        }
    }

    const planetVoteNo =async () => {
        handleShowLoadAssetOpt();
        handleCloseDonate();
        if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideLoadAssetOpt();
        }
        else if(commitamount===""||commitamount===null ||commitamount===undefined){
            toast.err("please wait");
          }
        else{
            if(commitamount[0]===""||commitamount[0]===null ||commitamount[0]===undefined){
                toast.err("please wait");
            }
            else{

            if(parseFloat(minAlgo) < (2000))
            {
                toast.error("Your Algo balance is low.")
                handleHideLoadAssetOpt();
            }
            else
            {

        let index = parseInt(governance['appID']);

    
        try {

          const params = await algodClient.getTransactionParams().do();
    
          let appArgs1 = [];
          appArgs1.push(new Uint8Array(Buffer.from("VotedNo")));

          let sender = localStorage.getItem("walletAddress");

          let transaction1 = algosdk.makeApplicationNoOpTxnFromObject({
            from:sender, 
            suggestedParams: params, 
            appIndex: index, 
            appArgs: appArgs1
          })                    
          
          let transaction2 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: sender, 
            to: governance["noAddress"], 
            amount: 0,
            assetIndex: governance["planetID"], 
            suggestedParams: params
           });

          const groupID = algosdk.computeGroupID([ transaction1, transaction2 ]);
          const txs = [ transaction1, transaction2 ];
          txs[0].group = groupID;
          txs[1].group = groupID;

          const signedTx1 = await myAlgoWallet.signTransaction([txs[0].toByte(), txs[1].toByte()]);

      const response = await algodClient.sendRawTransaction([signedTx1[0].blob, signedTx1[1].blob]).do();
      // //console.log("TxID", JSON.stringify(response, null, 1));
      //API for Connect wallet  stored in /lpTracker
    //   await donateLaunchpad(localStorage.getItem("walletAddress"), amount);
      //API end
      await waitForConfirmation(algodClient, response.txId);
      let ref2=firebase.database().ref(`Registeruser/${localStorage.getItem("walletAddress")}`);  
      ref2.update({
        id:commitamount[0].id,
        
       
        WalletAddress:commitamount[0].WalletAddress,
        TimeStamp:commitamount[0].TimeStamp,
        Amount:commitamount[0].Amount,
        Eligibility:commitamount[0].Eligibility,
        Assettype:commitamount[0].Assettype,
        Vote:1,
        Decision:"NO",
        transId:response.txId

       })
        .then(()=>{ 
          window.location.reload(false);
        }).catch((err) => {                                    
           
        });    
      await countAsset();
    //   toast.success(`Transaction Successfully completed with ${response.txId}`);
    //   //toast.info(`Now you have obtained Element amount = ( ${(parseFloat(Pop_amount) * 2).toFixed(2)} ELEM )`);
        } catch (err) {
          toast.error(`Transaction Failed due to ${err}`);
          handleHideLoadAssetOpt();
          console.error(err);
        }
}
        }
    }
    }

    const planetVoteNoPera =async () => {
        const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
        setConnector(connector);
        handleShowLoadAssetOpt();
        handleCloseDonate();
        if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideLoadAssetOpt();
        }
        else if(commitamount===""||commitamount===null ||commitamount===undefined){
            toast.err("please wait");
          }
        else{
            if(commitamount[0]===""||commitamount[0]===null ||commitamount[0]===undefined){
                toast.err("please wait");
            }
            else{

            if(parseFloat(minAlgo) < (2000))
            {
                toast.error("Your Algo balance is low.")
                handleHideLoadAssetOpt();
            }
            else
            {

        let index = parseInt(governance['appID']);

    
        try {

          const params = await algodClient.getTransactionParams().do();
    
          let appArgs1 = [];
          appArgs1.push(new Uint8Array(Buffer.from("VotedNo")));

          let sender = localStorage.getItem("walletAddress");

          let transaction1 = algosdk.makeApplicationNoOpTxnFromObject({
            from:sender, 
            suggestedParams: params, 
            appIndex: index, 
            appArgs: appArgs1
          })                    
          
          let transaction2 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: sender, 
            to: governance["noAddress"], 
            amount: 0,
            assetIndex: governance["planetID"], 
            suggestedParams: params
           });

          const groupID = algosdk.computeGroupID([ transaction1, transaction2 ]);
          const txs = [ transaction1, transaction2 ];
          txs[0].group = groupID;
          txs[1].group = groupID;

        //   const signedTx4 = algosdk.signLogicSigTransaction(txs[3].toByte());
                      // time to sign . . . which we have to do with walletconnect
                      const txns = [txs[0], txs[1]]
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
                         let response = await algodClient.sendRawTransaction(decodedResult).do();
                         await waitForConfirmation(algodClient, response.txId);

      let ref2=firebase.database().ref(`Registeruser/${localStorage.getItem("walletAddress")}`);  
      ref2.update({
        id:commitamount[0].id,
        
       
        WalletAddress:commitamount[0].WalletAddress,
        TimeStamp:commitamount[0].TimeStamp,
        Amount:commitamount[0].Amount,
        Eligibility:commitamount[0].Eligibility,
        Assettype:commitamount[0].Assettype,
        Vote:1,
        Decision:"NO",
        transId:response.txId

       })
        .then(()=>{ 
          window.location.reload(false);
        }).catch((err) => {                                    
           
        });    
      await countAsset();
        } catch (err) {
          handleHideLoadParticipate();
          toast.error(`Transaction Failed due to ${err}`);
          console.error(err);
        }
}
}
        }
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
}, [algoBalance]);

  const countAsset = async () =>
  {
    let accountInfo = await indexClient.lookupAccountByID(localStorage.getItem("walletAddress")).do();             
    //console.log(accountInfo);
        setAlgoBalance(accountInfo['account']['amount']);
        let l = accountInfo['account']['assets']['length'];
        
        const apps = accountInfo['account']['apps-local-state'];
        // console.log("inside localstate", apps);
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
                else if (accountInfo['account']['apps-local-state'][j]['key-value'][i]['key'] === 'cGxhbmV0Q29tbWl0'){
                    setPlanetCommited(accountInfo['account']['apps-local-state'][j]['key-value'][i]['value']['uint']);
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
                await planetVoteYes();
            }
            else if(localStorage.getItem("walletName") === "PeraWallet")
            {
                await planetVoteYesPera(value);
            }
        }
        
        const voteNoWalletCheck = async () =>
        {
            if(localStorage.getItem("walletName") === "myAlgoWallet")
            {
                await planetVoteNo();
            }
            else if(localStorage.getItem("walletName") === "PeraWallet")
            {
                await planetVoteNoPera(value);
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
                        <h6 className='m-0'>PLANETS</h6>
                        <span className='d-block'>Planets</span>
                    </div>
                </div>

                <div className="post-card-body mb-3">
                    <div className="d-flex align-items-start justify-content-between">
                        <span>Starts On <br/> Ends On </span>
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
                <Modal.Header className='align-items-start' closeButton>
                    <div className="d-flex flex-wrap align-items-start justify-content-between">
                        <div className="d-flex align-items-center flex-wrap modal-head">
                            <img src={Logo} height="40" width="100" alt="logo" />

                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body className='p-0'>
                    {/* <Button className='modal-close' onClick={handleClose} variant='reset'>
                        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="1">
                            <path d="M17.5004 32.0832C9.44597 32.0832 2.91699 25.5542 2.91699 17.4998C2.91699 9.44546 9.44597 2.9165 17.5004 2.9165C25.5548 2.9165 32.0837 9.44546 32.0837 17.4998C32.0837 25.5542 25.5548 32.0832 17.5004 32.0832ZM17.5004 29.1665C20.5946 29.1665 23.562 27.9373 25.75 25.7494C27.9379 23.5615 29.1671 20.594 29.1671 17.4998C29.1671 14.4056 27.9379 11.4382 25.75 9.25026C23.562 7.06233 20.5946 5.83317 17.5004 5.83317C14.4062 5.83317 11.4387 7.06233 9.25076 9.25026C7.06283 11.4382 5.83367 14.4056 5.83367 17.4998C5.83367 20.594 7.06283 23.5615 9.25076 25.7494C11.4387 27.9373 14.4062 29.1665 17.5004 29.1665ZM17.5004 15.4378L21.6245 11.3121L23.6881 13.3757L19.5625 17.4998L23.6881 21.624L21.6245 23.6875L17.5004 19.5619L13.3762 23.6875L11.3126 21.624L15.4383 17.4998L11.3126 13.3757L13.3762 11.3121L17.5004 15.4378Z" fill="white"/>
                            </g>
                        </svg>
                    </Button> */}
                    <center>                   
                    <div className="d-flex align-items-start justify-content-between">
                        <div className='d-flex flex-column'>

                            <strong className="p mb-20">Question goes here?</strong>
                        </div>
                        </div>

                    <div className="d-flex align-items-start justify-content-between">

                    <div className="mb-10 d-flex flex-column align-items-end">
                        <Row>
                            <Col>
                                <ButtonLoad loading={loaderParticipate} variant="primary" className='mb-10 py-1' onClick={()=>voteYesWalletCheck()} style={{textTransform:"capitalize"}}>YES</ButtonLoad>
                            </Col>
                            <Col>
                                <ButtonLoad loading={loaderAssetOpt} variant="primary" className='mb-10 py-1' onClick={()=>voteNoWalletCheck()} style={{textTransform:"capitalize"}}>NO</ButtonLoad>
                            </Col>
                        </Row>
                    </div>
                    </div>

                    <div className="d-flex align-items-start justify-content-between">
                        <div className='d-flex flex-column'>
                            <strong className="p">Commited Planets</strong>
                            <div className="h6 mb-10">{(parseFloat(planetCommited)/1000000).toFixed(2) === 'NaN' ?<>0.00</> :(parseFloat(planetCommited)/1000000).toFixed(2)}&nbsp; PLANETS</div>
                        </div>
                    </div>
                    </center>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default PostCard;