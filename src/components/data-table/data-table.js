import React, { useState } from 'react';
import './data-table.css';

export default function DataTable(props) {

    const initialState = {
        head: ['Name', 'ICAO', 'IATA', 'Elev', 'Lat.', 'Long.', 'Type']
    }

    const [state] = useState(initialState);

    let elevationMetersToFeet = (value) => {
        if (value !== null && value !== 'null') {
            return Math.floor(value * 3.280839895) + ' ft';
        }
    }

    let toDegreesMinutesAndSeconds = (coordinate) => {
        var absolute = Math.abs(coordinate);
        var degrees = Math.floor(absolute);
        var minutesNotTruncated = (absolute - degrees) * 60;
        var minutes = Math.floor(minutesNotTruncated);
        var seconds = Math.floor((minutesNotTruncated - minutes) * 60);

        return degrees + "°" + " " + minutes + "'" + " " + seconds + '"';
    }

    let convertDMS = (lat = null, lng = null) => {

        if (lat !== null) {
            const latitude = toDegreesMinutesAndSeconds(lat);
            const latitudeCardinal = lat >= 0 ? "N" : "S";
            return { lat: latitudeCardinal + " " + latitude }
        }

        if (lng !== null) {
            const longitude = toDegreesMinutesAndSeconds(lng);
            const longitudeCardinal = lng >= 0 ? "E" : "W";
            return { lng: longitudeCardinal + " " + longitude }
        }
    }


    return (
        <div className="table-wrapper">

            <label hidden>Change page size</label>
            <select defaultValue={4} className="change-page-size" id="changePageSize"
                onChange={props.changePageSize.bind(this)}>
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="10">10</option>
            </select>

            <div style={{ overflowX: 'auto' }}>
                <table>

                    <thead className={props.pageSize !== 4 ? 'add-scroll' : ''}>
                        <tr>
                            {
                                state.head.map(e => {
                                    return (
                                        <th key={e}>{e}</th>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody >
                        {props.airpotsData.length > 0 ?
                            props.airpotsData.map((e, index) => {
                                return (
                                    <React.Fragment key={e.id}>
                                        <tr className={(index % 2) === 0 ? 'light-gray-bg' : ''}>
                                            <td>{e.name}</td>
                                            <td>{e.icao}</td>
                                            <td>{e.iata}</td>
                                            <td>{elevationMetersToFeet(e.elevation)}</td>
                                            <td>{convertDMS(e.latitude, null).lat}</td>
                                            <td>{convertDMS(null, e.longitude).lng}</td>
                                            <td>{e.type}</td>
                                        </tr>
                                    </React.Fragment>
                                )
                            })
                            : <tr className="text-danger">
                                <td style={{ padding: '10px 0' }}>Data not found</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
