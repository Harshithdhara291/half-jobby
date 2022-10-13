import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import JobItem from '../JobItem'
import './index.css'

class AllJobs extends Component {
  state = {
    jobsList: [],
    isLoading: false,
    fail: false,
    searchInput: '',
    employmentType: '',
    minimumPackage: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({
      isLoading: true,
    })
    const {searchInput, employmentType, minimumPackage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minimumPackage}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        jobDescription: job.job_description,
        id: job.id,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobsList: updatedData,
        isLoading: false,
      })
    } else {
      this.setState({fail: true})
    }
  }

  updateSearch = () => {
    const {searchInput} = this.state
    if (searchInput !== '') {
      this.setState({searchInput}, this.getJobs)
    }
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  renderJobsList1 = () => {
    const {fail} = this.state

    return fail ? this.renderFailureView() : this.renderJobsList()
  }

  renderNoJobs = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="text2">No Jobs Found</h1>
      <p className="text2">We could not find any jobs. Try other filters</p>
    </div>
  )

  renderList = () => {
    const {jobsList} = this.state
    return (
      <div>
        <ul className="un-list">
          {jobsList.map(job => (
            <JobItem job={job} key={job.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderJobsList = () => {
    const {jobsList, searchInput} = this.state
    const jobsListLength = jobsList.length === 0
    return (
      <>
        <div className="search-list">
          <div className="search-box">
            <input
              type="search"
              placeholder="Search"
              className="search-icon"
              value={searchInput}
              onChange={this.onChangeSearch}
            />
            <button type="button" className="icon" onClick={this.updateSearch}>
              <BsSearch />
            </button>
          </div>
          {jobsListLength ? this.renderNoJobs() : this.renderList()}
        </div>
      </>
    )
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
      <Link to="https://apis.ccbp.in/jobs">
        <button type="button" className="button">
          Retry
        </button>
      </Link>
    </div>
  )

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return isLoading ? this.renderLoader() : this.renderJobsList1()
  }
}

export default AllJobs
