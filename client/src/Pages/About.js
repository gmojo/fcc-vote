import React, { Component } from 'react';
import { Container, List } from 'semantic-ui-react'

class About extends Component {

	render() {
		return(
			<Container style={{ marginTop: '2em' }}>
				<h2>FreeCodeCamp Projects</h2>
				<h2>Voting App</h2>
				<h3>User Stories</h3>
				<List ordered>
					<List.Item>As an authenticated user, I can keep my polls and come back later to access them.</List.Item>
					<List.Item>As an authenticated user, I can share my polls with my friends.</List.Item>
					<List.Item>As an authenticated user, I can see the aggregate results of my polls.</List.Item>
					<List.Item>As an authenticated user, I can delete polls that I decide I don't want anymore.</List.Item>
					<List.Item>As an authenticated user, I can create a poll with any number of possible items.</List.Item>
					<List.Item>As an unauthenticated or authenticated user, I can see and vote on everyone's polls.</List.Item>
					<List.Item>As an unauthenticated or authenticated user, I can see the results of polls in chart form.</List.Item>
					<List.Item>As an authenticated user, if I don't like the options on a poll, I can create a new option.</List.Item>
				</List>
				<h3>To do..</h3>
				<List ordered>
					<List.Item>Only poll owner can delte poll - add user ID to poll on creation and lookup on delete</List.Item>
					<List.Item>Complete fixed footer</List.Item>
					<List.Item>Validate new poll form</List.Item>
					<List.Item>Validate new option form</List.Item>
				</List>
			</Container>
		)
	}

}

export default About;