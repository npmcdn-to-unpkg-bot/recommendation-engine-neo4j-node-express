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
import {Panel,Grid,Row,Col,PageHeader,Form,FormGroup } from 'react-bootstrap';
import { SideNav, Nav } from 'react-sidenav';


// http://alpha.wallhaven.cc/wallpaper/164335
const wallpaper = 'http://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-164335.png';
var iframe = '<iframe src="http://localhost:3000/neo4jgraph.html" width="1200" height="400" frameBorder="0"></iframe>';


class App extends React.Component {
  constructor(props){
        super(props);
        this.state = {
          searchBarText:'',
          TokenSelection: '',
          SalaryJuniorSeniorIsVisible: false,
          chartHeight:250,
          chartWidth:250,
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

  _appear = (visible) => {
    this.setState({SalaryJuniorSeniorIsVisible: visible
    });

  }

  _handleTokenSelection = (text) => {

    //get salaries
    var salarydata = {}
    var self = this
    $.ajax({
        type: "POST",
        url: "http://localhost:7474/db/data/cypher",
        accepts: { json: "application/json" },
        dataType: "json",
        headers:{'X-Stream': true},
        contentType:"application/json",
        data: JSON.stringify({ query: 'match (d:Developer)-[knows]-(s:Skill) where s.name = \''+text+'\' and d.experience_midpoint < 2 return avg(d.salary_midpoint)as salary order by salary desc' }),
        success: function(data){
          salarydata['JuniorSalary'] = data.data[0][0]
        }
     }).then($.ajax({
         type: "POST",
         url: "http://localhost:7474/db/data/cypher",
         accepts: { json: "application/json" },
         dataType: "json",
         headers:{'X-Stream': true},
         contentType:"application/json",
         data: JSON.stringify({ query: 'match (d:Developer)-[knows]-(s:Skill) where s.name = \''+text+'\' and d.experience_midpoint > 2 return avg(d.salary_midpoint)as salary order by salary desc' }),
         success: function(data){
           salarydata['SeniorSalary'] = data.data[0][0]
           self.changeAppState(salarydata)
         }
      }));


  }

  changeAppState = (data) => {
    debugger;
    this.setState({
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
                data: [data.JuniorSalary, data.SeniorSalary]
            }]
      }
    });
  }

  onSelection(selection) {
    this.setState({selected: selection.id});
    //or trigger a dispatch here
  }

  render() {

    return (
        <div className="application">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-8">
                <Hero />
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4 col-md-offset-4">
                <div className="chart-wrapper">
                  <div className="chart-title">
                    Enter your skills
                  </div>
                  <div className="chart-stage">
                    <div classname= "col-lg-1 col-centered">
                          <TokenAutocompleteInput handleTokenSelection={this._handleTokenSelection}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid">

            <div className="row">
              <div className="col-sm-8">
                <div className="chart-wrapper">
                  <div className="chart-title">
                    Graph
                  </div>
                  <div className="chart-stage">
                    <div id="grid-1-1">
                      <GraphVisComponent iframe={iframe}/>
                    </div>
                  </div>
                  <div className="chart-notes">
                    Notes about this chart
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="chart-wrapper">
                  <div className="chart-title">
                    Cell Title
                  </div>
                  <div className="chart-stage">
                    <RadarChartComponent data={this.state.JobInfoData}/>
                  </div>
                  <div className="chart-notes">
                    Notes about this chart
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6 col-md-4">
                <div className="chart-wrapper">
                  <div className="chart-title">
                    Cell Title
                  </div>
                  <div className="chart-stage">
                    <BarChartComponent data={this.state.SalaryJuniorSeniorData}/>
                  </div>
                  <div className="chart-notes">
                    Notes about this chart
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="chart-wrapper">
                  <div className="chart-title">
                    Cell Title
                  </div>
                  <div className="chart-stage">
                    <DoughnutChartComponent data={this.state.JuniorSkillsData}/>
                  </div>
                  <div className="chart-notes">
                    Notes about this chart
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="chart-wrapper">
                  <div className="chart-title">
                    Cell Title
                  </div>
                  <div className="chart-stage">
                    <DoughnutChartComponent data={this.state.SeniorSkillsData}/>
                  </div>
                  <div className="chart-notes">
                    Notes about this chart
                  </div>
                </div>
              </div>
        {/* <!-- end of three --> */}
              <div className="col-sm-6 col-md-4">
                <div className="chart-wrapper">
                  <div className="chart-title">
                    Cell Title
                  </div>
                  <div className="chart-stage">
                    <PolarChartComponent data={this.state.IndustryJobsCountData}/>
                  </div>
                  <div className="chart-notes">
                    Notes about this chart
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="chart-wrapper">
                  <div className="chart-title">
                    Cell Title
                  </div>
                  <div className="chart-stage">
                    <RadarChartComponent data={this.state.JobInfoData}/>
                  </div>
                  <div className="chart-notes">
                    Notes about this chart
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="chart-wrapper">
                  <div className="chart-title">
                    Cell Title
                  </div>
                  <div className="chart-stage">
                    <RadarChartComponent data={this.state.JobInfoData}/>
                  </div>
                  <div className="chart-notes">
                    Notes about this chart
                  </div>
                </div>
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
