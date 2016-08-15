import React, {Component} from 'react';
import {Panel } from 'react-bootstrap';
import {Doughnut} from 'react-chartjs-2';



class DoughnutChartComponent extends Component{
  constructor(props){
    super(props)
    this.state ={
      data: this.props.data
    }
  }

  render() {
    return (
        <Panel bsStyle="primary">
          <Doughnut data={this.state.data} />
        </Panel>
      )
  }
}

export default DoughnutChartComponent;
