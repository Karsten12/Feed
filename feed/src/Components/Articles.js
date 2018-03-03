import React, { Component } from 'react';
import firebase from '../firebase.js';
import './Articles.css';

class Articles extends Component {

    constructor(props) {
      super(props);
      
      this.state = {
        items: [],
        string1: "#",
        articleName: this.props.values,
        loaded: this.props.load
      }
    }
    
    // Get data from Firebase
    componentDidMount() {
      if (!this.state.loaded) {
        var refer = "Articles" + "/" + this.state.articleName
        console.log(refer)
        const itemsRef = firebase.database().ref(refer);
        itemsRef.on('value', (snapshot) => {
          let items = snapshot.val();
          // let idk = items.indexOf(this.props.values);
          let newState = [];
          for (let item in items) {
            console.log(item)
          }
          this.setState({
            items: newState,
          });
        });
      };
    }

  
    // render() {
    //   return (
    //       <div class="container">  
    //         {this.state.items.map((item) => {
    //           return (  
    //             <div class="panel-group" id="accordion">
    //               <div class="panel panel-default">
    //                 <div class="panel-heading">
    //                   <h4 class="panel-title">
    //                     <a data-toggle="collapse" data-parent="#accordion" href={this.state.string1.concat(item.id)}>{item.title}</a>
    //                   </h4>
    //                 </div>
    //                 <div id={item.id} class="panel-collapse collapse in">
    //                   <div class="panel-body">{item.summary}</div>
    //                 </div>
    //               </div>
    //             </div>
    //           )
    //         })}
    //       </div>
    //   );
    // }


    render() {
      return (
        <div class="col-md-8 blog-main">
            {this.state.items.map((item) => {
              return (  
                <div class="blog-post">
                  <h2 class="blog-post-title">{item.title}</h2>
                  <p class="blog-post-meta">January 1, 2014 by <a href="#">Mark</a></p>
                  <hr></hr>
                  <p>{item.summary}</p>
                </div>
              )
            })}      
        </div>
      );
    }

  }

  export default Articles;