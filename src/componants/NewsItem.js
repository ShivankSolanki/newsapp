import React from 'react'

const NewsItem = (props) => {
  let { title, description, imageUrl, url, author, date, source } = props;
  return (
    <div className='my-4'>
      <span className="badge badge-pill badge-secondary" style={{ backgroundColor: "rgb(198, 37, 67)" }}>{source}</span>
      <div className="card" style={{ width: "19rem" }}>
        <img src={imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text"><small className="text-muted">By {!author ? "unknown" : author} on {new Date(date).toGMTString()}</small></p>
          <a href={url} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
        </div>
      </div>
    </div>
  )
}


export default NewsItem
