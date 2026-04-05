import React from 'react'

const NewsItem = (props) => {
    let {title, description, imageUrl, newsUrl, author, date, source} = props;
    return (
      <div className='my-3'>
                <div className="card">
                  <div style={{display:'flex', justifyContent:'flex-end', position:'absolute', right:'0'}}>
                  <span className='badge rounded-pill bg-danger'>{source}</span>
                  </div>
                <img src={imageUrl?imageUrl:"https://cdn.sanity.io/images/s3y3vcno/production/9aee088470318da029029aef538cfb68874523c5-1920x1280.jpg"} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}...</p>
                    <p className='card-text'><small className='text-muted'>By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                    <a rel='noreferrer' href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Go somewhere</a>
                </div>
                </div>
      </div>
    )
  }


export default NewsItem
