import React, { Component } from 'react';
import './App.css';
import VotingTable from './containers/VotingTable/VotingTable'

class App extends Component {

  render() {

    return (
        <div className="App">

          <div className="App-header">
            <img src="https://dgivdslhqe3qo.cloudfront.net/careers/photos/112979/thumb_photo_1557835216.png"/>
            <h2>Venue Voting Table</h2>
          </div>
          <VotingTable/>
        </div>
    );
  }
}

export default App;
