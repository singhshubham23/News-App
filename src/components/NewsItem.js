import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl} = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{}}>
          <img src={!imageUrl?"https://images.app.goo.gl/6VqVSxm7nCQiHXm67":imageUrl} alt="img"/>
          <div className="card-body">
            <h5 className="card-title">{title}  </h5>
            <p className="card-text">{description}</p>
            <p className="card-text">{newsUrl}</p>
            <p className="card-text"><small className="text-body-secondary">By {this.author ? this.author : "Unknown"} on {this.date ? this.date : "Unknown Date"}</small></p>
            <a
              href={newsUrl}
              target="__blank"
              className="btn btn-sm btn-primary"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}



export default NewsItem;
