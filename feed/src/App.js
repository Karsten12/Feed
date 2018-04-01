import React, { Component } from 'react';
import Articles from './Components/Articles';
import Header from './Components/Header';
import firebase from './firebase.js';
import './Components/css/App.css';

/* npm run deploy */

class App extends Component {
		constructor(props) {
			super(props);
				
      this.state = {
        Sources: [],
        items: [],
        isLoading: true,
        currSource: [],
        updateTime: 0,
      }
      this.loadData = this.loadData.bind(this);
    }

  // Get data from Firebase
  componentDidMount() {
    firebase.database().ref("Articles").on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push(item)
      }			
      this.setState({
        Sources: newState,
      });
      this.loadData();
    });
  }

  loadData = () => {
    for (var i=0; i < this.state.Sources.length; i++) {
      let newState = [];
      let source = this.state.Sources[i]
      const articleReference = "Articles/" + source;
      firebase.database().ref(articleReference).on('value', (snapshot) => {
        const items = snapshot.val();
        for (const article of items) {
          newState.push({
            title: article.title,
            description: article.description,
            author: article.author,
            publishDate: article.publishedAt,
            url: article.url,
          });
        }
      });
      this.state.items[i] = newState;
    }
    this.setState({
      currSource: this.state.items[0],
      isLoading: false
    })
  }

  handleClick = (source) => {
    this.setState({
      currSource: this.state.items[source]
    });
  };

  divStyle = {
    fontSize: '24px',
    color: 'black',
    marginRight: '10px',
    marginBottom: '20px',
  }

  render() {
    if (!this.state.isLoading && this.state.items.length !== 0) {
      return (
        <div>
          <Header/>
          <div className="container">
            <main role="main">
              <div class="row">
              <Articles values={this.state.currSource}/>
                
                {/* ------------- SIDEBAR ------------- */}
                <aside class="col-md-4 blog-sidebar">
                  <div class="p-3 mb-3 bg-light rounded">
                    <h4 class="font-italic">About</h4>
                    <p class="mb-0">Feed is a news aggregator designed personally to save myself the time and hassle of visiting numerous websites to stay up to date. If you wanna learn more about me, check out my website, or my social media pages, linked below!</p>
                  </div>

                  <div class="p-3">
                    <div class="ContactsBoxItem">
                      <a href="https://www.facebook.com/karsten.fonseca/">
                        <i class="fa fa-facebook" style={this.divStyle}></i>
                      </a>
                      <a href="https://karsten12.github.io">
                        <i class="fa fa-github" style={this.divStyle}> </i>
                      </a>
                      <a href="https://www.linkedin.com/in/karsten-fonseca">
                        <i class="fa fa-linkedin" style={this.divStyle}> </i>
                      </a>
                      <a href="skype:k10_kars?chat">
                        <i class="fa fa-skype" style={this.divStyle}> </i>
                      </a>
                    </div>
                  </div>
  
                  <div class="p-3">
                    <h4 class="font-italic">Other News Sources</h4>
                    <ol class="list-unstyled mb-0">
                    {this.state.Sources.map((i, index) => {
                      return (
                        <li key={index} onClick={() => {this.handleClick(index)}}>
                          <button className="button" type="button">{i}</button>
                          </li>
                      )
                      })}
                    </ol>
                  </div>    
  
                </aside>
              </div>
            </main>
          </div>
        </div>
      );
    }
    return null
  }
}

export default App;
