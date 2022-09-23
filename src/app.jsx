const IssueRow = (props) => {
   // const rowStyle = { "border": "1px solid" }
    return (
        <tr>
            <td>{props.Id}</td>
            <td>{props.Status}</td>
            <td>{props.Owner}</td>
            <td>{props.Effort}</td>
            <td>{props.Create.toDateString()}</td>
            <td>{props.Due.toDateString()}</td>
            <td>{props.Title}</td>
        </tr>
    )
}

const IssueTable = ({allIssues}) => {
    const rowStyle = { "border": "1px solid" }
    //setting state of variable - hook - rerender the page
    //Intializing all issues with empty data
    //const [allIssues, setAllIssues] = React.useState([]);

    //Assume you are fetching data from API
    // let tempIssues = [
    //     {Id:1, Status:"Assigned", Owner:"Person-A", Effort:14, Create: new Date("2022-09-20"), Due: new Date("2022-09-23"), Title:"This is the First Issue"},
    //     {Id:2, Status:"Resolves", Owner:"Person-B", Effort:10, Create: new Date("2022-09-19"), Due: new Date("2022-09-24"), Title:"This is the Second Issue"},
    // ];

    //lec2
    // let newIssues = [
    //     {Status:"Assigned", Owner:"Person-C", Effort:14, Create: new Date("2022-09-20"), Due: new Date("2022-09-23"), Title:"This is the Third Issue"},
    // ];

    // let newIssues = {Status:"Assigned", Owner:"Person-C", Effort:14, Create: new Date("2022-09-20"), Due: new Date("2022-09-23"), Title:"This is the Third Issue"};
    // const [allIssues, setAllIssues] = React.useState(tempIssues);

    //Hook used after every rendering
    //use effect (function,dependency) -> called after every rendering
    // React.useEffect(() => {
    //     setTimeout(() => {
    //         //lec2
    //        // AddSingleIssue();
    //         AddSingleIssue(newIssues);
    //    }, 2000)
    // }, []);

    //lec2
    // const AddSingleIssue = () => {
    //     setAllIssues([...tempIssues, ...newIssues])
    // }



    
    // setTimeout(() => {
    //      setAllIssues(tempIssues);
    // }, 2000)


    const AllIssueRow = allIssues.map(issue => (
        <IssueRow key={issue.Id} Id={issue.Id} Title={issue.Title} Status={issue.Status} Owner={issue.Owner} Effort={issue.Effort} Create={issue.Create} Due={issue.Due}/>
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

const AddIssue = ({AddSingleIssue}) => {
    // let newIssues = {Status:"Assigned", Owner:"Person-C", Effort:14, Create: new Date("2022-09-20"), Due: new Date("2022-09-23"), Title:"This is the Third Issue"};
    //     React.useEffect(() => {
    //     setTimeout(() => {
    //         AddSingleIssue(newIssues);
    //    }, 2000)
    // }, []);
    const handleSubmit= (e) =>{
      e.preventDefault();
      const form = document.forms.addIssue;
      console.log("fro",form);
       let newIssues = {
        Status:form.Status.value, 
        Owner:form.Owner.value, 
        Effort:form.Effort.value, 
        Create: new Date(form.Create.value), 
        Due: new Date(form.Due.value), 
        Title:form.Title.value, 
       }
       AddSingleIssue(newIssues);
       document.forms.addIssue.reset();
    }

    return (
        <div>
        <h2>AddIssue</h2>
        <form name="addIssue" onSubmit={handleSubmit}>
        <input type="text" name="Status" placeholder="Status"/>
        <input type="text" name="Owner" placeholder="Owner"/>
        <input type="text" name="Effort" placeholder="Effort"/>
        <input type="text" name="Create" placeholder="Create"/>
        <input type="text" name="Due" placeholder="Due"/>
        <input type="text" name="Title" placeholder="Title"/>
        <button type="submit">Submit</button>
        </form>
        </div>
    )
}
const IssueList = () => {
    let temIssues = [
     {Id:1, Status:"Assigned", Owner:"Person-A", Effort:14, Create: new Date("2022-09-20"), Due: new Date("2022-09-23"), Title:"This is the First Issue"},
     {Id:2, Status:"Resolves", Owner:"Person-B", Effort:10, Create: new Date("2022-09-19"), Due: new Date("2022-09-24"), Title:"This is the Second Issue"},
    ];
    const [allIssues,setAllIssues] = React.useState(temIssues);

    const AddSingleIssue = (newIssues) => {
        newIssues.Id = allIssues.length+1;
        let issueList = allIssues.slice();
        issueList.push(newIssues);
        setAllIssues(issueList);
    }

    return (
        <div id="child">
            <IssueFilter />
            <hr />
            {/* <IssueTable/> */}
            <IssueTable allIssues={allIssues} />
            <hr />
            <AddIssue AddSingleIssue={AddSingleIssue}/>
        </div>
    )
}



const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<IssueList />)


