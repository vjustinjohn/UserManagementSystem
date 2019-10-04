import React, { Component } from 'react'
import { Container, Row, Col, Input } from 'reactstrap'
import ModalForm from './Modals/Modal'
import UserDataTable from './Tables/UserDataTable'

class Users extends Component {
  state = {
    items: [],
    search : ''
  }

  getItems(){
    fetch('http://localhost:3000/users?search='+this.state.search)
      .then(response => response.json())
      .then(items => {
        if(items.dataExists) {
          items = [];
        }
        this.setState({items})
      })
      .catch(err => console.log(err))
  }

  addItemToState = (item) => {
    this.setState(prevState => ({
      items: [...prevState.items, item]
    }))
  }

  updateState = (item) => {
    const itemIndex = this.state.items.findIndex(data => data.id === item.id)
    const newArray = [
    // destructure all items from beginning to the indexed item
      ...this.state.items.slice(0, itemIndex),
    // add the updated item to the array
      item,
    // add the rest of the items to the array from the index after the replaced item
      ...this.state.items.slice(itemIndex + 1)
    ]
    this.setState({ items: newArray })
  }

  deleteItemFromState = (id) => {
    const updatedItems = this.state.items.filter(item => item.id !== id)
    this.setState({ items: updatedItems })
  }

  componentDidMount(){
    this.getItems()
  }

  onChange = e => {
    this.setState({search: e.target.value})
    let thisO = this;
    setTimeout(function(){
      thisO.getItems()
    },100)
  }

  render() {
    return (
      <Container className="App">
        <Row>
          <Col>
            <h1 style={{margin: "20px 0"}}>Users</h1>
            <Input type="text"  style={{width: "370px"}} name="search" id="search" onChange={this.onChange.bind(this)} value={this.state.search}/>
            <br/>
          </Col>
        </Row>
        <Row>
          <Col>
            <UserDataTable items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
          </Col>
        </Row>
        <Row>
          <Col>
            <ModalForm buttonLabel="Add User" buttonMode="User" addItemToState={this.addItemToState} actionMode="add"/>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Users