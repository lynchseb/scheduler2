import React from "react";


//Styles
import "components/Appointment/styles.scss";

// Visual Mode
import useVisualMode from "hooks/useVisualMode";

//Import components Begins
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  // Child function of Application
  const save = function(name, interviewer) {
    console.log("student name", name, "interviewer id", interviewer)
    // First level of State saving
    const interview = {
      student: name,
      interviewer
    }
    
    props.bookInterview(props.id, interview);
    return transition(SHOW);
  }

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  return (
      <article className={"appointment"}>
            <Header 
              time={props.time} 
            />
            { mode === EMPTY && (<Empty onAdd={() => transition(CREATE)}/>)
            }

            { mode === CREATE && (
              <Form interviewers={props.interviewers}
                    onSave={save}
                    onCancel={back}
              />)

            }

            { mode === SHOW && (
              <Show
                student={props.interview.student}
                interviewer={props.interview.interviewer.name}
              /> )
            }
      </article>    
  )
}

