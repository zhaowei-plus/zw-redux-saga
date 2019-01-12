import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
// import { ConnectedRouter } from 'react-router-redux';
import Header from './containers/Header';

import Home from './components/Home/index.js';
import Topic from './components/Topic/index.js';


const RouterConfig = () => {
  return (
    <div>
      {/*<Route*/}
        {/*path="/"*/}
        {/*render={props => <ZcyLayout routerData={routerData} {...props} />}*/}
        {/*redirectPath="/exception/403"*/}
      {/*/>*/}


      <Header></Header>
      <Router>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/topic/:id" component={Topic} />
          <Redirect exact path="/" to="/home"/>
        </Switch>
      </Router>
    </div>
  );
}

export default RouterConfig;