import _ from 'lodash';


// TODO
// Open questions:
// [ ] Nothing selected, what should we show?
// All of the data

export class DataAdapter {

  constructor(data){ this.data = data}

  byState(stateID){
    return _.filter(this.data, d => { return d.StateID == stateID })
  }

  byYear(year){
    return _.filter(this.data, d => { return d.Year == year })
  }

  byStateAndYear(stateID, year){
    return _.intersection(this.byState(stateID), this.byYear(year))
  }

  getData(stateIdOpt, yearOpt){
    if(stateIdOpt && yearOpt) {
      return this.byStateAndYear(stateIdOpt, yearOpt)
    } else if(stateIdOpt) {
      return this.byState(stateIdOpt)
    } else if (yearOpt) {
      return this.byYear(yearOpt)
    } else {
      return this.data
    }
  }

  getMin(){
    return _.minBy(_.filter(this.data, d => d.StateID !== 'UnitedStatesTotal'), d => d[this.primaryKey()])[this.primaryKey()]
  }
  getMax(){
    return _.maxBy(_.filter(this.data, d => d.StateID !== 'UnitedStatesTotal'), d => d[this.primaryKey()])[this.primaryKey()]
  }
};



import unemployment from '../data/unemployment/data.csv';
export class UnemploymentDataAdapter extends DataAdapter{
  constructor(){
    super(unemployment)
  }

  primaryKey(){ return 'Unemployment'; }
}

import { requireState } from '../libs/data';

export class ViolentCrimeDataAdapter extends DataAdapter{

  constructor(){
    const data = requireState(`./aggregate_total/all.csv`);
    super(data)
  }

  stateAggregate(){
    const data = requireState(`./aggregate_total/totals.csv`);
    return data;
  }

  primaryKey(){ return 'ViolentCrimeRate'; }

}

import medianIncome from '../data/median-income/median_household_income_current_dollar.csv';
export class MedianIncomeDataAdapter extends DataAdapter{
  constructor(){
    super(medianIncome)
  }

  primaryKey(){ return 'Value'; }
}

import birthData from '../data/birth-rate/all.csv';
export class BirthRateDataAdapter extends DataAdapter{
  constructor(){

    const allStates = [
      "United States", "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]

    const all = _.flatMap(allStates, state => {

      return _.map(birthData, d => {
        return Object.assign({}, d, { StateID: state })
      })
    })

    super(all)
  }

  primaryKey(){ return 'TeenBirthRate'; }
}
