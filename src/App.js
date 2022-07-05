import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import TodoList from './TodoList/TodoList';

function App() {
  const [geceMi, setGeceMi] = useState(false)

  let btnMod;
  if (geceMi)
    btnMod = <a href="#" onClick={() => setGeceMi(false)}>Gündüz Moduna Geç</a>;
  else
    btnMod = <a href="#" onClick={() => setGeceMi(true)}>Gece Moduna Geç</a>;

  return (
    <div className={geceMi ? "App-gece" : "App"}>

      <nav>{btnMod}</nav>
      <TodoList />
    </div>
  );
}

export default App;
