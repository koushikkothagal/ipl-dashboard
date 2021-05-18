import { React } from 'react';
import { Link } from 'react-router-dom';

import "./MatchDetailCard.scss";

export const MatchDetailCard = ({teamName, match}) => {
    if (!match) return null;
    const otherTeam = match.team1 === teamName ? match.team2 : match.team1;
    const otherTeamRoute = `/teams/${otherTeam}`;
    const isMatchWon = teamName === match.matchWinner;
    
    const isMatchCancelled = match.matchWinner === "NA" ? true : false;
    var playerOfMatch = isMatchCancelled ? 'No decision' : match.playerOfMatch;
    var cardColor= isMatchWon? 'MatchDetailCard won-card' : 
                                isMatchCancelled ? 'MatchDetailCard cancelled-card' :
                                'MatchDetailCard lost-card';

    var matchResult = '';
    
    if(isMatchCancelled){
      matchResult = "Match Cancelled";
    } else{
      matchResult = match.matchWinner + ' won by ' + match.resultMargin + ' ' + match.result;
    }

    return (
        /*<div className={isMatchWon ? 'MatchDetailCard won-card' : 'MatchDetailCard lost-card'}> */
        <div className={cardColor}>
          <div>
          <span className="vs">vs</span>
          <h1><Link to={otherTeamRoute}>{otherTeam}</Link></h1>
          <h2 className="match-date">{match.date}</h2>
          <h3 className="match-venue">at {match.venue}</h3>
          <h3 className="match-result">{matchResult} </h3>
        </div>
        <div className="additional-detail">
          <h3>First Innings</h3>
          <p>{match.team1}</p>
          <h3>Second Innings</h3>
          <p>{match.team2}</p>
          <h3>Man of the match</h3>
          <p>{playerOfMatch}</p>
          <h3>Umpires</h3>
          <p>{match.umpire1}, {match.umpire2}</p>        
        </div>
        
        </div>
  );
}