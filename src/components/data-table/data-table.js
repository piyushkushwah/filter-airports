import React, { useState } from 'react';
import './data-table.css';

export default function DataTable(props) {

    const initialState = {
        head: ['Name', 'ICAO', 'IATA', 'Elev', 'Lat.', 'Long.', 'Type']
    }

    const [state] = useState(initialState);

    let nullCheck = (data) => {
        if (data === null) {
            return 'null';
        } else {
            return data
        }
    }

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

        if (lat !== null && lat !== 'null') {
            const latitude = toDegreesMinutesAndSeconds(lat);
            const latitudeCardinal = lat >= 0 ? "N" : "S";
            return { lat: latitudeCardinal + " " + latitude }
        }

        if (lng !== null && lng !== 'null') {
            const longitude = toDegreesMinutesAndSeconds(lng);
            const longitudeCardinal = lng >= 0 ? "E" : "W";
            return { lng: longitudeCardinal + " " + longitude }
        }
    }


    return (
        <div>
            <label hidden>Change page size</label>
            <select defaultValue={4} className="change-page-size" id="changePageSize"
                onChange={props.changePageSize.bind(this)}>
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="10">10</option>
                <option value="20">20</option>
            </select>
            <table>

                <thead>
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
                <tbody>
                    {
                        props.airpotsData.map((e, index) => {
                            return (
                                <React.Fragment key={e.id}>
                                    <tr className={(index % 2) === 0 ? 'light-gray-bg' : ''}>
                                        <td>{nullCheck(e.name)}</td>
                                        <td>{nullCheck(e.icao)}</td>
                                        <td>{nullCheck(e.iata)}</td>
                                        <td>{elevationMetersToFeet(nullCheck(e.elevation))}</td>
                                        <td>{convertDMS(nullCheck(e.latitude), null).lat}</td>
                                        <td>{convertDMS(null, nullCheck(e.longitude)).lng}</td>
                                        <td>{nullCheck(e.type)}</td>
                                    </tr>
                                </React.Fragment>
                            )
                        })
                    }
                </tbody>
            </table>

        </div>
    )
}
