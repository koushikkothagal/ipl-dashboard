import './App.scss';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import { TeamPage } from './pages/TeamPage';
import { MatchPage } from './pages/MatchPage';
import { HomePage } from './pages/HomePage';
import {NavBar} from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/teams/:teamName/matches/:year">
            <MatchPage />
          </Route>
          <Route path="/teams/:teamName">
            <TeamPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
