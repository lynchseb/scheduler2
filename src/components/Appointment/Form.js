import React, { useState } from "react";

//Import components Begin
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
//Import components End

export default function Form (props) {
  const [name, setName] = useState(props.name || "")
  const [interviewer, setInterviewer] = useState(props.interviewer || null)
  
  const handleName = (event) => {
    event.preventDefault()
    setName(event.target.value);
  }

  const handleInterviewer = (id) => {
    setInterviewer(id)
  }

  const reset = () => {
    setName("");
    setInterviewer(null);
  }

  const cancel = () => {
    reset();
    props.onCancel();
  }

    return (
      <main className="appointment__card appointment__card--create">
        <section className="appointment__card-left">
          <form autoComplete="off"
                onSubmit={(event) => event.preventDefault}
          >
            <input
              className="appointment__create-input text--semi-bold"
              type="text"
              name="name"
              placeholder="Enter Student Name"
              value={name}
              onChange={(event) => handleName(event)}
            />
          </form>

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
            onClick={() => props.onSave(name, interviewer)}
            >Save</Button>
          </section>
        </section>
      </main>
    )
}

