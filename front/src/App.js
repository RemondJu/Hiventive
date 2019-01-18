import React from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import HomePage from './components/homePage/Homepage';
import LayersDisplay from './containers/LayersDisplay';
import LayerInfos from './components/toolPage/LayerInfos';
import NavBar from './containers/NavBar';
import AddLayer from './containers/AddLayer';
import LoadingContent from './containers/LoadingContent';
import PageProject from './containers/PageProject';
import PageBuildProject from './containers/PageBuildProject';
import ListProjects from './containers/ListProjects';

const App = () => (
  <div className="App">
    <NavBar />
    <LoadingContent />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/ToolPage" component={LayersDisplay} />
      <Route path="/layerinfos/:id" component={LayerInfos} />
      <Route path="/newLayer/" component={AddLayer} />
      <Route path="/project-page" component={PageProject} />
      <Route path="/project-build-page" component={PageBuildProject} />
      <Route path="/list-projects/" component={ListProjects} />
    </Switch>
  </div>
);

export default App;
