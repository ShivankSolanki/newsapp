import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"

const News = (props) => {

  // document.title = `NewsOwl - ${props.category.replace(/^./, char => char.toUpperCase())}`;

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  // componentDidUpdate(prevProps) {
  //   if (prevProps.mode !== props.mode) {
  //     this.setState({ mode: props.mode });
  //   }
  // }

  useEffect(() => {
    const fetchInitialData = async () => {
      props.setProgress(0);
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true);
      let data = await fetch(url);
      let parsedData = await data.json();
      setLoading(false);
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      props.setProgress(100);
    };

    fetchInitialData();
  }, [props.country, props.category, props.apiKey, props.pageSize]);


  const fetchMoreData = async () => {
    setPage(page + 1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    console.log(articles.length, totalResults);
  };

  return (
    <>
      <h2 className='text-center my-3' >NewsOwl - Top Headlines on {props.category.replace(/^./, char => char.toUpperCase())} category</h2>

      {loading && <div className="container text-center"><Spinner /></div>}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<div className="container text-center my-3"><Spinner /></div>}
        style={{ overflow: 'hidden' }}
      >

        <div className='container'>

          <div className="row">
            {articles.map((element) => {
              if (element.title && element.description && element.url && element.urlToImage) {
                return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title.slice(0, 40)} description={element.description.slice(0, 88)} url={element.url} imageUrl={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>;
              }
              else {
                return null;
              }
            })}
          </div>

        </div>

      </InfiniteScroll>
    </>
  )
}

News.defaultProps = {
  country: 'us',
  pageSize: 8,
  category: 'general',
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News
