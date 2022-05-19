import React, {useState, useEffect} from 'react';
import { Accordion, Button, Col, Container, FormControl, InputGroup, OverlayTrigger, Row, Tab, Tabs, Tooltip } from 'react-bootstrap';
import Layout from './LayoutT';
import { updatealgobalance } from "../formula";

import ButtonLoad from 'react-bootstrap-button-loader';
import planet from '../../assets/images/planet.png';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';

import governance from "./governance.json";
import node from "./nodeapi.json"
import elemLogo from '../../assets/images/elem-original.png';
import tauLogo from '../../assets/images/tau-original.png';
import einrLogo from '../../assets/images/EINR-original.png';
import usdtLogo from '../../assets/images/usdtimg.png';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";

const algosdk = require('algosdk');
const myAlgoWallet = new MyAlgoConnect();
const bridge = "https://bridge.walletconnect.org";
const Faucet = () => {

    useEffect(() => {
        document.title = "ELEMENT | Faucet"
    }, [])

    const[appTotal,setAppTotal] = useState("");

    const[loaderPurchase, setLoaderPurchase] = useState(false);

    const handleShowLoadPurchase = () => setLoaderPurchase(true);
    const handleHideLoadPurchase = () => setLoaderPurchase(false);

    const[loaderClaim, setLoaderClaim] = useState(false);

    const handleShowLoadClaim = () => setLoaderClaim(true);
    const handleHideLoadClaim = () => setLoaderClaim(false);

    const[loaderAppOpt, setLoaderAppOpt] = useState(false);

    const handleShowLoadAppOpt = () => setLoaderAppOpt(true);
    const handleHideLoadAppOpt = () => setLoaderAppOpt(false);

    const[loaderAssetOpt, setLoaderAssetOpt] = useState(false);

    const handleShowLoadAssetOpt = () => setLoaderAssetOpt(true);
    const handleHideLoadAssetOpt = () => setLoaderAssetOpt(false);

    const[loaderUsdcFund, setLoaderUsdcFund] = useState(false);

    const handleShowLoadUsdcFund = () => setLoaderUsdcFund(true);
    const handleHideLoadUsdcFund = () => setLoaderUsdcFund(false);


    const [elemAssetOpt,setToElemAssetOpt] = useState(false);
    const [usdcAssetOpt,setToUsdcAssetOpt] = useState(false);
    const [tauAssetOpt,setToTauAssetOpt] = useState(false);
    const [einrAssetOpt,setToEinrAssetOpt] = useState(false);
    const [usdtAssetOpt,setToUsdtAssetOpt] = useState(false);

    const [usdcBalances, setUsdcBalances] = useState("");

    const [minAlgo, setMinAlgo] = useState("");
    const [connector, setConnector] = useState("");
    //console.log("mapSet", map1);
    // let appId = setappid(46584645);

//     const baseServer = 'https://testnet-algorand.api.purestake.io/ps2';
// const port = '';

// const token = {
//    'X-API-Key': 'pOD5BAUCxq7InVPjo0sO01B0Vq4d7pD1ask5Ix43'
// }

// const algodClientGet = new algosdk.Algodv2(token, baseServer, port);
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

    const waitForConfirmation = async function (client, txId) {
        let status = (await client.status().do());
        let lastRound = status["last-round"];
          while (true) {
            const pendingInfo = await client.pendingTransactionInformation(txId).do();
            if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
              //Got the completed Transaction
            //   console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
            // toast.success(`Transaction ${txId} is successful and confirmed in round ${pendingInfo["confirmed-round"]}`);
            let id = "https://testnet.algoexplorer.io/tx/" + txId;
            toast.success(toastDiv(id));
            handleHideLoadAssetOpt();
            handleHideLoadUsdcFund();
            await updatealgobalance();
            // await sleep(5000);
            // reload();  
            break;
            }
            lastRound++;
            await client.statusAfterBlock(lastRound).do();
          }
        };  

//asset optin code
const OptInUsdc = async () => {
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
        assetIndex: governance["planetID"]
    });

    const signedTxn = await myAlgoWallet.signTransaction(txn.toByte());
    const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
    //toast.success(`Transaction Success ${response.txId}`);
    await waitForConfirmation(algodClient, response.txId);
    setToUsdcAssetOpt(true);
    await minBal();
}
catch (err) {
    handleHideLoadAssetOpt();
    toast.error(err.toString());
    console.error(err);

}
        }
    }
}


//Dispenser code        

