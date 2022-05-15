import React,{useEffect,useState} from 'react';
import Layout from './LayoutT';
import { Link } from 'react-router-dom';
import { Card, Col, Container, Row, Tabs, Tab, Badge, Button, InputGroup, Form, Dropdown,Modal} from 'react-bootstrap';
import ButtonLoad from 'react-bootstrap-button-loader';
import CardImage from '../../assets/images/card-image.jpg';
import firebase from '../../NFTFolder/firebase';
import { useHistory } from "react-router-dom";
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import fireDb from '../../NFTFolder/firebase';
import configfile from '../../NFTFolder/config.json'
import dataescrowprice from "../../NFTFolder/escrowpricenew";
import logogif from '../../assets/images/gif4.gif';
import Icon1 from '../../assets/images/elem-original.png';
import node from './nodeapi.json';
import { minAlgoBalance } from '../formula';
import CreateTab from './CreateTab';
import Compress from "react-image-file-resizer";
const algosdk = require('algosdk'); 
const algodClientGet = new algosdk.Algodv2('', node['algodclient'], '');
//const algodClient = new algosdk.Algodv2('', node['algodclient'], '');
//const algodClient = new algosdk.Algodv2('',node['algodclient'], '');
const algodClient = new algosdk.Algodv2('', 'https://node.testnet.algoexplorerapi.io', '');
const indexClient = new algosdk.Indexer('', node['indexerclient'], '');
const axios = require('axios');
const myAlgoWallet = new MyAlgoConnect();

const MyNFT = () => {
    //console.log("CFile",configfile.nullvalue)
    useEffect(() => {
        document.title = "ELEMENT | MyNFT"
    }, [])
    const [show, setShow] = React.useState(false);
    const handleShow = () => setShow(true);    
    const handleClose = () => {setShow(false)};
    const [Img,setImg] = useState("")    
    const [Imgname,setImgname] = useState("") 
    const[loader, setLoader] = useState(false);
    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false);
    const[getImgreffalgoLiked,setgetImgreffalgoLiked]=useState([]);
    // console.log("Likedprofile",getImgreffalgoLiked)
    const[getImgreffalgoActivity,setgetImgreffalgoActivity]=useState([]);
    // console.log("Activityprofile",getImgreffalgoActivity)
    const[pageSize,setPageSize]=useState(12);     
    const [searchText, setSearchText] = React.useState('');
    const[getrecent,setrecent]=useState("Recently added");
    // console.log("Recent",getrecent)
    const [algobalanceApp,setalgobalanceApp] = useState("");    
    // const [showTestAlert,setshowTestAlert] = React.useState(false);   
    // const [issuesdisplay,setissuesdisplay]=useState(null)
    // const [showTest, setShowTest] = React.useState(false);
    // const [showTestLoading, setShowTestLoading] = React.useState(false);    
    // const [showTestDone,setshowTestDone] = React.useState(false);   
    // const [showTestSale,setshowTestSale] = React.useState(false);   
    //const [getprices,setprices]=useState("")
    // console.log("getpricess",getprices)

    let history=useHistory();
    const[getImgreffalgo,setgetImgreffalgo]=useState([]);
    //console.log("checkprofileValue",getImgreffalgo)
    const[getImgreffalgosale,setgetImgreffalgosale]=useState([]);
    //console.log("checkprofileSale",getImgreffalgosale)
    const[getImgreffalgosowned,setgetImgreffalgoowned]=useState([]);
    //console.log("checkprofileowned",getImgreffalgosowned)    
    const[getIProfile,setgetIProfile]=useState([""]);       
    //console.log("checkprofile",getIProfile)


        const captureFile =async(event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        let reader = new window.FileReader()
        try{
        Compress.imageFileResizer (file,1500, 260, 'JPEG', 300, 0,
        uri =>{
          //console.log("iuri",uri)
          setImg(uri)      
          //setShow(false)
          //setShowL(true)            
          updatecover(uri);
        },
        'base64'
        );
        reader.readAsArrayBuffer(file)
        //console.log(reader)          
      }catch (err) {
        //console.error(err);    
        }
        }; 
        const dbcallProfile=async()=>{            
            let r=[];
            try {    
            firebase.auth().signInAnonymously().then((response)=>{           
            firebase.database().ref("userprofile").child(localStorage.getItem('walletAddress')).on("value", (data) => {          
              if (data) {                      
                  r.push({
                    Bio:data.val().Bio,
                    Customurl: data.val().Customurl,
                    Email: data.val().Email,
                    Imageurl:data.val().Imageurl,
                    Personalsiteurl: data.val().Personalsiteurl,
                    TimeStamp: data.val().TimeStamp,
                    Twittername: data.val().Twittername,
                    UserName: data.val().UserName,
                    WalletAddress: data.val().walletAddress,
                    bgurl:data.val().bgurl,
                    valid:data.val().valid
                  })                
              }
              else{
                setgetIProfile([""]);  
              }
              setgetIProfile(r);
            });         
            })         
          } catch (error) {
            //console.log('error occured during search', error);    
          }                
        }    
        useEffect(()=>{dbcallProfile()},[])

        const updatecover=async(u)=>{
            setShow(false)
            //setShowL(true)                   
            toast.warn(`Banner Upload InProgress`,{autoClose: 3000});                        
            if(getIProfile === "" || getIProfile === null || getIProfile === undefined ){
                toast.error(`Please Create Your Artist`,{autoClose: 3000});         
                done()
            }else{
                if(getIProfile[0] === "" || getIProfile[0] === null || getIProfile[0] === undefined){                    
                    toast.error(`Please Create Your Artist`,{autoClose: 3000});         
                    done()
                }else{

                    let ref2=firebase.database().ref(`userprofile/${localStorage.getItem('walletAddress')}`);                    
                    let dateset=new Date().toDateString();                
                    //console.log("data",data.val())
                    ref2.update({
                    Imageurl:getIProfile[0].Imageurl,bgurl:u,
                    UserName:getIProfile[0].UserName,Customurl:getIProfile[0].Customurl,WalletAddress:localStorage.getItem('walletAddress'),
                    TimeStamp:dateset,Twittername:getIProfile[0].Twittername,Personalsiteurl:getIProfile[0].Personalsiteurl,Email:getIProfile[0].Email,Bio:getIProfile[0].Bio,valid:getIProfile[0].valid})
                    .then(()=>{          
                    //setShowL(false)                                    
                    //setShowDone(true)            
                    toast.dismiss()
                    toast.success(`Banner Upload SuccessFully`,{autoClose: 3000});            
                    done()
                    //window.location.reload(false)
                    }).catch((err) => {                                    
                    toast.error(`Banner Upload Failed`,{autoClose: 3000});         
                    done()
                    //setShowL(false)              
                    //window.location.reload(false)       
                    //console.log(err);
                    });   

                }                
            }
        //     firebase.database().ref("userprofile").child(localStorage.getItem('walletAddress')).on("value", (data) => {          
        //     if (data) {                        
        //     c=c+1
        //     let ref2=firebase.database().ref(`userprofile/${localStorage.getItem('walletAddress')}`);                    
        //     let dateset=new Date().toDateString();                
        //     //console.log("data",data.val())
        //     ref2.update({
        //     Imageurl:data.val().Imageurl,bgurl:u,
        //     UserName:data.val().UserName,Customurl:data.val().Customurl,WalletAddress:localStorage.getItem('walletAddress'),
        //     TimeStamp:dateset,Twittername:data.val().Twittername,Personalsiteurl:data.val().Personalsiteurl,Email:data.val().Email,Bio:data.val().Bio,valid:data.val().valid})
        //     .then(()=>{          
        //       //setShowL(false)                                    
        //       //setShowDone(true)            
        //       toast.success(`Banner Upload SuccessFully`,{autoClose: 3000});            
        //       done()
        //       //window.location.reload(false)
        //     }).catch((err) => {                                    
        //       toast.error(`Banner Upload Failed`,{autoClose: 3000});         
        //       done()
        //       //setShowL(false)              
        //       //window.location.reload(false)       
        //       //console.log(err);
        //     });   
        //     }
        //     else{            
        //     toast.error(`Please Create Your Artist`,{autoClose: 3000});         
        //     done()
        //     // let ref2=firebase.database().ref(`userprofile/${localStorage.getItem('walletAddress')}`);                    
        //     // let dateset=new Date().toDateString();                
        //     // //console.log("data",data.val())
        //     // ref2.update({
        //     // Imageurl:"",bgurl:u,
        //     // UserName:"",Customurl:"",WalletAddress:localStorage.getItem('walletAddress'),
        //     // TimeStamp:dateset,Twittername:"",Personalsiteurl:"",Email:"",Bio:"",valid:""})
        //     // .then(()=>{          
        //     //   //setShowL(false)                                    
        //     //   //setShowDone(true)            
        //     //   toast.success(`Banner Upload SuccessFully`,{autoClose: 3000});         
        //     //   done()    
        //     // }).catch((err) => {                                    
        //     //   //setShowL(false)              
        //     //   toast.error(`Banner Upload Failed`,{autoClose: 3000});         
        //     //   done()
        //     //   //console.log(err);
        //     // });   
        //     }          
        //     console.log("CC",c)
        //   })
        //}
  
      }

    const dbcallalgos=async()=>{
        //console.log("inside dbcallalgo function")  
        let req = [];
        if(localStorage.getItem("walletAddress")  === null || localStorage.getItem("walletAddress")  === "" || localStorage.getItem("walletAddress")  === " " || localStorage.getItem("wallet") === undefined || localStorage.getItem("walletAddress") === ''){
        }
        else{
        let getalgo=localStorage.getItem("walletAddress");       
        firebase.auth().signInAnonymously().then((response)=>{             
          firebase.database().ref("imagerefexploreoneAlgos").child(getalgo).on("value", (data) => {
            if (data) {
              data.forEach((d) => {                
                let value=d.val();
                req.push(            
                  {
                    Assetid:value.Assetid,
                    Imageurl:value.Imageurl,
                    NFTPrice:value.NFTPrice,
                    EscrowAddress:value.EscrowAddress,
                    keyId:value.keyId,
                    NFTName:value.NFTName,
                    userSymbol:value.userSymbol,
                    Ipfsurl:value.Ipfsurl,
                    ownerAddress:value.ownerAddress,
                    previousoaddress:value.previousoaddress,
                    TimeStamp:value.TimeStamp,
                    NFTDescription:value.NFTDescription,
                    HistoryAddress:value.HistoryAddress,
                    Appid:value.Appid,
                    valid:value.valid,
                    CreatorAddress:value.CreatorAddress,
                    NFTType:value.NFTType,
                    NFTChannel:value.NFTChannel,
                    SocialLink:value.SocialLink
                  })                
                });        
              }
              setgetImgreffalgosale(req);
            });     
        })             
          }        
    }      
    useEffect(()=>{dbcallalgos()},[])
    const indexClient = new algosdk.Indexer('', node['indexerclient'], '');
    useEffect(() => {        
        async function listenMMAccount() {    
        if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === "0x" || localStorage.getItem("walletAddress") === undefined || localStorage.getItem("walletAddress") === ''){                  
        setalgobalanceApp("");      
        }
        else{          
            let accountInfo = await indexClient.lookupAccountByID(localStorage.getItem("walletAddress")).do();                        
            setalgobalanceApp((accountInfo['account']['amount']/1000000));
      }    
    }
    listenMMAccount();
    }, []);

    
    const dbcallalgo=async()=>{
        //console.log("inside dbcallalgo function")  
        let req = [];
        if(localStorage.getItem("walletAddress")  === null || localStorage.getItem("walletAddress")  === "" || localStorage.getItem("walletAddress")  === " " || localStorage.getItem("wallet") === undefined || localStorage.getItem("walletAddress") === ''){
        }
        else{
        let getalgo=localStorage.getItem("walletAddress");              
        firebase.auth().signInAnonymously().then((response)=>{      
          firebase.database().ref("imagerefAlgo").child(getalgo).on("value", (data) => {
            if (data) {
              data.forEach((d) => {                
                let value=d.val();
                req.push(            
                  {
                    Assetid:value.Assetid,
                    Imageurl:value.Imageurl,
                    NFTPrice:value.NFTPrice,
                    EscrowAddress:value.EscrowAddress,
                    keyId:value.keyId,
                    NFTName:value.NFTName,
                    userSymbol:value.userSymbol,
                    Ipfsurl:value.Ipfsurl,
                    ownerAddress:value.ownerAddress,
                    previousoaddress:value.previousoaddress,
                    TimeStamp:value.TimeStamp,
                    NFTDescription:value.NFTDescription,
                    HistoryAddress:value.HistoryAddress,
                    Appid:value.Appid,
                    valid:value.valid,
                    CreatorAddress:value.CreatorAddress,
                    NFTType:value.NFTType,
                    NFTChannel:value.NFTChannel,
                    SocialLink:value.SocialLink
                })                
                });        
              }
              setgetImgreffalgo(req);
            });          
        })        
          }        
    }      
    useEffect(()=>{dbcallalgo()},[])

    const dbcallalgoowned=async()=>{
        //console.log("inside dbcallalgo function")  
        let req = [];
        if(localStorage.getItem("walletAddress")  === null || localStorage.getItem("walletAddress")  === "" || localStorage.getItem("walletAddress")  === " " || localStorage.getItem("wallet") === undefined || localStorage.getItem("walletAddress") === ''){
        }
        else{
        let getalgo=localStorage.getItem("walletAddress");              
        firebase.auth().signInAnonymously().then((response)=>{      
          firebase.database().ref("imagerefbuy").child(getalgo).on("value", (data) => {
            if (data) {
              data.forEach((d) => {                
                let value=d.val();
                req.push(            
                  {
                    Assetid:value.Assetid,
                    Imageurl:value.Imageurl,
                    NFTPrice:value.NFTPrice,
                    EscrowAddress:value.EscrowAddress,
                    keyId:value.keyId,
                    NFTName:value.NFTName,
                    userSymbol:value.userSymbol,
                    Ipfsurl:value.Ipfsurl,
                    ownerAddress:value.ownerAddress,
                    previousoaddress:value.previousoaddress,
                    TimeStamp:value.TimeStamp,
                    NFTDescription:value.NFTDescription,
                    HistoryAddress:value.HistoryAddress,
                    Appid:value.Appid,
                    valid:value.valid,
                    CreatorAddress:value.CreatorAddress,
                    NFTType:value.NFTType,
                    NFTChannel:value.NFTChannel,
                    SocialLink:value.SocialLink
                })                
                });        
              }
              setgetImgreffalgoowned(req);
            });        
        })          
          }        
    }      
    useEffect(()=>{dbcallalgoowned()},[])
    

    // const waitForConfirmation = async function (algodclient, txId) {
    //     let status = (await algodclient.status().do());
    //     let lastRound = status["last-round"];
    //       while (true) {
    //         const pendingInfo = await algodclient.pendingTransactionInformation(txId).do();
    //         if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
    //           //Got the completed Transaction
    //           //console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
    //           break;
    //         }
    //         lastRound++;
    //         await algodclient.statusAfterBlock(lastRound).do();
    //       }
    // };


