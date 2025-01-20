import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {

  constructor(){
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.mode !== this.props.mode) {
      this.setState({ mode: this.props.mode });
    }
  }

  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=a9d5947216294a3bb2b897c52168e35d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({loading: false});
    this.setState({articles: parsedData.articles});
  }

  handleNextClick = async ()=>{
    console.log("next");

    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=a9d5947216294a3bb2b897c52168e35d&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({loading: false});
    this.setState({articles: parsedData.articles, totalArticles: parsedData.totalResults});

    this.setState({
      page: this.state.page+1
    })

    console.log(this.state.page);
  }

  handlePrevClick = async () => {
    console.log("prev");
    

    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=a9d5947216294a3bb2b897c52168e35d&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({loading: false});
    this.setState({articles: parsedData.articles});

    console.log(this.state.page);

    this.setState({
      page: this.state.page-1
    })
  }

  render() {
    return (
      <div className="container my-4">
        <h2 className='text-center'>NewsOwl - Top Headlines</h2>
        <div className="container text-center">
          {this.state.loading && <Spinner/>}
        </div>
        <div className="row">
          {!this.state.loading && this.state.articles.map((element)=>{
            if(element.title && element.description && element.url && element.urlToImage){
            return <div className="col-md-4" key={element.url}>
                      <NewsItem title={element.title.slice(0, 40)} description={element.description.slice(0, 88)} url={element.url} imageUrl={element.urlToImage}/> 
                    </div>;
            }
            else{
              return null;
            }
          })}
        </div>
        <div className="d-flex justify-content-between my-3">
          <button disabled={this.state.page<=1} type="button" onClick={this.handlePrevClick} className={`btn btn-outline-${this.props.mode==='dark'?'light':'dark'}`}>&larr; Previous</button>
          <button type="button" disabled={this.state.articles.length < this.props.pageSize} onClick={this.handleNextClick} className={`btn btn-outline-${this.props.mode==='dark'?'light':'dark'}`}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
