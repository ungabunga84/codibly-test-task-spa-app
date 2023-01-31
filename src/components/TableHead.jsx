import React from "react";

function TableHead(props) {
  return (
    <table className="center tablehead">
      <thead>
        <tr>
          <td>id</td>
          <td>Name</td>
          <td>Year</td>
          {props.isRowClicked && <td>Color</td>}
          {props.isRowClicked && <td>Pantone value</td>}
        </tr>
      </thead>
    </table>
  );
}

export default TableHead;
