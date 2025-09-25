import { img_300,unavailable } from '../../config/config'
import './SingleTrends.css'

const SingleTrends = ({id, poster, title, date, vote_average, media_type}) => {
  return (
    <div className='single_movie'>
        <img className='poster' src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
        <h3 className='title'>{title}</h3>
        <div className='subTitle'>
            <span>{media_type === "tv" ? "TV Series" : "Movie"}</span>
            <span>{date}</span>
        </div>
    </div>
  )
}

export default SingleTrends