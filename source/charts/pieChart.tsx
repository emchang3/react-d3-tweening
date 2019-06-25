import * as React from 'react';
import { useContext, useState } from 'react';
import { arc, DefaultArcObject, pie } from 'd3';

import { RadialAction } from '../app';
import { DataContext, RadialContext, SliceContext, TargetsContext } from '../contexts';

import { colorScale } from '../util';

export interface PieChartProps {
    height: number;
    id: string;
    width: number;
}

export const PieChart: React.FunctionComponent<PieChartProps> = ({ id, height, width }) => {
    const data = useContext(DataContext);
    const radialStati = useContext(RadialContext);
    const targets = useContext(TargetsContext);
    const { currentSlice, setCurrentSlice } = useContext(SliceContext);

    const setFocus = (index: number) => setCurrentSlice(index);

    const resetFocus = () => setCurrentSlice(null);

    const radius = Math.min(width, height) / 4;

    const py = pie()
        .value(d => d as number)
        .sort(null);    

    const labelArc = arc()
        .outerRadius(radius - 32)
        .innerRadius(radius - 32);

    const myData = py(data);

    const groups = myData.map((dataPoint, index) => {
        const myColor = colorScale(
            dataPoint.data as number,
            [ 70, 130, 180 ],
            data,
            currentSlice,
            index
        );

        const opacity = (currentSlice !== null && currentSlice !== index) ? 0.7 : 1

        const textColor = currentSlice === index ? 'white' : 'black'

        let innerRadius = radius / 2;

        const outerRadius = radius * radialStati[index];

        const dp2: DefaultArcObject = { ...dataPoint, innerRadius, outerRadius };

        const pieArc = arc()
            .cornerRadius(3)
            .padAngle(0.0174533);

        return (
            <g
                key={`arc-${index}`}
                transform={`translate(${width / 2}, ${height / 2})`}
                opacity={opacity}
                onMouseOver={() => setFocus(index)}
                onMouseOut={resetFocus}
            >
                <path
                    d={pieArc(dp2)}
                    fill={myColor}
                />
                <text
                    transform={`translate(${labelArc.centroid(dp2)})`}
                    fill={textColor}
                >
                    {targets[index]}
                </text>
            </g>
        );
    });

    return (
        <div style={{ paddingBottom: '16px' }}>
            <svg
                id={id}
                className="arc"
                width={width}
                height={height}
            >
                {groups}
            </svg>
        </div>
    );
};
