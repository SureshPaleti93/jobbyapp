import './index.css'

const NotFound = () => (
  <div className="not-found-bg-container">
    <img
      className="not-found-img"
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
    />
    <h1 className="page-heading">Page Not Found</h1>
    <p className="page-descr">
      We are sorry, the page requested could not be found
    </p>
  </div>
)
export default NotFound
