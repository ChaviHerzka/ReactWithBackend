import React from 'react';

export default function PersonForm({ person, firstNameChange, lastNameChange, ageChange, addMode, addClick, updateClick, cancelClick }) {
    const {firstName, lastName, age } = person;
    return (
        <div className="jumbotron row">
            <div className="col-md-3">
                <input type="text" className="form-control" placeholder="First Name" value={firstName} name="firstName" onChange={firstNameChange} />
            </div>
            <div className="col-md-3">
                <input type="text" className="form-control" placeholder="Last Name" value={lastName} name="lastName" onChange={lastNameChange} />
            </div>
            <div className="col-md-3">
                <input type="text" className="form-control" placeholder="Age" value={age} name="age" onChange={ageChange} />
            </div>
            <div className='col-md-3'>
                {addMode && <button className='btn btn-success btn-block' onClick={addClick}>Add</button>}
                {!addMode &&
                 <div>
                    <button className='btn btn-warning btn-block' onClick={updateClick}>Update</button> 
                    <button className='btn btn-info btn-block' onClick={cancelClick}>Cancel</button> 
                </div>} 
             </div>
        </div>
    );
}

