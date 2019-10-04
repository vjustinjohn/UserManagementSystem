import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'

class GroupDataTable extends Component {

  deleteItem = id => {
    let confirmDelete = window.confirm('Delete item forever?')
    if(confirmDelete){
      fetch('http://localhost:3000/groups', {
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
        if(item.dataExists) {
          alert('User exists in this group')
        } else {
          this.props.deleteItemFromState(id)
        }
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
            <td>{item.name}</td>
          </tr>
          )
      } else {
        return (
          <tr key={item.id}>
            <th scope="row">{item.id}</th>
            <td>{item.name}</td>
            <td>
              <div style={{width:"110px"}}>
                <ModalForm buttonLabel="Edit" buttonMode="Group" item={item} updateState={this.props.updateState}/>
                {' '}
                <Button color="danger" onClick={() => this.deleteItem(item.id)}>Del</Button>
                {' '}
                <Button href={'/groups/' + item.id} >Detail</Button>
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
              <th>Name</th>
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
              <th>Name</th>
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

export default GroupDataTable