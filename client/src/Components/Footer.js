import React, { Component } from 'react';
import { Segment, Container, List, Icon } from 'semantic-ui-react'
import '../App.css';

class Footer extends Component {

  render() {
    return (
      <Segment inverted className="footer">
        <Container textAlign="center">
          <p>Developed by Gareth Moger</p>
          <p>Portfolio: <a href="https://garethmoger.com/">GarethMoger.com</a></p>
          <List horizontal inverted>
              <List.Item>
                <a href='https://github.com/gmojo/'><Icon size='big' name="github" /></a>
              </List.Item>
              <List.Item>
                <a href='https://www.linkedin.com/in/garethmoger/'><Icon size='big' name="linkedin square" /></a>
              </List.Item>
              <List.Item>
                <a href='https://codepen.io/gmojo/'><Icon size='big' name="codepen" /></a>
              </List.Item>
          </List>
        </Container>
      </Segment>
    )
  }
}

export default Footer;