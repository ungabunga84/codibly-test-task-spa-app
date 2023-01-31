import React, { useEffect, useState } from "react";
import ProductItem from "./Product";
import TableHead from "./TableHead";
import Pagination from "./Pagination";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import style from "./modalStyle";
let PageSize = 5;

function App() {
  const [headingText, setHeadingText] = useState("");
  const [statusMessage, setStatusMessage] = useState();
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [rowClick, setRowClick] = useState(false);
  const [open, setOpen] = useState(false);

  const getData = async () => {
    try {
      const response = await fetch("https://reqres.in/api/products");
      const json = await response.json();
      setData(json.data);
      setTableData(json.data);
      console.log(isLoading);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const firstPageIndex = (currentPage - 1) * PageSize;
  const lastPageIndex = firstPageIndex + PageSize;
  const currentTableData = tableData.slice(firstPageIndex, lastPageIndex);

  function inputChange(event) {
    console.log(event.target.value);
    setName(event.target.value);
    getData();
    setHeadingText("");
  }

  fetch("https://reqres.in/api/products").then((parseJson) => {
    // console.log(parseJson);
    if (parseJson.status === 200) {
      setStatusMessage(parseJson.status + " Everything is Okay");
       } else if (parseJson.status === 404) {
      setStatusMessage(parseJson.status + " Not Found");
    } else if (parseJson.status === 502) {
      setStatusMessage(parseJson.status + " Bad Gateway");
    } else {
      setStatusMessage(parseJson.status);
    }
  });

  function sortProductsById(id) {
    console.log(tableData.length);
    console.log(id);

    setTableData((prevItems) => {
      return prevItems.filter((item, index) => {
        return index === id - 1;
      });
    });
  }

  function onRowClick() {
    if (tableData.length === 1) {
      setRowClick(true);
      setOpen(true);
    }
  }
  function modalClose() {
    setOpen(false);
    setRowClick(false);
  }
  function handleClick() {
    setRowClick(false);
    if (name <= tableData.length && name > 0) {
      sortProductsById(name);
      setName("");
      setHeadingText("");
    } else if (name < 0) {
      setHeadingText("Enter numbers from 1 to " + tableData.length);
      setName("");
    } else {
      setHeadingText("Enter numbers from 1 to " + tableData.length);
      setName("");
    }
  }

 return (
    <div className="container">
      <h1 style={{ color: "#497174" }}>Hello!</h1>
      <h3 style={{ color: "#497174" }}>Enter product ID for sort</h3>
      <h4 style={{ color: "#497174" }}>{headingText}</h4>

      <input
        type="number"
        placeholder="Enter product ID"
        onChange={inputChange}
        value={name}
        onFocus={inputChange}
      />
      <button
        onClick={handleClick}
        >
        Sort Products
      </button>

      <TableHead isRowClicked={rowClick} />
      {currentTableData.map((note, index) => (
        <ProductItem
          key={note.id}
          id={note.id}
          name={note.name}
          year={note.year}
          color={note.color}
          pantone_value={note.pantone_value}
          onClick={onRowClick}
          isRowClicked={rowClick}
        />
      ))}

      {!(tableData.length === 1) && (
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={data.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}

      <p> API status: {statusMessage} </p>
      <div>
        <Modal
          open={open}
          onClose={modalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <TableHead isRowClicked={rowClick} />
            {currentTableData.map((note, index) => (
              <ProductItem
                key={note.id}
                id={note.id}
                name={note.name}
                year={note.year}
                color={note.color}
                pantone_value={note.pantone_value}
                onClick={onRowClick}
                isRowClicked={rowClick}
              />
            ))}
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default App;
