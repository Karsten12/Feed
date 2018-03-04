import React, { Component } from 'react';
import firebase from '../firebase.js';
import './css/Articles.css';

class Articles extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        items: []
      }
    }

    loadData = () => {
      console.log(this.props);

      const articleReference = "Articles/" + this.props.values;

      firebase.database().ref(articleReference).on('value', (snapshot) => {
        const items = snapshot.val();
        let newState = [];

        for (const article of items) {
          newState.push({
            title: article.title,
            description: article.description,
            author: article.author,
            publishDate: article.publishedAt
          });
        }

        this.setState({
          items: newState
        });
      });
    }

    componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {
        this.loadData();
      }
    }
    
    // Get data from Firebase
    componentDidMount() {
      this.loadData();
    }

    render() {
      return (
        <div class="col-md-8 blog-main">
            {this.state.items.map((item, index) => {
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