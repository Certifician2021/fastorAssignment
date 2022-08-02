import React from 'react'
import { IoIosArrowBack } from 'react-icons/io';
import {useState} from 'react'
import Share from './Share'


function ItemComponent({item,back}) {
    const [modal, setModal] = useState(false)

  return (
    <>
        {modal && <Share label="Share"
      title="My Web Share Adventures"
      text="Hello World! I shared this content via Web Share" />}
    <div style={{margin:"20px",zIndex:"100"}} onClick={()=>back(false)}><IoIosArrowBack/></div>
    <img style={{width:"330px",height:"315px",borderRadius:"15px",margin:"10px"}} src={item.images[0].url} alt="img1" />
    <span style={{marginLeft:"10px",fontWeight:"450",fontSize:"30px"}}>{item.restaurant_name}</span><br/>


    <span style={{marginLeft:"10px",fontSize:"24px",Color:"gray"}}>{ item.currency.symbol  + item.avg_cost_for_two}</span>

    <button style={{width:"80px",height:"45px"}} onClick={()=>setModal(true)}>SHARE</button>
    </>
  )
}

export default ItemComponent