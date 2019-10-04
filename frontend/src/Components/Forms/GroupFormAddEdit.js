import React from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

class GroupAddEditForm extends React.Component {
  state = {
    id: 0,
    name: '',
    nameError:null
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  validate = () => {
    if(this.state.name === '') {
      this.setState({
        nameError: 'Name is required'
      });
      return false;
    } else {
      this.setState({
        nameError: null
      });
    }
    return true;
  }

  submitFormAdd = e => {
    e.preventDefault()
    const isValid = this.validate()
    if(isValid) {    
      fetch('http://localhost:3000/groups', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.state.name
        })
      })
        .then(response => response.json())
        .then(item => {
          if(Array.isArray(item)) {
            this.props.addItemToState(item[0])
            this.props.toggle()
          } else {
            console.log('failure')
          }
        })
        .catch(err => console.log(err))
    }
  }

  submitFormEdit = e => {
    e.preventDefault()
    const isValid = this.validate()
    if(isValid) { 
      fetch('http://localhost:3000/groups', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: this.state.id,
          name: this.state.name
        })
      })
        .then(response => response.json())
        .then(item => {
          if(Array.isArray(item)) {
            // console.log(item[0])
            this.props.updateState(item[0])
            this.props.toggle()
          } else {
            console.log('failure')
          }
        })
        .catch(err => console.log(err))
    }
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { id, name } = this.props.item
      this.setState({ id, name })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input type="text" name="name" id="name" onChange={this.onChange} value={this.state.name === null ? '' : this.state.name} />
          <br/>
          {this.state.nameError?(<Alert color="danger">{this.state.nameError}</Alert>) : null }
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default GroupAddEditForm