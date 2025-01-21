import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
// import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"


export class News extends Component {

  // static defaultProps = {
  //   country: 'us',
  //   pageSize: 10,
  //   category: 'general'
  // }

  constructor(props) {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }

    document.title = `NewsOwl - ${props.category.replace(/^./, char => char.toUpperCase())}`;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.mode !== this.props.mode) {
      this.setState({ mode: this.props.mode });
    }
  }

  async componentDidMount() {
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ loading: false });
    this.setState({
       articles: parsedData.articles,
       totalResults: parsedData.totalResults
      });
      this.props.setProgress(100);
  }


  // async updateNews() {
  //   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;

  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   this.setState({ loading: false });
  //   this.setState({ articles: parsedData.articles, totalArticles: parsedData.totalResults });

  // }

  fetchMoreData = async () => {
    this.setState({page: this.state.page+1});
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: this.state.articles.concat(parsedData.articles), totalArticles: parsedData.totalResults });
  };

  // handleNextClick = async () => {
  //   this.setState({
  //     page: this.state.page + 1
  //   })
  //   this.updateNews();
  // }

  // handlePrevClick = async () => {
  //   this.setState({
  //     page: this.state.page - 1
  //   })
  //   this.updateNews();
  // }

  render() {
    return (
      <>
        <h2 className='text-center my-5' >NewsOwl - Top Headlines on {this.props.category.replace(/^./, char => char.toUpperCase())} category</h2>

        {this.state.loading && <div className="container text-center my-3"><Spinner/></div>}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<div className="container text-center my-3"><Spinner/></div>}
          style={{overflow: 'hidden'}}
        >

          <div className='container'>

          <div className="row">
            {this.state.articles.map((element) => {
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

        {/* <div className="d-flex justify-content-between my-3">
          <button disabled={this.state.page <= 1} type="button" onClick={this.handlePrevClick} className={`btn btn-outline-${this.props.mode === 'dark' ? 'light' : 'dark'}`}>&larr; Previous</button>
          <button type="button" disabled={this.state.articles.length < this.props.pageSize} onClick={this.handleNextClick} className={`btn btn-outline-${this.props.mode === 'dark' ? 'light' : 'dark'}`}>Next &rarr;</button>
        </div> */}
      </>
    )
  }
}

export default News
