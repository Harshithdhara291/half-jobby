import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

class Filters extends Component {
  state = {userData: {}, isLoading: true}

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
    }
  }

  // https://assets.ccbp.in/frontend/react-js/profile-bg.png
  renderUserDetails = () => {
    const {userData} = this.state
    return (
      <div className="fil-cont">
        <img src={userData.profileImageUrl} alt="profile" />
        <h1>{userData.name}</h1>
        <p>{userData.shortBio}</p>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return isLoading ? this.renderLoader() : this.renderUserDetails()
  }
}

export default Filters
