import { React, useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import queryString from 'query-string';

import { YearSelector } from '../components/YearSelector';

import './MatchPage.scss';

export const MatchPage = () => {
    const [matches, setMatches] = useState([]);
    const { teamName } = useParams();
    const { search } = useLocation();
    const queryParams = queryString.parse(search);

    useEffect(
        () => {
            const fetchMatches = async () => {
                const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/team/${teamName}/matches?year=${queryParams.year}`);
                const data = await response.json();
                setMatches(data);
            };
            fetchMatches();
        }, [teamName, queryParams.year]
    );

    return (
        <div className="MatchPage">
            <h1 className="page-heading">{teamName} matches in {queryParams.year}</h1>
            <div className="year-selector">
                <h3 className="select-year-label"> Select Year </h3>
                <YearSelector teamName={teamName} currentSelectedYear={queryParams.year} />
            </div>
            {
                matches.map(match => <MatchDetailCard key={match.id} teamName={teamName} match={match} />)
            }
        </div>
    );
}
