import React from 'react';
import IssueRow from './IssueRow';

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

export default IssueTable;