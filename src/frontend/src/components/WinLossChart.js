import { React } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import "./WinLossChart.scss";

export const WinLossChart = ({totalMatches, totalWins}) => {
    return(
        <div className="WinLossChart">
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