import { React } from 'react';
import { Link, useParams} from 'react-router-dom';

import './YearSelector.scss';

export const YearSelector = ({teamName}) => {
    
    const {year}=useParams()
    let years = [];
    const startYear = process.env.REACT_APP_DATA_START_YEAR;
    const endYear = process.env.REACT_APP_DATA_END_YEAR;

    for (let i = startYear; i <= endYear; i++ ) {
        years.push(i);
    }


    return (
        <ol className="YearSelector">
        { years.map(Year => (
            <li key={Year}>
                <Link to={`/teams/${teamName}/matches/${Year}`}>
                {year==Year ? <span style={{color : 'yellow'}}>{year}</span> : Year }
                </Link>
            </li>
        )) }
        </ol>
    )

}
