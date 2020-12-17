// Depdendency Imports
import React from "react";

// Component Imports
import DayListItem from "components/DayListItem";

export default function DayList(props){

  const day = props.days.map(day => {
    return (
      <ul key={day.id}>
        <DayListItem
          key={day.id}
          name={day.name}
          spots={day.spots}
          selected={day.name === props.day}
          setDay={props.setDay}
        />
      </ul>
    );
  });
  return day
};
