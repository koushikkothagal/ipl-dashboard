import "./App.scss";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import {TeamPage} from "./pages/TeamPage";
import {MatchPage} from "./pages/MatchPage";
import {HomePage} from "./pages/HomePage";
import Toolbar from "./components/Navigation/Toolbar/Toolbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Toolbar></Toolbar>
        <Switch>
          <Route exactly path="/teams/:teamName/matches/:year">
            <MatchPage />
          </Route>
          <Route exactly path="/teams/:teamName">
            <TeamPage />
          </Route>
          <Route exactly path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
