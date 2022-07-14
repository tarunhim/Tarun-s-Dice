import "./App.css";
import React from "react";

export default function Title() {
    return (
        <>
        <h1 className="title">Tarun's Dice</h1>
      <p className="instructions">Roll until all dices are the same.
       Click each die to freeze its current value between the rolls.</p>
       </>
    )
}