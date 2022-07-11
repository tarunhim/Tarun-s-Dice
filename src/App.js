
import React from 'react';
import './App.css';
import Die from "./Die";

function App() {
  const [dice,setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    let temp = dice[0].value;
    for(let i of dice) {
      if(temp !== i.value) return;
    }
    setTenzies(true);
    console.log("yes you win");
  },[dice])

  function allNewDice() {
    const newDice = [];
    for(let i = 0; i < 10; ++i) {
      newDice.push({
        value:Math.ceil(Math.random()*6), 
        isHeld: false,
        id: i
      });
    }
    return newDice;
  }
  
  function rollDice() {
    setDice(prev => {
      return prev.map(item => item.isHeld ? item : 
        {...item,value: Math.ceil(Math.random()*6)});
    });
  }
  
  function holdDice(id) {
    setDice(prev => {
      return prev.map(item => 
        item.id === id ? 
        {...item,isHeld:!item.isHeld} : item);
    });

  }

  function restart() {
    setTenzies(false);
    setDice(allNewDice());
  }
  

  return (
    <main>
      <h1 className="title">Tarun's Dice</h1>
      <p className="instructions">Roll until all dices are the same.
       Click each die to freeze its current value between the rolls.</p>
      <div className="dice-container">
        {dice.map(item => <Die 
        key={item.id} 
        isHeld={item.isHeld} 
        value={item.value} 
        toggle={() => holdDice(item.id)}
        />)}
      </div>
      <button className="roll-dice" onClick={!tenzies ? rollDice : restart}>
        {tenzies ? "Restart" : "Roll"}
      </button>
      {tenzies &&<h1 className="you-win">YOU WIN</h1>}
    </main>
  );
}

export default App;
