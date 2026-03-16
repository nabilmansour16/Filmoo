import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router';
function Card({item}) {
  const navigate = useNavigate()
  // console.log('this is card',item);
  
  return (
    <div className='w-[200px] h-[350px] rounded-[10px]  cursor-pointer hover:scale-105 duration-300'> 
     <div className=' flex flex-col gap-2 h-[200px]'>
         <img className='rounded-[10px]' onClick={() => { navigate('/movie',{state:{data:item}})}} src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} height={'200px'} alt="no photo" />
         <p className='text-[15px] font-semibold font-poppins text-[#DDEAEF] text-center'>{item.original_title}</p>
     </div>
     

      
    </div>
  )
}
export default Card