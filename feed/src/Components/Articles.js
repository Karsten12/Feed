import React, { Component } from 'react';
import './css/Articles.css';

class Articles extends Component {
    render() {
      return (
        <div class="col-md-8 blog-main">
            {this.props.values.map((item, index) => {
              return (  
                <div class="blog-post" key={index}>
                  <h2 class="blog-post-title">
                  <a href={item.url}>{item.title }</a>
                  </h2>
                  <p class="blog-post-meta">{item.publishDate} {item.author}</p>
                  <hr></hr>
                  <p>{item.description}</p>
                </div>
              )
            })}      
        </div>
      );
    }

  }

  export default Articles;