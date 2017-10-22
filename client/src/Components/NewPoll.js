import React, { Component } from 'react';
import { Button, Modal, Header, Form, Icon, Grid, Message } from 'semantic-ui-react'

class NewPoll extends Component {
  state = {
    count: 2,
    modalOpen: false,
    newTitle: '',
    newLabels: [],
    newValues: [],
    newCreatedBy: ''
  }

  //open modal
  handleOpen = () => {
    if(this.props.isAuth) {
      this.setState({ modalOpen: true })
    } else {
      alert('Please login first')
    }
  }


  //Close modal and reset state values
  handleClose = () => {
    this.setState({ 
      count: 2,
      modalOpen: false,
      newTitle: '',
      newLabels: [],
      newValues: [],
      newCreatedBy: ''
     })
  }

  //If first input set first array value else use index position to update element in array
  handleChange = (event, { name, value, index }) => {
    if(name === 'newTitle' || name === 'newCreatedBy') {
      this.setState({ [name]: value })
    } else {
      let newValues = this.state[name]
      newValues[index] = value
      this.setState({[name]: newValues})
    }
  }


  //Handle submit for new poll - send post request to express api
  //labels/values should not be undefined or null
  //all values be numbers
  //newLabels and newValues > 1 && length = length
  handleSubmit = () => {
    let {newTitle, newCreatedBy, newLabels, newValues} = this.state
    let newPollData = []

    for(let i=0; i < newLabels.length; i++) {
      newPollData.push({"key": newLabels[i], "value": parseInt(newValues[i], 10)})
    }

    let newPoll = {
      "pollName": newTitle,
      "createdBy": newCreatedBy,
      "pollData": newPollData
    }

    fetch('/api/newpoll/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPoll)
    })
    .then((res) => {
      this.handleClose()
      this.props.loadData()
    })
    .catch((err) => console.log(err))
  }

  //Updates state and renders new elements
  addClick = () => {
    this.setState({count: this.state.count+1})
  }

  //Splice state values from index position and reset state
  removeClick = (event, {index}) => {
    let newLabels = this.state.newLabels
    newLabels.splice(index, 1)

    let newValues = this.state.newValues
    newValues.splice(index, 1)

    this.setState({
      count: this.state.count - 1,
      newLabels,
      newValues
    })
  }

  //create elements for poll labels/values
  //2 inputs are rendered initially but more can be added dynamically by the user with addClick
  //state will be updated with each change
  createUI = () => {
     let uiItems = [];
     let {newLabels, newValues} = this.state

     for(let i = 0; i < this.state.count; i++){
           uiItems.push(
               <Form.Group key={i}>
                 <Form.Input index={i} name='newLabels' value={newLabels[i] ? newLabels[i] : ''} onChange={this.handleChange} width={4} />
                 <Form.Input index={i} name='newValues' value={newValues[i] ? newValues[i] : ''} onChange={this.handleChange} width={2} />
                 {i > 1 &&
                 <Button negative icon index={i} size="mini" onClick={this.removeClick}><Icon name='delete' /></Button>
                  }
               </Form.Group>
            )
     }
     return uiItems || null;
  }

	render() {

	    return (
          <Modal 
          	trigger={<Button positive size='large' onClick={this.handleOpen}>Create New Poll</Button>}
          	open={this.state.modalOpen}
          >
            <Modal.Content>
              <Header>Create New Poll</Header>
              <Form>
                <Form.Input
                  label='Poll Title' 
                  name='newTitle' 
                  onChange={this.handleChange}
                />
                <Form.Input
                  label='Created By' 
                  name='newCreatedBy' 
                  onChange={this.handleChange}
                />
                <Grid>
                  <Grid.Column width={4}><strong>Labels</strong></Grid.Column>
                  <Grid.Column width={2}><strong>Values</strong></Grid.Column>
                </Grid>                  
                {this.createUI()}
                <Message info>
                  <p>Set initial values or leave blank</p>
                </Message>
                <Button positive onClick={this.addClick}>Add Item</Button>
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button.Group>
                <Button positive onClick={this.handleSubmit}>Submit</Button>
                <Button.Or />
                <Button negative onClick={this.handleClose}>Cancel</Button>
              </Button.Group>
            </Modal.Actions>
          </Modal>
	    );
	}
}	

export default NewPoll;