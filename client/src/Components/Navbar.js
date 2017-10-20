import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Segment, Menu, Button, Container, Icon } from 'semantic-ui-react'

function AuthButtons(props) {
  if(props.isAuth) {
    return <Button negative style={{ marginLeft: '0.5em' }} as='a' href='http://localhost:3001/logout'>Logout</Button>
  } 
  return (
    <div>
      <Button as='a' href='http://localhost:3001/auth/google' color='google plus'>
        <Icon name='google plus' /> Google+
      </Button>
      <Button inverted style={{ marginLeft: '0.5em' }} as='a' href='http://localhost:3001/auth/github' color='black'>
        <Icon name='github' /> Github
      </Button>
    </div>
  )

}

class NavComponent extends Component {

  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
          <Segment
            inverted
            textAlign='center'
            vertical
          >
            <Container>
              <Menu inverted secondary>
                <Menu.Item as={Link} to='/' name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
                <Menu.Item as={Link} to='/about' name='about' active={activeItem === 'about'} onClick={this.handleItemClick} />
                <Menu.Item position='right'>
                  <Menu.Item name={this.props.user.name || 'Login'}></Menu.Item>
                  <AuthButtons />
                </Menu.Item>
              </Menu>
            </Container>

          </Segment>
    )
  }
}

export default NavComponent;