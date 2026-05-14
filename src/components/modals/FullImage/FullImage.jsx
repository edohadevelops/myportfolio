import React from 'react';
import './style.css';
import { IoMdClose } from "react-icons/io";

const FullImage = ({img,name,setFullScreen}) => {
    const handleBackdropClick = (e) => {
        if(e.target === e.currentTarget){
            setFullScreen(false)
        }
    }
  return (
    <div className='full-image-modal'>
      <div className="relative flex items-center justify-center h-full px-4" onClick={(e) => handleBackdropClick(e)}>
        <div className="full-image">
            <img src={img} alt={`full-image-${name}`} />
        </div>
        <button onClick={()=>setFullScreen(false)} className='full-image-modal-close-btn'>
            <IoMdClose />
        </button>
      </div>
    </div>
  )
}

export default FullImage
