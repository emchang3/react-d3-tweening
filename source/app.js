import React from 'react';

import BarChart from './charts/barChart';
import PieChart from './charts/pieChart';
import NumbersChanger from './numbersChanger';
import LineChart from './charts/lineChart';

export const App = () => {

    const appStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }

    const middleStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }

    const innerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }

    return (
        <div style={appStyle}>
            <div style={middleStyle}>
                <div style={{ ...innerStyle, paddingRight: '80px' }}>
                    {/* <BarChart
                        id={'myBarChart'}
                        width={420}
                        barHeight={40}
                        dataSet={'chart1'}
                    /> */}
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
            {/* <div style={middleStyle}>
                <div style={innerStyle}>
                    <LineChart
                        id={'myLineChart'}
                        width={600}
                        height={300}
                        margin={{ top: 20, right: 140, bottom: 30, left: 50 }}
                        dataSet={
                            [ 'is_lf', 'is_sf', 'is_tf', 'is_ff', 'is_hf', 'is_t5p' ]
                        }
                    />
                </div>
            </div> */}
        </div>
    );
}
