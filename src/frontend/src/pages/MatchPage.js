import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';


export const MatchPage = () => {


    const [matches, setMatches] = useState([]);
    const { teamName, year } = useParams();
    useEffect(
        () => {
         const fetchMatches = async () => {
            const response = await fetch(`http://localhost:8080/team/${teamName}/matches?year=${year}`);
            const data = await response.json();
            setMatches(data);

         };
         fetchMatches();
            


        }, []
    );

   
    return (
        <div className="MatchPage">
            <h1>Match Page</h1>
            {
                matches.map(match => <MatchDetailCard teamName={teamName} match={match} />)
            }

        </div>
    );
}