import React, { Component } from 'react';
import { Segment, Container, List, Icon } from 'semantic-ui-react'

class Footer extends Component {

  render() {
    return (
      <div className="ui inverted footer segment">
        <Container textAlign="center">
          <p>Developed by Gareth Moger</p>
          <p>Portfolio: <a href="https://garethmoger.com/">GarethMoger.com</a></p>
          <List horizontal inverted relaxed>
              <List.Item><Icon inverted as='a' href="https://github.com/gmojo/" name="github" /></List.Item>
              <List.Item><Icon inverted as='a' href="https://www.linkedin.com/in/garethmoger/" name="linkedin square" /></List.Item>
              <List.Item><Icon inverted as='a' href="https://codepen.io/gmojo/" name="codepen" /></List.Item>
          </List>
        </Container>
      </div>
    )
  }
}

export default Footer;