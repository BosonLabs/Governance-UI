import React, { useState, useEffect } from 'react';
import { Alert, Button, Card, Col, Container, OverlayTrigger, Row, Tab, Tabs, Tooltip, InputGroup, FormControl, Modal } from 'react-bootstrap';
import Layout from './LayoutT';
import { Link } from 'react-router-dom';
import planetLogo from '../../assets/images/planet.png';
import AlgoLogo from '../../assets/images/Algo.png';
import ButtonLoad from 'react-bootstrap-button-loader';
import { updatealgobalance } from "../formula";
import governance from "./governance.json"
// import { Registeruser } from '../../firedbstore';
import firebase from '../../NFTFolder/firebase';

import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';

import elemLogo from '../../assets/images/elem-original.png';
import tauLogo from '../../assets/images/tau-original.png';
import einrLogo from '../../assets/images/EINR-original.png';
import mintDetails from '../Dashboard/stablecoin.json';
import usdcLogo from '../../assets/images/usdc-logo.png';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import node from './nodeapi.json'
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";


const algosdk = require('algosdk');
const myAlgoWallet = new MyAlgoConnect();
const bridge = "https://bridge.walletconnect.org";

const Stablecoin = () => {

    useEffect(() => {
        document.title = "PLANET WATCH | REGISTER"
    }, [])

    const [show, setShow] = useState(true);
    const [connector, setConnector] = useState("");

    const [cRatioUpdateShow, setCRatioUpdateShow] = useState(false);

    const handleCRatioUpdateShow = () => setCRatioUpdateShow(true);
    const handleCRatioUpdateClose = () => setCRatioUpdateShow(false);

    const [cRatioUpdateShowEinr, setCRatioUpdateShowEinr] = useState(false);

    const handleCRatioUpdateShowEinr = () => setCRatioUpdateShowEinr(true);
    const handleCRatioUpdateCloseEinr = () => setCRatioUpdateShowEinr(false);

    const [cRatioLoad, setcRatioLoad] = useState(false);

    const handleShowcRatioLoad = () => setcRatioLoad(true);
    const handleHidecRatioLoad = () => setcRatioLoad(false);

    const [loadMint, setLoadMint] = useState(false);

    const handleShowMint = () => setLoadMint(true);
    const handleHideMint = () => setLoadMint(false);

    const [loadAppOpt, setLoadAppOpt] = useState(false);

    const handleShowAppOpt = () => setLoadAppOpt(true);
    const handleHideAppOpt = () => setLoadAppOpt(false);

    const [loadAppOptDynamic, setLoadAppOptDynamic] = useState(false);

    const handleShowAppOptDynamic = () => setLoadAppOptDynamic(true);
    const handleHideAppOptDynamic = () => setLoadAppOptDynamic(false);

    const [loadAssetOptTau, setLoadAssetOptTau] = useState(false);

    const handleShowAssetOptTau = () => setLoadAssetOptTau(true);
    const handleHideAssetOptTau = () => setLoadAssetOptTau(false);

    const [loadAssetOptEinr, setLoadAssetOptEinr] = useState(false);

    const handleShowAssetOptEinr = () => setLoadAssetOptEinr(true);
    const handleHideAssetOptEinr = () => setLoadAssetOptEinr(false);    
    
    const [prerequisiteShow, setLoadPrerequisite] = useState(false);

    const handlePrerequisiteShow = () => setLoadPrerequisite(true);
    const handlePrerequisiteClose = () => setLoadPrerequisite(false);

    const [usdcAmount, setUsdcAmount ] = useState();
    const [elemAmount, setElemAmount ] = useState();
    const [planetAmount, setPlanetAmount ] = useState();
    const [algoAmount, setAlgoAmount ] = useState();
    const [tauAmount, setTauAmount ] = useState();
    const [usdcAmountEinr, setUsdcAmountEinr ] = useState();
    const [elemAmountEinr, setElemAmountEinr ] = useState();
    const [einrAmount, setEinrAmount ] = useState();

    const [assets, setAssets] = useState("");
    const [usdcLock, setUsdcLock] = useState("");
    const [assetEinrOpt, setAssetEinrOpt] = useState(false);
    const [assetTauOpt, setAssetTauOpt] = useState(false);
    const [appOpt, setAppOpt] = useState(false);
    const [appOptDynamic, setAppOptDynamic] = useState(false);

    const [planetBalances, setPlanetBalances] = useState("");
    const [algoBalances, setAlgoBalances] = useState("");
    const [elemBalances, setElemBalances] = useState("");
    const [tauBalances, setTauBalances] = useState("");
    const [EinrBalances, setEinrBalances] = useState("");
    const [einrCir, setEinrCir] = useState("");
    const [tauCir, setTauCir] = useState("");

    const [minAlgo, setMinAlgo] = useState("");
    const [C_Percent, setC_Percent] = useState();
    const [usdcPrice, setUsdcPrice] = useState();
    const [elemPrice, setElemPrice] = useState();
    const [cRatioValue, setCRatioValue] = useState();
    const [commitamount,setcommitamount] = useState("");
    //Einr states

    const [C_PercentEinr, setC_PercentEinr] = useState();
    const [usdcPriceEinr, setUsdcPriceEinr] = useState();
    const [elemPriceEinr, setElemPriceEinr] = useState();
    const [einrPrice, setEinrPrice] = useState();
    const [cRatioValueEinr, setCRatioValueEinr] = useState();

    let appID_global = mintDetails.dynamicStablecoinAppIdEinr;
    let tauID = mintDetails.tauID;
    let einrID = mintDetails.einrID;
    let elemID = mintDetails.elemID;
    let usdcID = mintDetails.usdcID;
    let totalSupply = 18446744073709551615;
    let elemReserve = mintDetails.rebaseReserveAddress;
    let elemTreasury = mintDetails.rebaseElemTreasury;

    let appID_dynamic = mintDetails.dynamicStablecoinAppID;

    // const algosdk = require('algosdk');
    // const baseServer = 'https://testnet-algorand.api.purestake.io/ps2';
    // const port = '';
    
    // const token = {
    //    'X-API-Key': 'pOD5BAUCxq7InVPjo0sO01B0Vq4d7pD1ask5Ix43'
    // }
    
    const algodClientGet = new algosdk.Algodv2('', node['algodclient'], '');
    
        const algodClient = new algosdk.Algodv2('', node['algodclient'], '');
        const indexClient = new algosdk.Indexer('', node['indexerclient'], '');

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
     }

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
          }
          else{
            setcommitamount([""]);  
          }
          setcommitamount(r);
          setAlgoAmount(r[0].algoAmount);
               
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
              //// console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
            //   toast.success(`Transaction Successful with ${txId}`);
            //   toast.success(`Transaction ${txId} confirmed in round ${pendingInfo["confirmed-round"]}`);
              let id = "https://testnet.algoexplorer.io/tx/" + txId;
              toast.success(toastDiv(id));
              handleHideMint();
              handleHideAppOpt();
              handleHideAppOptDynamic();
              handleHidecRatioLoad();
              handleHideAssetOptTau();
              handleHideAssetOptEinr();
              handleHidecRatioLoad();
              await updatealgobalance();
            //   await sleep(5000);
            //   reload();
              break;
            }
            lastRound++;
            await client.statusAfterBlock(lastRound).do();
          }
        };  
        
        useEffect(async() => {
            await globalState();
        }, [C_Percent, usdcPrice, elemPrice]);
        
        const globalState = async () =>
        {
            let appGlobalStateGet = await algodClientGet.getApplicationByID(appID_dynamic).do();
            // console.log("app", appGlobalStateGet['params']['global-state']);
            let appGlobalState = appGlobalStateGet['params']['global-state'];
            let appGlobalStateCount = appGlobalStateGet['params']['global-state']['length'];
            for(let i = 0; i < appGlobalStateCount; i++)
            {
                if(appGlobalState[i]['key'] === "Q19SYXRpbw==")
                {
                    setC_Percent(parseFloat(appGlobalState[i]['value']['uint'])/1000000);
                    // console.log("C_Percent", parseFloat(appGlobalState[i]['value']['uint'])/1000000);
                }
                if(appGlobalState[i]['key'] === "dXNkY1ByaWNl")
                {
                    setUsdcPrice(parseFloat(appGlobalState[i]['value']['uint'])/1000000);
                    // console.log("usdcPrice", parseFloat(appGlobalState[i]['value']['uint'])/1000000);
                }
                if(appGlobalState[i]['key'] === "ZWxlbVByaWNl")
                {
                    setElemPrice(parseFloat(appGlobalState[i]['value']['uint'])/1000000);
                    // console.log("elemPrice", parseFloat(appGlobalState[i]['value']['uint'])/1000000);
                }
            }
        }

        useEffect(async() => {
            await globalStateEinr();
        }, [C_PercentEinr, usdcPriceEinr, elemPriceEinr]);
        
        const globalStateEinr = async () =>
        {
            let appGlobalStateGet = await algodClientGet.getApplicationByID(appID_global).do();
            // console.log("app", appGlobalStateGet['params']['global-state']);
            let appGlobalState = appGlobalStateGet['params']['global-state'];
            let appGlobalStateCount = appGlobalStateGet['params']['global-state']['length'];
            for(let i = 0; i < appGlobalStateCount; i++)
            {
                if(appGlobalState[i]['key'] === "Q19SYXRpbw==")
                {
                    setC_PercentEinr(parseFloat(appGlobalState[i]['value']['uint'])/1000000);
                    // console.log("C_PercentEinr", parseFloat(appGlobalState[i]['value']['uint'])/1000000);
                }
                if(appGlobalState[i]['key'] === "dXNkY1ByaWNl")
                {
                    setUsdcPriceEinr(parseFloat(appGlobalState[i]['value']['uint'])/1000000);
                    // console.log("usdcPrice", parseFloat(appGlobalState[i]['value']['uint'])/1000000);
                }
                if(appGlobalState[i]['key'] === "ZWxlbVByaWNl")
                {
                    setElemPriceEinr(parseFloat(appGlobalState[i]['value']['uint'])/1000000);
                    // console.log("elemPrice", parseFloat(appGlobalState[i]['value']['uint'])/1000000);
                }
                if(appGlobalState[i]['key'] === "ZWluclByaWNl")
                {
                    setEinrPrice(parseFloat(appGlobalState[i]['value']['uint'])/1000000);
                    // console.log("elemPrice", parseFloat(appGlobalState[i]['value']['uint'])/1000000);
                }
            }
        }

        useEffect(async () => {
            await balAsset();
        }, [assets, planetBalances, elemBalances]);
        
        const balAsset = async () =>
        {
        let bal = await indexClient.lookupAccountByID(localStorage.getItem("walletAddress")).do();
        let l = 0;
        if(bal['account']['assets'])
        {
        l = bal['account']['assets']['length'];
        }
        // // console.log(bal['account']['assets']);
        for(let i = 0; i < l; i++)
        {
            if(bal['account']['assets'])
            {
            if(bal['account']['assets'][i]['asset-id'] === governance["planetID"])
            {
                setPlanetBalances(bal['account']['assets'][i]['amount']);
                break;
            }
            }
        }
        for(let j = 0; j < l; j++)
        {
            if(bal['account']['assets'][j]['asset-id'] === elemID)
            {
                setElemBalances(bal['account']['assets'][j]['amount']);
                break;
            }
        }
        
        // setAssets(bal['account']['assets']);
        }

        useEffect(async() => {
            await cir();
        }, [tauCir, einrCir, usdcLock]);

        const cir =async () =>
        {
            let escrow = await indexClient.lookupAccountByID(mintDetails.swapTauEscrowAddress).do();            
        let eL = escrow['account']['assets']['length'];
        // setUsdcLock();
        for(let i = 0; i < eL; i++)
        {
            if(escrow['account']['assets'][i]['asset-id'] === usdcID)
            {
                setUsdcLock(escrow['account']['assets'][i]['amount']);
                break;
            }
        }
        // // console.log(l);
        for(let k = 0; k < eL; k++)
        {
            if(escrow['account']['assets'][k]['asset-id'] === tauID)
            {
                setTauCir(escrow['account']['assets'][k]['amount']);
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
        }

const optInApp = async () => 
{
    handleShowAppOpt();
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideAppOpt();
        }
        else{
            if(parseFloat(minAlgo) < 101000 + 228000)
            {
                toast.error("Your Algo balance is low.")
                handleHideAppOpt();
            }
            else
            {        
    let params = await algodClient.getTransactionParams().do();
        
    try {
        
      const txn = algosdk.makeApplicationOptInTxnFromObject({
          suggestedParams:params,
          from: localStorage.getItem("walletAddress"),
          appIndex: parseInt(governance["appID"]),
      });
  
      const signedTxn = await myAlgoWallet.signTransaction(txn.toByte());
      //toast.info("Transaction in Progress");
      const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
      await waitForConfirmation(algodClient, response.txId);
      setAppOpt(true);
      await minBal();
    //   toast.success(`Transaction Success ${response.txId}`);
  }
  catch (err) {
      handleHideAppOpt();
      toast.error(`Transaction Failed due to ${err}`);
      console.error(err);
  }
}
}
}

const optInAppPera = async () => 
{
    const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
    setConnector(connector);
    handleShowAppOpt();
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideAppOpt();
        }
        else{
            if(parseFloat(minAlgo) < 101000 + 171000)
            {
                toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
                handleHideAppOpt();
            }
            else
            {        
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
      setAppOpt(true);
      await minBal();
    //   toast.success(`Transaction Success ${response.txId}`);
  }
  catch (err) {
      handleHideAppOpt();
      toast.error(`Transaction Failed due to ${err}`);
      console.error(err);
  }
}
}
}

