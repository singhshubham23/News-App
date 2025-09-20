import React, { Component } from "react";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";
import Loader from "./Loader";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirst(
      this.props.category
    )} - NewsMonkey`;
  }

  async fetchNews(page = 1) {
    const API_KEY =
      process.env.REACT_APP_NEWS_API_KEY || "ac38dad3fc5348318b8986f5620fd09b";
    const url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&apiKey=${API_KEY}&page=${page}&pageSize=${this.props.pageSize}`;

    try {
      this.setState({ loading: true });
      console.log("Fetching data from:", url);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const parsedData = await response.json();

      const existingUrls = new Set(
        this.state.articles.map((article) => article.url)
      );

      const uniqueArticles = parsedData.articles.filter(
        (article) => !existingUrls.has(article.url)
      );

      this.setState((prevState) => ({
        articles: [...prevState.articles, ...uniqueArticles],
        totalResults: parsedData.totalResults,
        page,
        loading: false,
      }));
    } catch (error) {
      this.setState({ loading: false });
    }
  }

  async componentDidMount() {
    await this.fetchNews();
  }

  fetchMoreData = async () => {
    const nextPage = this.state.page + 1;
    await this.fetchNews(nextPage);
  };

  render() {
    const { articles, loading, totalResults } = this.state;

    return (
      <div className="container my-3">
        <h1 className="text-center">
          NewsLion Top Headlines from{" "}
          {this.capitalizeFirst(this.props.category)} category
        </h1>
        {loading && <Loader />}
        {!loading && articles.length === 0 && (
          <p className="text-center">
            No articles available for the selected category.
          </p>
        )}

        <InfiniteScroll
          dataLength={articles.length}
          next={this.fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Loader />}
          endMessage={
            <p className="text-center">No more articles to display.</p>
          }
        >
          <div className="row">
            {articles.map((article) => (
              <div className="col-md-4" key={article.url}>
                <NewsItem
                  title={article.title ? article.title.slice(0, 45) : ""}
                  description={
                    article.description ? article.description.slice(0, 88) : ""
                  }
                  imageUrl={
                    article.urlToImage || "https://via.placeholder.com/150"
                  }
                  newsUrl={article.url}
                  author={article.author || "Unknown"}
                  date={article.publishedAt || "Not Available"}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
