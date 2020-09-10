import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { Home } from './pages';

function App() {
  return (
    <Router>
      <Switch>
          <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
