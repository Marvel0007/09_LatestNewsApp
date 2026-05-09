import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoadings] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    // Change this in both places:
const url = `https://saurav.tech/NewsAPI/top-headlines/category/${props.category}/${props.country}.json`;
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    
    // Log the response to the console so you can see if the API key is working
    console.log("API Response:", parsedData);
    
    props.setProgress(70);
    // Safety net: Use empty array/zero if the API returns undefined
    setArticles(parsedData.articles || []);
    setTotalResults(parsedData.totalResults || 0);
    setLoadings(false);

    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    // Change this in both places:
const url = `https://saurav.tech/NewsAPI/top-headlines/category/${props.category}/${props.country}.json`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    
    // Safety net: prevent crash on scroll if API limits are hit
    setArticles(articles.concat(parsedData.articles || []));
    setTotalResults(parsedData.totalResults || 0);
  };

  return (
    <div className="container my-3">
      <h1
        className="text-center"
        style={{ margin: "30px 0px", marginTop: "90px" }}
      >
        NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4 my-2 d-flex" key={element.url}>
                  <NewsItem
                    title={!element.title ? "" : element.title.slice(0, 50)}
                    description={
                      !element.description
                        ? ""
                        : element.description.slice(0, 100)
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source ? element.source.name : "Unknown"}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  country: "us",
  pageSize: 6,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;