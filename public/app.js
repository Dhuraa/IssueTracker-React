//const { response } = require("express")
const IssueRow = props => {
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, props.Id), /*#__PURE__*/React.createElement("td", null, props.Status), /*#__PURE__*/React.createElement("td", null, props.Owner), /*#__PURE__*/React.createElement("td", null, props.Effort), /*#__PURE__*/React.createElement("td", null, props.Create.toString()), /*#__PURE__*/React.createElement("td", null, props.Due.toString()), /*#__PURE__*/React.createElement("td", null, props.Title));
};

const IssueTable = ({
  allIssues
}) => {
  const rowStyle = {
    "border": "1px solid"
  };
  const AllIssueRow = allIssues.map(issue => /*#__PURE__*/React.createElement(IssueRow, {
    key: issue.Id,
    Id: issue.Id,
    Title: issue.Title,
    Status: issue.Status,
    Owner: issue.Owner,
    Effort: issue.Effort,
    Create: issue.Create,
    Due: issue.Due
  }));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "IssueTable"), /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Id"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "Owner"), /*#__PURE__*/React.createElement("th", null, "Effort"), /*#__PURE__*/React.createElement("th", null, "Create"), /*#__PURE__*/React.createElement("th", null, "Due"), /*#__PURE__*/React.createElement("th", null, "Title"))), /*#__PURE__*/React.createElement("tbody", null, AllIssueRow)));
};

const IssueFilter = () => {
  return /*#__PURE__*/React.createElement("h2", null, "IssueFilter");
};

const AddIssue = ({
  AddSingleIssue
}) => {
  const handleSubmit = e => {
    e.preventDefault();
    const form = document.forms.addIssue;
    let newIssues = {
      Status: form.Status.value,
      Owner: form.Owner.value,
      Effort: form.Effort.value,
      Title: form.Title.value
    };
    AddSingleIssue(newIssues); //document.forms.addIssue.reset();
  };

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "AddIssue"), /*#__PURE__*/React.createElement("form", {
    name: "addIssue",
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "Status",
    placeholder: "Status"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "Owner",
    placeholder: "Owner"
  }), /*#__PURE__*/React.createElement("input", {
    type: "number",
    name: "Effort",
    placeholder: "Effort"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "Title",
    placeholder: "Title"
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit"
  }, "Submit")));
};

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
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    }).then(async response => {
      let tempIssues = await response.json();
      let tempList = tempIssues.data.issueList;
      console.log(tempList);
      setAllIssues(tempList);
    });
  }; //invokes callback function


  React.useEffect(function () {
    refreshIssueList();
  }, []);

  const AddSingleIssue = newIssues => {
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
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    }).then(async response => {
      let tempIssues = await response.json();

      if (tempIssues.errors.length > 0) {
        alert(tempIssues.errors[0].message);
      }
    });
  };

  return /*#__PURE__*/React.createElement("div", {
    id: "child"
  }, /*#__PURE__*/React.createElement(IssueFilter, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueTable, {
    allIssues: allIssues
  }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(AddIssue, {
    AddSingleIssue: AddSingleIssue
  }));
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(IssueList, null));