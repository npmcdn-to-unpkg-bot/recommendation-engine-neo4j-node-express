import React, {Component} from 'react';
import {Panel } from 'react-bootstrap';
var BarChart = require('react-chartjs-2').Bar;

var options = {
    scales: {
        yAxes: [{
            display: true,
            ticks: {
                suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                // OR //
                beginAtZero: true   // minimum value will be 0.
            }
        }]
    }
};

class BarChartComponent extends Component{
  constructor(props){
    super(props)
    this.state ={
      data: this.props.data,
      height: this.props.height,
      width: this.props.width
    }
  }

  render() {
    const title = (
      <h3>Panel title</h3>
    );
    return (

          <BarChart data={this.state.data} height={this.state.height} width={this.state.width} options={options}/>
        
      )
  }
}

export default BarChartComponent;
