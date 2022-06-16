import { useState } from 'react';
import './App.css';
import { Dish } from './Dish';
import { Login } from './Login';

function App() {
  const[loggedIn,setLoggedIn] = useState(false);
  
  return (
    <div className="App">
      {!loggedIn?<Login logged={loggedIn} setLogged={setLoggedIn}/>:<Dish/>}
      
    </div>
  );
}

export default App;
