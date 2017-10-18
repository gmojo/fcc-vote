import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Segment, Menu, Button, Container, Icon } from 'semantic-ui-react'

class NavComponent extends Component {

  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Segment>
        <Menu secondary>
          <Container>
            <Menu.Item as={Link} to='/' name='home' active={activeItem === 'home'} onClick={this.handleItemClick}>
            </Menu.Item>
            <Menu.Menu position='right'>
              <Menu.Item name='Login'></Menu.Item>
              <Button as='a' href='http://localhost:3001/auth/google' color='google plus'>
                  <Icon name='google plus' /> Google+
              </Button>
              <Button as='a' href='http://localhost:3001/auth/github' color='black'>
                <Icon name='github' /> Github
              </Button>
            </Menu.Menu>
          </Container>
        </Menu>
      </Segment>
    )
  }
}

export default NavComponent;