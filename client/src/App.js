import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom'
import NavComponent from './Components/Navbar.js';
import Home from './Pages/Home.js';
import Login from './Pages/Login.js';

class App extends Component {

  render() {
    return(
      <BrowserRouter>
        <div className="App">
          <NavComponent />
          <main>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
          </main>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;