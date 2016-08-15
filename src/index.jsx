// Application entrypoint.

// Load up the application styles
require('../styles/application.scss');

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import TokenAutocompleteInput from './TokenAutocompleteInput.jsx'
import PlotlyChartComponent from './PlotlyChartComponent.jsx'
import BarChartComponent from './BarChartComponent.jsx'
import DoughnutChartComponent from './DoughnutChartComponent.jsx'
import GraphVisComponent from './GraphVisComponent.jsx'
import Hero from './Hero.jsx'
import {Panel,Grid,Row,Col,PageHeader } from 'react-bootstrap';
import { SideNav, Nav } from 'react-sidenav';

// http://alpha.wallhaven.cc/wallpaper/164335
const wallpaper = 'http://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-164335.png';


class App extends React.Component {
  constructor(props){
        super(props);
        this.state = {
          searchBarText:'',
          TokenSelection: '',
          SalaryJuniorSeniorData: {
            labels: ['Junior', 'Senior'],
            datasets: [{
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',

                    ],
                    borderWidth: 1,
                    data: [25000, 59000]
                }]
          },
          JuniorSkillsData:{
            labels: [
                "Html",
                "CSS",
                "Javascript"
            ],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }]
            },
            SeniorSkillsData:{
              labels: [
                  "Html",
                  "CSS",
                  "Javascript"
              ],
              datasets: [
                  {
                      data: [300, 50, 100],
                      backgroundColor: [
                          "#FF6384",
                          "#36A2EB",
                          "#FFCE56"
                      ],
                      hoverBackgroundColor: [
                          "#FF6384",
                          "#36A2EB",
                          "#FFCE56"
                      ]
                  }]
              }

      };
    }

  _handleTextInput = (text) => {
    this.setState({searchBarText: text,
    });

  }

  _handleTokenSelection = (text) => {
    $.ajax({
        type: "POST",
        url: "http://localhost:7474/db/data/cypher",
        accepts: { json: "application/json" },
        dataType: "json",
        headers:{'X-Stream': true},
        contentType:"application/json",
        data: JSON.stringify({ query: 'match (d:Developer)-[knows]-(s:Skill) where s.name = \''+text+'\' return avg(d.salary_midpoint)as salary,s order by salary desc' }),
        success:this.changeAppState  // function(data){debugger;}
     })
  }

  changeAppState = (data) => {
    this.setState({
      data : ''
    });
  }

  onSelection(selection) {
    this.setState({selected: selection.id});
    //or trigger a dispatch here
  }

  render() {
    var iframe = '<iframe src="http://localhost:3000/neo4jgraph.html" width="840" height="650" frameBorder="0"></iframe>';
    return (
      <div>
        <Hero />
        <div class='container-fluid'>
          <div class="row">
            <div class="col-md-12">
              <PageHeader>Example page header <small>Subtext for header</small></PageHeader>
            </div>
            <div class="col-md-12">
              <TokenAutocompleteInput />
            </div>
          </div>
    			<div class="row">
    				<div class="col-md-4">
              <PageHeader>Average Salary By Seniority <small>views of salaries for this skill</small></PageHeader>
    				</div>
    				<div class="col-md-8">
              <BarChartComponent data={this.state.SalaryJuniorSeniorData}/>
    				</div>
    			</div>
          <div class="row">
    				<div class="col-md-4">
              <PageHeader>Junior Skills Breakdown <small>View of the skills that a junior possesses</small></PageHeader>
    				</div>
    				<div class="col-md-8">
              <DoughnutChartComponent data={this.state.JuniorSkillsData}/>
    				</div>
    			</div>
          <div class="row">
    				<div class="col-md-4">
              <PageHeader>Senior Skills Breakdown <small>View of the skills that a senior possesses</small></PageHeader>
    				</div>
    				<div class="col-md-8">
              <DoughnutChartComponent data={this.state.SeniorSkillsData}/>
    				</div>
    			</div>
          <div class="row">
    				<div class="col-md-4">
              <PageHeader>Example page header <small>Subtext for header</small></PageHeader>
    				</div>
    				<div class="col-md-8">
              <GraphVisComponent iframe={iframe}/>
    				</div>
    			</div>
        </div>
      </div>

    );
  }

}

ReactDOM.render(
  <App />,
  document.getElementById('react-root')
);
