import React from 'react';
import _ from 'lodash';
import { max, pie, arc, interpolateReds, scaleSequential } from 'd3';
import { requireState } from '../libs/data';

export default class YearSelector extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    const start = 1960;
    const end = 2014;
    let data = [];
    for (let year = start; year <= end; year++) {
      const yearData = requireState(`./by_year/${year}.csv`);
      data.push({..._.last(yearData), year});
    }
    data.push({year:0});
    this.pieFunc = pie()
      .value(() => 100 / (end - start))
      .sort((d1, d2) => d1.year - d2.year)
      .padAngle(.001);
    const radius = this.props.size / 2;
    this.arcFunc = arc()
      .outerRadius(radius)
      .innerRadius(radius - 30);

    this.setState({data});
  }

  render() {

    const pieData = this.pieFunc(this.state.data);

    const maxCrimeRate = max(this.state.data, d => d.ViolentCrimeRate);
    const minCrimeRate = 0;
    const color = scaleSequential(interpolateReds)
      .domain([minCrimeRate, maxCrimeRate]);

    const arcs = _.map(pieData, (d, index) => d.data.year==0?"": (
      <g key={`${index}_circle_arc`} onClick={() => this.props.changeYear(d.data.year)}>
        <path
          d={this.arcFunc(d)}
          fill={color(d.data.ViolentCrimeRate)}
          stroke={this.props.selectedYear === d.data.year ? 'blue': ''}
          strokeWidth="2"
        />
        <text
          style={{ fill: 'white', font: 'bold .7em sans-serif' }}
          transform={`translate(${this.arcFunc.centroid(d)})`}
          textAnchor="middle"
        >
          {d.data.year}
        </text>
      </g>
    ));

    const bottomTextStyle = {
      alignmentBaseline: "hanging"
    };

    const bottomRightTextStyle = {
      alignmentBaseline: "hanging",
      textAnchor: "end"
    };

    return (
      <React.Fragment>
        <g
          style={{cursor:'pointer'}}
          transform={`translate(${this.props.size / 2}, ${this.props.size / 2})`}>
          {arcs}
        </g>
        <text x={this.props.legendX} y={this.props.legendY} style={bottomTextStyle}>{minCrimeRate}</text>
        <text x={this.props.legendX+this.props.legendWidth} y={this.props.legendY} style={bottomRightTextStyle}>{maxCrimeRate}</text>
      </React.Fragment>
    )
  }
}