const optInAppDynamic = async () => 
{
    handleShowAppOptDynamic();
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideAppOptDynamic();
        }
        else{
            if(parseFloat(minAlgo) < 101000)
            {
                toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
                handleHideAppOptDynamic();
            }
            else
            {        
    let params = await algodClient.getTransactionParams().do();
        
    try {
  
      const txn = algosdk.makeApplicationOptInTxnFromObject({
          suggestedParams:params,
          from: localStorage.getItem("walletAddress"),
          appIndex: parseInt(appID_dynamic),
      });
  
      const signedTxn = await myAlgoWallet.signTransaction(txn.toByte());
      //toast.info("Transaction in Progress");
      const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
      await waitForConfirmation(algodClient, response.txId);
      setAppOptDynamic(true);
      await minBal();
    //   toast.success(`Transaction Success ${response.txId}`);
  }
  catch (err) {
      handleHideAppOptDynamic();
      toast.error(`Transaction Failed due to ${err}`);
      console.error(err);
  }
}
}
}

const optInAppDynamicPera = async () => 
{
    const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
    setConnector(connector);
    handleShowAppOpt();
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideAppOpt();
        }
        else{
            if(parseFloat(minAlgo) < 101000)
            {
                toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
                handleHideAppOpt();
            }
            else
            {        
    let params = await algodClient.getTransactionParams().do();
        
    try {
  
      const txn = algosdk.makeApplicationOptInTxnFromObject({
          suggestedParams:params,
          from: localStorage.getItem("walletAddress"),
          appIndex: parseInt(appID_dynamic),
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
      setAppOptDynamic(true);
      await minBal();
    //   toast.success(`Transaction Success ${response.txId}`);
  }
  catch (err) {
      handleHideAppOpt();
      toast.error(`Transaction Failed due to ${err}`);
      console.error(err);
  }
}
}
}

const optInTauAsset = async () => 
{
    handleShowAssetOptTau();
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideAssetOptTau();
        }
        else{
            if(parseFloat(minAlgo) < 101000)
            {
                toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
                handleHideAssetOptTau();
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
          assetIndex: parseInt(tauID)
      });
  
      const signedTxn = await myAlgoWallet.signTransaction(txn.toByte());
    //toast.info("Transaction in Progress");
      const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
      await waitForConfirmation(algodClient, response.txId);
      setAssetTauOpt(true);
      await minBal();
    //   toast.success(`Transaction Success ${response.txId}`);
  
  }
  catch (err) {
      toast.error(`Transaction Failed due to ${err}`);
      handleHideAssetOptTau();
      console.error(err);
  
  }
}
        }
}

const optInTauAssetPera = async () => 
{
    const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
    setConnector(connector);
    handleShowAssetOptTau();
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideAssetOptTau();
        }
        else{
            if(parseFloat(minAlgo) < 101000)
            {
                toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
                handleHideAssetOptTau();
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
          assetIndex: parseInt(tauID)
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
      setAssetTauOpt(true);
      await minBal();
    //   toast.success(`Transaction Success ${response.txId}`);
  
  }
  catch (err) {
      toast.error(`Transaction Failed due to ${err}`);
      handleHideAssetOptTau();
      console.error(err);
  
  }
}
        }
}

const optInEinrAsset = async () => 
{
    handleShowAssetOptEinr();
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideAssetOptEinr();
        }
        else{
            if(parseFloat(minAlgo) < 101000)
            {
                toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
                handleHideAssetOptEinr();
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
          assetIndex: parseInt(einrID)
      });
  
      const signedTxn = await myAlgoWallet.signTransaction(txn.toByte());
    //toast.info("Transaction in Progress");
      const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
      await waitForConfirmation(algodClient, response.txId);
      setAssetEinrOpt(true);
      await minBal();
    //   toast.success(`Transaction Success ${response.txId}`);
  }
  catch (err) {
      toast.error(`Transaction Failed due to ${err}`);
      handleHideAssetOptEinr();
      console.error(err);
  
  }
}
        }
}

