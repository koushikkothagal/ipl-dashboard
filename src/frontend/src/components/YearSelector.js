import { React } from 'react';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';

import './YearSelector.scss';

export const YearSelector = ({ teamName, currentSelectedYear }) => {
    let years = [];
    const startYear = process.env.REACT_APP_DATA_START_YEAR;
    const endYear = process.env.REACT_APP_DATA_END_YEAR;

    for (let year = startYear; year <= endYear; year++) {
        years.push({
            value: year,
            label: year,
        });
    }

    const history = useHistory();
    const handleYearChange = (selectedYear) =>
        // We want to replace the current page in the stack, as we don't wanna save the history of
        // different years selected. This will result in going back to the team page when clicking
        // the back button in the browser.
        history.replace(`/teams/${teamName}/matches/${selectedYear}`)

    return (
        <Select className="YearSelector" options={years}
            defaultValue={{ label: currentSelectedYear, value: currentSelectedYear }}
            onChange={event => handleYearChange(event.value)} />
    )
}
