import React from 'react';

/**
 * Component to render a row data
 */
const Row = (props) => {
  return (
      <tr key={props.rowData.id}>
        <td>
          <input onKeyPress={(event) => props.updateCell(event, props.rowData.id)} defaultValue={props.rowData.name}/>
        </td>
        {props.columns && props.columns.length ? props.columns.map(column => {
              return (
                  <td onClick={() => props.cellClick(props.rowData.id, column.id)} className={props.rowData.vote && props.rowData.vote === column.id? 'selected': ''} />
              )
            }): ''
        }
      </tr>
  )
};

export default Row;
