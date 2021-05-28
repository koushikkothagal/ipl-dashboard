import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';

import { YearSelector } from '../components/YearSelector';

import './MatchPage.scss';

export const MatchPage = () => {


    const [matches, setMatches] = useState([]);
    const { teamName, year } = useParams();
    const endYear = process.env.REACT_APP_DATA_END_YEAR;

    useEffect(
        () => {
         const fetchMatches = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/team/${teamName}/matches?year=${year}`);
            const data = await response.json();
            setMatches(data);
         };
         fetchMatches();
        }, [teamName, year]
    );

    if(year > endYear) {
        return (
            <div>
                <br />
                <br />
                <h1>{'No Data for year '}{year}{' !!'}</h1>
            </div>
        );
    } else {
        return (
            <div className="MatchPage">
                <div className="year-selector">
                    <h3> Select Year </h3>
                    <YearSelector teamName={teamName}/>
                </div>
                <div>
                    <h1 className="page-heading">{teamName} matches in {year}</h1>
                    { matches.length <= 0
                      ? <h1 className="team-info">{teamName}{" didn't played this year !!"}</h1>
                      : matches.map(match => <MatchDetailCard key={match.id} teamName={teamName} match={match}/>)
                    }
                </div>

            </div>
        );
    }
}