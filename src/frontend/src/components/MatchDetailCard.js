import { React } from 'react';
import { Link } from 'react-router-dom';

import "./MatchDetailCard.scss";

export const MatchDetailCard = ({teamName, match}) => {
    if (!match) return null;
    const otherTeam = match.team1 === teamName ? match.team2 : match.team1;
    const otherTeamRoute = `/teams/${otherTeam}`;
    const isMatchWon = teamName === match.matchWinner;
    const isTie = match.result === 'tie' ? true : false;
    var cardColour = isTie ? 'MatchDetailCard tie-card' : isMatchWon ? 'MatchDetailCard won-card' : 'MatchDetailCard lost-card';
    var matchResult = "";
    if(isTie) {
        matchResult = "There was a tie between " + match.team1 + " and " + match.team2;   
    } else {
        matchResult = match.matchWinner + " won by " + match.resultMargin + " " + match.result;
    }
    return (
        <div className={cardColour}>
          <div>
          <span className="vs">vs</span>
          <h1><Link to={otherTeamRoute}>{otherTeam}</Link></h1>
          <h2 className="match-date">{match.date}</h2>
          <h3 className="match-venue">at {match.venue}</h3>
          <h3 className="match-result"> {matchResult} </h3>
        </div>
        <div className="additional-detail">
          <h3>First Innings</h3>
          <p>{match.team1}</p>
          <h3>Second Innings</h3>
          <p>{match.team2}</p>
          <h3>Man of the match</h3>
          <p>{match.playerOfMatch}</p>
          <h3>Umpires</h3>
          <p>{match.umpire1}, {match.umpire2}</p>
          

        </div>
        
        </div>
  );
}