const optInEinrAssetPera = async () => 
{
    const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
    setConnector(connector);
    handleShowAssetOptEinr();
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideAssetOptEinr();
        }
        else{
            if(parseFloat(minAlgo) < 101000)
            {
                toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
                handleHideAssetOptEinr();
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
          assetIndex: parseInt(einrID)
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
      setAssetEinrOpt(true);
      await minBal();
    //   toast.success(`Transaction Success ${response.txId}`);
  }
  catch (err) {
      toast.error(`Transaction Failed due to ${err}`);
      handleHideAssetOptEinr();
      console.error(err);
  
  }
}
        }
}

const reload = async () => {
    window.location.reload();
}


const mintTau = async () => 
{

    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideMint();
        }
        else{
        if(appOpt === false)
        {
            toast.error("Please Opt-in to App and then Commit");
            handleHideMint();
        }
        else{
            if(assetTauOpt === false)
            {
                toast.error("Please Opt-in PLANET asset and then Commit");
                handleHideMint();
            }
            else{
            if(parseFloat(minAlgo) < 2000)
            {
                toast.error("Your Algo balance is low.");
                handleHideMint();
            }
            else
            {
                if(parseFloat(planetAmount) > parseFloat(planetBalances)/1000000)
                {
                    toast.error(`Insufficient PLANET balance.`+"\n"+`Your balance is ${(parseFloat(planetBalances)/1000000).toFixed(2)} PLANET but trying to enter ${planetAmount} PLANET`);
                    handleHideMint();
                }
                else
                {
                    if(parseFloat(planetAmount) < 1)
                    {
                        toast.error(`Value entered is less than 1 PLANET. Please Enter value equal to 1 or greater than 1`);
                        handleHideMint();
                    }
                    else
                    { 
                try {
                    const params = await algodClient.getTransactionParams().do();
                     //// console.log("address", localStorage.getItem("walletAddress"));
                    let appArgs1 = [];
                    appArgs1.push(new Uint8Array(Buffer.from("CommitPlanet")));
                    appArgs1.push(algosdk.encodeUint64(parseFloat(planetAmount).toFixed(6) * 1000000));
            
                    let transaction1 = algosdk.makeApplicationNoOpTxnFromObject({
                      from:localStorage.getItem("walletAddress"), 
                      suggestedParams: params, 
                      appIndex: parseInt(governance["appID"]), 
                      appArgs: appArgs1
                    })                    
                    
                    let transaction2 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                        from: localStorage.getItem("walletAddress"), 
                        to: governance["creator"], 
                        amount: 0, 
                        assetIndex: parseInt(governance["planetID"]), 
                        suggestedParams: params
                      });
                    
                    const groupID = algosdk.computeGroupID([ transaction1, transaction2 ]);
                    const txs = [ transaction1, transaction2 ];
                    txs[0].group = groupID;
                    txs[1].group = groupID;
            
                    const signedTx1 = await myAlgoWallet.signTransaction([txs[0].toByte(), txs[1].toByte()]);

                const response = await algodClient.sendRawTransaction([signedTx1[0].blob, signedTx1[1].blob]).do();
    //// console.log("TxID", JSON.stringify(response, null, 1));
    await waitForConfirmation(algodClient, response.txId);
    let ref2=firebase.database().ref(`Registeruser/${localStorage.getItem("walletAddress")}`);  
    let dateset=new Date().toDateString();  
    const db = ref2.push().key;                      
    ref2.set({
        id:db,
        WalletAddress:localStorage.getItem("walletAddress"),
        TimeStamp:dateset,Amount:planetAmount,Eligibility:1,Assettype:"Planet",Vote:0})
        .then(()=>{ 
          
        }).catch((err) => {                                    
           
        }); 
    setPlanetAmount("");
    await balAsset();
    await balPrint();
    await globalState();
    await minBal();
    // toast.success(`Transaction Successfully completed with ${response.txId}`);
      } catch (err) {
        handleHideMint();
        toast.error(`Transaction Failed due to ${err}`);
        console.error(err);
      }
    }
}
}
}
}
    }
}

const mintTauPera = async () => 
{
    const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
    setConnector(connector);
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideMint();
        }
        else{
        if(appOpt === false)
        {
            toast.error("Please Opt-in to App and then mint");
            handleHideMint();
        }
        else{
            if(assetTauOpt === false)
            {
                toast.error("Please Opt-in TAU asset and then mint");
                handleHideMint();
            }
            else{
            if(parseFloat(minAlgo) < 6000)
            {
                toast.error("Your Algo balance is low. Please get more Algos from dispenser.");
                handleHideMint();
            }
            else
            {
                if(parseFloat(usdcAmount) > parseFloat(planetBalances)/1000000)
                {
                    toast.error(`Insufficient USDC balance.`+"\n"+`Your balance is ${(parseFloat(planetBalances)/1000000).toFixed(2)} USDC but trying to enter ${usdcAmount} USDC`);
                    handleHideMint();
                }
                else if(parseFloat(elemAmount) > parseFloat(elemBalances)/1000000)
                {
                    toast.error(`Insufficient ELEM balance.`+"\n"+`Your balance is ${(parseFloat(elemBalances)/1000000).toFixed(2)} ELEM but trying to enter ${elemAmount} ELEM`);
                    handleHideMint();
                }
                else
                {
                    if(parseFloat(usdcAmount) <= 0)
                    {
                        toast.error(`Value entered is zero. Please Enter value greater than Zero`);
                        handleHideMint();
                    }
                    else
                    { 
    try {
        // const accounts = await myAlgoWallet.connect();
        // const addresses = accounts.map(account => account.address);
        let tauAmountInside = parseFloat(parseFloat((usdcAmount * usdcPrice) + (elemAmount * elemPrice)).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0]);
        console.log("tauAmount", tauAmountInside);
        const params = await algodClient.getTransactionParams().do();
         //// console.log("address", localStorage.getItem("walletAddress"));
        let appArgs1 = [];
        appArgs1.push(new Uint8Array(Buffer.from("mintTau")));

        let transaction1 = algosdk.makeApplicationNoOpTxnFromObject({
          from:localStorage.getItem("walletAddress"), 
          suggestedParams: params, 
          appIndex: parseInt(appID_dynamic), 
          appArgs: appArgs1
        })                    
        
        let programTau = new Uint8Array(Buffer.from(mintDetails.dynamicStablecoinEscrow, "base64"));          
        let lsigTau = new algosdk.LogicSigAccount(programTau);
        let programElem = new Uint8Array(Buffer.from(mintDetails.elemReserve, "base64"));          
        let lsigElem = new algosdk.LogicSigAccount(programElem);
         //// console.log("Escrow =", lsig.address());
        
        let transaction2 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: localStorage.getItem("walletAddress"), 
            to: lsigTau.address(), 
            amount: parseInt(parseFloat(usdcAmount).toFixed(6) * 1000000), 
            assetIndex: parseInt(usdcID), 
            suggestedParams: params
          });
          // console.log("usdc", parseInt(parseFloat(usdcAmount).toFixed(6) * 1000000));
        let elem25 = (parseFloat(elemAmount * 1000000) * 25)/100; 
        // let floor2 = Math.floor(elem25);
        // // console.log("25% floor =",floor2 * 1000000);
           //// console.log("25% =",elem25 * 1000000);
        let transaction3 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: localStorage.getItem("walletAddress"), 
            to: elemTreasury, 
            amount: parseInt(elem25), 
            assetIndex: parseInt(elemID), 
            suggestedParams: params
          }); 

          let elem75 = (parseFloat(elemAmount * 1000000) * 75)/100; 
          // let floor2 = Math.floor(elem25);
          // // console.log("25% floor =",floor2 * 1000000);
             //// console.log("25% =",elem25 * 1000000);
          let transaction4 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
              from: localStorage.getItem("walletAddress"), 
              to: lsigElem.address(), 
              amount: parseInt(elem75), 
              assetIndex: parseInt(elemID), 
              suggestedParams: params
            }); 
            let tau99 = (parseFloat(tauAmountInside * 1000000) * 99)/100;
          // console.log("elem", parseInt(elem));
          // console.log("tau", tauAmount);
          console.log("tau98", parseInt(tau99)); 
          let transaction5 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: lsigTau.address(), 
            to: localStorage.getItem("walletAddress"), 
            amount: parseInt(tau99), 
            assetIndex: parseInt(tauID), 
            suggestedParams: params
          });
          
          let tau1 = (parseFloat(tauAmountInside * 1000000) * 1)/100;
          // console.log("elem", parseInt(elem));
          // console.log("tau", tauAmount);
          console.log("tau2", parseInt(tau1)); 
          let transaction6 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: lsigTau.address(), 
            to: mintDetails.owner, 
            amount: parseInt(tau1), 
            assetIndex: parseInt(tauID), 
            suggestedParams: params
          });                      
         
        let transaction7 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
          from: localStorage.getItem("walletAddress"), 
          to: lsigTau.address(), 
          amount: 2000, 
           note: undefined,  
           suggestedParams: params
         });
        
        const groupID = algosdk.computeGroupID([ transaction1, transaction2, transaction3, transaction4, transaction5, transaction6, transaction7 ]);
        const txs = [ transaction1, transaction2, transaction3, transaction4, transaction5, transaction6, transaction7 ];
        txs[0].group = groupID;
        txs[1].group = groupID;
        txs[2].group = groupID;
        txs[3].group = groupID;
        txs[4].group = groupID;
        txs[5].group = groupID;
        txs[6].group = groupID;

        let escrow1 = algosdk.signLogicSigTransaction(txs[4], lsigTau);
        let escrow2 = algosdk.signLogicSigTransaction(txs[5], lsigTau);
        // time to sign . . . which we have to do with walletconnect
        const txns = [txs[0], txs[1], txs[2], txs[3], txs[4], txs[5], txs[6]]
        const txnsToSign = txns.map(txn => {
          const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
          // console.log(encodedTxn);
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
      // console.log(result);
      // console.log(escrow.blob);
        // send and await
        decodedResult[4] = escrow1.blob;
        decodedResult[5] = escrow2.blob;
        let response = await algodClient.sendRawTransaction(decodedResult).do();
    await waitForConfirmation(algodClient, response.txId);
    setUsdcAmount("");
    setElemAmount("");
    setTauAmount("");
    await balAsset();
    await balPrint();
    await globalState();
    await minBal();
    // toast.success(`Transaction Successfully completed with ${response.txId}`);
      } catch (err) {
        handleHideMint();
        toast.error(`Transaction Failed due to ${err}`);
        console.error(err);
      }
    }
}
}
}
}
    }
}

