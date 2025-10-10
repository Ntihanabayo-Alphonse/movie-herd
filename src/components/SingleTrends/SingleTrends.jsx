import { img_300,unavailable } from '../../config/config'
import './SingleTrends.css'

const SingleTrends = ({id, poster, title, date, vote_average, media_type}) => {
const badgeStyle = {
    backgroundColor: vote_average >= 6 ? '#ff5100' : '#5b5d84ff',
    color: 'white',
    padding: vote_average >= 7 && vote_average < 8 ? '2px 4px' : '2px',
    borderRadius: '50%',
    fontSize: '12px', 
    fontWeight: 'bold',
    position: 'absolute',
    top: '0',
    right: '0'
  }
  
  return (
    <div className='single_movie'>
      <span style={badgeStyle}>{vote_average.toFixed(1)}</span>
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