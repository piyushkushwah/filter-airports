import React, { useState } from 'react';
import CheckBox from '../check-box/check-box';
import './filter-list.css';

export default function FilterList(props) {

    const [filter_by_search, setFilterBySearchVal] = useState('');
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

    return (
        <section className="filter-section">
            <div className="w-full filter-types">
                <h1>Types</h1>
                <div className="checkbox-container">
                    {
                        checkBoxData.map(data => {
                            return (
                                <CheckBox key={data.id} name={data.name}
                                    value={false}
                                    action={props.add_filter_types} />
                            )
                        })
                    }
                </div>
            </div>

            <div className="searchBox">
                <h1>Filter by search</h1>
                <label hidden >Filter by search</label>
                <input name="search" value={filter_by_search}
                    onChange={(event) => {
                        setFilterBySearchVal(event.target.value);
                        props.filter_by_search(event.target.value);
                    }}
                    type="text" />
            </div>

        </section>
    )
}
