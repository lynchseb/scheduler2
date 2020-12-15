// Dependency Imports
import { useState, useEffect } from "react";
import axios from "axios";

// Styling Imports
import "components/Application.scss";

export default function useApplicationData() {
  // State management 
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day }));
  
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
  }, []);
  // API requests End
  
  
  // DB Functions Begin
    
  const bookInterview = function (id, interview){
    console.log("Interview id is: ", id, ". Interview details are: ", interview)
    // Second Level of Client Side State saving
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    // Top level of Client Side State saving
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, { interview })
      // Storing Interview in DB and then setting Client Side Appointments State
      .then(() => {
        setState(prev => ({
          ...prev,
          appointments
        }))
        // Fetching days data and setting Client Side Days State
        axios.get("/api/days").then(response => {
          const { data } = response
          setState(prev => ({
            ...prev,
            days: data
          }))
        })
        .catch(err => console.log(err)) 
      }) 
  };
  
  const cancelInterview = function(id){
    console.log("Removing interview # ", id)
    //Second Level of Client Side State Deletion
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    //Top Level of Client Side State Deletion
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return axios.delete(`/api/appointments/${id}`, { id })
      // Deleting Interview in DB and then setting Client Side Appointments State
      .then(() => {
        console.log("Interview # ", id, "has been succesfully deleted")
        setState(prev => ({
          ...prev,
          appointments
        }))
        // Fetching days data and then setting Client Side Days State
        axios.get("/api/days").then(response => {
          const { data } = response
          setState(prev => ({
            ...prev,
            days: data
          }))
        })
        .catch(err => console.log(err))
      })
  }
  // DB Functions End

  return { state, setDay, bookInterview, cancelInterview }
}
