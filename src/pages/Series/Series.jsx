import React, {useState, useEffect} from 'react'
import SingleTrends from '../../components/SingleTrends/SingleTrends';

const Series = () => {
  const [series, setSeries] = useState([])
  const [page, setPage] = useState(1)
  
  const apiKey = import.meta.env.VITE_API_KEY;
  const url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`;

  const fetchSeries = async () => {
    const response = await fetch(url)
    const data =  await response.json()

    setSeries(data.results)
  }

  useEffect(() => {
    fetchSeries()
  }, [])

  return (
    <div>
        <h2 className='page-title'>Tv Series</h2>
        { series && series?.map((serie) => (

          <SingleTrends key={serie.id} 
            id={serie.id} 
            poster={serie.poster_path} 
            title={serie.title || serie.name} 
            date={serie.first_air_date || serie.release_date} 
            // media_type= "movie" ? "TV Serie" :
            vote_average={serie.vote_average} />
        ))

        }

        <Pagination series={series} page={page} setPage={setPage}/>
    </div>
  )
}

export default Series