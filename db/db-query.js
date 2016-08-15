'use strict'

//modules needed
var neo4j = require('neo4j');

//create objects
var db = new neo4j.GraphDatabase('http://localhost:7474');

function avgSalaryBySkill() {
    db.cypher({
      query: 'match (d:Developer)-[knows]-(s:Skill) return avg(d.salary_midpoint)as salary,s order by salary desc'
    },function (err, results) {
        if (err)
          throw err;
        return (JSON.stringify(results));
        }
    );

}
// avgSalaryBySkill()
