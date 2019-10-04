import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import UserAddEditForm from '../Forms/UserFormAddEdit'
import GroupAddEditForm from '../Forms/GroupFormAddEdit'
import AddEditForm from '../Forms/FormAddEdit'
import "@kenshooui/react-multi-select/dist/style.css"

class ModalForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  render() {
      const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>

      const label = this.props.buttonLabel
      const mode = this.props.buttonMode

      let button = ''
      let title = ''
      let Form = ''

      if(label === 'Edit'){
        button = <Button
                  color="warning"
                  onClick={this.toggle}
                  style={{float: "left", marginRight:"10px"}}>{label}
                </Button>
        title = 'Edit Item'
      } else if(label === 'Add'){
        let userId = this.props.item.id;
        button = <Button
                  color="success"
                  onClick={this.toggle}
                  style={{float: "left", marginRight:"10px"}}>{label}
                </Button>
        title = 'Add Group for user ' + userId
      } else {
        button = <Button
                  color="success"
                  onClick={this.toggle}
                  style={{float: "left", marginRight:"10px"}}>{label}
                </Button>
        title = 'Add New Item'
      }

      if(mode === 'User'){
        Form = <UserAddEditForm
        addItemToState={this.props.addItemToState}
        updateState={this.props.updateState}
        toggle={this.toggle}
        item={this.props.item}
        actionMode={this.props.actionMode} />
      } else if(mode === 'AddGroup'){
        Form = <AddEditForm
        addItemToState={this.props.addItemToState}
        updateState={this.props.updateState}
        toggle={this.toggle}
        item={this.props.item} />
      } else {
        Form = <GroupAddEditForm
        addItemToState={this.props.addItemToState}
        updateState={this.props.updateState}
        toggle={this.toggle}
        item={this.props.item} />
      }

      return (
      <div>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} close={closeBtn}>{title}</ModalHeader>
          <ModalBody>
            {Form}
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default ModalForm