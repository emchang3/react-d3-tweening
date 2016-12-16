import React from 'react';

import BarChart from './charts/barChart';
import PieChart from './charts/pieChart';
import NumbersChanger from './numbersChanger';

export const App = () => {

    const appStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    const innerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }

    return (
        <div style={appStyle}>
            <div style={{ ...innerStyle, paddingRight: '80px' }}>
                <BarChart
                    id={'myBarChart'}
                    width={420}
                    barHeight={40}
                    dataSet={'chart1'}
                />
                <PieChart
                    id={'myPieChart'}
                    width={420}
                    height={420}
                    dataSet={'chart1'}
                />
            </div>
            <div style={{ ...innerStyle, width: '200px' }}>
                <h2>
                    Enter new numbers to see the charts change.
                </h2>
                <NumbersChanger dataSet={'chart1'} />
            </div>
        </div>
    )
}
