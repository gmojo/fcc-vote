import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Progress, Segment, Header, Button } from 'semantic-ui-react'

class PollResult extends Component {

	render() {
		const {poll, single} = this.props
		let pollTotalValues = poll.pollData
			.map(result => result.value)
			.reduce((total, result) => total + result)


		const colours = [
			'red', 'orange', 'yellow', 'olive',
		 	'green', 'teal', 'blue', 'violet',
		 	'pink', 'brown', 'grey', 'black'
		 	]

		return(
		  <Segment>
		  	{!single && <Header>{poll.pollName}</Header>}
		  	{poll.pollData.map((result, index) => (
		    <Progress key={result.key} percent={Math.floor(result.value / pollTotalValues * 100) || 0} color={colours[index]} progress>
		      {result.key}
		    </Progress>
		    ))}
		    {!single &&
		    	<Button as={Link} to={'/Poll/' + poll._id} primary>Vote</Button>
			}
		  </Segment>
		)
	}
}

export default PollResult;