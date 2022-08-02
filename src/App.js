import React from 'react'
import {useState} from 'react'
import './App.css';
import OTPVerify from './components/OTPVerify';
import axios from 'axios'


function App() {

  const [value, setValue] = useState();
  const [noti, setNoti] = useState();
  const [data, setData] = useState({})
  const [show, setShow] = useState(false);
  
  const mobileData = ['8882906174']

  const handleInput = (e) => {
    setValue(e.target.value)
  }

 const handleClick = async() => {
 const resp = await axios.post(`https://staging.fastor.in/v1/pwa/user/register`,{
   phone:value,
   dial_code:"+91"
 })

 console.log(resp)

   if(resp.data.status == "Success"){
     setNoti(null)
     setShow(true)
   }
   else{
     setNoti(` Sorry! You are not registered with us.`)
   }
 }

  return (
    <div className="App">
      {
        !show && (
          <>
          <div className="firstDiv">
       <h1>Login</h1>
        <br />
       <small>Welcome back!</small><br/>  
       <small>Please login to continue</small>

     </div>
     <div className="secondDiv">
       <div className='inner'>
       <label>Mobile Number</label>
      <div className="inputfield" style={{display:"flex"}}>
      <input style={{width:"10%"}} readOnly value="+91" onChange={()=>{}}/>
      <input
      style={{width:"90%"}}
      defaultValue={value}
      type="tel"
      onChange={(e)=>handleInput(e)}
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
        Request OTP
      </button>
     
     </div>

          </>
        )
      }

      {
        show && <OTPVerify mobileNo={value} back={setShow}/>
      }
     
    </div>
  );
}

export default App;
