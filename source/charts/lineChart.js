import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as d3 from 'd3';

import { colorScale2 } from '../util';

class LineChart extends React.Component {
    constructor(props) {
        super(props);
    }

    genXScale = (props) => {
        return d3.scaleLinear()
            .domain([
                d3.min(props.data0, (d) => { return d.year; }), d3.max(props.data0, (d) => { return d.year; })
            ])
            .range([0, props.width - props.margin.right - props.margin.left ])
    }

    genYScale = (props) => {
        return d3.scaleLinear()
            .domain([
                0, d3.max(props.data4, (d) => { return d.share; })
            ])
            .range([props.height - props.margin.top - props.margin.bottom, 0])
    }

    componentDidMount = () => {
        // I hate this.

        const g = d3.select('#inner');

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", `translate(0, ${this.props.height - this.props.margin.bottom - this.props.margin.top})`)
            .call(d3.axisBottom(this.genXScale(this.props)).tickFormat(d3.format("d")))
            .append("text")
            .attr("fill", "#000")
            .attr("x", this.props.width - this.props.margin.right - 30)
            .attr("y", 5)
            .attr("dx", "0.71em")
            .style("text-anchor", "end")
            .text("Year");

        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(this.genYScale(this.props)))
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .style("text-anchor", "end")
            .text("Share (%)");
    }

    render() {
        const margin = { top: 20, right: 20, bottom: 30, left: 50 }

        const lineGen = d3.line()
            .x((d) => { return this.genXScale(this.props)(d.year); })
            .y((d) => { return this.genYScale(this.props)(d.share); });

        let groups = [];
        
        for (var i = 0; i < this.props.dataSet.length; i++) {

            // Manually creating text.
            let text = '';
            switch (i) {
                case 0:
                    text = 'Bottom Fifth';
                    break;
                case 1:
                    text = 'Second Fifth';
                    break;
                case 2:
                    text = 'Third Fifth'
                    break;
                case 3:
                    text = 'Fourth Fifth'
                    break;
                case 4:
                    text = 'Top Fifth'
                    break;
                default:
                    text = text;
                    break;
            }

            // The line itself.
            const line = lineGen(this.props[`data${i}`]);

            // point, color, max, focused, index
            const point = this.props[`data${i}`][0].share;
            const color = [ 70, 130, 180 ];
            const max = d3.max(this.props.data4, (d) => { return d.share; });

            const textLocX = this.props.width - this.props.margin.right - 40;
            const textLocY = this.genYScale(this.props)(point);

            // Stroke color.
            const stroke = colorScale2(point, color, max);

            groups.push(
                <g key={`g-line${i}`}>
                    <path d={line} className="line" stroke={stroke} />
                    <text x={textLocX} y={textLocY}>{text}</text>
                </g>
            );
        }

        return (
            <div style={{ paddingBottom: '16px' }}>
                <h3 style={{ paddingLeft: '50px' }}>Share of Income by Fifths</h3>
                <svg
                    id={this.props.id}
                    className="chart"
                    width={this.props.width}
                    height={this.props.height}
                >
                    <g id="inner" transform={`translate(${this.props.margin.left}, ${this.props.margin.top})`}>
                        {groups}
                    </g>
                </svg>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const props = {}

    for (var i = 0; i < ownProps.dataSet.length; i++) {
        props[`data${i}`] = state.data[`${ownProps.dataSet[i]}data`]
    }

    return props;
}

export default connect(mapStateToProps)(LineChart);
