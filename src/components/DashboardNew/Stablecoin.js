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

const planetCommit = async () => 
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

const planetCommitPera = async () => 
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
            toast.error("Please Opt-in to App and then Commit");
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

        // time to sign . . . which we have to do with walletconnect
        const txns = [txs[0], txs[1]]
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

        let response = await algodClient.sendRawTransaction(decodedResult).do();
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

const algoCommit = async () => 
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

    await waitForConfirmation(algodClient, response.txId);

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
    
    setAlgoAmount("");
    await balAsset();
    await balPrint();

    await minBal();
   
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

const algoCommitPera = async () => 
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
      // console.log(result);
      // console.log(escrow.blob);
        // send and await

        let response = await algodClient.sendRawTransaction(decodedResult).do();
    await waitForConfirmation(algodClient, response.txId);

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

        setAlgoAmount("");
        await balAsset();
        await balPrint();

        await minBal();

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

useEffect(async() => {
    await optCheck();
}, [assetTauOpt, assetEinrOpt, appOpt]);

const optCheck = async () =>
{
let accountInfo = await indexClient.lookupAccountByID(localStorage.getItem("walletAddress")).do();

 let assetCount;
 if(accountInfo['account']['assets'])
 {
    assetCount = accountInfo['account']['assets']['length'];
 }

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

let appCount = apps['length'];

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

const planetMaxTau = () =>
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

const commitPlanetWalletCheck = async () =>
{
    if(localStorage.getItem("walletName") === "myAlgoWallet")
    {
        await planetCommit();
    }
    else if(localStorage.getItem("walletName") === "PeraWallet")
    {
        await planetCommitPera();
    }
}

const algoCommitWalletCheck = async () =>
{
    if(localStorage.getItem("walletName") === "myAlgoWallet")
    {
        await algoCommit();
        
    }
    else if(localStorage.getItem("walletName") === "PeraWallet")
    {
        await algoCommitPera();
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

                        <Card className='card-dash d-block border-0 mb-4'>
                            
                            <div className="d-flex align-items-center float-end mt-1 acc-h-links">
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
                                                    <InputGroup>
                                                        <FormControl
                                                            value={planetAmount}
                                                            type='number'
                                                            placeholder="0.00"
                                                            aria-label="Recipient's username"
                                                            aria-describedby="basic-addon2"
                                                            onChange={(e) => setPlanetAmount(e.target.value)}
                                                        />
                                                        <Button variant="outline-purple" className='btn-xs-d' onClick={planetMaxTau}>Max</Button>
                                                    </InputGroup>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>


                                    <hr className='my-4' />

                                    <div className="mb-20">
                                        <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span> </span>
                                            <strong className='font-semibold'>Minimum Commit : 1 PLANETS</strong>
                                        </div>
                                    </div>

                                    <Row className='flex-nowrap align-items-center gx-3'>
                                        <Col>
                                            {planetBalances/1000000 >= 1 ? <ButtonLoad loading={loadMint} className='btn w-100 btn-blue mb-20' onClick={balCheckPlanetCommit}>
                                                Commit Planet
                                            </ButtonLoad> : <ButtonLoad disabled loading={loadMint} className='btn w-100 btn-blue mb-20' onClick={balCheckPlanetCommit}>
                                                Commit Planet
                                            </ButtonLoad>}
                                        </Col>
                                    </Row>
                                </Tab>
                                {/* <Tab eventKey="redeem" title="Commit Algos">
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
                                                    <InputGroup>
                                                        <FormControl
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


                                    <hr className='my-4' />

                                    <div className="mb-20">

                                        <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span> </span>
                                            <strong className='font-semibold'>Minimum Commit : 0.01 Algos</strong>
                                        </div>
                                    </div>

                                    <Row className='flex-nowrap align-items-center gx-3'>
                                        <Col>
                                        {algoBalances >= 0.01 ? <ButtonLoad loading={loadMint} className='btn w-100 btn-blue mb-20' onClick={balCheckAlgoCommit}>
                                                Commit Algos
                                            </ButtonLoad> : <ButtonLoad disabled loading={loadMint} className='btn w-100 btn-blue mb-20' onClick={balCheckAlgoCommit}>
                                                Commit Algos
                                            </ButtonLoad> }
                                        </Col>
                                    </Row>
                                </Tab> */}
                            </Tabs>
                        </Card>
                    </Col>
                </Row>
            <Modal show={prerequisiteShow} className="modal-dashboard" centered onHide={handlePrerequisiteClose}>
            <div className="pt-xl-0 pt-4">   
                <Link className='text-white mb-20' to="/dashboard"><span className='text-blue'>Go to Home  &nbsp;</span>
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
                </Modal.Body>
            </Modal>
            </Container>
        </Layout>
    );
};

export default Stablecoin;