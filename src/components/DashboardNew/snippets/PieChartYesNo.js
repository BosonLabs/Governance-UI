import React, {useState, useEffect} from 'react';
import Doughnut from 'react-apexcharts';
import governance from '../governance.json';
import firebase from '../../../NFTFolder/firebase';
const PieChart = () => {
    
    const[totalYes,setTotalYes]= useState();
    const[totalNo,setTotalNo]= useState();
    const[voteYes,setVoteYes]= useState();
    const[voteNo,setVoteNo]= useState();
    const[result,setResult]= useState();
    const[yesPercent,setYesPercent]= useState();
    const[noPercent,setNoPercent]= useState();
    const[totalVotePercent,setTotalVotePercent]= useState();
    const[yesPercentValue,setYesPercentValue]= useState();
    const[noPercentValue,setNoPercentValue]= useState();
    const[totalVotePercentValue,setTotalVotePercentValue]= useState();
    const [commitamount,setcommitamount] = useState("");
    const [planetamount,setPlanetAmount] = useState(0);
    const [algoAmount,setAlgoAmount] = useState(0);
    const [count,setCount] = useState(0);
    const [eligible,setEligible] = useState(0);
    const [noteligible,setNotEligible] = useState(0);
    
    //console.log("noteligible",noteligible);


    const dbcallProfile=async()=>{            
        let r=[];
        try { 
            let TPA=0;   
            let TALA=0;  
            let Totalcount=0; 
            let Totaleligible=0;
            let Totalnoteligible=0;
            let totalYesCount=0;
            let totalNoCount=0;
            let Decision=0;
        firebase.database().ref("Registeruser").on("value", (data) => {     
        // firebase.database().ref(`Registeruser/${localStorage.getItem("walletAddress")}`).on("value", (data) => {          
                                   
                if (data) {
                    data.forEach((d) => { 
                      Totalcount=Totalcount +1;
                      let value=d.val();
                    //   console.log("valuecheck",value);
                      if(d.val().Assettype==="Planet"){
                                TPA= TPA + parseFloat(d.val().Amount) ;
                      }
                      else if(d.val().Assettype==="Algos"){
                        TALA=TALA + parseFloat(d.val().Amount);
                      }
                      if(d.val().Eligibility==="1"||d.val().Eligibility=== 1){
                        Totaleligible=Totaleligible + 1;
                      }
                      else if(d.val().Eligibility==="0"||d.val().Eligibility=== 0){
                        Totalnoteligible=Totalnoteligible + 1;
                    }
                    if(d.val().Decision === "YES" && (d.val().Eligibility==="1"||d.val().Eligibility=== 1))
                    {
                      totalYesCount++;
                    }
                    else if(d.val().Decision === "NO" && (d.val().Eligibility==="1"||d.val().Eligibility=== 1))
                    {
                      totalNoCount++;
                    }
                    

                    //   r.push({
                                    
    
                    //     id:d.val().id,
                    //     WalletAddress:d.val().WalletAddress,
                    //     TimeStamp:d.val().TimeStamp,
                    //     Amount:d.val().Amount,
                    //     Eligibility:d.val().Eligibility,
                    //     Assettype:d.val().Assettype,
                    //     Vote:d.val().Vote
                        
                    // })  
                    let countEligible = parseInt(count) - parseInt(noteligible);

                    setYesPercent(((parseInt(totalYes) / (parseInt(countEligible))) * 100).toFixed(0));
                    setNoPercent(((parseInt(totalNo) / (parseInt(countEligible))) * 100).toFixed(0));
                
                //console.log("count", parseInt(countEligible));
                
                    setYesPercentValue(((parseInt(totalYes) / (parseInt(countEligible))) * 100).toFixed(2));
                    setNoPercentValue(((parseInt(totalNo) / (parseInt(countEligible))) * 100).toFixed(2));
                
                    //console.log("totalYes", parseInt(totalYes), "totalNo", parseInt(totalNo));
                    setTotalVotePercent((((parseFloat(parseInt(totalYes) + parseInt(totalNo)) / parseInt(count)) * 100).toFixed(0)));             
                    setTotalVotePercentValue(((parseFloat(parseInt(totalYes) + parseInt(totalNo)) / parseInt(countEligible)) * 100).toFixed(2));  
                    let nowInMs = Date.now();
                    let nowInSecond = Math.round(nowInMs/1000);
                    
                    console.log("date", nowInSecond);
                    if((totalYesCount > totalNoCount) && (nowInSecond >= governance["endTimeVote"]))
                    {
                        setResult(1);  
                    }
                    else if((totalYesCount < totalNoCount) && (nowInSecond >= governance["endTimeVote"])) {
                        setResult(0);  
                    }
                    else{
                        setResult(2);
                    }
                      
      })
      setPlanetAmount(TPA);
       setAlgoAmount(TALA); 
       setCount(Totalcount);
       setEligible(Totaleligible);
       setNotEligible(Totalnoteligible); 
       setTotalYes(totalYesCount);
       setTotalNo(totalNoCount);                   
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
    useEffect(()=>{dbcallProfile()},[totalYes, totalNo, planetamount, algoAmount, count, eligible, noteligible, yesPercent, noPercent, yesPercentValue, noPercentValue, result])

    const series1 = [parseInt(yesPercent), parseInt(noPercent), parseInt(100 - totalVotePercent)];
    const options1 = {
        chart: {
            height: 350,
            type: 'donut',
            toolbar: {
            show: false
            },
            zoom: {
                enabled: true
            }
        },
        colors: ['#9aea3b', '#FF0000', '#0042ac'],
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth',
            width: 2,
            colors: ['#252525']
        },
        tooltip: {
            theme: 'dark',
            shared: true
        },
        title: {
            text: '',
            align: 'left'
        },
        markers: {
            size: 0
        },
        legend: {
            show: false
        }
    }
    
    return (
        (typeof window !== 'undefined') &&
            <Doughnut
                options={options1}
                series={series1}
                type="donut"
                height={250}
            />
    );
}

export default PieChart