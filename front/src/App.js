import React from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage/Homepage';
import ToolPage from './components/ToolPage/ToolPage';


const App = () => (
  <div className="App">
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/ToolPage" component={ToolPage} />
    </Switch>
  </div>
);

export default App;
