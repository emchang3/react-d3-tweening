import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as d3 from 'd3';

import { colorScale } from '../util';

class PieChart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const radius = Math.min(this.props.width, this.props.height) / 2;

        const arc = d3.arc()
            .innerRadius(radius / 2)
            .outerRadius(radius)
            .cornerRadius(3)
            .padAngle(0.0174533);

        const pie = d3.pie()
            .value((d) => { return d; })
            .sort(null);

        const labelArc = d3.arc()
            .outerRadius(radius - 32)
            .innerRadius(radius - 32);

        const myData = pie(this.props.data);

        const groups = myData.map((dataPoint, index) => {
            const myColor = colorScale(dataPoint.data, [ 70, 130, 180 ], this.props.data)

            return (
                <g
                    key={`arc-${index}`}
                    transform={`translate(${this.props.width / 2}, ${this.props.height / 2})`}
                >
                    <path d={arc(dataPoint)}  fill={myColor} />
                    <text transform={`translate(${labelArc.centroid(dataPoint)})`}>
                        {dataPoint.data}
                    </text>
                </g>
            );
        });

        return (
            <div style={{ paddingBottom: '16px' }}>
                <svg
                    id={this.props.id}
                    className="arc"
                    width={this.props.width}
                    height={this.props.height}
                >
                    {groups}
                </svg>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        data: state.data[`${ownProps.dataSet}data`]
    }
}

export default connect(mapStateToProps)(PieChart);
