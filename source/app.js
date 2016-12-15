import React from 'react';

import BarChart from './chart';
import PieChart from './chart2';
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
            <div style={innerStyle}>
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
            <NumbersChanger dataSet={'chart1'} />
        </div>
    )
}
