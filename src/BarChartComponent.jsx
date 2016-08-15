import React, {Component} from 'react';
import {Panel } from 'react-bootstrap';
var BarChart = require('react-chartjs-2').Bar;

class BarChartComponent extends Component{
  constructor(props){
    super(props)
    this.state ={
      chartData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
                label: 'My First dataset',
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
                data: [65, 59, 80, 81, 56, 55, 40]
            }]
      }

    }
  }

  render() {
    const title = (
      <h3>Panel title</h3>
    );
    return (
        <Panel header={title} bsStyle="primary">
          <BarChart data={this.state.chartData} />
        </Panel>
      )
  }
}

export default BarChartComponent;
