import './App.css';
import { useState, useEffect } from 'react';
import CheckBox from './components/check-box/check-box';
import DataTable from './components/data-table/data-table';
import Pagination from './components/pagination/pagination';
import AirpotsData from './airports.json';

function App() {

  const initialState = {
    seacrhValue: "",
    dataForPagination: AirpotsData,
    pageSize: 4
  }


  const [state, setstate] = useState(initialState);
  const [checked_filter_types, setCheckedFilterTypes] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [checkBoxData] = useState([
    {
      id: 0,
      name: 'Small',
      value: false
    },
    {
      id: 1,
      name: 'Medium',
      value: false
    },
    {
      id: 2,
      name: 'Large',
      value: false
    },
    {
      id: 3,
      name: 'Heliport',
      value: false
    },
    {
      id: 4,
      name: 'Closed',
      value: false
    },
    {
      id: 5,
      name: 'in your favourites',
      value: false
    },
  ])

  const {
    seacrhValue, pageSize,
    dataForPagination
  } = state;


  let getPaginateData = (data) => {
    console.log('app pagination data', data);
    setPaginatedData(data);
  }

  let filteredData = (checked, name) => {

    let type_found_in_array = checked_filter_types.filter(type => type === name) ? true : false;

    if (checked && type_found_in_array) {

      setCheckedFilterTypes([
        ...checked_filter_types, name
      ]);

    } else {
      let types = checked_filter_types.filter(type => type !== name);
      setCheckedFilterTypes(types);
    }

  }

  let filterByMultipleTypes = () => {

    let filtered_data = [];

    if (checked_filter_types.length > 0) {
      AirpotsData.forEach(data => {
        if (checked_filter_types.includes(data.type)) {
          filtered_data.push(data);
        }
      });
      setstate({ ...state, dataForPagination: filtered_data });
    } else {
      setstate({ ...state, dataForPagination: AirpotsData });
    }

  }

  let changePageSize = (event) => {
    setstate({ ...state, pageSize: event.target.value });
  }

  useEffect(() => {
    filterByMultipleTypes();
  }, [checked_filter_types])

  return (
    <div className="container">

      <h1>Filter <span className="text-light-gray">airports</span></h1>

      <section className="filter-section">

        <div className="w-full">
          <h1>Types</h1>
          <div className="checkbox-container">
            {
              checkBoxData.map(data => {
                return (
                  <CheckBox key={data.id} name={data.name}
                    value={false}
                    action={filteredData} />
                )
              })
            }
          </div>
        </div>

        <div className="searchBox">
          <h1>Filter by search</h1>
          <label hidden >Filter by search</label>
          <input name="search" value={seacrhValue}
            onChange={(event) => { console.log(event); }} type="text" />
        </div>

      </section>

      <DataTable airpotsData={paginatedData} changePageSize={changePageSize} />

      <div className="pagination-container">
        <Pagination airpotsData={dataForPagination}
          pageSize={pageSize} paginatedData={paginatedData}
          returnAction={getPaginateData} />
      </div>


    </div>
  );
}

export default App;
