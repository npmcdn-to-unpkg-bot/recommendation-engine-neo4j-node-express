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
import JobFilterComponent from './JobFilterComponent.jsx'
import Hero from './Hero.jsx'
import {Panel,Grid,Row,Col,PageHeader,Form,FormGroup } from 'react-bootstrap';
import { SideNav, Nav } from 'react-sidenav';


// http://alpha.wallhaven.cc/wallpaper/164335
const wallpaper = 'http://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-164335.png';
var iframe = '<iframe src="http://localhost:3000/neo4jgraph.html" width="800" height="484" frameBorder="0"></iframe>';


class App extends React.Component {
  constructor(props){
        super(props);
        this.state = {
          SkillNamesQuery: '',
          TokenSelection: '',
          ActiveJobFilter: 'Jobs',
          SalaryJuniorSeniorIsVisible: false,
          chartHeight:250,
          chartWidth:250,
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
                    data: [0, 0]
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
              IndustriesBySalaries:{
                  datasets: [{
                      data: [
                          0,
                          0,
                          0,
                          0,
                          0
                      ],
                      backgroundColor: [
                        "rgba(173, 98, 206,1)",
                        "rgba(48, 182, 175,1)",
                        "rgba(244, 139, 58,1)",
                        "rgba(	67, 86, 192,1)",
                        "rgba(	255, 108, 189,1)"
                      ],
                      label: 'Industry Salaries' // for legend
                  }],
                  labels: [
                      "Industry",
                      "Industry",
                      "Industry",
                      "Industry",
                      "Industry"
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
                        data: [0, 0, 0, 0]
                    },
                    {
                        label: "Job",
                        backgroundColor: "rgba(48, 182, 175,0.2)",
                        borderColor: "rgba(48, 182, 175,1)",
                        pointBackgroundColor: "rgba(48, 182, 175,1)",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(48, 182, 175,1)",
                        data: [0, 0, 0, 0]
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

  _handleFilterSelected = (e) => {
    //store context
    var self = this

    //set the active filter
    this.setState({ActiveJobFilter: e
    });

    //remove trailing or statement
    var skillNames = this.state.SkillNamesQuery.slice(0, -3)

    //query only if there is a skill selected
    if (this.state.SkillNamesQuery){
      $.ajax("http://localhost:7474/db/data/cypher", {   //get salaries
          type: "POST",
          accepts: { json: "application/json" },
          dataType: "json",
          headers:{'X-Stream': true},
          contentType:"application/json",
          data: JSON.stringify({ query: 'match (d:Developer)-[knows]->(s:Skill) match (d:Developer)-[has_a]->(j:Job) '+
                                        'where '+skillNames+' '+
                                        'return j.name as Jobs,avg(d.age_midpoint) as Average_Age, '+
                                        'avg(d.experience_midpoint) as Average_Exp, '+
                                        'avg(toFloat(d.programming_ability)) as Average_Ability, '+
                                        'avg(j.women_on_team) as Women_On_Team '+
                                        'order by '+ e +
                                        ' limit 5' }),
       }).then(function (data){
         //update the jobs list
          self.changeJobInfoData(data);
       });
    }


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
    this.setState({
      SkillNamesQuery: skillNames,
      ActiveJobFilter: 'Jobs'
      });
      
    if(skillNames){
      //remove trailing or statement
      skillNames = skillNames.slice(0, -3)

      //set temp variables
      var salarydata = {}
      var developerCount = {}
      var jobData = []
      var industrySalaries = []


      $.ajax("http://localhost:7474/db/data/cypher", {   //get salaries and counts for Juniors
          type: "POST",
          accepts: { json: "application/json" },
          dataType: "json",
          headers:{'X-Stream': true},
          contentType:"application/json",
          data: JSON.stringify({ query: 'match (d:Developer)-[knows]-(s:Skill) where '+skillNames+' and d.experience_midpoint < 2 return avg(d.salary_midpoint)as salary, count(d) as count order by salary desc'}),
       }).then(function (data){
           //store results in temp variables
           salarydata['JuniorSalary'] = data.data[0][0];
           developerCount['JuniorCount'] = data.data[0][1];

           return $.ajax("http://localhost:7474/db/data/cypher", { //get salaries and counts for Seniors
             type: "POST",
             accepts: { json: "application/json" },
             dataType: "json",
             headers:{'X-Stream': true},
             contentType:"application/json",
             data: JSON.stringify({ query: 'match (d:Developer)-[knows]-(s:Skill) where '+skillNames+' and d.experience_midpoint > 4 return avg(d.salary_midpoint)as salary, count(d)  order by salary desc' }),
           });
       }).then(function (data) {
             //store results in temp variables
             salarydata['SeniorSalary'] = data.data[0][0]
             developerCount['SeniorCount'] = data.data[0][1];

            return $.ajax("http://localhost:7474/db/data/cypher", { //get salaries by industry
              type: "POST",
              accepts: { json: "application/json" },
              dataType: "json",
              headers:{'X-Stream': true},
              contentType:"application/json",
              data: JSON.stringify({ query: 'MATCH (j)-[:has_a]-(n)-[:knows]-(s) '+
                                            'WHERE EXISTS(n.salary_midpoint) and EXISTS(j.industry) and '+skillNames+' '+
                                            'RETURN avg(n.salary_midpoint) as avg_salary ,j.industry '+
                                            'Order by avg_salary desc '+
                                            'limit 5' }),
           });
       }).then(function (data) {
          //store results in temp variables
          industrySalaries = data;

             return $.ajax("http://localhost:7474/db/data/cypher", { //get jobs data from skills
                type: "POST",
                accepts: { json: "application/json" },
                dataType: "json",
                headers:{'X-Stream': true},
                contentType:"application/json",
                data: JSON.stringify({ query: 'match (d:Developer)-[knows]->(s:Skill) match (d:Developer)-[has_a]->(j:Job) '+
                                              'where '+skillNames+' '+
                                              'return j.name as Jobs,avg(d.age_midpoint) as Average_Age, '+
                                              'avg(d.experience_midpoint) as Average_Exp, '+
                                              'avg(toFloat(d.programming_ability)) as Average_Ability, '+
                                              'avg(j.women_on_team) as Women_On_Team '+
                                              'order by Jobs '+
                                              'limit 5' }),
             });
       }).then(function (data) {
          //store results in temp variables
          jobData = data;

          //update state
          self.changeSalaryData(salarydata);
          self.changeJuniorSeniorRatio(developerCount);
          self.changeJobInfoData(jobData);
          self.changeIndustrySalariesData(industrySalaries);

       });
    }
    else{
      self.resetInitialState();
    }
  }

  changeIndustrySalariesData(data){
    this.setState({
      IndustriesBySalaries:{
          datasets: [{
              data: [
                  Math.round(data.data[0][0]),
                  Math.round(data.data[1][0]),
                  Math.round(data.data[2][0]),
                  Math.round(data.data[3][0]),
                  Math.round(data.data[4][0])
              ],
              backgroundColor: [
                "rgba(173, 98, 206,1)",
                "rgba(48, 182, 175,1)",
                "rgba(244, 139, 58,1)",
                "rgba(	67, 86, 192,1)",
                "rgba(	255, 108, 189,1)"
              ],
              label: 'Industry Salaries' // for legend
          }],
          labels: [
              data.data[0][1],
              data.data[1][1],
              data.data[2][1],
              data.data[3][1],
              data.data[4][1]
          ]
      }
    });
  }

  changeJobInfoData(data){
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
                data: [Math.round(data.data[0][1] * 10) / 100,//normalize age to make a better looking graph
                       Math.round(data.data[0][2] * 10) / 10,
                       Math.round(data.data[0][3] * 10) / 10,
                       Math.round(data.data[0][4] * 10) / 10
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
                data: [Math.round(data.data[1][1] * 10) / 100,//normalize age to make a better looking graph
                       Math.round(data.data[1][2] * 10) / 10,
                       Math.round(data.data[1][3] * 10) / 10,
                       Math.round(data.data[1][4] * 10) / 10
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
                data: [Math.round(data.data[2][1] * 10) / 100,//normalize age to make a better looking graph
                       Math.round(data.data[2][2] * 10) / 10,
                       Math.round(data.data[2][3] * 10) / 10,
                       Math.round(data.data[2][4] * 10) / 10
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
                data: [Math.round(data.data[3][1] * 10) / 100,//normalize age to make a better looking graph
                       Math.round(data.data[3][2] * 10) / 10,
                       Math.round(data.data[3][3] * 10) / 10,
                       Math.round(data.data[3][4] * 10) / 10
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
                data: [Math.round(data.data[4][1] * 10) / 100,//normalize age to make a better looking graph
                       Math.round(data.data[4][2] * 10) / 10,
                       Math.round(data.data[4][3] * 10) / 10,
                       Math.round(data.data[4][4] * 10) / 10
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
                data: [Math.round(data.JuniorSalary), Math.round(data.SeniorSalary)]
            }]
      }
    });
  }

  resetInitialState(){
    this.state = {
      SkillNamesQuery: '',
      TokenSelection: '',
      ActiveJobFilter: 'Jobs',
      SalaryJuniorSeniorIsVisible: false,
      chartHeight:250,
      chartWidth:250,
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
                data: [0, 0]
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
          IndustriesBySalaries:{
              datasets: [{
                  data: [
                      0,
                      0,
                      0,
                      0,
                      0
                  ],
                  backgroundColor: [
                    "rgba(173, 98, 206,1)",
                    "rgba(48, 182, 175,1)",
                    "rgba(244, 139, 58,1)",
                    "rgba(	67, 86, 192,1)",
                    "rgba(	255, 108, 189,1)"
                  ],
                  label: 'Industry Salaries' // for legend
              }],
              labels: [
                  "Industry",
                  "Industry",
                  "Industry",
                  "Industry",
                  "Industry"
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
                    data: [0, 0, 0, 0]
                },
                {
                    label: "Job",
                    backgroundColor: "rgba(48, 182, 175,0.2)",
                    borderColor: "rgba(48, 182, 175,1)",
                    pointBackgroundColor: "rgba(48, 182, 175,1)",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgba(48, 182, 175,1)",
                    data: [0, 0, 0, 0]
                }
            ]
        }

      };
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
                    <div className="chart-title" >
                      <span >
                        <JobFilterComponent
                          activeButton={this.state.ActiveJobFilter}
                          handleButtonClick={this._handleFilterSelected}
                        />
                      </span>
                    </div>
                    <div className="chart-stage">
                      {/* <div id="grid-1-1"> */}
                      <RadarChartComponent data={this.state.JobInfoData}/>
                        {/*  */}
                      {/* </div> */}
                    </div>
                    <div className="chart-notes">
                      <h4>This radar chart describes Jobs reported by developers who know the selected skills. The filter measures four parameters,
                          the average age, experience and self decribed ability of the of the developers, as well as the number of women on their teams. </h4>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="chart-wrapper">
                    <div className="chart-title">
                      <h4>Explore the Data</h4>
                    </div>
                    <div className="chart-stage">
                      <GraphVisComponent iframe={iframe}/>
                    </div>
                    <div className="chart-notes">
                      <h4>This node graph displays a visualization of the relationships between Developers, Skills and Jobs  as reported by the responders to the survey.</h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-6 col-md-4">
                  <div className="chart-wrapper">
                    <div className="chart-title">
                      <h3>Industries By Salary</h3>
                    </div>
                    <div className="chart-stage">
                      <PolarChartComponent data={this.state.IndustriesBySalaries}/>
                    </div>
                    <div className="chart-notes">
                      <h4>This chart shows the top 5 Industries by salary of Developers with the skills selected.</h4>
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
                      <h4>This chart shows the average salary of all developers sorted into two groups. Juniors who have less than 2 years experience and Seniors who have more than 4 years of experience.</h4>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-4">
                  <div className="chart-wrapper">
                    <div className="chart-title">
                      <h3>Ratio of Junior to Senior Developers</h3>
                    </div>
                    <div className="chart-stage">
                      <DoughnutChartComponent data={this.state.JuniorSeniorRatio}/>

                      {/* <DoughnutChartComponent data={this.state.SeniorSkillsData}/> */}
                    </div>
                    <div className="chart-notes">
                      <h4>This chart shows the ratio of Junior to Senior developers. Juniors who have less than 2 years experience and Seniors who have more than 4 years of experience.</h4>
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
