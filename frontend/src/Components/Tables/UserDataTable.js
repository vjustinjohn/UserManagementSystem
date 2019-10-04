import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'

class UserDataTable extends Component {

  deleteItem = id => {
    let confirmDelete = window.confirm('Delete item forever?')
    if(confirmDelete){
      fetch('http://localhost:3000/users', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id
      })
    })
      .then(response => response.json())
      .then(item => {
        this.props.deleteItemFromState(id)
      })
      .catch(err => console.log(err))
    }

  }

  render() {
    
    const items = this.props.items.map(item => {
      if(this.props.detail) {
        return (
          <tr key={item.id}>
            <th scope="row">{item.id}</th>
            <td>{item.first}</td>
            <td>{item.last}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.location}</td>
            <td>{item.hobby}</td>
          </tr>
          )
      } else {
        return (
          <tr key={item.id}>
            <th scope="row">{item.id}</th>
            <td>{item.first}</td>
            <td>{item.last}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.location}</td>
            <td>{item.hobby}</td>
            <td>
              <div style={{width:"140px"}}>
                <ModalForm buttonLabel="Edit" buttonMode="User" item={item} updateState={this.props.updateState} actionMode="edit"/>
                {' '}
                <Button color="danger" onClick={() => this.deleteItem(item.id)}>Del</Button>
                {' '}
                <Button href={'/users/' + item.id} >Detail</Button>
              </div>
            </td>
            <td>
              <div style={{width:"35px"}}>
                <ModalForm buttonLabel="Add" buttonMode="AddGroup" item={item} updateState={this.props.updateState}/>
              </div>
            </td>
          </tr>
          )
      }
      })

    if(this.props.detail) {
      return (
        <Table responsive hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>First</th>
              <th>Last</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Location</th>
              <th>Hobby</th>
            </tr>
          </thead>
          <tbody>
            {items}
          </tbody>
        </Table>
      )
      } else {
      return (
        <Table responsive hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>First</th>
              <th>Last</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Location</th>
              <th>Hobby</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items}
          </tbody>
        </Table>
      )
    }
  }
}

export default UserDataTable