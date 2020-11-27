import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Components/DashBoard";
import Home from "./Components/Home.js";
function App() {
  return (
    <Switch>
      <Route path='/c433a5ba5614981b330820' component={Dashboard} />
      <Route path='/' component={Home} />
    </Switch>
  );
}

export default App;
