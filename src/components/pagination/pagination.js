import React, { useState, useEffect } from 'react';
import './pagination.css';
import rightArrow from '../../assets/right-arrow.svg'
import leftArrow from '../../assets/left-arrow.svg'

export default function Pagination(props) {

    const initialState = {
        page: 1
    }
    const [state, setstate] = useState(initialState)
    const { page } = state;

    console.log(props);

    let getPaginate = () => {
        console.log('paginate called', page);
        let data = props.airpotsData.slice((page - 1) * props.pageSize, (page - 1)
            * props.pageSize + props.pageSize);
        console.log(data);
        props.returnAction(data);
    }

    let pageNumberDecrease = () => {
        if (page <= 1) {
            return;
        }
        setstate({ ...state, page: page - 1 });
    }

    let pageNumberIncrease = () => {
        if ((((page - 1)
            * props.pageSize + props.pageSize) - 1) >= props.airpotsData.length) {
            return;
        }
        setstate({ ...state, page: page + 1 });
    }

    useEffect(() => {
        getPaginate();
    }, [page, props.airpotsData, props.pageSize])

    return (
        <div className="pagination">
            <span onClick={pageNumberDecrease.bind(this)} className="circle-bg">
                <img src={leftArrow} alt="rightArrow" />
            </span>
            <span>Showing <strong>{(page - 1) * props.pageSize}- {((page - 1)
                * props.pageSize + props.pageSize) - 1}</strong> of <strong>{props.airpotsData.length}</strong> results</span>
            <span onClick={pageNumberIncrease.bind(this)} className="circle-bg">
                <img src={rightArrow} alt="leftArrow" />
            </span>
        </div>
    )
}
