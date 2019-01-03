import React from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import HomePage from './components/homePage/Homepage';
import ToolPage from './components/toolPage/ToolPage';
import LayerInfos from './components/toolPage/LayerInfos';
import NavBar from './containers/NavBar';
import AddLayer from './containers/AddLayer';
import LoadingContent from './containers/LoadingContent';

const App = () => (
  <div className="App">
    <NavBar />
    <LoadingContent />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/ToolPage" component={ToolPage} />
      <Route path="/layerinfos" component={LayerInfos} />
      <Route path="/newLayer/" component={AddLayer} />
    </Switch>
  </div>
);

export default App;