//     const saledb =(b) =>{
//         //setShowTestLoading(true)
//         //console.log("sale",props.dataall);
//         if(localStorage.getItem('walletAddress') === null || localStorage.getItem('walletAddress') === "" || localStorage.getItem('walletAddress') === undefined || localStorage.getItem('walletAddress') === " "){
//             //setissuesdisplay("please connect your wallet")
//             toast.warn(`please connect your wallet`,{autoClose: 5000});            
//             handleHideLoad()
//             //setshowTestAlert(true)                      
//             //alert("please connect your wallet")
//         }else if(localStorage.getItem('walletAddress') === b.ownerAddress){   
//             handleShowLoad()     
//             //fireDb.auth().signInAnonymously().then((response)=>{                     
//             let dateset=new Date().toDateString();      
//             fireDb.database().ref(`imagerefexploreoneAlgos/${localStorage.getItem('walletAddress')}`).child(b.keyId).set({
//                 Assetid:b.Assetid,Imageurl:b.Imageurl,NFTPrice:b.NFTPrice,EscrowAddress:b.EscrowAddress,keyId:b.keyId,
//                 NFTName:b.NFTName,userSymbol:b.userSymbol,Ipfsurl:b.Ipfsurl,ownerAddress:b.ownerAddress,previousoaddress:b.previousoaddress,
//                 TimeStamp:dateset,NFTDescription:b.NFTDescription,HistoryAddress:b.HistoryAddress,Appid:b.Appid,valid:b.valid,
//                 CreatorAddress:b.CreatorAddress,NFTType:b.NFTType,NFTChannel:b.NFTChannel,SocialLink:b.SocialLink
//               }).then(()=>{
//                 fireDb.database().ref(`imagerefAlgo/${localStorage.getItem('walletAddress')}`).child(b.keyId).remove();
//                 let refactivity=fireDb.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
//                 const db = refactivity.push().key;                         
//                 refactivity.child(db).set({
//                 Assetid:b.Assetid,Imageurl:b.Imageurl,NFTPrice:b.NFTPrice,EscrowAddress:"saleNFT",keyId:db,
//                 NFTName:b.NFTName,userSymbol:b.userSymbol,Ipfsurl:b.Ipfsurl,ownerAddress:b.ownerAddress,previousoaddress:localStorage.getItem('walletAddress'),                
//                 TimeStamp:dateset,NFTDescription:b.NFTDescription,HistoryAddress:b.HistoryAddress,Appid:b.Appid,valid:b.valid,
//                 CreatorAddress:b.CreatorAddress,NFTType:b.NFTType,NFTChannel:b.NFTChannel,SocialLink:b.SocialLink
//             })
//                 .then(()=>{                                                            
//                     //console.log("remove db");                    
//                     //setShowTestLoading(false)
//                     toast.success(`Moving NFT to Sale`,{autoClose: 5000});            
//                     handleHideLoad()
//                     done()
//                     //setshowTestSale(true)              
//                 })                                          
//               })
//             //})
//         }        
//     }

