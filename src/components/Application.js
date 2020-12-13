import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from "./DayList";
import Appointment from "components/Appointment/index";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "../helpers/selectors"


//Hard data for Appointment component begins //
// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Boromir",
//       interviewer: {
//         id: 3,
//         name: "Mildred Nazir",
//         avatar: "https://i.imgur.com/T2WwVfS.png",
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Denethor",
//       interviewer: {
//         id: 5,
//         name: "Sven Jones",
//         avatar: "https://i.imgur.com/twYrpay.jpg",
//       }
//     }
//   },
//   {
//     id: "last",
//     time: "4pm"
//   }
// ];
// Hard data for Appointment component Ends //

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  // Helper Selector Functions
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewersForDay = getInterviewersForDay(state, state.day)
  
  console.log("these are my appointments", appointments)

  // State management Functions
  const setDay = day => setState(prev => ({ ...prev, day }))

  // Component Functions Begin
  
  const bookInterview = function (id, interview){
    console.log("Interview id is: ", id, ". Interview details are: ", interview)
    // Second Level of State saving
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    // Top level of State saving
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState(prev => ({
      ...prev,
      appointments
    }));
    // return axios.put(`/api/appointments/${id}`, { interview })
    //   .then(() => {
        
    //   })
  };


  // Component Functions End

  // API requests Begin
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    })
      .catch(error => console.log(error));
  }, [])

  // API requests End

  return (

    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {
          appointments.map(appointment => {
            const interview = getInterview(state, appointment.interview)
            return (
              <Appointment 
              key={appointment.id}
              interviewers={interviewersForDay}
              id={appointment.id}
              time={appointment.time}
              interview={interview}
              bookInterview={bookInterview}
              />
            );
          })
        }
      </section>
    </main>
  );
}