const usdcFund = async () =>
{
    handleShowLoadUsdcFund();
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideLoadUsdcFund();
        }
        else{

let usdcFundProgram = new Uint8Array(Buffer.from("BSABATEZIhIiQzIEgQISMwAQIhIQMwEQgQQSQQACIkOBAEM=", "base64"));

let lsigusdcFund = new algosdk.LogicSigAccount(usdcFundProgram);
// console.log("Escrow =", lsigusdcFund.address());

try {

    const params = await algodClient.getTransactionParams().do();

    let sender = localStorage.getItem("walletAddress");
    let escrow = lsigusdcFund.address();
    // create unsigned transaction
    let transaction1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: sender, 
        to: lsigusdcFund.address(),  
        amount: 1000, 
        suggestedParams: params
      });    

    let transaction2 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: escrow, 
      to: sender,  
      amount: 10 * 1000000, 
      assetIndex: parseInt(governance["planetID"]), 
      suggestedParams: params
    }); 

    const groupID = algosdk.computeGroupID([ transaction1, transaction2]);
    const txs = [ transaction1, transaction2 ];
    txs[0].group = groupID;
    txs[1].group = groupID;
    
    
    const signedTx1 = await myAlgoWallet.signTransaction(txs[0].toByte());
    const signedTx2 = algosdk.signLogicSigTransaction(txs[1], lsigusdcFund);
    // toast.info(`Transaction in Progress`)
const response = await algodClient.sendRawTransaction([ signedTx1.blob, signedTx2.blob]).do();
// console.log("TxID", JSON.stringify(response, null, 1));
await waitForConfirmation(algodClient, response.txId);
await balAsset();
await minBal();
//toast.success(`Transaction Successful with ${response.txId}`);
  } catch (err) {
    handleHideLoadUsdcFund();
    toast.error(err.toString());
    console.error(err);
  }

        }
}

//PeraWallet Start

//asset optin code
const OptInUsdcPera = async () => {
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
                      assetIndex: parseInt(governance["planetID"])
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
                  const response = await algodClient.sendRawTransaction(decodedResult).do();
                  await waitForConfirmation(algodClient, response.txId);
                  setToUsdcAssetOpt(true);
                  await minBal();
}
catch (err) {
    handleHideLoadAssetOpt();
    toast.error(err.toString());
    console.error(err);

}
        }
    }
}

//Dispenser code        

const usdcFundPera = async () =>
{
    const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
    setConnector(connector);
    handleShowLoadUsdcFund();
    if (localStorage.getItem("walletAddress") === "")
        {
            toast.error("Connect your wallet");
            handleHideLoadUsdcFund();
        }
        else{

let usdcFundProgram = new Uint8Array(Buffer.from("BSABATEZIhIiQzIEgQISMwAQIhIQMwEQgQQSQQACIkOBAEM=", "base64"));

let lsigusdcFund = new algosdk.LogicSigAccount(usdcFundProgram);
// console.log("Escrow =", lsigusdcFund.address());

try {

    const params = await algodClient.getTransactionParams().do();

    let sender = localStorage.getItem("walletAddress");
    let escrow = lsigusdcFund.address();
    // create unsigned transaction
    let transaction1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: sender, 
        to: lsigusdcFund.address(),  
        amount: 1000, 
        suggestedParams: params
      });    

    let transaction2 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: escrow, 
      to: sender,  
      amount: 10 * 1000000, 
      assetIndex: parseInt(governance["planetID"]), 
      suggestedParams: params
    }); 

    const groupID = algosdk.computeGroupID([ transaction1, transaction2]);
    const txs = [ transaction1, transaction2 ];
    txs[0].group = groupID;
    txs[1].group = groupID;
    
    const signedTx2 = algosdk.signLogicSigTransaction(txs[1], lsigusdcFund);
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
                           decodedResult[1] = signedTx2.blob;
                           let response = await algodClient.sendRawTransaction(decodedResult).do();
                          await waitForConfirmation(algodClient, response.txId);
                          await balAsset();
                          await minBal();
//toast.success(`Transaction Successful with ${response.txId}`);
  } catch (err) {
    handleHideLoadUsdcFund();
    toast.error(err.toString());
    console.error(err);
  }

        }
}

//PeraWallet End

useEffect(async() => {
    await optCheck();
}, [usdcAssetOpt]);

