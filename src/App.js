import "./App.css"; "Random"
import { getDataAPI } from "./getDataAPI";
import UserTable from "./components/UserTable"
import Pagination from "./components/Pagination"
import { useEffect, useState } from "react";

export default function App() {

  //State Variables
  const [userData, setUserData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectHandle, setSelectHandle] = useState(false);
  const [actionToggleHandle, setActionToggleHandle] = useState(false);
  const [saveToggleHandle, setSaveToggleHandle] = useState(true);
  const [searchResult, setSearchResult] = useState("");


  useEffect(() => {
    getDataAPI(setUserData);
  }, []);


  //Pagination controls
  const lastRow = currentPage * rowsPerPage;
  const firstRow = lastRow - rowsPerPage;
  const eachPage = userData.slice(firstRow, lastRow);
  const eachSearchPage = searchResult.slice(firstRow, lastRow);
  // console.log(eachPage);



  //Select Single Row
  const selectStatus = (id) => {
    let buffer = eachPage;

    if (searchResult !== "") {
      buffer = eachSearchPage;
    }

    const i = buffer.findIndex((elem) => elem.id === id);
    if (!buffer[i].isSelected)
      buffer[i].isSelected = true;
    else
      buffer[i].isSelected = false;
    // setUserData(buffer);
    setSelectHandle((prevState) => !prevState);
    // console.log(userData);
  }

  //Select All (Visible rows only)
  const selectAllStatus = (buffer) => {

    // if (!searchResult) 
    //   buffer=userData;
    // else
    //   buffer=searchResult;

    if (!selectAll) {
      buffer.filter((elem) => {
        elem.isSelected = true;
      })
      // setSearchResult(buffer);
      setSelectAll(!selectAll);
    } else {
      buffer.map((elem) => {
        elem.isSelected = false;
      })
      // setSearchResult(buffer);
      setSelectAll(!selectAll);
    }

  }


  //Edit Toggle Handler
  const editToggleHandler = (id) => {
    let buffer = userData;

    if (searchResult !== "") {
      buffer = eachSearchPage;
    }

    const i = buffer.findIndex((elem) => elem.id === id);
    buffer[i].editToggle = true;
    setActionToggleHandle((prevState) => !prevState);
    // setUserData(buffer);
    // console.log(userData);
  }

  //Save Toggle Handler
  const saveToggleHandler = (id, name, email, role) => {

    if (searchResult !== "") {
      const bufferSearch = eachSearchPage;
      const i = bufferSearch.findIndex((elem) => elem.id === id);
      bufferSearch[i].editToggle = false;
      bufferSearch[i].name = name.current.value;
      bufferSearch[i].email = email.current.value;
      bufferSearch[i].role = role.current.value;
      setSaveToggleHandle((prevState) => !prevState);
    }

    const buffer = userData;
    const i = buffer.findIndex((elem) => elem.id === id);
    buffer[i].editToggle = false;
    buffer[i].name = name.current.value;
    buffer[i].email = email.current.value;
    buffer[i].role = role.current.value;
    setSaveToggleHandle((prevState) => !prevState);
    setUserData(buffer);
    // console.log(userData);
  }


  //Delete Single Row
  const deleteRow = (id) => {
    if (searchResult !== "") {
      const bufferSearch = searchResult.filter(dataRow => dataRow.id !== id);
      setSearchResult(bufferSearch);
    }
    const buffer = userData.filter(dataRow => dataRow.id !== id);
    setUserData(buffer);

    //Move to previous page if current page have 0 entries
    if (currentPage !== 1 && eachPage.length <= 1 && eachSearchPage.length <= 1) {
      setCurrentPage(currentPage - 1);
    }

  }

  //Delete Multiple Rows
  const deleteMultiple = () => {
    if (searchResult !== "") {
      const bufferSearch = searchResult.filter(dataRow => dataRow.isSelected !== true);
      setSearchResult(bufferSearch);
      if (currentPage !== 1 && !bufferSearch) {
        setCurrentPage(currentPage - 1);
      }
    }

    const buffer = userData.filter(dataRow => dataRow.isSelected !== true);
    setUserData(buffer);
    setSelectAll(false);

    //Move to previous page if current page have 0 entries
    if (currentPage !== 1 && !buffer && (eachPage.length <= 1 || eachSearchPage.length <= 1)) {
      setCurrentPage(currentPage - 1);
    }
  }

  //Search Data
  const searchData = (val, buffer) => {
    setCurrentPage(1);
    let result = buffer.filter((item) => item.name.toLowerCase().includes(val.toLowerCase()) ||
      item.email.toLowerCase().includes(val.toLowerCase()) ||
      item.role.toLowerCase().includes(val.toLowerCase()));
    setSearchResult(result);
  }

  return (
    <div className="App">
      <div className="searchContainer">
        <i className="icon ion-md-search searchIcon"></i>
        <input type="text" placeholder="Type here to search..." onChange={(e) => searchData(e.target.value, userData)} className="searchBar" />
      </div>
      <table className="tableDesign">
        <tbody>
          <tr className="tableHead">
            {searchResult ?
              <th><input type="checkbox" name="" id="" onChange={() => selectAllStatus(eachSearchPage)} checked={selectAll} /></th>
              :
              <th><input type="checkbox" name="" id="" onChange={() => selectAllStatus(eachPage)} checked={selectAll} /></th>}

            <th className="tableHeadColumn">Name</th>
            <th className="tableHeadColumn">Email</th>
            <th className="tableHeadColumn">Role</th>
            <th className="tableHeadColumn">Action</th>
          </tr>
          {searchResult ?
            eachSearchPage.map((dataRow) => {
              return (
                <UserTable dataRow={dataRow} key={dataRow.id} deleteRow={deleteRow} selectStatus={selectStatus} editToggleHandler={editToggleHandler} saveToggleHandler={saveToggleHandler} />
              );
            })
            :
            eachPage.map((dataRow) => {
              return (
                <UserTable dataRow={dataRow} key={dataRow.id} deleteRow={deleteRow} selectStatus={selectStatus} editToggleHandler={editToggleHandler} saveToggleHandler={saveToggleHandler} />
              );
            })}
        </tbody>
      </table>
      <div>
        {searchResult ?
          <Pagination dataLength={searchResult.length} rowsPerPage={rowsPerPage} setCurrentPage={setCurrentPage} />
          :
          <Pagination dataLength={userData.length} rowsPerPage={rowsPerPage} setCurrentPage={setCurrentPage} />}
      </div>
      <button className="deleteSelectedBtn" onClick={deleteMultiple}>Delete Selected</button>
    </div>
  );
}
