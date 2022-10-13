import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

//  These are the lists used in the application. You can move them to any component needed.
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Filters extends Component {
  state = {userData: {}, isLoading: true, fail: false}

  componentDidMount() {
    this.renderUserProfile()
  }

  renderLoader = () => (
    <div>
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderUserProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        name: fetchedData.profile_details.name,
        profileImageUrl: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
      }
      this.setState({
        userData: updatedData,
        isLoading: false,
      })
    } else {
      this.setState({fail: true})
    }
  }

  renderFailureView = () => (
    <div className="product-details-failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="product-not-found-heading">Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <Link to="https://apis.ccbp.in/profile">
        <button type="button" className="button">
          Retry
        </button>
      </Link>
    </div>
  )

  renderHandling = () => {
    const {fail} = this.state
    return fail ? this.renderFailureView() : this.renderUserDetails()
  }

  renderUserDetails = () => {
    const {userData} = this.state
    return (
      <div className="cont2">
        <div className="fil-cont">
          <div>
            <img src={userData.profileImageUrl} alt="profile" />
            <h1>{userData.name}</h1>
            <p>{userData.shortBio}</p>
          </div>
        </div>
        <hr className="hr" />
        <div className="cont3">
          <div>
            <h1 className="text2">Type of Employment</h1>
            <ul className="ul">
              {employmentTypesList.map(each => (
                <li className="lii">
                  <input type="checkbox" id={each.employmentTypeId} />
                  <label htmlFor={each.employmentTypeId} className="text2">
                    {each.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <hr className="hr" />

          <div>
            <h1 className="text2">Salary Range</h1>
            <ul className="ul">
              {salaryRangesList.map(each => (
                <li className="lii">
                  <input type="radio" id={each.salaryRangeId} />
                  <label htmlFor={each.salaryRangeId} className="text2">
                    {each.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return isLoading ? this.renderLoader() : this.renderHandling()
  }
}

export default Filters
