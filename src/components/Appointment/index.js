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
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_NO_VALUE = "ERROR_NO_VALUE";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  // Child function of Application
  const save = function(name, interviewer) {
    console.log("student name", name, "interviewer id", interviewer)
    if(name && interviewer){
      // First level of State saving
      const interview = {
      student: name,
      interviewer
      }
      transition(SAVING);
      props.bookInterview(props.id, interview)
      .then(() => { transition(SHOW) })
      .catch(err => transition(ERROR_SAVE, true))
    } else {
      transition(ERROR_NO_VALUE)
    }
   
  }

  const confirm = function(){
    //First level of State deletion
    transition(DELETING, true)
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY);
    })
    .catch(err => transition(ERROR_DELETE, true))
  }

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
  return (
      <article className={"appointment"}>
            <Header 
              time={props.time} 
            />
            { mode === EMPTY && (
              <Empty onAdd={() => transition(CREATE)}/>)
            }

            { mode === CREATE && (
              <Form interviewers={props.interviewers}
                    onSave={save}
                    onCancel={back}
              />)
            }

            { mode === SAVING && (
              <Status 
              message={"Saving..."}
              />
              )
            }

            { mode === DELETING && (
              <Status 
              message={"Deleting..."}
              />
              )
            }

            {mode === CONFIRM && (
              <Confirm onCancel={back} onConfirm={confirm} message={"Are you sure you would like to Delete?"} />
            )}

            { mode === SHOW && (
              <Show
                student={props.interview.student}
                interviewer={props.interview.interviewer.name}
                id={props.id}
                onDelete={() => transition(CONFIRM)}
                onEdit={() => transition(EDIT)}
              /> )
            }

            { mode === EDIT && (
              <Form 
                name={props.interview.student}
                interviewer={props.interview.interviewer.id}
                interviewers={props.interviewers}
                onSave={save}
                onCancel={back}
              />
              ) 
            }

            { mode === ERROR_SAVE && (
              <Error 
              message={"There was an error while saving..."}
              onClose={back}
              />
              )  
            }

            { mode === ERROR_DELETE && (
              <Error 
              message={"There was an error while deleting..."}
              onClose={back}
              />
            )
            }

            { mode === ERROR_NO_VALUE && (
              <Error 
              message={"Please enter Student Name and/or Select an Interviewer"}
              onClose={back}
              />
            )

            }
      </article>    
  )
}

