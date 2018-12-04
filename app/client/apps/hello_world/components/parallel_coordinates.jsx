import * as React from 'react';
import _ from 'lodash';
import assets from '../libs/assets';
import { max, scaleLinear, scaleQuantile, scaleSequential, interpolateReds, interpolateBlues } from 'd3';
const CATEGORIES = [
  {propKey: 'violentCrime', dataKey: 'ViolentCrimeRate', label: 'Violent Crime Rate'},
  {propKey: 'unemployment', dataKey: 'Unemployment', label: 'Unemployment Rate'},
  {propKey: 'medianIncome', dataKey: 'Value', label: 'Median Household Income'},
  {propKey: 'birthData', dataKey: 'TeenBirthRate', label: 'Birth Rate Per 1000 Age 15-19'}
];

export default class ParallelCoordinates extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      // We get data as props, but the ordering of the data that we are
      // given is state owned by the parallel coordinate chart dimensions: _.keys(props.data)
    }

    this.exploring = {};
    this.exploreCount = 0;
    this.exploreChart = false;
    this.brushed = [];
  }

  get data() {
    const dataArrays = _.map(CATEGORIES, cat => this.props.data[cat.propKey] )
    const zippedData = _.zip(..._.map(CATEGORIES, cat => this.props.data[cat.propKey] ));

    const groups = _.groupBy(dataArrays.flatten(), d => `${d.StateID}-${d.Year}`)
    const mergedData = _.map(groups, data => _.merge({}, ...data));

    const rawDisplayData = _.map(mergedData, data => {
      const displayObj = {}
      _.each(
        CATEGORIES,
        category => {
          const d = data[category.dataKey] 
          if(d) { displayObj[category.label] = d }         
        }
      )
      return displayObj;
    })
    
    const displayData = _.filter(rawDisplayData, d => {
      return _.keys(d).length == CATEGORIES.length
    })
    
    const maxCrimeRate = max(mergedData, d => d.ViolentCrimeRate);
    const minCrimeRate = 0;
    this.badColor = scaleSequential(interpolateReds)
      .domain([200, maxCrimeRate]);

    this.goodColor = scaleSequential(interpolateBlues)
      .domain([200, 0]);
    return displayData
  }

  createChart(){
    document.getElementById('parcoords').innerHTML = "";

    this.pcoords = d3.parcoords()("#parcoords");

    this.pcoords
      .data(this.data)
      .composite("darker")
      .color(d => {
        if (!_.isEmpty(this.brushed) && !_.includes(this.brushed, d)) {
          return "#000"
        }
        return d["Violent Crime Rate"] > 200 ? this.badColor(d["Violent Crime Rate"]) : this.goodColor(d["Violent Crime Rate"])
      })
      .margin({ top: 60, left: 5, bottom: 12, right: 0 })
      .render()
      .reorderable()
      .brushMode("1D-axes")
      .on('brush', d => this.brushed = d)

    this.pcoords.svg
      .selectAll(".dimension")
      .style("cursor", "pointer")
  }

  updateChart() {
    this.pcoords.data(this.data).render().createAxes().updateAxes();
  }

  componentDidMount(){
    this.createChart()
  }

  componentDidUpdate() {
    this.createChart()
  }

  render() {
    return (
      <div id="parcoords" style={{height: '360px'}} className="parcoords paper"/>
    );
  }
}
