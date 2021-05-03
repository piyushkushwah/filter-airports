import './App.css';
import { useState, useEffect, useReducer } from 'react';
import DataTable from './components/data-table/data-table';
import Pagination from './components/pagination/pagination';
import AirpotsData from './airports.json';
import FilterList from './components/filter-list/filter-list';
import checkFieldsValue from './helper/utils';

function App() {

  // initializing state with default value
  const [checked_filter_types, setCheckedFilterTypes] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [pageSize, setPageSize] = useState(4);
  const [dataForPagination, setDataForPagination] = useState(AirpotsData);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [previousDataForPagination, dispatchPreviousDataForPagination] = useReducer((state, action) => {
    return state = action;
  }, dataForPagination);

  // sanitizing of null value in AirportData
  useEffect(() => {
    AirpotsData.forEach(data => {
      for (let field in data) {
        if (data[field] === null) {
          data[field] = 'null';
        }
      }
    });
  }, []);

  // invoking from pagination component
  // invoke on page refresh and also get data when user click previous and next button
  // take data as a argument and updating the value of paginatedData
  const getPaginatedData = (data) => {
    setPaginatedData(data);
  }

  // passing as a props in FilterList Component 
  // invoking from CheckBox Component 
  // Take two arguments check_box_value and name of the checkbox
  // updating the checked_filter_types value after checking the type present it in or not
  const addFilterTypesInArray = (check_box_value, check_box_name) => {

    const type_found_in_array = checked_filter_types.filter(type => type === check_box_name) ? true : false;

    if (check_box_value && type_found_in_array) {

      setCheckedFilterTypes([
        ...checked_filter_types,
        check_box_name
      ]);

    } else {
      let types = checked_filter_types.filter(type => type !== check_box_name)
      setCheckedFilterTypes(types);
    }

  }

  // invoking from useEffect whenever the check_filter_types state update
  // filter AirpotsData according to types present in check_filter_types
  // after filter the data updating dataForPagination value
  const filterByMultipleTypes = () => {

    let filtered_data = [];

    if (checked_filter_types.length > 0) {

      AirpotsData.forEach(data => {
        if (checked_filter_types.includes(data.type)) {
          filtered_data.push(data);
        }
      });

      setDataForPagination(filtered_data);
      dispatchPreviousDataForPagination(filtered_data);

    } else {
      setDataForPagination(AirpotsData);
      dispatchPreviousDataForPagination(AirpotsData);
    }

  }

  // handling filter by search input 
  const filterBySearch = (field_value) => {
    setSearchInputValue(field_value);
    let newFilteredData = [];
    newFilteredData = previousDataForPagination.filter(data => checkFieldsValue(data, field_value));
    setDataForPagination(newFilteredData)
  }

  // passing as a props in data table component
  // invoke when user changes the page size 
  // updating pageSize value
  const changePageSize = (event) => {
    setPageSize(parseInt(event.target.value));
  }

  useEffect(() => {
    filterBySearch(searchInputValue);
  }, [previousDataForPagination]);

  useEffect(() => {
    filterByMultipleTypes();
  }, [checked_filter_types])


  return (
    <div className="container">

      <h1 className="heading">Filter <span className="text-light-gray">
        airports</span>
      </h1>

      <FilterList
        add_filter_types={addFilterTypesInArray}
        filter_by_search={filterBySearch} />

      <DataTable
        airpotsData={paginatedData}
        changePageSize={changePageSize}
        pageSize={pageSize}
      />

      <Pagination
        airpotsData={dataForPagination}
        pageSize={pageSize}
        returnAction={getPaginatedData} />

    </div>
  );
}

export default App;
