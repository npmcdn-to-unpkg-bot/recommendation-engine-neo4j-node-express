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
import PolarChartComponent from './PolarChartComponent.jsx'
import RadarChartComponent from './RadarChartComponent.jsx'
import GraphVisComponent from './GraphVisComponent.jsx'
import Hero from './Hero.jsx'
import {Panel,Grid,Row,Col,PageHeader } from 'react-bootstrap';
import { SideNav, Nav } from 'react-sidenav';
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

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
              },
              IndustryJobsCountData:{
                  datasets: [{
                      data: [
                          11,
                          16,
                          7,
                          3,
                          14
                      ],
                      backgroundColor: [
                          "#FF6384",
                          "#4BC0C0",
                          "#FFCE56",
                          "#E7E9ED",
                          "#36A2EB"
                      ],
                      label: 'My dataset' // for legend
                  }],
                  labels: [
                      "Red",
                      "Green",
                      "Yellow",
                      "Grey",
                      "Blue"
                  ]
              },
              JobInfoData:{
                labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
                datasets: [
                    {
                        label: "My First dataset",
                        backgroundColor: "rgba(179,181,198,0.2)",
                        borderColor: "rgba(179,181,198,1)",
                        pointBackgroundColor: "rgba(179,181,198,1)",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(179,181,198,1)",
                        data: [65, 59, 90, 81, 56, 55, 40]
                    },
                    {
                        label: "My Second dataset",
                        backgroundColor: "rgba(255,99,132,0.2)",
                        borderColor: "rgba(255,99,132,1)",
                        pointBackgroundColor: "rgba(255,99,132,1)",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(255,99,132,1)",
                        data: [28, 48, 40, 19, 96, 27, 100]
                    }
                ]
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
              <PageHeader>Industries by job count <small>View of the job counts by industries</small></PageHeader>
    				</div>
    				<div class="col-md-8">
              <PolarChartComponent data={this.state.IndustryJobsCountData}/>
    				</div>
    			</div>
          <div class="row">
    				<div class="col-md-4">
              <PageHeader>Job Info <small>View of the job information for developers with those skills</small></PageHeader>
    				</div>
    				<div class="col-md-8">
              <RadarChartComponent data={this.state.JobInfoData}/>
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
