import React, { Component } from 'react';
import Table from '../../components/Table/Table';

// foursquare used to get venue details
const foursquare = require('react-foursquare')({
  clientID: 'PAAMDJC3Y2QXANFH2AKBEV4TMJZ1DOWQLD3OZC45CTFYT5BQ',
  clientSecret: 'EORM5WJOEDPEGAXCW1KUODOURCEDLAGVSDYMQIHCDPVVN043'
});

class VotingTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: []
    };
  }

  componentDidMount() {
    var defaultParams = {
      "near": "10999 Berlin",
      "query": "restaurant",
      "limit": 3
    };
    // fetching the venues
    foursquare.venues.getVenues(defaultParams)
        .then(res=> {
          this.setState({
            columns: res.response.venues,
            data: [],
            highestVotingVenueId: null
          });

        });
  }

  /**
   * Updates the user name for the current user
   * @param {object} event - event object.
   * @param {number} userId - Id of the user who's data needs to be updated
   */
  updateUserName = (event, userId) => {
    const newData = [...this.state.data];
    let updatedUserIndex = newData.findIndex(el => el.id === userId);
    newData[updatedUserIndex].name = event.target.value;
    this.setState({ data:newData });
  };

  /**
   * Key press listener for the search filed. Handles user's ENTER key hit.
   * @param {object} event - event object.
   */
  searchKeyPressHandler = (event) => {
    const searchTerm = event.target.value;
    const keycode = event.keyCode || event.which;
    if(keycode == '13') {
      this.searchHandler(searchTerm)
    }
  };

  /**
   * Updates the current location and fetches the venues according to the current search term.
   * @param {object} event - event object.
   * @param {number} userId - Id of the user who's data needs to be updated
   */
  searchHandler = (searchTerm) => {
    if (searchTerm.trim() !== "") {
      var params = {
        "near": searchTerm,
        "query": "restaurant",
        "limit": 3
      };
      // fetching the venues with the current search term
      foursquare.venues.getVenues(params)
          .then(res=> {
            this.setState({
              columns: res.response.venues,
              data: [],
              highestVotingVenueId: null
            });
          });
    }
    else {
      alert('Please enter valid location');
    }
  };

  /**
   * Addes a new user who will be able to vote
   */
  addParticipantHandler = () => {
    const newData = [...this.state.data];
    const newUser = {
      id: newData.length +1,
      name: '',
      vote: null
    };
    newData.push(newUser);
    this.setState({ data:newData });
  };

  /**
   * Updates the user's vote for the particular venue
   * @param {number} venueID - venue Id for currently selected by the user
   * @param {number} userId - Id of the user who's data needs to be updated
   */
  voteHandler = (userId, venueID) => {
    const newData = [...this.state.data];
    let updatedUserIndex = newData.findIndex(el => el.id === userId);
    newData[updatedUserIndex].vote = venueID;
    let maximumVoting = 0;
    let highestVotingVenueId = null;
    // finding highest voted restaurant
    for (let venue of this.state.columns) {
      let currentVenueVotingObject = newData.filter(user => user.vote === venue.id);
      if(currentVenueVotingObject.length >= maximumVoting && currentVenueVotingObject.length !== 0) {
        highestVotingVenueId = venue.id;
        maximumVoting = currentVenueVotingObject.length;
      }

    }
    this.resetSelectedHeader();
    document.getElementById(highestVotingVenueId).classList.add('highest-voted');
    this.setState({ data:newData });
  };

  resetSelectedHeader = () => {
    var elements = document.querySelectorAll("th");
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove('highest-voted')
    }
  };

  render() {
    return (
       <div className="App-table">
         { this.state.columns &&
           <Table
               onSearchKeyPress={this.searchKeyPressHandler}
               data={this.state.data}
               columns={this.state.columns}
               searchFunc={this.searchHandler}
               cellClick={this.voteHandler}
               updateCell={this.updateUserName}
               addClick={this.addParticipantHandler}
           />
         }
        </div>
    );
  }
}

export default VotingTable;
