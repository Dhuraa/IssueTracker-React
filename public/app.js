const IssueRow = props => {
  // const rowStyle = { "border": "1px solid" }
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, props.Id), /*#__PURE__*/React.createElement("td", null, props.Status), /*#__PURE__*/React.createElement("td", null, props.Owner), /*#__PURE__*/React.createElement("td", null, props.Effort), /*#__PURE__*/React.createElement("td", null, props.Create.toDateString()), /*#__PURE__*/React.createElement("td", null, props.Due.toDateString()), /*#__PURE__*/React.createElement("td", null, props.Title));
};

const IssueTable = ({
  allIssues
}) => {
  const rowStyle = {
    "border": "1px solid"
  }; //setting state of variable - hook - rerender the page
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
  // let newIssues = {Status:"Assigned", Owner:"Person-C", Effort:14, Create: new Date("2022-09-20"), Due: new Date("2022-09-23"), Title:"This is the Third Issue"};
  //     React.useEffect(() => {
  //     setTimeout(() => {
  //         AddSingleIssue(newIssues);
  //    }, 2000)
  // }, []);
  const handleSubmit = e => {
    e.preventDefault();
    const form = document.forms.addIssue;
    console.log("fro", form);
    let newIssues = {
      Status: form.Status.value,
      Owner: form.Owner.value,
      Effort: form.Effort.value,
      Create: new Date(form.Create.value),
      Due: new Date(form.Due.value),
      Title: form.Title.value
    };
    AddSingleIssue(newIssues);
    document.forms.addIssue.reset();
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
    type: "text",
    name: "Effort",
    placeholder: "Effort"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "Create",
    placeholder: "Create"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "Due",
    placeholder: "Due"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "Title",
    placeholder: "Title"
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit"
  }, "Submit")));
};

const IssueList = () => {
  let temIssues = [{
    Id: 1,
    Status: "Assigned",
    Owner: "Person-A",
    Effort: 14,
    Create: new Date("2022-09-20"),
    Due: new Date("2022-09-23"),
    Title: "This is the First Issue"
  }, {
    Id: 2,
    Status: "Resolves",
    Owner: "Person-B",
    Effort: 10,
    Create: new Date("2022-09-19"),
    Due: new Date("2022-09-24"),
    Title: "This is the Second Issue"
  }];
  const [allIssues, setAllIssues] = React.useState(temIssues);

  const AddSingleIssue = newIssues => {
    newIssues.Id = allIssues.length + 1;
    let issueList = allIssues.slice();
    issueList.push(newIssues);
    setAllIssues(issueList);
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