import { React } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import "./OverallStatusChart.scss";

export const OverallStatusChart = ({totalMatches, totalWins}) => {
    return(
        <div className="OverallStatusChart">
            Wins / Losses
            <div className="win-loss-section">
                <PieChart
                    data={[
                        { title: 'Losses', value: totalMatches - totalWins, color: '#a34d5d' },
                        { title: 'Wins', value: totalWins, color: '#4da375' },
                    ]}
                    />
            </div>
        </div>
    )
}