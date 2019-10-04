import React from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import MultiSelect from "@kenshooui/react-multi-select";

class AddEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      items: [],
      selectedItems: []
    };
    this.userId = ''
  }

  getItems(){
    fetch('http://localhost:3000/groups')
      .then(response => response.json())
      .then(items => {
        items = items.map(({ id, name }) => ({ id: id, label: name }));
        this.setState({items})
      })
      .catch(err => console.log(err))

    this.userId = this.props.item.id;
    
    fetch('http://localhost:3000/usergroups/?id='+this.userId)
        .then(response => response.json())
        .then(selectedItems => {
          console.log(selectedItems);
          selectedItems = selectedItems.map(({ groupid, name }) => ({ id: groupid, label: name }));
          if(!Array.isArray(selectedItems)) {
            selectedItems = [];
          }
          console.log(selectedItems);
          this.setState({selectedItems})
        })
        .catch(err => console.log(err))
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormEdit = e => {
    e.preventDefault()

    let submitItems = this.state.selectedItems.map(({ id }) => ({userid: this.userId, groupid : id}));
    
    fetch('http://localhost:3000/usergroups/', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data : submitItems,
          userId : this.userId
        })
      })
        .then(response => response.json())
        .then(item => {
          console.log(item);
          if(item.success) {
            //this.props.addItemToState(item[0])
            this.props.toggle()
          } else {
            console.log('failure')
          }
        })
        .catch(err => console.log(err))
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { id, first, last, email, phone, location, hobby } = this.props.item
      this.setState({ id, first, last, email, phone, location, hobby })
    }
    this.getItems();
  }

  handleChange(selectedItems) {
    this.setState({ selectedItems });
  }

  render() {
    const { items, selectedItems } = this.state;
    return (
      <Form onSubmit={this.submitFormEdit}>
        <MultiSelect
          items={items}
          selectedItems={selectedItems}
          onChange={this.handleChange}
        />
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm