import React, { Component } from 'react';
import firebase from '../firebase.js';
import './css/Articles.css';

class Articles extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        items: [],
        articleName: this.props.values,
      }
    }
    
    // Get data from Firebase
    componentDidMount() {
      var articleReference = "Articles" + "/" + this.state.articleName
      console.log(articleReference)
      const itemsRef = firebase.database().ref(articleReference);
      itemsRef.on('value', (snapshot) => {
        let items = snapshot.val();
        let newState = [];
        for (let item in items) {
          newState.push({
            title: items[item].title,
            description: items[item].description,
            author: items[item].author,
            publishDate: items[item].publishedAt
          });
        }
        this.setState({
          items: newState,
        });
      });
    }

    render() {
      return (
        <div class="col-md-8 blog-main">
            {this.state.items.map((item) => {
              return (  
                <div class="blog-post">
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