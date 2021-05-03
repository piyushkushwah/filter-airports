import React, { useState } from 'react';
import './check-box.css';
import checkMarkGray from '../../assets/check-mark-gray.svg'
import checkMarkWhite from '../../assets/check-mark.svg'

export default function CheckBox(props) {

    const [checkBoxState, setCheckBoxState] = useState(false);

    return (
        <div className="checkbox-wrapper"
            onClick={() => {
                setCheckBoxState(!checkBoxState)
                props.action(!checkBoxState, props.name.toLowerCase())
            }}>

            <div className={checkBoxState ?
                'check-box-background check-box-border'
                : 'check-box-border'}>
                {
                    checkBoxState ?
                        <img src={checkMarkWhite} alt="check-icon" />
                        : <img src={checkMarkGray} alt="check-icon" />
                }
            </div>
            <p>{props.name}</p>
        </div>
    )
}
