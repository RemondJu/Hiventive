import React from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import HomePage from './components/Homepage';
import LayersDisplay from './containers/LayersDisplay';
import LayerInfos from './containers/LayerInfos';
import NavBarDefault from './containers/NavBarDefault';
import AddLayer from './containers/AddLayer';
import LoadingContent from './containers/LoadingContent';
import PageProject from './containers/PageProject';
import NewProjectModal from './containers/NewProjectModal';
import ModalLogin from './containers/ModalLogin';

const App = () => (
  <div className="App">
    <NavBarDefault />
    <LoadingContent />
    <ModalLogin />
    <NewProjectModal />
    <AddLayer />
    <div className="body_content_switch">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/ToolPage" component={LayersDisplay} />
        <Route path="/layerinfos/:id" component={LayerInfos} />
        <Route path="/project-page" component={PageProject} />
      </Switch>
    </div>
  </div>
);

export default App;
