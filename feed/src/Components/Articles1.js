import React, { Component } from 'react';
import firebase from '../firebase.js';
import './css/Articles.css';

class Articles extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div class="col-md-8 blog-main">
            {this.props.values.map((item, index) => {
              return (  
                <div class="blog-post" key={index}>
                  <h2 class="blog-post-title">{item.title}</h2>
                  <p class="blog-post-meta">January 1, 2014 by <a href="#">{item.author}</a></p>
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