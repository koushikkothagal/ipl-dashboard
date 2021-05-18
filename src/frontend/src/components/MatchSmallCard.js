import { React } from 'react';
import { Link } from 'react-router-dom';

import './MatchSmallCard.scss';

export const MatchSmallCard = ({match, teamName}) => {
    if (!match) return null;
    const otherTeam = match.team1 === teamName ? match.team2 : match.team1;
    const otherTeamRoute = `/teams/${otherTeam}`;
    const isMatchWon = teamName === match.matchWinner;

    const isMatchCancelled = match.matchWinner === "NA" ? true : false;
    var cardColor= isMatchWon? 'MatchSmallCard won-card' : 
                                isMatchCancelled ? 'MatchSmallCard cancelled-card' :
                                'MatchSmallCard lost-card';

    var matchResult = '';
    if(isMatchCancelled){
      matchResult = "Match Cancelled";
    } else{
      matchResult = match.matchWinner + ' won by ' + match.resultMargin + ' ' + match.result;
    }

    return (
        <div className={cardColor}>
            <span className="vs">vs</span>
            <h1><Link to={otherTeamRoute}>{otherTeam}</Link></h1>
            <p className="match-result"> {matchResult} </p>           
        </div>
    );
}