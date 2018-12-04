import * as React from 'react';
import { requireState } from '../libs/data';
import Cartogram from './cartogram';
import ParallelCoordinates from './parallel_coordinates';
import TitleBar from './title_bar';
import { UnemploymentDataAdapter } from './data_adapter';
import { ViolentCrimeDataAdapter } from './data_adapter';
import { MedianIncomeDataAdapter } from './data_adapter';
import { BirthRateDataAdapter } from './data_adapter';
import StackedBarChart from './stacked_bar_chart';

const STATE_AGGREGATE_DATA = new ViolentCrimeDataAdapter().stateAggregate();

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedYear: null,
      selectedStates: [],
      firstSelected: null,
    }
  }

  changeYear = selectedYear => {
    if(selectedYear == this.state.selectedYear) {

      this.setState({ selectedYear: null })
      if (!_.isEmpty(this.state.selectedStates)) {
        this.setState({ firstSelected: null });
      }
      return
    }
    if (!this.state.firstSelected) {
      this.setState({firstSelected: 'year'})
    }
    this.setState({ selectedYear })
  }

  changeState = selectedState => {
    if(selectedState == this.getState()) {
      if (!this.state.selectedYear) {
        this.setState({ firstSelected: null });
      }
      this.setState({ selectedStates: [] })
      return
    }
    if (_.isEmpty(this.state.selectedStates)) {
      this.setState({firstSelected: 'state'})
    }
    this.setState({ selectedStates: [selectedState] })
  }

  // For now we only allow a single selected state
  getState() {
    return this.state.selectedStates[0]
  }

  render() {
    const unemploymentData = new UnemploymentDataAdapter()
      .getData(this.getState(), this.state.selectedYear)

    const violentCrimeData = new ViolentCrimeDataAdapter()
      .getData(this.getState(), this.state.selectedYear)

    const medianIncomeData = new MedianIncomeDataAdapter()
      .getData(this.getState(), this.state.selectedYear)

    const birthData = new BirthRateDataAdapter()
      .getData(this.getState(), this.state.selectedYear)

    return (
      <div style={{margin: '60px auto', padding: '10px', width: "1600px" }}>
        <TitleBar />
        <div className="row">
          <div className="col-md-6">
            <div>
              <ParallelCoordinates
                data={
                  {
                    violentCrime: _.filter(violentCrimeData, d => d.StateID !== "UnitedStatesTotal"),
                    unemployment: unemploymentData,
                    medianIncome: medianIncomeData,
                    birthData
                  }
                }
                width={1500}
                height={600}
                firstSelected={this.state.firstSelected}
              />
            </div>
            <div style={{ marginTop: '10px' }}>
              <StackedBarChart data={violentCrimeData} selectedYear={this.state.selectedYear} selectedStates={this.state.selectedStates}/>
            </div>
          </div>
          <div className="col-md-6">
            <Cartogram
              data={STATE_AGGREGATE_DATA}
              scale={60}
              selectedYear={this.state.selectedYear}
              changeYear={this.changeYear}
              selectedState={this.getState()}
              changeState={this.changeState}
            />
          </div>
        </div>
      </div>
    );
  }
}
