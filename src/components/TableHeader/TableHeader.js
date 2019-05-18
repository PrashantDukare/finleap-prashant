import React from 'react';
import Search from "../Search/Search";
import TableHeaderColumn  from './TableHeaderColumn';

/**
 * Table header component
 * @param props
 * @returns the table header with search and add participant buttons.
 */
const TableHeader = (props) => {
  return (
      <thead>
        <tr>
          <td colSpan={props.columns.length +1 }>
            <div className='action-container'>
              <button onClick={props.addClick}>Add Participant</button>
              <Search keyPress={props.onSearchKeyPress} searchFunc={props.searchFunc}/>
            </div>
          </td>
        </tr>
        <tr>
          <th>Participants </th>
          {
            props.columns.map(column => {
              return (
                  <TableHeaderColumn key={column.id} id={column.id}/>
              )
            })
          }
        </tr>
      </thead>
  )
};

export default TableHeader;