//     const setpricedb=async(b)=>{
//         console.log("BB",b)        
//         console.log("BBB",b.Assetid)        
//         //setShowTest(false)        
//         if(getprices === null || getprices === undefined || getprices === "" ){
//             toast.warning(`please enter price`,{autoClose:5000})
//             handleHideLoad()
//             //setissuesdisplay("please enter price")
//             //setshowTestAlert(true)                           
//             //setShowTest(true)            
//         }else if(isNaN(getprices))
//         {        
//             toast.warning(`please valid number`,{autoClose:5000})
//             handleHideLoad()
//             // setissuesdisplay("please valid number")
//             // setshowTestAlert(true)               
//             // setShowTest(true)            
//         }
//         else if(getprices === "0"){
//             toast.warning(`please enter above 0 price`,{autoClose:5000})
//             handleHideLoad()
//             //setissuesdisplay("please enter above 0 price")
//             //setshowTestAlert(true)                      
//             //setShowTest(true)            
//         }
//         else if(getprices === "00" || getprices === "000" || getprices === "0000" || getprices === "00000"){
//             toast.warning(`you are entered zeros`,{autoClose:5000})
//             handleHideLoad()
//             // setissuesdisplay("you are entered zeros")
//             // setshowTestAlert(true)               
//             //alert("you are entered zeros")
//         }
//         else if(getprices.length >= 5 ){                                    
//             toast.warning(`you are entered Maximum Values`,{autoClose:5000})
//             handleHideLoad()
//             // setissuesdisplay("you are entered Maximum Values")
//             // setshowTestAlert(true)                           
//         }
//         else if(algobalanceApp === "" || algobalanceApp === "0" || algobalanceApp === undefined || algobalanceApp === null || algobalanceApp <= 3){
//             toast.warning(`Insufficient balance to create NFT`,{autoClose:5000})
//             handleHideLoad()
//             // setissuesdisplay("Insufficient balance to create NFT")
//             // setshowTestAlert(true)                           
//         }
//         else if(localStorage.getItem('walletAddress') === null || localStorage.getItem('walletAddress') === "" || localStorage.getItem('walletAddress') === undefined || localStorage.getItem('walletAddress') === " "){
//             toast.warning(`please connect your wallet`,{autoClose:5000})
//             handleHideLoad()
//             // setissuesdisplay("please connect your wallet")
//             // setshowTestAlert(true)                      
//             //alert("please connect your wallet")
//         }        
//         else{
//         let minbalance=await minAlgoBalance()
//         if(minbalance < "1258000"){
//             toast.error("Your Algo balance is low. Please get more Algos from dispenser",{autoClose:5000});              
//             handleHideLoad()
//         }
//         else{
//               //setShowTestLoading(true)        
//         handleShowLoad()     
//         let amountmul=(parseInt(getprices)*1000000);
//         toast.info("NFT Update InProgress",{autoClose:5000});         
//         // const baseServer = 'https://testnet-algorand.api.purestake.io/ps2';
//         // //const baseServer = 'https://testnet-algorand.api.purestake.io/ps2';
//         // const port = '';
//         // const token = {
//         //   'X-API-key' : `${configfile['purestakeapi']}`,
//         // }
//         // const algodClient = new algosdk.Algodv2(token, baseServer, port);//get                
//         //const indexClient = new algosdk.Indexer('', 'https://algoindexer.testnet.algoexplorerapi.io', '');
//         //const params = await algodClient.getTransactionParams().do();
//         //const algodClient = new algosdk.Algodv2('', 'https://node.testnet.algoexplorerapi.io', '');//post        
//         //const algodClient = new algosdk.Algodv2('', 'https://algoindexer.testnet.algoexplorerapi.io', '');    
//         let index = parseInt(configfile['appIdPrice']);  
//         let dataopreplace = dataescrowprice.replaceAll("AppID",parseInt(configfile['appIdPrice'])).replaceAll("AssId",parseInt(b.Assetid))        
//         console.log("DataReplace",dataopreplace)
//         const params = await algodClient.getTransactionParams().do();            
//         params.fee = 1000;
//         params.flatFee = true;        
//         console.log("Params",params)
        
//         let results = await algodClient.compile(dataopreplace).do();                
//         let program = new Uint8Array(Buffer.from(results.result, "base64"));   
//         console.log("CompileProgram",program)   
//         let lsig = new algosdk.LogicSigAccount(program);
//         //let lsig = algosdk.makeLogicSig(program);
//         console.log("CompileProgramLogic",lsig.address())   
//         try {            
            
//             let recv_escrow = lsig.address();
//             let amount = 961000;      
//             //let foreignassets = [];
//             //
//             //foreignassets.push(parseInt(b.Assetid));            
//             // let transaction1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
//             //   from: localStorage.getItem('walletAddress'), 
//             //   to: recv_escrow, 
//             //   amount: amount, 
//             //   note: undefined,  
//             //   suggestedParams: params
//             //  });     
//             //  let appArg = [];
//             //  //
//             //  appArg.push(new Uint8Array(Buffer.from("createlisting")));       
//             //  appArg.push(algosdk.encodeUint64(parseFloat(amountmul))); 
//             //  console.log("Apparg",parseFloat(amountmul))
//             //  const transaction2 = algosdk.makeApplicationNoOpTxnFromObject({
//             //     from: recv_escrow, 
//             //     appIndex: index,
//             //     appArgs: appArg,
//             //     accounts: [localStorage.getItem('walletAddress')],
//             //     foreignAssets:foreignassets,
//             //     suggestedParams: params
//             //   });                            
//             //    //foreignAssets:foreignassets,               
//             //   const transaction3 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
//             //     from: recv_escrow,
//             //     to: recv_escrow,
//             //     assetIndex: parseInt(b.Assetid),
//             //     note: undefined,                
//             //     foreignAssets:foreignassets,
//             //     amount: 0,
//             //     suggestedParams: params
//             //   });          
//             //   //parseInt(props.Assetid)
              
//             //   const transaction4 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
//             //     from: localStorage.getItem('walletAddress'),
//             //     to: recv_escrow,
//             //     assetIndex: parseInt(b.Assetid),
//             //     note: undefined,
//             //     amount: 1,
//             //     suggestedParams: params
//             //   });    

//       let foreignassets = [];
//       foreignassets.push(b.Assetid);

//       let transaction1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
//         from: localStorage.getItem('walletAddress'), 
//         to: recv_escrow, 
//         amount: amount, 
//          note: undefined,  
//          suggestedParams: params
//        });
     
//        let appArg = [];
       
//        appArg.push(new Uint8Array(Buffer.from("createlisting")));       
//        appArg.push(algosdk.encodeUint64(amountmul));
       
//        const transaction2 = algosdk.makeApplicationNoOpTxnFromObject({
//            from: recv_escrow, 
//            appIndex: index,
//            appArgs: appArg,
//            accounts: [localStorage.getItem('walletAddress')],
//            foreignAssets:foreignassets,
//            suggestedParams: params
//          });
      
         
//         const transaction3 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
//           from: recv_escrow,
//           to: recv_escrow,
//           assetIndex: parseInt(b.Assetid),
//           note: undefined,
//           foreignAssets:foreignassets,
//           amount: 0,
//           suggestedParams: params
//         });
    
      
//         const transaction4 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
//           from: localStorage.getItem('walletAddress'),
//           to: recv_escrow,
//           assetIndex: parseInt(b.Assetid),
//           note: undefined,
//           amount: 1,
//           suggestedParams: params
//         });
             
        

//         const groupID = algosdk.computeGroupID([ transaction1, transaction2, transaction3, transaction4]);
//       const txs = [ transaction1, transaction2, transaction3, transaction4];
//       txs[0].group = groupID;
//       txs[1].group = groupID;
//       txs[2].group = groupID;
//       txs[3].group = groupID;
     
      
//       const signedTx1 = await myAlgoWallet.signTransaction([txs[0].toByte(),txs[3].toByte()]);
//       const signedTx2 = algosdk.signLogicSigTransaction(txs[1], lsig);

//       const signedTx3 = algosdk.signLogicSigTransaction(txs[2], lsig);
//       // const signedTx4 = algosdk.signLogicSigTransaction(txs[3], lsig);
      

//   const response = await algodClient.sendRawTransaction([ signedTx1[0].blob, signedTx2.blob, signedTx3.blob, signedTx1[1].blob]).do();
//   console.log("TxID", JSON.stringify(response, null, 1));
//   await waitForConfirmation(algodClient, response.txId);

                        
      
// //       let foreignassets = [];
// //       foreignassets.push(76806280);

// //       let transaction1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
// //         from: localStorage.getItem('walletAddress'), 
// //         to: recv_escrow, 
// //         amount: amount, 
// //          note: undefined,  
// //          suggestedParams: params
// //        });
     
// //        let appArg = [];
// //        appArg.push(new Uint8Array(Buffer.from("createlisting")));       
// //        appArg.push(algosdk.encodeUint64(1000));
       
// //        const transaction2 = algosdk.makeApplicationNoOpTxnFromObject({
// //            from: recv_escrow, 
// //            appIndex: index,
// //            appArgs: appArg,
// //            accounts: [localStorage.getItem('walletAddress')],
// //            foreignAssets:foreignassets,
// //            suggestedParams: params
// //          });
      
         
// //         const transaction3 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
// //           from: recv_escrow,
// //           to: recv_escrow,
// //           assetIndex: 76806280,
// //           note: undefined,
// //           foreignAssets:foreignassets,
// //           amount: 0,
// //           suggestedParams: params
// //         });
    
      
// //         const transaction4 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
// //           from: localStorage.getItem('walletAddress'),
// //           to: recv_escrow,
// //           assetIndex: 76806280,
// //           note: undefined,
// //           amount: 1,
// //           suggestedParams: params
// //         });
             
        

