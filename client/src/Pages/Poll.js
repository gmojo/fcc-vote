import React, { Component } from 'react';
import PollResult from '../Components/PollResult.js'
import NewOption from '../Components/NewOption.js'
import { Container, Loader, Form } from 'semantic-ui-react'

//Remove default values in state - no longer needed
//Ensure users only vote once - save names in database?

class Poll extends Component {
	state = {
		vote: '',
		voted: false,
		single: true,
		options: [],
		poll: {
			pollData: [{key: '', value: 10}],
			pollName: '',
			createdBy: '',
			_id: ''
		}
	}

	handleChange = (e, { value }) => this.setState({ vote: value })

	handleSubmit = (event) => {
		event.preventDefault();

		let {vote, poll} = this.state

		fetch('/api/vote/' + poll._id, {
			credentials: 'include',
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({option: vote})
		})
	    .then((res) => {
	    	this.setState({voted: true})
	    	this.loadData()
	    })
	    .catch((err) => console.log(err))
	}
	

	componentDidMount() {
		this.loadData()
	}

	//get data from express api and store in state
	loadData() {
		fetch('/api/polls/' + this.props.match.params.pollId, {
	      method: 'GET',
	      credentials: 'include',
	      headers: {
	        'Content-Type': 'application/json'
	      },
	      mode: 'no-cors'
		})
		.then((response) => {
			if(!response.ok) {
				throw Error(response.statusText)
			}
			return response.json()
		})
		.then((data) => {
			let options = data.pollData.map(item => {
				return {
					key: item.key, text: item.key, value: item.key
				}
			})
			this.setState({poll: data, options})
		})
		.catch((err) => console.log(err))

	}


	render() {
		const {poll, single, options, voted} = this.state

		//Show loading icon if fetched data has not yet returned and saved to state
		if(poll.pollName === '') {
			return <Loader active inline='centered'>Loading</Loader>
		} else {
			return(
				<Container style={{ marginTop: '2em' }}>
					<h1>{poll.pollName}</h1>
					<p>created by {poll.createdBy} on {poll.createdOn}</p>
					<p>Total votes cast: 30</p>
					<PollResult poll={poll} single={single} />
					<Form>
						<Form.Group inline>
							<Form.Select options={options} placeholder='Options' onChange={this.handleChange} />
							<Form.Button positive disabled={voted} onClick={this.handleSubmit}>Vote</Form.Button>
							<NewOption pollId={poll._id} loadData={this.loadData.bind(this)} />
						</Form.Group>
					</Form>
				</Container>
			)
		}
	}
}

export default Poll;