const mintEinr = async () => 
{

    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideMint();
        }
        else{
            if(appOpt === false)
        {
            toast.error("Please Opt-in to App and then mint");
            handleHideMint();
        }
        else{
            if(parseFloat(minAlgo) < parseFloat(algoAmount) * 1000000 + 2000)
            {
                toast.error("Your Algo balance is low.")
                handleHideMint();
            }
            else
            {
                    if(parseFloat(algoAmount) < 0.01)
                    {
                        toast.error(`Value entered is less than 0.01 Algos. Please Enter value greater than 0.01 Algos`);
                        handleHideMint();
                    }
                    else
                    { 
        try {
            const params = await algodClient.getTransactionParams().do();

            let appArgs1 = [];
            appArgs1.push(new Uint8Array(Buffer.from("CommitAlgos")));
            appArgs1.push(algosdk.encodeUint64(parseFloat(algoAmount).toFixed(6) * 1000000));
            
            let transaction1 = algosdk.makeApplicationNoOpTxnFromObject({
              from:localStorage.getItem("walletAddress"), 
              suggestedParams: params, 
              appIndex: parseInt(governance["appID"]), 
              appArgs: appArgs1
            })                    

            let transaction2 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                from: localStorage.getItem("walletAddress"), 
                to: governance["creator"], 
                amount: 0,  
                suggestedParams: params
              });

            const groupID = algosdk.computeGroupID([ transaction1, transaction2 ]);
            const txs = [ transaction1, transaction2 ];
            txs[0].group = groupID;
            txs[1].group = groupID;
    
            const signedTx1 = await myAlgoWallet.signTransaction([txs[0].toByte(), txs[1].toByte()]);

        const response = await algodClient.sendRawTransaction([signedTx1[0].blob, signedTx1[1].blob]).do();
    //// console.log("TxID", JSON.stringify(response, null, 1));
    await waitForConfirmation(algodClient, response.txId);
    // await Registeruser(algoAmount);

    let ref2=firebase.database().ref(`Registeruser/${localStorage.getItem("walletAddress")}`);  
    let dateset=new Date().toDateString();  
    const db = ref2.push().key;                      
    ref2.set({
        id:db,
        WalletAddress:localStorage.getItem("walletAddress"),
        TimeStamp:dateset,Amount:algoAmount,Eligibility:1,Assettype:"Algos",Vote:0})
        .then(()=>{ 
          
        }).catch((err) => {                                    
           
        });                               
    
    console.log("commited",algoAmount);
    setAlgoAmount("");
    await balAsset();
    await balPrint();
    // await globalStateEinr();
    await minBal();
   
    // toast.success(`Transaction Successfully completed with ${response.txId}`);
      } catch (err) {
        toast.error(`Transaction Failed due to ${err}`);
        handleHideMint();
        console.error(err);
      }
    }
}
}
    }
}

const mintEinrPera = async () => 
{
    const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
    setConnector(connector);
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideMint();
        }
        else{
            if(appOpt === false)
        {
            toast.error("Please Opt-in to App and then mint");
            handleHideMint();
        }
        else{
            if(assetEinrOpt === false)
            {
                toast.error("Please Opt-in EINR asset and then mint")
                handleHideMint();
            }
            else{
            if(parseFloat(minAlgo) < 6000)
            {
                toast.error("Your Algo balance is low. Please get more Algos from dispenser.")
                handleHideMint();
            }
            else
            {
                if(parseFloat(usdcAmount) > parseFloat(planetBalances)/1000000)
                {
                    toast.error(`Insufficient USDC balance.`+"\n"+`Your balance is ${(parseFloat(planetBalances)/1000000).toFixed(2)} USDC but trying to enter ${usdcAmount} USDC`);
                    handleHideMint();
                }
                else if(parseFloat(elemAmount) > parseFloat(elemBalances)/1000000)
                {
                    toast.error(`Insufficient ELEM balance.`+"\n"+`Your balance is ${(parseFloat(elemBalances)/1000000).toFixed(2)} ELEM but trying to enter ${elemAmount} ELEM`);
                    handleHideMint();
                }
                else
                {
                    if(parseFloat(usdcAmount) <= 0)
                    {
                        toast.error(`Value entered is zero. Please Enter value greater than Zero`);
                        handleHideMint();
                    }
                    else
                    { 
    try {
        // const accounts = await myAlgoWallet.connect();
        // const addresses = accounts.map(account => account.address);
        const params = await algodClient.getTransactionParams().do();
        //// console.log("address", localStorage.getItem("walletAddress"));
       let elemAmountOfEinr =  parseFloat((((1 - C_PercentEinr)*(usdcAmountEinr * usdcPriceEinr))/(C_PercentEinr * elemPriceEinr))).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0];
       let einrAmountOfEinr =  (parseFloat((usdcAmountEinr * usdcPrice) + parseFloat(elemAmountEinr * elemPrice))/einrPrice).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0];
       let appArgs1 = [];
       appArgs1.push(new Uint8Array(Buffer.from("mintEinr")));

       let transaction1 = algosdk.makeApplicationNoOpTxnFromObject({
         from:localStorage.getItem("walletAddress"), 
         suggestedParams: params, 
         appIndex: parseInt(appID_global), 
         appArgs: appArgs1
       })                    
       
       let programEinr = new Uint8Array(Buffer.from(mintDetails.dynamicStablecoinEscrowEinr, "base64"));          
       let lsigEinr = new algosdk.LogicSigAccount(programEinr);
       let programElem = new Uint8Array(Buffer.from(mintDetails.elemReserve, "base64"));          
       let lsigElem = new algosdk.LogicSigAccount(programElem);
        //// console.log("Escrow =", lsig.address());
       
       let transaction2 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
           from: localStorage.getItem("walletAddress"), 
           to: lsigEinr.address(), 
           amount: parseInt(parseFloat(usdcAmountEinr).toFixed(6) * 1000000), 
           assetIndex: parseInt(usdcID), 
           suggestedParams: params
         });
         // console.log("usdc", parseInt(parseFloat(usdcAmount).toFixed(6) * 1000000));
       let elem25 = ((parseFloat(elemAmountOfEinr * 1000000) * 25)/100); 
       // let floor2 = Math.floor(elem25);
       // // console.log("25% floor =",floor2 * 1000000);
          //// console.log("25% =",elem25 * 1000000);
       let transaction3 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
           from: localStorage.getItem("walletAddress"), 
           to: elemTreasury, 
           amount: parseInt(elem25), 
           assetIndex: parseInt(elemID), 
           suggestedParams: params
         }); 

         let elem75 = ((parseFloat(elemAmountOfEinr * 1000000) * 75)/100); 
         // let floor2 = Math.floor(elem25);
         // // console.log("25% floor =",floor2 * 1000000);
            //// console.log("25% =",elem25 * 1000000);
         let transaction4 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
             from: localStorage.getItem("walletAddress"), 
             to: lsigElem.address(), 
             amount: parseInt(elem75), 
             assetIndex: parseInt(elemID), 
             suggestedParams: params
           }); 
           let einr99 = (parseFloat(einrAmountOfEinr * 1000000) * 99)/100;
         // console.log("elem", parseInt(elem));
         // console.log("tau", tauAmount);
         console.log("tau98", parseInt(einr99)); 
         let transaction5 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
           from: lsigEinr.address(), 
           to: localStorage.getItem("walletAddress"), 
           amount: parseInt(einr99), 
           assetIndex: parseInt(einrID), 
           suggestedParams: params
         });
         
         let einr1 = (parseFloat(einrAmountOfEinr * 1000000) * 1)/100;
         // console.log("elem", parseInt(elem));
         // console.log("tau", tauAmount);
         console.log("tau2", parseInt(einr1)); 
         let transaction6 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
           from: lsigEinr.address(), 
           to: mintDetails.owner, 
           amount: parseInt(einr1), 
           assetIndex: parseInt(einrID), 
           suggestedParams: params
         });                      
        
       let transaction7 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
         from: localStorage.getItem("walletAddress"), 
         to: lsigEinr.address(), 
         amount: 2000, 
          note: undefined,  
          suggestedParams: params
        });
       
       const groupID = algosdk.computeGroupID([ transaction1, transaction2, transaction3, transaction4, transaction5, transaction6, transaction7 ]);
       const txs = [ transaction1, transaction2, transaction3, transaction4, transaction5, transaction6, transaction7 ];
       txs[0].group = groupID;
       txs[1].group = groupID;
       txs[2].group = groupID;
       txs[3].group = groupID;
       txs[4].group = groupID;
       txs[5].group = groupID;
       txs[6].group = groupID;

       const signedTxEscrow1 = algosdk.signLogicSigTransaction(txs[4], lsigEinr);
       const signedTxEscrow2 = algosdk.signLogicSigTransaction(txs[5], lsigEinr);
        // time to sign . . . which we have to do with walletconnect
        const txns = [txs[0], txs[1], txs[2], txs[3], txs[4], txs[5], txs[6]]
        const txnsToSign = txns.map(txn => {
          const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");
          // console.log(encodedTxn);
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
      // console.log(result);
      // console.log(escrow.blob);
        // send and await
        decodedResult[4] = signedTxEscrow1.blob;
        decodedResult[5] = signedTxEscrow2.blob;
        let response = await algodClient.sendRawTransaction(decodedResult).do();
    await waitForConfirmation(algodClient, response.txId);
    setUsdcAmountEinr("");
    setElemAmountEinr("");
    setEinrAmount("");
    await balAsset();
    await balPrint();
    await globalStateEinr();
    await minBal();
    // toast.success(`Transaction Successfully completed with ${response.txId}`);
      } catch (err) {
        toast.error(`Transaction Failed due to ${err}`);
        handleHideMint();
        console.error(err);
      }
    }
}
}
}
}
    }
}

