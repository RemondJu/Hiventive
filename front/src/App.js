import React from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import HomePage from './components/homePage/Homepage';
import LayersDisplay from './containers/LayersDisplay';
import LayerInfos from './components/toolPage/LayerInfos';
import NavBarDefault from './containers/NavBarDefault';
import AddLayer from './containers/AddLayer';
import LoadingContent from './containers/LoadingContent';
import PageProject from './containers/PageProject';
import PageBuildProject from './containers/PageBuildProject';
import NewProjectModal from './containers/NewProjectModal';
import ModalLogin from './components/ModalLogin';

const App = () => (
  <div className="App">
    <NavBarDefault />
    <LoadingContent />
    <ModalLogin />
    <NewProjectModal />
    <AddLayer />
    <Switch>
      <div className="body_content_switch">
        <Route exact path="/" component={HomePage} />
        <Route path="/ToolPage" component={LayersDisplay} />
        <Route path="/layerinfos/:id" component={LayerInfos} />
        <Route path="/project-page" component={PageProject} />
        <Route path="/project-build-page" component={PageBuildProject} />
      </div>
    </Switch>
  </div>
);

export default App;
