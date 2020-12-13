import React from "react";
import classNames from "classnames"

import "components/DayListItem.scss";

export default function DayListItem(props) {
  
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const formatSpots = function(spots) {
    if (spots === 0) {
      return "no spots remaining";

    } else if (spots === 1) {
      return `${spots} spot remaining`;

    } else {
      return `${spots} spots remaining`;
    }
  };
  // console.log("my props", props)
  // console.log("my prop name", props.name) 
  // console.log("setDay is", props.setDay)
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2>{props.name}</h2> 
      <h3>{formatSpots(props.spots)}</h3>
    </li>
  );
}