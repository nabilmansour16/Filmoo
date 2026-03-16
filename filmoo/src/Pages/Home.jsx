import { useEffect, useState } from 'react'

import axios from 'axios'
import Card from '../component/Card'
import Pagination from '../component/Pagination.jsx'

function Home() {

  const [movie, setMovie] = useState([])
  const [couneter, setCounter] = useState(1)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${couneter}`, {
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMWQzMDE0ODk4ODg0NTk0ZmE1YjNiOWM3N2FhYTUxMCIsIm5iZiI6MTc1ODkwMDkxNi45MzI5OTk4LCJzdWIiOiI2OGQ2YjJiNGZkNDlkZDk2YTc2OTc0ZmUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.L-Ety4mC9N5s5ecV9bPmFNnSyKroVqOCY8U49n3vQf0'
          }
        })
        // console.log(response);
        setMovie(response.data.results)
      }
      catch (error) {
        console.error(error);
      }
    }
    getMovies()
  }, [couneter]
  )



const filtredMovie = movie.filter((m)=> m.original_title.toLowerCase().includes(search.toLowerCase()))

  console.log(filtredMovie);

  return (
    <div className='bg-[#060D17] h-full'>
      <div>
        
        <input className='mx-30 my-[20px] p-2 rounded-[10px] outline-none bg-amber-50' type="text" 
        value={search}
        placeholder='Search' onChange={(event) => { 
          setSearch(event.target.value)
        }} />
      </div>
          
      <div className="bg-[#060D17] flex flex-wrap gap-5 justify-center items-center p-5">
        {/* <button className='bg-white' onClick={()=> setCounter(couneter+1)}>  next </button> */}
        {filtredMovie.map((item) => {
          return (
            <div>
              <Card item={item} />
            </div>
          )
        }
        )}
      </div>

        <div>
        <Pagination item={couneter} setCounter={setCounter} />
        </div>
    </div>

    // <div>


    // {
    //   movie.map ( (m) => {

    //     return (
    //     <div>
    //           <img src={`https://image.tmdb.org/t/p/w500/${m.poster_path}`} alt="" />
    //     </div>
    //     )
    //   }
    // )
    // }
    // </div>
  )
}

export default Home
