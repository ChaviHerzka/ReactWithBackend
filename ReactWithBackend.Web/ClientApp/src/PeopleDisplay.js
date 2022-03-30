import React from 'react';
import PersonForm from './PersonForm';
import PersonRow from './PersonRow';
import { produce } from 'immer';
import axios from 'axios';

class PeopleDisplay extends React.Component {
    state = {
        people: [],
        selectedPeople: [],
        person: { firstName: '', lastName: '', age: '' },
        onAdd: true

    }

    loadPeople = () => {
        axios.get('/api/people/getall').then(({ data }) => {
            this.setState({ people: data });
        });
    }

    componentDidMount = () => {
        this.loadPeople();
    }
    onTextChange = e => {
        const nextState = produce(this.state, draftState => {
            draftState.person[e.target.name] = e.target.value;
        });
        this.setState(nextState)
    }
    onAddClick = () => {
        axios.post('api/people/addperson', this.state.person).then(() => {

            this.setState({
                person: { firstName: "", lastName: "", age: "" }
            });
            this.loadPeople();
        });
    }
    onUpdateClick = () => {
        axios.post('api/people/updateperson', this.state.person).then(() => {
            this.setState({
                person: { firstName: "", lastName: "", age: "" },
                onAdd: true
            });
            this.loadPeople();
        });
    }
    onDeleteAll = () => {
        axios.post('api/people/deleteall', this.state.selectedPeople).then(() => {
            this.setState({
                selectedPeople: []
            });
            this.loadPeople();
        });
    }
    onSelectAll = () => {
        this.setState({ selectedPeople: this.state.people.map(p => p.id) })
    }
    onUnselectAll = () => {
        this.setState({ selectedPeople: [] })
    }
    onEditClick = (p) => {
        this.setState({ person: p, onAdd: false })
    }
    onDeleteClick = (p) => {
        axios.post('api/people/deleteperson', p).then(() => {
            this.loadPeople();
        });
    }

    onChecked = (id) => {
        let selected = [];
        if (this.state.selectedPeople.includes(id)) {
            selected = this.state.selectedPeople.filter(i => i !== id)
        }
        else {
            selected = [...this.state.selectedPeople, id];
        }
        this.setState({ selectedPeople: selected })
    }
    cancelClick = () => {
        this.setState({ person: { firstName: "", lastName: "", age: "" }, onAdd: true })
    }

    render() {
        return (
            <div className='container'>
                <PersonForm
                    person={this.state.person}
                    firstNameChange={this.onTextChange}
                    lastNameChange={this.onTextChange}
                    ageChange={this.onTextChange}
                    addMode={this.state.onAdd}
                    addClick={this.onAddClick}
                    updateClick={this.onUpdateClick}
                    cancelClick={this.cancelClick}
                />
                <table className='table table-striped table-hover table-bordered mt-4'>
                    <thead>
                        <tr>
                            <th>
                                <button className='btn btn-danger btn-block' onClick={this.onDeleteAll}>Delete All</button>
                                <button className='btn btn-info btn-block' onClick={this.onSelectAll}>Check All</button>
                                <button className='btn btn-info btn-block' onClick={this.onUnselectAll}>Uncheck All</button>
                            </th>
                            <th> First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.people.map(p => {
                            return (
                                <PersonRow key={p.id}
                                    isChecked={this.state.selectedPeople.includes(p.id)}
                                    onChecked={() => this.onChecked(p.id)}
                                    person={p}
                                    onDeleteClick={() => this.onDeleteClick(p)}
                                    onEditClick={() => this.onEditClick(p)}
                                />)
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default PeopleDisplay;