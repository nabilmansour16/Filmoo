import { useEffect, useState } from 'react';
import Card from '../component/Card';
import Pagination from '../component/Pagination.jsx';
import { getPopularMovies } from '../services/api';

function Home() {
  const [movie, setMovie] = useState([]);
  const [couneter, setCounter] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch movies
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPopularMovies(couneter);
        setMovie(data.results);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [couneter]);

  // Filter movies
  const filtredMovie = movie.filter((m) =>
    m.original_title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className='bg-[#060D17] min-h-screen'>
      <div className="flex justify-center pt-8 pb-4">
        <input
          className='p-3 rounded-xl outline-none bg-gray-800 text-white w-full max-w-md focus:ring-2 focus:ring-blue-500 transition-shadow'
          type="text"
          value={search}
          placeholder='Search movies...'
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {/* Error State */}
      {error && <p className="text-red-500 text-center mt-10">{error}</p>}

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center items-center p-6">
          {filtredMovie.length > 0 ? (
            filtredMovie.map((item) => (
              <div key={item.id}>
                <Card item={item} />
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-lg mt-10">No movies found.</p>
          )}
        </div>
      )}

      {/* Pagination */}
      {!loading && !error && (
        <div className="pb-10">
          <Pagination item={couneter} setCounter={setCounter} />
        </div>
      )}
    </div>
  );
}

export default Home;
