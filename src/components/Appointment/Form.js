import React, { useState } from "react";

//Import components Begin
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
//Import components End

export default function Form (props) {
  const [name, setName] = useState(props.name || "")
  const [interviewer, setInterviewer] = useState(props.interviewer || null)
  const [error, setError] = useState("")
  
  const reset = () => {
    setName("");
    setInterviewer(null);
    setError("")
  };

  const handleName = (event) => {
    event.preventDefault()
    setName(event.target.value);
  };

  const handleInterviewer = (id) => {
    setInterviewer(id)
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  function validate() {
    if (name === "" || interviewer === null) {
      setError("Student name or Interviewer cannot be blank");
      setTimeout(() => {
        setError("");
      }, 2500)
      return;
    }
    setError("");
    props.onSave(name, interviewer);
  }

    return (
      <main className="appointment__card appointment__card--create">
        <section className="appointment__card-left">
          <form autoComplete="off"
                onSubmit={(event) => event.preventDefault}
          >
            <input
              data-testid={"student-name-input"}
              className="appointment__create-input text--semi-bold"
              type="text"
              name="name"
              placeholder="Enter Student Name"
              value={name}
              onChange={(event) => handleName(event)}
            />
          </form>
          <section className="appointment__validation">{error}</section>
          <InterviewerList 
          interviewers={props.interviewers} 
          value={interviewer} 
          onChange={(id) => handleInterviewer(id)} 
          />
        </section>

        <section className="appointment__card-right">
          <section className="appointment__actions">
            <Button 
            danger
            onClick={() => props.onCancel()}
            >Cancel</Button>

            <Button 
            confirm
            onClick={() => validate()}
            >Save</Button>
          </section>
        </section>
      </main>
    )
}