// //         const groupID = algosdk.computeGroupID([ transaction1, transaction2, transaction3, transaction4]);
// //       const txs = [ transaction1, transaction2, transaction3, transaction4];
// //       txs[0].group = groupID;
// //       txs[1].group = groupID;
// //       txs[2].group = groupID;
// //       txs[3].group = groupID;
     
      
// //       const signedTx1 = await myAlgoWallet.signTransaction([txs[0].toByte(),txs[3].toByte()]);
// //       const signedTx2 = algosdk.signLogicSigTransaction(txs[1], lsig);

// //       const signedTx3 = algosdk.signLogicSigTransaction(txs[2], lsig);
// //       // const signedTx4 = algosdk.signLogicSigTransaction(txs[3], lsig);
      

// //   const response = await algodClient.sendRawTransaction([ signedTx1[0].blob, signedTx2.blob, signedTx3.blob, signedTx1[1].blob]).do();
// //   console.log("TxID", JSON.stringify(response, null, 1));
// //   await waitForConfirmation(algodClient, response.txId);


            
//         //   const groupID = algosdk.computeGroupID([ transaction1, transaction2, transaction3, transaction4]);
//         //   const txs = [ transaction1, transaction2, transaction3, transaction4];
//         //   txs[0].group = groupID;
//         //   txs[1].group = groupID;
//         //   txs[2].group = groupID;
//         //   txs[3].group = groupID;           
//         //   const signedTx1 = await myAlgoWallet.signTransaction([txs[0].toByte(),txs[3].toByte()]);
//         //   const signedTx2 = algosdk.signLogicSigTransaction(txs[1], lsig);
//         //   const signedTx3 = algosdk.signLogicSigTransaction(txs[2], lsig);      
//         //   const response = await algodClient.sendRawTransaction([ signedTx1[0].blob, signedTx2.blob, signedTx3.blob, signedTx1[1].blob]).do();

//             // const groupID = algosdk.computeGroupID([ transaction1, transaction2, transaction3, transaction4]);
//             // const txs = [ transaction1, transaction2, transaction3, transaction4];
//             // txs[0].group = groupID;
//             // txs[1].group = groupID;
//             // txs[2].group = groupID;
//             // txs[3].group = groupID;           
//             //const signedTx1 = await myAlgoWallet.signTransaction([txs[0].toByte(),txs[3].toByte()]);
//             // const signedTx11 = await myAlgoWallet.signTransaction(txs[0].toByte());
//             // const signedTx12 = await myAlgoWallet.signTransaction(txs[3].toByte());
//             // const signedTx2 = algosdk.signLogicSigTransaction(txs[1], lsig);
//             // const signedTx3 = algosdk.signLogicSigTransaction(txs[2], lsig);      
//             // const response = await algodClient.sendRawTransaction([ signedTx11.blob, signedTx2.blob, signedTx3.blob, signedTx12.blob]).do();

//           //this const response = await algodClient.sendRawTransaction([ signedTx1[0].blob, signedTx2.blob, signedTx3.blob, signedTx1[1].blob]).do();
//           //console.log("TxID", JSON.stringify(response, null, 1));
//           //await waitForConfirmation(algodClient, response.txId);
//           let cl=response.txId;
//           //toast.success(`Create Listing Sucessfully ${response.txId}`,{autoClose: 8000});            
//         //db here          
//         let dateset=new Date().toDateString();
//         //fireDb.auth().signInAnonymously().then((responses)=>{                     
//         fireDb.database().ref(`imagerefAlgo/${localStorage.getItem('walletAddress')}`).child(b.keyId).update({
//             Assetid:b.Assetid,Imageurl:b.Imageurl,NFTPrice:parseFloat(amountmul),EscrowAddress:lsig.address(),keyId:b.keyId,
//             NFTName:b.NFTName,userSymbol:b.userSymbol,Ipfsurl:b.Ipfsurl,ownerAddress:b.ownerAddress,previousoaddress:localStorage.getItem('walletAddress'),
//             TimeStamp:dateset,NFTDescription:b.NFTDescription,HistoryAddress:b.HistoryAddress,Appid:b.Appid,valid:b.valid,
//             CreatorAddress:b.CreatorAddress,NFTType:b.NFTType,NFTChannel:b.NFTChannel,SocialLink:b.SocialLink
//         }).then(()=>{  
//             let refactivity=fireDb.database().ref(`activitytable/${localStorage.getItem('walletAddress')}`);   
//             const db = refactivity.push().key;                         
//             refactivity.child(db).set({
//                 Assetid:b.Assetid,Imageurl:b.Imageurl,NFTPrice:parseFloat(amountmul),EscrowAddress:"priceupdated",keyId:db,
//                 NFTName:b.NFTName,userSymbol:b.userSymbol,Ipfsurl:b.Ipfsurl,ownerAddress:b.ownerAddress,previousoaddress:localStorage.getItem('walletAddress'),
//                 TimeStamp:dateset,NFTDescription:cl,HistoryAddress:b.HistoryAddress,Appid:b.Appid,valid:b.valid,
//                 CreatorAddress:b.CreatorAddress,NFTType:b.NFTType,NFTChannel:b.NFTChannel,SocialLink:b.SocialLink
//         })
//         .then(()=>{                                        
//             //handleHideLoad()
//             //setShowTestLoading(true)
//             //setshowTestDone(true)
//             toast.success(`NFT Update Successfully`,{autoClose: 5000});            
//             handleHideLoad()
//             done()
//             })                        
//         })            
//     //})
//         //db end here                  
//     } catch (err) {
//             console.error(err);
//             //setShowTestLoading(false)
//             toast.error(`your browser appearing issue`,{autoClose: 5000});            
//             handleHideLoad()
//             done()
//             //toast.dismiss();
//             //setissuesdisplay("your browser appearing issue")
//             //setshowTestAlert(true)                      
//             // alert("you wallet raises some issues")
//             //window.location.reload(false)
//           }

