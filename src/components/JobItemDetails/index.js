// jobDetailsApiUrl

// API: https://apis.ccbp.in/jobs/:id
// Example: https://apis.ccbp.in/jobs/bb95e51b-b1b2-4d97-bee4-1d5ec2b96751
// Method: GET
// Description:
// Returns a response containing the job details

// Sample Response
// {
//   "job_details": {
//     "company_logo_url": "https://assets.ccbp.in/frontend/react-js/jobby-app/netflix-img.png",
//     "company_website_url": "https://about.netflix.com/en",
//     "employment_type": "Internship",
//     "id": "bb95e51b-b1b2-4d97-bee4-1d5ec2b96751",
//     "job_description": "We are looking for a DevOps Engineer with a minimum of 5 years of industry experience, preferably working in the financial IT community. The position in the team is focused on delivering exceptional services to both BU and Dev",
//     "skills": [
//       {
//         "image_url": "https://assets.ccbp.in/frontend/react-js/jobby-app/docker-img.png",
//         "name": "Docker"
//       },
//       ...
//     ],
//     "life_at_company": {
//       "description": "Our core philosophy is people over process. Our culture has been instrumental to our success. It has helped us attract and retain stunning colleagues, making work here more satisfying. Entertainment, like friendship, is a fundamental human need, and it changes how we feel and gives us common ground. We want to entertain the world.",
//       "image_url": "https://assets.ccbp.in/frontend/react-js/jobby-app/life-netflix-img.png"
//     },
//     "location":"Delhi",
//     "package_per_annum":"10 LPA",
//     "rating":4
//   },
//   "similar_jobs": [
//     {
//       "company_logo_url": "https://assets.ccbp.in/frontend/react-js/jobby-app/netflix-img.png",
//       "employment_type": "Freelance",
//       "id": "2b40029d-e5a5-48cc-84a6-b6e12d25625d",
//       "job_description": "The Experimentation Platform team builds internal tools with a big impact across the company. We are looking to add a UI engineer to our team to continue to improve our experiment analysis workflow and tools. Ideal candidates will be excited by direct contact with our users, fast feedback, and quick iteration.",
//       "location": "Delhi",
//       "rating": 4,
//       "title": "Frontend Engineer"
//     },
//     ...
//   ]
// }

import {Component} from 'react'
import {Link} from 'react-router-dom'

// import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsStar, BsBoxArrowUpRight, BsFillBriefcaseFill} from 'react-icons/bs'
import {HiLocationMarker} from 'react-icons/hi'
import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    jobsData: {},
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobsData()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    jobDescription: data.job_description,
    skills: data.skills,
    lifeAtCompany: data.life_at_company,
    id: data.id,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
  })

  getJobsData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = this.getFormattedData(fetchedData.job_details)
      const updatedSimilarProductsData = fetchedData.similar_jobs.map(
        eachSimilarProduct => this.getFormattedData(eachSimilarProduct),
      )
      this.setState({
        jobsData: updatedData,
        similarJobsData: updatedSimilarProductsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    return (
      <div className="product-details-failure-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failure-view-image"
        />
        <h1 className="product-not-found-heading">
          Oops! Something Went Wrong
        </h1>
        <p>We cannot seem to find the page you are looking for.</p>
        <Link to={`/jobs/${id}`}>
          <button type="button" className="button">
            Retry
          </button>
        </Link>
      </div>
    )
  }

  renderJobDetailsView = () => {
    const {jobsData, similarJobsData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobsData
    const lifeAtCompanyImage = lifeAtCompany.image_url

    return (
      <div className="jobs-sections">
        <div className="li-item1">
          <div>
            <div className="cont-1">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
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
            <ul className="cont-2">
              <div className="cont">
                <li className="cont">
                  <HiLocationMarker className="icon" />
                  <p className="text2">{location}</p>
                </li>
                <li className="cont">
                  <BsFillBriefcaseFill className="icon" />
                  <p className="text2">{employmentType}</p>
                </li>
              </div>
              <p className="text2">{packagePerAnnum}</p>
            </ul>
            <hr />
            <div className="cont-3">
              <div className="desc">
                <h1 className="text2">Description</h1>
                <a
                  href={companyWebsiteUrl}
                  className="visit"
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit
                  <BsBoxArrowUpRight />
                </a>
              </div>
              <p className="text3">{jobDescription}</p>
            </div>
            <div>
              <h1 className="text2">Skills</h1>
              <ul className="u-list">
                {skills.map(each => (
                  <li className="l-list">
                    <img
                      src={each.image_url}
                      alt={each.name}
                      className="list-im"
                    />
                    <p className="text2">{each.name}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="life-comp">
              <div className="life-comp1">
                <h1 className="text2">Life at Company</h1>
                <p className="text2">{lifeAtCompany.description}</p>
              </div>
              <div>
                <img src={lifeAtCompanyImage} alt="life at company" />
              </div>
            </div>
          </div>
          <div>
            <h1 className="text2">Similar Jobs</h1>
            <ul className="similar-products-list">
              {similarJobsData.map(each => (
                <SimilarJobItem each={each} key={each.id} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  renderProductDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="product-item-details-container">
          {this.renderProductDetails()}
        </div>
      </>
    )
  }
}

export default ProductItemDetails
