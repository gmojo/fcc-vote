import React, { Component } from 'react';
import { Container, Button, Icon } from 'semantic-ui-react'

class Login extends Component {

	render() {

		return(
			<Container textAlign='center'>

				<h1>Login or sign-up for a new account</h1>

			    <Button as='a' href='http://localhost:3001/auth/google' color='google plus'>
			        <Icon name='google plus' /> Google+
			    </Button>

			    <Button as='a' href='http://localhost:3001/auth/github' color='black'>
			    	<Icon name='github' /> Github
			    </Button>

			</Container>
		)
	}
}

export default Login;
