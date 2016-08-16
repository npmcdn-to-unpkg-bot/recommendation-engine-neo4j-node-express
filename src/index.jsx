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
var iframe = '<iframe src="http://localhost:3000/neo4jgraph.html" width="800" height="420" frameBorder="0"></iframe>';


class App extends React.Component {
  constructor(props){
        super(props);
        this.state = {
          SkillNamesQuery: '',
          TokenSelection: '',
          SalaryJuniorSeniorIsVisible: false,
          chartHeight:250,
          chartWidth:250,
          SalaryJuniorSeniorData: {
            labels: ['Junior', 'Senior'],
            datasets: [{
                    label: "My First dataset",
                    backgroundColor: [
                        'rgba(173, 98, 206, 0.5)',
                        'rgba(48, 182, 175, 0.5)',
                    ],
                    borderColor: [
                        'rgba(173, 98, 206,1)',
                        'rgba(48, 182, 175, 1)',

                    ],
                    borderWidth: 1,
                    data: [25000, 59000]
                }]
          },
          JuniorSeniorRatio:{
            labels: [
                "Junior Dev",
                "Senior Dev"
            ],
            datasets: [
                {
                    data: [50, 50],
                    backgroundColor: [
                        "rgba(173, 98, 206,1)",
                        "rgba(48, 182, 175, 1)",
                    ],
                    hoverBackgroundColor: [
                        "rgba(173, 98, 206,1)",
                        "rgba(48, 182, 175, 1)",

                    ]
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
                labels: ["Average_Age", "Average_Exp", "Average_Ability", "Women_On_Team"],
                datasets: [
                    {
                        label: "Job",
                        backgroundColor: "rgba(173, 98, 206,0.2)",
                        borderColor: "rgba(173, 98, 206,1)",
                        pointBackgroundColor: "rgba(173, 98, 206,1)",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(173, 98, 206,1)",
                        data: [2.5, 10, 5, 3]
                    },
                    {
                        label: "Job",
                        backgroundColor: "rgba(48, 182, 175,0.2)",
                        borderColor: "rgba(48, 182, 175,1)",
                        pointBackgroundColor: "rgba(48, 182, 175,1)",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(48, 182, 175,1)",
                        data: [2.8, 7, 4, 2]
                    }
                ]
            }

      };
    }

  // handleTextInput = (searchTerms) => {
  //
  //   var skillNames = '';
  //
  // }

  _appear = (visible) => {
    this.setState({SalaryJuniorSeniorIsVisible: visible
    });

  }

  _handleTokenSelection = (searchTerms) => {
    //store context
    var self = this

    //creat query string
    var skillNames = ''
    for (var i = 0; i < searchTerms.length; i++) {
      skillNames = skillNames + 's.name = \''+searchTerms[i].name+'\' or ';
    }
    //update the state
    this.setState({SkillNamesQuery: skillNames  });

    //remove trailing or statement

    skillNames = skillNames.slice(0, -3)
    //set temp variables
    var salarydata = {}
    var developerCount = {}
    var jobData = []

    $.ajax("http://localhost:7474/db/data/cypher", {   //get salaries
        type: "POST",
        accepts: { json: "application/json" },
        dataType: "json",
        headers:{'X-Stream': true},
        contentType:"application/json",
        data: JSON.stringify({ query: 'match (d:Developer)-[knows]-(s:Skill) where '+skillNames+' and d.experience_midpoint < 2 return avg(d.salary_midpoint)as salary, count(d) as count order by salary desc'}),
     }).then(function (data){
       salarydata['JuniorSalary'] = data.data[0][0];
       developerCount['JuniorCount'] = data.data[0][1];

       return $.ajax("http://localhost:7474/db/data/cypher", {
         type: "POST",
         accepts: { json: "application/json" },
         dataType: "json",
         headers:{'X-Stream': true},
         contentType:"application/json",
         data: JSON.stringify({ query: 'match (d:Developer)-[knows]-(s:Skill) where '+skillNames+' and d.experience_midpoint > 2 return avg(d.salary_midpoint)as salary, count(d)  order by salary desc' }),
      });
    }).then(function (data) {
      salarydata['SeniorSalary'] = data.data[0][0]
      developerCount['SeniorCount'] = data.data[0][1];

      return $.ajax("http://localhost:7474/db/data/cypher", {
        type: "POST",
        accepts: { json: "application/json" },
        dataType: "json",
        headers:{'X-Stream': true},
        contentType:"application/json",
        data: JSON.stringify({ query: 'match (d:Developer)-[knows]->(s:Skill) match (d:Developer)-[has_a]->(j:Job) '+
                                      'where '+skillNames+' '+
                                      'return j.name as Job,avg(d.age_midpoint) as Average_Age, '+
                                      'avg(d.experience_midpoint) as Average_Exp, '+
                                      'avg(toFloat(d.programming_ability)) as Average_Ability, '+
                                      'avg(j.women_on_team) as Women_On_Team '+
                                      'order by Job '+
                                      'limit 5' }),
     });
   }).then(function (data) {
      jobData = data;
      self.changeSalaryData(salarydata);
      self.changeJuniorSeniorRatio(developerCount);
      self.changeJobInfoData(jobData);
    });
  }

  changeJobInfoData(data){
    debugger;
    this.setState({
      JobInfoData:{
        labels: ["Average_Age", "Average_Exp", "Average_Ability", "Women_On_Team"],
        datasets: [
            {
                label: data.data[0][0],
                backgroundColor: "rgba(173, 98, 206,0.2)",
                borderColor: "rgba(173, 98, 206,1)",
                pointBackgroundColor: "rgba(173, 98, 206,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(173, 98, 206,1)",
                data: [data.data[0][1]/10,//normalize age to make a better looking graph
                       data.data[0][2],
                       data.data[0][3],
                       data.data[0][4]
                     ]
            },
            {
                label: data.data[1][0],
                backgroundColor: "rgba(48, 182, 175,0.2)",
                borderColor: "rgba(48, 182, 175,1)",
                pointBackgroundColor: "rgba(48, 182, 175,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(48, 182, 175,1)",
                data: [data.data[1][1]/10,//normalize age to make a better looking graph
                       data.data[1][2],
                       data.data[1][3],
                       data.data[1][4]
                     ]
            },
            {
                label: data.data[2][0],
                backgroundColor: "rgba(244, 139, 58,0.2)",
                borderColor: "rgba(244, 139, 58,1)",
                pointBackgroundColor: "rgba(244, 139, 58,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(244, 139, 58,1)",
                data: [data.data[2][1]/10,//normalize age to make a better looking graph
                       data.data[2][2],
                       data.data[2][3],
                       data.data[2][4]
                     ]
            },
            {
                label: data.data[3][0],
                backgroundColor: "rgba(	67, 86, 192,0.2)",
                borderColor: "rgba(	67, 86, 192,1)",
                pointBackgroundColor: "rgba(	67, 86, 192,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(	67, 86, 192,1)",
                data: [data.data[3][1]/10,//normalize age to make a better looking graph
                       data.data[3][2],
                       data.data[3][3],
                       data.data[3][4]
                     ]
            },
            {
                label: data.data[4][0],
                backgroundColor: "rgba(	255, 108, 189,0.2)",
                borderColor: "rgba(	255, 108, 189,1)",
                pointBackgroundColor: "rgba(	255, 108, 189,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(	255, 108, 189,1)",
                data: [data.data[4][1]/10,//normalize age to make a better looking graph
                       data.data[4][2],
                       data.data[4][3],
                       data.data[4][4]
                     ]
            }
        ]
    }

    });
  }

  changeJuniorSeniorRatio(data){
    this.setState({
      JuniorSeniorRatio:{
        labels: [
            "Junior Dev",
            "Senior Dev"
        ],
        datasets: [
            {
                data: [data.JuniorCount, data.SeniorCount],
                backgroundColor: [
                    "rgba(173, 98, 206,1)",
                    "rgba(48, 182, 175, 1)",
                ],
                hoverBackgroundColor: [
                    "rgba(173, 98, 206,1)",
                    "rgba(48, 182, 175, 1)",

                ]
            }]
      }
    });
  }

  changeSalaryData = (data) => {
    this.setState({
      SalaryJuniorSeniorData: {
        labels: ['Junior', 'Senior'],
        datasets: [{
                label: "Salaries",
                backgroundColor: [
                    'rgba(173, 98, 206, 0.5)',
                    'rgba(48, 182, 175, 0.5)',
                ],
                borderColor: [
                    'rgba(173, 98, 206,1)',
                    'rgba(48, 182, 175, 1)',

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
        <div>
          <Hero />
          <div className="application" >
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-4 col-md-offset-4">
                  <div className="chart-wrapper">
                    <div className="chart-title">
                      <h3>Enter your skills</h3>
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
                <div className="col-sm-6">
                  <div className="chart-wrapper">
                    <div className="chart-title">
                      <h3>Jobs</h3>
                    </div>
                    <div className="chart-stage">
                      {/* <div id="grid-1-1"> */}
                      <RadarChartComponent data={this.state.JobInfoData}/>
                        {/*  */}
                      {/* </div> */}
                    </div>
                    <div className="chart-notes">
                      <h4>Notes about this chart</h4>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="chart-wrapper">
                    <div className="chart-title">
                      <h3>Explore the Data</h3>
                    </div>
                    <div className="chart-stage">
                      <GraphVisComponent iframe={iframe}/>
                    </div>
                    <div className="chart-notes">
                      <h4>Notes about this chart</h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-6 col-md-4">
                  <div className="chart-wrapper">
                    <div className="chart-title">
                      <h3>Industries</h3>
                    </div>
                    <div className="chart-stage">
                      <PolarChartComponent data={this.state.IndustryJobsCountData}/>
                    </div>
                    <div className="chart-notes">
                      <h4>Notes about this chart</h4>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-4">
                  <div className="chart-wrapper">
                    <div className="chart-title">
                      <h3>Average Salary for a Junior vs Senior Developer</h3>
                    </div>
                    <div className="chart-stage">
                      <BarChartComponent data={this.state.SalaryJuniorSeniorData}/>
                    </div>
                    <div className="chart-notes">
                      <h4>Notes about this chart</h4>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-4">
                  <div className="chart-wrapper">
                    <div className="chart-title">
                      <h3>JuniorSeniorRatio</h3>
                    </div>
                    <div className="chart-stage">
                      <DoughnutChartComponent data={this.state.JuniorSeniorRatio}/>

                      {/* <DoughnutChartComponent data={this.state.SeniorSkillsData}/> */}
                    </div>
                    <div className="chart-notes">
                      <h4>Notes about this chart</h4>
                    </div>
                  </div>
                </div>
          {/* <!-- end of three --> */}
                {/* <div className="col-sm-6 col-md-4">
                  <div className="chart-wrapper">
                    <div className="chart-title">
                      Cell Title
                    </div>
                    <div className="chart-stage">

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
                </div> */}
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
