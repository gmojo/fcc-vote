import React, { Component } from 'react';
import { Container, Button, Icon } from 'semantic-ui-react'

class Login extends Component {

	render() {

		return(
			<Container textAlign='center'>

				<h1>Login or sign-up for a new account</h1>

				<a href="http://localhost:3001/auth/google">
				    <Button color='google plus'>
				        <Icon name='google plus' /> Google+
				    </Button>
			    </a>

			    <a href="http://localhost:3001/auth/github">
				    <Button color='black'>
				    	<Icon name='github' /> Github
				    </Button>
			    </a>

			</Container>
		)
	}
}

export default Login;
