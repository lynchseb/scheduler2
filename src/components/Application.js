// Dependency Imports
import React from "react";

// Styling Imports
import "components/Application.scss";

// Component Imports
import DayList from "./DayList";
import Appointment from "components/Appointment/index";

// API function Imports
import useApplicationData from "../hooks/useApplicationData";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "../helpers/selectors"

export default function Application(props) {
  // State and API management
    const {
      state,
      setDay,
      bookInterview,
      cancelInterview
    } = useApplicationData();

  // Selector Functions Begin
  const interviewersForDay = getInterviewersForDay(state, state.day)
  
  const appointmentsForDay = getAppointmentsForDay(state, state.day).map(appointment => {
    return (
      <Appointment 
      key={appointment.id}
      {...appointment}
      interview={getInterview(state, appointment.interview)}
      interviewers={interviewersForDay}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
      />
    );
  });
  // Selector Functions End

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
        {appointmentsForDay}
        <Appointment key="last" time="5pm" />
      </section>

    </main>
  );
}




