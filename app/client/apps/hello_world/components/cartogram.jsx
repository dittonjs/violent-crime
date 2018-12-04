import * as React from 'react';
import _ from 'lodash';
import { max, scaleLinear, scaleQuantile, scaleSequential, interpolateReds } from 'd3';
import stateGrid from '../data/state_grid_json';
import State from './state';
import YearSelector from './year_selector';
import GradientLegend from './gradient_legend';

export default class Cartogram extends React.Component {

  render() {
    const { data } = this.props;
    const filteredData = _.filter(data, d => d.StateID !== 'UnitedStatesTotal' && d.StateID !== 'DC');

    const mergedData = _.map(filteredData, (d) => {
      const stateData = _.find(stateGrid, s => s.Abbreviation === d.StateID);
      return { ...d, Space: stateData.Space, Row: stateData.Row, Abbreviation: stateData.Abbreviation };
    });

    const maxColumns = max(stateGrid, d => +d.Space) + 1;
    const maxRows = max(stateGrid, d => +d.Row) + 1;
    const stateScale = this.props.scale * .75;
    const innerSvgWidth = stateScale * maxColumns;
    const innerSvgHeight = stateScale * maxRows;
    const outerSvgSize = this.props.scale * maxColumns;

    const columnScale = scaleLinear()
      .domain([0, maxColumns])
      .range([0, innerSvgWidth]);

    const rowScale = scaleLinear()
      .domain([0, maxRows])
      .range([0, innerSvgHeight]);

    const maxCrimeRate = max(mergedData, d => d.ViolentCrimeRate);
    const minCrimeRate = 0;
    const color = scaleSequential(interpolateReds)
      .domain([minCrimeRate, maxCrimeRate]);

    const states = mergedData.map(d => (
      <State
        key={d.Abbreviation}
        data={d}
        scale={stateScale}
        x={columnScale(d.Space)}
        y={rowScale(d.Row)}
        fill={color(d.ViolentCrimeRate)}
        selected={this.props.selectedState == d.Abbreviation}
        changeState={this.props.changeState}
      />
    ));

    const legendWidth = 300;
    const legendHeight = 40;

    const legend = (
      <GradientLegend
        key='cartogram_legend'
        scale={color}
        min={minCrimeRate}
        max={maxCrimeRate}
        width={legendWidth}
        height={legendHeight}
      />
    );

    const topOfCartogram = (outerSvgSize - innerSvgHeight) / 2;
    const bottomOfCartogram = topOfCartogram + innerSvgHeight;
    const leftOfCartogram = (outerSvgSize - innerSvgWidth) / 2;
    const topOfLegend = bottomOfCartogram + legendHeight;
    const leftOfLegend = leftOfCartogram + ((innerSvgWidth - legendWidth) / 2);

    return (
      <div className="paper" style={{ textAlign: 'center', padding: '10px 0px' }}>
        <svg height={outerSvgSize} width={outerSvgSize}>
          <svg y={topOfCartogram} x={leftOfCartogram} width={innerSvgWidth} height={innerSvgHeight}>
            { states }
          </svg>
          <svg y={topOfLegend} x={leftOfLegend} width={legendWidth} height={legendHeight}>
            { legend }
          </svg>
          <YearSelector size={outerSvgSize} changeYear={this.props.changeYear} selectedYear={this.props.selectedYear} legendY={topOfLegend+(legendHeight*0.25)+(legendHeight*0.75/2)} legendX={leftOfLegend} legendWidth={legendWidth}/>
        </svg>
      </div>
    );
  }
}
