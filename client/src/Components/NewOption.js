import React, { Component } from 'react';
import { Modal, Form, Header, Button, Message } from 'semantic-ui-react'

//handleSubmit function to add new values to database

class NewOption extends Component {
	state = {
		label: '',
		value: 0,
		modalOpen: false,
		formWarning: true
	}

	handleChange = (e, { name, value }) => this.setState({ [name]: value })

	//Open modal
  	handleOpen = () => {
  		if(!this.props.isAuth) {
  			alert('Please login first')
  		} else {
  			this.setState({ modalOpen: true })
  		}	
  	}

  	//Close modal and reset state values
	handleClose = () => {
		this.setState({ 
			modalOpen: false,
			label: '',
			value: 0,
			formWarning: true
		 })
	}

	validateForm = () => {
		if(this.state.label === '') {
			this.setState({formWarning: false})
			return
		} else {
			this.handleSubmit()
		}
	}

	handleSubmit = (event) => {
		event.preventDefault();

		let {label, value} = this.state
		let pollId = this.props.pollId

		let newOption = {'key': label, 'value': value}

		fetch('/api/option/' + pollId, {
			credentials: 'include',
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newOption)
		})
	    .then((res) => {
	    	this.handleClose()
	    	this.props.loadData()
	    })
	    .catch((err) => console.log(err))
	}

	render() {

		return(
         <Modal 
          	trigger={<Button onClick={this.handleOpen}>Add Option</Button>}
          	open={this.state.modalOpen}
          >
            <Modal.Content>
              <Header>Add new poll option</Header>
              <p>Set initial value or enter 0</p>
              <Form>
              	<Form.Group>
					<Form.Input label='Option' name='label' onChange={this.handleChange} />
					<Form.Input label='Value' name='value' onChange={this.handleChange} />
				</Form.Group>
              </Form>
              	<Message negative hidden={this.state.formWarning}>
                  <p>Please enter an option. Values left blank will default to 0</p>
                </Message>
            </Modal.Content>
            <Modal.Actions>
              <Button.Group>
                <Button positive onClick={this.validateForm}>Submit</Button>
                <Button.Or />
                <Button negative onClick={this.handleClose}>Cancel</Button>
              </Button.Group>
            </Modal.Actions>
          </Modal>
		)
	}
}

export default NewOption;