//         }              
//         }            
//     }
    // const refresh=()=>{
    //     setshowTestDone(false)
    //     window.location.reload(false)                        
    // }
    // const refreshSale2=()=>{
    //     setshowTestAlert(false)
    //     //history.push('/')
    //     //window.location.reload(false)            
    // }
    // const refreshSale=()=>{
    //     setshowTestSale(false)
    //     window.location.reload(false)
    // }

    const dbcallalgoActivity=async()=>{
        //console.log("inside dbcallalgo function")          
        let req = [];
        if(localStorage.getItem("walletAddress")  === null || localStorage.getItem("walletAddress")  === "" || localStorage.getItem("walletAddress")  === " " || localStorage.getItem("wallet") === undefined || localStorage.getItem("walletAddress") === ''){
        }
        else{            
        let getalgo=localStorage.getItem("walletAddress");      
        firebase.auth().signInAnonymously().then((response)=>{              
          firebase.database().ref("activitytable").child(getalgo).on("value", (data) => {
            if (data) {
              data.forEach((d) => {                
                let value=d.val();                
                req.push(            
                  {
                    Assetid:value.Assetid,
                    Imageurl:value.Imageurl,
                    NFTPrice:value.NFTPrice,
                    EscrowAddress:value.EscrowAddress,
                    keyId:value.keyId,
                    NFTName:value.NFTName,
                    userSymbol:value.userSymbol,
                    Ipfsurl:value.Ipfsurl,
                    ownerAddress:value.ownerAddress,
                    previousoaddress:value.previousoaddress,
                    TimeStamp:value.TimeStamp,
                    NFTDescription:value.NFTDescription,
                    HistoryAddress:value.HistoryAddress,
                    Appid:value.Appid,
                    valid:value.valid,
                    CreatorAddress:value.CreatorAddress,
                    NFTType:value.NFTType,
                    NFTChannel:value.NFTChannel,
                    SocialLink:value.SocialLink
                })                
                });        
              }
              setgetImgreffalgoActivity(req);
            });    
        })              
          }        
    }      
    useEffect(()=>{dbcallalgoActivity()},[])
    const dbcallalgoLiked=async()=>{
        //console.log("inside dbcallalgo function")          
        let req = [];
        if(localStorage.getItem("walletAddress")  === null || localStorage.getItem("walletAddress")  === "" || localStorage.getItem("walletAddress")  === " " || localStorage.getItem("wallet") === undefined || localStorage.getItem("walletAddress") === ''){
        }
        else{            
        //let getalgo=localStorage.getItem("walletAddress");      
        firebase.auth().signInAnonymously().then((response)=>{              
          firebase.database().ref("LikedImage").child(localStorage.getItem("walletAddress")).on("value", (data) => {
            if (data) {
              data.forEach((d) => {                
                let value=d.val();                
                req.push(            
                  {
                    Assetid:value.Assetid,
                    Imageurl:value.Imageurl,
                    NFTPrice:value.NFTPrice,
                    EscrowAddress:value.EscrowAddress,
                    keyId:value.keyId,
                    NFTName:value.NFTName,
                    userSymbol:value.userSymbol,
                    Ipfsurl:value.Ipfsurl,
                    ownerAddress:value.ownerAddress,
                    previousoaddress:value.previousoaddress,
                    TimeStamp:value.TimeStamp,
                    NFTDescription:value.NFTDescription,
                    HistoryAddress:value.HistoryAddress,
                    Appid:value.Appid,
                    valid:value.valid,
                    CreatorAddress:value.CreatorAddress,
                    NFTType:value.NFTType,
                    NFTChannel:value.NFTChannel,
                    SocialLink:value.SocialLink
                })                
                });        
                setgetImgreffalgoLiked(req);
              }
              
            });    
        })              
          }        
    }      
    useEffect(()=>{dbcallalgoLiked()},[])

    const filterdata=()=>{
        let dateset=new Date().toDateString();
        let today= new Date();
        let weekdate=new Date(today.getFullYear(), today.getMonth(), today.getDate()-3).toDateString();
        // console.log("DateExplore",weekdate)
        // console.log("DateExplore2",dateset)
        if(searchText === "")
        {                          
        if(getrecent === "Recently added"){        
          let data=getImgreffalgosale.reverse().filter((val)=> (val.TimeStamp) <= weekdate || (val.TimeStamp) >= dateset)
        //   console.log("filtercall12",data)
          return data;        
        }
        if(getrecent === "Low to High"){
          let data=getImgreffalgosale.sort((a,b)=>{ return parseFloat(a.NFTPrice/1000000) - parseFloat(b.NFTPrice/1000000)})
          //console.log("filtercall1",data)
          return data;
        }
        if(getrecent ===  "High to Low"){
          let data=getImgreffalgosale.sort((a,b)=>{ return parseFloat(b.NFTPrice/1000000) - parseFloat(a.NFTPrice/1000000)})
          //console.log("filtercall1",data)
          return data;
        }
        }
        else{
                let data = getImgreffalgosale.filter((val)=>{
                if(val.NFTName === "" || val.NFTName === null || val.NFTName === undefined){    
                }else{
                let val1 = (val.NFTName).toLowerCase().includes(searchText.toLocaleLowerCase())                                
                return val1
                }            
            })                                    
            return data;
        }                
        return getImgreffalgosale
    }

    const filterdata2=()=>{
        let dateset=new Date().toDateString();
        let today= new Date();
        let weekdate=new Date(today.getFullYear(), today.getMonth(), today.getDate()-3).toDateString();
        // console.log("DateExplore",weekdate)
        // console.log("DateExplore2",dateset)
        if(searchText === "")
        {                          
        if(getrecent === "Recently added"){        
            let data=getImgreffalgosowned.reverse().filter((val)=> (val.TimeStamp) <= weekdate || (val.TimeStamp) >= dateset)
        //   console.log("filtercall12",data)
          return data;        
        }
        if(getrecent === "Low to High"){
          let data=getImgreffalgosowned.sort((a,b)=>{ return parseFloat(a.NFTPrice/1000000) - parseFloat(b.NFTPrice/1000000)})
          //console.log("filtercall1",data)
          return data;
        }
        if(getrecent ===  "High to Low"){
          let data=getImgreffalgosowned.sort((a,b)=>{ return parseFloat(b.NFTPrice/1000000) - parseFloat(a.NFTPrice/1000000)})
          //console.log("filtercall1",data)
          return data;
        }
        }
        else{
                let data = getImgreffalgosowned.filter((val)=>{
                if(val.NFTName === "" || val.NFTName === null || val.NFTName === undefined){    
                }else{
                let val1 = (val.NFTName).toLowerCase().includes(searchText.toLocaleLowerCase())                                
                return val1
                }            
            })                                    
            return data;
        }                
        return getImgreffalgosowned
    }

    const filterdata3=()=>{
        let dateset=new Date().toDateString();
        let today= new Date();
        let weekdate=new Date(today.getFullYear(), today.getMonth(), today.getDate()-3).toDateString();
        // console.log("DateExplore",weekdate)
        // console.log("DateExplore2",dateset)
        if(searchText === "")
        {                          
        if(getrecent === "Recently added"){                  
          let data=getImgreffalgo.reverse().filter((val)=> (val.TimeStamp) <= weekdate || (val.TimeStamp) >= dateset)
        //   console.log("filtercall12",data)
          return data;        
        }
        if(getrecent === "Low to High"){
          let data=getImgreffalgo.sort((a,b)=>{ return parseFloat(a.NFTPrice/1000000) - parseFloat(b.NFTPrice/1000000)})
          //console.log("filtercall1",data)
          return data;
        }
        if(getrecent ===  "High to Low"){
          let data=getImgreffalgo.sort((a,b)=>{ return parseFloat(b.NFTPrice/1000000) - parseFloat(a.NFTPrice/1000000)})
          //console.log("filtercall1",data)
          return data;
        }
        }
        else{
                let data = getImgreffalgo.filter((val)=>{
                if(val.NFTName === "" || val.NFTName === null || val.NFTName === undefined){    
                }else{
                let val1 = (val.NFTName).toLowerCase().includes(searchText.toLocaleLowerCase())                                
                return val1
                }            
            })                                    
            return data;
        }                
        return getImgreffalgo
    }
    const filterdata4=()=>{
        let dateset=new Date().toDateString();
        let today= new Date();
        let weekdate=new Date(today.getFullYear(), today.getMonth(), today.getDate()-3).toDateString();
        // console.log("DateExplore",weekdate)
        // console.log("DateExplore2",dateset)
        if(searchText === "")
        {                          
        if(getrecent === "Recently added"){                  
          let data=getImgreffalgoLiked.reverse().filter((val)=> (val.TimeStamp) <= weekdate || (val.TimeStamp) >= dateset)
        //   console.log("filtercall12",data)
          return data;        
        }
        if(getrecent === "Low to High"){
          let data=getImgreffalgoLiked.sort((a,b)=>{ return parseFloat(a.NFTPrice/1000000) - parseFloat(b.NFTPrice/1000000)})
          //console.log("filtercall1",data)
          return data;
        }
        if(getrecent ===  "High to Low"){
          let data=getImgreffalgoLiked.sort((a,b)=>{ return parseFloat(b.NFTPrice/1000000) - parseFloat(a.NFTPrice/1000000)})
          //console.log("filtercall1",data)
          return data;
        }
        }
        else{
                let data = getImgreffalgoLiked.filter((val)=>{
                if(val.NFTName === "" || val.NFTName === null || val.NFTName === undefined){    
                }else{
                let val1 = (val.NFTName).toLowerCase().includes(searchText.toLocaleLowerCase())                                
                return val1
                }            
            })                                    
            return data;
        }                
        return getImgreffalgoLiked
    }

    const filterdata5=()=>{
        let dateset=new Date().toDateString();
        let today= new Date();
        let weekdate=new Date(today.getFullYear(), today.getMonth(), today.getDate()-3).toDateString();
        // console.log("DateExplore",weekdate)
        // console.log("DateExplore2",dateset)
        if(searchText === "")
        {                          
        if(getrecent === "Recently added"){                  
          let data=getImgreffalgoActivity.reverse().filter((val)=> (val.TimeStamp) <= weekdate || (val.TimeStamp) >= dateset)
        //   console.log("filtercall12",data)
          return data;        
        }
        if(getrecent === "Low to High"){
          let data=getImgreffalgoActivity.sort((a,b)=>{ return parseFloat(a.NFTPrice/1000000) - parseFloat(b.NFTPrice/1000000)})
          //console.log("filtercall1",data)
          return data;
        }
        if(getrecent ===  "High to Low"){
          let data=getImgreffalgoActivity.sort((a,b)=>{ return parseFloat(b.NFTPrice/1000000) - parseFloat(a.NFTPrice/1000000)})
          //console.log("filtercall1",data)
          return data;
        }
        }
        else{
                let data = getImgreffalgoActivity.filter((val)=>{
                if(val.NFTName === "" || val.NFTName === null || val.NFTName === undefined){    
                }else{
                let val1 = (val.NFTName).toLowerCase().includes(searchText.toLocaleLowerCase())                                
                return val1
                }            
            })                                    
            return data;
        }                
        return getImgreffalgoActivity
    }

    const decrementSize=()=>{
        if(pageSize >= 16){
        setPageSize(pageSize-4)
        }        
    }
    

    const alertOpen=()=>{
        toast.warning(`Please Connect Your Wallet`,{autoClose: 8000});            
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
     }
      const done=async()=>{
        await sleep(7000);
        history.push("/my-NFT")
        window.location.reload(false);    
      } 
            
    //   useEffect(() => {
    //     fetchPostsTau();
    //   }, []);

      
    return (
        <Layout>
            <Container>
            <ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/>            
                <Card className='card-dash mb-4 d-block border-0'>                    
                    
                                        
                         <Row className='align-items-center'>
                         <Col lg={4} className="order-lg-2 mb-lg-0 mb-2 text-end">
                         {getIProfile === "" || getIProfile === null || getIProfile === undefined  || getIProfile[0] === "" || getIProfile[0] === null || getIProfile[0] === undefined?( 
                             <>
                             {localStorage.getItem('walletAddress') === "" || localStorage.getItem('walletAddress') === null || localStorage.getItem('walletAddress') === undefined ?(
                                 <Button className='btn btn-blue' onClick={()=>{alertOpen()}}>Create Artist</Button>

                             ):(
                                <Button className='btn btn-blue' onClick={()=>{history.push({
                                 pathname: '/create-artists'
                                })}}>Create Artist</Button>
                             )}
                             
                             </>
                         ):(
                             <>
                             <Button className='btn btn-blue' onClick={()=>{history.push({
                                 pathname: '/create-artists'
                             })}}>Edit Artist</Button>&nbsp;
                             <Button className='btn btn-blue' onClick={()=>{history.push({
                                 pathname: '/Mint-NFT'
                             })}}>Mint NFT</Button>
                             </>
                         )}
                             
                         </Col>
                         <div className="profile-banner">
                    <div className="profile-card">
                    {getIProfile[0] === null || getIProfile[0] === "" || getIProfile[0] === undefined || getIProfile[0] === " "  ? (
                        <>
                          <img src={Icon1} alt="pics" width={"1500px"} height={"260px"} />
                        </>
                      ):(
                        <>
                        {getIProfile[0].bgurl === null || getIProfile[0].bgurl === "" || getIProfile[0].bgurl === undefined || getIProfile[0].bgurl === " " ? (<>
                          <img src={Icon1} alt="pics" width={"1500px"} height={"260px"} />
                        </>):(
                          <>
                          <img src={getIProfile[0].bgurl} alt="pic" width={"1500px"} height={"260px"}/>
                        </>
                        )}                        
                        </>
                      )}                        
                      <Button variant='blue' onClick={handleShow}>Add cover</Button>
                    </div>                   
                      {getIProfile[0] === null || getIProfile[0] === "" || getIProfile[0] === undefined || getIProfile[0] === " "  ? (
                        <> <Link className='profile-pic'>
                          <img src={Icon1} alt="pic" />
                          </Link>
                        </>
                      ):(
                        <>
                        {getIProfile[0].Imageurl === null || getIProfile[0].Imageurl === "" || getIProfile[0].Imageurl === undefined || getIProfile[0].Imageurl === " "  ? (<>
                            <Link className='profile-pic'>
                          <img src={Icon1} alt="pic" />
                          </Link>
                        </>):(<> 
                            <Link className='profile-pic'>                       
                          <img src={getIProfile[0].Imageurl} alt="pic" />
                          </Link>
                        </>)}
                        
                        </>
                      )}
                                            
                         </div>
                         <Col lg={8}>
                             <div className='d-flex flex-wrap flex-lg-nowrap align-items-center create-art'>
                             {/* {getIProfile === "" || getIProfile === null || getIProfile === undefined || getIProfile[0] === "" || getIProfile[0] === null || getIProfile[0] === undefined?(
                                 <img src={Icon1} alt="art" className='me-3' />                                 
                             ):(
                                 <img src={getIProfile[0].Imageurl} alt="art" className='me-3' />
                                 
                             )} */}
                                 
                                 <div className=''>
                                     {getIProfile === "" || getIProfile === null || getIProfile === undefined || getIProfile[0] === "" || getIProfile[0] === null || getIProfile[0] === undefined?(
                                         <>
                                         <p className='subheading mb-0'>Name : <strong>{configfile.nullvalue}</strong> </p>
                                         <p className='subheading mb-0'>Social : {configfile.nullvalue} <br />Wallet address : {configfile.nullvalue} </p>
                                         </>
                                     ):(
                                         <>
                                         <p className='subheading mb-0'>Name : <strong>{getIProfile[0].UserName}</strong></p>
                                         <p className='subheading mb-0'>Social : 
                                             {getIProfile[0].Personalsiteurl === null || getIProfile[0].Personalsiteurl === undefined || getIProfile[0].Personalsiteurl === "" ? (
                                                <strong> {configfile.nullvalue} </strong>
                                             ):(
                                                // <a  href={getIProfile[0].Personalsiteurl} target="_blank" rel="noreferer">
                                                <strong>
                                                    &nbsp;
                                                {getIProfile[0].Personalsiteurl}
                                                &nbsp;
                                                </strong>
                                                // <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi ms-2 bi-box-arrow-up-right" viewBox="0 0 16 16">
                                                // <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                                                // <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                                                // </svg>
                                                // </a>
                                             )}
                                              <br />Wallet address : 
                                         {/* className='mb-3 ms-3 text-text-FF d-flex align-items-center btn-link' */}
                                         &nbsp;
                                        <a  href={"https://testnet.algoexplorer.io/address/" + localStorage.getItem("walletAddress")} target="_blank" rel="noreferer">
                                        <strong>{localStorage.getItem('walletAddress').slice(0,12)}....{localStorage.getItem('walletAddress').slice(50,58)} </strong>
                                        &nbsp;
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi ms-2 bi-box-arrow-up-right" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                                                <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                                                </svg>
                                        </a>                                        
                                         <p className='subheading mb-0'>Twitter : {getIProfile[0].Twittername === null || getIProfile[0].Twittername === undefined || getIProfile[0].Twittername === "" ? (
                                            <strong>{configfile.nullvalue}</strong>
                                         ):(
                                            <a  href={"https://twitter.com/" + getIProfile[0].Twittername} target="_blank" rel="noreferer">
                                            <strong>
                                            {getIProfile[0].Twittername}
                                            &nbsp;
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi ms-2 bi-box-arrow-up-right" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                                                <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                                                </svg>
                                            </strong>
                                            </a>
                                         )}
                                         {/* <p>Personalsite-url : {getIProfile[0].Personalsiteurl === null || getIProfile[0].Personalsiteurl === undefined || getIProfile[0].Personalsiteurl === "" ? (
                                            <>
                                            {configfile.nullvalue}
                                            </>
                                         ):(
                                            <>
                                            <a  href={getIProfile[0].Personalsiteurl} target="_blank" rel="noreferer">
                                            {getIProfile[0].Personalsiteurl}
                                            &nbsp;
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi ms-2 bi-box-arrow-up-right" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                                                <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                                                </svg>
                                            </a>
                                            
                                            </>
                                         )}</p></p> */}
                                         </p>
                                         </p>
                                         </>
                                     )}
                                     
                                 </div>
                             </div>

                             {/* {getIProfile === "" || getIProfile === null || getIProfile === undefined  || getIProfile[0] === "" || getIProfile[0] === null || getIProfile[0] === undefined?(
                             <></>
                             ):(
                             <Button className='btn btn-blue' onClick={()=>{history.push({
                                 pathname: '/create-artists'
                             })}}>Edit Artist</Button>
                             )} */}
                         </Col>
                     </Row>                                        
                   
                </Card>
             
                <div className='nft-tabs'>
                    <InputGroup className="input-group-search float-md-end">
                        <Form.Control placeholder="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
                        <Button variant="outline-secondary" id="button-addon2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </Button>
                    </InputGroup>
                    <Tabs defaultActiveKey="all" id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="all" title="On Sale">
                            <div className='d-flex justify-content-end mb-3'>
                            <Dropdown>
                                <Dropdown.Toggle variant='dark' className='noarrow' id="dropdown-basic">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi ms-0 me-2 bi-sort-down-alt" viewBox="0 0 16 16">
                                        <path d="M3.5 3.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 12.293V3.5zm4 .5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1h-1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1h-3zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1h-5zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5z"/>
                                    </svg> Sort
                                </Dropdown.Toggle>

                                <Dropdown.Menu className='list-unstyled' align="end">
                                    <Form.Check 
                                        type='radio'
                                        id="sort 1"
                                        label="Latest first"
                                        name="sort"
                                        onChange={()=>{setrecent("Recently added")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 2"
                                        name="sort"
                                        label="Price low - high"
                                        onChange={()=>{setrecent("Low to High")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 3"
                                        name="sort"
                                        label="Price high - low"
                                        onChange={()=>{setrecent("High to Low")}}
                                    />
                                </Dropdown.Menu>
                            </Dropdown>
                            </div>
                            <Row>
                            {getImgreffalgosale[0] === null || getImgreffalgosale[0] === undefined || getImgreffalgosale[0] === null || filterdata()[0] === null || filterdata()[0] === "" || filterdata()[0] === undefined ? (
                                <div className="no-found py-5p text-center">
                                <h2>No Data Found</h2>
                                {/* <p className="lead mb-4">Subscribe to authors and come back to see <br />NFTs from your favorite artists</p> */}
                                <Link to="/my-NFT" className='btn btn-primary'>Browse marketplace</Link>
                                </div>
                            ):(
                                <>
                                {filterdata().map((x, index) => {   
                                    if(index<pageSize)                
                                    return( 
                                        <Col xxl={3} md={4} sm={6} xs={12} className='mb-4'>
                                        <Card className='card-dash p-3 d-block border-0'>
                                            <div className='card-img text-center mb-2'>
                                                {/* <Link to="/NFT-details"> */}
                                                    <img src={x.Imageurl} alt="image" className='img-fluid' />
                                                {/* </Link> */}
                                            </div>
                                            <div className='d-flex mb-2 justify-content-between flex-wrap align-items-center'>
                                                {/* <h6 className='subheading'>Images</h6> */}
                                                {/* <Badge bg="purple">Image</Badge> */}
                                            </div>
                                            <p className='mb-2'>{x.NFTName} <br /><span className='text-success'>
                                            {x.SocialLink === null || x.SocialLink === "" || x.SocialLink === undefined ?(
                                                <>{configfile.nullvalue}</>
                                            ):(
                                                <>{x.SocialLink}</>
                                            )}                                                
                                                </span></p>
                                            <h4 className='d-flex mb-3 align-items-center'><img src={getIProfile[0].Imageurl} alt="logo" className='me-2 avatar-pic' /> {x.NFTPrice/1000000}</h4> 
                                            {/* {x.NFTPrice === "" || x.NFTPrice === null || x.NFTPrice === undefined ?(
                                                <>                                            
                                                <input type="text" placeholder='Enter Price' className="className='d-flex mb-3 align-items-center" onChange={event => setprices( event.target.value)}/>
                                                <Button variant="blue" className='w-100' onClick={()=>{setpricedb(x)}}>Set Price</Button>                                        
                                                </>
                                            ):(
                                                <Button variant="blue" className='w-100' onClick={()=>{saledb(x)}}>Sale</Button>                                        
                                            )}  */}
                                        </Card>
                                        </Col>
                                    )
                                })} 
                                </>                                                                                          
                            )}                                                        
                            </Row>

                            <div className='pagination justify-content-end d-flex align-items-center'>
                                {/* <div className='page-count'>1</div>
                                <div className='page-numbers'>of 49</div> */}
                                <Button variant='page' onClick={()=>{decrementSize()}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                    </svg>
                                </Button>
                                <Button variant='page' onClick={()=>{setPageSize(pageSize+4)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </Button>
                            </div>
                        </Tab>
                        <Tab eventKey="hot-collection" title="Owned">
                            <div className='d-flex justify-content-end mb-3'>
                            <Dropdown>
                                <Dropdown.Toggle variant='dark' className='noarrow' id="dropdown-basic">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi ms-0 me-2 bi-sort-down-alt" viewBox="0 0 16 16">
                                        <path d="M3.5 3.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 12.293V3.5zm4 .5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1h-1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1h-3zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1h-5zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5z"/>
                                    </svg> Sort
                                </Dropdown.Toggle>

                                <Dropdown.Menu className='list-unstyled' align="end">
                                    <Form.Check 
                                        type='radio'
                                        id="sort 1"
                                        label="Latest first"
                                        name="sort"
                                        onChange={()=>{setrecent("Recently added")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 2"
                                        name="sort"
                                        label="Price low - high"
                                        onChange={()=>{setrecent("Low to High")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 3"
                                        name="sort"
                                        label="Price high - low"
                                        onChange={()=>{setrecent("High to Low")}}
                                    />
                                </Dropdown.Menu>
                            </Dropdown>
                            </div>
                            <Row>
                            {getImgreffalgosowned[0] === null || getImgreffalgosowned[0] === undefined || getImgreffalgosowned[0] === null || filterdata2()[0] === null || filterdata2()[0] === "" || filterdata2()[0] === undefined ? (
                                <div className="no-found py-5p text-center">
                                <h2>No Data Found</h2>
                                {/* <p className="lead mb-4">Subscribe to authors and come back to see <br />NFTs from your favorite artists</p> */}
                                <Link to="/my-NFT" className='btn btn-primary'>Browse marketplace</Link>
                                </div>
                            ) : (
                            <>
                            {filterdata2().map((x, index) => { 
                                if(index<pageSize)                 
                                return( 
                                    <Col xxl={3} md={4} sm={6} xs={12} className='mb-4'>
                                    <Card className='card-dash p-3 d-block border-0'>
                                        <div className='card-img text-center mb-2'>
                                            {/* <Link to="/NFT-details"> */}
                                                <img src={x.Imageurl} alt="image" className='img-fluid' />
                                            {/* </Link> */}
                                        </div>
                                        <div className='d-flex mb-2 justify-content-between flex-wrap align-items-center'>
                                            {/* <h6 className='subheading'>Images</h6> */}
                                            {/* <Badge bg="purple">Image</Badge> */}
                                        </div>
                                        <h5 className='mb-2'>{x.NFTName} <br />
                                        </h5>
                                        <p className='subheading mb-0'>
                                        <span className='text-success'>
                                            {x.SocialLink === null || x.SocialLink === "" || x.SocialLink === undefined ?(
                                                <>{configfile.nullvalue}</>
                                            ):(
                                                <h6>{x.SocialLink}</h6>
                                            )}                                            
                                        </span>
                                        </p>
                                        <br />
                                        <h4 className='d-flex mb-3 align-items-center'><img src={getIProfile[0].Imageurl} alt="logo" className='me-2 avatar-pic' /> {x.NFTPrice/1000000}</h4> 
                                        {x.NFTPrice === "" || x.NFTPrice === null || x.NFTPrice === undefined ?(
                                            <>                                            
                                            {/* <input type="text" placeholder='Enter Price' className="mb-3 form-control form-control-field border-0 pt-1 text-center" onChange={(event) => {setprices( event.target.value)}}/> */}
                                            {/* <ButtonLoad loading={loader} variant="blue" className='w-100' onClick={()=>{setpricedb(x)}}>Set Price</ButtonLoad>    */}
                                            </>
                                        ):(
                                            <>
                                            {/* <Button variant="blue" className='w-10' onClick={()=>{setpricedb(x)}}>Update Price</Button>                                                                                 
                                            <Button variant="blue" className='w-50' onClick={()=>{saledb(x)}}>ReSale</Button>                                         */}
                                            </>
                                        )} 
                                    </Card>
                                    </Col>
                                )
                            })}                                                                
                            </>
                            )}
                            </Row>

                            <div className='pagination justify-content-end d-flex align-items-center'>
                                {/* <div className='page-count'>1</div>
                                <div className='page-numbers'>of 49</div> */}
                                <Button variant='page' onClick={()=>{decrementSize()}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                    </svg>
                                </Button>
                                <Button variant='page' onClick={()=>{setPageSize(pageSize+4)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </Button>
                            </div>
                        </Tab>                        
                        <Tab eventKey="popular-collection" title="Created">

                            <div className='d-flex justify-content-end mb-3'>
                            <Dropdown>
                                <Dropdown.Toggle variant='dark' className='noarrow' id="dropdown-basic">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi ms-0 me-2 bi-sort-down-alt" viewBox="0 0 16 16">
                                        <path d="M3.5 3.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 12.293V3.5zm4 .5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1h-1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1h-3zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1h-5zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5z"/>
                                    </svg> Sort
                                </Dropdown.Toggle>

                                <Dropdown.Menu className='list-unstyled' align="end">
                                    <Form.Check 
                                        type='radio'
                                        id="sort 1"
                                        label="Latest first"
                                        name="sort"
                                        onChange={()=>{setrecent("Recently added")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 2"
                                        name="sort"
                                        label="Price low - high"
                                        onChange={()=>{setrecent("Low to High")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 3"
                                        name="sort"
                                        label="Price high - low"
                                        onChange={()=>{setrecent("High to Low")}}
                                    />
                                </Dropdown.Menu>
                            </Dropdown>
                            </div>
                            <Row>
                            {getImgreffalgo === null || getImgreffalgo === "" || getImgreffalgo === undefined || getImgreffalgo[0] === null || getImgreffalgo[0] === "" || getImgreffalgo[0] === undefined || filterdata3()[0] === null || filterdata3()[0] === "" || filterdata3()[0] === undefined ? (
                                <div className="no-found py-5p text-center">
                                <h2>No Data Found</h2>
                                {/* <p className="lead mb-4">Subscribe to authors and come back to see <br />NFTs from your favorite artists</p> */}
                                <Link to="/my-NFT" className='btn btn-primary'>Browse marketplace</Link>
                                </div>
                            ) : (
                            <>
                                {/* <Col xxl={3} md={4} sm={6} xs={12} className='mb-4'> */}
                                {/* setMax ={(value)=>setprice2(value)} */}
                                {filterdata3().map((x, index) => {  
                                    if(index<pageSize)                 
                                    return( 
                                    <CreateTab x={x} />
                                    )
                                })}
                                </>
                            )}
                                {/* </Col> */}
                                
                            </Row>

                            <div className='pagination justify-content-end d-flex align-items-center'>
                                {/* <div className='page-count'>1</div>
                                <div className='page-numbers'>of 49</div> */}
                                <Button variant='page' onClick={()=>{decrementSize()}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                    </svg>
                                </Button>
                                <Button variant='page' onClick={()=>{setPageSize(pageSize+4)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </Button>
                            </div>
                        </Tab>
                        <Tab eventKey="Liked" title="Liked">
                            <div className='d-flex justify-content-end mb-3'>
                            <Dropdown>
                                <Dropdown.Toggle variant='dark' className='noarrow' id="dropdown-basic">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi ms-0 me-2 bi-sort-down-alt" viewBox="0 0 16 16">
                                        <path d="M3.5 3.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 12.293V3.5zm4 .5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1h-1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1h-3zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1h-5zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5z"/>
                                    </svg> Sort
                                </Dropdown.Toggle>

                                <Dropdown.Menu className='list-unstyled' align="end">
                                    <Form.Check 
                                        type='radio'
                                        id="sort 1"
                                        label="Latest first"
                                        name="sort"
                                        onChange={()=>{setrecent("Recently added")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 2"
                                        name="sort"
                                        label="Price low - high"
                                        onChange={()=>{setrecent("Low to High")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 3"
                                        name="sort"
                                        label="Price high - low"
                                        onChange={()=>{setrecent("High to Low")}}
                                    />
                                </Dropdown.Menu>
                            </Dropdown>
                            </div>
                            <Row>
                            {getImgreffalgoLiked[0] === null || getImgreffalgoLiked[0] === undefined || getImgreffalgoLiked[0] === null  || filterdata4()[0] === null  || filterdata4()[0] === "" || filterdata4()[0] === undefined? (
                                <div className="no-found py-5p text-center">
                                <h2>No Data Found</h2>
                                {/* <p className="lead mb-4">Subscribe to authors and come back to see <br />NFTs from your favorite artists</p> */}
                                <Link to="/my-NFT" className='btn btn-primary'>Browse marketplace</Link>
                            </div>
                            ):(
                            <>
                            {filterdata4().map((x, index) => {   
                                if(index<pageSize)                
                                return( 
                                    <Col xxl={3} md={4} sm={6} xs={12} className='mb-4'>
                                    <Card className='card-dash p-3 d-block border-0'>
                                        <div className='card-img text-center mb-2'>
                                            {/* <Link to="/NFT-details"> */}
                                                <img src={x.Imageurl} alt="image" className='img-fluid' />
                                            {/* </Link> */}
                                        </div>
                                        <div className='d-flex mb-2 justify-content-between flex-wrap align-items-center'>
                                            {/* <h6 className='subheading'>Images</h6> */}
                                            {/* <Badge bg="purple">Image</Badge> */}
                                        </div>
                                        <h5 className='mb-2'>{x.NFTName} <br />
                                        </h5>
                                        <p className='subheading mb-0'>
                                        <span className='text-success'>
                                            {x.SocialLink === null || x.SocialLink === "" || x.SocialLink === undefined ?(
                                                <>{configfile.nullvalue}</>
                                            ):(
                                                <h6>{x.SocialLink}</h6>
                                            )}                                            
                                        </span>
                                        </p>
                                        <br />
                                        <h4 className='d-flex mb-3 align-items-center'><img src={getIProfile[0].Imageurl} alt="logo" className='me-2 avatar-pic' /> {parseFloat(x.NFTPrice/1000000)}</h4> 
                                        {/* {x.NFTPrice === "" || x.NFTPrice === null || x.NFTPrice === undefined ?(
                                            <>                                            
                                            <input type="text" placeholder='Enter Price' className="className='d-flex mb-3 align-items-center" onChange={event => setprices( event.target.value)}/>
                                            <Button variant="blue" className='w-100' onClick={()=>{setpricedb(x)}}>Set Price</Button>                                        
                                            </>
                                        ):(
                                            <Button variant="blue" className='w-100' onClick={()=>{saledb(x)}}>Sale</Button>                                        
                                        )}  */}
                                    </Card>
                                    </Col>
                                )
                            })}   
                            </>                                                             
                            )}
                            </Row>

                            <div className='pagination justify-content-end d-flex align-items-center'>
                                {/* <div className='page-count'>1</div>
                                <div className='page-numbers'>of 49</div> */}
                                <Button variant='page' onClick={()=>{decrementSize()}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                    </svg>
                                </Button>
                                <Button variant='page' onClick={()=>{setPageSize(pageSize+4)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </Button>
                            </div>
                        </Tab>                                            
                        <Tab eventKey="Activity" title="Activity">
                            <div className='d-flex justify-content-end mb-3'>
                            <Dropdown>
                                <Dropdown.Toggle variant='dark' className='noarrow' id="dropdown-basic">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi ms-0 me-2 bi-sort-down-alt" viewBox="0 0 16 16">
                                        <path d="M3.5 3.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 12.293V3.5zm4 .5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1h-1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1h-3zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1h-5zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5z"/>
                                    </svg> Sort
                                </Dropdown.Toggle>

                                <Dropdown.Menu className='list-unstyled' align="end">
                                    <Form.Check 
                                        type='radio'
                                        id="sort 1"
                                        label="Latest first"
                                        name="sort"
                                        onChange={()=>{setrecent("Recently added")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 2"
                                        name="sort"
                                        label="Price low - high"
                                        onChange={()=>{setrecent("Low to High")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 3"
                                        name="sort"
                                        label="Price high - low"
                                        onChange={()=>{setrecent("High to Low")}}
                                    />
                                </Dropdown.Menu>
                            </Dropdown>
                            </div>
                            <Row>
                            {getImgreffalgoActivity === null || getImgreffalgoActivity === "" || getImgreffalgoActivity === undefined || getImgreffalgoActivity[0] === null || getImgreffalgoActivity[0] === "" || getImgreffalgoActivity[0] === undefined || filterdata5()[0] === null || filterdata5()[0] === "" || filterdata5()[0] === undefined ? (
                                <div className="no-found py-5p text-center">
                                <h2>No Data Found</h2>
                                {/* <p className="lead mb-4">Subscribe to authors and come back to see <br />NFTs from your favorite artists</p> */}
                                <Link to="/my-NFT" className='btn btn-primary'>Browse marketplace</Link>
                                </div>
                            ) : (
                            <>
                            {filterdata5().map((x, index) => {   
                                if(index<pageSize)                
                                return( 
                                    // <Col xxl={3} md={4} sm={6} xs={12} className='mb-4'>                                    
                                    <Card className='card-dash p-3 d-block border-0'>
                                    <div className='activity-item d-flex align-items-center mb-3'>        
                                            <div className="activity-content">
                                                {/* <h4><Link to="/activity">{props.dataall.NFTName}</Link></h4> */}
                                                {/* <img src={props.image} alt="icon" /> </Link>*/}
                                                <p>  {x.EscrowAddress}</p>
                                                {x.Assetid === "" || x.Assetid === null || x.Assetid === undefined ?(<>
                                                </>):(<>
                                                    <p style={{cursor: 'pointer'}} onClick={() => window.open(`https://testnet.algoexplorer.io/asset/${x.Assetid}`)}>  {x.Assetid}</p>
                                                </>)}
                                                <p style={{cursor: 'pointer'}} onClick={() => window.open(`https://testnet.algoexplorer.io/address/${x.ownerAddress}`)}> {x.ownerAddress}</p>                
                                                {x.NFTDescription === "" || x.NFTDescription === null || x.NFTDescription === undefined ?(<>
                                                </>):(<>
                                                    <p style={{cursor: 'pointer'}} onClick={() => window.open(`https://testnet.algoexplorer.io/tx/${x.NFTDescription}`)}>  {x.NFTDescription}</p>
                                                </>)}
                                                <div className="time">{x.TimeStamp}</div>
                                                
                                            </div>
                                        </div>
                                                                        
                                        {/* {x.NFTPrice === "" || x.NFTPrice === null || x.NFTPrice === undefined ?(
                                            <>                                            
                                            <input type="text" placeholder='Enter Price' className="className='d-flex mb-3 align-items-center" onChange={event => setprices( event.target.value)}/>
                                            <Button variant="blue" className='w-100' onClick={()=>{setpricedb(x)}}>Set Price</Button>                                        
                                            </>
                                        ):(
                                            <Button variant="blue" className='w-100' onClick={()=>{saledb(x)}}>Sale</Button>                                        
                                        )}  */}
                                    </Card>
                                    // </Col>
                                )
                            })}  
                            </>
                            )}                                                              
                            </Row>

                            <div className='pagination justify-content-end d-flex align-items-center'>
                                {/* <div className='page-count'>1</div>
                                <div className='page-numbers'>of 49</div> */}
                                <Button variant='page' onClick={()=>{decrementSize()}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                    </svg>
                                </Button>
                                <Button variant='page' onClick={()=>{setPageSize(pageSize+4)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </Button>
                            </div>
                        </Tab>                                            
                    </Tabs>                                                   
                </div>
                <Modal show={show} size="sm" className="modal-reset" centered >
                <Modal.Header >
                <Modal.Title>Update cover</Modal.Title>
                </Modal.Header>
                <Modal.Body>                    
                    <div className="mt-3">
                      {localStorage.getItem('walletAddress') === null || localStorage.getItem('walletAddress') === undefined || localStorage.getItem('walletAddress') === "" ? (
                      <>
                      <Link >
                      <label htmlFor="uploadFile" className='mb-3 btn btn-primary btn-lg w-100' onClick={()=>{window.location.reload()}}>Please Connect Wallet</label>
                      </Link>
                      </>
                      ):(
                      <>
                      Upload new cover for your profile page. We recommend to upload images in 1500x260 resolution
                      <input type="file" hidden id='uploadFile' onChange = {captureFile}/>
                      <label htmlFor="uploadFile" className='mb-3 btn btn-primary btn-lg w-100'>Select file</label>
                      <Button variant="white" className='w-100' size={'lg'} onClick={handleClose}>
                          Cancel
                      </Button>
                      </>
                      )}
                        
                    </div>
                </Modal.Body>
               </Modal>
            </Container>
        </Layout>
    )
}

export default MyNFT;