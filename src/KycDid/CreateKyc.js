import React,{ useEffect ,useState} from "react";
import { Link, useHistory } from "react-router-dom";
import {  Col, Container,Row } from "reactstrap";
import ButtonLoad from 'react-bootstrap-button-loader';
import Compress from "react-image-file-resizer";
import ipfs from "./ipfs";
//import Layout from '../components/Layouts/Layout';
//import Layout from '../components/Dashboard/Layout';
//import Layout from '../components/DashboardNew/Layout';
import Layout from '../components/DashboardNew/LayoutT';
import { ToastContainer, Zoom, toast} from 'react-toastify';
import fireDb from '../NFTFolder/firebase'
import config from '../NFTFolder/config.json'
const CreateKyc = () => {  
    let history=useHistory();      
    const[loader, setLoader] = useState(false);
    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false);              
    const[Name,setName]=useState("");
    const[Dob,setDob]=useState("");
    const[Address,setAddress]=useState("");
    const[Email,setEmail]=useState("");
    const[phoneNumber,setPhoneNumber]=useState("");
    const [Citizenship,setCitizenship] = useState("");  
    const [TypeOfProof,setTypeOfProof] = useState("");  
    const [ProofNumber,setProofNumber] = useState("");      
    const [Imgname,setImgname] = useState("")
    const [Img,setImg] = useState("")
    const [CurrentExit,setCurrentExit] = useState([]);  
    console.log("Dataget",CurrentExit)
    const [showTestLoading, setshowTestLoading] = React.useState(false);  
    console.log("Test",showTestLoading)    
    
    const dbcallalgo=async()=>{
      //console.log("inside dbcallalgo function")  
      let req = [];
      if(localStorage.getItem("walletAddress")  === null || localStorage.getItem("walletAddress")  === "" || localStorage.getItem("walletAddress")  === " " || localStorage.getItem("wallet") === undefined || localStorage.getItem("walletAddress") === ''){
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
              setshowTestLoading(true)
              });        
            }
            else{
              setshowTestLoading(false)
            }
            //setCurrentExit(false);
        });
        })
        }catch{          
        }                  
        }        
    }      
    useEffect(()=>{dbcallalgo()},[])

    const captureFile =async(event) => {
      event.stopPropagation()
      event.preventDefault()
      const file = event.target.files[0]
      setImgname(file.name)
      let reader = new window.FileReader()
      try{
      Compress.imageFileResizer(file, 500,500 , 'JPEG', 200, 0,
      uri => {        
        setImg(uri)
      },
      'base64'
      );
      reader.readAsArrayBuffer(file)      
    }catch (err) {
    }
    };
    const UploadDb=()=>{            
        if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === undefined || localStorage.getItem("walletAddress") === ""){
          toast.dismiss()
          toast.warning(`please connect your wallet`,{autoClose: 5000});            
          handleHideLoad()           
        }                
        else if(Name === ""){          
          toast.dismiss()
          toast.warning(`please enter Name`,{autoClose: 5000});            
          handleHideLoad()                     
        }
        else if(Dob === ""){
          toast.dismiss()
          toast.warning(`please enter Dob`,{autoClose: 5000});            
          handleHideLoad()                               
        }
        else if(Address === ""){
          toast.dismiss()
          toast.warning(`please enter Address`,{autoClose: 5000});            
          handleHideLoad()                                         
        }
        else if(Email === ""){
          toast.dismiss()
          toast.warning(`please enter Email`,{autoClose: 5000});            
          handleHideLoad()                                                   
        }
        else if(phoneNumber === ""){
          toast.dismiss()
          toast.warning(`please enter PhoneNumber`,{autoClose: 5000});            
          handleHideLoad()                                                             
        }
        else if(Citizenship === ""){
          toast.dismiss()
          toast.warning(`please enter Citizenship`,{autoClose: 5000});            
          handleHideLoad()                                                                       
        }
        else if(TypeOfProof === ""){
          toast.dismiss()
          toast.warning(`please enter TypeOfProof`,{autoClose: 5000});            
          handleHideLoad()                                                                                 
        }
        else if(ProofNumber === ""){
          toast.dismiss()
          toast.warning(`please enter ProofNumber`,{autoClose: 5000});            
          handleHideLoad()                                                                                           
        }
        else if(Img === ""){
          toast.dismiss()
          toast.warning(`please Upload Image`,{autoClose: 5000});            
          handleHideLoad()                                                                                                     
        }    
        else if(showTestLoading === false){     
          console.log("CurreentE",CurrentExit)          
          toast.dismiss()               
            handleShowLoad()     
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();
            today = mm + '/' + dd + '/' + yyyy;                                                                         
              fireDb.auth().signInAnonymously().then((response)=>{      
                let ref2=fireDb.database().ref(`kycplainjson/${localStorage.getItem('walletAddress')}`);            
                const db = ref2.push().key;                                                
                ref2.child(db).set({
                "dbkey":db,
                "createdDate": today,"Name": Name,
                "proofType": TypeOfProof,"algoAddress": localStorage.getItem("walletAddress"),
                "ProofNumber": Name,"selfiePath": Img,            
                "kycStatus": "create","reviewedBy": "pending","approvedBy": "","submittedDate": today,
                "reviewedDate": "","approvedDate": "","identity":Img,            
                "citizenship":Citizenship,
                "base64Image":Img,
                "assetId":"null",
                "address":Address,
                "dob":Dob,
                "email":Email,
                "phoneNumber":phoneNumber,
                })
                  .then(()=>{
                    toast.success("Register KYC successful",{autoClose: 5000});                 
                    handleHideLoad() 
                    history.push('/approvekyc')                          
                  })
                })                                  
        }       
        else{
          toast.dismiss()
          toast.warning(`Your Profile Already Create`,{autoClose: 5000});            
          handleHideLoad()                                                                                                                                                 
          }                             
    }                 
    
    const toastDiv = (txId) =>
    (
    <div>
         <p> Transaction is successful &nbsp;<a style={{color:'#133ac6'}} href={txId} target="_blank" rel="noreferrer"><br/><p style={{fontWeight: 'bold'}}>View in Algoexplorer <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M11.7176 3.97604L1.69366 14L0.046875 12.3532L10.0697 2.32926H1.23596V0H14.0469V12.8109H11.7176V3.97604Z" fill="#133ac6"/>
          </svg></p></a></p>  
     </div>
    );

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

