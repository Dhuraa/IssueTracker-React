import React from 'react';

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

export default IssueRow;