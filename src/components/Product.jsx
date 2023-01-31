import React from "react";

function ProductItem(props) {
  return (
    <div
      onClick={() => {
        props.onClick(props.id);
      }}
    >
      <table className="center tablebody">
        <tbody>
          <tr style={{ backgroundColor: props.color }}>
            <td>{props.id}</td>
            <td>{props.name}</td>
            <td>{props.year}</td>
            {props.isRowClicked && <td>{props.color}</td>}
            {props.isRowClicked && <td>{props.pantone_value}</td>}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ProductItem;
