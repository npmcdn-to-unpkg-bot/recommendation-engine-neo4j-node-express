// modules
var csv = require('fast-csv');
var fs = require('fs');
var neo4j = require('neo4j');
var winston = require('winston');
var async = require('async');

// initailize module opbjects
var stream = fs.createReadStream('db/2016-Stack-Overflow-Survey-Responses-all-data-in-single-row.csv');
var db = new neo4j.GraphDatabase('http://localhost:7474');
skillRelations =[];
winston.add(
  winston.transports.File, {
    filename: './somefile.log',
    level: 'info',
    json: true,
    eol: 'rn', // for Windows, or `eol: ‘n’,` for *NIX OSs
    timestamp: true
  }
)
j =1; //recod of the row for logiing

//create csv stream with header names
 csv
  .fromStream(stream, {headers :
                          [
                            'responder',
                            'collector',
                            'country',
                            'un_subregion',
                            'so_region',
                            'age_range',
                            'age_midpoint',
                            'gender',
                            'self_identification_1',
                            'self_identification_2',
                            'self_identification_3',
                            'self_identification_4',
                            'self_identification_5',
                            'self_identification_6',
                            'self_identification_7',
                            'self_identification_8',
                            'self_identification_9',
                            'self_identification_10',
                            'self_identification_11',
                            'self_identification_12',
                            'occupation',
                            'occupation_group',
                            'experience_range',
                            'experience_midpoint',
                            'salary_range',
                            'salary_midpoint',
                            'big_mac_index',
                            'tech_do_1',
                            'tech_do_2',
                            'tech_do_3',
                            'tech_do_4',
                            'tech_do_5',
                            'tech_do_6',
                            'tech_do_7',
                            'tech_do_8',
                            'tech_do_9',
                            'tech_do_10',
                            'tech_do_11',
                            'tech_do_12',
                            'tech_do_13',
                            'tech_do_14',
                            'tech_do_15',
                            'tech_do_16',
                            'tech_do_17',
                            'tech_do_18',
                            'tech_do_19',
                            'tech_do_20',
                            'tech_do_21',
                            'tech_do_22',
                            'tech_do_23',
                            'tech_do_24',
                            'tech_do_25',
                            'tech_do_26',
                            'tech_do_27',
                            'tech_do_28',
                            'tech_do_29',
                            'tech_do_30',
                            'tech_do_31',
                            'tech_do_32',
                            'tech_do_33',
                            'tech_do_34',
                            'tech_do_35',
                            'tech_do_36',
                            'tech_do_37',
                            'tech_do_38',
                            'tech_do_39',
                            'tech_do_40',
                            'tech_do_41',
                            'tech_do_42',
                            'tech_want_1',
                            'tech_want_2',
                            'tech_want_3',
                            'tech_want_4',
                            'tech_want_5',
                            'tech_want_6',
                            'tech_want_7',
                            'tech_want_8',
                            'tech_want_9',
                            'tech_want_10',
                            'tech_want_11',
                            'tech_want_12',
                            'tech_want_13',
                            'tech_want_14',
                            'tech_want_15',
                            'tech_want_16',
                            'tech_want_17',
                            'tech_want_18',
                            'tech_want_19',
                            'tech_want_20',
                            'tech_want_21',
                            'tech_want_22',
                            'tech_want_23',
                            'tech_want_24',
                            'tech_want_25',
                            'tech_want_26',
                            'tech_want_27',
                            'tech_want_28',
                            'tech_want_29',
                            'tech_want_30',
                            'tech_want_31',
                            'tech_want_32',
                            'tech_want_33',
                            'tech_want_34',
                            'tech_want_35',
                            'tech_want_36',
                            'tech_want_37',
                            'tech_want_38',
                            'tech_want_39',
                            'tech_want_40',
                            'tech_want_41',
                            'tech_want_42',
                            'aliens',
                            'programming_ability',
                            'employment_status',
                            'industry',
                            'company_size_range',
                            'team_size_range',
                            'women_on_team',
                            'remote',
                            'job_satisfaction',
                            'job_discovery',
                            'dev_environment',
                            'commit_frequency',
                            'hobby',
                            'dogs_vs_cats',
                            'desktop_os',
                            'unit_testing',
                            'rep_range',
                            'visit_frequency',
                            'why_learn_new_tech',
                            'education',
                            'open_to_new_job',
                            'new_job_value',
                            'job_search_annoyance',
                            'interview_likelihood',
                            'how_to_improve_interview_process',
                            'star_wars_vs_star_trek',
                            'agree_tech',
                            'agree_notice',
                            'agree_problemsolving',
                            'agree_diversity',
                            'agree_adblocker',
                            'agree_alcohol',
                            'agree_loveboss',
                            'agree_nightcode',
                            'agree_legacy',
                            'agree_mars',
                            'important_variety',
                            'important_control',
                            'important_sameend',
                            'important_newtech',
                            'important_buildnew',
                            'important_buildexisting',
                            'important_promotion',
                            'important_companymission',
                            'important_wfh',
                            'important_ownoffice',
                            'developer_challenges',
                            'why_stack_overflow'
                          ]})
  .on('data', function(data){
      //start loop of the stream after the headers
      if (data.responder != 'responder'){
        console.log('Starting row ' + j);

        //create the parameter object for this responder
        var obj = {};
        obj[data.responder] = [{'knows':{}},{'wants_to_know':{}}];
        skillRelations.push(obj);

        //find all the skills that a responder has
        for (var i = 1; i < 43; i++) {
          if (data['tech_do_'+i]){
            skillRelations[skillRelations.length-1][data.responder][0].knows['skill'+i] = data['tech_do_'+i];
          }else{
            break;
          }
        }

        //find all the skills that a responder wants
        for (var i = 1; i < 43; i++) {
          if (data['tech_want_'+i]){
            skillRelations[skillRelations.length-1][data.responder][1].wants_to_know['skill'+i] = data['tech_want_'+i];
          }else{
            break;
          }
        }

      }
      j++;
  })
  .on('end', function(){
      console.log('csv parsed');

      for(responder in skillRelations){
        var knownSkills = responder[Object.keys(responder)][0].knows
        var desiredSkills = responder[Object.keys(responder)][0].wants_to_know

      }

      // function querydb(responderID,skillName,relationshipName,callback){
      //   debugger;
      //   db.cypher({
      //     //create query string
      //     query: 'MATCH (d:Developer) '+
      //            'MATCH (s:Skill) '+
      //            'where '+
      //            'd.responder = {responderID} and '+
      //            's.name = {skillName} '+ //remove left whitespace
      //            'CREATE (d)-[k:'+relationshipName+']->(s) '+
      //            'RETURN k',
      //     params: {
      //       responderID: responderID,
      //       skillName: skillName,
      //       },
      //     }, function (err,results) {
      //         if (err) throw(err)
      //         console.log(results);
      //         callback;
      //     });
      // }
      //
      // function createSkills(responderID,skillName,relationshipName, callback){
      //   querydb(responderID,skillName,relationshipName,callback);
      // }
      //
      // function createKnownSkills(responder, callback) {
      //   var knownSkills = responder[Object.keys(responder)][0].knows;
      //   var operations = knownSkills === undefined ? [] : Object.keys(knownSkills).map(function (skill) {
      //     return function (cb) {
      //       return createSkills(parseInt(Object.keys(responder)[0],10),knownSkills[skill],'knows',cb);
      //     };
      //   });
      //   async.series(operations,callback);
      //
      // }
      //
      // function createDesiredSkills(responder,callback) {
      //   var desiredSkills = responder[Object.keys(responder)][0].wants_to_know;
      //   var operations = desiredSkills === undefined ? [] : Object.keys(desiredSkills).map(function (skill) {
      //     return function (cb) {
      //       return createSkills(parseInt(Object.keys(responder)[0],10),desiredSkills[skill],'wants_to_know',cb);
      //     };
      //   });
      //   async.series(operations,callback);
      //
      //
      // }
      //
      // function createSkillsRelationships(responder,callback){
      //   //loop over known skills and write relationships
      //   async.series([
      //     function(cb){ return createKnownSkills(responder,cb)},
      //     function(cb){ return createDesiredSkills(responder,cb)}
      //   ],callback);
      //
      //   //loop over desired skills and write relationships
      //
      // }
      //
      // async.eachSeries(skillRelations, createSkillsRelationships, function (err,results) {
      //     if (err) {
      //       console.log(err);
      //       return;
      //     }
      //     console.log(results);
      // });



  });
