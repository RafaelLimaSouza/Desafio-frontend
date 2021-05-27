import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Authenticate from "./pages/Authenticate";
import RecoveryUser from "./pages/RecoveryUser";
import CreateUser from "./pages/CreateUser";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={Authenticate} />
          <Route path="/recovery" exact={true} component={RecoveryUser} />
          <Route path="/createUser" exact={true} component={CreateUser} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
