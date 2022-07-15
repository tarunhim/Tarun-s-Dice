
import React from 'react';
import './App.css';
import Die from "./Die";
import Confetti from 'react-confetti';
import Title from "./Title";

function App() {
  const [dice,setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(0);
  const [sec,setSec] = React.useState(30);

  React.useEffect(() => {
    console.log(tenzies +" "+ sec);
    let key = setTimeout(() => setSec(prev => prev-1 >= 0 ? prev-1 : prev), 1000);
    if(sec === 0 && tenzies === 0)  {
      setTenzies(2);
    }
    if(tenzies === 2) {
      clearTimeout(key);
    }
    return () => clearTimeout(key);
  },[sec,tenzies]);

  React.useEffect(() => { 
    let temp = dice[0].value;
    for(let i of dice) {
      if(temp !== i.value || !i.isHeld) return;
    }
    setTenzies(1);
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
    if(tenzies !== 2) {
    setDice(prev => {
      return prev.map(item => 
        item.id === id ? 
        {...item,isHeld:!item.isHeld} : item);
    });
  }

  }

  function restart() {
    setTenzies(0);
    setDice(allNewDice());
    setSec(30);
  }
  

  return (
    <main>
      <Title />
      <h2 className="timer">Time left <span>{sec < 10 ? "0"+sec : sec}</span></h2>
      
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
      {tenzies === 1 &&<h1 className="you-win">YOU WIN</h1>}
      {tenzies === 1 && <Confetti />}
      {tenzies === 2 &&<h1 className="you-lose">YOU LOSE</h1>}
    </main>
  );
}

export default App;