const print = () => {
     //// console.log("usdc =", usdcAmount);
     //// console.log("elem =", elemAmount);
     //// console.log("tau =", tauAmount);
}

const amountSetEinr = (value)=>{
    setUsdcAmountEinr(value);
    setElemAmountEinr(parseFloat((((1 - C_PercentEinr)*(value * usdcPriceEinr))/(C_PercentEinr * elemPriceEinr))).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0]);
    setEinrAmount((parseFloat((value * usdcPrice) + parseFloat(elemAmountEinr * elemPrice))/einrPrice).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0]);
    // // console.log((parseFloat((value * usdcPrice) + (elemAmount * elemPrice))/einrPrice).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0]);
}

const amountSetTau = (value)=>{
    setUsdcAmount(value);
    setElemAmount(parseFloat(((1 - C_Percent)*(value * usdcPrice))/(C_Percent * elemPrice)).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0]);
    setTauAmount(parseFloat((value * usdcPrice) + (elemAmount * elemPrice)).toString().match(/^-?\d+(?:\.\d{0,6})?/)[0]);
}

useEffect(async() => {
    await optCheck();
}, [assetTauOpt, assetEinrOpt, appOpt]);

const optCheck = async () =>
{
let accountInfo = await indexClient.lookupAccountByID(localStorage.getItem("walletAddress")).do();
 //// console.log(accountInfo);
 let assetCount;
 if(accountInfo['account']['assets'])
 {
    assetCount = accountInfo['account']['assets']['length'];
 }
// // console.log(l);
for(let i = 0; i < assetCount; i++)
{
    if(accountInfo['account']['assets'])
    {
    if(accountInfo['account']['assets'][i]['asset-id'] === tauID)
    {
        setAssetTauOpt(true);
        break;
    }
    }
}
for(let i = 0; i < assetCount; i++)
{
    if(accountInfo['account']['assets'])
    {
    if(accountInfo['account']['assets'][i]['asset-id'] === einrID)
    {
        setAssetEinrOpt(true);
        break;
    }
    }
}
const apps = accountInfo['account']['apps-local-state'];
 //// console.log("app", apps['length']);
// setAssets(bal['account']['assets']);
let appCount = apps['length'];
// // console.log(l);
for(let j = 0; j < appCount; j++)
{
    if(accountInfo['account']['apps-local-state'][j]['id'] === governance["appID"])
    {
        setAppOpt(true);
        break;
    }
}
for(let j = 0; j < appCount; j++)
{
    if(accountInfo['account']['apps-local-state'][j]['id'] === appID_dynamic)
    {
        setAppOptDynamic(true);
        break;
    }
}
}

useEffect(async () => {
    await balPrint();
}, [tauBalances, EinrBalances, planetBalances, algoBalances]);

const balPrint = async () =>
{
    // indexClient
let bal = await indexClient.lookupAccountByID(localStorage.getItem("walletAddress")).do();
let l = 0;

let min = await algodClientGet.accountInformation(localStorage.getItem("walletAddress")).do();

setAlgoBalances((parseFloat(min['amount'] - min['min-balance'])/1000000));

if(bal['account']['assets'])
{
l = bal['account']['assets']['length'];
}

for(let k = 0; k < l; k++)
{
    if(bal['account']['assets'])
    {
    if(bal['account']['assets'][k]['asset-id'] === governance["planetID"])
    {
        setPlanetBalances(bal['account']['assets'][k]['amount']);
        break;
    }
    }
}

for(let k = 0; k < l; k++)
{
    if(bal['account']['assets'])
    {
    if(bal['account']['assets'][k]['asset-id'] === tauID)
    {
        setTauBalances(bal['account']['assets'][k]['amount']);
        break;
    }
    }
}
for(let m = 0; m < l; m++)
{
    if(bal['account']['assets'])
    {
    if(bal['account']['assets'][m]['asset-id'] === einrID)
    {
        setEinrBalances(bal['account']['assets'][m]['amount']);
        break;
    }
    }
}

// setAssets(bal['account']['assets']);
}

const balCheckPlanetCommit = async () =>
{       handleShowMint();
     //// console.log("elem", (parseFloat(elemBalances/1000000)));
        if((parseFloat(planetBalances/1000000)) < parseFloat(planetAmount))
        {
            toast.error(`Your balance is ${(parseFloat(planetBalances/1000000)).toFixed(2)} PLANET but trying to spend ${planetAmount} PLANET`);
            handleHideMint();
        }
        else
        {
            await commitPlanetWalletCheck();
        }
}

const balCheckAlgoCommit = async () =>
{       handleShowMint();
        if((parseFloat(algoBalances/1000000)) < parseFloat(elemAmount))
        {
            toast.error(`Your balance is ${(parseFloat(algoBalances/1000000)).toFixed(2)} Algos but trying to spend ${elemAmount} Algos`);
            handleHideMint();
        }
        else
        {
            await algoCommitWalletCheck();
        }
}

useEffect(async() => {
    await minBal();
}, [minAlgo]);

const minBal = async () =>
{
    let min = await algodClientGet.accountInformation(localStorage.getItem("walletAddress")).do();
    // // console.log("minBalanceApi", min['min-balance']);
    // setMinAlgo((min['amount'] - min['min-balance'] - 100000) < 0 || (min['amount'] - min['min-balance'] - 100000) === 'NaN' ? 0 : (min['amount'] - min['min-balance'] - 100000));
    setMinAlgo(min['amount'] - min['min-balance']);
    // console.log("minBalance", minAlgo);
}

