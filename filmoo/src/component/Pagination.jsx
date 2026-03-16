import React, { use } from 'react'

function Pagination({ item , setCounter }) {

  return (
    <div className='flex justify-center items-center gap-4 my-6'>
      <button  className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"

       onClick={()=> setCounter(prev => Math.max(prev -1,1)) }
       disabled={item === 1}
       >
        Précédent
      </button>

      <span className="mx-2 text-white">{item}</span>

      <button   className="px-4 py-2 bg-gray-700 text-white rounded-lg"

       onClick={()=> setCounter(prev => prev+1)}      >
        Suivant
      </button>
    </div>
  );
}

export default Pagination;