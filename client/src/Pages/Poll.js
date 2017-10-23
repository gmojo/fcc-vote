import React, { Component } from 'react';
import PollResult from '../Components/PollResult.js'
import NewOption from '../Components/NewOption.js'
import { Container, Loader, Form, Grid } from 'semantic-ui-react'
import { Share } from 'react-twitter-widgets'

//Remove default values in state - no longer needed

class Poll extends Component {
	state = {
		vote: '',
		voted: false,
		single: true,
		totalVotes: 0,
		options: [],
		poll: {
			pollData: [{key: '', value: 10}],
			pollName: '',
			createdBy: '',
			_id: ''
		}
	}

	formatDate = (date) => {
		let newDate = new Date(date)
		let monthNames = [
			"January", "February", "March",
			"April", "May", "June", "July",
			"August", "September", "October",
			"November", "December"
		];

		let day = newDate.getDate();
		let monthIndex = newDate.getMonth();
		let year = newDate.getFullYear();

		return day + ' ' + monthNames[monthIndex] + ' ' + year;
	}

	// Update state with selected vote values
	handleChange = (e, { value }) => this.setState({ vote: value })

	// Submit vote to api and re-render
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

			let totalVotes = data.pollData.reduce((total, value) => (total + value.value), 0)

			this.setState({poll: data, options, totalVotes})
			document.title = this.state.poll.pollName;
		})
		.catch((err) => console.log(err))

	}


	// Check if request is from poll owner and if true then delete
	handleDelete = (event) => {
		if(!this.props.isAuth) {
			alert('Please login first')
		} else if(this.props.user.id !== this.state.poll.createdById) {
			alert('You must be the owner to delete the poll. Please make sure you are logged in with the account used when the poll was created')
		} else {
			event.preventDefault();
			let {poll} = this.state

			//check requester and poll owner match

			fetch('/api/delete/' + poll._id, {
				credentials: 'include',
				method: 'DELETE'
			})
		    .then((res) => {
		    	this.props.history.push('/');
		    })
		    .catch((err) => console.log(err))
		}
	}


	render() {
		const {poll, single, options, voted, totalVotes} = this.state
		const pollId = this.props.match.params.pollId

		//Show loading icon if fetched data has not yet returned and saved to state
		if(poll.pollName === '') {
			return <Loader active inline='centered'>Loading</Loader>
		} else {
			return(
				<Container textAlign='center' style={{ marginTop: '0.5em' }}>
					<h2>{poll.pollName}</h2>
					<p>created by {poll.createdBy} on {this.formatDate(poll.createdOn)}</p>
					<p>Total votes cast: {totalVotes}</p>
					<Share url={'http://localhost:3000/Poll/' + pollId} />
					<PollResult poll={poll} single={single} />
					<Grid centered style={{ marginTop: '0.5em' }}>
						<Form>
							<Form.Group inline>
								<Form.Select options={options} placeholder='Options' onChange={this.handleChange} />
								<Form.Button positive disabled={voted} onClick={this.handleSubmit}>Vote</Form.Button>
								<NewOption isAuth={this.props.isAuth} user={this.props.user} pollId={poll._id} loadData={this.loadData.bind(this)} />
								<Form.Button negative onClick={this.handleDelete}>Delete</Form.Button>
							</Form.Group>
						</Form>
					</Grid>
				</Container>
			)
		}
	}
}

export default Poll;