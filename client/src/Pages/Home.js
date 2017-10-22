import React, { Component } from 'react';
import PollResult from '../Components/PollResult.js'
import NewPoll from '../Components/NewPoll.js'
import { Grid, Container } from 'semantic-ui-react'
import '../App.css';

class Home extends Component {
	state = {
		polls: []
	}

	componentDidMount = () => {
		this.loadData();
	}

	//get data from express api and store in state
	loadData = () => {
		fetch('/api/polls', {
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
			this.setState({polls: data})
		})
		.catch((err) => console.log(err))
	}


	render() {
		const {polls} = this.state

		return(
			<Container style={{ marginTop: '0.5em' }} textAlign='center'>

				<h1>VOTING APP</h1>

				<NewPoll loadData={this.loadData.bind(this)} />

				<Grid columns={3} padded centered stackable verticalAlign='middle'>
					{polls.map(poll => (
						<Grid.Column key={poll._id}>
							<PollResult poll={poll} />
						</Grid.Column>
					))}
				</Grid>

			</Container>
		)
	}
}

export default Home;
