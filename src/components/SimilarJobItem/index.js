import {BsStar, BsFillBriefcaseFill} from 'react-icons/bs'
import {HiLocationMarker} from 'react-icons/hi'
import './index.css'

const SimilarJobItem = props => {
  const {each, key} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    id,
    rating,
    title,
  } = each

  return (
    <li className="li-item">
      <div>
        <div className="cont-1">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="logo"
          />
          <div className="column">
            <h1 className="text1">{title}</h1>
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
          <h1 className="text2">Description</h1>
          <p className="text3">{jobDescription}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
