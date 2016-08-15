USING PERIODIC COMMIT
LOAD CSV WITH HEADERS FROM 'file:/home/tobin/Projects/lighthouse/recommendation-engine/webserver-recommendation-engine/db/2016-Stack-Overflow-Survey-Responses-all-data-in-single-row.csv' AS line
CREATE (:Origin{
  OriginID: toInt(line.responder),
  country: line.country,
  un_subregion: line.un_subregion,
  so_region: line.so_region,
  big_mac_index: line.big_mac_index,
  collector: line.collector
}),
(:Developer {
  responder: toInt(line.responder),
  age_range: line.age_range,
  age_midpoint: toFloat(line.age_midpoint),
  gender: line.gender,
  experience_range: line.experience_range,
  experience_midpoint: toFloat(line.experience_midpoint),
  salary_range: line.salary_range,
  salary_midpoint: toFloat(line.salary_midpoint),
  programming_ability: line.programming_ability,
  employment_status: line.employment_status,
  remote: line.remote,
  dev_environment: line.dev_environment,
  desktop_os: line.desktop_os
}),
(:Job {
  JobID: toInt(line.responder),
  name: line.occupation,
  industry: line.industry,
  company_size_range: line.company_size_range,
  team_size_range: line.team_size_range,
  women_on_team: toFloat(line.women_on_team)
}),
(:Self_ID {
  title: 'Expert'
}),
(:Self_ID {
  title: 'Full Stack Overflow Developer'
}),
(:Self_ID {
  title: 'Full-stack Developer'
}),
(:Self_ID {
  title: 'Expert'
}),
(:Self_ID {
  title: 'Guru'
}),
(:Self_ID {
  title: 'Hacker'
}),
(:Self_ID {
  title: 'Manager'
}),
(:Self_ID {
  title: 'Ninja'
}),
(:Self_ID {
  title: 'Programmer'
}),
(:Self_ID {
  title: 'Rockstar'
}),
(:Self_ID {
  title: 'Sr. Developer'
}),
(:Skill {
  name: 'Android'
}),
(:Skill {
  name: 'AngularJS'
}),
(:Skill {
  name: 'Arduino / Raspberry Pi'
}),
(:Skill {
  name: 'C'
}),
(:Skill {
  name: 'C#'
}),
(:Skill {
  name: 'C++'
}),
(:Skill {
  name: 'Cassandra'
}),
(:Skill {
  name: 'Clojure'
}),
(:Skill {
  name: 'Cloud (AWS, GAE, Azure, etc.)'
}),
(:Skill {
  name: 'CoffeeScript'
}),
(:Skill {
  name: 'Cordova'
}),
(:Skill {
  name: 'Dart'
}),
(:Skill {
  name: 'F#'
}),
(:Skill {
  name: 'Go'
}),
(:Skill {
  name: 'Hadoop'
}),
(:Skill {
  name: 'Haskell'
}),
(:Skill {
  name: 'iOS'
}),
(:Skill {
  name: 'Java'
}),
(:Skill {
  name: 'JavaScript'
}),
(:Skill {
  name: 'LAMP'
}),
(:Skill {
  name: 'MongoDB'
}),
(:Skill {
  name: 'MATLAB'
}),
(:Skill {
  name: 'Node.js'
}),
(:Skill {
  name: 'Objective-C'
}),
(:Skill {
  name: 'Perl'
}),
(:Skill {
  name: 'PHP'
}),
(:Skill {
  name: 'Python'
}),
(:Skill {
  name: 'R'
}),
(:Skill {
  name: 'ReactJS'
}),
(:Skill {
  name: 'Redis'
}),
(:Skill {
  name: 'Ruby'
}),
(:Skill {
  name: 'Rust'
}),
(:Skill {
  name: 'Salesforce'
}),
(:Skill {
  name: 'Scala'
}),
(:Skill {
  name: 'SharePoint'
}),
(:Skill {
  name: 'Spark'
}),
(:Skill {
  name: 'SQL'
}),
(:Skill {
  name: 'SQL Server'
}),
(:Skill {
  name: 'Swift'
}),
(:Skill {
  name: 'Visual Basic'
}),
(:Skill {
  name: 'Windows Phone'
}),
(:Skill {
  name: 'WordPress'
});

CREATE INDEX ON :Developer(responder);
CREATE INDEX ON :Skill(name);
CREATE INDEX ON :Job(JobID);
CREATE INDEX ON :Origin(OriginID);
