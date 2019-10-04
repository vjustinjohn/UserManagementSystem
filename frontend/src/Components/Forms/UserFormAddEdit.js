import React from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

class UserAddEditForm extends React.Component {
  state = {
    id: 0,
    first: '',
    last: '',
    email: '',
    phone: '',
    location: '',
    hobby: '',
    firstError:null,
    lastError:null,
    emailError:null,
    phoneError:null,
    groupError:null,
    group : '',
    groups : []
  }
  groupSection = ''

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  validate = () => {
    const regexPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(this.state.first === '') {
      this.setState({
        firstError: 'First Name is required',
        lastError: null,
        emailError:null,
        phoneError:null,
        groupError:null
      });
      return false;
    } else if(this.state.last === '') {
      this.setState({        
        firstError: null,
        lastError: 'Last Name is required',
        emailError:null,
        phoneError:null,
        groupError:null
      });
      return false;
    }  else if(this.state.email === '' || !(regexEmail.test(this.state.email))) {
      this.setState({
        lastError: null,
        firstError: null,
        emailError:'Email is required/invalid',
        phoneError:null,
        groupError:null
      });
      return false;
    } else if(this.state.phone === '' || !(regexPhone.test(this.state.phone))) {
      this.setState({
        lastError: null,
        firstError: null,
        emailError: null,
        phoneError:'Phone is required/invalid',
        groupError:null
      });
      return false;
    } else if(this.state.group === 0 && this.props.actionMode === 'add') {
      this.setState({
        lastError: null,
        firstError: null,
        emailError: null,
        phoneError:null,
        groupError:'Group is required',
      });
      return false;
    }
    return true;
  }

  submitFormAdd = e => {
    console.log(this.state.group);
    e.preventDefault()
    const isValid = this.validate()
    if(isValid) { 
      fetch('http://localhost:3000/users', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          first: this.state.first,
          last: this.state.last,
          email: this.state.email,
          phone: this.state.phone,
          location: this.state.location,
          hobby: this.state.hobby,
          group: this.state.group
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
      fetch('http://localhost:3000/users', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: this.state.id,
          first: this.state.first,
          last: this.state.last,
          email: this.state.email,
          phone: this.state.phone,
          location: this.state.location,
          hobby: this.state.hobby
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

  getItems(){
    fetch('http://localhost:3000/groups')
      .then(response => response.json())
      .then(groups => {
        if(groups.dataExists) {
          groups = [];
        }
        this.setState({groups})
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { id, first, last, email, phone, location, hobby } = this.props.item
      this.setState({ id, first, last, email, phone, location, hobby })
    }
    this.getItems()
  }

  render() {

    if(this.props.actionMode === 'add') {
      this.groupSection = <FormGroup>
      <Label for="exampleSelectMulti">Group</Label>
      <Input type="select" name="group" id="group" onChange={this.onChange}>
      <option key="0" value="0">Select</option>
      {this.state.groups.map(({id,name}) => <option key={id} value={id}>{name}</option>)}
      </Input><br/>
      {this.state.groupError?(<Alert color="danger">{this.state.groupError}</Alert>) : null }
    </FormGroup>
    }

    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="first">First Name</Label>
          <Input type="text" name="first" id="first" onChange={this.onChange} value={this.state.first === null ? '' : this.state.first} /><br/>
          {this.state.firstError?(<Alert color="danger">{this.state.firstError}</Alert>) : null }
        </FormGroup>
        <FormGroup>
          <Label for="last">Last Name</Label>
          <Input type="text" name="last" id="last" onChange={this.onChange} value={this.state.last === null ? '' : this.state.last}  /><br/>
          {this.state.lastError?(<Alert color="danger">{this.state.lastError}</Alert>) : null }
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" onChange={this.onChange} value={this.state.email === null ? '' : this.state.email}  /><br/>
          {this.state.emailError?(<Alert color="danger">{this.state.emailError}</Alert>) : null }
        </FormGroup>
        <FormGroup>
          <Label for="phone">Phone</Label>
          <Input type="text" name="phone" id="phone" onChange={this.onChange} value={this.state.phone === null ? '' : this.state.phone}  placeholder="ex. 555-555-5555" /><br/>
          {this.state.phoneError?(<Alert color="danger">{this.state.phoneError}</Alert>) : null }
        </FormGroup>
        <FormGroup>
          <Label for="location">Location</Label>
          <Input type="text" name="location" id="location" onChange={this.onChange} value={this.state.location === null ? '' : this.state.location}  placeholder="City, State" />
        </FormGroup>
        <FormGroup>
          <Label for="hobby">Hobby</Label>
          <Input type="text" name="hobby" id="hobby" onChange={this.onChange} value={this.state.hobby}  />
        </FormGroup>
        {this.groupSection}
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default UserAddEditForm