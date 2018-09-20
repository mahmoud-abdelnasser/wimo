import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route , Switch} from 'react-router-dom';
import HomeLayout from './component/HomeLayout';
import MapLayout from './component/MapLayout';
import Error from './component/Error';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/" component={HomeLayout} exact/>
            <Route path="/maps" component={MapLayout} exact/>
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
