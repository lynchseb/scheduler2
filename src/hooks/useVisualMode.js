import React, { useState } from "react";

export default function useVisualMode(initialViewMode){
  const [mode, setMode] = useState(initialViewMode);
  const [history, setHistory] = useState([initialViewMode]);

  function transition(newMode, replace) {
    console.log("Please while while we Transition to new Visual Mode")
    setHistory(history => {
      if (replace) {
        const _history = [...history];
        _history.splice(-1, 1, newMode)
        return _history;
      } else {
        return [...history, newMode]
      }
    });
    console.log(`Setting visual mode to: ${newMode}`)
    setMode(newMode);
  };

  function back(){
    console.log(`Moving from ${mode} to previous Visual Mode`)
    setHistory(history => {
      const _history = history.length > 1 ? [...history].slice(0, -1) : [...history];
      console.log(`Previous visual mode set: ${_history}`)
      setMode(_history[_history.length - 1]);
      return _history;
    });
  }
  return { mode, transition, back };
};