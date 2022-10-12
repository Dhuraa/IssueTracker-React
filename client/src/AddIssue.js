import React from 'react';

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
            <h3 style={{"color":"Red"}}>{setErrorMessage}</h3>
        </div>
    )
}

export default AddIssue;