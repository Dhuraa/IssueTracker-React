import React from 'react';
import IssueFilter from './IssueFilter';
import AddIssue from './AddIssue';
import IssueTable from './IssueTable';


const IssueList = () => {
    // let temIssues = [
    //  {Id:1, Status:"Assigned", Owner:"Person-A", Effort:14, Create: new Date("2022-09-20"), Due: new Date("2022-09-23"), Title:"This is the First Issue"},
    //  {Id:2, Status:"Resolves", Owner:"Person-B", Effort:10, Create: new Date("2022-09-19"), Due: new Date("2022-09-24"), Title:"This is the Second Issue"},
    // ];
    const [allIssues, setAllIssues] = React.useState([]);
    let query = `
    query {
        issueList {
            Id
            Status
            Owner
            Effort
            Create 
            Due
            Title
        }
    }`;

    const refreshIssueList = () => {
        fetch('http://localhost:3001/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        }).then(async (response) => {
            let tempIssues = await response.json();
            let tempList = tempIssues.data.issueList;
            console.log(tempList);
            setAllIssues(tempList);
        })
    }

    //invokes callback function
    React.useEffect(function () {
        refreshIssueList();
    }, []);

    const AddSingleIssue = async (newIssues) => {
        // To add new Issue
        const status = newIssues.Status;
        const owner = newIssues.Owner;
        const effort = newIssues.Effort;
        const title = newIssues.Title;
        const query = `
        mutation {
            AddSingleIssue(Status: "${status}", Title: "${title}", Owner: "${owner}", Effort: ${effort}) {
              Id
              Status
              Owner
              Effort
              Title
            }
          }
        `;
        const response = await fetch('http://localhost:3001/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        }).then(async (response) => {
            if(response.status === 200){
                setTimeout(() => {
                    refreshIssueList();
                },500)
            }
            // let tempIssues = await response.json();
            // refreshIssueList();
            // if (tempIssues.errors && tempIssues.errors.length > 0) {
            //     alert(tempIssues.errors[0].message);
            // }
        });
    }

    return (
        <div id="child">
            <IssueFilter />
            <hr />
            <IssueTable allIssues={allIssues} />
            <hr />
            <AddIssue AddSingleIssue={AddSingleIssue} />
        </div>
    )
}

export default IssueList;