const usdcMaxEinr = () =>
{
    if(parseFloat(planetBalances) >= parseFloat(elemBalances) * 15)
    {
        amountSetEinr((parseFloat(elemBalances)/1000000 * 15).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]);
    }
    else
    {
        amountSetEinr((parseFloat(planetBalances)/1000000).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]);
    }
}

const usdcMaxTau = () =>
{
    setPlanetAmount(planetBalances/1000000);

}

useEffect(async() => {
    optinModal();
},[prerequisiteShow, appOpt, appOptDynamic, assetTauOpt, assetEinrOpt]);

const optinModal = () =>
{
    if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === '')
    {
        handlePrerequisiteClose();
    }
    else
    {
    if( appOpt === false )
    {
        handlePrerequisiteShow();
    }
    else{
        handlePrerequisiteClose();
    }
    }
}

const appOptinWalletCheck = async () =>
{
    if(localStorage.getItem("walletName") === "myAlgoWallet")
    {
        await optInApp();
    }
    else if(localStorage.getItem("walletName") === "PeraWallet")
    {
        await optInAppPera();
    }
    else if(localStorage.getItem("walletName") === "AlgoSigner")
    {
        await optInAppPera();
    }
}

const appOptinDynamicWalletCheck = async () =>
{
    if(localStorage.getItem("walletName") === "myAlgoWallet")
    {
        await optInAppDynamic();
    }
    else if(localStorage.getItem("walletName") === "PeraWallet")
    {
        await optInAppDynamicPera();
    }
}

const assetOptinTauWalletCheck = async () =>
{
    if(localStorage.getItem("walletName") === "myAlgoWallet")
    {
        await optInTauAsset();
    }
    else if(localStorage.getItem("walletName") === "PeraWallet")
    {
        await optInTauAssetPera();
    }
}

const assetOptinEinrWalletCheck = async () =>
{
    if(localStorage.getItem("walletName") === "myAlgoWallet")
    {
        await optInEinrAsset();
    }
    else if(localStorage.getItem("walletName") === "PeraWallet")
    {
        await optInEinrAssetPera();
    }
}

const commitPlanetWalletCheck = async () =>
{
    if(localStorage.getItem("walletName") === "myAlgoWallet")
    {
        await mintTau();
    }
    else if(localStorage.getItem("walletName") === "PeraWallet")
    {
        await mintTauPera();
    }
    else if(localStorage.getItem("walletName") === "AlgoSigner")
    {
        await mintTauPera();
    }
}

const algoCommitWalletCheck = async () =>
{
    if(localStorage.getItem("walletName") === "myAlgoWallet")
    {
        await mintEinr();
        
    }
    else if(localStorage.getItem("walletName") === "PeraWallet")
    {
        await mintEinrPera();
    }
    else if(localStorage.getItem("walletName") === "AlgoSigner")
    {
        await mintEinrPera();
    }
}

const globalStateRatioCallTau = async () =>
{
    handleShowcRatioLoad();
    try{
    const params = await algodClient.getTransactionParams().do();
    //// console.log("address", localStorage.getItem("walletAddress"));
   let cRatio = parseInt((parseFloat(cRatioValue)/100) * 1000000);
   // console.log("cRatio", cRatio);
   let appArgs1 = [];
   appArgs1.push(new Uint8Array(Buffer.from("collateralPercent")));
   appArgs1.push(algosdk.encodeUint64(cRatio));

   let transaction1 = algosdk.makeApplicationNoOpTxnFromObject({
     from:localStorage.getItem("walletAddress"), 
     suggestedParams: params, 
     appIndex: parseInt(appID_dynamic), 
     appArgs: appArgs1
   })

   const signedTxn = await myAlgoWallet.signTransaction(transaction1.toByte());
   //toast.info("Transaction in Progress");
     const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
     await waitForConfirmation(algodClient, response.txId);
    } catch (err) {
        handleHidecRatioLoad();    
        toast.error(`Transaction Failed due to ${err}`);
        console.error(err);
      }
}

const globalStateRatioCallEinr = async () =>
{
    handleShowcRatioLoad();
    try{
    const params = await algodClient.getTransactionParams().do();
    //// console.log("address", localStorage.getItem("walletAddress"));
   let cRatio = parseInt((parseFloat(cRatioValue)/100) * 1000000);
   // console.log("cRatio", cRatio);
   let appArgs1 = [];
   appArgs1.push(new Uint8Array(Buffer.from("collateralPercent")));
   appArgs1.push(algosdk.encodeUint64(cRatio));

   let transaction1 = algosdk.makeApplicationNoOpTxnFromObject({
     from:localStorage.getItem("walletAddress"), 
     suggestedParams: params, 
     appIndex: parseInt(appID_global), 
     appArgs: appArgs1
   })

   const signedTxn = await myAlgoWallet.signTransaction(transaction1.toByte());
   //toast.info("Transaction in Progress");
     const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
     await waitForConfirmation(algodClient, response.txId);
    } catch (err) {
        handleHidecRatioLoad();    
        toast.error(`Transaction Failed due to ${err}`);
        console.error(err);
      }
}

