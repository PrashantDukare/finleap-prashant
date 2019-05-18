import React, { Component } from 'react';
import './TableHeaderColumn.css'

// foursquare used to get venue details
const foursquare = require('react-foursquare')({
  clientID: 'PAAMDJC3Y2QXANFH2AKBEV4TMJZ1DOWQLD3OZC45CTFYT5BQ',
  clientSecret: 'EORM5WJOEDPEGAXCW1KUODOURCEDLAGVSDYMQIHCDPVVN043'
});

class TableHeaderColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
  }

  componentDidMount() {
    // fetching the venue details
    foursquare.venues.getVenue({venue_id: this.props.id})
        .then(res=> {
          this.setState({
            data: res.response.venue
          });
    });
  }

  render() {
    return (
        <th id={this.props.id}>
          { this.state.data &&
          <div>
            <a className='restaurant-name' target='_blank' href={this.state.data.url}>{this.state.data.name}</a>
            { this.state.data.categories && this.state.data.categories.length &&
              <div className='restaurant-category'>{this.state.data.categories[0].name}</div>
            }
            <div className='restaurant-rating'>{this.state.data.rating}</div>
          </div>
          }
        </th>
    );
  }
}

export default TableHeaderColumn;
