import React from 'react';

export default function PersonRow({ onChecked, person, onDeleteClick, onEditClick, isChecked }) {
    return (
        <tr>
            <td>
                <input type="checkbox" className='form-control' onChange={onChecked} checked={isChecked}/>
            </td>
            <td>{person.firstName}</td>
            <td>{person.lastName}</td>
            <td>{person.age}</td>
            <td>
               <button className='btn btn-danger btn-block' onClick={onDeleteClick}>Delete!</button>
               <button className='btn btn-warning btn-block' onClick={onEditClick}>Edit</button>
            </td>
        </tr>
        );
}
