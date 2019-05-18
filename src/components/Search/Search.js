import React from 'react';
import './Search.css'

/**
 * Component to render search
 */
const Search = (props) => {
  return (
      <div className="search-container">
        <input id="search" onKeyPress={props.keyPress} type="text" defaultValue="10999 Berlin"/>
        <button onClick={(event) => props.searchFunc(document.getElementById('search').value)}>Search</button>
      </div>
  )
};

export default Search;
