// Helper Selectors

export function getAppointmentsForDay(state, day) {
  const dayData = state.days.filter(_day => _day.name === day)
  return dayData[0] ? dayData[0].appointments.map(appID => state.appointments[appID]) : [];
}

export function getInterview(state, interview){
  if(!interview){
    return null;
  } else {
    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    };
  };
}

export function getInterviewersForDay(state, day) {
  const dayData = state.days.find(_day => _day.name === day);
  return dayData ? dayData.interviewers.map(id => state.interviewers[id]) : [];
}



