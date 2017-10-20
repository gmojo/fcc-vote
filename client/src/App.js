import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom'
import NavComponent from './Components/Navbar.js';
import Home from './Pages/Home.js';
import About from './Pages/About.js';
import Poll from './Pages/Poll.js';

class App extends Component {
  state = {
    isAuth: false,
    user: {
      email: '',
      name: ''
    }
  }

  componentDidMount() {
    this.loadData()
  }

  //get data from express api and store in state
  loadData() {
    fetch('http://127.0.0.1:3001/api/user', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'no-cors'
    })
      .then((response) => {
        if(!response.ok) {
          throw Error(response.statusText)
        }
        return response.json()
      })
      .then((data) => {
        this.setState({
          isAuth: true,
          user: {
            email: data.google.email || data.github.email,
            name: data.google.name || data.github.name
          }
        })
      })
      .catch((err) => console.log(err))
  }


  render() {
    const {isAuth, user} = this.state

    return(
      <BrowserRouter>
        <div className="App">
          <NavComponent isAuth={isAuth} user={user} />
          <main>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route path="/poll/:pollId" component={Poll} />
          </main>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;