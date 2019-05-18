import React from 'react';
import Row from "../Row/Row";
import TableHeader from "../TableHeader/TableHeader";
import './Table.css';

/**
 * Creates the voting table
 */
const Table = (props) => {

  return (
      <table>
        <TableHeader
            columns={props.columns}
            onSearchKeyPress={props.onSearchKeyPress}
            searchFunc={props.searchFunc}
            addClick={props.addClick}
        />
        <tbody>
        {props.data && props.data.length ? props.data.map(record => {
          return (
              <Row key={record.id} rowData={record} columns={props.columns} cellClick={props.cellClick} updateCell={props.updateCell}/>
          )
        }) : <tr><td colSpan={props.columns.length +1}> No Records to Display</td></tr>}
        </tbody>
      </table>
  )
};

export default Table;
