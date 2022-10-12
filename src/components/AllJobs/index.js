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
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({
      isLoading: true,
    })
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?search=${searchInput}`
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
    this.setState({searchInput}, this.getJobs)
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  renderJobsList1 = () => {
    const {fail} = this.state

    return fail ? this.renderFailureView() : this.renderJobsList()
  }

  renderJobsList = () => {
    const {jobsList, searchInput} = this.state
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
          <ul className="un-list">
            {jobsList.map(job => (
              <JobItem job={job} key={job.id} />
            ))}
          </ul>
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
      <Link to="/jobs">
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
