import React, { Component } from 'react';
import { Segment, Menu, Container, Icon } from 'semantic-ui-react'

class Footer extends Component {

  render() {
    return (
          <Segment inverted vertical textAlign='center' style={{ marginTop: '5em 0em' }}>
            <Container textAlign='center'>
              <p>Developer: Gareth Moger</p>
              <p>Portfolio: <a href="https://garethmoger.com/">GarethMoger.com</a></p>
            </Container>
          </Segment>
    )
  }
}

export default Footer;