const optCheck = async () =>
{
let accountInfo = await indexClient.lookupAccountByID(localStorage.getItem("walletAddress")).do();
console.log(accountInfo);
let assetCount = accountInfo['account']['assets']['length']
// console.log(l);

for(let i = 0; i < assetCount; i++)
{
    if(accountInfo['account']['assets'][i]['asset-id'] === governance["planetID"])
    {
        setToUsdcAssetOpt(true);
        break;
    }
}

}
const reload = () => {
    sessionStorage.setItem("reloading", "true");
    window.location.reload(false); 
};

    window.onload = () => {
        let reloading = sessionStorage.getItem("reloading");
        if (reloading) {
            sessionStorage.removeItem("reloading");
        }
    }

useEffect(async () => {
    await balAsset();
}, [usdcBalances]);

const balAsset = async () =>
{
    // indexClient
let bal = await indexClient.lookupAccountByID(localStorage.getItem("walletAddress")).do();
let l = bal['account']['assets']['length'];

for(let i = 0; i < l; i++)
{
    if(bal['account']['assets'][i]['asset-id'] === governance["planetID"])
    {
        setUsdcBalances(bal['account']['assets'][i]['amount']);
        break;
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

const usdcWalletCheck = async () =>
{
    if(localStorage.getItem("walletName") === "myAlgoWallet")
    {
        await OptInUsdc();
    }
    else if(localStorage.getItem("walletName") === "PeraWallet")
    {
        await OptInUsdcPera();
    }
}

const usdcFundWalletCheck = async () =>
{
    if(localStorage.getItem("walletName") === "myAlgoWallet")
    {
        await usdcFund();
    }
    else if(localStorage.getItem("walletName") === "PeraWallet")
    {
        await usdcFundPera();
    }
}

    return (
        <Layout>
            <><ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/></>

            <Container>
            <div className="d-flex mb-24 align-items-center justify-content-center">
                    <div>
                        <h3 className='mb-0 text-187'>
                            Faucet 
                            <OverlayTrigger
                                key="right"
                                placement="right"
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                        Assets required to test our ecosystem is available here.
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger>
                        </h3>
                        {/* <h3 className='mb-0 text-187'>${(parseFloat(bondBalance) / 3).toFixed(2)}</h3> */}
                    </div>
                    {/* <div className='ms-sm-5 ms-4'>
                        <h6 className='sub-heading mb-0'>
                            ELEM Market Price
                            <OverlayTrigger
                                key="left"
                                placement="left"
                                overlay={
                                    <Tooltip id={`tooltip-left`}>
                                        ELEM asset price.
                                    </Tooltip>
                                }
                                >
                                    <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                </OverlayTrigger>
                        </h6>
                        <h3 className='mb-0 text-187'>$3.00</h3>
                    </div> */}
                </div>

                <Accordion defaultActiveKey="">
                    <Accordion.Item className='mb-24' eventKey="0">
                        <Accordion.Header>
                            <div className="acc-title me-2 d-flex align-items-center">
                                <img src={planet} alt="logo" />
                                <span className='ms-3'>PLANET</span>
                            </div>

                            <div className="ms-auto flex-grow-1 pe-md-4 justify-content-between d-flex align-items-center">
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        You will Receive
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        10 PLANET
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Amount of PLANET asset per transaction.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Balance
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                    {(parseFloat(usdcBalances)/1000000).toFixed(2) === 'NaN' || (parseFloat(usdcBalances)/1000000).toFixed(2) === null ? '0.00' : (parseFloat(usdcBalances)/1000000).toFixed(2)} PLANET
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Your Account's PLANET balance.
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                {/* <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Vesting Term
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        5 days
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id={`tooltip-left`}>
                                                    Total time required to claim all ELEM asset
                                                </Tooltip>
                                            }
                                            >
                                                <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                            </OverlayTrigger>
                                    </h5>
                                </div>
                                <div className='mr-1'>
                                    <h6 className='sub-heading text-xs mb-0'>
                                        Purchased
                                    </h6>
                                    <h5 className='mb-0 d-flex align-items-center'>
                                        ${(parseFloat(appTotal)/1000000 * 2).toFixed(2)}
                                    </h5>
                                </div> */}
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            {/* <div className="d-flex align-items-center float-end mt-1 acc-h-links">
                                <a href="https://testnet.algoexplorer.io/application/78065709" rel="noopener noreferrer" target="_blank">
                                    <svg className="blue-dark-theme-pink mb-1" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                                    <span className='text-text-FF ms-2'>View Contract</span>
                                </a>

                                <h6 className='sub-heading ms-4 d-flex mb-0'>
                                    How it works 
                                    <OverlayTrigger
                                        className="me-20"
                                        key="left"
                                        placement="left"
                                        overlay={
                                            <Tooltip id={`tooltip-left`}>
                                                <strong className='text-purple'>1.</strong> Enter the amount of USDC asset that you want to invest and bond ELEM asset. <br /><br /><strong className='text-purple'>2.</strong> 20% of the ELEM asset will be Claimable for every 24 hours. <br/>( 5 times 20% will get your 100% ELEM asset for you inverstment in 5 days )
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                        </OverlayTrigger>
                                </h6> &nbsp;&nbsp;&nbsp;&nbsp;
                                <ButtonLoad loading={loaderUsdcFund} className='btn btn-blue' onClick={usdcFund}>
                                                        USDC Faucet
                                                    </ButtonLoad>
                                                    <OverlayTrigger
                                        key="left"
                                        placement="left"
                                        overlay={
                                            <Tooltip id={`tooltip-left`}>
                                                By clicking on this button <br/>10 USDC can be received by your address. This USDC is for testing purpose only.
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                        </OverlayTrigger>  
                            </div> */}
                            <Tabs defaultActiveKey="bond" className='dashboard-tabs' id="tab-example-1">
                            
                                <Tab eventKey="bond" title="PLANET Faucet">
                                    <Row className='row-divider'>
                                        {/* <Col>
                                            <h6><span className='text-sm text-gray-d'>Your USDC Balance: </span>{(parseFloat(usdcBalances)/1000000).toFixed(2) === 'NaN' || (parseFloat(usdcBalances)/1000000).toFixed(2) === null ? '0.00' : (parseFloat(usdcBalances)/1000000).toFixed(2)} USDC</h6>
                                            <Row className='flex-nowrap mb-2 gx-3'>
                                                <Col xs="auto">
                                                {appOpt === false ? <Button disabled className='btn btn-blue'>
                                                        Purchase Bond
                                                    </Button>:<ButtonLoad style={{width:"100%"}} loading={loaderPurchase} className='btn btn-blue' onClick={Exchange}>
                                                    Purchase Bond
                                                    </ButtonLoad>}
                                                </Col>
                                            </Row>
                                            <div className="d-flex">

                                                <div className='ms-4'>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Max You Can Buy</span> {(parseFloat(usdcBalances)/1000000 / 2).toFixed(2) === 'NaN' || (parseFloat(usdcBalances)/1000000 / 2).toFixed(2) === null ? '0.00' : (parseFloat(usdcBalances)/1000000 / 2).toFixed(2)} ELEM</h6>
                                                </div>
                                            </div>
                                        </Col> */}
                                        <Col md={12}>
                                            {/* <h6><span className='text-sm text-gray-d'>Claimable Rewards: </span>{(parseFloat(stable)/1000000).toFixed(2) === 'NaN' ? <>{0.00}</>:(parseFloat(stable)/1000000 * 20 / 100).toFixed(2)} ELEM</h6> */}
                                            <Row className='flex-nowrap align-items-center mb-2 gx-3'>
                                                <Col xs="auto">
                                                    {usdcAssetOpt === false ? <ButtonLoad loading={loaderAssetOpt} className='btn w-100 btn-blue' onClick={() => usdcWalletCheck()}>
                                                    PLANET Asset Optin
                                                    </ButtonLoad> : <><Button disabled className='btn w-100 btn-blue'>
                                                    PLANET Asset Opted
                                                    </Button></> }
                                                </Col>
                                                <Col>
                                                {usdcAssetOpt == true ? <ButtonLoad loading={loaderUsdcFund} className='btn w-20 btn-blue' onClick={() => usdcFundWalletCheck()}>
                                                        Dispense 
                                                    </ButtonLoad> : <Button disabled className='btn w-20 btn-blue'>
                                                        Dispense
                                                    </Button>}
                                                </Col>
                                                <Col xs="auto">
                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Please Opt-In the address to asset, After you can Dispense PLANET.
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger>
                                                </Col>
                                            </Row>
                                            {/* <div className="d-flex">
                                                <div>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Pending Rewards</span> {(parseFloat(bond)/1000000).toFixed(2) === 'NaN' ? <>{0.00}</>:(parseFloat(bond)/1000000).toFixed(2)} ELEM</h6>
                                                </div>
                                                <div className='ms-4'>
                                                    <h6><span className='text-sm mb-1 d-block text-gray-d'>Time until fully vested</span> {lock == true ? (<>{day}d:{hour}h:{min}m:{sec}s</>):(<></>)} </h6>
                                                </div>
                                            </div> */}
                                        </Col>
                                    </Row>
                                </Tab>
                            </Tabs>
                        </Accordion.Body>
                    </Accordion.Item>  
                </Accordion>
            </Container>
        </Layout>
    );
};

export default Faucet;