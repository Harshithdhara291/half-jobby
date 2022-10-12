import {BsStar, BsFillBriefcaseFill} from 'react-icons/bs'
import {HiLocationMarker} from 'react-icons/hi'
import './index.css'

const SimilarJobItem = props => {
  const {each} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = each

  return (
    <li className="li-item">
      <div>
        <div className="cont-1">
          <img src={companyLogoUrl} alt="company logo" className="logo" />
          <div className="column">
            <p className="text1">{title}</p>
            <div className="rating">
              <BsStar className="star" />
              <p className="text">{rating}</p>
            </div>
          </div>
        </div>
        <div className="cont-2">
          <div className="cont">
            <div className="cont">
              <HiLocationMarker className="icon" />
              <p className="text2">{location}</p>
            </div>
            <div className="cont">
              <BsFillBriefcaseFill className="icon" />
              <p className="text2">{employmentType}</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="cont-3">
          <p className="text2">Description</p>
          <p className="text3">{jobDescription}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
