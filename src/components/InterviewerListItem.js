// Dependency Imports
import React from "react";
import classNames from "classnames"

// Styling Imports
import "components/InterviewerListItem.scss";

export default function InterviewListItem(props) {

  const interviewClass = classNames("interviewers__item", {
    "interviewers__item--selected" : props.selected,
  });

  return (
    <li 
      className={interviewClass} 
      onClick={props.onChange}
    >
      <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
      /> 
      {props.selected && props.name} 
    </li>
  )
}

