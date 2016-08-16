import React, {Component} from 'react';
import TokenAutocomplete from 'react-bootstrap-typeahead';

class TokenAutocompleteInput extends Component{
  constructor(props){
    super(props)
    this.state = {
      myData:[
       {name: 'Android'},
       {name: 'AngularJS'},
       {name: 'Arduino / Raspberry Pi'},
       {name: 'C'},
       {name: 'C#'},
       {name: 'C++'},
       {name: 'Cassandra'},
       {name: 'Clojure'},
       {name: 'Cloud (AWS, GAE, Azure, etc.)'},
       {name: 'CoffeeScript'},
       {name: 'Cordova'},
       {name: 'Dart'},
       {name: 'F#'},
       {name: 'Go'},
       {name: 'Hadoop'},
       {name: 'Haskell'},
       {name: 'iOS'},
       {name: 'Java'},
       {name: 'JavaScript'},
       {name: 'LAMP'},
       {name: 'MongoDB'},
       {name: 'MATLAB'},
       {name: 'Node.js'},
       {name: 'Objective-C'},
       {name: 'Perl'},
       {name: 'PHP'},
       {name: 'Python'},
       {name: 'R'},
       {name: 'ReactJS'},
       {name: 'Redis'},
       {name: 'Ruby'},
       {name: 'Rust'},
       {name: 'Salesforce'},
       {name: 'Scala'},
       {name: 'SharePoint'},
       {name: 'Spark'},
       {name: 'SQL'},
       {name: 'SQL Server'},
       {name: 'Swift'},
       {name: 'Visual Basic'},
       {name: 'Windows Phone'},
       {name: 'WordPress'}
      ]
    }
  }

  handleInputChange = (e) => {

      // this.props.handleTokenSelection(e)
  }
  handleChange = (e) => {

      this.props.handleTokenSelection(e)
  }

  render(){
     return (
       <TokenAutocomplete
        multiple
        labelKey="name"
        // onInputChange={(e) => this.handleChange(e)}
        onChange={(e) => this.handleChange(e)}
        options={this.state.myData}
       />
     );
  }
}


export default TokenAutocompleteInput;
