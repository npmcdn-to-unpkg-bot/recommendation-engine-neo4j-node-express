// Application entrypoint.

// Load up the application styles
require('../styles/application.scss');

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home.jsx';
import Slider from 'react-viewport-slider';
import TokenAutocompleteInput from './TokenAutocompleteInput.jsx'
import PlotlyChartComponent from './PlotlyChartComponent.jsx'
import BarChartComponent from './BarChartComponent.jsx'
import GraphVisComponent from './GraphVisComponent.jsx'

// http://alpha.wallhaven.cc/wallpaper/164335
const wallpaper = 'http://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-164335.png';
var iframe = '<iframe src="http://localhost:3000/neo4jgraph.html" width="840" height="650" frameBorder="0"></iframe>';

class App extends React.Component {
  constructor(props){
        super(props);
        this.state = {
          searchBarText:'',
          TokenSelection: '',
          data : [
            // {
            //   type: 'scatter',  // all "scatter" attributes: https://plot.ly/javascript/reference/#scatter
            //   x: [1, 2, 3],     // more about "x": #scatter-x
            //   y: [6, 2, 3],     // #scatter-y
            //   marker: {         // marker is an object, valid marker keys: #scatter-marker
            //     color: 'rgb(16, 32, 77)' // more about "marker.color": #scatter-marker-color
            //   }
            // },
            {
              type: 'bar',      // all "bar" chart attributes: #bar
              x: [1],     // more about "x": #bar-x
              y: [6],     // #bar-y
              name: 'bar chart example' // #bar-name
            }
          ],
          layout : {                     // all "layout" attributes: #layout
            title: 'Salary Average',  // more about "layout.title": #layout-title
            xaxis: {                  // all "layout.xaxis" attributes: #layout-xaxis
              title: ''         // more about "layout.xaxis.title": #layout-xaxis-title
            },
            annotations: [            // all "annotation" attributes: #layout-annotations
              {
                text: 'simple annotation',    // #layout-annotations-text
                x: 0,                         // #layout-annotations-x
                xref: 'paper',                // #layout-annotations-xref
                y: 0,                         // #layout-annotations-y
                yref: 'paper'                 // #layout-annotations-yref
              }
            ]
          },
          config : {
            showLink: false,
            displayModeBar: true
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
        success:this.changePlotly  // function(data){debugger;}
     })
  }

  changePlotly= (data) => {
    this.setState({
      data : [
        // {
        //   type: 'scatter',  // all "scatter" attributes: https://plot.ly/javascript/reference/#scatter
        //   x: [1, 2, 3],     // more about "x": #scatter-x
        //   y: [6, 2, 3],     // #scatter-y
        //   marker: {         // marker is an object, valid marker keys: #scatter-marker
        //     color: 'rgb(16, 32, 77)' // more about "marker.color": #scatter-marker-color
        //   }
        // },
        {
          type: 'bar',      // all "bar" chart attributes: #bar
          x: [1],     // more about "x": #bar-x
          y: [data.data[0][0]],     // #bar-y
          name: 'bar chart example' // #bar-name
        }
      ],
      layout : {                     // all "layout" attributes: #layout
        title: 'Salary Average',  // more about "layout.title": #layout-title
        xaxis: {                  // all "layout.xaxis" attributes: #layout-xaxis
          title: data.data[0][1].data.name         // more about "layout.xaxis.title": #layout-xaxis-title
        }
      }
    });
  }


  render() {
    return (
      <Slider>
        <div itemStyle={{ backgroundColor: '#a2d7c7' }}>
          <Home />
        </div>
        <div itemStyle={{ backgroundColor: '#353330' }}>
          <span><TokenAutocompleteInput handleTokenSelection={this._handleTokenSelection} /></span>
        </div>
        <div itemClass="has-overlay" itemStyle={{ backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover' }}>
          <BarChartComponent />
        </div>
        <div itemClass="has-overlay" itemStyle={{ backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover' }}>
          <BarChartComponent />
        </div>
        <div itemStyle={{ color: '#333' }}>
          <GraphVisComponent iframe={iframe} />
          {/* <div className="content love">
            <i className="fa fa-heart"></i>
            <iframe src="http://ghbtns.com/github-btn.html?user=daviferreira&repo=react-viewport-slider&type=follow&count=true&size=large" allowTransparency="true" frameBorder="0" scrolling="0" width="auto" height="30" />
            <iframe src="http://ghbtns.com/github-btn.html?user=daviferreira&repo=react-viewport-slider&type=watch&count=true&size=large" allowTransparency="true" frameBorder="0" scrolling="0" width="auto" height="30" />
            <iframe src="http://ghbtns.com/github-btn.html?user=daviferreira&repo=react-viewport-slider&type=fork&count=true&size=large" allowTransparency="true" frameBorder="0" scrolling="0" width="auto" height="30" />
          </div> */}
        </div>
      </Slider>
    );
  }

}

ReactDOM.render(
  <App />,
  document.getElementById('react-root')
);
