import React from 'react';
import { useNavigate } from 'react-router-dom';

function Card({ item }) {
  const navigate = useNavigate();
  
  return (
    <div 
      onClick={() => navigate(`/movie/${item.id}`)}
      className='w-[200px] h-[350px] rounded-[10px] cursor-pointer hover:scale-105 duration-300 transition-transform'
    > 
      <div className='flex flex-col gap-2 h-[200px]'>
         <img 
           className='rounded-[10px] shadow-lg' 
           src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} 
           height={'200px'} 
           alt={item.original_title || 'Movie Poster'} 
         />
         <p className='text-[15px] font-semibold font-poppins text-[#DDEAEF] text-center mt-2'>
           {item.original_title}
         </p>
      </div>
    </div>
  );
}

export default Card;