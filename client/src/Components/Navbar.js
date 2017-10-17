import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Segment, Menu, Button, Container } from 'semantic-ui-react'

class NavComponent extends Component {

  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Segment inverted>
        <Menu inverted secondary>
          <Container>
            <Menu.Item as={Link} to='/' name='home' active={activeItem === 'home'} onClick={this.handleItemClick}>
            </Menu.Item>
            <Menu.Item position='right' name={this.props.user.name}>
            </Menu.Item>
            <Menu.Menu position='right' as={Link} to='/login' name='login' onClick={this.handleItemClick}>
              <Button primary>Login</Button>
            </Menu.Menu>
          </Container>
        </Menu>
      </Segment>
    )
  }
}

export default NavComponent;