const maxAlgo = () =>
{
    setAlgoAmount((parseFloat(minAlgo)/1000000));
}

    return (
        <Layout>
            <><ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/></>

            <Container>
                <Row className='justify-content-center'>
                    <Col md={10} lg={7} className="mb-4">
                        {/* {show ? 
                            <Alert variant="grad" className='mb-4' onClose={() => setShow(false)} dismissible>
                                <p><strong className='text-purple'>Mint (2 Steps):</strong>  < br />
                                1. Enter in the amount of USDC you would like to deposit and press MINT. < br />
                                2. Claim your TAU tokens.</p>
                                <p><strong className='text-purple'>Redeem (2 Steps):</strong>  < br />
                                1. Enter in the amount of TAU you would like to redeem and press Redeem. < br />
                                2. Claim your USDC tokens.</p>
                                <p><strong className='text-purple'>Note:</strong> The “Approve“ is only needed when minting for the first time.</p>
                            </Alert>

                            : null
                        } */}

                        <Card className='card-dash d-block border-0 mb-4'>
                            
                            <div className="d-flex align-items-center float-end mt-1 acc-h-links">
                                {/* <h6 className='sub-heading ms-4 d-flex mb-0'>
                                    How it works 
                                    <OverlayTrigger
                                        key="left"
                                        placement="left"
                                        overlay={
                                            <Tooltip id={`tooltip-left`}>
                                                <strong className='text-purple'>1.</strong> Enter the Amount of USDC by which the requirement of ELEM and The amount of TAU or EINR minted can to automatically generated and displayed. <br /><br /><strong className='text-purple'>2.</strong> Once you acquire the desired amount of TAU to mint click on "Mint TAU" or "Mint EINR" button which will initiate the wallet to sign the Transactions.
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                        </OverlayTrigger>
                                </h6>    */}
                            </div>
                            <Tabs defaultActiveKey="mint" className='dashboard-tabs' id="tab-example-1">
                                <Tab eventKey="mint" title="Commit Planet">
                                    <div className="group-row mb-20">
                                        <Row>
                                            <Col sm={5} className="mb-sm-0 mb-3">
                                                <Button variant='link' className='btn-currency p-0'>
                                                    <img src={planetLogo} alt="planetLogo" />
                                                    <div className="ms-3 text-start">
                                                        
                                                        <h5 className='mb-0 font-semibold'>PLANETS</h5>
                                                        <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(planetBalances) ? (parseFloat(planetBalances)/1000000).toFixed(2) : '0.00'}</h5>
                                                    </div>
                                                </Button>
                                            </Col>
                                            <Col sm={7}>
                                                <div className="input-group-max px-3 input-group-max-lg w-100">
                                                    {/* <input type="number" placeholder='0.00' className='form-control' value={usdcAmount} onChange={(e) => amountSet(e.target.value)}/>  */}
                                                    <InputGroup>
                                                        <FormControl
                                                            // disabled={true}
                                                            value={planetAmount}
                                                            type='number'
                                                            placeholder="0.00"
                                                            aria-label="Recipient's username"
                                                            aria-describedby="basic-addon2"
                                                            onChange={(e) => setPlanetAmount(e.target.value)}
                                                        />
                                                        <Button variant="outline-purple" className='btn-xs-d' onClick={usdcMaxTau}>Max</Button>
                                                    </InputGroup>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    {/* <div className="group-row">
                                        <Row>
                                            <Col sm={5} className="mb-sm-0 mb-3">
                                                <Button variant='link' className='btn-currency p-0'>
                                                    <img src={elemLogo} alt="USDC" />
                                                    <div className="ms-3 text-start">
                                                        
                                                        <h5 className='mb-0 font-semibold'>ELEM</h5>
                                                        <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(elemBalances) ? (parseFloat(elemBalances)/1000000).toFixed(2) : '0.00'}</h5>
                                                    </div>
                                                </Button>
                                            </Col>
                                            <Col sm={7}>
                                                <div className="input-group-max px-3 input-group-max-lg w-100">
                                                    <input readonly disabled type="number" placeholder='0.00' className='form-control' value={elemAmount} />
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="py-2 px-sm-4 px-2">
                                        <Button variant='blue' style={{cursor:"default"}} className='rounded-circle py-3'><svg width="20" height="20" className='m-0' viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.6255 11.0884C16.9501 10.7638 16.9501 10.2375 16.6255 9.91289C16.301 9.58848 15.7752 9.58824 15.4505 9.91236L11.3799 13.9756V4.66732C11.3799 4.20708 11.0068 3.83398 10.5465 3.83398C10.0863 3.83398 9.71322 4.20708 9.71322 4.66732V13.9756L5.65462 9.90978C5.32808 9.58266 4.79811 9.58242 4.47128 9.90925C4.14466 10.2359 4.14466 10.7654 4.47128 11.0921L9.94049 16.5613C10.2752 16.896 10.8179 16.896 11.1526 16.5613L16.6255 11.0884Z" fill="white"></path></svg></Button>
                                    </div>
                                    <div className="group-row">
                                        <Row>
                                            <Col sm={5} className="mb-sm-0 mb-3">
                                                <Button variant='link' className='btn-currency p-0'>
                                                    <img src={tauLogo} alt="USDC" />
                                                    <div className="ms-3 text-start">
                                                        
                                                        <h5 className='mb-0 font-semibold'>TAU</h5>
                                                        <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(tauBalances) ? (parseFloat(tauBalances)/1000000).toFixed(2) : '0.00'}</h5>
                                                    </div>
                                                </Button>
                                            </Col>
                                            <Col sm={7}>
                                                <div className="input-group-max px-3 input-group-max-lg w-100">
                                                    <input readonly disabled type="number" placeholder='0.00' className='form-control' value={(parseFloat((usdcAmount * usdcPrice) + (elemAmount * elemPrice) * 0.99)).toFixed(6)}/>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div> */}


                                    <hr className='my-4' />

                                    <div className="mb-20">
                                        {/* <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span>Max mint per tx</span>
                                            <strong className='font-semibold'>0.00 USDC</strong>
                                        </div> */}
                                        {/* <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span> </span>
                                            <strong className='font-semibold'>Rate : 1 USDC = 1 TAU = 0.33 ELEM</strong>
                                        </div> */}
                                        <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span> </span>
                                            <strong className='font-semibold'>Minimum Commit : 1 PLANETS</strong>
                                        </div>
                                        {/* <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span>You will receive</span>
                                            <strong className='font-semibold'>{parseFloat(tauAmount).toFixed(2) === 'NaN' ? '0.00' : parseFloat(tauAmount).toFixed(2)} TAU</strong>
                                        </div> */}
                                        {/* <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span>Claimable amount</span>
                                            <strong className='font-semibold'>0.00 TAU</strong>
                                        </div> */}
                                    </div>

                                    <Row className='flex-nowrap align-items-center gx-3'>
                                        <Col>
                                            {planetBalances/1000000 >= 1 ? <ButtonLoad loading={loadMint} className='btn w-100 btn-blue mb-20' onClick={balCheckPlanetCommit}>
                                                Commit Planet
                                            </ButtonLoad> : <ButtonLoad disabled loading={loadMint} className='btn w-100 btn-blue mb-20' onClick={balCheckPlanetCommit}>
                                                Commit Planet
                                            </ButtonLoad>}
                                            {/* { localStorage.getItem("walletAddress") === "2H7CM6JNAOZLQSPYFE63JYERAKQAVQ5SVEN4Y2567JRL5E5CASVO3Y2VE4" ? <Button className='btn w-100 btn-blue' onClick={handleCRatioUpdateShow}>
                                                Collateral Ratio
                                            </Button> : <></>}   */}
                                        </Col>
                                        {/* <Col>
                                            <Button disabled className='btn w-100 btn-blue'>
                                                Claim and Autostake
                                            </Button>
                                        </Col> */}
                                    </Row>
                                </Tab>
                                <Tab eventKey="redeem" title="Commit Algos">
                                <div className="group-row mb-20">
                                        <Row>
                                            <Col sm={5} className="mb-sm-0 mb-3">
                                                <Button variant='link' className='btn-currency p-0'>
                                                    <img src={AlgoLogo} alt="AlgoLogo" />
                                                    <div className="ms-3 text-start">
                                                        
                                                        <h5 className='mb-0 font-semibold'>ALGOS</h5>
                                                        <h5 className='sub-heading text-xs mb-0'>Bal: {(parseFloat(algoBalances)).toFixed(2)}</h5>
                                                    </div>
                                                </Button>
                                            </Col>
                                            <Col sm={7}>
                                                <div className="input-group-max px-3 input-group-max-lg w-100">
                                                    {/* <input type="number" placeholder='0.00' className='form-control' value={usdcAmount} onChange={(e) => amountSet(e.target.value)}/>  */}
                                                    <InputGroup>
                                                        <FormControl
                                                            // disabled={true}
                                                            value={algoAmount}
                                                            type='number'
                                                            placeholder="0.00"
                                                            aria-label="Recipient's username"
                                                            aria-describedby="basic-addon2"
                                                            onChange={(e) => setAlgoAmount(e.target.value)}
                                                        />
                                                        <Button variant="outline-purple" className='btn-xs-d' onClick={maxAlgo}>Max</Button>
                                                    </InputGroup>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    {/* <div className="group-row">
                                        <Row>
                                            <Col sm={5} className="mb-sm-0 mb-3">
                                                <Button variant='link' className='btn-currency p-0'>
                                                    <img src={elemLogo} alt="USDC" />
                                                    <div className="ms-3 text-start">
                                                        <h5 className='mb-0 font-semibold'>ELEM</h5>
                                                        <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(elemBalances) ? (parseFloat(elemBalances)/1000000).toFixed(2) : '0.00'}</h5>

                                                    </div>
                                                </Button>
                                            </Col>
                                            <Col sm={7}>
                                                <div className="input-group-max px-3 input-group-max-lg w-100">
                                                    <input readonly disabled type="number" placeholder='0.00' className='form-control' value={parseFloat((((1 - C_PercentEinr)*(usdcAmountEinr * usdcPriceEinr))/(C_PercentEinr * elemPriceEinr))).toFixed(6)} /> 
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="py-2 px-sm-4 px-2">
                                        <Button variant='blue' style={{cursor:"default"}} className='rounded-circle py-3'><svg width="20" height="20" className='m-0' viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.6255 11.0884C16.9501 10.7638 16.9501 10.2375 16.6255 9.91289C16.301 9.58848 15.7752 9.58824 15.4505 9.91236L11.3799 13.9756V4.66732C11.3799 4.20708 11.0068 3.83398 10.5465 3.83398C10.0863 3.83398 9.71322 4.20708 9.71322 4.66732V13.9756L5.65462 9.90978C5.32808 9.58266 4.79811 9.58242 4.47128 9.90925C4.14466 10.2359 4.14466 10.7654 4.47128 11.0921L9.94049 16.5613C10.2752 16.896 10.8179 16.896 11.1526 16.5613L16.6255 11.0884Z" fill="white"></path></svg></Button>
                                    </div>
                                    <div className="group-row">
                                        <Row>
                                            <Col sm={5} className="mb-sm-0 mb-3">
                                                <Button variant='link' className='btn-currency p-0'>
                                                    <img src={einrLogo} alt="USDC" />
                                                    <div className="ms-3 text-start">
                                                        <h5 className='mb-0 font-semibold'>EINR</h5>
                                                        <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(EinrBalances) ? (parseFloat(EinrBalances)/1000000).toFixed(2) : '0.00'}</h5>

                                                    </div>
                                                </Button>
                                            </Col>
                                            <Col sm={7}>
                                                <div className="input-group-max px-3 input-group-max-lg w-100">
                                                    <input readonly disabled type="number" placeholder='0.00' className='form-control' value={((parseFloat((usdcAmountEinr * usdcPrice) + parseFloat(elemAmountEinr * elemPrice))/einrPrice) * 0.99).toFixed(6)}/>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div> */}


                                    <hr className='my-4' />

                                    <div className="mb-20">
                                        {/* <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span>Max mint per tx</span>
                                            <strong className='font-semibold'>0.00 USDC</strong>
                                        </div> */}
                                        {/* <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span> </span>
                                            <strong className='font-semibold'>Rate : 1 USDC = 76 EINR = 0.33 ELEM</strong>
                                        </div> */}
                                        <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span> </span>
                                            <strong className='font-semibold'>Minimum Commit : 0.01 Algos</strong>
                                        </div>
                                        {/* <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span>You will receive</span>
                                            <strong className='font-semibold'>{parseFloat(tauAmount).toFixed(2) === 'NaN' ? '0.00' : parseFloat(tauAmount).toFixed(2)} TAU</strong>
                                        </div> */}
                                        {/* <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span>Claimable amount</span>
                                            <strong className='font-semibold'>0.00 TAU</strong>
                                        </div> */}
                                    </div>

                                    <Row className='flex-nowrap align-items-center gx-3'>
                                        <Col>
                                        {algoBalances >= 0.01 ? <ButtonLoad loading={loadMint} className='btn w-100 btn-blue mb-20' onClick={balCheckAlgoCommit}>
                                                Commit Algos
                                            </ButtonLoad> : <ButtonLoad disabled loading={loadMint} className='btn w-100 btn-blue mb-20' onClick={balCheckAlgoCommit}>
                                                Commit Algos
                                            </ButtonLoad> }
                                            {/* { localStorage.getItem("walletAddress") === "2H7CM6JNAOZLQSPYFE63JYERAKQAVQ5SVEN4Y2567JRL5E5CASVO3Y2VE4" ? <Button className='btn w-100 btn-blue' onClick={handleCRatioUpdateShowEinr}>
                                                Collateral Ratio
                                            </Button> : <></>} */}
                                        </Col>
                                        {/* <Col>
                                            <Button disabled className='btn w-100 btn-blue'>
                                                Claim and Autostake
                                            </Button>
                                        </Col> */}
                                    </Row>
                                </Tab>
                            </Tabs>
                        </Card>
                    </Col>
                </Row>
            <Modal show={prerequisiteShow} className="modal-dashboard" centered onHide={handlePrerequisiteClose}>
            <div className="pt-xl-0 pt-4">   
                <Link className='text-white mb-20' to="/dashboard"><span className='text-blue'>Go to Dashboard &nbsp;</span>
                <svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.6389 8.36952L18.8028 8.2H18.567H0.967033C0.700676 8.2 0.486002 8.10872 0.33782 7.95548C0.189347 7.80195 0.1 7.57826 0.1 7.3C0.1 7.02174 0.189347 6.79805 0.33782 6.64452C0.486002 6.49128 0.700676 6.4 0.967033 6.4H18.567H18.8064L18.6382 6.22972L14.0939 1.63048C14.0937 1.63036 14.0936 1.63023 14.0935 1.63011C13.7445 1.26887 13.7447 0.730627 14.0939 0.369516C14.4414 0.0101614 14.9564 0.0101614 15.3039 0.369516L21.7831 7.06952C21.939 7.23075 21.939 7.46925 21.7831 7.63048L15.3039 14.3305C14.9564 14.6898 14.4414 14.6898 14.0939 14.3305C13.7445 13.9692 13.7445 13.4308 14.0939 13.0695L18.6389 8.36952Z" fill="blue" stroke="currentColor" strokeWidth="0.2"/>
                                </svg>
                </Link>
                </div><br/>
                <Modal.Header>
                    <Modal.Title>Please perform the below action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { appOpt === false ? <ButtonLoad loading={loadAppOpt} variant='primary' className='d-flex p-3 mb-20 justify-content-between w-100 align-items-center' onClick={appOptinWalletCheck}>
                        <span className='text-white'>App Opt-in</span>
                    </ButtonLoad> : <></>}
                    {/* { appOptDynamic === false ? <ButtonLoad loading={loadAppOptDynamic} variant='primary' className='d-flex p-3 mb-20 justify-content-between w-100 align-items-center' onClick={appOptinDynamicWalletCheck}>
                        <span className='text-white'>2. App Opt-in (TAU)</span>
                         <img src={PeraWalletLogo} alt="MetaMask" />
                    </ButtonLoad> : <></>}                    
                    { assetTauOpt === false ? <ButtonLoad loading={loadAssetOptTau} variant='primary' className='d-flex p-3 mb-20 justify-content-between w-100 align-items-center' onClick={assetOptinTauWalletCheck}>
                        <span className='text-white'>3. Opt-in TAU asset</span>
                         <img src={MyAlgoLogo} alt="My Algo Wallet" /> 
                    </ButtonLoad> : <></>}
                    { assetEinrOpt === false ? <ButtonLoad loading={loadAssetOptEinr} variant='primary' className='d-flex p-3 justify-content-between w-100 align-items-center' onClick={assetOptinEinrWalletCheck}>
                        <span className='text-white'>4. Opt-in EINR asset</span>
                         <img src={MyAlgoLogo} alt="My Algo Wallet" /> 
                    </ButtonLoad> : <></>} */}
                </Modal.Body>
            </Modal>
            <Modal show={cRatioUpdateShow} className="modal-dashboard" centered onHide={handleCRatioUpdateClose}>
                <center>
                <Modal.Header>
                   <Modal.Title>Collateral Ratio Update TAU</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <Link className='text-white mb-20' to="/dashboard"><Button variant='gray' className='d-flex p-3 mb-20 justify-content-between w-100 align-items-center'><span className='text-white'>Go to Dashboard</span></Button></Link> */}
                    <div className="group-row">
                    <Row className=''>
                    <Col sm={5} className="mb-sm-0 mb-3">
                        <Button variant='link' className='btn-currency p-0'>
                            {/* <img src={einrLogo} alt="TAU" /> */}
                            <div className="ms-3 text-start">
                                <h5 className='mb-0 font-semibold' style={{color:"white"}}>Collateral Percentage</h5>
                                {/* <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(EinrBalances) ? (parseFloat(EinrBalances)/1000000).toFixed(2) : '0.00'}</h5> */}
                            </div>
                        </Button>
                        </Col>
                    <Col sm={7}>
                    <div className="input-group-max px-3 input-group-max-lg w-50">
                    <InputGroup>
                        <FormControl
                            // disabled={true}
                            value={cRatioValue}
                            type='number'
                            placeholder="0.00"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            onChange={(e) => setCRatioValue(e.target.value)}
                        />
                        {/* <Button variant="outline-purple" className='btn-xs-d'>Max</Button> */}
                    </InputGroup>                   
                    </div>
                    </Col>
                    </Row>
                    </div>
                    <br/>   

                    <ButtonLoad loading={cRatioLoad} variant='primary' className='d-flex p-3 mb-20 justify-content-between w-50 align-items-center' onClick={globalStateRatioCallTau}>
                        <span className='text-white'>Update Collateral Ratio</span>
                    </ButtonLoad>
                </Modal.Body>
                </center>
            </Modal>
            <Modal show={cRatioUpdateShowEinr} className="modal-dashboard" centered onHide={handleCRatioUpdateCloseEinr}>
                <center>
                <Modal.Header>
                   <Modal.Title>Collateral Ratio Update EINR</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <Link className='text-white mb-20' to="/dashboard"><Button variant='gray' className='d-flex p-3 mb-20 justify-content-between w-100 align-items-center'><span className='text-white'>Go to Dashboard</span></Button></Link> */}
                    <div className="group-row">
                    <Row className=''>
                    <Col sm={5} className="mb-sm-0 mb-3">
                        <Button variant='link' className='btn-currency p-0'>
                            {/* <img src={einrLogo} alt="TAU" /> */}
                            <div className="ms-3 text-start">
                                <h5 className='mb-0 font-semibold' style={{color:"white"}}>Collateral Percentage</h5>
                                {/* <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(EinrBalances) ? (parseFloat(EinrBalances)/1000000).toFixed(2) : '0.00'}</h5> */}
                            </div>
                        </Button>
                        </Col>
                    <Col sm={7}>
                    <div className="input-group-max px-3 input-group-max-lg w-50">
                    <InputGroup>
                        <FormControl
                            // disabled={true}
                            value={cRatioValue}
                            type='number'
                            placeholder="0.00"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            onChange={(e) => setCRatioValue(e.target.value)}
                        />
                        {/* <Button variant="outline-purple" className='btn-xs-d'>Max</Button> */}
                    </InputGroup>                   
                    </div>
                    </Col>
                    </Row>
                    </div>
                    <br/>   

                    <ButtonLoad loading={cRatioLoad} variant='primary' className='d-flex p-3 mb-20 justify-content-between w-50 align-items-center' onClick={globalStateRatioCallEinr}>
                        <span className='text-white'>Update Collateral Ratio</span>
                    </ButtonLoad>
                </Modal.Body>
                </center>
            </Modal>
            </Container>
        </Layout>
    );
};

export default Stablecoin;