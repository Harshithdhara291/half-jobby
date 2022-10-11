import AllJobs from '../AllJobs'
import Filters from '../Filters'

import Header from '../Header'

import './index.css'

const Jobs = () => (
  <>
    <Header />
    <div className="jobs-sections">
      <Filters />
      <AllJobs />
    </div>
  </>
)

export default Jobs
