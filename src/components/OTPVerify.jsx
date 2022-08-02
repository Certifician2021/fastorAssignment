import React from 'react'
import OtpInput from 'react-otp-input';
import {useState} from 'react'
import MainPage from './MainPage'
import axios from 'axios'

function OTPVerify({mobileNo,back}) {
    const [noti, setNoti] = useState();
    const [show, setShow] = useState(false);
    const [otp, setOtp] = useState()
    const [token, setToken] = useState()
    
    const otpData = ['123456']
  
    const handleInput = (value) => {
      setOtp(value)
    }
  
    const handleClick = async() => {
        const resp = await axios.post(`https://staging.fastor.in/v1/pwa/user/login`,{
          phone:mobileNo,
          dial_code:"+91",
          otp:otp
        })
       
        console.log(resp)
       
          if(resp.data.status == "Success"){
            setNoti(null)
            setShow(true)
            setToken(resp.data.data.token)
          }
          else{
            setNoti(` Sorry! Wrong OTP.`)
          }
        }
  
    return (
      <div className="App">
        {
          !show && (
            <>
             <div onClick={()=>back(false)}>&larr;</div>
            <div className="firstDiv">
         <h1>Verification Code</h1>
          <br />
         <small>We have sent the code verification to your registered mobile no. {mobileNo}</small><br/>    
       </div>
       <div className="secondDiv">
         <div className='inner'>
         <label>Enter OTP</label>
        <div className="inputfield" style={{display:"flex"}}>
        <OtpInput
        value={otp}
        inputStyle={{width:"35px",height:"30px",borderRadius:"5px",border:"1px solid black"}}
        onChange={(value)=>handleInput(value)}
        numInputs={6}
        separator={<span>&nbsp;</span>}
      />
        </div>
        <br/>
        {
          noti && <>
          <div style={{color:"red"}}>{noti}</div>
          </>
        }
         </div>
       
       
        <button onClick={()=>{handleClick()}} className='btn'>
          Continue
        </button>
       
       </div>
  
            </>
          )
        }
  
        {
          show && <MainPage token={token} back={setShow}/>
        }
       
      </div>
    );
}

export default OTPVerify