import React from 'react'
import {useEffect,useState} from 'react'
import './searchBox.css'
import { BsSearch } from 'react-icons/bs';
import axios from 'axios'
import ItemComponent from './ItemComponent';


function MainPage({token}) {

    const [data, setData] = useState([])
    const [item,setItem] = useState({})
    const [show, setShow] = useState(false)

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const fetchData = async()=>{
              
        const resp = await axios.get(`https://staging.fastor.in/v1/m/restaurant?city_id=118`,config)
        setData(resp.data)
    }
    console.log(data)

    useEffect(()=>{
      fetchData();
    },[])

    const handleClick = (item) =>{
        setItem(item)
        setShow(true)
    } 

  return (
    <>
  <div className='searchBox'>
    <input 
    placeholder='Search...'
    className='input' />
    <button style={{width:"50px",borderRadius:"8px",border:"1px solid gray",marginLeft:"-50px"}}><BsSearch/></button>
  </div>

  {!show && ( 
          <div className='mainPage'>

          {data.length == 0 && (
              <>
              <h2>Data is Loading....Please Wait!!</h2>
              </>
          )}
    
          {
              data && (
                  <>
                       <div style={{display:"flex",flexWrap:"wrap",padding:"15px"}}>
                           {
                                 data.map((item,index)=>
                         
                                 <div onClick={()=>{handleClick(item)}} style={{border:"none",boxShadow:"1px 1px 8px 1px rgba(0,0,0,0.25)",height:"281px",width:"150px",margin:"5px",borderRadius:"15px"}}>
                                     <img style={{width:"131px",height:"113px",borderRadius:"15px",margin:"10px"}} src={item.images[0].url} alt="img1" />
                                    <span style={{marginLeft:"10px",fontWeight:"450"}}>{item.restaurant_name}</span><br/>
                                 </div>
                              
                             )
                           }
                    
                      </div>
                  </>
              )
          }
    
      </div>
  )}
{
    show && <ItemComponent item={item} back={setShow}/>
}


    </>
  )
}

export default MainPage