import React from 'react';

export default function CheckBox(props) {
    return (
        <div >
            <label >
                <input type="checkbox"
                    name={props.name}
                    id={props.name}
                    value={props.value}
                    onChange={(event) => { props.action(event.target.checked, props.name.toLowerCase()) }}
                />
                {props.name}
            </label>
        </div>
    )
}
