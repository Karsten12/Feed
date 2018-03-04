import React, { Component } from 'react';
import logo from './logo.svg';
import Articles from './Components/Articles';
import Header from './Components/Header';
// import './App.css';
// import './temp.css';

import firebase from './firebase.js';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      newSources: [],
      string1: "#",
      currSource: 0,
      isLoading: true,
    }
  }

  // Get data from Firebase
  componentDidMount() {
    // this.setState({
    //   isLoading: false,
    // });
    // console.log(this.state.currSource)
    const itemsRef = firebase.database().ref("Articles");
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push(item)
      }
      this.setState({
        newSources: newState,
        currSource: newState[0],
      }, this.setState({
        isLoading: false
        })
      );
    });
  }

  changeSource = () => {
    
  }


  render() {
    console.log("RENDER")
    if (!this.state.isLoading && this.state.currSource!=0) {
      return (
        // <div className="App">
        //   <header className="App-header">
        //     <img src={logo} className="App-logo" alt="logo" />
        //     <h1 className="App-title">Welcome to React</h1>
        //   </header>
        //   <p className="App-intro">
        //     To get started, edit <code>src/App.js</code> and save to reload.
        //   </p>
  
        //   {/* <Articles></Articles> */}
  
        // </div>
  
        <div>
          {/* <Header/> */}
          <div class="container">
            <main role="main" class="container">
              <div class="row">
              <Articles values={this.state.currSource}>
              </Articles>
                
                {/* ------------- SIDEBAR ------------- */}
  
                <aside class="col-md-4 blog-sidebar">
                  <div class="p-3 mb-3 bg-light rounded">
                    <h4 class="font-italic">About</h4>
                    <p class="mb-0">Feed is a news aggregator designed personally for myself (Karsten Fonseca) to save time</p>
                  </div>
  
                  <div class="p-3">
                    <h4 class="font-italic">Other Sources</h4>
                    <ol class="list-unstyled mb-0">
                    {this.state.newSources.map((i) => {
                      return (
                        <li><a href="#">{i}</a></li>
                      )
                      })}
                    </ol>
                  </div>
  
                  {/* <div class="p-3">
                    <h4 class="font-italic">Elsewhere</h4>
                    <ol class="list-unstyled">
                      <li><a href="#">GitHub</a></li>
                      <li><a href="#">Twitter</a></li>
                      <li><a href="#">Facebook</a></li>
                    </ol>
                  </div> */}
  
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
