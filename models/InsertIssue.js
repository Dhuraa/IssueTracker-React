require('./db');
const Issue = require('./issues')

const tempIssues = [
    {Id: 1, Status: 'resolved', Owner: 'Person-A', Effort: 20, Create: new Date('2022-09-16'), Due: new Date('2022-08-20'), Title: 'Issue - 1'},
    {Id: 2, Status: 'assigned', Owner: 'Person-B', Effort: 5, Create: new Date('2022-09-19'), Due: new Date('2022-08-22'), Title: 'Issue - 2'}
  ];

Issue.insertMany(tempIssues)
    .then(function(data){
        console.log("Data", data)
})