return(
    <Layout>
      <ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/>
        <div className="page-content">        
          <Container fluid="md">
          {CurrentExit === null || CurrentExit === "" || CurrentExit === undefined ? (
          <>
          <p className='subheading mb-0'> <strong> Please upload KYC details </strong> </p>
          </>
          ):(
            <>
            {CurrentExit[0] === null || CurrentExit[0] === "" || CurrentExit[0] === undefined ? (
            <p className='subheading mb-0'> <strong> Please upload KYC details </strong> </p>
              ):(
                <>
              <p className='subheading mb-0'> <strong>Your KYC is Uploaded </strong></p>
              <br/>
                </>
              )}
            </>
          )}
            <div className="card-bond">
              <div className="card-bond-inner">          
          <form>
            <Row>
              <Col xs={6} className="mb-3">
                <label htmlFor="name">Name:</label>
                <input placeholder="Name" type="text" className="form-control form-control-reset" id="name" onChange={event => setName( event.target.value)}/>                
              </Col>
              <Col xs={6} className="mb-3">
                <label htmlFor="dob">DOB:</label>
                <input placeholder="DD/MM/YYYY" type="date" className="form-control form-control-reset" id="dob" onChange={event => setDob( event.target.value)}/>                
              </Col>
              <Col xs={6} className="mb-3">
                <label htmlFor="address">Address:</label>
                <input placeholder="Address" type="text" className="form-control form-control-reset" id="address" onChange={event => setAddress( event.target.value)}/>                
              </Col>
              <Col xs={6} className="mb-3">
                <label htmlFor="email">Email:</label>
                <input placeholder="Email" type="email" className="form-control form-control-reset" id="email" onChange={event => setEmail( event.target.value)}/>                
              </Col>
              <Col xs={6} className="mb-3">
                <label htmlFor="phonenumber">Phone Number:</label>
                <input placeholder="Phone Number" type="tel"  id="phonenumber" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" className="form-control form-control-reset" onChange={event => setPhoneNumber( event.target.value)}/>                
              </Col>
              <Col xs={6} className="mb-3">
                <label htmlFor="citizenship">Citizenship:</label>
                <input placeholder="Citizenship" type="text"  id="citizenship" className="form-control form-control-reset" onChange={event => setCitizenship( event.target.value)}/>                
              </Col>
              <Col xs={6} className="mb-3">
                <label htmlFor="top">Type of Proof:</label>
                <input placeholder="type of proof" type="text"  id="top" className="form-control form-control-reset" onChange={event => setTypeOfProof( event.target.value)}/>                
              </Col>
              <Col xs={6} className="mb-3">
                <label htmlFor="cor">Enter Proof Number:</label>
                <input placeholder="proof number" type="text"  id="cor" className="form-control form-control-reset" onChange={event => setProofNumber( event.target.value)}/>                
              </Col>
              <Col xs={12} md={6} className="mb-3">
                <label htmlFor="fileid">Select Image:</label>
                <input type="file" name="tfile" id="fileid" onChange = {captureFile} className="form-control form-control-reset"/>                
              </Col>
            </Row>            
               <ButtonLoad loading={loader} className='w-100 mb-3' onClick={()=>{UploadDb()}}>UPLOAD</ButtonLoad>            
          </form>
              </div>
            </div>
          </Container>
        </div>        
        </Layout>                      
)
}

export default CreateKyc;