import React, { Component } from 'react';
import logo from './logo.svg';
import Articles from './Components/Articles';
// import './App.css';
import './temp.css';

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
  componentWillMount() {
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
      });
    });
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
    });
    console.log(this.state.currSource)
  }

  changeSource = () => {

};


  render() {
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

      this.state.isLoading ? <div></div> : 
      <div class="container">
        <main role="main" class="container">
          <div class="row">
          <Articles values={this.state.currSource} load={this.state.isLoading}>
          {/* {console.log(this.state.currSource)} */}
          </Articles>
            
            {/* ------------- SIDEBAR ------------- */}

            <aside class="col-md-4 blog-sidebar">
              <div class="p-3 mb-3 bg-light rounded">
                <h4 class="font-italic">About</h4>
                <p class="mb-0">Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>
              </div>

              <div class="p-3">
                <h4 class="font-italic">Archives</h4>
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
    );
  }
}

export default App;
