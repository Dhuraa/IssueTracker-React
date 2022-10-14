//const { response } = require("express")

const IssueRow = (props) => {
    return (
        <tr>
            <td>{props.Id}</td>
            <td>{props.Status}</td>
            <td>{props.Owner}</td>
            <td>{props.Effort}</td>
            <td>{props.Create.toString()}</td>
            <td>{props.Due.toString()}</td>
            <td>{props.Title}</td>
        </tr>
    )
}

const IssueTable = ({ allIssues }) => {
    const rowStyle = { "border": "1px solid" }

    console.log("v",allIssues);

    const AllIssueRow = allIssues.map(issue => (
        <IssueRow key={issue.Id} Id={issue.Id} Title={issue.Title} Status={issue.Status} Owner={issue.Owner} Effort={issue.Effort} Create={issue.Create} Due={issue.Due} />
    ))

    return (
        <div>
            <h2>IssueTable</h2>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Status</th>
                        <th>Owner</th>
                        <th>Effort</th>
                        <th>Create</th>
                        <th>Due</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {AllIssueRow}
                </tbody>
            </table>
        </div>
    )
}

const IssueFilter = () => {
    return (
        <h2>IssueFilter</h2>
    )
}

const AddIssue = ({ AddSingleIssue }) => {

    const [errorMessage,setErrorMessage] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = document.forms.addIssue;
        let newIssues = {
            Status: form.Status.value,
            Owner: form.Owner.value,
            Effort: form.Effort.value,
            Title: form.Title.value,
        }
        if(form.Owner.value.length < 3)
        {
            setErrorMessage("Owner's name can't be less than 3 characters")
        }
        else{
            AddSingleIssue(newIssues);
        }
 
        //document.forms.addIssue.reset();
    }

    return (
        <div>
            <h2>AddIssue</h2>
            <form name="addIssue" onSubmit={handleSubmit}>
                <input type="text" name="Status" placeholder="Status" />
                <input type="text" name="Owner" placeholder="Owner" />
                <input type="number" name="Effort" placeholder="Effort" />
                <input type="text" name="Title" placeholder="Title" />
                <button type="submit">Submit</button>
            </form>
            <h3 style={{"color":"Red"}}>{errorMessage}</h3>
        </div>
    )
}


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
        fetch('/graphql', {
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

    const AddSingleIssue = (newIssues) => {
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
        fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        }).then(async (response) => {
            let tempIssues = await response.json();
            refreshIssueList();
            if (tempIssues.errors.length > 0) {
                alert(tempIssues.errors[0].message);
            }
        })
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



const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<IssueList />)

